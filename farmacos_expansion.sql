-- ============================================================
-- EXPANSIÓN CATÁLOGO DE FÁRMACOS v2
-- ============================================================

INSERT INTO farmacos_catalogo
  (nombre, nombres_comer, clase, subclase, indicaciones, dosis_std, frecuencia_std,
   egfr_g1, egfr_g2, egfr_g3a, egfr_g3b, egfr_g4, egfr_g5, egfr_hd, egfr_dp, nota_egfr)
VALUES

-- ══════════════════════════════════════════════════════════
-- ANTIOBESIDAD — ADICIONALES
-- ══════════════════════════════════════════════════════════

('Topiramato (solo)', '["Topamax","Epitomax"]', 'Antiobesidad', 'Anticonvulsivante/antiobesidad',
 '["Obesidad","Migraña"]', '25→200 mg/día', 'Dos veces al día',
 'verde','verde','amarillo','rojo','rojo','rojo','rojo','rojo',
 'G3a: 50% dosis. G3b+: contraindicado. Acidosis metabólica + nefrolitiasis en ERC.'),

('Bupropión (solo)', '["Wellbutrin","Zyban"]', 'Antiobesidad', 'Antidepresivo/antiobesidad',
 '["Obesidad","Depresión","Tabaquismo"]', '150→300 mg/día', 'Una o dos veces al día',
 'verde','verde','verde','amarillo','rojo','rojo','rojo','rojo',
 'G3b: máx 150 mg/día. G4/G5/HD: contraindicado; acumulación de metabolitos.'),

('Dulaglutida', '["Trulicity"]', 'Antiobesidad', 'GLP-1 RA',
 '["DM2","Obesidad","Prevención CV"]', '0.75→1.5 mg/sem (SQ)', 'Semanal',
 'verde','verde','verde','verde','amarillo','rojo','rojo','rojo',
 'G4: precaución. G5/HD: no recomendado; datos limitados. Monitorizar eGFR.'),

('Exenatida', '["Byetta","Bydureon"]', 'Antiobesidad', 'GLP-1 RA',
 '["DM2","Obesidad"]', '5→10 mcg c/12h (IR) | 2 mg/sem (ER)', 'Dos veces al día / Semanal',
 'verde','verde','verde','rojo','rojo','rojo','rojo','rojo',
 'G3b+: CONTRAINDICADO. Excreción renal predominante; acumulación grave.'),

('Naltrexona (sola)', '["Revia","Vivitrol"]', 'Antiobesidad', 'Antagonista opioide',
 '["Obesidad","Adicción alcohol/opioides"]', '25→50 mg/día (oral) | 380 mg/mes (IM)', 'Diario / Mensual',
 'verde','verde','verde','amarillo','rojo','rojo','rojo','rojo',
 'G3b: usar con precaución, reducir dosis. G4+: contraindicado.'),

-- ══════════════════════════════════════════════════════════
-- ANTIDIABÉTICOS — ADICIONALES
-- ══════════════════════════════════════════════════════════

('Canagliflozina', '["Invokana"]', 'Antidiabético', 'iSGLT2',
 '["DM2","ERC","IC"]', '100→300 mg/día', 'Diario',
 'verde','verde','verde','amarillo','amarillo','rojo','rojo','rojo',
 'G3b: 100 mg/día. G4: solo indicación ERC/IC (CREDENCE). G5/HD: contraindicado.'),

('Pioglitazona', '["Actos"]', 'Antidiabético', 'Tiazolidinediona',
 '["DM2","Hígado graso no alcohólico"]', '15→45 mg/día', 'Diario',
 'verde','verde','verde','verde','amarillo','rojo','rojo','rojo',
 'G4: precaución, retención hídrica e IC. G5/HD: evitar. Contraindicada en IC activa.'),

('Acarbosa', '["Glucobay","Precose"]', 'Antidiabético', 'Inhibidor alfa-glucosidasa',
 '["DM2"]', '25→100 mg c/8h con comidas', 'Con cada comida',
 'verde','verde','verde','rojo','rojo','rojo','rojo','rojo',
 'G3b+: contraindicado. Acumulación de metabolitos; riesgo toxicidad GI.'),

('Alogliptina', '["Nesina"]', 'Antidiabético', 'iDPP-4',
 '["DM2"]', '25 mg/día → ajustar por eGFR', 'Diario',
 'verde','verde','amarillo','amarillo','amarillo','amarillo','amarillo','amarillo',
 'G3a: 12.5 mg/día. G3b/G4: 6.25 mg/día. G5/HD: 6.25 mg/día.'),

('Saxagliptina', '["Onglyza"]', 'Antidiabético', 'iDPP-4',
 '["DM2"]', '5 mg/día → ajustar por eGFR', 'Diario',
 'verde','verde','amarillo','amarillo','amarillo','amarillo','amarillo','amarillo',
 'G3a/G3b/G4/G5/HD: 2.5 mg/día. Precaución en IC.'),

('Linagliptina', '["Tradjenta"]', 'Antidiabético', 'iDPP-4',
 '["DM2"]', '5 mg/día', 'Diario',
 'verde','verde','verde','verde','verde','verde','verde','verde',
 'SIN AJUSTE renal. Excreción biliar/fecal. De elección en ERC avanzada entre iDPP-4.'),

('Repaglinida', '["Prandin","NovoNorm"]', 'Antidiabético', 'Meglitinida',
 '["DM2"]', '0.5→4 mg antes de comidas', 'Antes de cada comida',
 'verde','verde','verde','verde','amarillo','amarillo','amarillo','amarillo',
 'G4/G5/HD: iniciar 0.5 mg, aumentar con cautela. Excreción hepática mayoritaria.'),

