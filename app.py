"""
Plataforma Integral de Nutrición Clínica
Backend Flask — Dra. Anayanet Jáquez
"""
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import sqlite3
import os
import json
import random
import string
import threading
import urllib.request
import urllib.parse
from datetime import date, datetime
from db_utils import (
    get_db, row_to_dict, rows_to_list, init_db,
    calc_imc, calc_cintura_talla, calc_cintura_cadera,
    calc_homa_ir, calc_egfr_ckd_epi, calc_no_hdl,
    calc_indice_aterogenico, calc_get, calc_proteina_objetivo,
    calc_handgrip_interp, calc_sarcf, calc_phq9, calc_gad7,
    calc_pgsa, calc_edad, obscore_estimate, calc_numero_visita
)

app = Flask(__name__, static_folder='static', template_folder='templates')
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0   # sin caché en estáticos
CORS(app)

@app.after_request
def no_cache(r):
    if '/static/' in request.path:
        r.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, max-age=0'
        r.headers['Pragma']  = 'no-cache'
        r.headers['Expires'] = '0'
    return r

# ── HELPERS ──────────────────────────────────────────────────

def ok(data=None, msg='OK'):
    return jsonify({'status': 'ok', 'msg': msg, 'data': data})

def err(msg, code=400):
    return jsonify({'status': 'error', 'msg': msg}), code

def today():
    return date.today().isoformat()


init_db()   # crea tablas si no existen (SQLite local o PostgreSQL en Render)


# ── ROOT ─────────────────────────────────────────────────────

@app.route('/')
def index():
    return send_from_directory('static', 'index.html')

@app.route('/static/<path:path>')
def static_files(path):
    return send_from_directory('static', path)

# ════════════════════════════════════════════════════════════
# PACIENTES
# ════════════════════════════════════════════════════════════

@app.route('/api/pacientes', methods=['GET'])
def get_pacientes():
    inst = request.args.get('institucion')
    search = request.args.get('q', '').strip()
    riesgo = request.args.get('riesgo')

    db = get_db()
    query = "SELECT * FROM v_resumen_pacientes WHERE 1=1"
    params = []

    if inst and inst != 'ALL':
        query += " AND institucion = ?"
        params.append(inst)
    if search:
        query += " AND (nombre_completo LIKE ? OR cedula LIKE ?)"
        params += [f'%{search}%', f'%{search}%']
    if riesgo == 'alto':
        query += " AND obscore_nivel = 'alto'"
    elif riesgo == 'sin_calc':
        query += " AND obscore_nivel IS NULL"

    query += " ORDER BY ultima_visita DESC"
    rows = db.execute(query, params).fetchall()
    db.close()
    return ok(rows_to_list(rows))


@app.route('/api/pacientes', methods=['POST'])
def create_paciente():
    d = request.json
    if not d.get('nombre') or not d.get('apellidos'):
        return err('Nombre y apellidos son requeridos')

    db = get_db()
    try:
        cur = db.execute("""
            INSERT INTO pacientes (nombre, apellidos, cedula, fecha_nacimiento, sexo,
                telefono, email, ocupacion, institucion, tipo_consulta)
            VALUES (?,?,?,?,?,?,?,?,?,?)
        """, (
            d.get('nombre'), d.get('apellidos'), d.get('cedula'),
            d.get('fecha_nacimiento'), d.get('sexo'),
            d.get('telefono'), d.get('email'), d.get('ocupacion'),
            d.get('institucion', 'UM'), d.get('tipo_consulta', 'AMBULATORIA')
        ))
        pid = cur.lastrowid

        # Crear antecedentes vacíos
        db.execute("INSERT INTO antecedentes (paciente_id) VALUES (?)", (pid,))
        db.commit()

        paciente = row_to_dict(db.execute("SELECT * FROM pacientes WHERE id=?", (pid,)).fetchone())
        return ok(paciente, 'Paciente creado')
    except sqlite3.IntegrityError as e:
        return err(f'Error: {str(e)}')
    finally:
        db.close()


@app.route('/api/pacientes/<int:pid>', methods=['GET'])
def get_paciente(pid):
    db = get_db()
    p = row_to_dict(db.execute("SELECT * FROM pacientes WHERE id=?", (pid,)).fetchone())
    if not p:
        db.close()
        return err('Paciente no encontrado', 404)
    ant = row_to_dict(db.execute("SELECT * FROM antecedentes WHERE paciente_id=?", (pid,)).fetchone())
    visitas = rows_to_list(db.execute("SELECT * FROM visitas WHERE paciente_id=? ORDER BY fecha DESC", (pid,)).fetchall())
    db.close()
    return ok({'paciente': p, 'antecedentes': ant, 'visitas': visitas})


@app.route('/api/pacientes/<int:pid>', methods=['PUT'])
def update_paciente(pid):
    d = request.json
    db = get_db()
    db.execute("""
        UPDATE pacientes SET nombre=?, apellidos=?, cedula=?, fecha_nacimiento=?,
        sexo=?, telefono=?, email=?, ocupacion=?, institucion=?, tipo_consulta=?,
        notas_generales=?, fecha_actualizacion=CURRENT_TIMESTAMP
        WHERE id=?
    """, (
        d.get('nombre'), d.get('apellidos'), d.get('cedula'),
        d.get('fecha_nacimiento'), d.get('sexo'), d.get('telefono'),
        d.get('email'), d.get('ocupacion'), d.get('institucion'),
        d.get('tipo_consulta'), d.get('notas_generales'), pid
    ))

    # Actualizar antecedentes
    ant = d.get('antecedentes', {})
    db.execute("""
        UPDATE antecedentes SET patologias=?, medicamentos=?, alergias=?,
        intolerancias=?, dm2_familiar=?, evc_familiar=?, obesidad_familiar=?,
        familiar_detalle=?, tabaquismo=?, tabaquismo_años=?, alcohol=?,
        actividad_fisica=?, actividad_tipo=?, actividad_frecuencia=?,
        horas_sueno=?, calidad_sueno=?, cirugias_previas=?,
        cirugia_bariatrica=?, tipo_bariatrica=?, fecha_bariatrica=?,
        fecha_actualizacion=CURRENT_TIMESTAMP
        WHERE paciente_id=?
    """, (
        ant.get('patologias'), ant.get('medicamentos'), ant.get('alergias'),
        ant.get('intolerancias'), ant.get('dm2_familiar', 0),
        ant.get('evc_familiar', 0), ant.get('obesidad_familiar', 0),
        ant.get('familiar_detalle'), ant.get('tabaquismo', 'no'),
        ant.get('tabaquismo_años'), ant.get('alcohol', 'no'),
        ant.get('actividad_fisica', 'sedentario'), ant.get('actividad_tipo'),
        ant.get('actividad_frecuencia'), ant.get('horas_sueno'),
        ant.get('calidad_sueno'), ant.get('cirugias_previas'),
        ant.get('cirugia_bariatrica', 0), ant.get('tipo_bariatrica'),
        ant.get('fecha_bariatrica'), pid
    ))
    db.commit()
    db.close()
    return ok(msg='Paciente actualizado')


# ════════════════════════════════════════════════════════════
# VISITAS
# ════════════════════════════════════════════════════════════

@app.route('/api/pacientes/<int:pid>/visitas', methods=['GET'])
def get_visitas(pid):
    db = get_db()
    rows = rows_to_list(db.execute(
        "SELECT * FROM visitas WHERE paciente_id=? ORDER BY fecha DESC", (pid,)
    ).fetchall())
    db.close()
    return ok(rows)


@app.route('/api/pacientes/<int:pid>/visitas', methods=['POST'])
def create_visita(pid):
    d = request.json
    db = get_db()
    num = calc_numero_visita(pid, db)
    cur = db.execute("""
        INSERT INTO visitas (paciente_id, fecha, institucion, numero_visita,
            motivo_consulta, mod_obesidad, mod_farmacoterapia,
            mod_salud_mental, mod_sibo, mod_eii, notas_clinicas)
        VALUES (?,?,?,?,?,?,?,?,?,?,?)
    """, (
        pid, d.get('fecha', today()),
        d.get('institucion', 'UM'), num,
        d.get('motivo_consulta'),
        d.get('mod_obesidad', 0), d.get('mod_farmacoterapia', 0),
        d.get('mod_salud_mental', 0), d.get('mod_sibo', 0),
        d.get('mod_eii', 0), d.get('notas_clinicas')
    ))
    vid = cur.lastrowid
    db.commit()
    db.close()
    return ok({'visita_id': vid, 'numero_visita': num}, 'Visita creada')


@app.route('/api/visitas/<int:vid>', methods=['GET'])
def get_visita_completa(vid):
    db = get_db()
    v = row_to_dict(db.execute("SELECT * FROM visitas WHERE id=?", (vid,)).fetchone())
    if not v:
        db.close()
        return err('Visita no encontrada', 404)

    v['composicion_corporal'] = row_to_dict(
        db.execute("SELECT * FROM composicion_corporal WHERE visita_id=?", (vid,)).fetchone())
    v['analiticas'] = row_to_dict(
        db.execute("SELECT * FROM analiticas WHERE visita_id=?", (vid,)).fetchone())
    v['obesidad'] = row_to_dict(
        db.execute("SELECT * FROM obesidad WHERE visita_id=?", (vid,)).fetchone())
    v['salud_mental'] = row_to_dict(
        db.execute("SELECT * FROM salud_mental WHERE visita_id=?", (vid,)).fetchone())
    v['sibo_imo'] = row_to_dict(
        db.execute("SELECT * FROM sibo_imo WHERE visita_id=?", (vid,)).fetchone())
    v['eii'] = row_to_dict(
        db.execute("SELECT * FROM eii WHERE visita_id=?", (vid,)).fetchone())
    v['registro_24h'] = row_to_dict(
        db.execute("SELECT * FROM registro_24h WHERE visita_id=?", (vid,)).fetchone())
    v['frecuencia_consumo'] = rows_to_list(
        db.execute("SELECT * FROM frecuencia_consumo WHERE visita_id=?", (vid,)).fetchall())
    v['plan_nutricional'] = row_to_dict(
        db.execute("SELECT * FROM plan_nutricional WHERE visita_id=?", (vid,)).fetchone())
    v['farmacoterapia'] = rows_to_list(
        db.execute("SELECT * FROM farmacoterapia WHERE visita_id=?", (vid,)).fetchall())
    v['requerimientos'] = row_to_dict(
        db.execute("SELECT * FROM requerimientos_visita WHERE visita_id=? ORDER BY id DESC LIMIT 1", (vid,)).fetchone())
    v['diagnostico_nutricional'] = row_to_dict(
        db.execute("SELECT * FROM diagnostico_nutricional WHERE visita_id=?", (vid,)).fetchone())
    v['diabetes'] = row_to_dict(
        db.execute("SELECT * FROM diabetes_visita WHERE visita_id=?", (vid,)).fetchone())
    v['renal'] = row_to_dict(
        db.execute("SELECT * FROM modulo_renal WHERE visita_id=?", (vid,)).fetchone())
    db.close()
    return ok(v)


