-- ============================================================
-- MÓDULO FÁRMACOS — Dra. Anayanet Jáquez
-- Migración v1.0
-- ============================================================

PRAGMA foreign_keys = ON;

-- Catálogo maestro de fármacos con semáforo por eGFR
CREATE TABLE IF NOT EXISTS farmacos_catalogo (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre          TEXT NOT NULL,          -- nombre genérico
    nombres_comer   TEXT,                   -- nombres comerciales (JSON array)
    clase           TEXT NOT NULL,          -- clase terapéutica
    subclase        TEXT,
    indicaciones    TEXT,                   -- JSON array de indicaciones
    mecanismo       TEXT,

    -- Dosis estándar
    dosis_std       TEXT,
    frecuencia_std  TEXT,
    via             TEXT DEFAULT 'oral',

    -- Semáforo eGFR (valor de corte y color por estadio)
    -- G1:≥90  G2:60-89  G3a:45-59  G3b:30-44  G4:15-29  G5:<15  HD:diálisis  DP:peritoneal
    egfr_g1         TEXT DEFAULT 'verde'   CHECK(egfr_g1  IN ('verde','amarillo','rojo')),
    egfr_g2         TEXT DEFAULT 'verde'   CHECK(egfr_g2  IN ('verde','amarillo','rojo')),
    egfr_g3a        TEXT DEFAULT 'verde'   CHECK(egfr_g3a IN ('verde','amarillo','rojo')),
    egfr_g3b        TEXT DEFAULT 'amarillo' CHECK(egfr_g3b IN ('verde','amarillo','rojo')),
    egfr_g4         TEXT DEFAULT 'rojo'    CHECK(egfr_g4  IN ('verde','amarillo','rojo')),
    egfr_g5         TEXT DEFAULT 'rojo'    CHECK(egfr_g5  IN ('verde','amarillo','rojo')),
    egfr_hd         TEXT DEFAULT 'rojo'    CHECK(egfr_hd  IN ('verde','amarillo','rojo')),
    egfr_dp         TEXT DEFAULT 'rojo'    CHECK(egfr_dp  IN ('verde','amarillo','rojo')),

    -- Notas de ajuste por estadio renal
    nota_egfr       TEXT,

    -- Otras precauciones
    precausion_hepatica TEXT,
    interacciones   TEXT,
    contraindicaciones TEXT,

    activo          INTEGER DEFAULT 1,
    fecha_creacion  DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Fármacos prescritos / revisados por visita (ya existe tabla farmacoterapia, esta la complementa)
CREATE TABLE IF NOT EXISTS farmacos_visita (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    visita_id       INTEGER NOT NULL REFERENCES visitas(id),
    paciente_id     INTEGER NOT NULL REFERENCES pacientes(id),
    farmaco_id      INTEGER REFERENCES farmacos_catalogo(id),
    farmaco_libre   TEXT,   -- si no está en catálogo
    dosis           TEXT,
    frecuencia      TEXT,
    semaforo_calc   TEXT,   -- calculado al guardar según eGFR de la analítica
    egfr_usado      REAL,   -- eGFR que se usó para calcular
    egfr_estadio    TEXT,
    estado          TEXT CHECK(estado IN ('activo','suspendido','contraindicado','sugerido')) DEFAULT 'activo',
    override_medico INTEGER DEFAULT 0,
    override_motivo TEXT,
    fecha_inicio    DATE,
    fecha_fin       DATE,
    notas           TEXT,
    fecha_registro  DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_fv_visita ON farmacos_visita(visita_id);
CREATE INDEX IF NOT EXISTS idx_fv_paciente ON farmacos_visita(paciente_id);

-- ============================================================
-- CATÁLOGO INICIAL DE FÁRMACOS
-- ============================================================

INSERT INTO farmacos_catalogo
  (nombre, nombres_comer, clase, subclase, indicaciones, dosis_std, frecuencia_std,
   egfr_g1, egfr_g2, egfr_g3a, egfr_g3b, egfr_g4, egfr_g5, egfr_hd, egfr_dp, nota_egfr)
VALUES

-- ── ANTIOBESIDAD ────────────────────────────────────────────

('Semaglutida', '["Ozempic","Wegovy","Rybelsus"]', 'Antiobesidad', 'GLP-1 RA',
 '["Obesidad","DM2"]', '0.25→2.4 mg/sem (SQ) | 7→14 mg/día (oral)', 'Semanal (SQ) / Diario (oral)',
 'verde','verde','verde','verde','amarillo','rojo','rojo','rojo',
 'G4: usar con precaución, monitorizar función renal. G5/HD/DP: evitar; datos limitados. No requiere ajuste de dosis formal hasta G4.'),

('Tirzepatida', '["Mounjaro","Zepbound"]', 'Antiobesidad', 'GLP-1/GIP RA',
 '["Obesidad","DM2"]', '2.5→15 mg/sem (SQ)', 'Semanal',
 'verde','verde','verde','verde','amarillo','rojo','rojo','rojo',
 'G4: precaución; datos limitados en ERC severa. G5/HD/DP: no recomendado. Monitorizar PFR. Náuseas/vómitos pueden agravar deshidratación.'),

('Liraglutida', '["Victoza","Saxenda"]', 'Antiobesidad', 'GLP-1 RA',
 '["Obesidad","DM2"]', '0.6→3 mg/día (SQ)', 'Diario',
 'verde','verde','verde','amarillo','rojo','rojo','rojo','rojo',
 'G3b: usar con precaución. G4/G5: contraindicado por farmacocinética alterada y riesgo IRA.'),

('Fentermina', '["Adipex"]', 'Antiobesidad', 'Simpaticomimético',
 '["Obesidad"]', '15-37.5 mg/día', 'Diario (mañana)',
 'verde','verde','amarillo','rojo','rojo','rojo','rojo','rojo',
 'G3a: precaución; acumulación. G3b en adelante: contraindicado. Excreción renal.'),

('Fentermina/Topiramato', '["Qsymia"]', 'Antiobesidad', 'Combinación',
 '["Obesidad"]', '3.75/23→15/92 mg/día', 'Diario',
 'verde','verde','amarillo','rojo','rojo','rojo','rojo','rojo',
 'Topiramato: ajustar dosis si eGFR <70 (50% dosis). Acidosis metabólica con ERC. G3b+: contraindicado por riesgo nefrolitiasis + acidosis.'),

('Naltrexona/Bupropión', '["Contrave","Isatril"]', 'Antiobesidad', 'Combinación NA/opioide',
 '["Obesidad"]', '8/90 mg → 16/180 mg c/12h', 'Dos veces al día',
 'verde','verde','verde','amarillo','rojo','rojo','rojo','rojo',
 'G3b: reducir 50% dosis. No superar 1 comprimido c/12h. G4/G5/HD: contraindicado. Bupropión y metabolitos se acumulan.'),

('Orlistat', '["Xenical","Alli"]', 'Antiobesidad', 'Inhibidor lipasa',
 '["Obesidad"]', '120 mg c/8h con comidas', 'Tres veces al día',
 'verde','verde','verde','verde','amarillo','rojo','rojo','rojo',
 'Acción luminal; absorción mínima. G4: precaución por hiperoxaluria. G5: evitar.'),

-- ── DIABETES ────────────────────────────────────────────────

('Metformina', '["Glucophage","Riomet"]', 'Antidiabético', 'Biguanida',
 '["DM2","Prediabetes","SOP"]', '500→2000 mg/día', 'Con comidas',
 'verde','verde','verde','amarillo','rojo','rojo','rojo','rojo',
 'G3b (30-44): reducir dosis máx 1000 mg/día, vigilar. G4 (<30): CONTRAINDICADO. Riesgo acidosis láctica.'),

('Vildagliptina', '["Galvus"]', 'Antidiabético', 'iDPP-4',
 '["DM2"]', '50 mg c/12h | 50 mg/día si ERC', 'Una o dos veces al día',
 'verde','verde','verde','amarillo','amarillo','amarillo','amarillo','amarillo',
 'G3b/G4/G5/HD: reducir a 50 mg/día (1 dosis). Ajuste formal requerido. Bien tolerada en ERC.'),

('Sitagliptina', '["Januvia"]', 'Antidiabético', 'iDPP-4',
 '["DM2"]', '100 mg/día → ajustar por eGFR', 'Diario',
 'verde','verde','amarillo','amarillo','rojo','rojo','amarillo','amarillo',
 'G3a: 50 mg/día. G3b/G4: 25 mg/día. G5/HD: 25 mg/día (post-HD). DP: 25 mg/día.'),

('Empagliflozina', '["Jardiance"]', 'Antidiabético', 'iSGLT2',
 '["DM2","IC","ERC"]', '10→25 mg/día', 'Diario',
 'verde','verde','verde','amarillo','rojo','rojo','rojo','rojo',
 'G3b: 10 mg/día (eficacia reducida pero nefroprotector). G4: solo indicación cardiorrenal, no glucémica. G5/HD: contraindicado para glucemia; valorar beneficio CV.'),

('Dapagliflozina', '["Farxiga","Forxiga"]', 'Antidiabético', 'iSGLT2',
 '["DM2","IC","ERC"]', '10 mg/día', 'Diario',
 'verde','verde','verde','amarillo','amarillo','rojo','rojo','rojo',
 'DM2: contraindicado <45. ERC/IC: puede usarse hasta G4 por indicación cardiorrenal (DAPA-CKD). G5/HD: evitar.'),

('Insulina (análogos)', '["Lantus","Toujeo","NovoLog","Humalog","Tresiba"]', 'Antidiabético', 'Insulina',
 '["DM1","DM2"]', 'Individualizado', 'Variable',
 'verde','verde','verde','amarillo','amarillo','amarillo','amarillo','amarillo',
 'ERC: reducir dosis 25-50% progresivamente. Mayor riesgo hipoglucemia. Monitoreo glucémico intensivo.'),

('Glibenclamida', '["Daonil"]', 'Antidiabético', 'Sulfonilurea',
 '["DM2"]', '2.5→15 mg/día', 'Diario o dividido',
 'verde','verde','amarillo','rojo','rojo','rojo','rojo','rojo',
 'G3a: precaución, hipoglucemia prolongada. G3b+: CONTRAINDICADO. Metabolito activo se acumula en ERC.'),

-- ── LÍPIDOS ────────────────────────────────────────────────

('Atorvastatina', '["Lipitor","Torvast"]', 'Hipolipemiante', 'Estatina',
 '["Dislipidemia","Prevención CV"]', '10→80 mg/día', 'Nocturno',
 'verde','verde','verde','verde','verde','verde','verde','verde',
 'Sin ajuste renal requerido. Metabolismo hepático CYP3A4. Segura en ERC y diálisis.'),

('Rosuvastatina', '["Crestor"]', 'Hipolipemiante', 'Estatina',
 '["Dislipidemia","Prevención CV"]', '5→40 mg/día', 'Nocturno',
 'verde','verde','verde','amarillo','amarillo','rojo','rojo','rojo',
 'G3b: máx 20 mg/día. G4/G5: máx 10 mg/día. HD: máx 10 mg/día (acumulación).'),

('Simvastatina', '["Zocor"]', 'Hipolipemiante', 'Estatina',
 '["Dislipidemia"]', '10→40 mg/día', 'Nocturno',
 'verde','verde','verde','amarillo','rojo','rojo','rojo','rojo',
 'G4+: máx 10 mg/día, riesgo miopatía aumentado. Interacciones CYP3A4 relevantes. Preferir atorvastatina en ERC.'),

('Fenofibrato', '["Tricor","Fenocor"]', 'Hipolipemiante', 'Fibrato',
 '["Hipertrigliceridemia"]', '145 mg/día', 'Diario',
 'verde','verde','amarillo','rojo','rojo','rojo','rojo','rojo',
 'G3a: reducir a 54-67 mg/día. G3b+: contraindicado. Eleva creatinina artificialmente (efecto tubular reversible). Riesgo miopatía con estatinas.'),

('Ezetimiba', '["Zetia","Ezetrol"]', 'Hipolipemiante', 'Inhibidor absorción colesterol',
 '["Dislipidemia"]', '10 mg/día', 'Diario',
 'verde','verde','verde','verde','verde','verde','verde','verde',
 'Sin ajuste renal. Metabolismo hepático. Segura en todos los estadios de ERC.'),

-- ── HIPERTENSIÓN ──────────────────────────────────────────

('Enalapril', '["Vasotec","Renitec"]', 'Antihipertensivo', 'IECA',
 '["HTA","IC","ERC con proteinuria"]', '5→40 mg/día', 'Una o dos veces',
 'verde','verde','verde','amarillo','amarillo','rojo','rojo','rojo',
 'G3b/G4: reducir dosis inicial, ajustar por respuesta y K+. G5: contraindicado (hiperpotasemia, IRA). Monitorear K+ y creatinina.'),

('Losartán', '["Cozaar"]', 'Antihipertensivo', 'ARA-II',
 '["HTA","ERC diabética","IC"]', '25→100 mg/día', 'Diario',
 'verde','verde','verde','amarillo','amarillo','rojo','rojo','rojo',
 'Similar a IECA. No combinar IECA+ARA-II. G4: usar solo, dosis baja. G5/HD: evitar generalmente.'),

('Amlodipino', '["Norvasc"]', 'Antihipertensivo', 'Calcioantagonista',
 '["HTA","Angina"]', '2.5→10 mg/día', 'Diario',
 'verde','verde','verde','verde','verde','verde','verde','verde',
 'Sin ajuste renal. Metabolismo hepático. Seguro en todos los estadios.'),

('Carvedilol', '["Coreg"]', 'Antihipertensivo', 'Betabloqueante no selectivo',
 '["HTA","IC","Post-IAM"]', '3.125→25 mg c/12h', 'Dos veces al día',
 'verde','verde','verde','verde','verde','verde','verde','verde',
 'Sin ajuste renal. Metabolismo hepático. Preferido en IC con ERC.'),

-- ── NEFROPROTECTORES / ERC ────────────────────────────────

('Finerenona', '["Kerendia"]', 'Nefroprotector', 'ARM no esteroideo',
 '["ERC diabética con K+ estable"]', '10→20 mg/día', 'Diario',
 'verde','verde','verde','verde','amarillo','rojo','rojo','rojo',
 'G3b/G4: inicio con 10 mg si K+ ≤4.8 mEq/L. Contraindicado si K+ >5. Monitorear K+ frecuente.'),

('Sevelamer', '["Renagel","Renvela"]', 'Quelante de fósforo', 'No cálcico',
 '["Hiperfosfatemia en ERC/diálisis"]', '800-1600 mg c/8h con comidas', 'Con comidas',
 'amarillo','amarillo','amarillo','verde','verde','verde','verde','verde',
 'G1-G3: uso infrecuente. G4/G5/HD/DP: fármaco de elección para hiperfosfatemia.'),

-- ── OTROS METABÓLICOS ──────────────────────────────────────

('Levotiroxina', '["Synthroid","Eutirox"]', 'Hormona tiroidea', 'T4',
 '["Hipotiroidismo"]', 'Individualizado', 'En ayunas',
 'verde','verde','verde','verde','verde','verde','verde','verde',
 'Sin ajuste renal formal. Monitorizar TSH. En ERC avanzada puede haber alteración de unión a proteínas.'),

('Vitamina D3 (Colecalciferol)', '["D-Tabs","Dical"]', 'Micronutriente', 'Vitamina liposoluble',
 '["Déficit Vit D","ERC"]', '1000-4000 UI/día | 50000 UI/sem (déficit)', 'Diario o semanal',
 'verde','verde','verde','verde','amarillo','rojo','rojo','rojo',
 'G4: preferir calcitriol (forma activa). G5/HD: calcitriol o paricalcitol, no colecalciferol. Monitorear Ca/P.'),

('Omeprazol', '["Prilosec","Losec"]', 'Gastroprotector', 'IBP',
 '["GERD","Protección gástrica"]', '20-40 mg/día', 'En ayunas',
 'verde','verde','verde','verde','verde','verde','verde','verde',
 'Sin ajuste renal. Metabolismo hepático. Seguro en ERC. Uso crónico: vigilar Mg y B12.');