('Insulina glargina 300', '["Toujeo"]', 'Antidiabético', 'Insulina basal',
 '["DM1","DM2"]', 'Individualizado', 'Una vez al día',
 'verde','verde','verde','amarillo','amarillo','amarillo','amarillo','amarillo',
 'Reducir dosis 25% en G3b, 50% en G4+. Mayor riesgo hipoglucemia.'),

('Insulina degludec', '["Tresiba"]', 'Antidiabético', 'Insulina basal ultra-lenta',
 '["DM1","DM2"]', 'Individualizado', 'Una vez al día',
 'verde','verde','verde','amarillo','amarillo','amarillo','amarillo','amarillo',
 'Perfil similar a glargina. Reducir dosis progresivamente con ERC. Sin metabolito activo.'),

('Insulina aspártica', '["NovoLog","NovoRapid"]', 'Antidiabético', 'Insulina rápida',
 '["DM1","DM2"]', 'Individualizado', 'Antes de comidas',
 'verde','verde','verde','amarillo','amarillo','amarillo','amarillo','amarillo',
 'Reducir dosis bolo con ERC. Monitoreo glucémico intensivo.'),

('Insulina lispro', '["Humalog"]', 'Antidiabético', 'Insulina rápida',
 '["DM1","DM2"]', 'Individualizado', 'Antes de comidas',
 'verde','verde','verde','amarillo','amarillo','amarillo','amarillo','amarillo',
 'Igual que aspártica; reducir con ERC avanzada.'),

('Semaglutida oral', '["Rybelsus"]', 'Antidiabético', 'GLP-1 RA oral',
 '["DM2"]', '3→14 mg/día oral', 'En ayunas, 30 min antes desayuno',
 'verde','verde','verde','verde','amarillo','rojo','rojo','rojo',
 'G4: precaución. G5/HD: no recomendado. Tomar con 120 mL agua, permanecer 30 min de pie.'),

-- ══════════════════════════════════════════════════════════
-- ANTIHIPERTENSIVOS — ADICIONALES
-- ══════════════════════════════════════════════════════════

('Ramipril', '["Altace","Triatec"]', 'Antihipertensivo', 'IECA',
 '["HTA","IC","ERC con proteinuria","Post-IAM"]', '2.5→10 mg/día', 'Diario o dividido',
 'verde','verde','verde','amarillo','amarillo','rojo','rojo','rojo',
 'G3b/G4: reducir dosis inicial, ajustar por K+ y creatinina. G5/HD: contraindicado.'),

('Lisinopril', '["Prinivil","Zestril"]', 'Antihipertensivo', 'IECA',
 '["HTA","IC","DM2 con nefropatía"]', '5→40 mg/día', 'Diario',
 'verde','verde','verde','amarillo','amarillo','rojo','rojo','rojo',
 'Excreción renal directa. G3b: 5-10 mg/día. G4: 2.5-5 mg/día. G5/HD: contraindicado.'),

('Valsartán', '["Diovan","Valzaar"]', 'Antihipertensivo', 'ARA-II',
 '["HTA","IC","Post-IAM"]', '80→320 mg/día', 'Diario',
 'verde','verde','verde','amarillo','amarillo','rojo','rojo','rojo',
 'Similar a losartán. Metabolismo hepático. G3b/G4: ajuste y monitoreo de K+.'),

('Telmisartán', '["Micardis"]', 'Antihipertensivo', 'ARA-II',
 '["HTA","Prevención CV"]', '40→80 mg/día', 'Diario',
 'verde','verde','verde','verde','amarillo','amarillo','amarillo','amarillo',
 'Excreción biliar mayoritaria. Mejor perfil renal que otros ARA-II. Ajuste leve en G4.'),

('Olmesartán', '["Benicar","Olmetec"]', 'Antihipertensivo', 'ARA-II',
 '["HTA"]', '20→40 mg/día', 'Diario',
 'verde','verde','verde','amarillo','amarillo','rojo','rojo','rojo',
 'G3b: 20 mg/día máx. G4+: contraindicado. Riesgo enteropatía con uso prolongado.'),

('Bisoprolol', '["Zebeta","Concor"]', 'Antihipertensivo', 'Betabloqueante selectivo β1',
 '["HTA","IC","FA","Angina"]', '2.5→10 mg/día', 'Diario',
 'verde','verde','verde','amarillo','amarillo','amarillo','amarillo','amarillo',
 'G3b/G4: máx 10 mg/día; excreción 50% renal. G5/HD: máx 5-10 mg.'),

('Metoprolol', '["Lopressor","Toprol XL"]', 'Antihipertensivo', 'Betabloqueante selectivo β1',
 '["HTA","IC","FA","Post-IAM"]', '25→200 mg/día', 'Una o dos veces al día',
 'verde','verde','verde','verde','verde','verde','verde','verde',
 'Sin ajuste renal. Metabolismo hepático extenso (CYP2D6).'),

('Furosemida', '["Lasix","Diurex"]', 'Antihipertensivo', 'Diurético de asa',
 '["IC","HTA refractaria","Edema","Oliguria ERC"]', '20→600 mg/día (ERC)', 'Una o dos veces al día',
 'verde','verde','verde','verde','amarillo','amarillo','amarillo','amarillo',
 'ERC: dosis altas necesarias por resistencia. G4/G5: hasta 250-500 mg/día IV para respuesta. HD: sin dosis post-HD.'),

