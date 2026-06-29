/* ============================================================
   CONSULT PRO — AI Service Layer
   Anthropic Claude + OpenAI GPT
   Uso clínico: sugerencias, interpretación, dietas, fármacos
   ============================================================ */

const AI_CONFIG = {
  anthropic: {
    apiKey: window.ANTHROPIC_API_KEY || '',
    model:  'claude-sonnet-4-6',
    url:    'https://api.anthropic.com/v1/messages'
  },
  openai: {
    apiKey: window.OPENAI_API_KEY || '',
    model:  'gpt-4o',
    url:    'https://api.openai.com/v1/chat/completions'
  }
};

// ── CONTEXTO CLÍNICO BASE ─────────────────────────────────────
function buildClinicalContext(paciente, visita) {
  const v = visita || {};
  const p = paciente || {};
  const comp = v.composicion || {};
  const anal = v.analiticas || {};
  const req  = v.requerimientos || {};
  return `
Paciente: ${p.nombre || 'Sin nombre'}, ${p.edad || '?'} años, sexo: ${p.sexo || '?'}
Diagnóstico: ${p.diagnostico || 'No especificado'}
Institución: ${p.institucion || ''}
Peso: ${comp.peso || '?'} kg | Talla: ${comp.talla || '?'} m | IMC: ${comp.imc || '?'} kg/m²
Masa grasa: ${comp.grasa || '?'} kg (${comp.porc_grasa || '?'}%) | Masa muscular: ${comp.musculo || '?'} kg
Grasa visceral: ${comp.grasa_visceral || '?'} | Ángulo de fase: ${comp.angulo_fase || '?'}
Glucosa: ${anal.glucosa || '?'} mg/dL | HbA1c: ${anal.hba1c || '?'}% | Colesterol: ${anal.colesterol || '?'}
LDL: ${anal.ldl || '?'} | HDL: ${anal.hdl || '?'} | TG: ${anal.trigliceridos || '?'}
Creatinina: ${anal.creatinina || '?'} | eGFR: ${anal.egfr || '?'}
Requerimientos: ${req.kcal || '?'} kcal | ${req.proteina || '?'} g proteína | ${req.agua || '?'} ml agua
`.trim();
}

// ── ANTHROPIC CLAUDE ──────────────────────────────────────────
async function callClaude(systemPrompt, userMessage) {
  if (!AI_CONFIG.anthropic.apiKey) {
    throw new Error('Anthropic API Key no configurada. Vaya a Configuración → IA.');
  }
  const res = await fetch(AI_CONFIG.anthropic.url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': AI_CONFIG.anthropic.apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true'
    },
    body: JSON.stringify({
      model: AI_CONFIG.anthropic.model,
      max_tokens: 1024,
      system: systemPrompt,
      messages: [{ role: 'user', content: userMessage }]
    })
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || `Error Anthropic: ${res.status}`);
  }
  const data = await res.json();
  return data.content[0].text;
}

