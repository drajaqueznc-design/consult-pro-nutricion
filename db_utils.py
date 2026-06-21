"""
Utilidades de base de datos — Plataforma Nutricional Dra. Jáquez
Compatibilidad SQLite (local) + PostgreSQL (Render producción)
"""
import os
import math
from datetime import date, datetime

# ── Detección de entorno ──────────────────────────────────────
DATABASE_URL = os.environ.get('DATABASE_URL', '')
USE_PG = bool(DATABASE_URL)

if USE_PG:
    import psycopg2
    import psycopg2.extras
else:
    import sqlite3
    DB_PATH = os.path.join(os.path.dirname(__file__), 'db', 'nutricion_clinica.db')


# ── Capa de compatibilidad ────────────────────────────────────

def _pg_url():
    """Render usa postgres:// pero psycopg2 requiere postgresql://"""
    url = DATABASE_URL
    if url.startswith('postgres://'):
        url = url.replace('postgres://', 'postgresql://', 1)
    return url


def _to_pg_sql(sql):
    """Convierte placeholders ? → %s para PostgreSQL"""
    return sql.replace('?', '%s')


def _add_returning(sql):
    """Agrega RETURNING id a INSERT para obtener lastrowid en PostgreSQL"""
    stripped = sql.strip()
    if stripped.upper().startswith('INSERT') and 'RETURNING' not in stripped.upper():
        return stripped.rstrip(';') + ' RETURNING id'
    return stripped


class _Cursor:
    """Cursor unificado que siempre devuelve dicts"""
    def __init__(self, rows=None, lastrowid=None):
        self._rows    = rows or []
        self.lastrowid = lastrowid

    def fetchone(self):
        return self._rows[0] if self._rows else None

    def fetchall(self):
        return self._rows


class DbConnection:
    """
    Conexión unificada SQLite / PostgreSQL.
    Uso idéntico al antiguo sqlite3.Connection:
        db = get_db()
        row = db.execute("SELECT ... WHERE id=?", (id,)).fetchone()
        cur = db.execute("INSERT INTO ... VALUES (?)", (val,))
        rid = cur.lastrowid
        db.commit(); db.close()
    """

    def __init__(self):
        if USE_PG:
            self._conn = psycopg2.connect(_pg_url())
            self._pg   = True
        else:
            self._conn = sqlite3.connect(DB_PATH)
            self._conn.row_factory = sqlite3.Row
            self._conn.execute("PRAGMA foreign_keys = ON")
            self._conn.execute("PRAGMA journal_mode = WAL")
            self._pg   = False

    # ── execute ───────────────────────────────────────────────
    def execute(self, sql, params=()):
        if self._pg:
            return self._pg_execute(sql, params)
        else:
            return self._sqlite_execute(sql, params)

    def _pg_execute(self, sql, params):
        pg_sql   = _to_pg_sql(sql)
        is_ins   = sql.strip().upper().startswith('INSERT')
        is_write = sql.strip().upper()[:6] in ('INSERT', 'UPDATE', 'DELETE')

        if is_ins:
            pg_sql = _add_returning(pg_sql)

        cur = self._conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        cur.execute(pg_sql, params if params else None)

        lastrowid = None
        rows      = []

        if is_ins:
            row = cur.fetchone()
            if row:
                lastrowid = row.get('id')
        elif not is_write:
            try:
                rows = [dict(r) for r in cur.fetchall()]
            except psycopg2.ProgrammingError:
                rows = []

        return _Cursor(rows=rows, lastrowid=lastrowid)

    def _sqlite_execute(self, sql, params):
        cur  = self._conn.execute(sql, params)
        rows = []
        try:
            rows = [dict(r) for r in cur.fetchall()]
        except Exception:
            rows = []
        return _Cursor(rows=rows, lastrowid=cur.lastrowid)

    # ── commit / close ────────────────────────────────────────
    def commit(self):
        self._conn.commit()

    def close(self):
        try:
            self._conn.close()
        except Exception:
            pass

    # ── executescript (solo para init_db SQLite) ──────────────
    def executescript(self, sql):
        if not self._pg:
            self._conn.executescript(sql)