# ════════════════════════════════════════════════════════════
# COMPOSICIÓN CORPORAL
# ════════════════════════════════════════════════════════════

@app.route('/api/visitas/<int:vid>/composicion', methods=['POST'])
def save_composicion(vid):
    d = request.json
    db = get_db()

    # Obtener datos del paciente para cálculos
    visita = row_to_dict(db.execute("SELECT * FROM visitas WHERE id=?", (vid,)).fetchone())
    paciente = row_to_dict(db.execute("SELECT * FROM pacientes WHERE id=?", (visita['paciente_id'],)).fetchone())
    edad = calc_edad(paciente.get('fecha_nacimiento'))
    sexo = paciente.get('sexo')

    # Cálculos automáticos
    peso = d.get('peso')
    talla = d.get('talla')
    imc, cls_imc = calc_imc(peso, talla)
    ct = calc_cintura_talla(d.get('cintura'), talla)
    cc = calc_cintura_cadera(d.get('cintura'), d.get('cadera'))
    get_val = calc_get(d.get('tmb_equipo'), d.get('factor_actividad', 1.4))
    proteina = calc_proteina_objetivo(peso)

    # Handgrip — mejor de 3
    hd = [d.get('handgrip_der_1'), d.get('handgrip_der_2'), d.get('handgrip_der_3')]
    hi = [d.get('handgrip_izq_1'), d.get('handgrip_izq_2'), d.get('handgrip_izq_3')]
    hd_mejor = max((x for x in hd if x), default=None)
    hi_mejor = max((x for x in hi if x), default=None)
    hd_interp = calc_handgrip_interp(hd_mejor, sexo)
    hi_interp = calc_handgrip_interp(hi_mejor, sexo)
    handgrip_interp = hd_interp  # dominante

    # SARC-F
    sarcf_total, sarcf_interp = calc_sarcf(
        d.get('sarcf_carga'), d.get('sarcf_asistencia'),
        d.get('sarcf_levantarse'), d.get('sarcf_escaleras'),
        d.get('sarcf_caidas')
    )

    # Sit-to-stand interpretación por edad y sexo (EWGSOP2 / FNIH)
    sts_reps = d.get('sit_to_stand_reps')
    sts_interp = None
    if sts_reps is not None and edad and sexo:
        # Puntos de corte aproximados: <10 reps = bajo en adultos >60
        if edad >= 60:
            sts_interp = 'Bajo' if sts_reps < 10 else ('Límite' if sts_reps < 12 else 'Normal')
        else:
            sts_interp = 'Bajo' if sts_reps < 12 else 'Normal'

    # Eliminar registro previo de esta visita si existe
    db.execute("DELETE FROM composicion_corporal WHERE visita_id=?", (vid,))

    db.execute("""
        INSERT INTO composicion_corporal (
            visita_id, paciente_id, fecha,
            peso, talla, imc, clasificacion_imc,
            cintura, cadera, pantorrilla,
            cintura_talla, cintura_cadera,
            equipo, pct_grasa, kg_grasa, kg_masa_magra,
            kg_masa_muscular, agua_corporal, masa_osea,
            edad_metabolica, tmb_equipo,
            factor_actividad, get_calculado, proteina_objetivo,
            handgrip_der_1, handgrip_der_2, handgrip_der_3, handgrip_der_mejor,
            handgrip_izq_1, handgrip_izq_2, handgrip_izq_3, handgrip_izq_mejor,
            handgrip_interpretacion,
            sit_to_stand_reps, sit_to_stand_interp,
            sarcf_carga, sarcf_asistencia, sarcf_levantarse,
            sarcf_escaleras, sarcf_caidas, sarcf_total, sarcf_interpretacion,
            notas
        ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    """, (
        vid, visita['paciente_id'], d.get('fecha', today()),
        peso, talla, imc, cls_imc,
        d.get('cintura'), d.get('cadera'), d.get('pantorrilla'),
        ct, cc,
        d.get('equipo', 'InBody120'),
        d.get('pct_grasa'), d.get('kg_grasa'), d.get('kg_masa_magra'),
        d.get('kg_masa_muscular'), d.get('agua_corporal'), d.get('masa_osea'),
        d.get('edad_metabolica'), d.get('tmb_equipo'),
        d.get('factor_actividad', 1.4), get_val, proteina,
        hd[0], hd[1], hd[2], hd_mejor,
        hi[0], hi[1], hi[2], hi_mejor,
        handgrip_interp,
        sts_reps, sts_interp,
        d.get('sarcf_carga'), d.get('sarcf_asistencia'), d.get('sarcf_levantarse'),
        d.get('sarcf_escaleras'), d.get('sarcf_caidas'), sarcf_total, sarcf_interp,
        d.get('notas')
    ))
    db.commit()
    db.close()

    return ok({
        'imc': imc, 'clasificacion_imc': cls_imc,
        'cintura_talla': ct, 'cintura_cadera': cc,
        'get_calculado': get_val, 'proteina_objetivo': proteina,
        'handgrip_der_mejor': hd_mejor, 'handgrip_izq_mejor': hi_mejor,
        'handgrip_interpretacion': handgrip_interp,
        'sit_to_stand_interp': sts_interp,
        'sarcf_total': sarcf_total, 'sarcf_interpretacion': sarcf_interp
    }, 'Composición corporal guardada')


# ════════════════════════════════════════════════════════════
# ANALÍTICAS
# ════════════════════════════════════════════════════════════

@app.route('/api/visitas/<int:vid>/analiticas', methods=['POST'])
def save_analiticas(vid):
    d = request.json
    db = get_db()

    visita = row_to_dict(db.execute("SELECT * FROM visitas WHERE id=?", (vid,)).fetchone())
    paciente = row_to_dict(db.execute("SELECT * FROM pacientes WHERE id=?", (visita['paciente_id'],)).fetchone())
    edad = calc_edad(paciente.get('fecha_nacimiento'))
    sexo = paciente.get('sexo')

    # Cálculos automáticos
    homa, homa_interp = calc_homa_ir(d.get('glucemia_ayunas'), d.get('insulina_ayunas'))
    egfr, egfr_estadio = calc_egfr_ckd_epi(d.get('creatinina'), edad, sexo)
    no_hdl = calc_no_hdl(d.get('colesterol_total'), d.get('hdl'))
    indice_atero = calc_indice_aterogenico(d.get('colesterol_total'), d.get('hdl'))

    db.execute("DELETE FROM analiticas WHERE visita_id=?", (vid,))
    db.execute("""
        INSERT INTO analiticas (
            visita_id, paciente_id, fecha, fecha_muestra,
            glucemia_ayunas, insulina_ayunas, homa_ir, homa_interpretacion,
            hba1c, glucemia_2h,
            colesterol_total, ldl, hdl, trigliceridos, no_hdl,
            indice_aterogenico, apob,
            creatinina, urea, acido_urico, egfr, egfr_estadio, microalbuminuria,
            alt, ast, ggt, fosfatasa_alcalina, bilirrubina_total,
            tsh, t4_libre,
            pcr_us, ferritina, hierro_serico, sat_transferrina,
            vitamina_d, vitamina_b12, folato, magnesio, zinc,
            hemoglobina, hematocrito, leucocitos, linfocitos,
            notas
        ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    """, (
        vid, visita['paciente_id'], d.get('fecha', today()), d.get('fecha_muestra'),
        d.get('glucemia_ayunas'), d.get('insulina_ayunas'), homa, homa_interp,
        d.get('hba1c'), d.get('glucemia_2h'),
        d.get('colesterol_total'), d.get('ldl'), d.get('hdl'),
        d.get('trigliceridos'), no_hdl, indice_atero, d.get('apob'),
        d.get('creatinina'), d.get('urea'), d.get('acido_urico'),
        egfr, egfr_estadio, d.get('microalbuminuria'),
        d.get('alt'), d.get('ast'), d.get('ggt'),
        d.get('fosfatasa_alcalina'), d.get('bilirrubina_total'),
        d.get('tsh'), d.get('t4_libre'),
        d.get('pcr_us'), d.get('ferritina'), d.get('hierro_serico'),
        d.get('sat_transferrina'), d.get('vitamina_d'), d.get('vitamina_b12'),
        d.get('folato'), d.get('magnesio'), d.get('zinc'),
        d.get('hemoglobina'), d.get('hematocrito'),
        d.get('leucocitos'), d.get('linfocitos'),
        d.get('notas')
    ))
    db.commit()
    db.close()

    return ok({
        'homa_ir': homa, 'homa_interpretacion': homa_interp,
        'egfr': egfr, 'egfr_estadio': egfr_estadio,
        'no_hdl': no_hdl, 'indice_aterogenico': indice_atero
    }, 'Analíticas guardadas')


# ════════════════════════════════════════════════════════════
# OBESIDAD + OBSCORE
# ════════════════════════════════════════════════════════════

@app.route('/api/visitas/<int:vid>/obesidad', methods=['POST'])
def save_obesidad(vid):
    d = request.json
    db = get_db()

    visita = row_to_dict(db.execute("SELECT * FROM visitas WHERE id=?", (vid,)).fetchone())
    paciente = row_to_dict(db.execute("SELECT * FROM pacientes WHERE id=?", (visita['paciente_id'],)).fetchone())
    edad = calc_edad(paciente.get('fecha_nacimiento'))

    # OBSCORE desde analíticas y CC más recientes si no se pasan directamente
    cc = row_to_dict(db.execute(
        "SELECT * FROM composicion_corporal WHERE visita_id=?", (vid,)).fetchone()) or {}
    an = row_to_dict(db.execute(
        "SELECT * FROM analiticas WHERE visita_id=?", (vid,)).fetchone()) or {}

    obs_pct, obs_nivel = obscore_estimate(
        edad,
        d.get('imc') or cc.get('imc'),
        d.get('hba1c') or an.get('hba1c'),
        d.get('hdl') or an.get('hdl'),
        d.get('sbp'),
        d.get('creatinina') or an.get('creatinina'),
        d.get('cintura_talla') or cc.get('cintura_talla'),
        paciente.get('tabaquismo') or 'no'
    )

    db.execute("DELETE FROM obesidad WHERE visita_id=?", (vid,))
    db.execute("""
        INSERT INTO obesidad (
            visita_id, paciente_id, clasificacion_imc,
            obesidad_prec_clinica, estadio,
            obscore_pct, obscore_nivel, obscore_fecha,
            riesgo_cardio,
            comp_dm2, comp_hta, comp_dislipidemia,
            comp_higado_graso, comp_saos, comp_artrosis,
            comp_depresion, comp_otras, notas
        ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    """, (
        vid, visita['paciente_id'],
        d.get('clasificacion_imc') or cc.get('clasificacion_imc'),
        d.get('obesidad_prec_clinica'), d.get('estadio'),
        obs_pct, obs_nivel, today(),
        d.get('riesgo_cardio'),
        d.get('comp_dm2', 0), d.get('comp_hta', 0),
        d.get('comp_dislipidemia', 0), d.get('comp_higado_graso', 0),
        d.get('comp_saos', 0), d.get('comp_artrosis', 0),
        d.get('comp_depresion', 0), d.get('comp_otras'),
        d.get('notas')
    ))
    db.commit()
    db.close()

    return ok({
        'obscore_pct': obs_pct, 'obscore_nivel': obs_nivel
    }, 'Módulo obesidad guardado')