('Espironolactona', '["Aldactone"]', 'Antihipertensivo', 'Diurético ahorrador de K+',
 '["IC","HTA resistente","Hiperaldosteronismo"]', '25→100 mg/día', 'Diario',
 'verde','verde','amarillo','rojo','rojo','rojo','rojo','rojo',
 'G3a: monitoreo K+ estricto. G3b+: CONTRAINDICADO por hiperpotasemia grave.'),

('Hidroclorotiazida', '["HydroDIURIL","Esidrix"]', 'Antihipertensivo', 'Diurético tiazídico',
 '["HTA","Edema leve"]', '12.5→50 mg/día', 'Diario por las mañanas',
 'verde','verde','verde','rojo','rojo','rojo','rojo','rojo',
 'G3b+: pierde eficacia diurética y acumula. Usar furosemida en su lugar.'),

('Clortalidona', '["Hygroton"]', 'Antihipertensivo', 'Diurético tiazídico de larga acción',
 '["HTA","Nefrolitiasis cálcica recurrente"]', '12.5→25 mg/día', 'Diario',
 'verde','verde','verde','rojo','rojo','rojo','rojo','rojo',
 'G3b+: contraindicado igual que HCTZ. Sin eficacia diurética útil.'),

('Nifedipino', '["Adalat","Procardia"]', 'Antihipertensivo', 'Calcioantagonista dihidropiridina',
 '["HTA","Angina","Fenómeno Raynaud"]', '30→90 mg/día (retard)', 'Diario o dividido',
 'verde','verde','verde','verde','verde','verde','verde','verde',
 'Sin ajuste renal. Metabolismo hepático. Edema de tobillos frecuente.'),

('Diltiazem', '["Cardizem","Dilacor"]', 'Antihipertensivo', 'Calcioantagonista no dihidropiridina',
 '["HTA","FA","Angina"]', '120→360 mg/día (retard)', 'Diario o dividido',
 'verde','verde','verde','verde','verde','verde','verde','verde',
 'Sin ajuste renal. Precaución con bradicardia. Interacción CYP3A4 importante.'),

('Sacubitrilo/Valsartán', '["Entresto"]', 'Antihipertensivo', 'ARNI',
 '["IC con FE reducida","HTA refractaria"]', '49/51→97/103 mg c/12h', 'Dos veces al día',
 'verde','verde','verde','amarillo','amarillo','rojo','rojo','rojo',
 'G3b: iniciar dosis baja. G4: 24/26 mg c/12h inicio. G5/HD: contraindicado. No combinar con IECA.'),

('Doxazosina', '["Cardura"]', 'Antihipertensivo', 'Alfa-bloqueante',
 '["HTA","HBP","Feocromocitoma"]', '1→16 mg/día', 'Diario (noche)',
 'verde','verde','verde','verde','verde','verde','verde','verde',
 'Sin ajuste renal. Metabolismo hepático. Riesgo hipotensión ortostática al inicio.'),

-- ══════════════════════════════════════════════════════════
-- ÁCIDO ÚRICO / GOTA
-- ══════════════════════════════════════════════════════════

('Alopurinol', '["Zyloprim","Lopurin"]', 'Antiuricémico', 'Inhibidor xantina oxidasa',
 '["Hiperuricemia","Gota","Nefrolitiasis úrica"]', '100→300 mg/día', 'Diario',
 'verde','verde','amarillo','amarillo','rojo','rojo','rojo','rojo',
 'G3a: 100-200 mg/día. G3b: 100 mg/día. G4/G5/HD: 50-100 mg/día o evitar. Riesgo síndrome Stevens-Johnson en ERC.'),

('Febuxostat', '["Uloric","Adenuric"]', 'Antiuricémico', 'Inhibidor xantina oxidasa',
 '["Hiperuricemia","Gota"]', '40→80 mg/día', 'Diario',
 'verde','verde','verde','verde','amarillo','amarillo','amarillo','amarillo',
 'G4: 40 mg/día. Metabolismo hepático; mejor opción que alopurinol en ERC moderada. Precaución en ECV.'),

('Colchicina', '["Colcrys","Mitigare"]', 'Antiuricémico', 'Antigotoso agudo',
 '["Gota aguda","Pericarditis"]', '0.6→1.2 mg en crisis', 'Dosis única o c/1h',
 'verde','verde','verde','amarillo','rojo','rojo','rojo','rojo',
 'G3b: máx 0.6 mg/día. G4/G5/HD: CONTRAINDICADO. Acumulación grave; toxicidad neuromuscular fatal.'),

-- ══════════════════════════════════════════════════════════
-- GASTROPROTECCIÓN / SIBO / EII
-- ══════════════════════════════════════════════════════════

('Pantoprazol', '["Protonix","Pantoloc"]', 'Gastroprotector', 'IBP',
 '["GERD","Úlcera","Protección gástrica"]', '20→40 mg/día', 'En ayunas',
 'verde','verde','verde','verde','verde','verde','verde','verde',
 'Sin ajuste renal. Metabolismo hepático. Seguro en todos los estadios.'),

('Esomeprazol', '["Nexium"]', 'Gastroprotector', 'IBP',
 '["GERD","Úlcera","Esofagitis erosiva"]', '20→40 mg/día', 'En ayunas',
 'verde','verde','verde','verde','verde','verde','verde','verde',
 'Sin ajuste renal. Máx 20 mg/día en ERC severa por precaución.'),