def get_db() -> DbConnection:
    return DbConnection()


def row_to_dict(row):
    if row is None:
        return None
    return dict(row) if not isinstance(row, dict) else row


def rows_to_list(rows):
    if not rows:
        return []
    return [dict(r) if not isinstance(r, dict) else r for r in rows]


# ── INICIALIZACIÓN DE BD ──────────────────────────────────────

def init_db():
    """
    Crea todas las tablas si no existen.
    SQLite: usa schema.sql
    PostgreSQL: usa schema_pg.sql
    """
    schema_file = 'schema_pg.sql' if USE_PG else 'schema.sql'
    schema_path = os.path.join(os.path.dirname(__file__), schema_file)
    if not os.path.exists(schema_path):
        print(f'[init_db] {schema_file} no encontrado, omitiendo init.')
        return

    if USE_PG:
        conn = psycopg2.connect(_pg_url())
        with open(schema_path, 'r', encoding='utf-8') as f:
            sql = f.read()
        cur = conn.cursor()
        # Ejecutar sentencia por sentencia
        statements = [s.strip() for s in sql.split(';') if s.strip()]
        for stmt in statements:
            try:
                cur.execute(stmt)
            except Exception as e:
                print(f'[init_db] {e.__class__.__name__}: {str(e)[:80]}')
                conn.rollback()
        conn.commit()
        conn.close()
    else:
        os.makedirs(os.path.join(os.path.dirname(__file__), 'db'), exist_ok=True)
        conn = sqlite3.connect(DB_PATH)
        with open(schema_path, 'r', encoding='utf-8') as f:
            sql = f.read()
        try:
            conn.executescript(sql)
            conn.commit()
        except Exception as e:
            print(f'[init_db] {e}')
        conn.close()

    print(f'[init_db] OK usando {"PostgreSQL" if USE_PG else "SQLite"}')


# ── CÁLCULOS CLÍNICOS ─────────────────────────────────────────

def calc_imc(peso, talla_cm):
    if not peso or not talla_cm or talla_cm == 0:
        return None, None
    talla_m = talla_cm / 100
    imc = round(peso / (talla_m ** 2), 1)
    if imc < 18.5:   cls = 'Bajo peso'
    elif imc < 25:   cls = 'Normal'
    elif imc < 30:   cls = 'Sobrepeso'
    elif imc < 35:   cls = 'Obesidad G1'
    elif imc < 40:   cls = 'Obesidad G2'
    else:            cls = 'Obesidad G3'
    return imc, cls


def calc_cintura_talla(cintura, talla_cm):
    if not cintura or not talla_cm or talla_cm == 0:
        return None
    return round(cintura / talla_cm, 3)


def calc_cintura_cadera(cintura, cadera):
    if not cintura or not cadera or cadera == 0:
        return None
    return round(cintura / cadera, 3)


def calc_homa_ir(glucemia, insulina):
    if not glucemia or not insulina:
        return None, None
    homa = round((glucemia * insulina) / 405, 2)
    if homa >= 2.5:   interp = 'Resistencia a insulina'
    elif homa >= 1.8: interp = 'Límite'
    else:             interp = 'Normal'
    return homa, interp


def calc_egfr_ckd_epi(creatinina, edad, sexo):
    if not creatinina or not edad or not sexo:
        return None, None
    if sexo == 'F':
        kappa, alpha, sex_factor = 0.7, -0.241, 1.012
    else:
        kappa, alpha, sex_factor = 0.9, -0.302, 1.0
    ratio = creatinina / kappa
    if ratio < 1:
        egfr = 142 * (ratio ** alpha) * (0.9938 ** edad) * sex_factor
    else:
        egfr = 142 * (ratio ** -1.200) * (0.9938 ** edad) * sex_factor
    egfr = round(egfr, 1)
    if egfr >= 90:   estadio = 'G1 (≥90)'
    elif egfr >= 60: estadio = 'G2 (60–89)'
    elif egfr >= 45: estadio = 'G3a (45–59)'
    elif egfr >= 30: estadio = 'G3b (30–44)'
    elif egfr >= 15: estadio = 'G4 (15–29)'
    else:            estadio = 'G5 (<15)'
    return egfr, estadio