# ════════════════════════════════════════════════════════════
# SALUD MENTAL
# ════════════════════════════════════════════════════════════

@app.route('/api/visitas/<int:vid>/salud_mental', methods=['POST'])
def save_salud_mental(vid):
    d = request.json
    db = get_db()
    visita = row_to_dict(db.execute("SELECT * FROM visitas WHERE id=?", (vid,)).fetchone())

    phq9_items = [d.get(f'phq9_{i}') for i in range(1, 10)]
    gad7_items = [d.get(f'gad7_{i}') for i in range(1, 8)]
    phq9_total, phq9_sev = calc_phq9(phq9_items)
    gad7_total, gad7_sev = calc_gad7(gad7_items)

    # Derivación automática
    der_psic = 1 if (phq9_total and phq9_total >= 10) else d.get('derivacion_psicologia', 0)
    der_psiq = 1 if (phq9_total and phq9_total >= 15) else d.get('derivacion_psiquiatria', 0)

    db.execute("DELETE FROM salud_mental WHERE visita_id=?", (vid,))
    db.execute("""
        INSERT INTO salud_mental (
            visita_id, paciente_id, fecha,
            phq9_1,phq9_2,phq9_3,phq9_4,phq9_5,phq9_6,phq9_7,phq9_8,phq9_9,
            phq9_total, phq9_severidad,
            gad7_1,gad7_2,gad7_3,gad7_4,gad7_5,gad7_6,gad7_7,
            gad7_total, gad7_severidad,
            comer_emocional, atracones_frecuencia, craving_tipo, craving_intensidad,
            sueno_horas, sueno_calidad, sueno_latencia, sueno_despertares,
            derivacion_psicologia, derivacion_psiquiatria, derivacion_motivo, notas
        ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    """, (
        vid, visita['paciente_id'], d.get('fecha', today()),
        *phq9_items, phq9_total, phq9_sev,
        *gad7_items, gad7_total, gad7_sev,
        d.get('comer_emocional'), d.get('atracones_frecuencia'),
        d.get('craving_tipo'), d.get('craving_intensidad'),
        d.get('sueno_horas'), d.get('sueno_calidad'),
        d.get('sueno_latencia'), d.get('sueno_despertares'),
        der_psic, der_psiq, d.get('derivacion_motivo'), d.get('notas')
    ))
    db.commit()
    db.close()

    return ok({
        'phq9_total': phq9_total, 'phq9_severidad': phq9_sev,
        'gad7_total': gad7_total, 'gad7_severidad': gad7_sev,
        'derivacion_psicologia': der_psic, 'derivacion_psiquiatria': der_psiq
    }, 'Salud mental guardada')


# ════════════════════════════════════════════════════════════
# REGISTRO ALIMENTARIO
# ════════════════════════════════════════════════════════════

@app.route('/api/visitas/<int:vid>/registro24h', methods=['POST'])
def save_registro24h(vid):
    d = request.json
    db = get_db()
    visita = row_to_dict(db.execute("SELECT * FROM visitas WHERE id=?", (vid,)).fetchone())

    db.execute("DELETE FROM registro_24h WHERE visita_id=?", (vid,))
    db.execute("""
        INSERT INTO registro_24h (
            visita_id, paciente_id, fecha,
            desayuno, media_manana, almuerzo, merienda, cena, otros,
            kcal_estimadas, proteinas_g, carbohidratos_g, grasas_g,
            fibra_g, agua_l, dia_tipico, observaciones
        ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    """, (
        vid, visita['paciente_id'], d.get('fecha', today()),
        d.get('desayuno'), d.get('media_manana'), d.get('almuerzo'),
        d.get('merienda'), d.get('cena'), d.get('otros'),
        d.get('kcal_estimadas'), d.get('proteinas_g'),
        d.get('carbohidratos_g'), d.get('grasas_g'),
        d.get('fibra_g'), d.get('agua_l'),
        d.get('dia_tipico', 1), d.get('observaciones')
    ))
    db.commit()
    db.close()
    return ok(msg='Registro 24h guardado')


@app.route('/api/visitas/<int:vid>/frecuencia', methods=['POST'])
def save_frecuencia(vid):
    items = request.json  # lista de {grupo, frecuencia, porcion, observacion}
    db = get_db()
    visita = row_to_dict(db.execute("SELECT * FROM visitas WHERE id=?", (vid,)).fetchone())

    db.execute("DELETE FROM frecuencia_consumo WHERE visita_id=?", (vid,))
    for item in items:
        db.execute("""
            INSERT INTO frecuencia_consumo
            (visita_id, paciente_id, fecha, grupo_alimentario, frecuencia, porcion_habitual, observacion)
            VALUES (?,?,?,?,?,?,?)
        """, (
            vid, visita['paciente_id'], today(),
            item.get('grupo'), item.get('frecuencia'),
            item.get('porcion'), item.get('observacion')
        ))
    db.commit()
    db.close()
    return ok(msg='Frecuencia de consumo guardada')


# ════════════════════════════════════════════════════════════
# PLAN NUTRICIONAL
# ════════════════════════════════════════════════════════════

@app.route('/api/visitas/<int:vid>/plan', methods=['POST'])
def save_plan(vid):
    d = request.json
    db = get_db()
    visita = row_to_dict(db.execute("SELECT * FROM visitas WHERE id=?", (vid,)).fetchone())

    db.execute("DELETE FROM plan_nutricional WHERE visita_id=?", (vid,))
    db.execute("""
        INSERT INTO plan_nutricional (
            visita_id, paciente_id, fecha,
            objetivo_principal, peso_objetivo,
            kcal_prescritas, proteina_prescrita,
            agua_recomendada, deficit_superavit,
            plantilla_dieta, suplementacion,
            indicaciones, proxima_evaluacion
        ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)
    """, (
        vid, visita['paciente_id'], d.get('fecha', today()),
        d.get('objetivo_principal'), d.get('peso_objetivo'),
        d.get('kcal_prescritas'), d.get('proteina_prescrita'),
        d.get('agua_recomendada'), d.get('deficit_superavit'),
        d.get('plantilla_dieta'), d.get('suplementacion'),
        d.get('indicaciones'), d.get('proxima_evaluacion')
    ))
    db.commit()
    db.close()
    return ok(msg='Plan nutricional guardado')


# ════════════════════════════════════════════════════════════
# ESTADÍSTICAS / DASHBOARD INVESTIGACIÓN
# ════════════════════════════════════════════════════════════

@app.route('/api/estadisticas', methods=['GET'])
def get_estadisticas():
    db = get_db()

    total = db.execute("SELECT COUNT(*) as n FROM pacientes WHERE activo=1").fetchone()['n']
    por_inst = rows_to_list(db.execute(
        "SELECT institucion, COUNT(*) as n FROM pacientes WHERE activo=1 GROUP BY institucion"
    ).fetchall())
    por_sexo = rows_to_list(db.execute(
        "SELECT sexo, COUNT(*) as n FROM pacientes WHERE activo=1 GROUP BY sexo"
    ).fetchall())
    obesidad_dist = rows_to_list(db.execute("""
        SELECT ob.obscore_nivel, COUNT(*) as n
        FROM obesidad ob
        JOIN visitas v ON ob.visita_id = v.id
        WHERE v.id IN (SELECT MAX(id) FROM visitas GROUP BY paciente_id)
        GROUP BY ob.obscore_nivel
    """).fetchall())
    imc_dist = rows_to_list(db.execute("""
        SELECT cc.clasificacion_imc, COUNT(*) as n
        FROM composicion_corporal cc
        JOIN visitas v ON cc.visita_id = v.id
        WHERE v.id IN (SELECT MAX(id) FROM visitas GROUP BY paciente_id)
        GROUP BY cc.clasificacion_imc
    """).fetchall())
    homa_resistencia = db.execute("""
        SELECT COUNT(*) as n FROM analiticas
        WHERE homa_ir >= 2.5
        AND visita_id IN (SELECT MAX(id) FROM visitas GROUP BY paciente_id)
    """).fetchone()['n']

    db.close()
    return ok({
        'total_pacientes': total,
        'por_institucion': por_inst,
        'por_sexo': por_sexo,
        'obscore_distribucion': obesidad_dist,
        'imc_distribucion': imc_dist,
        'resistencia_insulina': homa_resistencia
    })


# ════════════════════════════════════════════════════════════
# EXPORTACIÓN
# ════════════════════════════════════════════════════════════

@app.route('/api/exportar/csv', methods=['GET'])
def exportar_csv():
    import csv
    import io
    db = get_db()
    rows = rows_to_list(db.execute("SELECT * FROM v_resumen_pacientes").fetchall())
    db.close()

    output = io.StringIO()
    if rows:
        writer = csv.DictWriter(output, fieldnames=rows[0].keys())
        writer.writeheader()
        writer.writerows(rows)

    from flask import Response
    return Response(
        output.getvalue(),
        mimetype='text/csv',
        headers={'Content-Disposition': 'attachment;filename=pacientes_export.csv'}
    )


# ════════════════════════════════════════════════════════════
# SIBO / EII
# ════════════════════════════════════════════════════════════