('Rifaximina', '["Xifaxan","Normix"]', 'Antibiótico', 'Antibiótico no absorbible',
 '["SIBO","IMO","EHE","Diarrea viajero"]', '400-550 mg c/8-12h', 'Dos o tres veces al día',
 'verde','verde','verde','verde','verde','verde','verde','verde',
 'Sin ajuste renal; absorción mínima sistémica (<0.4%). Seguro en ERC.'),

('Metronidazol', '["Flagyl"]', 'Antibiótico', 'Nitroimidazol',
 '["SIBO","Infecciones anaerobias","H. pylori"]', '250→500 mg c/8h', 'Tres veces al día',
 'verde','verde','verde','verde','amarillo','amarillo','amarillo','amarillo',
 'G4/G5: reducir 50% si uso prolongado. HD: administrar post-diálisis. Evitar uso >10 días en ERC avanzada.'),

('Mesalazina', '["Pentasa","Asacol","Salofalk"]', 'Antiinflamatorio intestinal', '5-ASA',
 '["EII - Colitis Ulcerosa","Crohn leve"]', '2.4→4.8 g/día (oral) | 1-4 g/día (rectal)', 'Dos a cuatro veces al día',
 'verde','verde','verde','amarillo','rojo','rojo','rojo','rojo',
 'G3b: usar con precaución, monitorizar función renal. G4+: CONTRAINDICADO; nefrotoxicidad tubulointersticial.'),

('Azatioprina', '["Imuran"]', 'Inmunosupresor', 'Antimetabolito',
 '["EII","Artritis reumatoide","Trasplante"]', '1→3 mg/kg/día', 'Diario',
 'verde','verde','verde','amarillo','amarillo','rojo','rojo','rojo',
 'G3b: reducir 25-50%. G4: reducir 50-75%. G5/HD: contraindicado. Monitoreo hemograma.'),

('Prednisona', '["Deltasone","Meticorten"]', 'Corticosteroide', 'Glucocorticoide oral',
 '["EII brote","Artritis","Sarcoidosis","Trasplante"]', '5→60 mg/día según indicación', 'Diario (mañana)',
 'verde','verde','verde','amarillo','amarillo','amarillo','amarillo','amarillo',
 'Sin ajuste formal pero usar la dosis mínima. ERC: retención Na+/K+, hiperglucemia, aceleración deterioro renal.'),

('Budesonida', '["Entocort","Uceris"]', 'Corticosteroide', 'Glucocorticoide entérico',
 '["EII - Crohn íleon/colon derecho","Colitis microscópica"]', '9 mg/día → reducción', 'Diario (mañana)',
 'verde','verde','verde','verde','verde','verde','verde','verde',
 'Sin ajuste renal. Primer paso hepático alto; menor efecto sistémico que prednisona.'),

('Infliximab', '["Remicade"]', 'Biológico', 'Anti-TNFα IV',
 '["EII moderada-grave","Artritis reumatoide"]', '5 mg/kg IV en semana 0,2,6 luego c/8sem', 'Infusión IV',
 'verde','verde','verde','verde','amarillo','amarillo','amarillo','amarillo',
 'No requiere ajuste renal formal. Precaución en infecciones. Vigilar TB latente.'),

('Adalimumab', '["Humira"]', 'Biológico', 'Anti-TNFα SC',
 '["EII moderada-grave","Artritis reumatoide"]', '160 mg → 80 mg → 40 mg c/2sem', 'Subcutáneo',
 'verde','verde','verde','verde','amarillo','amarillo','amarillo','amarillo',
 'Sin ajuste renal formal. Igual que infliximab respecto a infecciones y TB.'),

-- ══════════════════════════════════════════════════════════
-- SUPLEMENTOS / MICRONUTRIENTES
-- ══════════════════════════════════════════════════════════

('Sulfato ferroso', '["Feosol","Slow FE"]', 'Micronutriente', 'Hierro oral',
 '["Anemia ferropénica","Déficit hierro"]', '300 mg c/8-12h (elemental 60-180 mg/día)', 'En ayunas',
 'verde','verde','verde','verde','amarillo','rojo','amarillo','amarillo',
 'G4: precaución, puede inducir estrés oxidativo. G5/HD: preferir hierro IV. HD: administrar post-sesión.'),

('Hierro sacarosa IV', '["Venofer"]', 'Micronutriente', 'Hierro parenteral',
 '["Anemia ERC en diálisis","Intolerancia hierro oral"]', '100-200 mg IV por sesión', 'IV lento',
 'verde','verde','verde','verde','verde','verde','verde','verde',
 'Fármaco de elección en G4/G5/HD. No requiere ajuste. Monitorear saturación transferrina y ferritina.'),

('Vitamina B12 (Cianocobalamina)', '["Rubramin","Cyanokit"]', 'Micronutriente', 'Vitamina B',
 '["Déficit B12","Anemia megaloblástica","Neuropatía"]', '1000 mcg/día (oral) | 1000 mcg/mes (IM)', 'Diario (oral) / Mensual (IM)',
 'verde','verde','verde','verde','verde','verde','verde','verde',
 'Sin ajuste renal. HD: suplementar rutinariamente; se elimina en diálisis.'),

('Ácido fólico', '["Folvite"]', 'Micronutriente', 'Vitamina B9',
 '["Déficit folato","Embarazo","ERC"]', '1→5 mg/día', 'Diario',
 'verde','verde','verde','verde','verde','verde','verde','verde',
 'HD: 1-5 mg/día obligatorio; se elimina en diálisis. Sin ajuste adicional.'),