// ── OPENAI GPT ────────────────────────────────────────────────
async function callOpenAI(systemPrompt, userMessage) {
  if (!AI_CONFIG.openai.apiKey) {
    throw new Error('OpenAI API Key no configurada. Vaya a Configuración → IA.');
  }
  const res = await fetch(AI_CONFIG.openai.url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${AI_CONFIG.openai.apiKey}`
    },
    body: JSON.stringify({
      model: AI_CONFIG.openai.model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user',   content: userMessage  }
      ],
      max_tokens: 1024,
      temperature: 0.3
    })
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || `Error OpenAI: ${res.status}`);
  }
  const data = await res.json();
  return data.choices[0].message.content;
}

// ── SISTEMA CLÍNICO BASE ──────────────────────────────────────
const SYSTEM_CLINICO = `Eres un asistente clínico de nutrición de la Dra. Anayanet Jáquez, Nutrióloga Clínica Especializada en República Dominicana.
Responde siempre en español, de forma concisa y estructurada.
Usa guías clínicas actualizadas: ADA 2026, EASD, AACE, TOS, ACC/AHA.
Incluye siempre: fundamento clínico, dosis/cantidades específicas, advertencias relevantes.
Nunca reemplazas el juicio clínico de la médica — eres apoyo a la decisión.
Formato: usa viñetas breves y claras. Máximo 300 palabras.`;

// ══════════════════════════════════════════════════════════════
//  FUNCIONES CLÍNICAS PRINCIPALES
// ══════════════════════════════════════════════════════════════

// 1. SUGERIR PLAN DIETÉTICO
window.aiSugerirPlan = async function(paciente, visita) {
  const ctx = buildClinicalContext(paciente, visita);
  const req = visita?.requerimientos || {};
  const prompt = `${ctx}
Objetivo calórico: ${req.kcal || '?'} kcal/día | Proteína: ${req.proteina || '?'} g/día

Genera un plan dietético de 1 día completo (desayuno, colación AM, almuerzo, colación PM, cena) con:
- Alimentos típicos dominicanos cuando aplique
- Porciones en gramos o medidas caseras
- Distribución de macros por tiempo de comida
- 2 opciones de sustitución para el almuerzo`;

  return await callClaude(SYSTEM_CLINICO, prompt);
};

// 2. RECOMENDAR FÁRMACOS
window.aiRecomendarFarmacos = async function(paciente, visita) {
  const ctx = buildClinicalContext(paciente, visita);
  const farmacos = visita?.farmacos || [];
  const farmacoActual = farmacos.map(f => `${f.nombre} ${f.dosis}`).join(', ') || 'Ninguno';

  const prompt = `${ctx}
Fármacos actuales: ${farmacoActual}

Basándote en el perfil clínico y las guías ADA 2026 / TOS 2023:
1. Evalúa la farmacoterapia actual
2. Sugiere ajustes o adiciones justificadas
3. Identifica interacciones o contraindicaciones relevantes
4. Propone metas de HbA1c, peso y composición corporal`;

  return await callClaude(SYSTEM_CLINICO, prompt);
};

// 3. INTERPRETAR ANALÍTICAS
window.aiInterpretarAnaliticas = async function(paciente, visita) {
  const ctx = buildClinicalContext(paciente, visita);
  const anal = visita?.analiticas || {};

  const prompt = `${ctx}

Interpreta el perfil bioquímico completo:
- Señala valores fuera de rango con su significado clínico
- Identifica patrones (síndrome metabólico, resistencia insulina, dislipidemia aterogénica)
- Sugiere estudios adicionales si aplica
- Prioriza las intervenciones por impacto clínico`;

  return await callClaude(SYSTEM_CLINICO, prompt);
};

// 4. INTERACCIONES FARMACOLÓGICAS (GPT-4o)
window.aiCheckInteracciones = async function(farmacos) {
  const lista = farmacos.map(f => `${f.nombre} ${f.dosis || ''}`).join('\n');

  const prompt = `Lista de fármacos del paciente:\n${lista}

Analiza TODAS las interacciones clínicamente relevantes entre estos fármacos:
- Gravedad: MAYOR / MODERADA / MENOR
- Mecanismo de interacción
- Consecuencia clínica
- Manejo recomendado
- Si alguna combinación debe evitarse, indicarlo claramente`;

  return await callOpenAI(SYSTEM_CLINICO, prompt);
};

// 5. SUGERIR SUPLEMENTOS
window.aiSugerirSuplementes = async function(paciente, visita) {
  const ctx = buildClinicalContext(paciente, visita);

  const prompt = `${ctx}

Recomienda suplementación basada en evidencia para este perfil:
- Vitamina D, Omega-3, Magnesio, B12, Hierro, Zinc según aplique
- Justificación con nivel de evidencia (A/B/C)
- Dosis, forma farmacéutica y duración
- Indicar cuáles son prioritarios vs opcionales`;

  return await callClaude(SYSTEM_CLINICO, prompt);
};

// 6. GENERAR RECOMENDACIONES POSTCONSULTA
window.aiRecomendacionesPostconsulta = async function(paciente, visita) {
  const ctx = buildClinicalContext(paciente, visita);
  const plan = visita?.plan || {};

  const prompt = `${ctx}
Plan: ${plan.kcal || '?'} kcal, ${plan.proteina || '?'}g proteína.

Redacta recomendaciones postconsulta para el paciente (tono amigable, comprensible):
1. Hábitos de alimentación (3 puntos clave)
2. Actividad física recomendada
3. Señales de alarma para consultar urgente
4. Metas para la próxima cita
5. Recordatorio de medicamentos si aplica
Máximo 200 palabras, lenguaje sencillo.`;

  return await callClaude(SYSTEM_CLINICO, prompt);
};

// 7. ALGORITMO OBESIDAD / GLP-1
window.aiAlgoritmoObesidad = async function(paciente, visita) {
  const ctx = buildClinicalContext(paciente, visita);

  const prompt = `${ctx}

Aplica el algoritmo de manejo de obesidad según TOS 2023 y guías POWER 2026:
1. Estadio de obesidad y comorbilidades relevantes
2. ¿Candidato a farmacoterapia? ¿Cuál molécula es de primera elección y por qué?
3. ¿Candidato a cirugía metabólica? Criterios
4. Meta de pérdida de peso realista a 3, 6 y 12 meses
5. Calidad de pérdida de peso esperada (MG vs MM)`;

  return await callClaude(SYSTEM_CLINICO, prompt);
};

// 8. ALGORITMO DIABETES (ADA 2026)
window.aiAlgoritmodiabetes = async function(paciente, visita) {
  const ctx = buildClinicalContext(paciente, visita);
  const dm = visita?.diabetes || {};

  const prompt = `${ctx}
Tipo DM: ${dm.tipo || '?'} | Meta HbA1c: ${dm.meta_hba1c || '?'}%
Complicaciones: ${dm.complicaciones || 'No registradas'}

Aplica el algoritmo ADA 2026:
1. Meta de HbA1c individualizada con justificación
2. Secuencia de fármacos recomendada con énfasis cardio-renal-metabólico
3. ¿Candidato a inhibidor SGLT2 o GLP-1 por beneficio CV/renal?
4. Monitoreo glucémico: frecuencia y metas
5. ¿Criterios de remisión de DM2?`;

  return await callClaude(SYSTEM_CLINICO, prompt);
};

// 9. NOTA CLÍNICA AUTOMÁTICA
window.aiGenerarNotaClinica = async function(paciente, visita) {
  const ctx = buildClinicalContext(paciente, visita);
  const plan = visita?.plan || {};

  const prompt = `${ctx}
Plan: ${plan.menu || ''} | Recomendaciones: ${plan.recomendaciones || ''}

Redacta una nota clínica nutricional profesional con:
S: Motivo de consulta y subjetivo
O: Datos objetivos (anthropometría, composición, labs)
A: Diagnóstico nutricional (formato ADIME/PES)
P: Plan nutricional y farmacológico
Próxima cita: sugerir tiempo según evolución`;

  return await callClaude(SYSTEM_CLINICO, prompt);
};

// ══════════════════════════════════════════════════════════════
//  UI HELPERS — Modal de respuesta AI
// ══════════════════════════════════════════════════════════════

window.showAIModal = function(titulo, contenido) {
  let modal = document.getElementById('ai-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'ai-modal';
    modal.style.cssText = `position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px`;
    modal.innerHTML = `
      <div style="background:#fff;border-radius:20px;max-width:700px;width:100%;max-height:85vh;overflow:auto;padding:28px;box-shadow:0 20px 60px rgba(0,0,0,.3)">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
          <h3 id="ai-modal-title" style="margin:0;color:#1a2a4a;font-size:18px"></h3>
          <button onclick="document.getElementById('ai-modal').remove()" style="border:0;background:#f2f4f7;border-radius:10px;padding:6px 12px;cursor:pointer;font-weight:700">✕</button>
        </div>
        <div id="ai-modal-body" style="font-size:14px;line-height:1.7;color:#1c2833;white-space:pre-wrap"></div>
        <div style="margin-top:16px;display:flex;gap:8px">
          <button onclick="navigator.clipboard.writeText(document.getElementById('ai-modal-body').textContent).then(()=>toast('Copiado ✓'))" style="border:1px solid #dbe7e4;background:#fff;border-radius:12px;padding:8px 14px;cursor:pointer;font-weight:700">📋 Copiar</button>
          <button onclick="document.getElementById('ai-modal').remove()" style="border:0;background:#0f766e;color:#fff;border-radius:12px;padding:8px 14px;cursor:pointer;font-weight:700">Cerrar</button>
        </div>
      </div>`;
    document.body.appendChild(modal);
  }
  document.getElementById('ai-modal-title').textContent = titulo;
  document.getElementById('ai-modal-body').textContent = contenido;
};

window.runAI = async function(fnName, titulo, paciente, visita) {
  const btn = event?.target;
  if (btn) { btn.disabled = true; btn.textContent = '⏳ Generando...'; }
  try {
    const fn = window[fnName];
    if (!fn) throw new Error('Función AI no encontrada');
    const result = await fn(paciente, visita);
    showAIModal(titulo, result);
  } catch(e) {
    toast(e.message || 'Error al conectar con IA', 'err');
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = btn.getAttribute('data-label') || 'IA'; }
  }
};

// ══════════════════════════════════════════════════════════════
//  CONFIGURACIÓN DE API KEYS (se guarda en Firestore)
// ══════════════════════════════════════════════════════════════

window.abrirConfigAI = async function() {
  const stored = JSON.parse(localStorage.getItem('cp_ai_config') || '{}');
  const modal = document.createElement('div');
  modal.style.cssText = `position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px`;
  modal.innerHTML = `
    <div style="background:#fff;border-radius:20px;max-width:500px;width:100%;padding:28px">
      <h3 style="margin:0 0 20px;color:#1a2a4a">🤖 Configuración de IA</h3>
      <p style="font-size:12px;color:#667085;margin-bottom:16px">Las API Keys se guardan localmente en este dispositivo.</p>
      <div style="display:grid;gap:12px">
        <div>
          <label style="font-size:12px;font-weight:700;color:#475467;display:block;margin-bottom:4px">Anthropic API Key (Claude)</label>
          <input id="cfg-anthropic" type="password" value="${stored.anthropic||''}" placeholder="sk-ant-..." style="width:100%;border:1px solid #dbe7e4;border-radius:12px;padding:10px;font:inherit">
        </div>
        <div>
          <label style="font-size:12px;font-weight:700;color:#475467;display:block;margin-bottom:4px">OpenAI API Key (GPT-4o)</label>
          <input id="cfg-openai" type="password" value="${stored.openai||''}" placeholder="sk-..." style="width:100%;border:1px solid #dbe7e4;border-radius:12px;padding:10px;font:inherit">
        </div>
      </div>
      <div style="display:flex;gap:8px;margin-top:20px">
        <button onclick="guardarConfigAI()" style="flex:1;border:0;background:#0f766e;color:#fff;border-radius:12px;padding:11px;cursor:pointer;font-weight:700">Guardar</button>
        <button onclick="this.closest('[style]').remove()" style="border:1px solid #dbe7e4;background:#fff;border-radius:12px;padding:11px 16px;cursor:pointer">Cancelar</button>
      </div>
    </div>`;
  document.body.appendChild(modal);
};

window.guardarConfigAI = function() {
  const anthropic = document.getElementById('cfg-anthropic')?.value?.trim();
  const openai    = document.getElementById('cfg-openai')?.value?.trim();
  localStorage.setItem('cp_ai_config', JSON.stringify({ anthropic, openai }));
  if (anthropic) { AI_CONFIG.anthropic.apiKey = anthropic; window.ANTHROPIC_API_KEY = anthropic; }
  if (openai)    { AI_CONFIG.openai.apiKey = openai;       window.OPENAI_API_KEY = openai; }
  document.querySelector('[style*="inset:0"]')?.remove();
  toast('API Keys guardadas ✓');
};

// ── Cargar keys al iniciar ────────────────────────────────────
(function loadAIKeys() {
  try {
    const stored = JSON.parse(localStorage.getItem('cp_ai_config') || '{}');
    if (stored.anthropic) { AI_CONFIG.anthropic.apiKey = stored.anthropic; window.ANTHROPIC_API_KEY = stored.anthropic; }
    if (stored.openai)    { AI_CONFIG.openai.apiKey = stored.openai;       window.OPENAI_API_KEY = stored.openai; }
  } catch(e) {}
})();

console.log('✅ Consult Pro AI Service cargado — Claude + GPT-4o');