@app.route('/api/visitas/<int:vid>/sibo', methods=['POST'])
def save_sibo(vid):
    d = request.json
    db = get_db()
    visita = row_to_dict(db.execute("SELECT * FROM visitas WHERE id=?", (vid,)).fetchone())
    score = sum(filter(None, [d.get('distension'), d.get('dolor_abdominal'),
        d.get('flatulencia'), d.get('diarrea'), d.get('estrenimiento'),
        d.get('reflujo'), d.get('fatiga')]))
    db.execute("DELETE FROM sibo_imo WHERE visita_id=?", (vid,))
    db.execute("""
        INSERT INTO sibo_imo (visita_id, paciente_id, fecha,
            ipt_previo, antibioticos_recientes, ibs_diagnostico,
            hipotiroidismo, diabetes, cirugia_gi,
            distension, dolor_abdominal, flatulencia, diarrea,
            estrenimiento, reflujo, fatiga, score_total,
            prueba_respiratoria, resultado_prueba, fecha_prueba,
            tratamiento, dieta_indicada, notas)
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    """, (
        vid, visita['paciente_id'], d.get('fecha', today()),
        d.get('ipt_previo',0), d.get('antibioticos_recientes',0),
        d.get('ibs_diagnostico',0), d.get('hipotiroidismo',0),
        d.get('diabetes',0), d.get('cirugia_gi',0),
        d.get('distension'), d.get('dolor_abdominal'),
        d.get('flatulencia'), d.get('diarrea'),
        d.get('estrenimiento'), d.get('reflujo'), d.get('fatiga'), score,
        d.get('prueba_respiratoria'), d.get('resultado_prueba'),
        d.get('fecha_prueba'), d.get('tratamiento'),
        d.get('dieta_indicada'), d.get('notas')
    ))
    db.commit()
    db.close()
    return ok({'score_sintomas': score}, 'SIBO/IMO guardado')


@app.route('/api/visitas/<int:vid>/eii', methods=['POST'])
def save_eii(vid):
    d = request.json
    db = get_db()
    visita = row_to_dict(db.execute("SELECT * FROM visitas WHERE id=?", (vid,)).fetchone())
    pgsa_items = [d.get('pgsa_perdida_peso'), d.get('pgsa_ingesta'),
                  d.get('pgsa_sintomas'), d.get('pgsa_actividad')]
    pgsa_total, pgsa_cat = calc_pgsa(pgsa_items)
    db.execute("DELETE FROM eii WHERE visita_id=?", (vid,))
    db.execute("""
        INSERT INTO eii (visita_id, paciente_id, fecha,
            tipo_eii, fecha_diagnostico, localizacion, actividad,
            pgsa_perdida_peso, pgsa_ingesta, pgsa_sintomas, pgsa_actividad,
            pgsa_total, pgsa_categoria,
            glim_fenotipico, glim_etiologico, glim_diagnostico,
            sarcopenia,
            deficit_fe, deficit_b12, deficit_d, deficit_zinc,
            deficit_folato, deficit_otros, notas)
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    """, (
        vid, visita['paciente_id'], d.get('fecha', today()),
        d.get('tipo_eii'), d.get('fecha_diagnostico'),
        d.get('localizacion'), d.get('actividad'),
        *pgsa_items, pgsa_total, pgsa_cat,
        d.get('glim_fenotipico'), d.get('glim_etiologico'),
        d.get('glim_diagnostico'), d.get('sarcopenia'),
        d.get('deficit_fe',0), d.get('deficit_b12',0),
        d.get('deficit_d',0), d.get('deficit_zinc',0),
        d.get('deficit_folato',0), d.get('deficit_otros'),
        d.get('notas')
    ))
    db.commit()
    db.close()
    return ok({'pgsa_total': pgsa_total, 'pgsa_categoria': pgsa_cat}, 'EII guardada')


# ════════════════════════════════════════════════════════════
# SEGUIMIENTO LONGITUDINAL
# ════════════════════════════════════════════════════════════

@app.route('/api/pacientes/<int:pid>/evolucion', methods=['GET'])
def get_evolucion(pid):
    """Evolución longitudinal de composición corporal"""
    db = get_db()
    rows = rows_to_list(db.execute("""
        SELECT v.fecha, v.numero_visita,
               cc.peso, cc.imc, cc.pct_grasa,
               cc.kg_masa_muscular, cc.cintura,
               an.homa_ir, an.hba1c, an.trigliceridos, an.hdl
        FROM visitas v
        LEFT JOIN composicion_corporal cc ON cc.visita_id = v.id
        LEFT JOIN analiticas an ON an.visita_id = v.id
        WHERE v.paciente_id = ?
        ORDER BY v.fecha ASC
    """, (pid,)).fetchall())
    db.close()
    return ok(rows)


# ════════════════════════════════════════════════════════════
# IMPORTACIÓN MDB
# ════════════════════════════════════════════════════════════

@app.route('/api/importar/mdb', methods=['POST'])
def importar_mdb():
    """
    Recibe archivo MDB, lo procesa e importa pacientes.
    Soporta Windows (pyodbc) y Linux (mdbtools).
    """
    if 'file' not in request.files:
        return err('No se recibió archivo')

    f = request.files['file']
    institucion = request.form.get('institucion', 'UM')

    if not f.filename.lower().endswith('.mdb'):
        return err('El archivo debe ser .mdb')

    # Guardar temporalmente
    import tempfile
    with tempfile.NamedTemporaryFile(suffix='.mdb', delete=False) as tmp:
        f.save(tmp.name)
        tmp_path = tmp.name

    try:
        from mdb_importer import import_mdb
        stats = import_mdb(tmp_path, institucion, DB_PATH)
        return ok(stats, f"Importación completada: {stats.get('importados',0)} pacientes")
    except Exception as e:
        return err(f'Error en importación: {str(e)}')
    finally:
        try:
            os.unlink(tmp_path)
        except:
            pass


@app.route('/api/importar/csv', methods=['POST'])
def importar_csv_pacientes():
    """
    Fallback: importar desde CSV exportado manualmente.
    El CSV debe tener columnas: Nombre, Apellidos, Cedula, FechaNacimiento, Sexo
    """
    if 'file' not in request.files:
        return err('No se recibió archivo')

    f = request.files['file']
    institucion = request.form.get('institucion', 'UM')

    import csv, io, tempfile
    content = f.read().decode('utf-8-sig', errors='replace')
    reader = csv.DictReader(io.StringIO(content))

    from mdb_importer import find_field, parse_date, parse_sex, FIELD_MAP
    db = get_db()

    stats = {'importados': 0, 'duplicados': 0, 'errores': 0, 'muestra': []}

    for row in reader:
        try:
            nombre = find_field(row, FIELD_MAP['nombre']) or 'Sin nombre'
            apellidos = find_field(row, FIELD_MAP['apellidos']) or ''
            cedula = find_field(row, FIELD_MAP['cedula'])
            fecha_nac = parse_date(find_field(row, FIELD_MAP['fecha_nac']))
            sexo = parse_sex(find_field(row, FIELD_MAP['sexo']))
            telefono = find_field(row, FIELD_MAP['telefono'])
            ocupacion = find_field(row, FIELD_MAP['ocupacion'])

            if cedula:
                exists = db.execute("SELECT id FROM pacientes WHERE cedula=?", (cedula,)).fetchone()
                if exists:
                    stats['duplicados'] += 1
                    continue

            cur = db.execute("""
                INSERT INTO pacientes
                (nombre, apellidos, cedula, fecha_nacimiento, sexo,
                 telefono, ocupacion, institucion, tipo_consulta)
                VALUES (?,?,?,?,?,?,?,?,?)
            """, (nombre, apellidos, cedula, fecha_nac, sexo,
                  telefono, ocupacion, institucion, 'AMBULATORIA'))
            pid = cur.lastrowid
            db.execute("INSERT INTO antecedentes (paciente_id) VALUES (?)", (pid,))
            stats['importados'] += 1

            if len(stats['muestra']) < 3:
                stats['muestra'].append({'nombre': nombre, 'apellidos': apellidos, 'cedula': cedula})

        except Exception as e:
            stats['errores'] += 1

    db.commit()
    db.close()
    return ok(stats, f"CSV importado: {stats['importados']} pacientes")


@app.route('/api/importar/demo', methods=['POST'])
def importar_demo():
    """Cargar pacientes de demostración para pruebas"""
    institucion = request.json.get('institucion', 'UM') if request.json else 'UM'

    demo_patients = [
        ('Rosa María', 'García Martínez', '001-1234567-8', '1972-03-14', 'F', '809-555-1234', 'Maestra', 'UM'),
        ('Carlos', 'Ramírez Peña', '002-9876543-1', '1959-07-22', 'M', '809-555-5678', 'Comerciante', 'MAT'),
        ('María José', 'Santos López', '001-5551234-0', '1984-11-05', 'F', '829-555-9012', 'Enfermera', 'UM'),
        ('Pedro', 'Jiménez Vargas', '001-7778888-5', '1967-04-18', 'M', '849-555-3456', 'Ingeniero', 'UM'),
        ('Ana Lucía', 'Méndez Cruz', '003-4441111-2', '1991-08-30', 'F', '809-555-7890', 'Abogada', 'MAT'),
    ]

    db = get_db()
    importados = 0
    for nombre, apellidos, cedula, dob, sexo, tel, ocup, inst in demo_patients:
        exists = db.execute("SELECT id FROM pacientes WHERE cedula=?", (cedula,)).fetchone()
        if exists:
            continue
        cur = db.execute("""
            INSERT INTO pacientes (nombre, apellidos, cedula, fecha_nacimiento,
            sexo, telefono, ocupacion, institucion, tipo_consulta)
            VALUES (?,?,?,?,?,?,?,?,?)
        """, (nombre, apellidos, cedula, dob, sexo, tel, ocup, inst, 'AMBULATORIA'))
        pid = cur.lastrowid
        db.execute("INSERT INTO antecedentes (paciente_id) VALUES (?)", (pid,))
        importados += 1
    db.commit()
    db.close()
    return ok({'importados': importados}, f'{importados} pacientes demo cargados')


# ════════════════════════════════════════════════════════════
# CRONOLOGÍA DE ANALÍTICAS
# ════════════════════════════════════════════════════════════