('Calcitriol', '["Rocaltrol","Calcijex"]', 'Micronutriente', 'Vitamina D activa (1,25-OH)',
 '["Hiperparatiroidismo secundario ERC","Hipocalcemia diálisis"]', '0.25→0.5 mcg/día', 'Diario',
 'amarillo','amarillo','amarillo','verde','verde','verde','verde','verde',
 'G1-G3: preferir colecalciferol. G4/G5/HD/DP: calcitriol de elección. Monitorear Ca, P, PTH.'),

('Omega-3 (EPA+DHA)', '["Lovaza","Vascepa","Omacor"]', 'Micronutriente', 'Ácido graso esencial',
 '["Hipertrigliceridemia","Prevención CV","Inflamación"]', '2→4 g/día (EPA+DHA)', 'Con comidas',
 'verde','verde','verde','verde','verde','verde','verde','verde',
 'Sin ajuste renal. Monitorear TG y tiempo sangría en dosis altas. Vascepa (EPA puro) en REDUCE-IT.'),

('Magnesio (glicinato/citrato)', '["Mag-G","Natural Calm"]', 'Micronutriente', 'Mineral esencial',
 '["Déficit magnesio","Calambres","Estreñimiento"]', '200→400 mg/día (elemental)', 'Diario',
 'verde','verde','verde','amarillo','rojo','rojo','rojo','rojo',
 'G3b: monitorear Mg sérico. G4+: CONTRAINDICADO suplementación; ERC acumula Mg. HD: usar sulfato Mg IV si déficit grave.'),

('Zinc (gluconato/sulfato)', '["Galzin","Zincate"]', 'Micronutriente', 'Oligoelemento',
 '["Déficit zinc","Cicatrización","Inmunidad"]', '15→30 mg/día (elemental)', 'Con comidas',
 'verde','verde','verde','verde','amarillo','amarillo','amarillo','amarillo',
 'G4/HD: reducir dosis y monitorear; ERC puede acumular Zn. HD: pérdida en diálisis, suplementar con control.'),

('Vitamina K2 (MK-7)', '["MenaQ7","Jarrow MK-7"]', 'Micronutriente', 'Vitamina liposoluble',
 '["Calcificación vascular ERC","Osteoporosis"]', '90→360 mcg/día', 'Con comida grasa',
 'verde','verde','verde','verde','verde','verde','verde','verde',
 'Sin ajuste renal. Especialmente benéfica en ERC/HD para prevenir calcificación vascular.'),

-- ══════════════════════════════════════════════════════════
-- HUESO / CALCIO / PTH
-- ══════════════════════════════════════════════════════════

('Carbonato de calcio', '["Tums","Os-Cal","Caltrate"]', 'Quelante de fósforo', 'Cálcico',
 '["Hiperfosfatemia ERC","Hipocalcemia","Osteoporosis"]', '500→1500 mg Ca elemental/día con comidas', 'Con comidas',
 'verde','verde','verde','verde','verde','verde','verde','verde',
 'Tomar con comidas para efecto quelante de P. Evitar hipercalcemia. HD: preferir quelantes no cálcicos si Ca >10.'),

('Carbonato de lantano', '["Fosrenol"]', 'Quelante de fósforo', 'No cálcico',
 '["Hiperfosfatemia en ERC G4/G5"]', '750→3000 mg/día con comidas (masticar)', 'Con cada comida',
 'amarillo','amarillo','amarillo','verde','verde','verde','verde','verde',
 'G4/G5/HD/DP: fármaco de primera línea. Masticar comprimidos. Sin absorción sistémica significativa.'),

('Paricalcitol', '["Zemplar"]', 'Hormona', 'Análogo vitamina D activa',
 '["Hiperparatiroidismo secundario G4/G5"]', '0.04→0.1 mcg/kg 3×/sem (IV) | 1-2 mcg/día (oral)', 'Según PTH',
 'amarillo','amarillo','amarillo','verde','verde','verde','verde','verde',
 'Indicado en G4/G5/HD. Superior a calcitriol en selectividad PTH con menor hipercalcemia.'),

('Cinacalcet', '["Sensipar"]', 'Calcimimético', 'Modulador receptor Ca',
 '["Hiperparatiroidismo secundario HD"]', '30→180 mg/día', 'Con comida',
 'amarillo','amarillo','amarillo','amarillo','verde','verde','verde','verde',
 'Indicación principal en HD. G4/G5 predialítico: usar con precaución. Puede causar hipocalcemia.'),

('Alendronato', '["Fosamax"]', 'Antiosteoporótico', 'Bisfosfonato',
 '["Osteoporosis","Prevención fractura"]', '70 mg/sem (oral) | 70 mg/mes (IV)', 'Semanal',
 'verde','verde','verde','rojo','rojo','rojo','rojo','rojo',
 'G3b+: CONTRAINDICADO. Acumulación ósea permanente, empeora enfermedad ósea renal. Usar denosumab en ERC.'),

('Denosumab', '["Prolia","Xgeva"]', 'Antiosteoporótico', 'Anti-RANKL',
 '["Osteoporosis","Hipercalcemia maligna"]', '60 mg SC c/6 meses', 'Semestral',
 'verde','verde','verde','verde','verde','amarillo','amarillo','amarillo',
 'Usable en ERC y dialísis. G4/G5/HD: monitorear Ca estrictamente; riesgo hipocalcemia grave. Requiere Ca+VitD.'),