def calc_no_hdl(colesterol_total, hdl):
    if not colesterol_total or not hdl:
        return None
    return round(colesterol_total - hdl, 1)


def calc_indice_aterogenico(colesterol_total, hdl):
    if not colesterol_total or not hdl or hdl == 0:
        return None
    return round(colesterol_total / hdl, 2)


def calc_get(tmb, factor_actividad):
    if not tmb or not factor_actividad:
        return None
    return round(tmb * factor_actividad, 0)


def calc_proteina_objetivo(peso, factor=1.4):
    if not peso:
        return None
    return round(peso * factor, 0)


def calc_handgrip_interp(valor, sexo):
    if not valor or not sexo:
        return None
    if sexo == 'F':
        return 'Baja' if valor < 16 else 'Normal'
    return 'Baja' if valor < 27 else 'Normal'


def calc_sarcf(cargas, asistencia, levantarse, escaleras, caidas):
    items = [cargas, asistencia, levantarse, escaleras, caidas]
    if any(x is None for x in items):
        return None, None
    total = sum(items)
    return total, 'Riesgo de sarcopenia' if total >= 4 else 'Sin riesgo'


def calc_phq9(items):
    if len(items) != 9 or any(x is None for x in items):
        return None, None
    total = sum(items)
    if total <= 4:    sev = 'Mínimo'
    elif total <= 9:  sev = 'Leve'
    elif total <= 14: sev = 'Moderado'
    elif total <= 19: sev = 'Moderadamente grave'
    else:             sev = 'Grave'
    return total, sev


def calc_gad7(items):
    if len(items) != 7 or any(x is None for x in items):
        return None, None
    total = sum(items)
    if total <= 4:    sev = 'Mínimo'
    elif total <= 9:  sev = 'Leve'
    elif total <= 14: sev = 'Moderado'
    else:             sev = 'Grave'
    return total, sev


def calc_pgsa(items):
    if len(items) != 4 or any(x is None for x in items):
        return None, None
    total = sum(items)
    if total <= 1:   cat = 'A — Bien nutrido'
    elif total <= 8: cat = 'B — Moderadamente desnutrido'
    else:            cat = 'C — Gravemente desnutrido'
    return total, cat


def calc_edad(fecha_nacimiento):
    if not fecha_nacimiento:
        return None
    try:
        dob   = datetime.strptime(str(fecha_nacimiento), '%Y-%m-%d').date()
        today = date.today()
        return today.year - dob.year - ((today.month, today.day) < (dob.month, dob.day))
    except Exception:
        return None


def obscore_estimate(age, bmi, hba1c, hdl, sbp, creatinina, cintura_talla, tabaquismo):
    score = 0
    if age:
        if age >= 65:   score += 3
        elif age >= 55: score += 2
        elif age >= 45: score += 1
    if bmi:
        if bmi >= 35:   score += 3
        elif bmi >= 30: score += 2
        elif bmi >= 27: score += 1
    if hba1c:
        if hba1c >= 6.5: score += 3
        elif hba1c >= 5.7: score += 1
    if hdl:
        if hdl < 40: score += 2
        elif hdl < 50: score += 1
    if sbp:
        if sbp >= 140: score += 2
        elif sbp >= 130: score += 1
    if creatinina and creatinina > 1.2:
        score += 2
    if cintura_talla:
        if cintura_talla >= 0.6:  score += 2
        elif cintura_talla >= 0.5: score += 1
    if tabaquismo == 'activo': score += 2
    elif tabaquismo == 'ex':   score += 1
    pct   = round((score / 18) * 100)
    nivel = 'alto' if pct >= 60 else 'moderado' if pct >= 35 else 'bajo'
    return pct, nivel


def calc_numero_visita(paciente_id, conn):
    row = conn.execute(
        "SELECT COUNT(*) as n FROM visitas WHERE paciente_id = ?", (paciente_id,)
    ).fetchone()
    return (row['n'] if row else 0) + 1