@app.route('/api/pacientes/<int:pid>/cronologia', methods=['GET'])
def get_cronologia(pid):
    """
    Cronología completa de analíticas y composición corporal.
    Agrupa por categorías para visualización en timeline.
    """
    db = get_db()

    # Composición corporal longitudinal
    cc_rows = rows_to_list(db.execute("""
        SELECT
            v.fecha, v.numero_visita, v.institucion,
            cc.peso, cc.imc, cc.clasificacion_imc,
            cc.pct_grasa, cc.kg_grasa,
            cc.kg_masa_muscular, cc.kg_masa_magra,
            cc.cintura, cc.cintura_talla,
            cc.agua_corporal,
            cc.handgrip_der_mejor, cc.handgrip_interpretacion,
            cc.sit_to_stand_reps, cc.sit_to_stand_interp,
            cc.sarcf_total, cc.sarcf_interpretacion
        FROM visitas v
        JOIN composicion_corporal cc ON cc.visita_id = v.id
        WHERE v.paciente_id = ?
        ORDER BY v.fecha ASC
    """, (pid,)).fetchall())

    # Analíticas longitudinales
    an_rows = rows_to_list(db.execute("""
        SELECT
            v.fecha, v.numero_visita, v.institucion,
            -- Glucometabolismo
            an.glucemia_ayunas, an.insulina_ayunas, an.homa_ir,
            an.homa_interpretacion, an.hba1c, an.glucemia_2h,
            -- Lípidos
            an.colesterol_total, an.ldl, an.hdl, an.trigliceridos,
            an.no_hdl, an.indice_aterogenico, an.apob,
            -- Renal
            an.creatinina, an.egfr, an.egfr_estadio,
            an.acido_urico, an.microalbuminuria,
            -- Hepático
            an.alt, an.ast, an.ggt,
            -- Tiroides / Inflamación
            an.tsh, an.pcr_us,
            -- Micronutrientes
            an.vitamina_d, an.vitamina_b12, an.ferritina,
            an.hemoglobina
        FROM visitas v
        JOIN analiticas an ON an.visita_id = v.id
        WHERE v.paciente_id = ?
        ORDER BY v.fecha ASC
    """, (pid,)).fetchall())

    # Calcular deltas (cambios entre visitas)
    def calc_deltas(rows, key):
        """Calcular cambio absoluto y % desde primera visita"""
        results = []
        baseline = None
        for i, row in enumerate(rows):
            val = row.get(key)
            entry = {'fecha': row['fecha'], 'valor': val, 'delta': None, 'delta_pct': None}
            if val is not None:
                if baseline is None:
                    baseline = val
                elif baseline != 0:
                    entry['delta'] = round(val - baseline, 2)
                    entry['delta_pct'] = round(((val - baseline) / abs(baseline)) * 100, 1)
            results.append(entry)
        return results

    # Construir respuesta estructurada
    cronologia = {
        'composicion': cc_rows,
        'analiticas': an_rows,
        'series': {
            'peso':         calc_deltas(cc_rows, 'peso'),
            'imc':          calc_deltas(cc_rows, 'imc'),
            'pct_grasa':    calc_deltas(cc_rows, 'pct_grasa'),
            'masa_muscular':calc_deltas(cc_rows, 'kg_masa_muscular'),
            'cintura':      calc_deltas(cc_rows, 'cintura'),
            'homa_ir':      calc_deltas(an_rows, 'homa_ir'),
            'hba1c':        calc_deltas(an_rows, 'hba1c'),
            'glucemia':     calc_deltas(an_rows, 'glucemia_ayunas'),
            'colesterol':   calc_deltas(an_rows, 'colesterol_total'),
            'ldl':          calc_deltas(an_rows, 'ldl'),
            'hdl':          calc_deltas(an_rows, 'hdl'),
            'trigliceridos':calc_deltas(an_rows, 'trigliceridos'),
            'egfr':         calc_deltas(an_rows, 'egfr'),
            'vitamina_d':   calc_deltas(an_rows, 'vitamina_d'),
            'hemoglobina':  calc_deltas(an_rows, 'hemoglobina'),
        },
        'resumen': {}
    }

    # Resumen de cambios desde baseline
    def resumen_cambio(series_key, label, unit, mejor='bajo'):
        s = cronologia['series'].get(series_key, [])
        vals = [x for x in s if x['valor'] is not None]
        if len(vals) < 2:
            return None
        primero = vals[0]['valor']
        ultimo = vals[-1]['valor']
        delta = round(ultimo - primero, 2)
        delta_pct = round((delta / abs(primero)) * 100, 1) if primero else None
        positivo = delta < 0 if mejor == 'bajo' else delta > 0
        return {
            'label': label, 'unit': unit,
            'baseline': primero, 'actual': ultimo,
            'delta': delta, 'delta_pct': delta_pct,
            'tendencia': 'mejora' if positivo else 'empeora' if delta != 0 else 'estable'
        }

    resumen_vars = [
        ('peso',          'Peso',             'kg',      'bajo'),
        ('pct_grasa',     '% Grasa',          '%',       'bajo'),
        ('masa_muscular', 'Masa muscular',     'kg',      'alto'),
        ('cintura',       'Cintura',          'cm',      'bajo'),
        ('homa_ir',       'HOMA-IR',          '',        'bajo'),
        ('hba1c',         'HbA1c',            '%',       'bajo'),
        ('ldl',           'LDL',              'mg/dL',   'bajo'),
        ('hdl',           'HDL',              'mg/dL',   'alto'),
        ('trigliceridos', 'Triglicéridos',    'mg/dL',   'bajo'),
        ('vitamina_d',    'Vitamina D',       'ng/mL',   'alto'),
    ]

    cronologia['resumen'] = {k: resumen_cambio(k, l, u, m)
                              for k, l, u, m in resumen_vars
                              if resumen_cambio(k, l, u, m)}

    db.close()
    return ok(cronologia)


# ════════════════════════════════════════════════════════════
# MÓDULO REQUERIMIENTOS Y METAS
# ════════════════════════════════════════════════════════════

@app.route('/api/visitas/<int:vid>/requerimientos', methods=['GET'])
def get_requerimientos(vid):
    db = get_db()
    row = db.execute(
        "SELECT * FROM requerimientos_visita WHERE visita_id=? ORDER BY id DESC LIMIT 1", (vid,)
    ).fetchone()
    db.close()
    return ok(row_to_dict(row) if row else {})


@app.route('/api/visitas/<int:vid>/requerimientos', methods=['POST'])
def save_requerimientos(vid):
    d = request.json
    db = get_db()
    vis = db.execute("SELECT paciente_id FROM visitas WHERE id=?", (vid,)).fetchone()
    if not vis:
        db.close()
        return err('Visita no encontrada', 404)

    existing = db.execute(
        "SELECT id FROM requerimientos_visita WHERE visita_id=?", (vid,)
    ).fetchone()

    fields = [
        'fecha','peso_actual','talla_cm','peso_ideal_hamwi','peso_ideal_devine',
        'peso_ajustado','peso_usado','peso_usado_kg',
        'formula_tmb','tmb_calculado','factor_actividad','factor_estres',
        'get_calculado','kcal_objetivo','deficit_kcal','kcal_kg',
        'metodo_proteina','proteina_g_kg','proteina_g_dia','proteina_pct_kcal',
        'cho_g_dia','cho_pct','grasa_g_dia','grasa_pct','fibra_g_dia',
        'agua_ml_dia','metodo_agua','restriccion_hidrica',
        'sodio_mg','potasio_mg','fosforo_mg','restriccion_k','restriccion_p',
        'meta_peso_kg','meta_pct_perdida','meta_cintura_cm','meta_imc',
        'meta_hba1c','meta_glucemia_ayunas','meta_ldl',
        'meta_ta_sistolica','meta_ta_diastolica','meta_egfr','meta_proteina_orina',
        'suplementacion','notas'
    ]

    vals = [d.get(f) for f in fields]

    if existing:
        sets = ', '.join(f"{f}=?" for f in fields)
        db.execute(
            f"UPDATE requerimientos_visita SET {sets} WHERE visita_id=?",
            vals + [vid]
        )
        rid = existing['id']
    else:
        cols = ', '.join(['visita_id','paciente_id'] + fields)
        phs  = ', '.join(['?'] * (2 + len(fields)))
        cur  = db.execute(
            f"INSERT INTO requerimientos_visita ({cols}) VALUES ({phs})",
            [vid, vis['paciente_id']] + vals
        )
        rid = cur.lastrowid

    db.commit()
    row = row_to_dict(db.execute("SELECT * FROM requerimientos_visita WHERE id=?", (rid,)).fetchone())
    db.close()
    return ok(row, 'Requerimientos guardados')


# ════════════════════════════════════════════════════════════
# MÓDULO RENAL
# ════════════════════════════════════════════════════════════

@app.route('/api/visitas/<int:vid>/renal', methods=['GET'])
def get_renal(vid):
    db  = get_db()
    row = row_to_dict(db.execute("SELECT * FROM modulo_renal WHERE visita_id=?", (vid,)).fetchone())
    db.close()
    return ok(row or {})


@app.route('/api/visitas/<int:vid>/renal', methods=['POST'])
def save_renal(vid):
    db  = get_db()
    vis = row_to_dict(db.execute("SELECT * FROM visitas WHERE id=?", (vid,)).fetchone())
    if not vis:
        db.close(); return err('Visita no encontrada', 404)

    d = request.json or {}
    fields = [
        'fecha', 'estadio_erc', 'modalidad', 'fecha_inicio_dialisis',
        'tiempo_en_dialisis_meses', 'acceso_vascular',
        'peso_seco', 'peso_pre_dialisis', 'peso_post_dialisis',
        'ganancia_interdial_kg', 'ganancia_interdial_pct',
        'sesiones_semana', 'duracion_sesion_h',
        'diuresis_residual_ml', 'funcion_renal_residual',
        'ktv_sp', 'ktv_meta', 'pre_bun', 'post_bun', 'ktv_calculado',
        'calcio', 'fosforo', 'producto_ca_p', 'pth_intacta',
        'vitamina_d_25', 'bicarbonato', 'albumina_renal', 'prealbumin',
        'hemoglobina', 'hematocrito', 'ferritina', 'saturacion_transferrina',
        'epo_dosis', 'hierro_iv',
        'restriccion_k_mg', 'restriccion_p_mg', 'restriccion_na_mg',
        'restriccion_agua_ml', 'proteina_g_dia',
        'malnutricion_pef', 'pef_nivel', 'pef_criterios',
        'dp_modalidad', 'dp_intercambios', 'dp_volumen_ml',
        'dp_glucosa_concentracion', 'dp_kcal_glucosa', 'notas',
    ]
    vals   = [d.get(f) for f in fields]
    existe = db.execute("SELECT id FROM modulo_renal WHERE visita_id=?", (vid,)).fetchone()

    if existe:
        sets = ', '.join(f"{f}=?" for f in fields)
        db.execute(f"UPDATE modulo_renal SET {sets} WHERE visita_id=?", vals + [vid])
        rid = existe['id']
    else:
        cols = 'visita_id, paciente_id, ' + ', '.join(fields)
        phs  = '?, ?, ' + ', '.join('?' for _ in fields)
        cur  = db.execute(f"INSERT INTO modulo_renal ({cols}) VALUES ({phs})",
                          [vid, vis['paciente_id']] + vals)
        rid  = cur.lastrowid

    db.commit()
    row = row_to_dict(db.execute("SELECT * FROM modulo_renal WHERE id=?", (rid,)).fetchone())
    db.close()
    return ok(row, 'Módulo renal guardado')


# ════════════════════════════════════════════════════════════
# DIAGNÓSTICO NUTRICIONAL
# ════════════════════════════════════════════════════════════