-- ══════════════════════════════════════════════════════════
-- CARDIOPROTECCIÓN / ANTICOAGULANTES
-- ══════════════════════════════════════════════════════════

('Aspirina (AAS)', '["Aspirin","Ecotrin"]', 'Antiagregante', 'Inhibidor COX',
 '["Prevención CV secundaria","SCA"]', '75→325 mg/día', 'Diario con comida',
 'verde','verde','verde','verde','amarillo','amarillo','amarillo','amarillo',
 'G4/G5/HD: precaución por sangrado GI aumentado y disfunción plaquetaria urémica.'),

('Clopidogrel', '["Plavix"]', 'Antiagregante', 'Inhibidor P2Y12',
 '["SCA","Stent","ACV isquémico"]', '75 mg/día', 'Diario',
 'verde','verde','verde','verde','verde','verde','verde','verde',
 'Sin ajuste renal. Metabolismo hepático (CYP2C19). Riesgo hemorrágico en ERC avanzada.'),

('Rivaroxabán', '["Xarelto"]', 'Anticoagulante', 'Anti-Xa oral',
 '["FA no valvular","TVP/TEP","Prevención CV"]', '20 mg/día FA | 15 mg c/12h fase aguda', 'Con cena',
 'verde','verde','verde','amarillo','rojo','rojo','rojo','rojo',
 'FA: G3b reducir a 15 mg/día. G4 (<30): contraindicado. No usar en HD. Ajuste por peso e indicación.'),

('Apixabán', '["Eliquis"]', 'Anticoagulante', 'Anti-Xa oral',
 '["FA no valvular","TVP/TEP"]', '5 mg c/12h | 2.5 mg c/12h si criterios reducción', 'Dos veces al día',
 'verde','verde','verde','amarillo','amarillo','amarillo','amarillo','amarillo',
 'FA: reducir a 2.5 mg c/12h si ≥2 de: ≥80 años, ≤60 kg, creat ≥1.5. HD: datos emergentes; dosis 2.5 mg c/12h.'),

('Warfarina', '["Coumadin","Jantoven"]', 'Anticoagulante', 'Antagonista vitamina K',
 '["FA con valvulopatía","Válvulas mecánicas","TVP/TEP"]', 'Individualizado por INR', 'Diario (misma hora)',
 'verde','verde','verde','amarillo','amarillo','amarillo','amarillo','amarillo',
 'ERC: mayor sensibilidad; INR lábil. G4/HD: riesgo hemorrágico elevado, monitoreo frecuente. Calcificación vascular.'),

-- ══════════════════════════════════════════════════════════
-- ANEMIA / ERITROPOYESIS
-- ══════════════════════════════════════════════════════════

('Eritropoyetina alfa (EPO)', '["Epogen","Procrit"]', 'Estimulante eritropoyesis', 'AEE',
 '["Anemia ERC","Anemia diálisis"]', '50-300 UI/kg 3×/sem (SQ/IV)', 'Tres veces por semana',
 'amarillo','amarillo','amarillo','verde','verde','verde','verde','verde',
 'Indicación principal G4/G5/HD. Mantener Hb 10-11.5 g/dL. Controlar HTA; riesgo trombosis.'),

('Darbepoetina alfa', '["Aranesp"]', 'Estimulante eritropoyesis', 'AEE larga duración',
 '["Anemia ERC","Anemia diálisis"]', '0.45 mcg/kg c/1-4 sem (SQ/IV)', 'Semanal o quincenal',
 'amarillo','amarillo','amarillo','verde','verde','verde','verde','verde',
 'Similar a EPO-alfa con vida media más larga. Mismas indicaciones y precauciones.'),

-- ══════════════════════════════════════════════════════════
-- TIROIDES
-- ══════════════════════════════════════════════════════════

('Metimazol', '["Tapazole","Methimazole"]', 'Antitiroideos', 'Inhibidor síntesis T4/T3',
 '["Hipertiroidismo","Enfermedad de Graves"]', '5→30 mg/día', 'Una o dos veces al día',
 'verde','verde','verde','verde','amarillo','amarillo','amarillo','amarillo',
 'G4/G5: precaución; reduce aclaramiento. Monitoreo TSH, T4L, función hepática.'),

-- ══════════════════════════════════════════════════════════
-- OTROS METABÓLICOS
-- ══════════════════════════════════════════════════════════

('Colesevelam', '["Welchol"]', 'Hipolipemiante', 'Secuestrante ácidos biliares',
 '["Dislipidemia","DM2 (colesterol y glucemia)"]', '3.75 g/día (6 cápsulas)', 'Con comidas',
 'verde','verde','verde','verde','verde','verde','verde','verde',
 'Sin absorción sistémica. Sin ajuste renal. No interfiere con otros fármacos si se toma con 4h diferencia.'),

('Evolocumab', '["Repatha"]', 'Hipolipemiante', 'Anti-PCSK9',
 '["Hipercolesterolemia familiar","Alto riesgo CV"]', '140 mg c/2sem (SQ) | 420 mg/mes (SQ)', 'Quincenal o Mensual',
 'verde','verde','verde','verde','verde','amarillo','amarillo','amarillo',
 'Sin ajuste formal pero datos limitados en G5/HD. Alta eficacia reductora de LDL (50-70%).'),

('Alirocumab', '["Praluent"]', 'Hipolipemiante', 'Anti-PCSK9',
 '["Hipercolesterolemia familiar","Alto riesgo CV"]', '75→150 mg c/2sem (SQ)', 'Quincenal',
 'verde','verde','verde','verde','verde','amarillo','amarillo','amarillo',
 'Similar a evolocumab. Datos limitados en G5/HD.'),

