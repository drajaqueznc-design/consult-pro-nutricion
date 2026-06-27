-- ============================================================
-- MÓDULO INTERACCIONES FÁRMACO-FÁRMACO v1.0
-- Dra. Anayanet Jáquez
-- ============================================================

PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS interacciones_farmaco (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    -- Par A: puede ser por ID específico, por clase, o por subclase
    farmaco_a_id    INTEGER REFERENCES farmacos_catalogo(id),
    clase_a         TEXT,   -- si aplica a toda la clase
    subclase_a      TEXT,   -- si aplica a subclase (ej. 'Estatina')
    -- Par B
    farmaco_b_id    INTEGER REFERENCES farmacos_catalogo(id),
    clase_b         TEXT,
    subclase_b      TEXT,
    -- Clasificación
    severidad       TEXT NOT NULL CHECK(severidad IN ('leve','moderada','grave','contraindicado')),
    -- Detalles clínicos
    mecanismo       TEXT NOT NULL,
    consecuencia    TEXT NOT NULL,  -- qué le pasa al paciente
    manejo          TEXT NOT NULL,  -- qué hacer
    evidencia       TEXT,           -- referencia o nivel
    bidireccional   INTEGER DEFAULT 1,
    activo          INTEGER DEFAULT 1,
    fecha_creacion  DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_int_a ON interacciones_farmaco(farmaco_a_id);
CREATE INDEX IF NOT EXISTS idx_int_b ON interacciones_farmaco(farmaco_b_id);
CREATE INDEX IF NOT EXISTS idx_int_clase_a ON interacciones_farmaco(clase_a);
CREATE INDEX IF NOT EXISTS idx_int_clase_b ON interacciones_farmaco(clase_b);

-- ============================================================
-- INTERACCIONES — CONTRAINDICATED (NUNCA COMBINAR)
-- ============================================================

-- IECA + ARA-II — doble bloqueo SRAA
INSERT INTO interacciones_farmaco (subclase_a, subclase_b, severidad, mecanismo, consecuencia, manejo, evidencia)
VALUES ('IECA','ARA-II','contraindicado',
 'Doble bloqueo del sistema renina-angiotensina-aldosterona',
 'Hiperpotasemia severa, hipotensión grave, deterioro agudo de función renal (AKI). Estudio ONTARGET demostró daño renal con combinación.',
 'CONTRAINDICADO. Usar solo uno. Si falla, cambiar a la otra clase, no combinar.',
 'ONTARGET Trial — ESC Guidelines 2023');

-- IECA + Sacubitrilo/Valsartán (ya contiene ARA-II)
INSERT INTO interacciones_farmaco (subclase_a, farmaco_b_id, severidad, mecanismo, consecuencia, manejo, evidencia)
VALUES ('IECA', 59, 'contraindicado',
 'Sacubitrilo/Valsartán contiene ARA-II; combinación = doble bloqueo SRAA. Además angioedema por inhibición simultánea neprilisina + ECA.',
 'Angioedema potencialmente fatal. Hiperpotasemia. AKI.',
 'Suspender IECA 36h antes de iniciar Entresto. Nunca combinar.',
 'PARADIGM-HF — ESC HF Guidelines 2021');

-- Naltrexona + Opioides (tramadol)
INSERT INTO interacciones_farmaco (subclase_a, farmaco_b_id, severidad, mecanismo, consecuencia, manejo, evidencia)
VALUES ('Antagonista opioide', 113, 'contraindicado',
 'Naltrexona bloquea receptores μ-opioides y precipita síndrome de abstinencia agudo',
 'Crisis de abstinencia: agitación, taquicardia, vómitos, dolor intenso, potencialmente mortal en pacientes dependientes.',
 'CONTRAINDICADO. Separar naltrexona y tramadol. Usar paracetamol/gabapentina para dolor.',
 'FDA Drug Safety Communication');

INSERT INTO interacciones_farmaco (farmaco_a_id, farmaco_b_id, severidad, mecanismo, consecuencia, manejo, evidencia)
VALUES (6, 113, 'contraindicado',
 'Naltrexona (componente de Isatril/Contrave) antagoniza efecto opioide del tramadol y precipita abstinencia',
 'Abstinencia opioide aguda + convulsiones (ambos bajan umbral convulsivo).',
 'CONTRAINDICADO. Nunca prescribir juntos.',
 'FDA Prescribing Information');

-- Espironolactona + IECA (hiperpotasemia grave)
INSERT INTO interacciones_farmaco (subclase_a, subclase_b, severidad, mecanismo, consecuencia, manejo, evidencia)
VALUES ('Diurético ahorrador de K+','IECA','grave',
 'Ambos elevan K+ por mecanismos distintos (bloqueo aldosterona + reducción excreción renal K+)',
 'Hiperpotasemia severa (K+ >6.5 mEq/L), arritmias ventriculares, paro cardíaco.',
 'Monitorizar K+ basal y a 7 días. Contraindicado si K+ >5.0. Espironolactona ≤25 mg/día con IECA. Evitar en ERC G3b+.',
 'RALES Trial — ACC/AHA Guidelines');

-- Espironolactona + ARA-II
INSERT INTO interacciones_farmaco (subclase_a, subclase_b, severidad, mecanismo, consecuencia, manejo, evidencia)
VALUES ('Diurético ahorrador de K+','ARA-II','grave',
 'Doble efecto ahorrador de potasio',
 'Hiperpotasemia severa, arritmias.',
 'Mismas precauciones que IECA. K+ basal <5. ERC: contraindicado G3b+.',
 'ESC Guidelines 2023');

-- Alopurinol + Azatioprina (GRAVE)
INSERT INTO interacciones_farmaco (farmaco_a_id, farmaco_b_id, severidad, mecanismo, consecuencia, manejo, evidencia)
VALUES (61, 69, 'contraindicado',
 'Alopurinol inhibe xantina oxidasa que metaboliza 6-mercaptopurina (metabolito activo de azatioprina). Acumulación 4-5x.',
 'Pancitopenia grave, infecciones oportunistas, muerte por mielosupresión severa.',
 'CONTRAINDICADO como regla general. Si necesario (gota + EII): reducir azatioprina al 25% y monitoreo hemograma semanal. Preferir febuxostat.',
 'Revisión Cochrane; ECCO Guidelines EII 2023');

-- Febuxostat + Azatioprina (similar al alopurinol)
INSERT INTO interacciones_farmaco (farmaco_a_id, farmaco_b_id, severidad, mecanismo, consecuencia, manejo, evidencia)
VALUES (62, 69, 'contraindicado',
 'Febuxostat también inhibe xantina oxidasa; mismo mecanismo que alopurinol',
 'Mielosupresión grave con azatioprina.',
 'CONTRAINDICADO. Usar colchicina a dosis ajustada si necesita tratar gota aguda en paciente con azatioprina.',
 'FDA Prescribing Information Febuxostat');

-- ============================================================
-- INTERACCIONES GRAVES
-- ============================================================

-- Estatinas + Fenofibrato → miopatía
INSERT INTO interacciones_farmaco (subclase_a, farmaco_b_id, severidad, mecanismo, consecuencia, manejo, evidencia)
VALUES ('Estatina', 18, 'grave',
 'Fenofibrato inhibe glucuronización de estatinas + posible efecto sinérgico miotóxico mitocondrial',
 'Miopatía, mialgia, CK elevada, rabdomiólisis (especialmente simvastatina + fenofibrato).',
 'Preferir fenofibrato con atorvastatina o rosuvastatina (menor riesgo). Monitorear CK. Contraindicado con simvastatina. Separar horarios si es posible.',
 'FDA Drug Safety Communication 2012; AHA/ACC Lipid Guidelines');

-- Colchicina + Estatinas → rabdomiólisis
INSERT INTO interacciones_farmaco (farmaco_a_id, subclase_b, severidad, mecanismo, consecuencia, manejo, evidencia)
VALUES (63, 'Estatina', 'grave',
 'Colchicina inhibe glicoproteína-P (P-gp) y CYP3A4, elevando niveles plasmáticos de estatinas',
 'Miopatía severa, rabdomiólisis potencialmente fatal especialmente con simvastatina.',
 'Usar colchicina a dosis mínima efectiva. Suspender estatina durante crisis aguda de gota si posible. Monitorear CK y función renal.',
 'FDA Warning 2009; Rheumatology Guidelines 2022');

-- Colchicina + Diltiazem → toxicidad colchicina
INSERT INTO interacciones_farmaco (farmaco_a_id, farmaco_b_id, severidad, mecanismo, consecuencia, manejo, evidencia)
VALUES (63, 58, 'grave',
 'Diltiazem inhibe CYP3A4 y P-gp, reduciendo aclaramiento de colchicina (niveles 2-3x mayores)',
 'Toxicidad colchicina: náuseas, diarrea, fallo multiorgánico, neuropatía, muerte.',
 'Reducir dosis colchicina al 50%. Alternativa: usar AINE (si función renal permite) para crisis aguda. Monitorizar toxicidad.',
 'FDA Prescribing Information Colchicine 2023');

-- Simvastatina + Diltiazem → miopatía CYP3A4
INSERT INTO interacciones_farmaco (farmaco_a_id, farmaco_b_id, severidad, mecanismo, consecuencia, manejo, evidencia)
VALUES (17, 58, 'grave',
 'Diltiazem inhibe CYP3A4 que metaboliza simvastatina; niveles plasmáticos de simvastatina aumentan 5x',
 'Miopatía severa, rabdomiólisis.',
 'CONTRAINDICADO. Cambiar a atorvastatina ≤20 mg o rosuvastatina (no metabolizadas por CYP3A4 principalmente). Preferir rosuvastatina o pravastatina.',
 'FDA Drug Safety Communication; EMA Guidelines');

-- Atorvastatina + Diltiazem → miopatía (moderada-grave)
INSERT INTO interacciones_farmaco (farmaco_a_id, farmaco_b_id, severidad, mecanismo, consecuencia, manejo, evidencia)
VALUES (15, 58, 'moderada',
 'Diltiazem inhibe CYP3A4; aumenta atorvastatina ~40%',
 'Mialgia, elevación CK. Menor riesgo que simvastatina.',
 'Usar atorvastatina ≤20 mg si requiere diltiazem. Monitorear síntomas musculares.',
 'Prescribers Digital Reference');

-- iSGLT2 + Furosemida → deshidratación/AKI
INSERT INTO interacciones_farmaco (subclase_a, farmaco_b_id, severidad, mecanismo, consecuencia, manejo, evidencia)
VALUES ('iSGLT2', 53, 'grave',
 'Doble efecto natriurético y diurético: iSGLT2 elimina glucosa+agua, furosemida diuresis forzada',
 'Deshidratación severa, hipotensión ortostática, AKI prerrenal, cetoacidosis euglucémica.',
 'Hidratación adecuada. Reducir furosemida si posible. Monitorear TA ortostática, creatinina y glucosa. Suspender iSGLT2 antes de cirugía o ayuno.',
 'ADA Standards of Care 2024; EMPA-REG OUTCOME');

-- Warfarina + Metronidazol → INR disparado
INSERT INTO interacciones_farmaco (farmaco_a_id, farmaco_b_id, severidad, mecanismo, consecuencia, manejo, evidencia)
VALUES (93, 67, 'grave',
 'Metronidazol inhibe CYP2C9 (principal metabolizador de warfarina S) y CYP3A4',
 'INR aumenta 2-3x en días; riesgo hemorrágico muy elevado (hemorragia digestiva, cerebral).',
 'Reducir dosis warfarina al 25-50% durante curso de metronidazol. INR diario primeros 3 días. Alternativa: rifaximina si clínica permite (sin interacción).',
 'Interacción Clase A — Stockley Drug Interactions');

-- Warfarina + Aspirina → sangrado
INSERT INTO interacciones_farmaco (farmaco_a_id, farmaco_b_id, severidad, mecanismo, consecuencia, manejo, evidencia)
VALUES (93, 89, 'grave',
 'Aspirina inhibe COX-1 plaquetaria (efecto antiagregante) + irrita mucosa GI + desplaza warfarina de proteínas',
 'Riesgo hemorrágico GI muy aumentado. Hemorragia digestiva alta.',
 'Evitar combinación salvo indicación muy específica (válvula mecánica + FA). Si necesario: AAS ≤100 mg/día + IBP protector. Monitoreo INR.',
 'ESC Antithrombotic Guidelines 2023');

-- Warfarina + Omeprazol/Esomeprazol
INSERT INTO interacciones_farmaco (farmaco_a_id, farmaco_b_id, severidad, mecanismo, consecuencia, manejo, evidencia)
VALUES (93, 28, 'moderada',
 'Omeprazol inhibe CYP2C19 que metaboliza warfarina; aumenta nivel de warfarina ~25%',
 'INR aumentado; mayor riesgo hemorrágico.',
 'Usar pantoprazol (menor interacción CYP2C19). Monitorear INR al iniciar/suspender IBP.',
 'Clinical Pharmacokinetics 2019');

INSERT INTO interacciones_farmaco (farmaco_a_id, farmaco_b_id, severidad, mecanismo, consecuencia, manejo, evidencia)
VALUES (93, 65, 'moderada',
 'Esomeprazol inhibe CYP2C19 similar a omeprazol',
 'INR aumentado.',
 'Preferir pantoprazol con warfarina.',
 'Clinical Pharmacokinetics 2019');

-- Tramadol + ISRS → síndrome serotoninérgico
INSERT INTO interacciones_farmaco (farmaco_a_id, subclase_b, severidad, mecanismo, consecuencia, manejo, evidencia)
VALUES (113, 'ISRS', 'grave',
 'Tramadol inhibe recaptación serotonina/noradrenalina; ISRS incrementan serotonina. Efecto aditivo severo.',
 'Síndrome serotoninérgico: hipertermia, rigidez muscular, mioclonías, taquicardia, muerte.',
 'CONTRAINDICADO en principio. Si necesario analgesia: usar paracetamol o gabapentina. Si se prescribe: dosis mínima y vigilar síntomas.',
 'FDA Safety Communication; Prescribers Digital Reference');

-- Tramadol + Bupropión → convulsiones
INSERT INTO interacciones_farmaco (farmaco_a_id, farmaco_b_id, severidad, mecanismo, consecuencia, manejo, evidencia)
VALUES (113, 30, 'grave',
 'Ambos bajan umbral convulsivo + bupropión inhibe CYP2D6 (metaboliza tramadol) aumentando su nivel',
 'Crisis convulsivas, síndrome serotoninérgico.',
 'Evitar. Si se requiere analgesia con paciente en bupropión: paracetamol o AINE a dosis mínima (si función renal permite).',
 'FDA Prescribing Information Bupropion');

INSERT INTO interacciones_farmaco (farmaco_a_id, farmaco_b_id, severidad, mecanismo, consecuencia, manejo, evidencia)
VALUES (113, 6, 'grave',
 'Naltrexona/Bupropión: bupropión inhibe CYP2D6 del tramadol; naltrexona precipita abstinencia',
 'Convulsiones + síndrome de abstinencia simultáneo.',
 'CONTRAINDICADO. Nunca prescribir Isatril/Contrave con tramadol.',
 'FDA Drug Safety');

-- Fentermina + ISRS → síndrome serotoninérgico
INSERT INTO interacciones_farmaco (farmaco_a_id, subclase_b, severidad, mecanismo, consecuencia, manejo, evidencia)
VALUES (4, 'ISRS', 'grave',
 'Fentermina libera aminas (incluyendo serotonina); ISRS bloquean recaptación. Efecto aditivo.',
 'Síndrome serotoninérgico, hipertensión severa, crisis adrenérgica.',
 'Contraindicado combinar. Si paciente requiere antidepresivo: valorar bupropión (pero con otras interacciones) o buscar alternativa sin fentermina.',
 'FDA Prescribing Information Phentermine');

-- Topiramato + Metformina → acidosis
INSERT INTO interacciones_farmaco (farmaco_a_id, farmaco_b_id, severidad, mecanismo, consecuencia, manejo, evidencia)
VALUES (29, 8, 'moderada',
 'Topiramato inhibe anhidrasa carbónica → acidosis metabólica hiperclorémica; metformina acumula lactato en acidosis',
 'Acidosis metabólica sinérgica; riesgo de acidosis láctica con metformina.',
 'Monitorizar bicarbonato sérico. Suspender metformina si HCO3- <18 mEq/L. Hidratación adecuada.',
 'FDA Drug Safety Communication Topiramate');

INSERT INTO interacciones_farmaco (farmaco_a_id, farmaco_b_id, severidad, mecanismo, consecuencia, manejo, evidencia)
VALUES (5, 8, 'moderada',
 'Fentermina/Topiramato: componente topiramato con mismo efecto sobre acidosis',
 'Acidosis metabólica + riesgo lactato.',
 'Igual que topiramato solo + metformina. Monitoreo obligatorio.',
 'FDA Drug Safety');

-- Metformina + Alcohol (no en catálogo, pero importante: omitir ya que alcohol no es fármaco)

-- Clopidogrel + Omeprazol/Esomeprazol → pérdida antiagregación
INSERT INTO interacciones_farmaco (farmaco_a_id, farmaco_b_id, severidad, mecanismo, consecuencia, manejo, evidencia)
VALUES (90, 28, 'moderada',
 'Omeprazol inhibe CYP2C19 que activa clopidogrel (profármaco), reduciendo metabolito activo 45-50%',
 'Pérdida de efecto antiagregante, mayor riesgo trombótico post-stent o SCA.',
 'Usar pantoprazol (menor inhibición CYP2C19). Si necesario IBP más potente, valorar riesgo/beneficio individual.',
 'FDA Drug Safety Communication 2010; ESC Guidelines');

INSERT INTO interacciones_farmaco (farmaco_a_id, farmaco_b_id, severidad, mecanismo, consecuencia, manejo, evidencia)
VALUES (90, 65, 'moderada',
 'Esomeprazol: mismo mecanismo CYP2C19 que omeprazol',
 'Pérdida antiagregación.',
 'Preferir pantoprazol.',
 'FDA 2010');

-- Quetiapina + Metoclopramida → QT y EPS
INSERT INTO interacciones_farmaco (farmaco_a_id, farmaco_b_id, severidad, mecanismo, consecuencia, manejo, evidencia)
VALUES (121, 101, 'grave',
 'Ambos bloquean receptores D2 y prolongan intervalo QT. Efecto aditivo.',
 'Prolongación QT→ Torsades de Pointes → muerte súbita. Síntomas extrapiramidales severos.',
 'CONTRAINDICADO en principio. Si necesario antiemético: ondansetrón (también QT pero menos). Monitoreo ECG.',
 'CredibleMeds QT Risk Database');

-- Escitalopram/ISRS + Metoclopramida → serotonina + QT
INSERT INTO interacciones_farmaco (subclase_a, farmaco_b_id, severidad, mecanismo, consecuencia, manejo, evidencia)
VALUES ('ISRS', 101, 'grave',
 'Metoclopramida + ISRS: síndrome serotoninérgico + prolongación QT aditiva',
 'Síndrome serotoninérgico, QT largo, arritmias.',
 'Evitar. Usar domperidona como alternativa (menor acceso SNC) o ondansetrón.',
 'CredibleMeds; FDA Warning Metoclopramida');

-- Sulfonilurea + iDPP-4 → hipoglucemia
INSERT INTO interacciones_farmaco (subclase_a, subclase_b, severidad, mecanismo, consecuencia, manejo, evidencia)
VALUES ('Sulfonilurea','iDPP-4','moderada',
 'iDPP-4 potencia efecto insulinotrópico de sulfonilureas; ambos estimulan secreción insulina',
 'Hipoglucemia moderada-grave.',
 'Reducir dosis sulfonilurea 25-50% al agregar iDPP-4. Monitoreo glucémico. Preferir gliclazida MR (menor hipoglucemia).',
 'ADA Standards of Care 2024');

-- Sulfonilurea + GLP-1 RA → hipoglucemia
INSERT INTO interacciones_farmaco (subclase_a, subclase_b, severidad, mecanismo, consecuencia, manejo, evidencia)
VALUES ('Sulfonilurea','GLP-1 RA','moderada',
 'GLP-1 RA potencia efecto insulinotrópico glucosa-dependiente; sulfonilurea activa independientemente de glucosa',
 'Hipoglucemia, especialmente con glibenclamida.',
 'Reducir sulfonilurea al agregar GLP-1 RA. Preferir gliclazida. Monitoreo glucémico.',
 'ADA/EASD Consensus Report 2022');

-- Insulina + GLP-1 RA → hipoglucemia
INSERT INTO interacciones_farmaco (subclase_a, subclase_b, severidad, mecanismo, consecuencia, manejo, evidencia)
VALUES ('Insulina','GLP-1 RA','moderada',
 'GLP-1 RA mejora control glucémico; combinación con insulina aumenta riesgo hipoglucemia si no se ajusta dosis insulina',
 'Hipoglucemia, especialmente en ayunas.',
 'Reducir insulina basal 10-20% al agregar GLP-1 RA. Monitoreo glucémico intensivo las primeras semanas.',
 'SUSTAIN-5, AWARD-4 Trials — ADA 2024');

-- Pioglitazona + Insulina → edema, IC
INSERT INTO interacciones_farmaco (farmaco_a_id, subclase_b, severidad, mecanismo, consecuencia, manejo, evidencia)
VALUES (35, 'Insulina', 'moderada',
 'Pioglitazona retiene sodio y agua; insulina amplifica este efecto. Efecto aditivo en retención hídrica.',
 'Edema periférico, descompensación IC, aumento de peso.',
 'Contraindicado en IC activa. Monitorear peso, disnea y edemas. Limitar uso si IC prévia.',
 'FDA Black Box Warning Pioglitazona + IC');

-- Levotiroxina + Hierro oral → absorción
INSERT INTO interacciones_farmaco (farmaco_a_id, farmaco_b_id, severidad, mecanismo, consecuencia, manejo, evidencia)
VALUES (26, 74, 'moderada',
 'Hierro quelata la levotiroxina en tracto GI, reduciendo su absorción hasta 60%',
 'Hipotiroidismo subclínico o clínico por malabsorción de levotiroxina. TSH elevada.',
 'Separar administración mínimo 4 horas. Levotiroxina en ayunas, hierro con comida. Recalibrar TSH 6-8 semanas.',
 'Thyroid Association Guidelines 2023');

-- Levotiroxina + Carbonato de calcio → absorción
INSERT INTO interacciones_farmaco (farmaco_a_id, farmaco_b_id, severidad, mecanismo, consecuencia, manejo, evidencia)
VALUES (26, 83, 'moderada',
 'Calcio forma quelato insoluble con levotiroxina en el intestino',
 'Absorción de T4 reducida hasta 40%. TSH elevada.',
 'Separar 4 horas. Levotiroxina en ayunas al despertar. Calcio con comidas.',
 'JAMA 2000; Thyroid Guidelines');

-- Levotiroxina + Sevelamer/Otros quelantes
INSERT INTO interacciones_farmaco (farmaco_a_id, farmaco_b_id, severidad, mecanismo, consecuencia, manejo, evidencia)
VALUES (26, 25, 'moderada',
 'Sevelamer puede quelatar levotiroxina en el intestino',
 'Reducción absorción T4.',
 'Separar administración 4 horas. Monitoreo TSH cada 6-8 semanas en ERC/diálisis.',
 'Nephrology Dialysis Transplantation 2015');

-- Levotiroxina + IBP → absorción
INSERT INTO interacciones_farmaco (farmaco_a_id, subclase_b, severidad, mecanismo, consecuencia, manejo, evidencia)
VALUES (26, 'IBP', 'leve',
 'IBP elevan pH gástrico; levotiroxina se absorbe mejor a pH ácido',
 'Reducción moderada absorción T4 (~20%). TSH puede subir levemente.',
 'Monitorear TSH. Tomar levotiroxina en ayunas 30-60 min antes del IBP. Alternativamente: gel oral de levotiroxina.',
 'J Clin Endocrinol Metab 2017');

-- Orlistat + Levotiroxina
INSERT INTO interacciones_farmaco (farmaco_a_id, farmaco_b_id, severidad, mecanismo, consecuencia, manejo, evidencia)
VALUES (7, 26, 'moderada',
 'Orlistat reduce absorción de fármacos lipofílicos y hormonas tiroideas al inhibir absorción grasa intestinal',
 'Hipotiroidismo por malabsorción de levotiroxina.',
 'Separar orlistat de levotiroxina al menos 4 horas. Monitorear TSH mensualmente al inicio de orlistat.',
 'FDA Prescribing Information Orlistat');

-- Orlistat + Warfarina
INSERT INTO interacciones_farmaco (farmaco_a_id, farmaco_b_id, severidad, mecanismo, consecuencia, manejo, evidencia)
VALUES (7, 93, 'moderada',
 'Orlistat reduce absorción de vitamina K (necesaria para producción factores coagulación); altera INR',
 'INR inestable; puede aumentar o disminuir. Riesgo hemorrágico aumentado.',
 'Monitorear INR semanalmente al iniciar/suspender orlistat. Ajustar dosis warfarina según resultado.',
 'FDA Drug Safety; British National Formulary');

-- Orlistat + Ciclosporina (no en catálogo, omitir)

-- Orlistat + Amiodarona (no en catálogo, omitir)

-- IECA/ARA-II + Furosemida → primera dosis hipotensión
INSERT INTO interacciones_farmaco (subclase_a, farmaco_b_id, severidad, mecanismo, consecuencia, manejo, evidencia)
VALUES ('IECA', 53, 'moderada',
 'IECA reduce angiotensina II → vasodilatación; furosemida reduce volemia. Efecto hipotensor sinérgico.',
 'Hipotensión grave primera dosis, síncope, AKI prerrenal.',
 'Iniciar IECA con dosis baja. Suspender furosemida 24h antes si posible. Dar primera dosis de noche. Monitorear TA.',
 'ESC Heart Failure Guidelines');

INSERT INTO interacciones_farmaco (subclase_a, farmaco_b_id, severidad, mecanismo, consecuencia, manejo, evidencia)
VALUES ('ARA-II', 53, 'moderada',
 'Mismo mecanismo que IECA + furosemida',
 'Hipotensión, AKI prerrenal.',
 'Mismas precauciones que IECA + furosemida.',
 'ESC Guidelines');

-- iSGLT2 + Insulina → hipoglucemia / cetoacidosis
INSERT INTO interacciones_farmaco (subclase_a, subclase_b, severidad, mecanismo, consecuencia, manejo, evidencia)
VALUES ('iSGLT2','Insulina','moderada',
 'iSGLT2 mejoran control glucémico; con insulina aumenta riesgo hipoglucemia y cetoacidosis euglucémica',
 'Hipoglucemia. Cetoacidosis diabética euglucémica (glucosa puede ser <250 mg/dL).',
 'Reducir insulina basal 10-20% al agregar iSGLT2. Suspender iSGLT2 3 días antes de cirugía/ayuno. Educar sobre cetonas.',
 'ADA Standards of Care 2024; CREDENCE Trial');

-- Warfarina + Vitamina K (alimentos/suplementos) — interacción con vit K2
INSERT INTO interacciones_farmaco (farmaco_a_id, farmaco_b_id, severidad, mecanismo, consecuencia, manejo, evidencia)
VALUES (93, 82, 'moderada',
 'Vitamina K2 activa factores de coagulación dependientes de vitamina K, antagonizando warfarina',
 'INR disminuido, pérdida de anticoagulación, riesgo trombótico.',
 'Si se usa vitamina K2 con warfarina: dosis estables y monitoreo INR semanal. Considerar NOAC alternativo.',
 'British Journal Haematology 2021');

-- Clopidogrel + Ibuprofeno (AINE) → pérdida antiagregación + sangrado GI
INSERT INTO interacciones_farmaco (farmaco_a_id, farmaco_b_id, severidad, mecanismo, consecuencia, manejo, evidencia)
VALUES (90, 117, 'grave',
 'Ibuprofeno compite con AAS por unión COX-1 plaquetaria Y aumenta riesgo GI. Con clopidogrel: daño mucosa sin protección.',
 'Hemorragia GI severa + posible pérdida de efecto antiagregante de aspirina.',
 'CONTRAINDICADO. Usar paracetamol para dolor. Si AINE indispensable: célecoxib + IBP (menor efecto COX-1).',
 'ESC Antiplatelet Guidelines 2023');

-- Aspirina + Ibuprofeno → bloqueo COX-1
INSERT INTO interacciones_farmaco (farmaco_a_id, farmaco_b_id, severidad, mecanismo, consecuencia, manejo, evidencia)
VALUES (89, 117, 'moderada',
 'Ibuprofeno ocupa sitio activo COX-1 antes que aspirina, bloqueando su efecto antiagregante irreversible',
 'Pérdida de cardioprotección de AAS. Hemorragia GI aumentada.',
 'Tomar aspirina ≥2 horas ANTES del ibuprofeno. Mejor alternativa: paracetamol.',
 'FDA Drug Safety Communication 2006');

-- Metformina + Contraste (no es fármaco del catálogo, pero anotamos en nota)
-- Se manejará en texto como nota clínica

-- Finerenona + IECA/ARA-II (hiperpotasemia — moderada, no contraindicada si K+ ok)
INSERT INTO interacciones_farmaco (farmaco_a_id, subclase_b, severidad, mecanismo, consecuencia, manejo, evidencia)
VALUES (24, 'IECA', 'moderada',
 'Finerenona (ARM) + IECA: ambos reducen aldosterona → retención de K+',
 'Hiperpotasemia (riesgo aumentado vs monoterapia).',
 'Contraindicado si K+ inicial >4.8 mEq/L. Monitoreo K+ a 4 semanas del inicio y luego cada 3 meses. Meta K+ <5.0.',
 'FIDELIO-DKD Trial; ESC HF 2023');

INSERT INTO interacciones_farmaco (farmaco_a_id, subclase_b, severidad, mecanismo, consecuencia, manejo, evidencia)
VALUES (24, 'ARA-II', 'moderada',
 'Mismo mecanismo que finerenona + IECA',
 'Hiperpotasemia.',
 'Mismas precauciones. Monitoreo K+.',
 'FIGARO-DKD Trial');

-- Bupropion + Epilépticos/Convulsiones (topiramato)
INSERT INTO interacciones_farmaco (farmaco_a_id, farmaco_b_id, severidad, mecanismo, consecuencia, manejo, evidencia)
VALUES (30, 29, 'moderada',
 'Bupropión baja umbral convulsivo; topiramato a altas dosis también puede provocar confusión/encefalopatía. Acidosis metabólica aditiva.',
 'Mayor riesgo de convulsiones. Acidosis metabólica.',
 'Monitorizar síntomas neurológicos y bicarbonato. En Qsymia: el topiramato viene en dosis bajas (23-92 mg) que reducen riesgo.',
 'FDA Prescribing Information Bupropion');

-- Metimazol + Warfarina
INSERT INTO interacciones_farmaco (farmaco_a_id, farmaco_b_id, severidad, mecanismo, consecuencia, manejo, evidencia)
VALUES (96, 93, 'moderada',
 'Hipertiroidismo aumenta catabolismo factores coagulación; al tratar con metimazol y normalizar tiroides, INR cambia',
 'INR disminuye al mejorar función tiroidea; mayor riesgo trombótico si no se ajusta warfarina.',
 'Monitoreo INR frecuente al iniciar metimazol. Ajustar warfarina según respuesta tiroidea.',
 'Thyroid Guidelines; Coumadin Prescribing Information');

-- Omega-3 (altas dosis) + Warfarina/Anticoagulantes
INSERT INTO interacciones_farmaco (farmaco_a_id, subclase_b, severidad, mecanismo, consecuencia, manejo, evidencia)
VALUES (79, 'Antagonista vitamina K', 'leve',
 'Omega-3 en dosis altas (≥3g EPA+DHA) puede inhibir agregación plaquetaria y prolongar tiempo sangría',
 'INR levemente aumentado; mayor riesgo hemorrágico con anticoagulantes.',
 'Dosis bajas <3g/día: sin ajuste necesario. Dosis terapéuticas: monitoreo INR. Informar al paciente de riesgo de hematomas.',
 'REDUCE-IT; AHA Scientific Statement 2023');

-- Domperidona + QT (solo en ERC — ya está en nota eGFR, pero también con otros QT)
INSERT INTO interacciones_farmaco (farmaco_a_id, farmaco_b_id, severidad, mecanismo, consecuencia, manejo, evidencia)
VALUES (102, 121, 'grave',
 'Domperidona + Quetiapina: ambos prolongan QT',
 'Torsades de Pointes, muerte súbita.',
 'CONTRAINDICADO. Usar metoclopramida a dosis baja si quetiapina es indispensable; igual riesgo pero hay menos alternativas.',
 'EMA Safety Review Domperidona 2014');

-- Rifaximina (absorción mínima — pocas interacciones, pero anotar con warfarina por cambio flora)
INSERT INTO interacciones_farmaco (farmaco_a_id, farmaco_b_id, severidad, mecanismo, consecuencia, manejo, evidencia)
VALUES (66, 93, 'leve',
 'Rifaximina puede alterar flora intestinal productora de vitamina K → cambio en INR',
 'INR puede variar levemente.',
 'Monitoreo INR si tratamiento prolongado con rifaximina. En general mínimamente relevante.',
 'Prescribers Digital Reference');

-- Colestiramina / quelantes + múltiples fármacos (reduce absorción de casi todo)
INSERT INTO interacciones_farmaco (farmaco_a_id, subclase_b, severidad, mecanismo, consecuencia, manejo, evidencia)
VALUES (107, 'Antagonista vitamina K', 'grave',
 'Colestiramina se une a warfarina en el intestino y reduce su absorción',
 'INR disminuido, pérdida de anticoagulación.',
 'Separar colestiramina de warfarina mínimo 4-6 horas. Monitoreo INR.',
 'Stockley Drug Interactions');

INSERT INTO interacciones_farmaco (farmaco_a_id, farmaco_b_id, severidad, mecanismo, consecuencia, manejo, evidencia)
VALUES (107, 26, 'moderada',
 'Colestiramina une levotiroxina en intestino; reduce absorción',
 'Hipotiroidismo por malabsorción.',
 'Separar 4-6 horas. Levotiroxina en ayunas primero.',
 'Clinical Pharmacokinetics');

-- Gabapentina/Pregabalina + Tramadol → sedación severa
INSERT INTO interacciones_farmaco (farmaco_a_id, farmaco_b_id, severidad, mecanismo, consecuencia, manejo, evidencia)
VALUES (114, 113, 'moderada',
 'Efecto depresor del SNC aditivo: ambos actúan en vías de modulación del dolor central',
 'Sedación excesiva, depresión respiratoria, caídas, especialmente en adultos mayores con ERC.',
 'Usar la dosis mínima efectiva de ambos. Informar al paciente de riesgo de somnolencia. Evitar con alcohol o benzodiacepinas.',
 'FDA Drug Safety Communication 2019');

INSERT INTO interacciones_farmaco (farmaco_a_id, farmaco_b_id, severidad, mecanismo, consecuencia, manejo, evidencia)
VALUES (115, 113, 'moderada',
 'Pregabalina + Tramadol: depresión SNC aditiva',
 'Sedación, depresión respiratoria.',
 'Mismo manejo que gabapentina + tramadol.',
 'FDA Drug Safety Communication 2019');

-- Metformina + Furosemida → aclaramiento metformina
INSERT INTO interacciones_farmaco (farmaco_a_id, farmaco_b_id, severidad, mecanismo, consecuencia, manejo, evidencia)
VALUES (8, 53, 'moderada',
 'Furosemida aumenta niveles de metformina por competencia en secreción tubular. Además deshidratación reduce filtrado renal.',
 'Niveles elevados de metformina; mayor riesgo acidosis láctica, especialmente en ERC.',
 'Monitorear creatinina y eGFR. Si furosemida en dosis altas por IC/ERC descompensada: suspender metformina temporalmente.',
 'Micromedex; FDA Prescribing Information Metformina');

-- Sertralina + Tramadol (ya cubierto en ISRS genérico, añadir específico para completar)

-- Escitalopram + QT largo
INSERT INTO interacciones_farmaco (farmaco_a_id, farmaco_b_id, severidad, mecanismo, consecuencia, manejo, evidencia)
VALUES (119, 121, 'moderada',
 'Escitalopram prolonga QT dosis-dependiente; quetiapina también prolonga QT',
 'Prolongación QT aditiva; riesgo arritmia.',
 'Usar citalopram ≤20 mg (o escitalopram ≤10 mg en adultos mayores). Monitoreo ECG. Preferir sertralina.',
 'FDA Drug Safety Communication Citalopram/Escitalopram');