@app.route('/api/visitas/<int:vid>/diagnostico', methods=['GET'])
def get_diagnostico(vid):
    db = get_db()
    row = row_to_dict(db.execute(
        "SELECT * FROM diagnostico_nutricional WHERE visita_id=?", (vid,)
    ).fetchone())
    db.close()
    return ok(row or {})


@app.route('/api/visitas/<int:vid>/diagnostico', methods=['POST'])
def save_diagnostico(vid):
    db  = get_db()
    vis = row_to_dict(db.execute("SELECT * FROM visitas WHERE id=?", (vid,)).fetchone())
    if not vis:
        db.close(); return err('Visita no encontrada', 404)

    d = request.json or {}
    fields = [
        'fecha',
        'clasificacion_imc', 'riesgo_cintura', 'riesgo_icc',
        'glim_perdida_peso_pct', 'glim_perdida_peso_pos', 'glim_imc_bajo_pos',
        'glim_masa_musc_red_pos', 'glim_ingesta_red_pos', 'glim_inflamacion_pos',
        'glim_causa_inflamacion', 'glim_diagnostico', 'glim_notas',
        'sarc_fuerza_pos', 'sarc_masa_pos', 'sarc_rendimiento_pos',
        'sarc_iamm', 'sarc_diagnostico', 'sarc_notas',
        'rcm_glucosa', 'rcm_lipidos', 'rcm_ta', 'rcm_obesidad_central',
        'rcm_resultado', 'rcm_sindrome_metab',
        'estado_global', 'diagnostico_principal', 'plan_accion',
    ]
    vals   = [d.get(f) for f in fields]
    existe = db.execute("SELECT id FROM diagnostico_nutricional WHERE visita_id=?", (vid,)).fetchone()

    if existe:
        sets = ', '.join(f"{f}=?" for f in fields)
        db.execute(f"UPDATE diagnostico_nutricional SET {sets} WHERE visita_id=?",
                   vals + [vid])
        rid = existe[0]
    else:
        cols = 'visita_id, paciente_id, ' + ', '.join(fields)
        phs  = '?, ?, ' + ', '.join('?' for _ in fields)
        cur  = db.execute(f"INSERT INTO diagnostico_nutricional ({cols}) VALUES ({phs})",
                          [vid, vis['paciente_id']] + vals)
        rid  = cur.lastrowid

    db.commit()
    row = row_to_dict(db.execute("SELECT * FROM diagnostico_nutricional WHERE id=?", (rid,)).fetchone())
    db.close()
    return ok(row, 'Diagnóstico guardado')


# ════════════════════════════════════════════════════════════
# MÓDULO DIABETES
# ════════════════════════════════════════════════════════════

@app.route('/api/visitas/<int:vid>/diabetes', methods=['GET'])
def get_diabetes(vid):
    db  = get_db()
    row = row_to_dict(db.execute(
        "SELECT * FROM diabetes_visita WHERE visita_id=?", (vid,)
    ).fetchone())
    db.close()
    return ok(row or {})


@app.route('/api/visitas/<int:vid>/diabetes', methods=['POST'])
def save_diabetes(vid):
    db  = get_db()
    vis = row_to_dict(db.execute("SELECT * FROM visitas WHERE id=?", (vid,)).fetchone())
    if not vis:
        db.close(); return err('Visita no encontrada', 404)

    d = request.json or {}
    fields = [
        'fecha',
        'glucemia_ayunas', 'glucemia_postprandial', 'glucemia_promedio',
        'hba1c', 'hba1c_estimada', 'fructosamina', 'control_nivel',
        'tar_en_rango', 'tar_debajo_rango', 'tar_encima_rango', 'tar_hipoglucemia',
        'insulina_basal_tipo', 'insulina_basal_dosis', 'insulina_basal_horario',
        'insulina_rapida', 'insulina_rapida_tipo', 'ratio_insulina_cho', 'factor_sensibilidad',
        'gluco_ayunas_prom', 'gluco_pre_almuerzo_prom', 'gluco_post_almuerzo_prom',
        'gluco_pre_cena_prom', 'gluco_post_cena_prom', 'gluco_nocturna_prom',
        'hipo_episodios_semana', 'hipo_nivel1', 'hipo_nivel2', 'hipo_nivel3',
        'hipo_causa', 'hipo_horario',
        'cho_total_g', 'cho_desayuno_g', 'cho_colacion1_g', 'cho_almuerzo_g',
        'cho_colacion2_g', 'cho_cena_g',
        'tratamiento_tipo', 'medicamentos_dm',
        'meta_hba1c', 'meta_glucemia_ayunas', 'meta_tar', 'notas',
    ]
    vals   = [d.get(f) for f in fields]
    existe = db.execute("SELECT id FROM diabetes_visita WHERE visita_id=?", (vid,)).fetchone()

    if existe:
        sets = ', '.join(f"{f}=?" for f in fields)
        db.execute(f"UPDATE diabetes_visita SET {sets} WHERE visita_id=?", vals + [vid])
        rid = existe[0]
    else:
        cols = 'visita_id, paciente_id, ' + ', '.join(fields)
        phs  = '?, ?, ' + ', '.join('?' for _ in fields)
        cur  = db.execute(f"INSERT INTO diabetes_visita ({cols}) VALUES ({phs})",
                          [vid, vis['paciente_id']] + vals)
        rid  = cur.lastrowid

    db.commit()
    row = row_to_dict(db.execute("SELECT * FROM diabetes_visita WHERE id=?", (rid,)).fetchone())
    db.close()
    return ok(row, 'Módulo diabetes guardado')


# ════════════════════════════════════════════════════════════
# MÓDULO FÁRMACOS
# ════════════════════════════════════════════════════════════

def egfr_to_estadio(egfr):
    """Convierte eGFR numérico al estadio CKD."""
    if egfr is None:
        return None
    if egfr >= 90:   return 'G1'
    if egfr >= 60:   return 'G2'
    if egfr >= 45:   return 'G3a'
    if egfr >= 30:   return 'G3b'
    if egfr >= 15:   return 'G4'
    return 'G5'

ESTADIO_COL = {
    'G1':  'egfr_g1',
    'G2':  'egfr_g2',
    'G3a': 'egfr_g3a',
    'G3b': 'egfr_g3b',
    'G4':  'egfr_g4',
    'G5':  'egfr_g5',
    'HD':  'egfr_hd',
    'DP':  'egfr_dp',
}

def semaforo_para_estadio(farmaco_row, estadio):
    """Devuelve el color del semáforo según estadio del fármaco."""
    if not estadio:
        return 'verde'
    col = ESTADIO_COL.get(estadio, 'egfr_g1')
    return farmaco_row[col] if farmaco_row[col] else 'verde'


@app.route('/api/farmacos/catalogo', methods=['GET'])
def get_farmacos_catalogo():
    """Lista todos los fármacos del catálogo con semáforo según eGFR dado."""
    egfr = request.args.get('egfr', type=float)
    estadio_manual = request.args.get('estadio', '').upper()  # HD o DP si aplica
    clase = request.args.get('clase', '')

    db = get_db()
    q = "SELECT * FROM farmacos_catalogo WHERE activo=1"
    params = []
    if clase:
        q += " AND clase=?"
        params.append(clase)
    q += " ORDER BY clase, nombre"
    rows = db.execute(q, params).fetchall()
    db.close()

    estadio = estadio_manual if estadio_manual in ('HD', 'DP') else egfr_to_estadio(egfr)

    result = []
    for r in rows:
        d = row_to_dict(r)
        d['semaforo_actual'] = semaforo_para_estadio(r, estadio)
        d['estadio_usado'] = estadio
        try:
            d['nombres_comer'] = json.loads(d['nombres_comer'] or '[]')
            d['indicaciones']  = json.loads(d['indicaciones']  or '[]')
        except Exception:
            pass
        result.append(d)
    return ok(result)


@app.route('/api/farmacos/clases', methods=['GET'])
def get_farmacos_clases():
    db = get_db()
    rows = db.execute("SELECT DISTINCT clase FROM farmacos_catalogo WHERE activo=1 ORDER BY clase").fetchall()
    db.close()
    return ok([r['clase'] for r in rows])


@app.route('/api/visitas/<int:vid>/farmacos', methods=['GET'])
def get_farmacos_visita(vid):
    db = get_db()
    rows = db.execute("""
        SELECT fv.*, fc.nombre as catalogo_nombre, fc.clase, fc.dosis_std,
               fc.nota_egfr, fc.egfr_g1, fc.egfr_g2, fc.egfr_g3a, fc.egfr_g3b,
               fc.egfr_g4, fc.egfr_g5, fc.egfr_hd, fc.egfr_dp
        FROM farmacos_visita fv
        LEFT JOIN farmacos_catalogo fc ON fc.id = fv.farmaco_id
        WHERE fv.visita_id=?
        ORDER BY fv.fecha_registro
    """, (vid,)).fetchall()
    db.close()
    return ok(rows_to_list(rows))