('Sildenafil', '["Viagra","Revatio"]', 'Vasodilatador', 'Inhibidor PDE5',
 '["Disfunción eréctil","Hipertensión pulmonar"]', '25→100 mg pre-actividad (DE) | 20 mg c/8h (HP)', 'Según indicación',
 'verde','verde','verde','amarillo','rojo','rojo','rojo','rojo',
 'G3b: iniciar con 25 mg. G4+: contraindicado por acumulación. Evitar con nitratos.'),

('Metoclopramida', '["Reglan","Primperan"]', 'Procinético', 'Antagonista D2',
 '["Gastroparesia diabética","Náuseas","GERD"]', '10 mg c/8h antes de comidas', 'Tres veces al día',
 'verde','verde','verde','amarillo','rojo','rojo','rojo','rojo',
 'G3b: 75% dosis. G4+: CONTRAINDICADO. Acumulación; riesgo síntomas extrapiramidales graves.'),

('Domperidona', '["Motilium"]', 'Procinético', 'Antagonista D2 periférico',
 '["Gastroparesia","Náuseas crónicas"]', '10 mg c/8h antes comidas', 'Tres veces al día',
 'verde','verde','verde','amarillo','amarillo','amarillo','amarillo','amarillo',
 'G3b/G4: 10 mg c/12h (reducir frecuencia). G5/HD: 10 mg c/24h; no superar. Menor efecto SNC que metoclopramida.'),

('Acetilcisteína (NAC)', '["Mucomyst","Acetadote"]', 'Nefroprotector', 'Antioxidante',
 '["Prevención nefropatía por contraste","Hepatotoxicidad"]', '600 mg c/12h VO | 150 mg/kg IV', 'Según protocolo',
 'verde','verde','verde','verde','verde','verde','verde','verde',
 'Sin ajuste renal. Nefroprotector en procedimientos con contraste. Uso profiláctico establecido.'),

('Bicarbonato de sodio oral', '["Sodium Bicarbonate"]', 'Nefroprotector', 'Alcalinizante',
 '["Acidosis metabólica ERC","Nefrolitiasis úrica"]', '0.5→2 g c/8h según niveles HCO3-', 'Tres veces al día',
 'amarillo','amarillo','amarillo','verde','verde','verde','verde','verde',
 'Indicado en G3+. Meta: bicarbonato 22-26 mEq/L. Vigilar carga de Na+ en HTA.'),

('Ivermectina', '["Stromectol"]', 'Antiparasitario', 'Antiparasitario macrocíclico',
 '["SIBO (sobrecrecimiento protozoario)","Estrongiloidiasis"]', '200 mcg/kg dosis única', 'Dosis única',
 'verde','verde','verde','verde','amarillo','amarillo','amarillo','amarillo',
 'G4/HD: usar con precaución; datos limitados. En general bien tolerada por excreción fecal.'),

('Loperamida', '["Imodium"]', 'Antidiarreico', 'Agonista μ-opioide intestinal',
 '["Diarrea aguda","SII diarrea","Diarrea post-EII"]', '4 mg inicial → 2 mg post-deposición (máx 16 mg/día)', 'Según necesidad',
 'verde','verde','verde','verde','verde','verde','verde','verde',
 'Sin ajuste renal. Acción local. No absorción sistémica significativa.'),

('Colestiramina', '["Questran"]', 'Secuestrante', 'Resina de intercambio aniónico',
 '["Diarrea por ácidos biliares post-EII","Hipercolesterolemia","Prurito colestásico"]', '4 g c/6-8h', 'Con comidas y agua',
 'verde','verde','verde','verde','verde','verde','verde','verde',
 'Sin ajuste renal. Tomar con 2-4h diferencia de otros medicamentos; reduce absorción.'),

('Naltrexona baja dosis (LDN)', '["LDN 1.5-4.5 mg"]', 'Inmunomodulador', 'Antagonista opioide microdosis',
 '["EII","Fibromialgia","Fatiga crónica (uso off-label)"]', '1.5→4.5 mg/día (noche)', 'Diario nocturno',
 'verde','verde','verde','amarillo','rojo','rojo','rojo','rojo',
 'Off-label. G3b: monitorizar. G4+: contraindicado. Datos emergentes en EII y dolor crónico.'),

-- ══════════════════════════════════════════════════════════
-- HIPOGLUCEMIANTES ADICIONALES
-- ══════════════════════════════════════════════════════════

('Glipizida', '["Glucotrol"]', 'Antidiabético', 'Sulfonilurea',
 '["DM2"]', '2.5→20 mg/día', 'Diario o dividido',
 'verde','verde','verde','amarillo','amarillo','rojo','rojo','rojo',
 'G3b: dosis baja, monitorizar. G4: contraindicado salvo glipizida de acción corta; mejor que glibenclamida. G5/HD: evitar.'),

('Gliclazida MR', '["Diamicron MR"]', 'Antidiabético', 'Sulfonilurea',
 '["DM2"]', '30→120 mg/día (MR)', 'Diario con desayuno',
 'verde','verde','verde','amarillo','amarillo','rojo','rojo','rojo',
 'La más segura de las sulfonilureas en ERC. G3b: dosis baja con vigilancia. G4+: contraindicada.'),