@app.route('/api/visitas/<int:vid>/farmacos', methods=['POST'])
def save_farmaco_visita(vid):
    d = request.json
    db = get_db()

    # Obtener eGFR de la analítica de la visita para calcular semáforo
    an = db.execute("SELECT egfr, egfr_estadio FROM analiticas WHERE visita_id=? ORDER BY id DESC LIMIT 1", (vid,)).fetchone()
    egfr_val    = an['egfr']       if an else None
    egfr_est    = an['egfr_estadio'] if an else None
    estadio_man = d.get('estadio_manual', '').upper()
    estadio     = estadio_man if estadio_man in ('HD','DP') else (egfr_est or egfr_to_estadio(egfr_val))

    # Calcular semáforo desde catálogo
    semaforo = 'verde'
    if d.get('farmaco_id'):
        fc = db.execute("SELECT * FROM farmacos_catalogo WHERE id=?", (d['farmaco_id'],)).fetchone()
        if fc:
            semaforo = semaforo_para_estadio(fc, estadio)

    # Paciente id
    vis = db.execute("SELECT paciente_id FROM visitas WHERE id=?", (vid,)).fetchone()
    if not vis:
        db.close()
        return err('Visita no encontrada', 404)

    fid = d.get('id')
    ea_fields  = (d.get('ea_descripcion'), d.get('ea_gravedad'), d.get('ea_accion'), d.get('ea_fecha'))
    cam_fields = (d.get('cambio_motivo'), d.get('cambio_anterior'), d.get('cambio_nueva'), d.get('cambio_fecha'), d.get('cambio_obs'))

    if fid:
        db.execute("""
            UPDATE farmacos_visita
            SET farmaco_id=?, farmaco_libre=?, dosis=?, frecuencia=?,
                semaforo_calc=?, egfr_usado=?, egfr_estadio=?,
                estado=?, override_medico=?, override_motivo=?,
                fecha_inicio=?, fecha_fin=?, notas=?,
                ea_descripcion=?, ea_gravedad=?, ea_accion=?, ea_fecha=?,
                cambio_motivo=?, cambio_anterior=?, cambio_nueva=?, cambio_fecha=?, cambio_obs=?
            WHERE id=? AND visita_id=?
        """, (
            d.get('farmaco_id'), d.get('farmaco_libre'), d.get('dosis'), d.get('frecuencia'),
            semaforo, egfr_val, estadio,
            d.get('estado','activo'), d.get('override_medico',0), d.get('override_motivo'),
            d.get('fecha_inicio'), d.get('fecha_fin'), d.get('notas'),
            *ea_fields, *cam_fields,
            fid, vid
        ))
    else:
        cur = db.execute("""
            INSERT INTO farmacos_visita
              (visita_id, paciente_id, farmaco_id, farmaco_libre, dosis, frecuencia,
               semaforo_calc, egfr_usado, egfr_estadio,
               estado, override_medico, override_motivo, fecha_inicio, fecha_fin, notas,
               ea_descripcion, ea_gravedad, ea_accion, ea_fecha,
               cambio_motivo, cambio_anterior, cambio_nueva, cambio_fecha, cambio_obs)
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
        """, (
            vid, vis['paciente_id'],
            d.get('farmaco_id'), d.get('farmaco_libre'), d.get('dosis'), d.get('frecuencia'),
            semaforo, egfr_val, estadio,
            d.get('estado','activo'), d.get('override_medico',0), d.get('override_motivo'),
            d.get('fecha_inicio'), d.get('fecha_fin'), d.get('notas'),
            *ea_fields, *cam_fields
        ))
        fid = cur.lastrowid

    db.commit()
    row = db.execute("""
        SELECT fv.*, fc.nombre as catalogo_nombre, fc.clase, fc.nota_egfr
        FROM farmacos_visita fv
        LEFT JOIN farmacos_catalogo fc ON fc.id = fv.farmaco_id
        WHERE fv.id=?
    """, (fid,)).fetchone()
    db.close()
    return ok(row_to_dict(row), 'Fármaco guardado')


@app.route('/api/visitas/<int:vid>/farmacos/<int:fid>', methods=['DELETE'])
def delete_farmaco_visita(vid, fid):
    db = get_db()
    db.execute("DELETE FROM farmacos_visita WHERE id=? AND visita_id=?", (fid, vid))
    db.commit()
    db.close()
    return ok(None, 'Fármaco eliminado')


# ════════════════════════════════════════════════════════════
# INTERACCIONES FÁRMACO-FÁRMACO
# ════════════════════════════════════════════════════════════

def _check_pair(inter, fc_a, fc_b):
    """Devuelve True si una interacción aplica al par (fc_a, fc_b)."""
    def matches_a(i, f):
        if i['farmaco_a_id'] and i['farmaco_a_id'] != f['id']:  return False
        if i['clase_a']     and i['clase_a']     != f['clase']: return False
        if i['subclase_a']  and i['subclase_a']  != f['subclase']: return False
        return True

    def matches_b(i, f):
        if i['farmaco_b_id'] and i['farmaco_b_id'] != f['id']:  return False
        if i['clase_b']     and i['clase_b']     != f['clase']: return False
        if i['subclase_b']  and i['subclase_b']  != f['subclase']: return False
        return True

    if matches_a(inter, fc_a) and matches_b(inter, fc_b):
        return True
    if inter['bidireccional'] and matches_a(inter, fc_b) and matches_b(inter, fc_a):
        return True
    return False


@app.route('/api/farmacos/interacciones/check', methods=['POST'])
def check_interacciones():
    """Recibe lista de farmaco_ids y devuelve todos los pares con interacción."""
    farmaco_ids = request.json.get('farmaco_ids', [])
    if len(farmaco_ids) < 2:
        return ok([])

    db = get_db()
    # Cargar los fármacos involucrados
    placeholders = ','.join('?' * len(farmaco_ids))
    fcs = rows_to_list(db.execute(
        f"SELECT id, nombre, clase, subclase FROM farmacos_catalogo WHERE id IN ({placeholders})",
        farmaco_ids
    ).fetchall())

    # Cargar todas las interacciones activas
    inters = rows_to_list(db.execute(
        "SELECT * FROM interacciones_farmaco WHERE activo=1"
    ).fetchall())

    # Evaluar cada par (i,j) con cada interacción
    encontradas = []
    for i in range(len(fcs)):
        for j in range(i+1, len(fcs)):
            for inter in inters:
                if _check_pair(inter, fcs[i], fcs[j]):
                    encontradas.append({
                        'interaccion_id': inter['id'],
                        'farmaco_a': fcs[i]['nombre'],
                        'farmaco_b': fcs[j]['nombre'],
                        'severidad':    inter['severidad'],
                        'mecanismo':    inter['mecanismo'],
                        'consecuencia': inter['consecuencia'],
                        'manejo':       inter['manejo'],
                        'evidencia':    inter['evidencia'],
                    })
                    break  # un par puede tener solo la interacción más grave

    # Ordenar por severidad
    orden = {'contraindicado': 0, 'grave': 1, 'moderada': 2, 'leve': 3}
    encontradas.sort(key=lambda x: orden.get(x['severidad'], 4))
    db.close()
    return ok(encontradas)


@app.route('/api/farmacos/interacciones', methods=['GET'])
def get_interacciones_catalogo():
    """Lista todas las interacciones del catálogo para la vista de administración."""
    db = get_db()
    rows = db.execute("""
        SELECT i.*,
               fa.nombre as nombre_farmaco_a,
               fb.nombre as nombre_farmaco_b
        FROM interacciones_farmaco i
        LEFT JOIN farmacos_catalogo fa ON fa.id = i.farmaco_a_id
        LEFT JOIN farmacos_catalogo fb ON fb.id = i.farmaco_b_id
        WHERE i.activo=1
        ORDER BY CASE i.severidad
          WHEN 'contraindicado' THEN 1
          WHEN 'grave' THEN 2
          WHEN 'moderada' THEN 3
          ELSE 4 END, i.id
    """).fetchall()
    db.close()
    return ok(rows_to_list(rows))


@app.route('/api/farmacos/catalogo', methods=['POST'])
def create_farmaco_catalogo():
    d = request.json
    if not d.get('nombre') or not d.get('clase'):
        return err('Nombre y clase son requeridos')

    nombres_comer = json.dumps([x.strip() for x in d.get('nombres_comer', '').split(',') if x.strip()]) if isinstance(d.get('nombres_comer'), str) else json.dumps(d.get('nombres_comer') or [])
    indicaciones  = json.dumps([x.strip() for x in d.get('indicaciones', '').split(',') if x.strip()])  if isinstance(d.get('indicaciones'), str)  else json.dumps(d.get('indicaciones')  or [])

    db = get_db()
    cur = db.execute("""
        INSERT INTO farmacos_catalogo
          (nombre, nombres_comer, clase, subclase, indicaciones, dosis_std, frecuencia_std, via,
           egfr_g1, egfr_g2, egfr_g3a, egfr_g3b, egfr_g4, egfr_g5, egfr_hd, egfr_dp,
           nota_egfr, contraindicaciones)
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    """, (
        d['nombre'], nombres_comer, d['clase'], d.get('subclase'), indicaciones,
        d.get('dosis_std'), d.get('frecuencia_std'), d.get('via', 'oral'),
        d.get('egfr_g1','verde'), d.get('egfr_g2','verde'), d.get('egfr_g3a','verde'), d.get('egfr_g3b','amarillo'),
        d.get('egfr_g4','rojo'), d.get('egfr_g5','rojo'), d.get('egfr_hd','rojo'), d.get('egfr_dp','rojo'),
        d.get('nota_egfr'), d.get('contraindicaciones')
    ))
    fid = cur.lastrowid
    db.commit()
    row = row_to_dict(db.execute("SELECT * FROM farmacos_catalogo WHERE id=?", (fid,)).fetchone())
    db.close()
    return ok(row, 'Fármaco creado')


@app.route('/api/farmacos/catalogo/<int:fid>', methods=['PUT'])
def update_farmaco_catalogo(fid):
    d = request.json
    nombres_comer = json.dumps([x.strip() for x in d.get('nombres_comer', '').split(',') if x.strip()]) if isinstance(d.get('nombres_comer'), str) else json.dumps(d.get('nombres_comer') or [])
    indicaciones  = json.dumps([x.strip() for x in d.get('indicaciones', '').split(',') if x.strip()])  if isinstance(d.get('indicaciones'), str)  else json.dumps(d.get('indicaciones')  or [])

    db = get_db()
    db.execute("""
        UPDATE farmacos_catalogo SET
          nombre=?, nombres_comer=?, clase=?, subclase=?, indicaciones=?,
          dosis_std=?, frecuencia_std=?, via=?,
          egfr_g1=?, egfr_g2=?, egfr_g3a=?, egfr_g3b=?, egfr_g4=?, egfr_g5=?, egfr_hd=?, egfr_dp=?,
          nota_egfr=?, contraindicaciones=?
        WHERE id=?
    """, (
        d['nombre'], nombres_comer, d['clase'], d.get('subclase'), indicaciones,
        d.get('dosis_std'), d.get('frecuencia_std'), d.get('via', 'oral'),
        d.get('egfr_g1','verde'), d.get('egfr_g2','verde'), d.get('egfr_g3a','verde'), d.get('egfr_g3b','amarillo'),
        d.get('egfr_g4','rojo'), d.get('egfr_g5','rojo'), d.get('egfr_hd','rojo'), d.get('egfr_dp','rojo'),
        d.get('nota_egfr'), d.get('contraindicaciones'), fid
    ))
    db.commit()
    row = row_to_dict(db.execute("SELECT * FROM farmacos_catalogo WHERE id=?", (fid,)).fetchone())
    db.close()
    return ok(row, 'Fármaco actualizado')


@app.route('/api/farmacos/catalogo/<int:fid>', methods=['DELETE'])
def delete_farmaco_catalogo(fid):
    db = get_db()
    db.execute("UPDATE farmacos_catalogo SET activo=0 WHERE id=?", (fid,))
    db.commit()
    db.close()
    return ok(None, 'Fármaco desactivado')


@app.route('/api/pacientes/<int:pid>/farmacos_activos', methods=['GET'])
def get_farmacos_activos_paciente(pid):
    """Fármacos activos del paciente (última aparición de cada uno)."""
    db = get_db()
    rows = db.execute("""
        SELECT fv.*, fc.nombre as catalogo_nombre, fc.clase, fc.nota_egfr,
               v.fecha as visita_fecha
        FROM farmacos_visita fv
        JOIN visitas v ON v.id = fv.visita_id
        LEFT JOIN farmacos_catalogo fc ON fc.id = fv.farmaco_id
        WHERE fv.paciente_id=? AND fv.estado='activo'
        ORDER BY v.fecha DESC
    """, (pid,)).fetchall()
    db.close()
    return ok(rows_to_list(rows))


# ════════════════════════════════════════════════════════════
# CONFIGURACIÓN CALLMEBOT / WHATSAPP
# ════════════════════════════════════════════════════════════
CALLMEBOT_APIKEY = os.environ.get('CALLMEBOT_APIKEY', '8559578')
CALLMEBOT_PHONE  = os.environ.get('CALLMEBOT_PHONE', '')

# Cola offline: PINs pendientes de enviar
_pin_queue = []   # lista de dicts {pid, telefono, pin, nombre}
_queue_lock = threading.Lock()

def _gen_pin():
    return ''.join(random.choices(string.digits, k=4))

def _send_whatsapp(telefono: str, mensaje: str) -> bool:
    """Envía mensaje vía CallMeBot. Retorna True si OK."""
    if not CALLMEBOT_APIKEY:
        return False
    phone = telefono.replace('+','').replace('-','').replace(' ','').replace('(','').replace(')','')
    if not phone.startswith('1') and len(phone) == 10:
        phone = '1' + phone          # asumir RD si 10 dígitos sin código país
    url = (
        f"https://api.callmebot.com/whatsapp.php"
        f"?phone={phone}&text={urllib.parse.quote(mensaje)}&apikey={CALLMEBOT_APIKEY}"
    )
    try:
        with urllib.request.urlopen(url, timeout=8) as r:
            return r.status == 200
    except Exception:
        return False

def _flush_queue():
    """Intenta enviar todos los PINs en cola cuando hay red."""
    with _queue_lock:
        pendientes = list(_pin_queue)
    enviados = []
    for item in pendientes:
        ok_send = _send_whatsapp(item['telefono'], item['mensaje'])
        if ok_send:
            enviados.append(item)
            # Marcar como enviado en BD
            try:
                db = get_db()
                db.execute("UPDATE pacientes SET pin_enviado=1 WHERE id=?", (item['pid'],))
                db.commit(); db.close()
            except Exception:
                pass
    with _queue_lock:
        for item in enviados:
            if item in _pin_queue:
                _pin_queue.remove(item)

# ════════════════════════════════════════════════════════════
# RUTAS PORTAL PACIENTE
# ════════════════════════════════════════════════════════════

@app.route('/paciente')
def portal_paciente():
    """Página de login del portal de pacientes."""
    html = open(os.path.join(os.path.dirname(__file__), 'static', 'portal.html')).read()
    return html

@app.route('/api/portal/login', methods=['POST'])
def portal_login():
    d = request.json
    cedula = (d.get('cedula') or '').strip()
    pin    = (d.get('pin')    or '').strip()
    if not cedula or not pin:
        return err('Cédula y PIN requeridos', 400)
    db = get_db()
    pac = row_to_dict(db.execute(
        "SELECT * FROM pacientes WHERE cedula=? AND pin_acceso=? AND portal_activo=1 AND activo=1",
        (cedula, pin)
    ).fetchone())
    db.close()
    if not pac:
        return err('Cédula o PIN incorrecto', 401)
    return ok({'paciente_id': pac['id'], 'nombre': pac['nombre'], 'apellidos': pac['apellidos']})

@app.route('/api/portal/datos/<int:pid>', methods=['GET'])
def portal_datos_paciente(pid):
    """Datos que el paciente puede ver: plan, metas, fármacos, próxima cita."""
    db = get_db()
    # Última visita
    visita = row_to_dict(db.execute(
        "SELECT * FROM visitas WHERE paciente_id=? AND activo=1 ORDER BY fecha DESC, id DESC LIMIT 1",
        (pid,)
    ).fetchone())
    if not visita:
        db.close()
        return ok({'sin_datos': True})

    vid = visita['id']
    plan  = row_to_dict(db.execute("SELECT * FROM plan_nutricional WHERE visita_id=? ORDER BY id DESC LIMIT 1", (vid,)).fetchone()) or {}
    reqs  = row_to_dict(db.execute("SELECT * FROM requerimientos_visita WHERE visita_id=?", (vid,)).fetchone()) or {}
    farmacos = rows_to_list(db.execute("""
        SELECT fv.dosis, fv.frecuencia, fv.notas, fv.estado, fv.fecha_inicio,
               fc.nombre as nombre, fc.clase
        FROM farmacos_visita fv
        LEFT JOIN farmacos_catalogo fc ON fc.id = fv.farmaco_id
        WHERE fv.visita_id=? AND fv.estado='activo'
    """, (vid,)).fetchall())
    # Evolución de peso (últimas 6 visitas)
    evol = rows_to_list(db.execute("""
        SELECT v.fecha, cc.peso FROM visitas v
        JOIN composicion_corporal cc ON cc.visita_id = v.id
        WHERE v.paciente_id=? AND cc.peso IS NOT NULL
        ORDER BY v.fecha ASC LIMIT 6
    """, (pid,)).fetchall())
    db.close()

    return ok({
        'visita_fecha':   visita.get('fecha'),
        'proxima_cita':   visita.get('proxima_cita'),
        'kcal_objetivo':  reqs.get('kcal_objetivo') or plan.get('kcal_prescritas'),
        'proteina_g':     reqs.get('proteina_g_dia') or plan.get('proteina_prescrita'),
        'agua_l':         reqs.get('agua_ml_dia', 0) and round(reqs['agua_ml_dia']/1000, 1),
        'indicaciones':   plan.get('indicaciones') or plan.get('texto_libre') or '',
        'objetivo':       plan.get('objetivo_principal') or '',
        'farmacos':       farmacos,
        'evolucion_peso': evol,
    })

@app.route('/api/pacientes/<int:pid>/generar_pin', methods=['POST'])
def generar_pin_paciente(pid):
    """Genera PIN para un paciente y lo envía por WhatsApp si hay red."""
    db = get_db()
    pac = row_to_dict(db.execute("SELECT * FROM pacientes WHERE id=?", (pid,)).fetchone())
    if not pac:
        db.close()
        return err('Paciente no encontrado', 404)

    pin = _gen_pin()
    ahora = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    db.execute(
        "UPDATE pacientes SET pin_acceso=?, pin_generado_at=?, pin_enviado=0 WHERE id=?",
        (pin, ahora, pid)
    )
    db.commit(); db.close()

    nombre   = f"{pac['nombre']} {pac['apellidos']}"
    telefono = pac.get('telefono', '')
    mensaje  = (
        f"Hola {pac['nombre']} 👋\n"
        f"Tu PIN de acceso al portal NutriCare es: *{pin}*\n"
        f"Entra con tu cédula + este PIN en: nutricare.dra-jaquez.com/paciente\n"
        f"— Dra. Anayanet Jáquez · Nutrióloga Clínica"
    )

    enviado = False
    if telefono and CALLMEBOT_APIKEY:
        enviado = _send_whatsapp(telefono, mensaje)

    if not enviado and telefono:
        # Guardar en cola para enviar cuando haya red
        with _queue_lock:
            _pin_queue.append({'pid': pid, 'telefono': telefono, 'mensaje': mensaje, 'nombre': nombre})

    return ok({
        'pin': pin,
        'enviado': enviado,
        'en_cola': not enviado and bool(telefono),
        'sin_telefono': not bool(telefono),
    }, 'PIN generado' + (' y enviado por WhatsApp ✓' if enviado else ' — pendiente de red'))

@app.route('/api/portal/flush_queue', methods=['POST'])
def flush_queue():
    """El frontend llama esto cuando detecta que hay internet."""
    threading.Thread(target=_flush_queue, daemon=True).start()
    return ok({'pendientes': len(_pin_queue)})

@app.route('/api/config/callmebot', methods=['POST'])
def set_callmebot_config():
    """Guarda API key y teléfono de CallMeBot en variables de entorno del proceso."""
    global CALLMEBOT_APIKEY, CALLMEBOT_PHONE
    d = request.json
    if d.get('apikey'):
        CALLMEBOT_APIKEY = d['apikey']
        os.environ['CALLMEBOT_APIKEY'] = d['apikey']
    if d.get('phone'):
        CALLMEBOT_PHONE = d['phone']
        os.environ['CALLMEBOT_PHONE'] = d['phone']
    return ok({'configurado': bool(CALLMEBOT_APIKEY)})

@app.route('/api/config/callmebot', methods=['GET'])
def get_callmebot_config():
    return ok({'configurado': bool(CALLMEBOT_APIKEY), 'pendientes_cola': len(_pin_queue)})

def _migrate_db():
    """Agrega columnas nuevas si no existen (safe ALTER TABLE)."""
    import sqlite3 as _sqlite3
    from db_utils import DB_PATH
    conn = _sqlite3.connect(DB_PATH)
    existing = {r[1] for r in conn.execute("PRAGMA table_info(farmacos_visita)").fetchall()}
    new_cols = {
        'ea_descripcion': 'TEXT', 'ea_gravedad': 'TEXT',
        'ea_accion': 'TEXT',      'ea_fecha': 'DATE',
        'cambio_motivo': 'TEXT',  'cambio_anterior': 'TEXT',
        'cambio_nueva': 'TEXT',   'cambio_fecha': 'DATE',
        'cambio_obs': 'TEXT',
    }
    for col, typ in new_cols.items():
        if col not in existing:
            conn.execute(f"ALTER TABLE farmacos_visita ADD COLUMN {col} {typ}")
            print(f"[migrate] farmacos_visita +{col}")

    # Columnas PIN en pacientes
    pac_cols = {r[1] for r in conn.execute("PRAGMA table_info(pacientes)").fetchall()}
    pin_cols = {'pin_acceso':'TEXT','pin_generado_at':'DATETIME','pin_enviado':'INTEGER DEFAULT 0','portal_activo':'INTEGER DEFAULT 1'}
    for col, typ in pin_cols.items():
        if col not in pac_cols:
            conn.execute(f"ALTER TABLE pacientes ADD COLUMN {col} {typ}")
            print(f"[migrate] pacientes +{col}")

    conn.commit(); conn.close()

_migrate_db()

if __name__ == '__main__':
    print("=" * 55)
    print("  Plataforma Nutricional — Dra. Anayanet Jáquez")
    print("  Abre tu navegador en: http://localhost:5001")
    print("=" * 55)
    app.run(debug=False, port=5001, host='127.0.0.1')