('Jardiance (Empagliflozina) + Metformina', '["Synjardy"]', 'Antidiabético', 'Combinación iSGLT2+Biguanida',
 '["DM2"]', 'Según componentes individuales', 'Dos veces al día',
 'verde','verde','verde','rojo','rojo','rojo','rojo','rojo',
 'Contraindicado si eGFR <45 por componente metformina. Preferir administrar componentes por separado en ERC.'),

('Albiglutida', '["Tanzeum"]', 'Antidiabético', 'GLP-1 RA',
 '["DM2"]', '30→50 mg/sem (SQ)', 'Semanal',
 'verde','verde','verde','verde','amarillo','rojo','rojo','rojo',
 'G4: precaución; datos limitados. Descontinuado en algunos países, verificar disponibilidad.'),

-- ══════════════════════════════════════════════════════════
-- ANALGÉSICOS / DOLOR CRÓNICO
-- ══════════════════════════════════════════════════════════

('Tramadol', '["Ultram","ConZip"]', 'Analgésico', 'Opioide débil',
 '["Dolor moderado-severo"]', '50→100 mg c/6-8h', 'Cada 6-8 horas',
 'verde','verde','verde','amarillo','rojo','rojo','rojo','rojo',
 'G3b: c/12h, dosis máx 200 mg/día. G4+: CONTRAINDICADO. Convulsiones y síndrome serotoninérgico con ERC.'),

('Gabapentina', '["Neurontin"]', 'Analgésico', 'Análogo GABA',
 '["Dolor neuropático","Uremia pruriginosa","Inquietud piernas"]', '300→1800 mg/día dividido', 'Tres veces al día',
 'verde','verde','amarillo','amarillo','rojo','rojo','rojo','rojo',
 'G3a: 600-900 mg/día. G3b: 300-600 mg/día. G4/G5: 300 mg/día. HD: 100-300 mg post-HD. Sedación extrema si no se ajusta.'),

('Pregabalina', '["Lyrica"]', 'Analgésico', 'Análogo GABA',
 '["Dolor neuropático","Fibromialgia","Ansiedad"]', '75→300 mg c/12h', 'Dos veces al día',
 'verde','verde','amarillo','amarillo','rojo','rojo','rojo','rojo',
 'G3a: 75 mg c/12h. G3b: 75 mg/día. G4: 25-75 mg/día. HD: 25 mg post-HD. Similar a gabapentina.'),

('Paracetamol/Acetaminofén', '["Tylenol","Panadol"]', 'Analgésico', 'Analgésico no opioide',
 '["Dolor leve-moderado","Fiebre"]', '500→1000 mg c/6-8h (máx 3-4 g/día)', 'Cada 6-8 horas',
 'verde','verde','verde','verde','amarillo','amarillo','amarillo','amarillo',
 'G4/G5: reducir dosis y frecuencia; c/8-12h. HD: suplementar post-diálisis. PRIMERA elección en ERC para dolor.'),

('Ibuprofeno', '["Advil","Motrin"]', 'AINE', 'Inhibidor COX no selectivo',
 '["Dolor","Inflamación","Fiebre"]', '400→800 mg c/6-8h', 'Con comida',
 'verde','verde','amarillo','rojo','rojo','rojo','rojo','rojo',
 'G3a: usar mínimo y transitorio. G3b+: CONTRAINDICADO. Vasoconstricción aferente, retención Na+, deterioro agudo ERC.'),

-- ══════════════════════════════════════════════════════════
-- PSIQUIÁTRICOS / SALUD MENTAL (relevantes en obesidad)
-- ══════════════════════════════════════════════════════════

('Sertralina', '["Zoloft"]', 'Psiquiátrico', 'ISRS',
 '["Depresión","Ansiedad","Trastorno conducta alimentaria"]', '25→200 mg/día', 'Diario (mañana)',
 'verde','verde','verde','verde','amarillo','amarillo','amarillo','amarillo',
 'G4/HD: monitorear; metabolismo hepático pero precaución por alteración proteínas.'),

('Escitalopram', '["Lexapro"]', 'Psiquiátrico', 'ISRS',
 '["Depresión","Ansiedad generalizada"]', '5→20 mg/día', 'Diario',
 'verde','verde','verde','verde','amarillo','amarillo','amarillo','amarillo',
 'G4/G5: máx 10 mg/día. Monitorear QT. HD: metabolismo hepático mayoritario.'),

('Fluoxetina', '["Prozac"]', 'Psiquiátrico', 'ISRS',
 '["Depresión","Bulimia nerviosa","TOC"]', '10→80 mg/día', 'Diario (mañana)',
 'verde','verde','verde','verde','amarillo','amarillo','amarillo','amarillo',
 'G4: reducir frecuencia; vida media muy larga (semanas). Metabolismo hepático.'),

('Quetiapina', '["Seroquel"]', 'Psiquiátrico', 'Antipsicótico atípico',
 '["Esquizofrenia","TAB","Depresión refractaria (adjunto)"]', '25→800 mg/día', 'Noche o dividido',
 'verde','verde','verde','verde','amarillo','amarillo','amarillo','amarillo',
 'G4/HD: inicio con dosis mínima. Sedación y ganancia ponderal. Vigilar glucemia.'),

('Topiramato (para migraña/epilepsia)', '["Topamax"]', 'Neurológico', 'Anticonvulsivante',
 '["Migraña profilaxis","Epilepsia"]', '25→200 mg/día dividido', 'Dos veces al día',
 'verde','verde','amarillo','rojo','rojo','rojo','rojo','rojo',
 'Ver fentermina/topiramato. G3b+: contraindicado por acidosis y nefrolitiasis.');
