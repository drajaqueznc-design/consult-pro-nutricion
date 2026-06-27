/* ============================================================
   PLATAFORMA NUTRICIONAL — Dra. Anayanet Jáquez
   JavaScript principal
   ============================================================ */

const API = `${window.CONSULT_PRO_BACKEND || window.location.origin}/api`;
const LOGO_B64 = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjYwIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI2MCI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImdvbGRHIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgICBzdG9wLWNvbG9yPSIjZDRhZjM3Ii8+CiAgICAgIDxzdG9wIG9mZnNldD0iNDAlIiAgc3RvcC1jb2xvcj0iI2Y1ZTI3YSIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjcwJSIgIHN0b3AtY29sb3I9IiNjODk1MWEiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjYjg4NjBiIi8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJkcm9wRyIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCUiICBzdG9wLWNvbG9yPSIjMWEyYTRhIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzBkMWIzNSIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CgogIDwhLS0gR09UQSDigJQgYm9yZGUgZG9yYWRvIC0tPgogIDxwYXRoIGQ9Ik0xMDAgOCBDMTAwIDgsIDE2OCA4MCwgMTY4IDEzOCBDMTY4IDE3OCwgMTM4IDIwOCwgMTAwIDIwOCBDNjIgMjA4LCAzMiAxNzgsIDMyIDEzOCBDMzIgODAsIDEwMCA4LCAxMDAgOCBaIgogICAgZmlsbD0idXJsKCNnb2xkRykiIC8+CgogIDwhLS0gR09UQSDigJQgaW50ZXJpb3IgYXp1bCBtYXJpbm8gLS0+CiAgPHBhdGggZD0iTTEwMCAxOCBDMTAwIDE4LCAxNTggODQsIDE1OCAxMzggQzE1OCAxNzIsIDEzMiAxOTgsIDEwMCAxOTggQzY4IDE5OCwgNDIgMTcyLCA0MiAxMzggQzQyIDg0LCAxMDAgMTgsIDEwMCAxOCBaIgogICAgZmlsbD0idXJsKCNkcm9wRykiIC8+CgogIDwhLS0gRklHVVJBIOKAlCBwZXJzb25hIGVzdGlsaXphZGEgKGRvcmFkYSkgLS0+CiAgPCEtLSBjYWJlemEgLS0+CiAgPGNpcmNsZSBjeD0iMTA4IiBjeT0iNjgiIHI9IjEwIiBmaWxsPSJ1cmwoI2dvbGRHKSIvPgogIDwhLS0gY3VlcnBvIGRpYWdvbmFsICsgYnJhem9zID0gZm9ybWEgZGUgWCBlc3RpbGl6YWRhIC0tPgogIDwhLS0gdHJvbmNvIC0tPgogIDxsaW5lIHgxPSIxMDgiIHkxPSI3OCIgeDI9IjkwIiB5Mj0iMTc1IiBzdHJva2U9InVybCgjZ29sZEcpIiBzdHJva2Utd2lkdGg9IjciIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDwhLS0gYnJhem8gaXpxdWllcmRvIChzdWJlIGEgbGEgZGVyZWNoYSkgLS0+CiAgPGxpbmUgeDE9Ijc1IiAgeTE9IjEwNSIgeDI9IjEzMCIgeTI9IjEzMCIgc3Ryb2tlPSJ1cmwoI2dvbGRHKSIgc3Ryb2tlLXdpZHRoPSI3IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8IS0tIHBpZXJuYSBkZXJlY2hhIC0tPgogIDxsaW5lIHgxPSI5MCIgIHkxPSIxNzUiIHgyPSIxMjAiIHkyPSIxOTUiIHN0cm9rZT0idXJsKCNnb2xkRykiIHN0cm9rZS13aWR0aD0iNiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CgogIDwhLS0gVEVYVE86IERSQS4gQU5BWUFORVQgSsOBUVVFWiAtLT4KICA8dGV4dCB4PSIxMDAiIHk9IjIzMiIKICAgIGZvbnQtZmFtaWx5PSInR2VvcmdpYScsICdUaW1lcyBOZXcgUm9tYW4nLCBzZXJpZiIKICAgIGZvbnQtc2l6ZT0iMTMuNSIKICAgIGZvbnQtd2VpZ2h0PSI3MDAiCiAgICBsZXR0ZXItc3BhY2luZz0iMi41IgogICAgZmlsbD0iIzFhMmE0YSIKICAgIHRleHQtYW5jaG9yPSJtaWRkbGUiCiAgICBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5EUkEuIEFOQVlBTkVUIErDgVFVRVo8L3RleHQ+CgogIDwhLS0gVEVYVE86IE5VVFJJw5NMT0dBIENMw41OSUNBIEVTUEVDSUFMSVpBREEgLS0+CiAgPHRleHQgeD0iMTAwIiB5PSIyNTAiCiAgICBmb250LWZhbWlseT0iJ0dlb3JnaWEnLCAnVGltZXMgTmV3IFJvbWFuJywgc2VyaWYiCiAgICBmb250LXNpemU9IjguNSIKICAgIGZvbnQtd2VpZ2h0PSI0MDAiCiAgICBsZXR0ZXItc3BhY2luZz0iMiIKICAgIGZpbGw9IiM1YTcyOTgiCiAgICB0ZXh0LWFuY2hvcj0ibWlkZGxlIgogICAgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSI+TlVUUknDk0xPR0EgQ0zDjU5JQ0EgRVNQRUNJQUxJWkFEQTwvdGV4dD4KPC9zdmc+Cg==';
const INST = {
  nombre:   'Dra. Anayanet Jáquez',
  titulo:   'Nutrióloga Clínica Especializada',
  registro: 'Reg. Prof. _______________',
  um:       'Unión Médica del Norte',
  mat:      'Clínica Materno',
  priv:     'Consulta Privada',
  tel:      '(809) ___-____',
  email:    'drajaqueznc@gmail.com',
};


// ── STATE ────────────────────────────────────────────────────
const State = {
  pacientes: [],
  currentPaciente: null,
  currentVisita: null,
  activeFilter: 'todos',
  activeView: 'pacientes',
  charts: {}
};

// ── API HELPERS ───────────────────────────────────────────────
async function api(path, method = 'GET', body = null) {
  const opts = {
    method,
    headers: { 'Content-Type': 'application/json' }
  };
  if (body) opts.body = JSON.stringify(body);
  try {
    const r = await fetch(API + path, opts);
    const j = await r.json();
    if (j.status === 'error') throw new Error(j.msg);
    return j.data;
  } catch (e) {
    toast(e.message || 'Error de conexión', 'err');
    throw e;
  }
}

// ── TOAST ────────────────────────────────────────────────────
function toast(msg, type = 'ok') {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.className = `show ${type}`;
  setTimeout(() => el.className = '', 2800);
}

// ── MODE TOGGLE: Ambulatorio / Hospitalizado ──────────────────
function setMode(mode) {
  const isHosp = mode === 'hospitalizado';

  // botones header
  document.getElementById('modeAmb').classList.toggle('active', !isHosp);
  document.getElementById('modeHosp').classList.toggle('active', isHosp);

  // acciones header
  document.getElementById('headerActionsAmb').style.display  = isHosp ? 'none' : 'flex';
  document.getElementById('headerActionsHosp').style.display = isHosp ? 'flex' : 'none';

  // layout principal
  document.getElementById('layout').style.display = isHosp ? 'none' : 'flex';

  // panel hospitalizado
  const panel = document.getElementById('panel-hosp');
  panel.style.display = isHosp ? 'block' : 'none';

  if (isHosp) {
    const iframe = document.getElementById('nutricare-iframe');
    // Cargar solo la primera vez
    if (!iframe.src || iframe.src === window.location.href) {
      iframe.src = 'https://nutricare-pro-bf389.web.app';
    }
    // Detectar si el iframe fue bloqueado (X-Frame-Options)
    iframe.onerror = () => {
      document.getElementById('iframe-fallback').style.display = 'flex';
      iframe.style.display = 'none';
    };
    // Timeout fallback: si en 6s no cargó, mostrar botón
    if (!iframe._timer) {
      iframe._timer = setTimeout(() => {
        try {
          // Si no hay contenido accesible → bloqueado por CSP
          const doc = iframe.contentDocument;
          if (!doc || !doc.body || doc.body.innerHTML === '') {
            document.getElementById('iframe-fallback').style.display = 'flex';
            iframe.style.display = 'none';
          }
        } catch(e) {
          // cross-origin error = el iframe SÍ cargó (CORS normal)
        }
      }, 6000);
    }
  }
}

// ── VIEW SWITCHER ─────────────────────────────────────────────
function showView(name, btn) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  const el = document.getElementById('view-' + name);
  if (el) el.classList.add('active');
  if (btn) btn.classList.add('active');
  State.activeView = name;
  if (name === 'pacientes') loadPacientes();
  if (name === 'estadisticas') loadEstadisticas();
  if (name === 'farmacos') loadCatalogoAdmin();
}

// ── UTILS ─────────────────────────────────────────────────────
function calcAge(dob) {
  if (!dob) return '—';
  const d = new Date(dob), n = new Date();
  return n.getFullYear() - d.getFullYear() -
    ((n < new Date(n.getFullYear(), d.getMonth(), d.getDate())) ? 1 : 0);
}

function fmt(val, unit = '', dec = 1) {
  if (val === null || val === undefined || val === '') return '—';
  return (typeof val === 'number' ? val.toFixed(dec) : val) + (unit ? ' ' + unit : '');
}

function fmtDate(d) {
  if (!d) return '—';
  return new Date(d + 'T00:00:00').toLocaleDateString('es-DO');
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function riskBadge(nivel) {
  if (!nivel) return `<span class="badge badge-no"><span class="badge-dot"></span>—</span>`;
  const cls = nivel === 'alto' ? 'badge-hi' : nivel === 'moderado' ? 'badge-md' : 'badge-lo';
  return `<span class="badge ${cls}"><span class="badge-dot"></span>${nivel.charAt(0).toUpperCase() + nivel.slice(1)}</span>`;
}

function instBadge(inst) {
  const map = { UM: ['badge-um', 'Unión Médica'], MAT: ['badge-mat', 'Materno'], PRIVADA: ['badge-priv', 'Privada'] };
  const [cls, label] = map[inst] || ['badge-no', inst];
  return `<span class="badge ${cls}">${label}</span>`;
}

// ── TABS ─────────────────────────────────────────────────────
function switchTab(containerId, tabId, btn) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
  container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  const pane = document.getElementById(tabId);
  if (pane) pane.classList.add('active');
  if (btn) btn.classList.add('active');
}

// ════════════════════════════════════════════════════════════
// PACIENTES — LISTA
// ════════════════════════════════════════════════════════════

async function loadPacientes() {
  const q = document.getElementById('searchQ')?.value || '';
  const f = State.activeFilter;

  let params = new URLSearchParams();
  if (q) params.set('q', q);
  if (f === 'UM' || f === 'MAT' || f === 'PRIVADA') params.set('institucion', f);
  if (f === 'alto') params.set('riesgo', 'alto');
  if (f === 'sin_calc') params.set('riesgo', 'sin_calc');

  const data = await api('/pacientes?' + params);
  State.pacientes = data || [];
  renderPacientesTable();
  updateStats();
}

function renderPacientesTable() {
  const tbody = document.getElementById('patientBody');
  const empty = document.getElementById('emptyPacientes');
  const data = State.pacientes;

  if (!data.length) {
    tbody.innerHTML = '';
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';

  tbody.innerHTML = data.map(p => `
    <tr onclick="openPaciente(${p.id})">
      <td>
        <div style="font-weight:500">${p.nombre_completo}</div>
        <div style="font-size:11px;color:var(--muted)">${p.cedula || '—'}</div>
      </td>
      <td>${instBadge(p.institucion)}</td>
      <td class="mono">${calcAge(p.fecha_nacimiento) !== '—' ? calcAge(p.fecha_nacimiento) + ' a' : '—'}</td>
      <td class="mono">${fmt(p.imc, 'kg/m²')}</td>
      <td class="mono">${p.pct_grasa ? p.pct_grasa + '%' : '—'}</td>
      <td class="mono">${fmt(p.kg_masa_muscular, 'kg')}</td>
      <td class="mono" style="font-size:12px">${fmtDate(p.ultima_visita)}</td>
      <td>${riskBadge(p.obscore_nivel)}</td>
      <td><button class="btn btn-ghost btn-xs" onclick="event.stopPropagation();openPaciente(${p.id})">Ver →</button></td>
    </tr>
  `).join('');
}

function updateStats() {
  const total = State.pacientes.length;
  const um = State.pacientes.filter(p => p.institucion === 'UM').length;
  const mat = State.pacientes.filter(p => p.institucion === 'MAT').length;
  const priv = State.pacientes.filter(p => p.institucion === 'PRIVADA').length;
  const risk = State.pacientes.filter(p => p.obscore_nivel === 'alto').length;

  document.getElementById('s-total').textContent = total || '—';
  document.getElementById('s-um').textContent = um || '—';
  document.getElementById('s-mat').textContent = mat || '—';
  document.getElementById('s-priv').textContent = priv || '—';
  document.getElementById('s-risk').textContent = risk || '—';
}

function setFilter(f, btn) {
  State.activeFilter = f;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  loadPacientes();
}

// ════════════════════════════════════════════════════════════
// PACIENTE — MODAL COMPLETO
// ════════════════════════════════════════════════════════════

async function openPaciente(id) {
  const overlay = document.getElementById('overlayPaciente');
  overlay.classList.add('open');
  document.getElementById('modalPacienteBody').innerHTML =
    '<div class="loading"><div class="spinner"></div> Cargando expediente…</div>';

  const data = await api(`/pacientes/${id}`);
  State.currentPaciente = data;
  renderPacienteModal(data);
}

function renderPacienteModal(data) {
  const p = data.paciente;
  const ant = data.antecedentes || {};
  const visitas = data.visitas || [];

  document.getElementById('modalPacienteName').textContent =
    `${p.nombre} ${p.apellidos}`;
  document.getElementById('modalPacienteMeta').innerHTML =
    `${calcAge(p.fecha_nacimiento)} años · ${p.sexo === 'F' ? 'Femenino' : 'Masculino'} · ${instBadge(p.institucion)} · Cédula: ${p.cedula || '—'}
    <button onclick="generarPinPaciente(${p.id},'${(p.nombre||'').replace(/'/g,"\\'")}',${!!p.telefono})"
      style="margin-left:12px;background:#25d366;color:#fff;border:none;border-radius:20px;padding:4px 12px;font-size:11px;font-weight:700;cursor:pointer;vertical-align:middle"
      title="${p.telefono ? 'Enviar PIN por WhatsApp al '+p.telefono : 'Sin teléfono registrado'}">
      ${p.pin_acceso ? '🔑 Reenviar PIN WhatsApp' : '📲 Enviar PIN WhatsApp'}
    </button>`;

  document.getElementById('modalPacienteBody').innerHTML = renderExpediente(p, ant, visitas);
  initExpedienteForms(p, ant);
}

function renderExpediente(p, ant, visitas) {
  return `
  <div class="tabs" id="expTabs">
    <button class="tab-btn active" onclick="switchTab('expContent','tab-datos',this)">Datos generales</button>
    <button class="tab-btn" onclick="switchTab('expContent','tab-visitas',this)">Visitas (${visitas.length})</button>
    <button class="tab-btn" onclick="switchTab('expContent','tab-evolucion',this);loadEvolucion(${p.id})">Evolución</button>
  </div>
  <div id="expContent">

    <!-- TAB DATOS GENERALES -->
    <div class="tab-pane active" id="tab-datos">
      <div class="g2" style="gap:14px">
        <!-- Identificación -->
        <div class="card">
          <div class="card-title">Identificación</div>
          <div class="g2">
            <div class="field"><label>Nombre</label><input id="f-nombre" value="${p.nombre||''}"></div>
            <div class="field"><label>Apellidos</label><input id="f-apellidos" value="${p.apellidos||''}"></div>
            <div class="field"><label>Cédula</label><input id="f-cedula" value="${p.cedula||''}"></div>
            <div class="field"><label>Fecha nacimiento</label><input type="date" id="f-dob" value="${p.fecha_nacimiento||''}"></div>
            <div class="field"><label>Sexo</label><select id="f-sexo">
              <option value="">—</option>
              <option value="F" ${p.sexo==='F'?'selected':''}>Femenino</option>
              <option value="M" ${p.sexo==='M'?'selected':''}>Masculino</option>
            </select></div>
            <div class="field"><label>Institución</label><select id="f-inst">
              <option value="UM" ${p.institucion==='UM'?'selected':''}>Unión Médica</option>
              <option value="MAT" ${p.institucion==='MAT'?'selected':''}>Materno</option>
              <option value="PRIVADA" ${p.institucion==='PRIVADA'?'selected':''}>Privada</option>
            </select></div>
            <div class="field"><label>Teléfono</label><input id="f-tel" value="${p.telefono||''}"></div>
            <div class="field"><label>Ocupación</label><input id="f-ocup" value="${p.ocupacion||''}"></div>
          </div>
        </div>
        <!-- Antecedentes -->
        <div>
          <div class="card" style="margin-bottom:10px">
            <div class="card-title">Antecedentes patológicos</div>
            <div class="g2">
              <div class="field span2"><label>Patologías</label><textarea id="f-patol">${ant.patologias||''}</textarea></div>
              <div class="field span2"><label>Medicamentos</label><textarea id="f-meds">${ant.medicamentos||''}</textarea></div>
              <div class="field"><label>Alergias</label><input id="f-alerg" value="${ant.alergias||''}"></div>
              <div class="field"><label>Intolerancias</label><input id="f-intol" value="${ant.intolerancias||''}"></div>
              <div class="field"><label>Cirugías previas</label><input id="f-cirug" value="${ant.cirugias_previas||''}"></div>
              <div class="field"><label>Cirugía bariátrica</label><select id="f-bariat">
                <option value="0" ${!ant.cirugia_bariatrica?'selected':''}>No</option>
                <option value="1" ${ant.cirugia_bariatrica?'selected':''}>Sí</option>
              </select></div>
            </div>
          </div>
          <div class="card">
            <div class="card-title">Hábitos</div>
            <div class="g3">
              <div class="field"><label>Tabaquismo</label><select id="f-tabaco">
                <option value="no" ${ant.tabaquismo==='no'?'selected':''}>No</option>
                <option value="ex" ${ant.tabaquismo==='ex'?'selected':''}>Ex-fumador</option>
                <option value="activo" ${ant.tabaquismo==='activo'?'selected':''}>Activo</option>
              </select></div>
              <div class="field"><label>Alcohol</label><select id="f-alcohol">
                <option value="no" ${ant.alcohol==='no'?'selected':''}>No</option>
                <option value="ocasional" ${ant.alcohol==='ocasional'?'selected':''}>Ocasional</option>
                <option value="regular" ${ant.alcohol==='regular'?'selected':''}>Regular</option>
              </select></div>
              <div class="field"><label>Actividad física</label><select id="f-activ">
                <option value="sedentario" ${ant.actividad_fisica==='sedentario'?'selected':''}>Sedentario</option>
                <option value="leve" ${ant.actividad_fisica==='leve'?'selected':''}>Leve</option>
                <option value="moderado" ${ant.actividad_fisica==='moderado'?'selected':''}>Moderado</option>
                <option value="intenso" ${ant.actividad_fisica==='intenso'?'selected':''}>Intenso</option>
              </select></div>
              <div class="field"><label>Horas de sueño</label><input type="number" id="f-sueno" value="${ant.horas_sueno||''}" step="0.5"></div>
              <div class="field"><label>Familiar DM2</label><select id="f-fdm2">
                <option value="0" ${!ant.dm2_familiar?'selected':''}>No</option>
                <option value="1" ${ant.dm2_familiar?'selected':''}>Sí</option>
              </select></div>
              <div class="field"><label>Familiar ECV</label><select id="f-fecv">
                <option value="0" ${!ant.evc_familiar?'selected':''}>No</option>
                <option value="1" ${ant.evc_familiar?'selected':''}>Sí</option>
              </select></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- TAB VISITAS -->
    <div class="tab-pane" id="tab-visitas">
      <div class="sec-hdr">
        <span class="sec-title">Historial de visitas</span>
        <button class="btn btn-primary btn-sm" onclick="openNuevaVisita(${p.id})">+ Nueva visita</button>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr>
            <th>#</th><th>Fecha</th><th>Institución</th><th>Motivo</th><th>Módulos</th><th></th>
          </tr></thead>
          <tbody>
            ${visitas.length ? visitas.map(v => `
              <tr onclick="openVisita(${v.id})">
                <td class="mono">${v.numero_visita || '—'}</td>
                <td class="mono">${fmtDate(v.fecha)}</td>
                <td>${instBadge(v.institucion)}</td>
                <td style="max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${v.motivo_consulta || '—'}</td>
                <td>
                  ${v.mod_obesidad ? '<span class="badge badge-md" style="font-size:10px">Obesidad</span> ' : ''}
                  ${v.mod_salud_mental ? '<span class="badge badge-hi" style="font-size:10px">S.Mental</span> ' : ''}
                  ${v.mod_sibo ? '<span class="badge badge-lo" style="font-size:10px">SIBO</span> ' : ''}
                  ${v.mod_eii ? '<span class="badge badge-no" style="font-size:10px">EII</span> ' : ''}
                  ${v.mod_diabetes ? '<span class="badge" style="font-size:10px;background:#fce7f3;color:#be185d">DM</span>' : ''}
                </td>
                <td><button class="btn btn-ghost btn-xs" onclick="event.stopPropagation();openVisita(${v.id})">Abrir →</button></td>
              </tr>
            `).join('') : '<tr><td colspan="6" style="text-align:center;color:var(--muted);padding:20px">Sin visitas registradas</td></tr>'}
          </tbody>
        </table>
      </div>
    </div>

    <!-- TAB EVOLUCIÓN -->
    <div class="tab-pane" id="tab-evolucion">
      <div id="evolucionContent"><div class="loading"><div class="spinner"></div></div></div>
    </div>

  </div>`;
}

function initExpedienteForms(p, ant) {
  // Botón guardar en el footer del modal
  document.getElementById('btnGuardarPaciente').onclick = () => savePaciente(p.id);
}

async function savePaciente(id) {
  const body = {
    nombre: document.getElementById('f-nombre')?.value,
    apellidos: document.getElementById('f-apellidos')?.value,
    cedula: document.getElementById('f-cedula')?.value,
    fecha_nacimiento: document.getElementById('f-dob')?.value,
    sexo: document.getElementById('f-sexo')?.value,
    institucion: document.getElementById('f-inst')?.value,
    telefono: document.getElementById('f-tel')?.value,
    ocupacion: document.getElementById('f-ocup')?.value,
    antecedentes: {
      patologias: document.getElementById('f-patol')?.value,
      medicamentos: document.getElementById('f-meds')?.value,
      alergias: document.getElementById('f-alerg')?.value,
      intolerancias: document.getElementById('f-intol')?.value,
      cirugias_previas: document.getElementById('f-cirug')?.value,
      cirugia_bariatrica: parseInt(document.getElementById('f-bariat')?.value || 0),
      tabaquismo: document.getElementById('f-tabaco')?.value,
      alcohol: document.getElementById('f-alcohol')?.value,
      actividad_fisica: document.getElementById('f-activ')?.value,
      horas_sueno: parseFloat(document.getElementById('f-sueno')?.value) || null,
      dm2_familiar: parseInt(document.getElementById('f-fdm2')?.value || 0),
      evc_familiar: parseInt(document.getElementById('f-fecv')?.value || 0),
    }
  };
  await api(`/pacientes/${id}`, 'PUT', body);
  toast('Expediente guardado ✓');
  loadPacientes();
}

// ════════════════════════════════════════════════════════════
// NUEVO PACIENTE
// ════════════════════════════════════════════════════════════

function openNuevoPaciente() {
  document.getElementById('overlayNuevo').classList.add('open');
  document.getElementById('np-fecha').value = today();
}

async function createPaciente() {
  const body = {
    nombre: document.getElementById('np-nombre').value,
    apellidos: document.getElementById('np-apellidos').value,
    cedula: document.getElementById('np-cedula').value,
    fecha_nacimiento: document.getElementById('np-dob').value,
    sexo: document.getElementById('np-sexo').value,
    institucion: document.getElementById('np-inst').value,
    telefono: document.getElementById('np-tel').value,
    ocupacion: document.getElementById('np-ocup').value,
  };
  if (!body.nombre || !body.apellidos) { toast('Nombre y apellidos requeridos', 'warn'); return; }
  const data = await api('/pacientes', 'POST', body);
  closeOverlay('overlayNuevo');
  toast('Paciente creado ✓');
  loadPacientes();
  if (data) openPaciente(data.id);
}

// ════════════════════════════════════════════════════════════
// VISITA COMPLETA
// ════════════════════════════════════════════════════════════

async function openNuevaVisita(pid) {
  document.getElementById('nv-pid').value = pid;
  document.getElementById('nv-fecha').value = today();
  document.getElementById('overlayNuevaVisita').classList.add('open');
}

async function createVisita() {
  const pid = document.getElementById('nv-pid').value;
  const body = {
    fecha: document.getElementById('nv-fecha').value,
    institucion: document.getElementById('nv-inst').value,
    motivo_consulta: document.getElementById('nv-motivo').value,
    mod_obesidad: document.getElementById('nv-mod-ob').checked ? 1 : 0,
    mod_salud_mental: document.getElementById('nv-mod-sm').checked ? 1 : 0,
    mod_sibo: document.getElementById('nv-mod-sibo').checked ? 1 : 0,
    mod_eii: document.getElementById('nv-mod-eii').checked ? 1 : 0,
    mod_farmacoterapia: document.getElementById('nv-mod-farm').checked ? 1 : 0,
    mod_diabetes: document.getElementById('nv-mod-dm').checked ? 1 : 0,
    mod_renal:    document.getElementById('nv-mod-renal').checked ? 1 : 0,
  };
  const data = await api(`/pacientes/${pid}/visitas`, 'POST', body);
  closeOverlay('overlayNuevaVisita');
  toast('Visita creada ✓');
  if (data) openVisita(data.visita_id);
}

async function openVisita(vid) {
  document.getElementById('overlayVisita').classList.add('open');
  document.getElementById('visitaBody').innerHTML =
    '<div class="loading"><div class="spinner"></div> Cargando visita…</div>';

  const data = await api(`/visitas/${vid}`);
  State.currentVisita = data;
  renderVisitaModal(data);
}

function renderVisitaModal(v) {
  document.getElementById('visitaTitle').textContent = `Visita #${v.numero_visita || '?'} — ${fmtDate(v.fecha)}`;
  document.getElementById('visitaMeta').innerHTML = instBadge(v.institucion) +
    (v.motivo_consulta ? ` · ${v.motivo_consulta}` : '');

  // Tabs base siempre presentes
  const tabs = [
    ['cc',   '📋 Antrop.'],
    ['anal', '🔬 Analíticas'],
    ['diag', '🩺 Diagnóstico'],
    ['reqs', '🧮 Requerim.'],
    ['reg24','🍽 Rec. 24h'],
    ['freq', '📊 Frecuencia'],
    ['plan', '📝 Plan'],
    ['cron', '📈 Evolución'],
  ];
  if (v.mod_obesidad)     tabs.push(['ob',    '⚖️ Obesidad']);
  if (v.mod_salud_mental) tabs.push(['sm',    '🧠 Sal. Mental']);
  if (v.mod_sibo)         tabs.push(['sibo',  'SIBO/IMO']);
  if (v.mod_eii)          tabs.push(['eii',   'EII']);
  if (v.mod_diabetes)     tabs.push(['dm',    '🩸 Diabetes']);
  if (v.mod_renal)        tabs.push(['renal', '🫘 Renal']);
  tabs.push(['farm', '💊 Fármacos']);

  // LAZY LOADING: solo renderizar el primer tab ahora, el resto al hacer click
  State._visitaTabs = tabs;
  State._visitaRendered = new Set(['cc']);

  document.getElementById('visitaBody').innerHTML = `
    <div class="tabs" id="visitaTabs">
      ${tabs.map(([id, label], i) => {
        let extra = '';
        if (id === 'cron')  extra = `;lazyRenderTab('${id}',${v.id});loadCronologia(${v.paciente_id})`;
        else if (id === 'farm') extra = `;lazyRenderTab('${id}',${v.id});loadFarmacosTab(${v.id})`;
        else                extra = `;lazyRenderTab('${id}',${v.id})`;
        return `<button class="tab-btn ${i===0?'active':''}" onclick="switchTab('visitaContent','vtab-${id}',this)${extra}">${label}</button>`;
      }).join('')}
    </div>
    <div id="visitaContent">
      <div class="tab-pane active" id="vtab-cc">${renderVisitaTab('cc', v)}</div>
      ${tabs.slice(1).map(([id]) =>
        `<div class="tab-pane" id="vtab-${id}"></div>`
      ).join('')}
    </div>
  `;

  initVisitaForms(v);
}

function lazyRenderTab(id, vid) {
  if (State._visitaRendered?.has(id)) return;
  State._visitaRendered?.add(id);
  const el = document.getElementById(`vtab-${id}`);
  if (!el) return;
  const v = State.currentVisita;
  if (!v) return;
  // farm y cron se cargan por sus propias funciones, solo poner placeholder si no tiene contenido
  if (id === 'farm') { el.innerHTML = `<div id="farmTabContent"><div class="loading"><div class="spinner"></div> Cargando fármacos…</div></div>`; return; }
  if (id === 'cron') { el.innerHTML = `<div id="cronologiaContent"><div class="loading"><div class="spinner"></div> Cargando cronología…</div></div>`; return; }
  el.innerHTML = renderVisitaTab(id, v);
  if (id === 'reg24') setTimeout(autoCalcR24Macros, 50);
  if (id === 'anal')  setTimeout(autoCalcAnaliticas,  50);
}

function renderVisitaTab(id, v) {
  const cc = v.composicion_corporal || {};
  const an = v.analiticas || {};
  const plan = v.plan_nutricional || {};
  const r24 = v.registro_24h || {};

  if (id === 'cc') return renderTabCC(cc);
  if (id === 'anal') return renderTabAnaliticas(an);
  if (id === 'reg24') return renderTabReg24(r24);
  if (id === 'freq') return renderTabFreq(v.frecuencia_consumo || []);
  if (id === 'plan') return renderTabPlan(plan);
  if (id === 'cron') return `<div id="cronologiaContent"><div class="loading"><div class="spinner"></div> Cargando cronología…</div></div>`;
  if (id === 'ob') return renderTabObesidad(v.obesidad || {}, cc, an);
  if (id === 'sm') return renderTabSaludMental(v.salud_mental || {});
  if (id === 'sibo') return renderTabSibo(v.sibo_imo || {});
  if (id === 'eii') return renderTabEii(v.eii || {});
  if (id === 'dm')    return renderTabDM(v.diabetes || {}, v);
  if (id === 'renal') return renderTabRenal(v.renal || {}, v);
  if (id === 'diag') return renderTabDiag(v.diagnostico_nutricional || {}, v);
  if (id === 'reqs') return renderTabReqs(v.requerimientos || {}, v);
  if (id === 'farm') return `<div id="farmTabContent"><div class="loading"><div class="spinner"></div> Cargando fármacos…</div></div>`;
  return '';
}

// ── COMPOSICIÓN CORPORAL TAB ──────────────────────────────────
function renderTabCC(cc) {
  return `
  <div class="card">
    <div class="card-title">Antropometría <span style="float:right"><input type="date" id="cc-fecha" value="${cc.fecha || today()}" style="background:transparent;border:none;color:var(--muted);font-size:11px"></span></div>
    <div class="g4">
      <div class="field"><label>Peso (kg)</label><div class="field-wrap"><input type="number" step="0.1" id="cc-peso" value="${cc.peso||''}" oninput="autoCalcCC()"><span class="field-unit">kg</span></div></div>
      <div class="field"><label>Talla (cm)</label><div class="field-wrap"><input type="number" step="0.1" id="cc-talla" value="${cc.talla||''}" oninput="autoCalcCC()"><span class="field-unit">cm</span></div></div>
      <div class="field"><label>IMC</label><div class="computed" id="cc-imc">${cc.imc ? cc.imc + ' kg/m²' : '—'}</div></div>
      <div class="field"><label>Clasificación</label><div class="computed" id="cc-cls" style="font-size:12px">${cc.clasificacion_imc || '—'}</div></div>
      <div class="field"><label>Cintura (cm)</label><div class="field-wrap"><input type="number" step="0.1" id="cc-cintura" value="${cc.cintura||''}" oninput="autoCalcCC()"><span class="field-unit">cm</span></div></div>
      <div class="field"><label>Cadera (cm)</label><div class="field-wrap"><input type="number" step="0.1" id="cc-cadera" value="${cc.cadera||''}" oninput="autoCalcCC()"><span class="field-unit">cm</span></div></div>
      <div class="field"><label>Pantorrilla (cm)</label><div class="field-wrap"><input type="number" step="0.1" id="cc-pant" value="${cc.pantorrilla||''}"><span class="field-unit">cm</span></div></div>
      <div class="field"><label>Cintura/Talla</label><div class="computed" id="cc-ct">${cc.cintura_talla || '—'}</div></div>
      <div class="field"><label>Cintura/Cadera</label><div class="computed" id="cc-cc">${cc.cintura_cadera || '—'}</div></div>
    </div>
  </div>
  <div class="card">
    <div class="card-title">Bioimpedanciometría
      <select id="cc-equipo" style="font-size:11px;background:var(--bg);border:1px solid var(--border);color:var(--text);border-radius:4px;padding:2px 6px">
        <option value="InBody120" ${cc.equipo==='InBody120'?'selected':''}>InBody 120</option>
        <option value="Tanita" ${cc.equipo==='Tanita'?'selected':''}>Tanita</option>
      </select>
    </div>
    <div class="g4">
      <div class="field"><label>% Grasa</label><div class="field-wrap"><input type="number" step="0.1" id="cc-pgrasa" value="${cc.pct_grasa||''}"><span class="field-unit">%</span></div></div>
      <div class="field"><label>Masa grasa</label><div class="field-wrap"><input type="number" step="0.1" id="cc-kgrasa" value="${cc.kg_grasa||''}"><span class="field-unit">kg</span></div></div>
      <div class="field"><label>Masa magra</label><div class="field-wrap"><input type="number" step="0.1" id="cc-magra" value="${cc.kg_masa_magra||''}"><span class="field-unit">kg</span></div></div>
      <div class="field"><label>Masa muscular</label><div class="field-wrap"><input type="number" step="0.1" id="cc-muscular" value="${cc.kg_masa_muscular||''}"><span class="field-unit">kg</span></div></div>
      <div class="field"><label>Agua corporal</label><div class="field-wrap"><input type="number" step="0.1" id="cc-agua" value="${cc.agua_corporal||''}"><span class="field-unit">L</span></div></div>
      <div class="field"><label>Masa ósea</label><div class="field-wrap"><input type="number" step="0.1" id="cc-osea" value="${cc.masa_osea||''}"><span class="field-unit">kg</span></div></div>
      <div class="field"><label>Edad metabólica</label><input type="number" id="cc-edadmet" value="${cc.edad_metabolica||''}"></div>
      <div class="field"><label>TMB (equipo)</label><div class="field-wrap"><input type="number" id="cc-tmb" value="${cc.tmb_equipo||''}" oninput="autoCalcGET()"><span class="field-unit">kcal</span></div></div>
    </div>
    <div class="divider"></div>
    <div class="g4">
      <div class="field"><label>Factor actividad</label>
        <select id="cc-factor" onchange="autoCalcGET()">
          <option value="1.2" ${cc.factor_actividad==1.2?'selected':''}>Sedentario ×1.2</option>
          <option value="1.375" ${cc.factor_actividad==1.375?'selected':''}>Leve ×1.375</option>
          <option value="1.55" ${cc.factor_actividad==1.55?'selected':''}>Moderado ×1.55</option>
          <option value="1.725" ${cc.factor_actividad==1.725?'selected':''}>Intenso ×1.725</option>
        </select>
      </div>
      <div class="field"><label>GET calculado</label><div class="computed" id="cc-get">${cc.get_calculado ? cc.get_calculado + ' kcal' : '—'}</div></div>
      <div class="field"><label>Proteína objetivo</label><div class="computed" id="cc-prot">${cc.proteina_objetivo ? cc.proteina_objetivo + ' g/día' : '—'}</div></div>
    </div>
  </div>
  <div class="card">
    <div class="card-title">Funcionalidad</div>
    <div class="g3">
      <div>
        <div style="font-size:11px;color:var(--muted);margin-bottom:6px;font-weight:600">HANDGRIP — Mano derecha (kg)</div>
        <div class="g3" style="gap:6px">
          <div class="field"><label>Intento 1</label><input type="number" step="0.1" id="cc-hd1" value="${cc.handgrip_der_1||''}"></div>
          <div class="field"><label>Intento 2</label><input type="number" step="0.1" id="cc-hd2" value="${cc.handgrip_der_2||''}"></div>
          <div class="field"><label>Intento 3</label><input type="number" step="0.1" id="cc-hd3" value="${cc.handgrip_der_3||''}"></div>
        </div>
        <div style="font-size:11px;color:var(--muted);margin-top:4px">Mejor: <span class="mono" id="cc-hd-best">${cc.handgrip_der_mejor ? cc.handgrip_der_mejor + ' kg' : '—'}</span> · <span id="cc-hd-interp" style="color:${cc.handgrip_interpretacion==='Baja'?'var(--danger)':'var(--accent2)'}">${cc.handgrip_interpretacion || '—'}</span></div>
      </div>
      <div>
        <div style="font-size:11px;color:var(--muted);margin-bottom:6px;font-weight:600">HANDGRIP — Mano izquierda (kg)</div>
        <div class="g3" style="gap:6px">
          <div class="field"><label>Intento 1</label><input type="number" step="0.1" id="cc-hi1" value="${cc.handgrip_izq_1||''}"></div>
          <div class="field"><label>Intento 2</label><input type="number" step="0.1" id="cc-hi2" value="${cc.handgrip_izq_2||''}"></div>
          <div class="field"><label>Intento 3</label><input type="number" step="0.1" id="cc-hi3" value="${cc.handgrip_izq_3||''}"></div>
        </div>
        <div style="font-size:11px;color:var(--muted);margin-top:4px">Mejor: <span class="mono" id="cc-hi-best">${cc.handgrip_izq_mejor ? cc.handgrip_izq_mejor + ' kg' : '—'}</span></div>
      </div>
      <div>
        <div style="font-size:11px;color:var(--muted);margin-bottom:6px;font-weight:600">SIT-TO-STAND (5 repeticiones)</div>
        <div class="field"><label>Nº repeticiones completadas</label><input type="number" id="cc-sts" value="${cc.sit_to_stand_reps||''}"></div>
        <div style="font-size:11px;color:var(--muted);margin-top:4px">Interpretación: <span id="cc-sts-interp" style="color:${cc.sit_to_stand_interp==='Bajo'?'var(--danger)':'var(--accent2)'}">${cc.sit_to_stand_interp || '—'}</span></div>
      </div>
    </div>
    <div class="divider"></div>
    <div style="font-size:11px;color:var(--muted);margin-bottom:8px;font-weight:600">SARC-F</div>
    <div class="g5">
      ${['Carga','Asistencia para caminar','Levantarse de silla','Subir escaleras','Caídas'].map((label, i) => {
        const key = ['sarcf_carga','sarcf_asistencia','sarcf_levantarse','sarcf_escaleras','sarcf_caidas'][i];
        const val = cc[key];
        return `<div>
          <div style="font-size:11px;color:var(--muted);margin-bottom:4px">${label}</div>
          <div class="likert" id="sarcf-${i}">
            ${[0,1,2].map(v => `<div class="likert-opt${val===v?' selected':''}" onclick="selectLikert('sarcf-${i}',${v},this)">${v}</div>`).join('')}
          </div>
        </div>`;
      }).join('')}
    </div>
    <div style="margin-top:10px;font-size:13px">SARC-F total: <span class="mono" id="sarcf-total">${cc.sarcf_total ?? '—'}</span> · <span id="sarcf-interp">${cc.sarcf_interpretacion || '—'}</span></div>
  </div>
  <div style="text-align:right"><button class="btn btn-success" onclick="saveCC()">Guardar composición corporal</button></div>`;
}

function autoCalcAnaliticas() {
  const g  = parseFloat(document.getElementById('an-glucemia_ayunas')?.value);
  const ins = parseFloat(document.getElementById('an-insulina_ayunas')?.value);
  const ct = parseFloat(document.getElementById('an-colesterol_total')?.value);
  const hdl= parseFloat(document.getElementById('an-hdl')?.value);
  const ldl= parseFloat(document.getElementById('an-ldl')?.value);
  const tg = parseFloat(document.getElementById('an-trigliceridos')?.value);
  const cr = parseFloat(document.getElementById('an-creatinina')?.value);

  // HOMA-IR
  if (g && ins) {
    const homa = (g * ins) / 405;
    const interp = homa >= 2.5 ? '⚠ Resistencia a insulina' : homa >= 1.8 ? 'Límite' : '✔ Normal';
    const color  = homa >= 2.5 ? 'var(--danger)' : homa >= 1.8 ? 'var(--warn)' : 'var(--accent2)';
    document.getElementById('homa-val').textContent = homa.toFixed(2);
    document.getElementById('homa-interp').textContent = interp;
    document.getElementById('homa-interp').style.color = color;
    document.getElementById('homa-display').style.display = 'flex';
  }
  // No-HDL
  if (ct && hdl) {
    const nohdl = ct - hdl;
    const stEl  = document.getElementById('an-nohdl');
    if (stEl) stEl.textContent = nohdl.toFixed(0) + ' mg/dL' + (nohdl > 130 ? ' ⚠' : ' ✔');
  }
  // Índice aterogénico
  if (ct && hdl) {
    const ia = ct / hdl;
    const iaEl = document.getElementById('an-ia');
    if (iaEl) iaEl.textContent = ia.toFixed(2) + (ia > 5 ? ' ⚠ Alto' : ' ✔');
  }
  // Colesterol no-HDL badge
  if (ldl) {
    const ldlEl = document.getElementById('an-ldl-badge');
    if (ldlEl) ldlEl.textContent = ldl > 160 ? '⚠ Alto' : ldl < 70 ? '✔ Óptimo' : '✔ Aceptable';
  }
  // TG/HDL (RI proxy)
  if (tg && hdl) {
    const ratio = tg / hdl;
    const el = document.getElementById('an-tg-hdl');
    if (el) {
      el.textContent = ratio.toFixed(2) + (ratio > 3 ? ' ⚠ RI probable' : ' ✔');
      el.style.color  = ratio > 3 ? 'var(--danger)' : 'var(--accent2)';
    }
  }
  // eGFR (si hay paciente cargado)
  if (cr) {
    const pac = State.currentPaciente;
    if (pac?.fecha_nacimiento && pac?.sexo) {
      const hoy = new Date(); const dob = new Date(pac.fecha_nacimiento);
      const edad = hoy.getFullYear() - dob.getFullYear() - ((hoy.getMonth()<dob.getMonth()||hoy.getMonth()===dob.getMonth()&&hoy.getDate()<dob.getDate())?1:0);
      const sexo = pac.sexo;
      const kappa = sexo==='F' ? 0.7 : 0.9;
      const alpha = sexo==='F' ? -0.241 : -0.302;
      const sex_f = sexo==='F' ? 1.012 : 1.0;
      const ratio = cr / kappa;
      const egfr  = 142 * Math.pow(ratio < 1 ? ratio : ratio, ratio < 1 ? alpha : -1.2) * Math.pow(0.9938, edad) * sex_f;
      const estadio = egfr>=90?'G1 ≥90':egfr>=60?'G2 60-89':egfr>=45?'G3a 45-59':egfr>=30?'G3b 30-44':egfr>=15?'G4 15-29':'G5 <15';
      const color   = egfr >= 60 ? 'var(--accent2)' : egfr >= 30 ? 'var(--warn)' : 'var(--danger)';
      const el = document.getElementById('an-egfr');
      if (el) { el.textContent = `${egfr.toFixed(0)} mL/min — ${estadio}`; el.style.color = color; }
    }
  }
}

function renderTabAnaliticas(an) {
  const f = (id, val, unit='', step='1', extra='') =>
    `<div class="field"><label>${{
      glucemia_ayunas:'Glucemia ayunas',insulina_ayunas:'Insulina basal',
      hba1c:'HbA1c',glucemia_2h:'Glucemia 2h postprandial',
      colesterol_total:'Colesterol total',ldl:'LDL',hdl:'HDL',
      trigliceridos:'Triglicéridos',apob:'ApoB',creatinina:'Creatinina',
      urea:'Urea',acido_urico:'Ácido úrico',microalbuminuria:'Microalbuminuria',
      alt:'ALT (TGP)',ast:'AST (TGO)',ggt:'GGT',fosfatasa_alcalina:'Fosfatasa alcalina',
      bilirrubina_total:'Bilirrubina total',tsh:'TSH',t4_libre:'T4 libre',
      pcr_us:'PCR ultrasensible',vitamina_d:'Vitamina D 25-OH',
      vitamina_b12:'Vitamina B12',folato:'Folato sérico',
      magnesio:'Magnesio',zinc:'Zinc',ferritina:'Ferritina',
      hierro_serico:'Hierro sérico',hemoglobina:'Hemoglobina',
      albumina:'Albúmina',prealbumin:'Prealbúmina',proteinas_totales:'Proteínas totales'
    }[id]||id.replace(/_/g,' ')}</label>
    <div class="field-wrap"><input type="number" step="${step}" id="an-${id}" value="${val||''}" oninput="autoCalcAnaliticas()" ${extra}><span class="field-unit">${unit}</span></div></div>`;

  return `
  <div class="card" style="margin-bottom:12px">
    <div class="card-title">🩸 Glucometabolismo</div>
    <div class="g4">
      ${f('glucemia_ayunas', an.glucemia_ayunas, 'mg/dL', '0.1')}
      ${f('insulina_ayunas', an.insulina_ayunas, 'μUI/mL', '0.01')}
      ${f('hba1c', an.hba1c, '%', '0.1')}
      ${f('glucemia_2h', an.glucemia_2h, 'mg/dL', '0.1')}
    </div>
    <div id="homa-display" style="${an.homa_ir ? 'display:flex' : 'display:none'};margin-top:10px;padding:12px;background:var(--bg);border:1px solid var(--border);border-radius:8px;gap:16px;align-items:center">
      <div><div class="mono" style="font-size:22px;font-weight:700;color:var(--accent)" id="homa-val">${an.homa_ir ? an.homa_ir.toFixed(2) : '—'}</div><div style="font-size:11px;color:var(--muted)">HOMA-IR</div></div>
      <div style="flex:1;padding-left:14px;border-left:1px solid var(--border)"><span id="homa-interp" style="font-weight:600">${an.homa_interpretacion || '—'}</span><div style="font-size:11px;color:var(--muted);margin-top:3px">Matthews DR et al. Diabetologia 1985</div></div>
      <div style="text-align:center;padding-left:14px;border-left:1px solid var(--border)">
        <div style="font-size:11px;color:var(--muted)">TG/HDL</div>
        <div class="mono" style="font-size:16px;font-weight:700" id="an-tg-hdl">
          ${an.trigliceridos && an.hdl ? (an.trigliceridos/an.hdl).toFixed(2) : '—'}
        </div>
      </div>
    </div>
  </div>
  <div class="card" style="margin-bottom:12px">
    <div class="card-title">❤️ Perfil lipídico</div>
    <div class="g4">
      ${f('colesterol_total', an.colesterol_total, 'mg/dL')}
      ${f('ldl', an.ldl, 'mg/dL')}
      ${f('hdl', an.hdl, 'mg/dL')}
      ${f('trigliceridos', an.trigliceridos, 'mg/dL')}
      ${f('apob', an.apob, 'mg/dL')}
      <div class="field"><label>No-HDL <span style="font-size:10px;color:var(--muted)">(auto)</span></label>
        <div class="computed" id="an-nohdl" style="font-size:14px;font-weight:700">
          ${an.no_hdl ? an.no_hdl + ' mg/dL' + (an.no_hdl > 130 ? ' ⚠' : ' ✔') : '—'}
        </div>
      </div>
      <div class="field"><label>Índice aterogénico <span style="font-size:10px;color:var(--muted)">(auto)</span></label>
        <div class="computed" id="an-ia" style="font-size:14px;font-weight:700">
          ${an.indice_aterogenico ? an.indice_aterogenico.toFixed(2) + (an.indice_aterogenico > 5 ? ' ⚠ Alto' : ' ✔') : '—'}
        </div>
      </div>
    </div>
  </div>
  <div class="g2" style="gap:12px">
    <div class="card">
      <div class="card-title">Función renal</div>
      <div class="g2">
        ${f('creatinina', an.creatinina, 'mg/dL', '0.01')}
        ${f('urea', an.urea, 'mg/dL')}
        ${f('acido_urico', an.acido_urico, 'mg/dL', '0.1')}
        ${f('microalbuminuria', an.microalbuminuria, 'mg/g')}
      </div>
      <div class="field" style="margin-top:8px"><label>eGFR CKD-EPI</label><div class="computed" id="an-egfr">${an.egfr ? an.egfr + ' mL/min — ' + an.egfr_estadio : '—'}</div></div>
    </div>
    <div class="card">
      <div class="card-title">Función hepática</div>
      <div class="g2">
        ${f('alt', an.alt, 'U/L')}
        ${f('ast', an.ast, 'U/L')}
        ${f('ggt', an.ggt, 'U/L')}
        ${f('fosfatasa_alcalina', an.fosfatasa_alcalina, 'U/L')}
        ${f('bilirrubina_total', an.bilirrubina_total, 'mg/dL', '0.1')}
      </div>
    </div>
  </div>
  <div class="g2" style="gap:12px">
    <div class="card">
      <div class="card-title">Tiroides / Inflamación</div>
      <div class="g2">
        ${f('tsh', an.tsh, 'μUI/mL', '0.01')}
        ${f('t4_libre', an.t4_libre, 'ng/dL', '0.01')}
        ${f('pcr_us', an.pcr_us, 'mg/L', '0.1')}
      </div>
    </div>
    <div class="card">
      <div class="card-title">Micronutrientes / Hemograma</div>
      <div class="g2">
        ${f('vitamina_d', an.vitamina_d, 'ng/mL', '0.1')}
        ${f('vitamina_b12', an.vitamina_b12, 'pg/mL')}
        ${f('folato', an.folato, 'ng/mL', '0.1')}
        ${f('magnesio', an.magnesio, 'mg/dL', '0.01')}
        ${f('zinc', an.zinc, 'μg/dL')}
        ${f('ferritina', an.ferritina, 'ng/mL')}
        ${f('hierro_serico', an.hierro_serico, 'μg/dL')}
        ${f('hemoglobina', an.hemoglobina, 'g/dL', '0.1')}
      </div>
    </div>
  </div>
  <div style="text-align:right"><button class="btn btn-success" onclick="saveAnaliticas()">Guardar analíticas</button></div>`;
}

function autoCalcR24Macros() {
  const p = parseFloat(document.getElementById('r24-prot')?.value) || 0;
  const c = parseFloat(document.getElementById('r24-cho')?.value)  || 0;
  const g = parseFloat(document.getElementById('r24-fat')?.value)  || 0;
  if (p || c || g) {
    const kcal = Math.round(p * 4 + c * 4 + g * 9);
    const el = document.getElementById('r24-kcal');
    if (el) { el.value = kcal; el.style.fontWeight='700'; el.style.color='var(--accent)'; }
    // barra de macros
    const total = p*4 + c*4 + g*9 || 1;
    const pPct = Math.round(p*4/total*100);
    const cPct = Math.round(c*4/total*100);
    const gPct = Math.round(g*9/total*100);
    const barEl = document.getElementById('r24-macro-bar');
    const lblEl = document.getElementById('r24-macro-lbl');
    if (barEl) barEl.innerHTML = `
      <div style="height:10px;display:flex;border-radius:5px;overflow:hidden;margin-top:6px">
        <div style="width:${pPct}%;background:#4f8ef7" title="Proteína ${pPct}%"></div>
        <div style="width:${cPct}%;background:#34c78a" title="CHO ${cPct}%"></div>
        <div style="width:${gPct}%;background:#f0a742" title="Grasa ${gPct}%"></div>
      </div>`;
    if (lblEl) lblEl.innerHTML = `
      <span style="color:#4f8ef7">■ Prot ${pPct}%</span> &nbsp;
      <span style="color:#34c78a">■ CHO ${cPct}%</span> &nbsp;
      <span style="color:#f0a742">■ Grasa ${gPct}%</span> &nbsp;
      <strong style="color:var(--text)">${kcal} kcal totales</strong>`;

    // comparar con requerimientos
    const req = State.currentVisita?.requerimientos || {};
    if (req.kcal_objetivo && kcal) {
      const diff = kcal - req.kcal_objetivo;
      const compEl = document.getElementById('r24-vs-req');
      if (compEl) {
        compEl.style.display = 'block';
        compEl.innerHTML = diff > 200
          ? `⚠ Excede la meta en <strong>+${diff} kcal</strong> (meta: ${req.kcal_objetivo} kcal)`
          : diff < -200
          ? `⚠ Por debajo de la meta en <strong>${diff} kcal</strong> (meta: ${req.kcal_objetivo} kcal)`
          : `✔ Dentro de la meta calórica (meta: ${req.kcal_objetivo} kcal, reportado: ${kcal} kcal)`;
        compEl.style.color = Math.abs(diff) > 200 ? 'var(--warn)' : 'var(--accent2)';
      }
    }
  }
}

function renderTabReg24(r24) {
  const meals = [
    ['desayuno','🌅 Desayuno'],['media_manana','🍎 Media mañana'],
    ['almuerzo','🍽 Almuerzo'],['merienda','☕ Merienda'],
    ['cena','🌙 Cena'],['otros','🍬 Colaciones / otros']
  ];
  const p = r24.proteinas_g || 0, c = r24.carbohidratos_g || 0, gf = r24.grasas_g || 0;
  const totalKcalMacro = p*4 + c*4 + gf*9;
  const pPct = totalKcalMacro ? Math.round(p*4/totalKcalMacro*100) : 0;
  const cPct = totalKcalMacro ? Math.round(c*4/totalKcalMacro*100) : 0;
  const gPct = totalKcalMacro ? Math.round(gf*9/totalKcalMacro*100) : 0;

  return `
  <div class="card">
    <div class="card-title">Recordatorio de 24 horas
      <span style="float:right;font-size:11px;font-weight:400;color:var(--muted)">Describa los alimentos y porciones de cada tiempo</span>
    </div>
    <div class="g2">
      ${meals.map(([k,l]) => `
        <div class="field">
          <label>${l}</label>
          <textarea id="r24-${k}" style="min-height:60px;font-size:12px" placeholder="Ej: 2 huevos revueltos, 2 tostadas integrales, café con leche 1 taza">${r24[k]||''}</textarea>
        </div>`).join('')}
    </div>
  </div>

  <div class="card">
    <div class="card-title">📊 Análisis nutricional estimado</div>
    <div class="g4" style="margin-bottom:12px">
      <div class="field"><label>Proteínas (g)</label>
        <div class="field-wrap"><input type="number" step="0.1" id="r24-prot" value="${r24.proteinas_g||''}" oninput="autoCalcR24Macros()"><span class="field-unit">g</span></div>
      </div>
      <div class="field"><label>Carbohidratos (g)</label>
        <div class="field-wrap"><input type="number" step="0.1" id="r24-cho" value="${r24.carbohidratos_g||''}" oninput="autoCalcR24Macros()"><span class="field-unit">g</span></div>
      </div>
      <div class="field"><label>Grasas (g)</label>
        <div class="field-wrap"><input type="number" step="0.1" id="r24-fat" value="${r24.grasas_g||''}" oninput="autoCalcR24Macros()"><span class="field-unit">g</span></div>
      </div>
      <div class="field"><label>kcal totales <span style="font-size:10px;color:var(--accent)">⚡ Auto</span></label>
        <div class="field-wrap"><input type="number" id="r24-kcal" class="computed" value="${r24.kcal_estimadas||''}" placeholder="Auto" readonly style="font-weight:700;color:var(--accent);background:#eff6ff;border-color:#bfdbfe"><span class="field-unit">kcal</span></div>
      </div>
      <div class="field"><label>Fibra (g)</label>
        <div class="field-wrap"><input type="number" step="0.1" id="r24-fibra" value="${r24.fibra_g||''}"><span class="field-unit">g</span></div>
      </div>
      <div class="field"><label>Agua (L)</label>
        <div class="field-wrap"><input type="number" step="0.1" id="r24-agua" value="${r24.agua_l||''}"><span class="field-unit">L</span></div>
      </div>
      <div class="field"><label>¿Día típico?</label>
        <select id="r24-tipico">
          <option value="1" ${r24.dia_tipico!==0?'selected':''}>Sí, representativo</option>
          <option value="0" ${r24.dia_tipico===0?'selected':''}>No, día atípico</option>
        </select>
      </div>
    </div>

    <!-- Barra de macros -->
    <div id="r24-macro-bar">
      ${totalKcalMacro ? `<div style="height:10px;display:flex;border-radius:5px;overflow:hidden;margin-top:6px">
        <div style="width:${pPct}%;background:#4f8ef7"></div>
        <div style="width:${cPct}%;background:#34c78a"></div>
        <div style="width:${gPct}%;background:#f0a742"></div>
      </div>` : ''}
    </div>
    <div id="r24-macro-lbl" style="font-size:11px;margin-top:6px;display:flex;gap:14px;flex-wrap:wrap">
      ${totalKcalMacro ? `
        <span style="color:#4f8ef7">■ Prot ${pPct}%</span>
        <span style="color:#34c78a">■ CHO ${cPct}%</span>
        <span style="color:#f0a742">■ Grasa ${gPct}%</span>
        <strong style="color:var(--text)">${r24.kcal_estimadas||Math.round(totalKcalMacro)} kcal totales</strong>` : ''}
    </div>

    <!-- vs requerimientos -->
    <div id="r24-vs-req" style="display:none;margin-top:10px;padding:8px 12px;border-radius:8px;font-size:12px;background:var(--bg);border:1px solid var(--border)"></div>

    <div class="field" style="margin-top:12px"><label>Observaciones / patrón dietético</label>
      <textarea id="r24-obs" rows="2" placeholder="Calidad de la dieta, preferencias, aversiones, contexto cultural…">${r24.observaciones||''}</textarea>
    </div>
  </div>
  <div style="text-align:right"><button class="btn btn-success" onclick="saveReg24()">Guardar recordatorio 24h</button></div>`;
}

const FREQ_GROUPS = ['Cereales y tubérculos','Leguminosas','Vegetales','Frutas',
  'Lácteos','Carnes y aves','Pescados y mariscos','Huevos',
  'Grasas y aceites','Azúcares y dulces','Bebidas azucaradas',
  'Comida rápida / ultraprocesados','Frutos secos y semillas'];
const FREQ_OPTS = ['nunca','1-3/mes','1/sem','2-4/sem','5-6/sem','diario','2+/dia'];

function renderTabFreq(saved) {
  const map = {};
  saved.forEach(s => { map[s.grupo_alimentario] = s; });
  return `
  <div class="card">
    <div class="card-title">Frecuencia de consumo por grupos alimentarios</div>
    <table style="width:100%;border-collapse:collapse;font-size:13px">
      <thead><tr>
        <th style="padding:6px 8px;font-size:10px;color:var(--muted);text-align:left;border-bottom:1px solid var(--border);font-weight:600;text-transform:uppercase">Grupo</th>
        <th style="padding:6px 8px;font-size:10px;color:var(--muted);text-align:left;border-bottom:1px solid var(--border);font-weight:600;text-transform:uppercase">Frecuencia</th>
        <th style="padding:6px 8px;font-size:10px;color:var(--muted);text-align:left;border-bottom:1px solid var(--border);font-weight:600;text-transform:uppercase">Porción habitual</th>
        <th style="padding:6px 8px;font-size:10px;color:var(--muted);text-align:left;border-bottom:1px solid var(--border);font-weight:600;text-transform:uppercase">Observación</th>
      </tr></thead>
      <tbody>
        ${FREQ_GROUPS.map(g => {
          const s = map[g] || {};
          return `<tr style="border-bottom:1px solid var(--border)">
            <td style="padding:5px 8px">${g}</td>
            <td style="padding:5px 8px"><select class="freq-sel" data-grupo="${g}" style="background:var(--bg);border:1px solid var(--border);color:var(--text);border-radius:5px;padding:3px 6px;font-size:12px;width:100%">
              ${FREQ_OPTS.map(o => `<option value="${o}" ${s.frecuencia===o?'selected':''}>${o}</option>`).join('')}
            </select></td>
            <td style="padding:5px 8px"><input class="freq-por" data-grupo="${g}" value="${s.porcion_habitual||''}" style="background:var(--bg);border:1px solid var(--border);color:var(--text);border-radius:5px;padding:3px 8px;font-size:12px;width:100%"></td>
            <td style="padding:5px 8px"><input class="freq-obs" data-grupo="${g}" value="${s.observacion||''}" style="background:var(--bg);border:1px solid var(--border);color:var(--text);border-radius:5px;padding:3px 8px;font-size:12px;width:100%"></td>
          </tr>`;
        }).join('')}
      </tbody>
    </table>
  </div>
  <div style="text-align:right"><button class="btn btn-success" onclick="saveFreq()">Guardar frecuencia de consumo</button></div>`;
}

function renderTabPlan(plan) {
  const objs = ['Pérdida de peso','Preservación masa muscular','Ganancia muscular',
    'Control glucémico','Reducción grasa visceral','Manejo sarcopenia'];
  return `
  <div class="card">
    <div class="card-title">Objetivos y prescripción</div>
    <div class="g3">
      <div class="field"><label>Objetivo principal</label><select id="pn-obj">
        ${objs.map(o => `<option ${plan.objetivo_principal===o?'selected':''}>${o}</option>`).join('')}
      </select></div>
      <div class="field"><label>Peso objetivo (kg)</label><input type="number" step="0.1" id="pn-pesobj" value="${plan.peso_objetivo||''}"></div>
      <div class="field"><label>kcal prescritas</label><input type="number" id="pn-kcal" value="${plan.kcal_prescritas||''}"></div>
      <div class="field"><label>Proteína prescrita (g)</label><input type="number" step="0.1" id="pn-prot" value="${plan.proteina_prescrita||''}"></div>
      <div class="field"><label>Agua recomendada (L)</label><input type="number" step="0.1" id="pn-agua" value="${plan.agua_recomendada||''}"></div>
      <div class="field"><label>Déficit/Superávit (kcal)</label><input type="number" id="pn-def" value="${plan.deficit_superavit||''}"></div>
      <div class="field"><label>Plantilla de dieta</label><select id="pn-dieta">
        <option value="">— Sin asignar —</option>
        <option value="Bajo Índice Glucémico" ${plan.plantilla_dieta==='Bajo Índice Glucémico'?'selected':''}>Bajo Índice Glucémico</option>
        <option value="Baja en FODMAPs" ${plan.plantilla_dieta==='Baja en FODMAPs'?'selected':''}>Baja en FODMAPs</option>
      </select></div>
      <div class="field"><label>Próxima evaluación</label><input type="date" id="pn-prox" value="${plan.proxima_evaluacion||''}"></div>
    </div>
    <div class="field" style="margin-top:10px"><label>Suplementación</label><textarea id="pn-supl">${plan.suplementacion||''}</textarea></div>
    <div class="field" style="margin-top:8px"><label>Indicaciones clínicas</label><textarea id="pn-ind" style="min-height:90px">${plan.indicaciones||''}</textarea></div>
  </div>
  <div style="text-align:right"><button class="btn btn-success" onclick="savePlan()">Guardar plan nutricional</button></div>`;
}

function renderTabObesidad(ob, cc, an) {
  const escalonOpts = [
    ['estilo_vida',    '🥗 Nutrición + estilo de vida'],
    ['tre',            '⏱ TRE (alimentación restringida en tiempo)'],
    ['ejercicio',      '🏃 Ejercicio estructurado'],
    ['metformina',     '💊 Metformina'],
    ['glp1',           '💉 Agonista GLP-1'],
    ['gip_glp1',       '💉 Agonista GIP/GLP-1 (tirzepatida)'],
    ['combinada',      '🔗 Terapia combinada'],
    ['endoscopia',     '🔭 Evaluación endoscópica / ESG'],
    ['cirugia',        '⚕ Evaluación quirúrgica'],
  ];
  return `
  <div class="card">
    <div class="card-title">Clasificación y estadificación</div>
    <div class="g3">
      <div class="field"><label>Clasificación IMC</label><div class="computed">${cc.clasificacion_imc || '—'}</div></div>
      <div class="field"><label>Obesidad preclínica/clínica</label><select id="ob-tipo">
        <option value="">—</option>
        <option value="preclínica" ${ob.obesidad_prec_clinica==='preclínica'?'selected':''}>Preclínica</option>
        <option value="clínica" ${ob.obesidad_prec_clinica==='clínica'?'selected':''}>Clínica</option>
        <option value="sin obesidad" ${ob.obesidad_prec_clinica==='sin obesidad'?'selected':''}>Sin obesidad</option>
      </select></div>
      <div class="field"><label>Estadio</label><input id="ob-estadio" value="${ob.estadio||''}"></div>
      <div class="field"><label>Riesgo cardiometabólico</label><select id="ob-riesgo">
        <option value="">—</option>
        <option value="bajo" ${ob.riesgo_cardio==='bajo'?'selected':''}>Bajo</option>
        <option value="moderado" ${ob.riesgo_cardio==='moderado'?'selected':''}>Moderado</option>
        <option value="alto" ${ob.riesgo_cardio==='alto'?'selected':''}>Alto</option>
        <option value="muy_alto" ${ob.riesgo_cardio==='muy_alto'?'selected':''}>Muy alto</option>
      </select></div>
    </div>
    ${ob.obscore_pct !== null && ob.obscore_pct !== undefined ? `
    <div class="alert alert-${ob.obscore_nivel==='alto'?'danger':ob.obscore_nivel==='moderado'?'warn':'ok'}" style="margin-top:12px">
      <strong>OBSCORE: ${ob.obscore_pct}% — ${ob.obscore_nivel?.toUpperCase()}</strong>
      · Demircan K et al. Nat Med 2026.
    </div>` : ''}
  </div>

  <!-- ── PATRÓN HORARIO (TRE / TREAD) ────────────────────── -->
  <div class="card">
    <div class="card-title">⏱ Patrón horario de alimentación <span style="font-size:11px;font-weight:400;color:var(--muted)">TREAD 2024 · TRE 10 h → −4.6% peso, ↓ grasa visceral</span></div>
    <div class="g4">
      <div class="field"><label>Hora primera ingesta</label>
        <input type="time" id="ob-h-primera" value="${ob.hora_primera_ingesta||''}">
      </div>
      <div class="field"><label>Hora última ingesta</label>
        <input type="time" id="ob-h-ultima" value="${ob.hora_ultima_ingesta||''}">
      </div>
      <div class="field"><label>Ventana alimentaria habitual</label>
        <select id="ob-ventana">
          <option value="">—</option>
          <option value="<10h"  ${ob.ventana_alimentaria==='<10h' ?'selected':''}>&lt;10 h (TRE estricto)</option>
          <option value="10-12h"${ob.ventana_alimentaria==='10-12h'?'selected':''}>10–12 h (TRE moderado)</option>
          <option value="12-14h"${ob.ventana_alimentaria==='12-14h'?'selected':''}>12–14 h (estándar)</option>
          <option value=">14h"  ${ob.ventana_alimentaria==='>14h' ?'selected':''}>&gt;14 h (ventana amplia)</option>
        </select>
      </div>
      <div class="field"><label>TRE prescrito</label>
        <select id="ob-tre-pres">
          <option value="">—</option>
          <option value="no"     ${ob.tre_prescrito==='no'    ?'selected':''}>No</option>
          <option value="8h"     ${ob.tre_prescrito==='8h'    ?'selected':''}>TRE 8 h (16:8)</option>
          <option value="10h"    ${ob.tre_prescrito==='10h'   ?'selected':''}>TRE 10 h ✦ TREAD</option>
          <option value="12h"    ${ob.tre_prescrito==='12h'   ?'selected':''}>TRE 12 h</option>
          <option value="5:2"    ${ob.tre_prescrito==='5:2'   ?'selected':''}>Ayuno 5:2</option>
        </select>
      </div>
      <div class="field" style="grid-column:span 2"><label>Horario prescrito</label>
        <input id="ob-tre-horario" placeholder="Ej: primera ingesta 8:00 am · última 6:00 pm · agua/café sin calorías fuera" value="${ob.tre_horario||''}">
      </div>
      <div class="field"><label>Semanas en TRE</label>
        <input type="number" id="ob-tre-sem" value="${ob.tre_semanas||''}" min="0" placeholder="0">
      </div>
      <div class="field"><label>Adherencia TRE</label>
        <select id="ob-tre-adh">
          <option value="">—</option>
          <option value="alta"   ${ob.tre_adherencia==='alta'  ?'selected':''}>Alta (&gt;5 d/sem)</option>
          <option value="media"  ${ob.tre_adherencia==='media' ?'selected':''}>Media (3–4 d/sem)</option>
          <option value="baja"   ${ob.tre_adherencia==='baja'  ?'selected':''}>Baja (&lt;3 d/sem)</option>
        </select>
      </div>
    </div>
  </div>

  <!-- ── ESCALÓN TERAPÉUTICO (POWER 2026) ─────────────────── -->
  <div class="card">
    <div class="card-title">⚕ Escalón terapéutico actual <span style="font-size:11px;font-weight:400;color:var(--muted)">POWER 2026 — enfoque escalonado y complementario</span></div>
    <div style="display:flex;flex-wrap:wrap;gap:10px;margin-bottom:12px">
      ${escalonOpts.map(([k,l]) => `
        <label style="display:flex;align-items:center;gap:7px;cursor:pointer;font-size:13px;background:var(--bg2);border:1px solid var(--border);border-radius:20px;padding:5px 14px;transition:.15s"
               onmouseover="this.style.borderColor='var(--accent)'" onmouseout="this.style.borderColor='var(--border)'">
          <input type="checkbox" id="ob-esc-${k}" ${ob['escal_'+k]?'checked':''}> ${l}
        </label>`).join('')}
    </div>
    <div class="g2">
      <div class="field"><label>Tiempo en tratamiento actual</label>
        <input id="ob-esc-tiempo" placeholder="Ej: 3 meses con GLP-1 + TRE" value="${ob.escal_tiempo||''}">
      </div>
      <div class="field"><label>Respuesta al tratamiento</label>
        <select id="ob-esc-resp">
          <option value="">—</option>
          <option value="excelente" ${ob.escal_respuesta==='excelente'?'selected':''}>Excelente (&gt;10% peso)</option>
          <option value="buena"     ${ob.escal_respuesta==='buena'    ?'selected':''}>Buena (5–10%)</option>
          <option value="parcial"   ${ob.escal_respuesta==='parcial'  ?'selected':''}>Parcial (2–5%)</option>
          <option value="nula"      ${ob.escal_respuesta==='nula'     ?'selected':''}>Sin respuesta (&lt;2%)</option>
        </select>
      </div>
      <div class="field" style="grid-column:span 2"><label>Plan de escalada / ajuste</label>
        <textarea id="ob-esc-plan" rows="2" placeholder="Ej: Agregar tirzepatida si no respuesta a 12 sem con semaglutida + TRE 10h">${ob.escal_plan||''}</textarea>
      </div>
    </div>
  </div>

  <!-- ── COMPLICACIONES ─────────────────────────────────────── -->
  <div class="card">
    <div class="card-title">Complicaciones relacionadas con obesidad</div>
    <div class="g4">
      ${['dm2','hta','dislipidemia','higado_graso','saos','artrosis','depresion'].map(c => `
        <label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-size:13px">
          <input type="checkbox" id="ob-${c}" ${ob['comp_'+c]?'checked':''}> ${c.replace(/_/g,' ').replace(/\b\w/g,l=>l.toUpperCase())}
        </label>`).join('')}
    </div>
    <div class="field" style="margin-top:10px"><label>Otras complicaciones</label><textarea id="ob-otras">${ob.comp_otras||''}</textarea></div>
  </div>
  <div style="text-align:right"><button class="btn btn-success" onclick="saveObesidad()">Guardar módulo obesidad</button></div>`;
}

function renderTabSaludMental(sm) {
  const phq9q = [
    'Poco interés o placer en hacer cosas',
    'Se ha sentido deprimido/a',
    'Problemas para dormir',
    'Poca energía o cansancio',
    'Poco apetito o comer en exceso',
    'Sentirse mal consigo mismo/a',
    'Dificultad para concentrarse',
    'Moverse o hablar lento / agitación',
    'Pensamientos de hacerse daño'
  ];
  const gad7q = [
    'Sentirse nervioso/a o tenso/a',
    'No poder dejar de preocuparse',
    'Preocuparse demasiado',
    'Dificultad para relajarse',
    'Tan inquieto/a que no puede estar quieto/a',
    'Fácilmente molesto/a o irritable',
    'Sentir miedo como si fuera a pasar algo terrible'
  ];
  return `
  <div class="g2" style="gap:14px">
    <div class="card">
      <div class="card-title">PHQ-9 — Detección depresión</div>
      ${phq9q.map((q,i) => `
        <div style="margin-bottom:10px">
          <div style="font-size:12px;margin-bottom:5px;color:var(--text2)">${i+1}. ${q}</div>
          <div class="likert" id="phq9-${i+1}">
            ${['Nunca','Varios días','Más de la mitad','Casi todos'].map((l,v) =>
              `<div class="likert-opt${sm[`phq9_${i+1}`]===v?' selected':''}" onclick="selectLikert('phq9-${i+1}',${v},this)" style="font-size:10px">${l}</div>`
            ).join('')}
          </div>
        </div>`).join('')}
      <div style="font-size:13px;margin-top:8px">Total: <span class="mono" id="phq9-total">${sm.phq9_total ?? '—'}</span> · <span id="phq9-sev">${sm.phq9_severidad || '—'}</span></div>
    </div>
    <div>
      <div class="card" style="margin-bottom:12px">
        <div class="card-title">GAD-7 — Ansiedad generalizada</div>
        ${gad7q.map((q,i) => `
          <div style="margin-bottom:10px">
            <div style="font-size:12px;margin-bottom:5px;color:var(--text2)">${i+1}. ${q}</div>
            <div class="likert" id="gad7-${i+1}">
              ${['Nunca','Varios días','Más de la mitad','Casi todos'].map((l,v) =>
                `<div class="likert-opt${sm[`gad7_${i+1}`]===v?' selected':''}" onclick="selectLikert('gad7-${i+1}',${v},this)" style="font-size:10px">${l}</div>`
              ).join('')}
            </div>
          </div>`).join('')}
        <div style="font-size:13px;margin-top:8px">Total: <span class="mono" id="gad7-total">${sm.gad7_total ?? '—'}</span> · <span id="gad7-sev">${sm.gad7_severidad || '—'}</span></div>
      </div>
      <div class="card">
        <div class="card-title">Conducta alimentaria / Sueño</div>
        <div class="g2">
          <div class="field"><label>Comer emocional (0–10)</label><input type="number" min="0" max="10" id="sm-cemoc" value="${sm.comer_emocional??''}"></div>
          <div class="field"><label>Frecuencia atracones</label><select id="sm-atrac">
            ${['nunca','<1/sem','1/sem','>1/sem','diario'].map(o => `<option value="${o}" ${sm.atracones_frecuencia===o?'selected':''}>${o}</option>`).join('')}
          </select></div>
          <div class="field"><label>Craving tipo</label><input id="sm-crav" value="${sm.craving_tipo||''}"></div>
          <div class="field"><label>Craving intensidad (0–10)</label><input type="number" min="0" max="10" id="sm-cravi" value="${sm.craving_intensidad??''}"></div>
          <div class="field"><label>Horas de sueño</label><input type="number" step="0.5" id="sm-hsueno" value="${sm.sueno_horas||''}"></div>
          <div class="field"><label>Calidad sueño (0–10)</label><input type="number" min="0" max="10" id="sm-qsueno" value="${sm.sueno_calidad??''}"></div>
        </div>
        ${sm.derivacion_psicologia || sm.derivacion_psiquiatria ? `
        <div class="alert alert-warn" style="margin-top:10px">
          ⚠ Derivación sugerida: ${sm.derivacion_psicologia?'Psicología ':''}${sm.derivacion_psiquiatria?'Psiquiatría':''}
        </div>` : ''}
      </div>
    </div>
  </div>
  <div style="text-align:right"><button class="btn btn-success" onclick="saveSaludMental()">Guardar salud mental</button></div>`;
}

function renderTabSibo(sibo) {
  const sintomas = [
    ['distension','Distensión abdominal'],
    ['dolor_abdominal','Dolor abdominal'],
    ['flatulencia','Flatulencia'],
    ['diarrea','Diarrea'],
    ['estrenimiento','Estreñimiento'],
    ['reflujo','Reflujo'],
    ['fatiga','Fatiga']
  ];
  return `
  <div class="card" style="margin-bottom:12px">
    <div class="card-title">Síntomas (0–10)</div>
    ${sintomas.map(([k,l]) => `
      <div class="symptom-row">
        <span class="symptom-label">${l}</span>
        <input type="range" class="symptom-slider" id="sibo-${k}" min="0" max="10" value="${sibo[k]||0}" oninput="document.getElementById('sv-${k}').textContent=this.value">
        <span class="symptom-val" id="sv-${k}">${sibo[k]||0}</span>
      </div>`).join('')}
  </div>
  <div class="g2" style="gap:12px">
    <div class="card">
      <div class="card-title">Factores de riesgo</div>
      <div class="g2">
        ${['ipt_previo','antibioticos_recientes','ibs_diagnostico','hipotiroidismo','diabetes','cirugia_gi'].map(k =>
          `<label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-size:13px">
            <input type="checkbox" id="sibo-${k}" ${sibo[k]?'checked':''}> ${k.replace(/_/g,' ')}
          </label>`
        ).join('')}
      </div>
    </div>
    <div class="card">
      <div class="card-title">Prueba respiratoria</div>
      <div class="g2">
        <div class="field"><label>Tipo</label><select id="sibo-prueba">
          ${['no_realizada','lactulose','glucosa','fructosa'].map(o =>
            `<option value="${o}" ${sibo.prueba_respiratoria===o?'selected':''}>${o}</option>`).join('')}
        </select></div>
        <div class="field"><label>Resultado</label><select id="sibo-resultado">
          ${['negativo','SIBO_H2','IMO_CH4','SIBO_H2S','mixto'].map(o =>
            `<option value="${o}" ${sibo.resultado_prueba===o?'selected':''}>${o}</option>`).join('')}
        </select></div>
        <div class="field"><label>Fecha prueba</label><input type="date" id="sibo-fprueba" value="${sibo.fecha_prueba||''}"></div>
        <div class="field"><label>Dieta indicada</label><select id="sibo-dieta">
          ${['ninguna','low_fodmap','especifica'].map(o =>
            `<option value="${o}" ${sibo.dieta_indicada===o?'selected':''}>${o}</option>`).join('')}
        </select></div>
      </div>
      <div class="field" style="margin-top:8px"><label>Tratamiento</label><textarea id="sibo-trat">${sibo.tratamiento||''}</textarea></div>
    </div>
  </div>
  <div style="text-align:right"><button class="btn btn-success" onclick="saveSibo()">Guardar SIBO/IMO</button></div>`;
}

function renderTabEii(eii) {
  return `
  <div class="card" style="margin-bottom:12px">
    <div class="card-title">Diagnóstico EII</div>
    <div class="g4">
      <div class="field"><label>Tipo</label><select id="eii-tipo">
        <option value="crohn" ${eii.tipo_eii==='crohn'?'selected':''}>Crohn</option>
        <option value="colitis_ulcerosa" ${eii.tipo_eii==='colitis_ulcerosa'?'selected':''}>Colitis ulcerosa</option>
        <option value="indeterminada" ${eii.tipo_eii==='indeterminada'?'selected':''}>Indeterminada</option>
      </select></div>
      <div class="field"><label>Localización</label><input id="eii-loc" value="${eii.localizacion||''}"></div>
      <div class="field"><label>Actividad clínica</label><select id="eii-activ">
        ${['remision','leve','moderada','grave'].map(o =>
          `<option value="${o}" ${eii.actividad===o?'selected':''}>${o}</option>`).join('')}
      </select></div>
      <div class="field"><label>Sarcopenia</label><select id="eii-sarco">
        ${['no','probable','confirmada','grave'].map(o =>
          `<option value="${o}" ${eii.sarcopenia===o?'selected':''}>${o}</option>`).join('')}
      </select></div>
    </div>
  </div>
  <div class="g2" style="gap:12px">
    <div class="card">
      <div class="card-title">PG-SGA</div>
      ${[['pgsa_perdida_peso','Pérdida de peso (0–4)',4],
         ['pgsa_ingesta','Ingesta (0–3)',3],
         ['pgsa_sintomas','Síntomas (0–3)',3],
         ['pgsa_actividad','Actividad (0–3)',3]].map(([k,l,max]) => `
        <div style="margin-bottom:10px">
          <div style="font-size:12px;margin-bottom:5px;color:var(--text2)">${l}</div>
          <div class="likert" id="${k}-likert">
            ${Array.from({length:max+1},(_,v) =>
              `<div class="likert-opt${eii[k]===v?' selected':''}" onclick="selectLikert('${k}-likert',${v},this)">${v}</div>`
            ).join('')}
          </div>
        </div>`).join('')}
      <div style="font-size:13px;margin-top:8px">Total: <span class="mono" id="pgsa-total">${eii.pgsa_total ?? '—'}</span> · <span id="pgsa-cat">${eii.pgsa_categoria || '—'}</span></div>
    </div>
    <div class="card">
      <div class="card-title">GLIM / Déficits nutricionales</div>
      <div class="g2" style="margin-bottom:10px">
        <div class="field"><label>Fenotípico</label><input id="eii-glim-f" value="${eii.glim_fenotipico||''}"></div>
        <div class="field"><label>Etiológico</label><input id="eii-glim-e" value="${eii.glim_etiologico||''}"></div>
        <div class="field"><label>Diagnóstico GLIM</label><select id="eii-glim-d">
          ${['sin_desnutricion','leve_moderada','severa'].map(o =>
            `<option value="${o}" ${eii.glim_diagnostico===o?'selected':''}>${o}</option>`).join('')}
        </select></div>
      </div>
      <div style="font-size:11px;color:var(--muted);margin-bottom:8px;font-weight:600">Déficits</div>
      <div class="g3">
        ${['fe','b12','d','zinc','folato'].map(d =>
          `<label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-size:13px">
            <input type="checkbox" id="eii-def-${d}" ${eii['deficit_'+d]?'checked':''}> ${d.toUpperCase()}
          </label>`).join('')}
      </div>
    </div>
  </div>
  <div style="text-align:right"><button class="btn btn-success" onclick="saveEii()">Guardar EII</button></div>`;
}

// ── EVOLUCIÓN ─────────────────────────────────────────────────
async function loadEvolucion(pid) {
  const data = await api(`/pacientes/${pid}/evolucion`);
  const el = document.getElementById('evolucionContent');
  if (!data || !data.length) {
    el.innerHTML = '<div class="empty-state"><p>Sin datos de evolución registrados.</p></div>';
    return;
  }

  el.innerHTML = `
    <div class="card" style="margin-bottom:14px">
      <div class="card-title">Evolución peso y composición corporal</div>
      <div class="chart-wrap" style="height:220px"><canvas id="evoChart1"></canvas></div>
    </div>
    <div class="card">
      <div class="card-title">Evolución metabólica</div>
      <div class="chart-wrap" style="height:180px"><canvas id="evoChart2"></canvas></div>
    </div>`;

  const labels = data.map(d => fmtDate(d.fecha));

  if (State.charts.evo1) State.charts.evo1.destroy();
  if (State.charts.evo2) State.charts.evo2.destroy();

  State.charts.evo1 = new Chart(document.getElementById('evoChart1'), {
    type: 'line',
    data: { labels, datasets: [
      { label: 'Peso (kg)', data: data.map(d => d.peso), borderColor: '#4f8ef7', tension: .3, pointRadius: 4, fill: false },
      { label: '% Grasa', data: data.map(d => d.pct_grasa), borderColor: '#e05c5c', tension: .3, pointRadius: 4, fill: false },
      { label: 'Músculo (kg)', data: data.map(d => d.kg_masa_muscular), borderColor: '#34c78a', tension: .3, pointRadius: 4, fill: false },
    ]},
    options: chartOpts()
  });

  State.charts.evo2 = new Chart(document.getElementById('evoChart2'), {
    type: 'line',
    data: { labels, datasets: [
      { label: 'HOMA-IR', data: data.map(d => d.homa_ir), borderColor: '#f0a742', tension: .3, pointRadius: 4, fill: false },
      { label: 'HbA1c (%)', data: data.map(d => d.hba1c), borderColor: '#a78bfa', tension: .3, pointRadius: 4, fill: false },
    ]},
    options: chartOpts()
  });
}

function chartOpts() {
  return {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { labels: { color: '#6b7280', font: { size: 11 } } } },
    scales: {
      x: { ticks: { color: '#6b7280', font: { size: 11 } }, grid: { color: '#252a38' } },
      y: { ticks: { color: '#6b7280', font: { size: 11 } }, grid: { color: '#252a38' } }
    }
  };
}

// ── AUTO CÁLCULOS ─────────────────────────────────────────────
function autoCalcCC() {
  const peso = parseFloat(document.getElementById('cc-peso')?.value);
  const talla = parseFloat(document.getElementById('cc-talla')?.value);
  const cintura = parseFloat(document.getElementById('cc-cintura')?.value);
  const cadera = parseFloat(document.getElementById('cc-cadera')?.value);

  if (peso && talla) {
    const imc = (peso / (talla / 100) ** 2);
    document.getElementById('cc-imc').textContent = imc.toFixed(1) + ' kg/m²';
    const cls = imc < 18.5 ? 'Bajo peso' : imc < 25 ? 'Normal' : imc < 30 ? 'Sobrepeso' :
      imc < 35 ? 'Obesidad G1' : imc < 40 ? 'Obesidad G2' : 'Obesidad G3';
    const el = document.getElementById('cc-cls');
    el.textContent = cls;
    el.style.color = imc < 25 ? 'var(--accent2)' : imc < 30 ? 'var(--warn)' : 'var(--danger)';
  }
  if (cintura && talla) {
    document.getElementById('cc-ct').textContent = (cintura / talla).toFixed(3);
  }
  if (cintura && cadera) {
    document.getElementById('cc-cc').textContent = (cintura / cadera).toFixed(3);
  }
}

function autoCalcGET() {
  const tmb = parseFloat(document.getElementById('cc-tmb')?.value);
  const f = parseFloat(document.getElementById('cc-factor')?.value) || 1.4;
  const peso = parseFloat(document.getElementById('cc-peso')?.value);
  if (tmb) {
    document.getElementById('cc-get').textContent = Math.round(tmb * f) + ' kcal';
    if (peso) document.getElementById('cc-prot').textContent =
      (peso * 1.4).toFixed(0) + '–' + (peso * 1.6).toFixed(0) + ' g/día';
  }
}

// ── LIKERT ────────────────────────────────────────────────────
function selectLikert(groupId, val, el) {
  document.querySelectorAll(`#${groupId} .likert-opt`).forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
  el.dataset.val = val;
}

function getLikertVal(groupId) {
  const sel = document.querySelector(`#${groupId} .likert-opt.selected`);
  return sel ? parseInt(sel.dataset.val ?? sel.textContent) : null;
}

// ── SAVE FUNCTIONS ────────────────────────────────────────────
async function saveCC() {
  const vid = State.currentVisita?.id;
  if (!vid) return;
  const hd = [1,2,3].map(i => parseFloat(document.getElementById(`cc-hd${i}`)?.value) || null);
  const hi = [1,2,3].map(i => parseFloat(document.getElementById(`cc-hi${i}`)?.value) || null);
  const sarcf = ['carga','asistencia','levantarse','escaleras','caidas'].map((k,i) => getLikertVal(`sarcf-${i}`));
  const body = {
    fecha: document.getElementById('cc-fecha')?.value || today(),
    equipo: document.getElementById('cc-equipo')?.value,
    peso: parseFloat(document.getElementById('cc-peso')?.value) || null,
    talla: parseFloat(document.getElementById('cc-talla')?.value) || null,
    cintura: parseFloat(document.getElementById('cc-cintura')?.value) || null,
    cadera: parseFloat(document.getElementById('cc-cadera')?.value) || null,
    pantorrilla: parseFloat(document.getElementById('cc-pant')?.value) || null,
    pct_grasa: parseFloat(document.getElementById('cc-pgrasa')?.value) || null,
    kg_grasa: parseFloat(document.getElementById('cc-kgrasa')?.value) || null,
    kg_masa_magra: parseFloat(document.getElementById('cc-magra')?.value) || null,
    kg_masa_muscular: parseFloat(document.getElementById('cc-muscular')?.value) || null,
    agua_corporal: parseFloat(document.getElementById('cc-agua')?.value) || null,
    masa_osea: parseFloat(document.getElementById('cc-osea')?.value) || null,
    edad_metabolica: parseInt(document.getElementById('cc-edadmet')?.value) || null,
    tmb_equipo: parseFloat(document.getElementById('cc-tmb')?.value) || null,
    factor_actividad: parseFloat(document.getElementById('cc-factor')?.value) || 1.4,
    handgrip_der_1: hd[0], handgrip_der_2: hd[1], handgrip_der_3: hd[2],
    handgrip_izq_1: hi[0], handgrip_izq_2: hi[1], handgrip_izq_3: hi[2],
    sit_to_stand_reps: parseInt(document.getElementById('cc-sts')?.value) || null,
    sarcf_carga: sarcf[0], sarcf_asistencia: sarcf[1], sarcf_levantarse: sarcf[2],
    sarcf_escaleras: sarcf[3], sarcf_caidas: sarcf[4],
  };
  const res = await api(`/visitas/${vid}/composicion`, 'POST', body);
  if (res) {
    document.getElementById('cc-imc').textContent = res.imc ? res.imc + ' kg/m²' : '—';
    document.getElementById('cc-cls').textContent = res.clasificacion_imc || '—';
  }
  toast('Composición corporal guardada ✓');
}

async function saveAnaliticas() {
  const vid = State.currentVisita?.id;
  if (!vid) return;
  const fields = ['glucemia_ayunas','insulina_ayunas','hba1c','glucemia_2h',
    'colesterol_total','ldl','hdl','trigliceridos','apob',
    'creatinina','urea','acido_urico','microalbuminuria',
    'alt','ast','ggt','fosfatasa_alcalina','bilirrubina_total',
    'tsh','t4_libre','pcr_us','ferritina','hierro_serico',
    'vitamina_d','vitamina_b12','folato','magnesio','zinc','hemoglobina'];
  const body = {};
  fields.forEach(f => {
    const val = parseFloat(document.getElementById(`an-${f}`)?.value);
    if (!isNaN(val)) body[f] = val;
  });
  const res = await api(`/visitas/${vid}/analiticas`, 'POST', body);
  if (res) {
    if (res.homa_ir) {
      document.getElementById('homa-val').textContent = res.homa_ir.toFixed(2);
      document.getElementById('homa-interp').textContent = res.homa_interpretacion;
      document.getElementById('homa-display').style.display = 'flex';
    }
    if (res.egfr) document.getElementById('an-egfr').textContent =
      `${res.egfr} mL/min — ${res.egfr_estadio}`;
    if (res.no_hdl) document.getElementById('an-nohdl').textContent = res.no_hdl + ' mg/dL';
    if (res.indice_aterogenico) document.getElementById('an-ia').textContent = res.indice_aterogenico;
  }
  toast('Analíticas guardadas ✓');
}

async function saveReg24() {
  const vid = State.currentVisita?.id;
  if (!vid) return;
  const body = {
    desayuno: document.getElementById('r24-desayuno')?.value,
    media_manana: document.getElementById('r24-media_manana')?.value,
    almuerzo: document.getElementById('r24-almuerzo')?.value,
    merienda: document.getElementById('r24-merienda')?.value,
    cena: document.getElementById('r24-cena')?.value,
    otros: document.getElementById('r24-otros')?.value,
    kcal_estimadas: parseFloat(document.getElementById('r24-kcal')?.value) || null,
    proteinas_g: parseFloat(document.getElementById('r24-prot')?.value) || null,
    carbohidratos_g: parseFloat(document.getElementById('r24-cho')?.value) || null,
    grasas_g: parseFloat(document.getElementById('r24-fat')?.value) || null,
    fibra_g: parseFloat(document.getElementById('r24-fibra')?.value) || null,
    agua_l: parseFloat(document.getElementById('r24-agua')?.value) || null,
    dia_tipico: parseInt(document.getElementById('r24-tipico')?.value),
    observaciones: document.getElementById('r24-obs')?.value,
  };
  await api(`/visitas/${vid}/registro24h`, 'POST', body);
  toast('Registro 24h guardado ✓');
}

async function saveFreq() {
  const vid = State.currentVisita?.id;
  if (!vid) return;
  const items = FREQ_GROUPS.map(g => ({
    grupo: g,
    frecuencia: document.querySelector(`.freq-sel[data-grupo="${g}"]`)?.value,
    porcion: document.querySelector(`.freq-por[data-grupo="${g}"]`)?.value,
    observacion: document.querySelector(`.freq-obs[data-grupo="${g}"]`)?.value,
  }));
  await api(`/visitas/${vid}/frecuencia`, 'POST', items);
  toast('Frecuencia de consumo guardada ✓');
}

async function savePlan() {
  const vid = State.currentVisita?.id;
  if (!vid) return;
  const body = {
    objetivo_principal: document.getElementById('pn-obj')?.value,
    peso_objetivo: parseFloat(document.getElementById('pn-pesobj')?.value) || null,
    kcal_prescritas: parseFloat(document.getElementById('pn-kcal')?.value) || null,
    proteina_prescrita: parseFloat(document.getElementById('pn-prot')?.value) || null,
    agua_recomendada: parseFloat(document.getElementById('pn-agua')?.value) || null,
    deficit_superavit: parseFloat(document.getElementById('pn-def')?.value) || null,
    plantilla_dieta: document.getElementById('pn-dieta')?.value,
    suplementacion: document.getElementById('pn-supl')?.value,
    indicaciones: document.getElementById('pn-ind')?.value,
    proxima_evaluacion: document.getElementById('pn-prox')?.value,
  };
  await api(`/visitas/${vid}/plan`, 'POST', body);
  toast('Plan nutricional guardado ✓');
}

async function saveObesidad() {
  const vid = State.currentVisita?.id;
  if (!vid) return;
  const g = id => document.getElementById(id);
  const chk = id => g(id)?.checked ? 1 : 0;
  const body = {
    // Clasificación
    obesidad_prec_clinica: g('ob-tipo')?.value,
    estadio:               g('ob-estadio')?.value,
    riesgo_cardio:         g('ob-riesgo')?.value,
    // TRE / patrón horario
    hora_primera_ingesta:  g('ob-h-primera')?.value,
    hora_ultima_ingesta:   g('ob-h-ultima')?.value,
    ventana_alimentaria:   g('ob-ventana')?.value,
    tre_prescrito:         g('ob-tre-pres')?.value,
    tre_horario:           g('ob-tre-horario')?.value,
    tre_semanas:           parseInt(g('ob-tre-sem')?.value)||null,
    tre_adherencia:        g('ob-tre-adh')?.value,
    // Escalón terapéutico
    escal_estilo_vida: chk('ob-esc-estilo_vida'),
    escal_tre:         chk('ob-esc-tre'),
    escal_ejercicio:   chk('ob-esc-ejercicio'),
    escal_metformina:  chk('ob-esc-metformina'),
    escal_glp1:        chk('ob-esc-glp1'),
    escal_gip_glp1:    chk('ob-esc-gip_glp1'),
    escal_combinada:   chk('ob-esc-combinada'),
    escal_endoscopia:  chk('ob-esc-endoscopia'),
    escal_cirugia:     chk('ob-esc-cirugia'),
    escal_tiempo:      g('ob-esc-tiempo')?.value,
    escal_respuesta:   g('ob-esc-resp')?.value,
    escal_plan:        g('ob-esc-plan')?.value,
    // Complicaciones
    comp_dm2:          chk('ob-dm2'),
    comp_hta:          chk('ob-hta'),
    comp_dislipidemia: chk('ob-dislipidemia'),
    comp_higado_graso: chk('ob-higado_graso'),
    comp_saos:         chk('ob-saos'),
    comp_artrosis:     chk('ob-artrosis'),
    comp_depresion:    chk('ob-depresion'),
    comp_otras:        g('ob-otras')?.value,
  };
  const res = await api(`/visitas/${vid}/obesidad`, 'POST', body);
  if (res?.obscore_pct != null) toast(`OBSCORE: ${res.obscore_pct}% — ${res.obscore_nivel} ✓`);
  else toast('Módulo obesidad guardado ✓');
}

async function saveSaludMental() {
  const vid = State.currentVisita?.id;
  if (!vid) return;
  const body = { comer_emocional: parseInt(document.getElementById('sm-cemoc')?.value)||null,
    atracones_frecuencia: document.getElementById('sm-atrac')?.value,
    craving_tipo: document.getElementById('sm-crav')?.value,
    craving_intensidad: parseInt(document.getElementById('sm-cravi')?.value)||null,
    sueno_horas: parseFloat(document.getElementById('sm-hsueno')?.value)||null,
    sueno_calidad: parseInt(document.getElementById('sm-qsueno')?.value)||null,
  };
  for (let i = 1; i <= 9; i++) body[`phq9_${i}`] = getLikertVal(`phq9-${i}`);
  for (let i = 1; i <= 7; i++) body[`gad7_${i}`] = getLikertVal(`gad7-${i}`);
  const res = await api(`/visitas/${vid}/salud_mental`, 'POST', body);
  if (res) {
    document.getElementById('phq9-total').textContent = res.phq9_total ?? '—';
    document.getElementById('phq9-sev').textContent = res.phq9_severidad || '—';
    document.getElementById('gad7-total').textContent = res.gad7_total ?? '—';
    document.getElementById('gad7-sev').textContent = res.gad7_severidad || '—';
  }
  toast('Salud mental guardada ✓');
}

async function saveSibo() {
  const vid = State.currentVisita?.id;
  if (!vid) return;
  const sintomas = ['distension','dolor_abdominal','flatulencia','diarrea','estrenimiento','reflujo','fatiga'];
  const body = {};
  sintomas.forEach(k => body[k] = parseInt(document.getElementById(`sibo-${k}`)?.value) || 0);
  ['ipt_previo','antibioticos_recientes','ibs_diagnostico','hipotiroidismo','diabetes','cirugia_gi']
    .forEach(k => body[k] = document.getElementById(`sibo-${k}`)?.checked ? 1 : 0);
  body.prueba_respiratoria = document.getElementById('sibo-prueba')?.value;
  body.resultado_prueba = document.getElementById('sibo-resultado')?.value;
  body.fecha_prueba = document.getElementById('sibo-fprueba')?.value;
  body.dieta_indicada = document.getElementById('sibo-dieta')?.value;
  body.tratamiento = document.getElementById('sibo-trat')?.value;
  await api(`/visitas/${vid}/sibo`, 'POST', body);
  toast('SIBO/IMO guardado ✓');
}

async function saveEii() {
  const vid = State.currentVisita?.id;
  if (!vid) return;
  const body = {
    tipo_eii: document.getElementById('eii-tipo')?.value,
    localizacion: document.getElementById('eii-loc')?.value,
    actividad: document.getElementById('eii-activ')?.value,
    sarcopenia: document.getElementById('eii-sarco')?.value,
    glim_fenotipico: document.getElementById('eii-glim-f')?.value,
    glim_etiologico: document.getElementById('eii-glim-e')?.value,
    glim_diagnostico: document.getElementById('eii-glim-d')?.value,
    pgsa_perdida_peso: getLikertVal('pgsa_perdida_peso-likert'),
    pgsa_ingesta: getLikertVal('pgsa_ingesta-likert'),
    pgsa_sintomas: getLikertVal('pgsa_sintomas-likert'),
    pgsa_actividad: getLikertVal('pgsa_actividad-likert'),
  };
  ['fe','b12','d','zinc','folato'].forEach(d =>
    body[`deficit_${d}`] = document.getElementById(`eii-def-${d}`)?.checked ? 1 : 0);
  const res = await api(`/visitas/${vid}/eii`, 'POST', body);
  if (res) {
    document.getElementById('pgsa-total').textContent = res.pgsa_total ?? '—';
    document.getElementById('pgsa-cat').textContent = res.pgsa_categoria || '—';
  }
  toast('EII guardada ✓');
}

// ── ESTADÍSTICAS ──────────────────────────────────────────────
async function loadEstadisticas() {
  const data = await api('/estadisticas');
  if (!data) return;

  document.getElementById('est-total').textContent = data.total_pacientes;

  const instMap = {};
  (data.por_institucion || []).forEach(r => instMap[r.institucion] = r.n);
  document.getElementById('est-um').textContent = instMap.UM || 0;
  document.getElementById('est-mat').textContent = instMap.MAT || 0;
  document.getElementById('est-priv').textContent = instMap.PRIVADA || 0;
  document.getElementById('est-ri').textContent = data.resistencia_insulina || 0;

  // Charts
  ['estChart1','estChart2'].forEach(id => {
    if (State.charts[id]) State.charts[id].destroy();
  });

  if (data.imc_distribucion?.length) {
    State.charts.estChart1 = new Chart(document.getElementById('estChart1'), {
      type: 'doughnut',
      data: {
        labels: data.imc_distribucion.map(r => r.clasificacion_imc || 'Sin datos'),
        datasets: [{ data: data.imc_distribucion.map(r => r.n),
          backgroundColor: ['#34c78a','#4f8ef7','#f0a742','#e05c5c','#a78bfa','#2dd4bf'], borderWidth: 0 }]
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: '#6b7280', font: { size: 11 } } } } }
    });
  }

  if (data.obscore_distribucion?.length) {
    State.charts.estChart2 = new Chart(document.getElementById('estChart2'), {
      type: 'bar',
      data: {
        labels: data.obscore_distribucion.map(r => r.obscore_nivel || 'Sin datos'),
        datasets: [{ label: 'Pacientes', data: data.obscore_distribucion.map(r => r.n),
          backgroundColor: ['#34c78a','#f0a742','#e05c5c'], borderRadius: 5 }]
      },
      options: { ...chartOpts(), plugins: { legend: { display: false } } }
    });
  }
}

// ── OVERLAY HELPERS ───────────────────────────────────────────
function closeOverlay(id) {
  document.getElementById(id)?.classList.remove('open');
}

function initVisitaForms(v) {
  // noop — forms initialized inline
}

// ════════════════════════════════════════════════════════════
// IMPORTACIÓN MDB / CSV
// ════════════════════════════════════════════════════════════

async function importarMDB(inputId, inst) {
  const input = document.getElementById(inputId);
  const file = input?.files?.[0];
  const statusEl = document.getElementById('st' + inst);

  if (!file) return;

  statusEl.style.color = 'var(--warn)';
  statusEl.textContent = '⏳ Procesando ' + file.name + '…';

  const formData = new FormData();
  formData.append('file', file);
  formData.append('institucion', inst);

  try {
    const endpoint = file.name.toLowerCase().endsWith('.csv')
      ? '/api/importar/csv'
      : '/api/importar/mdb';

    const r = await fetch(API + endpoint, { method: 'POST', body: formData });
    const j = await r.json();

    if (j.status === 'error') throw new Error(j.msg);

    const d = j.data;
    statusEl.style.color = 'var(--accent2)';
    statusEl.innerHTML = `
      ✓ <strong>${d.importados}</strong> pacientes importados
      ${d.duplicados ? `· ${d.duplicados} duplicados omitidos` : ''}
      ${d.errores ? `· ${d.errores} errores` : ''}
    `;

    if (d.muestra?.length) {
      statusEl.innerHTML += `<br><span style="font-size:10px;color:var(--muted)">
        Muestra: ${d.muestra.map(p => p.nombre + ' ' + p.apellidos).join(', ')}
      </span>`;
    }

    if (d.importados > 0) {
      setTimeout(() => {
        showView('pacientes', document.querySelector('.nav-btn'));
        loadPacientes();
        toast(`✓ ${d.importados} pacientes importados desde ${inst}`, 'ok');
      }, 1200);
    }
  } catch (e) {
    statusEl.style.color = 'var(--danger)';
    statusEl.textContent = '✗ Error: ' + e.message;
  }
}

async function cargarDemo(inst) {
  const r = await fetch(API + '/api/importar/demo', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ institucion: inst })
  });
  const j = await r.json();
  if (j.status === 'ok') {
    toast('Datos demo cargados ✓');
    loadPacientes();
    showView('pacientes', document.querySelector('.nav-btn'));
  }
}

// ════════════════════════════════════════════════════════════
// CRONOLOGÍA DE ANALÍTICAS
// ════════════════════════════════════════════════════════════

async function loadCronologia(pid) {
  const el = document.getElementById('cronologiaContent');
  if (!el) return;
  el.innerHTML = '<div class="loading"><div class="spinner"></div> Cargando cronología…</div>';

  const data = await api(`/pacientes/${pid}/cronologia`);
  if (!data) return;

  const { composicion, analiticas, series, resumen } = data;

  if (!composicion.length && !analiticas.length) {
    el.innerHTML = '<div class="empty-state"><p>Sin datos de seguimiento aún.<br>Registra visitas con composición corporal y analíticas.</p></div>';
    return;
  }

  // Destruir charts previos
  ['crChart1','crChart2','crChart3','crChart4'].forEach(id => {
    if (State.charts[id]) { State.charts[id].destroy(); delete State.charts[id]; }
  });

  el.innerHTML = `
    <!-- RESUMEN DE CAMBIOS -->
    ${Object.keys(resumen).length ? `
    <div class="card" style="margin-bottom:14px">
      <div class="card-title">Resumen de cambios — Desde primera visita</div>
      <div style="display:flex;flex-wrap:wrap;gap:10px">
        ${Object.values(resumen).map(r => `
          <div style="background:var(--bg);border:1px solid var(--border);border-radius:8px;padding:12px 14px;min-width:140px">
            <div style="font-size:11px;color:var(--muted);margin-bottom:4px">${r.label}</div>
            <div style="font-size:18px;font-weight:700;font-family:'JetBrains Mono',monospace">${r.actual !== null ? r.actual + (r.unit ? ' ' + r.unit : '') : '—'}</div>
            ${r.delta !== null ? `
            <div style="font-size:12px;margin-top:3px;color:${r.tendencia === 'mejora' ? 'var(--accent2)' : r.tendencia === 'empeora' ? 'var(--danger)' : 'var(--muted)'}">
              ${r.delta > 0 ? '▲' : r.delta < 0 ? '▼' : '→'} ${Math.abs(r.delta)} ${r.unit}
              ${r.delta_pct !== null ? `(${r.delta_pct > 0 ? '+' : ''}${r.delta_pct}%)` : ''}
              · <span style="font-size:10px">${r.tendencia}</span>
            </div>` : ''}
            <div style="font-size:10px;color:var(--muted);margin-top:2px">Inicio: ${r.baseline !== null ? r.baseline + (r.unit ? ' ' + r.unit : '') : '—'}</div>
          </div>
        `).join('')}
      </div>
    </div>` : ''}

    <!-- GRÁFICAS COMPOSICIÓN -->
    ${composicion.length >= 1 ? `
    <div class="card" style="margin-bottom:14px">
      <div class="card-title">Evolución — Composición corporal</div>
      <div class="chart-wrap" style="height:200px"><canvas id="crChart1"></canvas></div>
    </div>
    <div class="g2" style="gap:14px;margin-bottom:14px">
      <div class="card">
        <div class="card-title">Peso e IMC</div>
        <div class="chart-wrap" style="height:160px"><canvas id="crChart2"></canvas></div>
      </div>
      <div class="card">
        <div class="card-title">Cintura y relación cintura/talla</div>
        <div class="chart-wrap" style="height:160px"><canvas id="crChart5"></canvas></div>
      </div>
    </div>` : ''}

    <!-- GRÁFICAS ANALÍTICAS -->
    ${analiticas.length >= 1 ? `
    <div class="g2" style="gap:14px;margin-bottom:14px">
      <div class="card">
        <div class="card-title">Glucometabolismo — HOMA-IR / HbA1c / Glucemia</div>
        <div class="chart-wrap" style="height:180px"><canvas id="crChart3"></canvas></div>
      </div>
      <div class="card">
        <div class="card-title">Perfil lipídico</div>
        <div class="chart-wrap" style="height:180px"><canvas id="crChart4"></canvas></div>
      </div>
    </div>` : ''}

    <!-- TABLA CRONOLÓGICA ANALÍTICAS -->
    ${analiticas.length ? `
    <div class="card" style="margin-bottom:14px">
      <div class="card-title">Tabla cronológica — Analíticas</div>
      <div style="overflow-x:auto">
        <table style="width:100%;border-collapse:collapse;font-size:12px;white-space:nowrap">
          <thead>
            <tr style="border-bottom:1px solid var(--border)">
              <th style="padding:7px 10px;text-align:left;color:var(--muted);font-size:10px;font-weight:600;text-transform:uppercase">Fecha</th>
              <th style="padding:7px 10px;text-align:right;color:var(--muted);font-size:10px;font-weight:600">Glucemia</th>
              <th style="padding:7px 10px;text-align:right;color:var(--muted);font-size:10px;font-weight:600">HOMA-IR</th>
              <th style="padding:7px 10px;text-align:right;color:var(--muted);font-size:10px;font-weight:600">HbA1c</th>
              <th style="padding:7px 10px;text-align:right;color:var(--muted);font-size:10px;font-weight:600">Col T</th>
              <th style="padding:7px 10px;text-align:right;color:var(--muted);font-size:10px;font-weight:600">LDL</th>
              <th style="padding:7px 10px;text-align:right;color:var(--muted);font-size:10px;font-weight:600">HDL</th>
              <th style="padding:7px 10px;text-align:right;color:var(--muted);font-size:10px;font-weight:600">TG</th>
              <th style="padding:7px 10px;text-align:right;color:var(--muted);font-size:10px;font-weight:600">eGFR</th>
              <th style="padding:7px 10px;text-align:right;color:var(--muted);font-size:10px;font-weight:600">Vit D</th>
              <th style="padding:7px 10px;text-align:right;color:var(--muted);font-size:10px;font-weight:600">Hgb</th>
            </tr>
          </thead>
          <tbody>
            ${analiticas.map((a, i) => {
              const prev = i > 0 ? analiticas[i-1] : null;
              const arrow = (cur, prv, mejor='bajo') => {
                if (!cur || !prv) return '';
                const up = cur > prv;
                const mejora = mejor === 'bajo' ? !up : up;
                return `<span style="color:${mejora?'var(--accent2)':'var(--danger)'};font-size:10px">${up?'▲':'▼'}</span>`;
              };
              return `<tr style="border-bottom:1px solid var(--border)">
                <td style="padding:6px 10px;font-family:'JetBrains Mono',monospace;color:var(--muted)">${fmtDate(a.fecha)}</td>
                <td style="padding:6px 10px;text-align:right;font-family:'JetBrains Mono',monospace">${a.glucemia_ayunas??'—'}${arrow(a.glucemia_ayunas, prev?.glucemia_ayunas)}</td>
                <td style="padding:6px 10px;text-align:right;font-family:'JetBrains Mono',monospace;color:${a.homa_ir>=2.5?'var(--danger)':a.homa_ir>=1.8?'var(--warn)':'var(--accent2)'}">${a.homa_ir?.toFixed(2)??'—'}${arrow(a.homa_ir, prev?.homa_ir)}</td>
                <td style="padding:6px 10px;text-align:right;font-family:'JetBrains Mono',monospace;color:${a.hba1c>=6.5?'var(--danger)':a.hba1c>=5.7?'var(--warn)':'inherit'}">${a.hba1c??'—'}${arrow(a.hba1c, prev?.hba1c)}</td>
                <td style="padding:6px 10px;text-align:right;font-family:'JetBrains Mono',monospace">${a.colesterol_total??'—'}${arrow(a.colesterol_total, prev?.colesterol_total)}</td>
                <td style="padding:6px 10px;text-align:right;font-family:'JetBrains Mono',monospace;color:${a.ldl>=160?'var(--danger)':a.ldl>=130?'var(--warn)':'inherit'}">${a.ldl??'—'}${arrow(a.ldl, prev?.ldl)}</td>
                <td style="padding:6px 10px;text-align:right;font-family:'JetBrains Mono',monospace;color:${a.hdl&&a.hdl<40?'var(--danger)':'inherit'}">${a.hdl??'—'}${arrow(a.hdl, prev?.hdl,'alto')}</td>
                <td style="padding:6px 10px;text-align:right;font-family:'JetBrains Mono',monospace;color:${a.trigliceridos>=150?'var(--warn)':'inherit'}">${a.trigliceridos??'—'}${arrow(a.trigliceridos, prev?.trigliceridos)}</td>
                <td style="padding:6px 10px;text-align:right;font-family:'JetBrains Mono',monospace">${a.egfr??'—'}</td>
                <td style="padding:6px 10px;text-align:right;font-family:'JetBrains Mono',monospace;color:${a.vitamina_d&&a.vitamina_d<20?'var(--danger)':a.vitamina_d&&a.vitamina_d<30?'var(--warn)':'inherit'}">${a.vitamina_d??'—'}${arrow(a.vitamina_d, prev?.vitamina_d,'alto')}</td>
                <td style="padding:6px 10px;text-align:right;font-family:'JetBrains Mono',monospace">${a.hemoglobina??'—'}</td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>` : ''}

    <!-- TABLA CRONOLÓGICA COMPOSICIÓN -->
    ${composicion.length ? `
    <div class="card">
      <div class="card-title">Tabla cronológica — Composición corporal</div>
      <div style="overflow-x:auto">
        <table style="width:100%;border-collapse:collapse;font-size:12px;white-space:nowrap">
          <thead>
            <tr style="border-bottom:1px solid var(--border)">
              <th style="padding:7px 10px;text-align:left;color:var(--muted);font-size:10px;font-weight:600;text-transform:uppercase">Fecha</th>
              <th style="padding:7px 10px;text-align:right;color:var(--muted);font-size:10px;font-weight:600">Peso</th>
              <th style="padding:7px 10px;text-align:right;color:var(--muted);font-size:10px;font-weight:600">IMC</th>
              <th style="padding:7px 10px;text-align:right;color:var(--muted);font-size:10px;font-weight:600">% Grasa</th>
              <th style="padding:7px 10px;text-align:right;color:var(--muted);font-size:10px;font-weight:600">Músculo</th>
              <th style="padding:7px 10px;text-align:right;color:var(--muted);font-size:10px;font-weight:600">Cintura</th>
              <th style="padding:7px 10px;text-align:right;color:var(--muted);font-size:10px;font-weight:600">C/T</th>
              <th style="padding:7px 10px;text-align:right;color:var(--muted);font-size:10px;font-weight:600">Handgrip</th>
              <th style="padding:7px 10px;text-align:right;color:var(--muted);font-size:10px;font-weight:600">STS</th>
              <th style="padding:7px 10px;text-align:right;color:var(--muted);font-size:10px;font-weight:600">SARC-F</th>
            </tr>
          </thead>
          <tbody>
            ${composicion.map((c, i) => {
              const prev = i > 0 ? composicion[i-1] : null;
              const arrow = (cur, prv, mejor='bajo') => {
                if (!cur || !prv) return '';
                const up = cur > prv;
                const mejora = mejor === 'bajo' ? !up : up;
                return `<span style="color:${mejora?'var(--accent2)':'var(--danger)'};font-size:10px">${up?'▲':'▼'}</span>`;
              };
              return `<tr style="border-bottom:1px solid var(--border)">
                <td style="padding:6px 10px;font-family:'JetBrains Mono',monospace;color:var(--muted)">${fmtDate(c.fecha)}</td>
                <td style="padding:6px 10px;text-align:right;font-family:'JetBrains Mono',monospace">${c.peso??'—'} kg${arrow(c.peso, prev?.peso)}</td>
                <td style="padding:6px 10px;text-align:right;font-family:'JetBrains Mono',monospace">${c.imc??'—'}${arrow(c.imc, prev?.imc)}</td>
                <td style="padding:6px 10px;text-align:right;font-family:'JetBrains Mono',monospace;color:${c.pct_grasa>35?'var(--warn)':'inherit'}">${c.pct_grasa??'—'}%${arrow(c.pct_grasa, prev?.pct_grasa)}</td>
                <td style="padding:6px 10px;text-align:right;font-family:'JetBrains Mono',monospace;color:var(--accent2)">${c.kg_masa_muscular??'—'} kg${arrow(c.kg_masa_muscular, prev?.kg_masa_muscular,'alto')}</td>
                <td style="padding:6px 10px;text-align:right;font-family:'JetBrains Mono',monospace">${c.cintura??'—'} cm${arrow(c.cintura, prev?.cintura)}</td>
                <td style="padding:6px 10px;text-align:right;font-family:'JetBrains Mono',monospace;color:${c.cintura_talla>=0.5?'var(--warn)':'inherit'}">${c.cintura_talla??'—'}${arrow(c.cintura_talla, prev?.cintura_talla)}</td>
                <td style="padding:6px 10px;text-align:right;font-family:'JetBrains Mono',monospace">${c.handgrip_der_mejor??'—'} kg <span style="font-size:10px;color:${c.handgrip_interpretacion==='Baja'?'var(--danger)':'var(--accent2)'}">${c.handgrip_interpretacion??''}</span></td>
                <td style="padding:6px 10px;text-align:right;font-family:'JetBrains Mono',monospace">${c.sit_to_stand_reps??'—'} rep</td>
                <td style="padding:6px 10px;text-align:right;font-family:'JetBrains Mono',monospace;color:${c.sarcf_total>=4?'var(--danger)':'inherit'}">${c.sarcf_total??'—'}</td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>` : ''}
  `;

  // Renderizar gráficas
  const labels_cc = composicion.map(c => fmtDate(c.fecha));
  const labels_an = analiticas.map(a => fmtDate(a.fecha));

  if (composicion.length && document.getElementById('crChart1')) {
    State.charts.crChart1 = new Chart(document.getElementById('crChart1'), {
      type: 'line',
      data: { labels: labels_cc, datasets: [
        { label: 'Peso (kg)', data: composicion.map(c => c.peso), borderColor: '#4f8ef7', tension: .3, pointRadius: 4, fill: false, yAxisID: 'y' },
        { label: '% Grasa', data: composicion.map(c => c.pct_grasa), borderColor: '#e05c5c', tension: .3, pointRadius: 4, fill: false, yAxisID: 'y' },
        { label: 'Músculo (kg)', data: composicion.map(c => c.kg_masa_muscular), borderColor: '#34c78a', tension: .3, pointRadius: 4, fill: false, yAxisID: 'y' },
      ]},
      options: { ...chartOpts(), scales: {
        x: { ticks: { color: '#6b7280', font: { size: 10 } }, grid: { color: '#252a38' } },
        y: { ticks: { color: '#6b7280', font: { size: 10 } }, grid: { color: '#252a38' } }
      }}
    });

    if (document.getElementById('crChart2')) {
      State.charts.crChart2 = new Chart(document.getElementById('crChart2'), {
        type: 'line',
        data: { labels: labels_cc, datasets: [
          { label: 'Peso (kg)', data: composicion.map(c => c.peso), borderColor: '#4f8ef7', tension: .3, pointRadius: 4, fill: false },
          { label: 'IMC', data: composicion.map(c => c.imc), borderColor: '#f0a742', tension: .3, pointRadius: 4, fill: false },
        ]},
        options: chartOpts()
      });
    }

    if (document.getElementById('crChart5')) {
      State.charts.crChart5 = new Chart(document.getElementById('crChart5'), {
        type: 'line',
        data: { labels: labels_cc, datasets: [
          { label: 'Cintura (cm)', data: composicion.map(c => c.cintura), borderColor: '#a78bfa', tension: .3, pointRadius: 4, fill: false },
        ]},
        options: chartOpts()
      });
    }
  }

  if (analiticas.length) {
    if (document.getElementById('crChart3')) {
      State.charts.crChart3 = new Chart(document.getElementById('crChart3'), {
        type: 'line',
        data: { labels: labels_an, datasets: [
          { label: 'HOMA-IR', data: analiticas.map(a => a.homa_ir), borderColor: '#f0a742', tension: .3, pointRadius: 4, fill: false },
          { label: 'HbA1c (%)', data: analiticas.map(a => a.hba1c), borderColor: '#a78bfa', tension: .3, pointRadius: 4, fill: false },
          { label: 'Glucemia/10', data: analiticas.map(a => a.glucemia_ayunas ? a.glucemia_ayunas/10 : null), borderColor: '#2dd4bf', tension: .3, pointRadius: 4, fill: false, borderDash: [4,2] },
        ]},
        options: chartOpts()
      });
    }

    if (document.getElementById('crChart4')) {
      State.charts.crChart4 = new Chart(document.getElementById('crChart4'), {
        type: 'line',
        data: { labels: labels_an, datasets: [
          { label: 'Col Total', data: analiticas.map(a => a.colesterol_total), borderColor: '#e05c5c', tension: .3, pointRadius: 4, fill: false },
          { label: 'LDL', data: analiticas.map(a => a.ldl), borderColor: '#f0a742', tension: .3, pointRadius: 4, fill: false },
          { label: 'HDL', data: analiticas.map(a => a.hdl), borderColor: '#34c78a', tension: .3, pointRadius: 4, fill: false },
          { label: 'TG', data: analiticas.map(a => a.trigliceridos), borderColor: '#a78bfa', tension: .3, pointRadius: 4, fill: false, borderDash: [4,2] },
        ]},
        options: chartOpts()
      });
    }
  }
}

// ════════════════════════════════════════════════════════════
// MÓDULO FÁRMACOS
// ════════════════════════════════════════════════════════════

const SEMAFORO_CSS = { verde: '#34c78a', amarillo: '#f0a742', rojo: '#e05c5c' };
const SEMAFORO_LABEL = { verde: '✓ Seguro', amarillo: '⚠ Precaución', rojo: '✕ Contraindicado' };

// Estado local del tab de fármacos
const FarmState = {
  catalogo: [],
  visita_farmacos: [],
  efectos_adversos: [],
  cambios: [],
  egfr: null,
  estadio: null,
  vid: null,
  filtroClase: '',
  filtroSemaforo: ''
};

async function loadFarmacosTab(vid) {
  FarmState.vid = vid;
  const el = document.getElementById('farmTabContent');
  if (!el) return;
  el.innerHTML = '<div class="loading"><div class="spinner"></div> Cargando fármacos…</div>';

  // eGFR de la visita actual
  const v = State.currentVisita;
  const an = v?.analiticas || {};
  FarmState.egfr    = an.egfr    || null;
  FarmState.estadio = an.egfr_estadio || null;

  // Cargar catálogo y fármacos de la visita en paralelo
  const egfrParam = FarmState.egfr ? `?egfr=${FarmState.egfr}` : '';
  const [catalogo, visitaFarmacos] = await Promise.all([
    api(`/farmacos/catalogo${egfrParam}`),
    api(`/visitas/${vid}/farmacos`)
  ]);

  FarmState.catalogo        = catalogo || [];
  FarmState.visita_farmacos = visitaFarmacos || [];
  renderFarmTab();
  // Chequeo de interacciones al abrir el tab
  setTimeout(() => loadInteraccionesVisita(), 100);
}

// ── RECOMENDACIONES DE FÁRMACOS POR DIAGNÓSTICO ─────────────
function farmRecomendacionesPorCaso() {
  const v   = State.currentVisita || {};
  const an  = v.analiticas || {};
  const cc  = v.composicion_corporal || {};
  const diag = v.diagnostico_nutricional || {};
  const tips = [];

  const imc = cc.imc || (cc.peso && cc.talla ? cc.peso/((cc.talla/100)**2) : null);
  const gluc = an.glucemia_ayunas;
  const hba1c = an.hba1c;
  const ldl   = an.ldl;
  const tg    = an.trigliceridos;
  const hdl   = an.hdl;
  const ptas  = an.presion_sistolica;
  const vitd  = an.vitamina_d;
  const b12   = an.vitamina_b12;
  const ferr  = an.ferritina;
  const hb    = an.hemoglobina;
  const egfr  = an.egfr;
  const tsh   = an.tsh;

  if (imc >= 30) tips.push({ grupo:'Obesidad', icon:'⚖️', texto:'Considerar: Semaglutida, Liraglutida, Tirzepatida (GLP-1/GIP). Evaluar elegibilidad para farmacoterapia anti-obesidad.', urgencia:'info' });
  if (gluc >= 100 || hba1c >= 5.7) tips.push({ grupo:'Glucometabolismo', icon:'🩸', texto:`Glucemia ${gluc||'?'} mg/dL | HbA1c ${hba1c||'?'}%. ${hba1c>=6.5||gluc>=126?'DM confirmada — revisar metformina, inhibidores SGLT-2, GLP-1.':'Prediabetes — considerar metformina preventiva si IMC ≥35 o progresión rápida.'}`, urgencia: hba1c>=6.5||gluc>=126 ? 'warn' : 'info' });
  if (ldl >= 130 || tg >= 150) tips.push({ grupo:'Dislipidemia', icon:'❤️', texto:`LDL ${ldl||'?'} mg/dL | TG ${tg||'?'} mg/dL. ${ldl>=160?'Estatinas de alta intensidad (Rosuvastatina 20-40mg, Atorvastatina 40-80mg).':ldl>=130?'Estatinas moderadas.':''} ${tg>=500?'TG críticos — Fibratos + ácidos grasos omega-3.':tg>=200?'Fibratos o Omega-3 si TG persisten.':''}`, urgencia: ldl>=160||tg>=500 ? 'warn' : 'info' });
  if (vitd && vitd < 30) tips.push({ grupo:'Micronutrientes', icon:'☀️', texto:`Vitamina D ${vitd} ng/mL — ${vitd<20?'Deficiencia: colecalciferol 50,000 UI/sem × 8-12 sem, luego mantenimiento 1,000-2,000 UI/día.':'Insuficiencia: colecalciferol 1,000-2,000 UI/día.'}`, urgencia:'info' });
  if (b12 && b12 < 300) tips.push({ grupo:'Micronutrientes', icon:'💊', texto:`Vitamina B12 ${b12} pg/mL — Suplementación: cianocobalamina o metilcobalamina 1,000-2,000 mcg/día VO, o 1,000 mcg IM mensual si malabsorción.`, urgencia:'info' });
  if ((ferr && ferr < 30) || (hb && hb < 12)) tips.push({ grupo:'Anemia', icon:'🔴', texto:`Ferritina ${ferr||'?'} ng/mL | Hb ${hb||'?'} g/dL. ${hb<10?'Anemia severa — considerar hierro IV (sacarosa/carboximaltosa).':'Hierro oral: sulfato ferroso 300mg o gluconato ferroso con vitamina C en ayunas.'}`, urgencia: hb && hb<10 ? 'warn' : 'info' });
  if (egfr && egfr < 60) tips.push({ grupo:'ERC', icon:'🫘', texto:`eGFR ${egfr.toFixed(0)} mL/min (${an.egfr_estadio}). Ajustar dosis de metformina (suspender <30), evitar AINEs, revisar contraste nefrotóxico. Quelantes de fósforo si P>5.5.`, urgencia: egfr<30 ? 'warn' : 'info' });
  if (tsh && tsh > 4.5) tips.push({ grupo:'Tiroides', icon:'🦋', texto:`TSH ${tsh} mIU/L — Hipotiroidismo probable. Iniciar/ajustar levotiroxina. Meta TSH 0.5-2.5 mIU/L.`, urgencia:'warn' });
  if (tsh && tsh < 0.4) tips.push({ grupo:'Tiroides', icon:'🦋', texto:`TSH ${tsh} mIU/L — Hipertiroidismo. Derivar a endocrinología. Revisar interacciones con nutrición (calcio, hierro, etc.).`, urgencia:'warn' });

  if (!tips.length) return '';

  return `
  <div class="card" style="margin-bottom:14px;border-left:4px solid var(--accent)">
    <div class="card-title">💡 Recomendaciones farmacológicas según este caso</div>
    ${tips.map(t => `
      <div style="padding:10px 12px;margin-bottom:8px;border-radius:8px;background:${t.urgencia==='warn'?'#fef3c7':'#eff6ff'};border:1px solid ${t.urgencia==='warn'?'#fde68a':'#bfdbfe'}">
        <div style="font-weight:600;font-size:12px;color:${t.urgencia==='warn'?'var(--warn)':'var(--accent)'};margin-bottom:3px">${t.icon} ${t.grupo}</div>
        <div style="font-size:12px;color:var(--text2);line-height:1.5">${t.texto}</div>
      </div>`).join('')}
    <div style="font-size:10px;color:var(--muted);margin-top:4px">⚠ Recomendaciones automáticas orientativas. Decisión clínica final a criterio del médico tratante.</div>
  </div>`;
}

function renderFarmTab() {
  const el = document.getElementById('farmTabContent');
  if (!el) return;

  const egfrStr = FarmState.egfr
    ? `<span style="color:var(--accent)">${FarmState.egfr.toFixed(0)} mL/min</span> — Estadio <strong>${FarmState.estadio || '?'}</strong>`
    : '<span style="color:var(--muted)">Sin eGFR registrado en analíticas de esta visita</span>';

  const clases = [...new Set(FarmState.catalogo.map(f => f.clase))].sort();

  el.innerHTML = `
  <!-- BUSCADOR GLOBAL RÁPIDO -->
  <div style="position:relative;margin-bottom:14px">
    <svg style="position:absolute;left:12px;top:50%;transform:translateY(-50%);color:var(--muted);width:16px;height:16px" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
    <input id="farm-busqueda-global" placeholder="Buscar fármaco por nombre genérico o comercial…"
      oninput="onFarmBusquedaGlobal()"
      style="width:100%;padding:10px 12px 10px 38px;background:var(--surface);border:2px solid var(--border);border-radius:10px;color:var(--text);font-size:14px;outline:none;transition:border .15s"
      onfocus="this.style.borderColor='var(--accent)'" onblur="this.style.borderColor='var(--border)'">
    <div id="farm-busqueda-resultados" style="display:none;position:absolute;top:100%;left:0;right:0;background:var(--surface);border:1px solid var(--border);border-radius:10px;margin-top:4px;z-index:100;max-height:300px;overflow-y:auto;box-shadow:var(--shadow)"></div>
  </div>

  <!-- RECOMENDACIONES POR CASO -->
  ${farmRecomendacionesPorCaso()}

  <!-- ALERTA eGFR + BOTONES -->
  <div class="card" style="border-top:3px solid var(--accent);margin-bottom:12px">
    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px">
      <div>
        <div style="font-size:11px;color:var(--muted);font-weight:600;text-transform:uppercase;letter-spacing:.05em">eGFR para semáforo renal</div>
        <div style="margin-top:4px;font-size:14px">${egfrStr}</div>
      </div>
      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
        <select id="farm-estadio-override" onchange="onFarmEstadioOverride()" style="background:var(--bg2);border:1px solid var(--border);color:var(--text);border-radius:6px;padding:4px 8px;font-size:12px">
          <option value="">— Calculado de eGFR —</option>
          <option value="HD">Hemodiálisis (HD)</option>
          <option value="DP">Diálisis Peritoneal (DP)</option>
        </select>
        <button class="btn btn-ghost btn-sm" onclick="imprimirReceta()">🖨 Imprimir receta</button>
      </div>
    </div>
  </div>

  <!-- LEYENDA SEMÁFORO -->
  <div style="display:flex;gap:12px;margin-bottom:14px;flex-wrap:wrap">
    ${Object.entries(SEMAFORO_CSS).map(([k,c]) => `
      <div style="display:flex;align-items:center;gap:6px;font-size:12px">
        <span style="width:10px;height:10px;border-radius:50%;background:${c};display:inline-block"></span>
        <span>${SEMAFORO_LABEL[k]}</span>
      </div>`).join('')}
  </div>

  <!-- PANEL INTERACCIONES -->
  <div id="farm-interacciones-panel"></div>

  <!-- FÁRMACOS DE ESTA VISITA -->
  <div class="card" style="margin-bottom:16px">
    <div class="card-title" style="display:flex;justify-content:space-between;align-items:center">
      <span>💊 Fármacos registrados en esta visita</span>
      <button class="btn btn-primary btn-sm" onclick="openAddFarmacoModal()">+ Agregar fármaco</button>
    </div>
    <div id="farm-visita-list">
      ${renderFarmVisitaList()}
    </div>
  </div>

  <!-- CATÁLOGO COMPLETO -->
  <div class="card">
    <div class="card-title">Catálogo completo — Semáforo por eGFR</div>
    <div style="display:flex;gap:10px;margin-bottom:12px;flex-wrap:wrap">
      <select id="farm-filter-clase" onchange="onFarmFilter()" style="background:var(--bg2);border:1px solid var(--border);color:var(--text);border-radius:6px;padding:5px 10px;font-size:12px">
        <option value="">Todas las clases</option>
        ${clases.map(c => `<option value="${c}">${c}</option>`).join('')}
      </select>
      <select id="farm-filter-sem" onchange="onFarmFilter()" style="background:var(--bg2);border:1px solid var(--border);color:var(--text);border-radius:6px;padding:5px 10px;font-size:12px">
        <option value="">Todos los semáforos</option>
        <option value="verde">✓ Solo seguros</option>
        <option value="amarillo">⚠ Solo precaución</option>
        <option value="rojo">✕ Solo contraindicados</option>
      </select>
    </div>
    <div id="farm-catalogo-list">
      ${renderFarmCatalogo()}
    </div>
  </div>

  <!-- MODAL AGREGAR FÁRMACO -->
  <div id="farmModal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:2000;display:flex;align-items:center;justify-content:center" onclick="if(event.target===this)closeFarmModal()">
    <div style="background:var(--bg2);border:1px solid var(--border);border-radius:12px;padding:24px;width:min(520px,95vw);max-height:90vh;overflow-y:auto" onclick="event.stopPropagation()">
      <div style="font-weight:700;font-size:15px;margin-bottom:16px">Agregar fármaco a la visita</div>
      <div class="field"><label>Fármaco del catálogo</label>
        <select id="fm-farm-id" onchange="onFarmSelectChange()" style="background:var(--bg);border:1px solid var(--border);color:var(--text);border-radius:6px;padding:6px 10px;width:100%">
          <option value="">— Seleccionar —</option>
          ${clases.map(cls => `<optgroup label="${cls}">
            ${FarmState.catalogo.filter(f=>f.clase===cls).map(f =>
              `<option value="${f.id}" data-sem="${f.semaforo_actual}">${f.nombre} ${f.nombres_comer?.length?'('+f.nombres_comer.join(', ')+')':''}</option>`
            ).join('')}
          </optgroup>`).join('')}
        </select>
      </div>
      <div id="fm-semaforo-preview" style="display:none;margin-bottom:10px;padding:10px 14px;border-radius:8px;font-size:13px"></div>
      <div id="fm-nota-egfr" style="display:none;margin-bottom:10px;padding:10px 14px;border-radius:8px;background:var(--bg);border:1px solid var(--border);font-size:12px;color:var(--muted)"></div>
      <div class="g2">
        <div class="field"><label>Dosis</label><input id="fm-dosis" placeholder="ej. 10 mg" style="background:var(--bg);border:1px solid var(--border);color:var(--text);border-radius:6px;padding:6px 10px;width:100%"></div>
        <div class="field"><label>Frecuencia</label><input id="fm-freq" placeholder="ej. Diario" style="background:var(--bg);border:1px solid var(--border);color:var(--text);border-radius:6px;padding:6px 10px;width:100%"></div>
        <div class="field"><label>Estado</label>
          <select id="fm-estado" style="background:var(--bg);border:1px solid var(--border);color:var(--text);border-radius:6px;padding:6px 10px;width:100%">
            <option value="activo">Activo</option>
            <option value="sugerido">Sugerido</option>
            <option value="suspendido">Suspendido</option>
            <option value="contraindicado">Contraindicado</option>
          </select>
        </div>
        <div class="field"><label>Fecha inicio</label><input type="date" id="fm-finicio" style="background:var(--bg);border:1px solid var(--border);color:var(--text);border-radius:6px;padding:6px 10px;width:100%"></div>
      </div>
      <div class="field"><label>Notas</label><textarea id="fm-notas" rows="2" style="background:var(--bg);border:1px solid var(--border);color:var(--text);border-radius:6px;padding:8px 10px;width:100%;resize:vertical"></textarea></div>

      <!-- EFECTOS ADVERSOS en modal -->
      <div style="margin-top:12px;padding:12px;background:#fff7ed;border:1px solid #fed7aa;border-radius:8px">
        <div style="font-size:12px;font-weight:700;color:#c2410c;margin-bottom:8px">⚠ Efectos adversos reportados (opcional)</div>
        <div class="g2">
          <div class="field"><label style="font-size:11px">Efecto adverso</label>
            <input id="fm-ea-descripcion" placeholder="Ej: Náuseas, pancreatitis leve, bradicardia" style="background:var(--bg);border:1px solid var(--border);color:var(--text);border-radius:6px;padding:6px 10px;width:100%;font-size:12px">
          </div>
          <div class="field"><label style="font-size:11px">Gravedad</label>
            <select id="fm-ea-gravedad" style="background:var(--bg);border:1px solid var(--border);color:var(--text);border-radius:6px;padding:6px 10px;width:100%;font-size:12px">
              <option value="">—</option>
              <option value="leve">Leve — manejable</option>
              <option value="moderado">Moderado — requiere ajuste</option>
              <option value="grave">Grave — suspender</option>
            </select>
          </div>
          <div class="field"><label style="font-size:11px">Fecha de aparición</label>
            <input type="date" id="fm-ea-fecha" style="background:var(--bg);border:1px solid var(--border);color:var(--text);border-radius:6px;padding:6px 10px;width:100%;font-size:12px">
          </div>
          <div class="field"><label style="font-size:11px">Acción tomada</label>
            <select id="fm-ea-accion" style="background:var(--bg);border:1px solid var(--border);color:var(--text);border-radius:6px;padding:6px 10px;width:100%;font-size:12px">
              <option value="">—</option>
              <option value="observacion">Observación</option>
              <option value="reduccion_dosis">Reducción de dosis</option>
              <option value="suspension_temporal">Suspensión temporal</option>
              <option value="suspension_definitiva">Suspensión definitiva</option>
              <option value="cambio_molecula">Cambio de molécula</option>
            </select>
          </div>
        </div>
      </div>

      <!-- ABANDONO / CAMBIO en modal -->
      <div style="margin-top:10px;padding:12px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px">
        <div style="font-size:12px;font-weight:700;color:#166534;margin-bottom:8px">🔄 Abandono o cambio de tratamiento (opcional)</div>
        <div class="g2">
          <div class="field"><label style="font-size:11px">Motivo de abandono/cambio</label>
            <select id="fm-cambio-motivo" style="background:var(--bg);border:1px solid var(--border);color:var(--text);border-radius:6px;padding:6px 10px;width:100%;font-size:12px">
              <option value="">—</option>
              <option value="efecto_adverso">Efecto adverso</option>
              <option value="costo">Costo / acceso</option>
              <option value="falta_respuesta">Falta de respuesta clínica</option>
              <option value="decision_paciente">Decisión del paciente</option>
              <option value="embarazo">Embarazo / lactancia</option>
              <option value="interaccion">Interacción farmacológica</option>
              <option value="mejoria">Mejoría — suspensión programada</option>
              <option value="cambio_marca">Cambio de marca (genérico)</option>
              <option value="otro">Otro</option>
            </select>
          </div>
          <div class="field"><label style="font-size:11px">Molécula / marca anterior</label>
            <input id="fm-cambio-anterior" placeholder="Ej: Ozempic 0.5 mg / Victoza" style="background:var(--bg);border:1px solid var(--border);color:var(--text);border-radius:6px;padding:6px 10px;width:100%;font-size:12px">
          </div>
          <div class="field"><label style="font-size:11px">Nueva molécula / marca</label>
            <input id="fm-cambio-nueva" placeholder="Ej: Mounjaro 5 mg / Trulicity" style="background:var(--bg);border:1px solid var(--border);color:var(--text);border-radius:6px;padding:6px 10px;width:100%;font-size:12px">
          </div>
          <div class="field"><label style="font-size:11px">Fecha de cambio</label>
            <input type="date" id="fm-cambio-fecha" style="background:var(--bg);border:1px solid var(--border);color:var(--text);border-radius:6px;padding:6px 10px;width:100%;font-size:12px">
          </div>
          <div class="field" style="grid-column:span 2"><label style="font-size:11px">Observaciones del cambio</label>
            <input id="fm-cambio-obs" placeholder="Ej: Cambio a tirzepatida por falta de respuesta a semaglutida tras 6 meses" style="background:var(--bg);border:1px solid var(--border);color:var(--text);border-radius:6px;padding:6px 10px;width:100%;font-size:12px">
          </div>
        </div>
      </div>

      <div id="fm-override-section" style="display:none;background:rgba(240,167,66,.1);border:1px solid #f0a742;border-radius:8px;padding:12px;margin-top:8px">
        <label style="display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer">
          <input type="checkbox" id="fm-override"> <span>Override médico — prescribir pese a contraindicación</span>
        </label>
        <div class="field" style="margin-top:8px;display:none" id="fm-override-motivo-wrap">
          <label>Motivo clínico del override</label>
          <textarea id="fm-override-motivo" rows="2" style="background:var(--bg);border:1px solid var(--border);color:var(--text);border-radius:6px;padding:8px 10px;width:100%"></textarea>
        </div>
      </div>
      <div style="display:flex;gap:10px;margin-top:16px;justify-content:flex-end">
        <button class="btn btn-ghost" onclick="closeFarmModal()">Cancelar</button>
        <button class="btn btn-success" onclick="saveFarmaco()">Guardar</button>
      </div>
    </div>
  </div>

  <!-- ACÁPITE: EFECTOS ADVERSOS REGISTRADOS EN ESTA VISITA -->
  <div class="card" style="margin-top:16px;border-top:3px solid #f97316">
    <div class="card-title" style="display:flex;justify-content:space-between;align-items:center">
      <span>⚠ Efectos adversos — Historial de esta visita</span>
      <button class="btn btn-ghost btn-sm" onclick="saveFarmEA()">Guardar</button>
    </div>
    <div class="g2" style="margin-bottom:10px">
      <div class="field"><label>Fármaco implicado</label>
        <select id="ea-farm-id" style="background:var(--bg);border:1px solid var(--border);color:var(--text);border-radius:6px;padding:6px 10px;width:100%">
          <option value="">— Seleccionar fármaco —</option>
          ${FarmState.visita_farmacos.map(f => `<option value="${f.id}">${f.catalogo_nombre||f.farmaco_libre||'?'} ${f.dosis||''}</option>`).join('')}
        </select>
      </div>
      <div class="field"><label>Efecto adverso</label>
        <input id="ea-descripcion" placeholder="Ej: Náuseas, vómitos, dolor epigástrico">
      </div>
      <div class="field"><label>Gravedad</label>
        <select id="ea-gravedad">
          <option value="leve">Leve</option>
          <option value="moderado">Moderado</option>
          <option value="grave">Grave</option>
        </select>
      </div>
      <div class="field"><label>Acción tomada</label>
        <select id="ea-accion">
          <option value="observacion">Observación</option>
          <option value="reduccion_dosis">Reducción de dosis</option>
          <option value="suspension_temporal">Suspensión temporal</option>
          <option value="suspension_definitiva">Suspensión definitiva</option>
          <option value="cambio_molecula">Cambio de molécula</option>
        </select>
      </div>
      <div class="field"><label>Fecha de aparición</label>
        <input type="date" id="ea-fecha">
      </div>
      <div class="field"><label>Observaciones</label>
        <input id="ea-obs" placeholder="Detalle clínico adicional">
      </div>
    </div>
    <div id="ea-lista" style="font-size:12px;color:var(--muted);padding-top:8px;border-top:1px solid var(--border)">
      ${(FarmState.efectos_adversos||[]).length
        ? (FarmState.efectos_adversos||[]).map(ea=>`
          <div style="padding:7px 0;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:10px">
            <span style="font-size:18px">${ea.gravedad==='grave'?'🔴':ea.gravedad==='moderado'?'🟡':'🟢'}</span>
            <div style="flex:1"><strong>${ea.farmaco_nombre||'—'}</strong> · ${ea.descripcion||''}
              <span style="color:var(--muted);font-size:11px"> · ${ea.accion_tomada||''} · ${ea.fecha||''}</span>
            </div>
          </div>`).join('')
        : '<span>Sin efectos adversos registrados en esta visita.</span>'}
    </div>
  </div>

  <!-- ACÁPITE: ABANDONO / CAMBIO DE MOLÉCULA O MARCA -->
  <div class="card" style="margin-top:16px;border-top:3px solid #16a34a">
    <div class="card-title" style="display:flex;justify-content:space-between;align-items:center">
      <span>🔄 Abandono o cambio de molécula / marca</span>
      <button class="btn btn-ghost btn-sm" onclick="saveFarmCambio()">Guardar</button>
    </div>
    <div class="g2" style="margin-bottom:10px">
      <div class="field"><label>Motivo de abandono / cambio</label>
        <select id="cambio-motivo">
          <option value="">—</option>
          <option value="efecto_adverso">Efecto adverso</option>
          <option value="costo">Costo / acceso</option>
          <option value="falta_respuesta">Falta de respuesta clínica</option>
          <option value="decision_paciente">Decisión del paciente</option>
          <option value="embarazo">Embarazo / lactancia</option>
          <option value="interaccion">Interacción farmacológica</option>
          <option value="mejoria">Mejoría — suspensión programada</option>
          <option value="cambio_marca">Cambio de marca (genérico)</option>
          <option value="otro">Otro</option>
        </select>
      </div>
      <div class="field"><label>Fármaco / marca anterior</label>
        <input id="cambio-anterior" placeholder="Ej: Ozempic 0.5 mg semanal">
      </div>
      <div class="field"><label>Nueva molécula / marca</label>
        <input id="cambio-nueva" placeholder="Ej: Mounjaro 5 mg semanal">
      </div>
      <div class="field"><label>Fecha de cambio</label>
        <input type="date" id="cambio-fecha">
      </div>
      <div class="field" style="grid-column:span 2"><label>Observaciones clínicas</label>
        <input id="cambio-obs" placeholder="Ej: Cambio por falta de respuesta tras 6 meses con semaglutida, meta HbA1c no alcanzada">
      </div>
    </div>
    <div id="cambio-lista" style="font-size:12px;color:var(--muted);padding-top:8px;border-top:1px solid var(--border)">
      ${(FarmState.cambios||[]).length
        ? (FarmState.cambios||[]).map(c=>`
          <div style="padding:7px 0;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:10px">
            <span style="font-size:18px">🔄</span>
            <div style="flex:1">
              <strong>${c.farmaco_anterior||'—'}</strong> → <strong>${c.farmaco_nuevo||'—'}</strong>
              <span style="background:var(--bg2);border-radius:20px;padding:2px 8px;font-size:11px;margin-left:6px">${c.motivo?.replace(/_/g,' ')||''}</span>
              <div style="color:var(--muted);font-size:11px;margin-top:2px">${c.observaciones||''} · ${c.fecha||''}</div>
            </div>
          </div>`).join('')
        : '<span>Sin cambios registrados en esta visita.</span>'}
    </div>
  </div>
  `;

  // ocultar el modal por defecto (estaba con display:flex para el template)
  const modal = document.getElementById('farmModal');
  if (modal) modal.style.display = 'none';
}

function renderFarmVisitaList() {
  const items = FarmState.visita_farmacos;
  if (!items.length) return `<div style="color:var(--muted);font-size:13px;padding:8px 0">Sin fármacos registrados en esta visita.</div>`;

  return items.map(f => {
    const sem = f.semaforo_calc || 'verde';
    const color = SEMAFORO_CSS[sem];
    const nombre = f.catalogo_nombre || f.farmaco_libre || '?';
    return `
    <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--border)">
      <span style="width:14px;height:14px;border-radius:50%;background:${color};flex-shrink:0"></span>
      <div style="flex:1">
        <div style="font-weight:600;font-size:13px">${nombre} <span style="color:var(--muted);font-weight:400">${f.clase||''}</span></div>
        <div style="font-size:11px;color:var(--muted)">${f.dosis||''} ${f.frecuencia||''} · ${SEMAFORO_LABEL[sem]} · eGFR usado: ${f.egfr_usado ? f.egfr_usado.toFixed(0)+' ('+f.egfr_estadio+')' : 'N/A'}</div>
        ${f.nota_egfr ? `<div style="font-size:11px;color:var(--warn);margin-top:3px">⚠ ${f.nota_egfr}</div>` : ''}
      </div>
      <span style="font-size:11px;padding:3px 8px;border-radius:20px;background:var(--bg);border:1px solid var(--border);color:var(--muted)">${f.estado||'activo'}</span>
      <button onclick="deleteFarmaco(${f.id})" style="background:none;border:none;color:var(--danger);cursor:pointer;font-size:16px;padding:0 4px" title="Eliminar">×</button>
    </div>`;
  }).join('');
}

function renderFarmCatalogo() {
  let items = FarmState.catalogo;
  if (FarmState.filtroClase) items = items.filter(f => f.clase === FarmState.filtroClase);
  if (FarmState.filtroSemaforo) items = items.filter(f => f.semaforo_actual === FarmState.filtroSemaforo);
  if (!items.length) return `<div style="color:var(--muted);font-size:13px;padding:8px 0">Sin resultados.</div>`;

  // Agrupar por clase
  const byClase = {};
  items.forEach(f => { (byClase[f.clase] = byClase[f.clase] || []).push(f); });

  return Object.entries(byClase).map(([clase, farmacos]) => `
    <div style="margin-bottom:16px">
      <div style="font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.08em;margin-bottom:8px;padding-bottom:4px;border-bottom:1px solid var(--border)">${clase}</div>
      ${farmacos.map(f => {
        const sem = f.semaforo_actual || 'verde';
        const color = SEMAFORO_CSS[sem];
        const comer = Array.isArray(f.nombres_comer) ? f.nombres_comer.join(', ') : (f.nombres_comer || '');
        return `
        <div style="display:flex;align-items:flex-start;gap:12px;padding:9px 0;border-bottom:1px solid var(--border)">
          <span style="width:12px;height:12px;border-radius:50%;background:${color};flex-shrink:0;margin-top:3px"></span>
          <div style="flex:1;min-width:0">
            <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
              <span style="font-weight:600;font-size:13px">${f.nombre}</span>
              ${comer ? `<span style="font-size:11px;color:var(--muted)">${comer}</span>` : ''}
              <span style="font-size:11px;padding:2px 7px;border-radius:20px;background:${color}22;color:${color};font-weight:600">${SEMAFORO_LABEL[sem]}</span>
            </div>
            <div style="font-size:11px;color:var(--muted);margin-top:2px">${f.dosis_std||''} · ${f.frecuencia_std||''}</div>
            ${f.nota_egfr ? `<div style="font-size:11px;color:var(--warn);margin-top:4px">⚠ ${f.nota_egfr}</div>` : ''}
          </div>
          <button onclick="quickAddFarmaco(${f.id})" style="flex-shrink:0;background:var(--bg2);border:1px solid var(--border);color:var(--text);border-radius:6px;padding:4px 10px;font-size:11px;cursor:pointer" title="Agregar a visita">+ Agregar</button>
        </div>`;
      }).join('')}
    </div>
  `).join('');
}

function onFarmFilter() {
  FarmState.filtroClase    = document.getElementById('farm-filter-clase')?.value || '';
  FarmState.filtroSemaforo = document.getElementById('farm-filter-sem')?.value   || '';
  document.getElementById('farm-catalogo-list').innerHTML = renderFarmCatalogo();
}

async function onFarmEstadioOverride() {
  const override = document.getElementById('farm-estadio-override')?.value || '';
  const egfr = FarmState.egfr;
  const egfrParam = override ? `?estadio=${override}` : (egfr ? `?egfr=${egfr}` : '');
  FarmState.catalogo = await api(`/farmacos/catalogo${egfrParam}`);
  document.getElementById('farm-catalogo-list').innerHTML = renderFarmCatalogo();
}

function openAddFarmacoModal() {
  const m = document.getElementById('farmModal');
  if (m) m.style.display = 'flex';
}

function closeFarmModal() {
  const m = document.getElementById('farmModal');
  if (m) m.style.display = 'none';
}

function quickAddFarmaco(farmId) {
  openAddFarmacoModal();
  const sel = document.getElementById('fm-farm-id');
  if (sel) { sel.value = farmId; onFarmSelectChange(); }
}

function onFarmSelectChange() {
  const farmId = parseInt(document.getElementById('fm-farm-id')?.value || '0');
  const f = FarmState.catalogo.find(x => x.id === farmId);
  const prevEl   = document.getElementById('fm-semaforo-preview');
  const notaEl   = document.getElementById('fm-nota-egfr');
  const ovSec    = document.getElementById('fm-override-section');
  if (!f) { if (prevEl) prevEl.style.display='none'; if (notaEl) notaEl.style.display='none'; return; }

  const sem = f.semaforo_actual || 'verde';
  const color = SEMAFORO_CSS[sem];

  if (prevEl) {
    prevEl.style.display  = 'block';
    prevEl.style.background = color + '22';
    prevEl.style.border   = `1px solid ${color}`;
    prevEl.style.color    = color;
    prevEl.innerHTML = `<strong>${SEMAFORO_LABEL[sem]}</strong> para estadio ${FarmState.estadio || '?'} (eGFR ${FarmState.egfr ? FarmState.egfr.toFixed(0) : '—'})`;
  }
  if (notaEl) {
    notaEl.style.display = f.nota_egfr ? 'block' : 'none';
    notaEl.textContent   = f.nota_egfr || '';
  }

  // Auto-rellenar dosis estándar si vacío
  const dosisEl = document.getElementById('fm-dosis');
  const freqEl  = document.getElementById('fm-freq');
  if (dosisEl && !dosisEl.value) dosisEl.value = f.dosis_std || '';
  if (freqEl  && !freqEl.value)  freqEl.value  = f.frecuencia_std || '';

  // Mostrar override si rojo
  if (ovSec) ovSec.style.display = sem === 'rojo' ? 'block' : 'none';
  const ovCheck = document.getElementById('fm-override');
  if (ovCheck) {
    ovCheck.onchange = () => {
      const w = document.getElementById('fm-override-motivo-wrap');
      if (w) w.style.display = ovCheck.checked ? 'block' : 'none';
    };
  }
}

async function saveFarmaco() {
  const farmId = parseInt(document.getElementById('fm-farm-id')?.value || '0') || null;
  const sem    = FarmState.catalogo.find(f=>f.id===farmId)?.semaforo_actual || 'verde';
  const override = document.getElementById('fm-override')?.checked;

  if (sem === 'rojo' && !override) {
    toast('Fármaco contraindicado. Habilita override médico para continuar.', 'err');
    return;
  }

  const g = id => document.getElementById(id)?.value || null;
  const body = {
    farmaco_id:      farmId,
    dosis:           g('fm-dosis'),
    frecuencia:      g('fm-freq'),
    estado:          g('fm-estado') || 'activo',
    fecha_inicio:    g('fm-finicio'),
    notas:           g('fm-notas'),
    override_medico: override ? 1 : 0,
    override_motivo: g('fm-override-motivo'),
    // Efectos adversos desde modal
    ea_descripcion:  g('fm-ea-descripcion'),
    ea_gravedad:     g('fm-ea-gravedad'),
    ea_accion:       g('fm-ea-accion'),
    ea_fecha:        g('fm-ea-fecha'),
    // Cambio de molécula/marca desde modal
    cambio_motivo:   g('fm-cambio-motivo'),
    cambio_anterior: g('fm-cambio-anterior'),
    cambio_nueva:    g('fm-cambio-nueva'),
    cambio_fecha:    g('fm-cambio-fecha'),
    cambio_obs:      g('fm-cambio-obs'),
  };

  try {
    const saved = await api(`/visitas/${FarmState.vid}/farmacos`, 'POST', body);
    FarmState.visita_farmacos.push(saved);
    closeFarmModal();
    document.getElementById('farm-visita-list').innerHTML = renderFarmVisitaList();
    toast('Fármaco guardado ✓');

    // Chequeo automático de interacciones
    await checkInteraccionesVisita();
  } catch(e) { /* toast shown by api() */ }
}

// ── EFECTOS ADVERSOS — guardado desde acápite independiente ──
async function saveFarmEA() {
  const vid = FarmState.vid;
  if (!vid) return;
  const g = id => document.getElementById(id)?.value || null;
  const farmId = parseInt(g('ea-farm-id')) || null;
  if (!farmId) { toast('Selecciona el fármaco implicado', 'err'); return; }

  const body = {
    id: farmId,
    ea_descripcion: g('ea-descripcion'),
    ea_gravedad:    g('ea-gravedad'),
    ea_accion:      g('ea-accion'),
    ea_fecha:       g('ea-fecha'),
    notas:          g('ea-obs'),
  };

  await api(`/visitas/${vid}/farmacos`, 'POST', body);

  // Actualizar lista visual
  const f = FarmState.visita_farmacos.find(x => x.id === farmId);
  if (f) {
    f.ea_descripcion = body.ea_descripcion;
    f.ea_gravedad    = body.ea_gravedad;
    f.ea_accion      = body.ea_accion;
    f.ea_fecha       = body.ea_fecha;
  }
  FarmState.efectos_adversos = FarmState.visita_farmacos
    .filter(f => f.ea_descripcion)
    .map(f => ({ farmaco_nombre: f.catalogo_nombre||f.farmaco_libre||'?', descripcion: f.ea_descripcion, gravedad: f.ea_gravedad, accion_tomada: f.ea_accion, fecha: f.ea_fecha }));

  document.getElementById('ea-lista').innerHTML = FarmState.efectos_adversos.length
    ? FarmState.efectos_adversos.map(ea=>`
        <div style="padding:7px 0;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:10px">
          <span style="font-size:18px">${ea.gravedad==='grave'?'🔴':ea.gravedad==='moderado'?'🟡':'🟢'}</span>
          <div style="flex:1"><strong>${ea.farmaco_nombre}</strong> · ${ea.descripcion||''}
            <span style="color:var(--muted);font-size:11px"> · ${ea.accion_tomada||''} · ${ea.fecha||''}</span>
          </div>
        </div>`).join('')
    : '<span style="color:var(--muted);font-size:12px">Sin efectos adversos registrados.</span>';

  toast('Efecto adverso guardado ✓');
}

// ── CAMBIO DE MOLÉCULA / MARCA — guardado desde acápite ──────
async function saveFarmCambio() {
  const vid = FarmState.vid;
  if (!vid) return;
  const g = id => document.getElementById(id)?.value || null;

  const motivo = g('cambio-motivo');
  if (!motivo) { toast('Selecciona el motivo de cambio', 'err'); return; }

  // Guardamos el cambio en el primer fármaco activo de la visita como referencia
  // Si hay un fármaco específico implicado, se puede seleccionar en la lista
  const primerFarm = FarmState.visita_farmacos[0];
  const body = {
    id: primerFarm?.id || null,
    cambio_motivo:   motivo,
    cambio_anterior: g('cambio-anterior'),
    cambio_nueva:    g('cambio-nueva'),
    cambio_fecha:    g('cambio-fecha'),
    cambio_obs:      g('cambio-obs'),
  };

  if (body.id) await api(`/visitas/${vid}/farmacos`, 'POST', body);

  const nuevo = { motivo, farmaco_anterior: body.cambio_anterior, farmaco_nuevo: body.cambio_nueva, fecha: body.cambio_fecha, observaciones: body.cambio_obs };
  FarmState.cambios = [...(FarmState.cambios||[]), nuevo];

  document.getElementById('cambio-lista').innerHTML = FarmState.cambios.map(c=>`
    <div style="padding:7px 0;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:10px">
      <span style="font-size:18px">🔄</span>
      <div style="flex:1">
        <strong>${c.farmaco_anterior||'—'}</strong> → <strong>${c.farmaco_nuevo||'—'}</strong>
        <span style="background:var(--bg2);border-radius:20px;padding:2px 8px;font-size:11px;margin-left:6px">${(c.motivo||'').replace(/_/g,' ')}</span>
        <div style="color:var(--muted);font-size:11px;margin-top:2px">${c.observaciones||''} · ${c.fecha||''}</div>
      </div>
    </div>`).join('');

  // Limpiar form
  ['cambio-motivo','cambio-anterior','cambio-nueva','cambio-fecha','cambio-obs'].forEach(id => {
    const el = document.getElementById(id); if (el) el.value = '';
  });
  toast('Cambio de tratamiento registrado ✓');
}

// ── MOTOR DE INTERACCIONES ────────────────────────────────────

async function checkInteraccionesVisita() {
  if (FarmState.visita_farmacos.length < 2) return;
  const ids = FarmState.visita_farmacos
    .filter(f => f.farmaco_id && f.estado !== 'suspendido' && f.estado !== 'contraindicado')
    .map(f => f.farmaco_id);
  if (ids.length < 2) return;

  const interacciones = await api('/farmacos/interacciones/check', 'POST', { farmaco_ids: ids });
  if (!interacciones || !interacciones.length) return;

  renderInteraccionesAlert(interacciones);
}

const SEV_COLOR = { contraindicado:'#e05c5c', grave:'#f0a742', moderada:'#a78bfa', leve:'#64748b' };
const SEV_BG    = { contraindicado:'#e05c5c18', grave:'#f0a74218', moderada:'#a78bfa18', leve:'#64748b12' };
const SEV_ICON  = { contraindicado:'🚫', grave:'⛔', moderada:'⚠️', leve:'ℹ️' };

function renderInteraccionesAlert(interacciones) {
  // Mostrar panel de interacciones encima de la lista de fármacos
  const el = document.getElementById('farm-interacciones-panel');
  if (!el) return;

  const graves = interacciones.filter(i => i.severidad === 'contraindicado' || i.severidad === 'grave');

  el.innerHTML = `
  <div style="background:${graves.length?'#e05c5c12':'#f0a74210'};border:2px solid ${graves.length?'#e05c5c':'#f0a742'};border-radius:10px;padding:16px;margin-bottom:12px">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
      <div style="font-weight:700;font-size:13px;color:${graves.length?'#e05c5c':'#f0a742'}">
        ${graves.length?'⛔':'⚠️'} ${interacciones.length} interacción${interacciones.length>1?'es':''} detectada${interacciones.length>1?'s':''}
        ${graves.length?` — ${graves.length} GRAVE${graves.length>1?'S':''}`:' — Sin contraindicaciones críticas'}
      </div>
      <button onclick="document.getElementById('farm-int-detail').style.display=document.getElementById('farm-int-detail').style.display==='none'?'block':'none'"
        style="background:none;border:none;color:var(--muted);cursor:pointer;font-size:11px">▼ Ver detalle</button>
    </div>
    <div id="farm-int-detail" style="display:block">
      ${interacciones.map(i => `
      <div style="margin-bottom:10px;padding:10px 12px;background:${SEV_BG[i.severidad]};border-left:3px solid ${SEV_COLOR[i.severidad]};border-radius:0 6px 6px 0">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
          <span style="font-size:14px">${SEV_ICON[i.severidad]}</span>
          <span style="font-weight:700;font-size:12px;color:${SEV_COLOR[i.severidad]};text-transform:uppercase">${i.severidad}</span>
          <span style="font-size:12px;font-weight:600">${i.farmaco_a} + ${i.farmaco_b}</span>
        </div>
        <div style="font-size:11px;color:var(--muted);margin-bottom:2px"><strong>Mecanismo:</strong> ${i.mecanismo}</div>
        <div style="font-size:11px;color:var(--text);margin-bottom:2px"><strong>Consecuencia:</strong> ${i.consecuencia}</div>
        <div style="font-size:11px;color:var(--accent2);font-weight:500">✦ Manejo: ${i.manejo}</div>
        ${i.evidencia?`<div style="font-size:10px;color:var(--muted);margin-top:3px">Evidencia: ${i.evidencia}</div>`:''}
      </div>`).join('')}
    </div>
  </div>`;
}

async function loadInteraccionesVisita() {
  // Llamado al abrir el tab de fármacos si ya hay medicamentos en la visita
  if (FarmState.visita_farmacos.length >= 2) {
    await checkInteraccionesVisita();
  } else {
    const el = document.getElementById('farm-interacciones-panel');
    if (el) el.innerHTML = '';
  }
}

async function deleteFarmaco(fid) {
  if (!confirm('¿Eliminar este fármaco de la visita?')) return;
  await api(`/visitas/${FarmState.vid}/farmacos/${fid}`, 'DELETE');
  FarmState.visita_farmacos = FarmState.visita_farmacos.filter(f => f.id !== fid);
  document.getElementById('farm-visita-list').innerHTML = renderFarmVisitaList();
  toast('Fármaco eliminado');
}

// ════════════════════════════════════════════════════════════
// MÓDULO DIABETES
// ════════════════════════════════════════════════════════════

function renderTabDM(dm, v) {
  const an  = v.analiticas || {};
  const r   = v.requerimientos || {};

  // Prellenar desde analíticas si no hay datos guardados
  const glucAyAuto = dm.glucemia_ayunas    || an.glucosa   || '';
  const hba1cAuto  = dm.hba1c             || an.hba1c     || '';
  const insulAuto  = dm.insulina_basal_dosis || '';

  // HbA1c estimada desde glucemia promedio (fórmula Nathan)
  // HbA1c% = (glucemia promedio + 46.7) / 28.7
  function estimarHba1c(gPromedio) {
    if (!gPromedio) return null;
    return ((gPromedio + 46.7) / 28.7).toFixed(1);
  }

  // Nivel de control glucémico
  function nivelControl(hba1c, gAyunas) {
    if (hba1c) {
      if (hba1c < 7.0) return 'optimo';
      if (hba1c < 8.0) return 'aceptable';
      return 'descontrolado';
    }
    if (gAyunas) {
      if (gAyunas < 130)  return 'optimo';
      if (gAyunas < 180)  return 'aceptable';
      return 'descontrolado';
    }
    return '';
  }

  const controlAuto = dm.control_nivel || nivelControl(hba1cAuto, glucAyAuto);
  const CTRL_COLOR = { optimo:'#22c55e', aceptable:'#f59e0b', descontrolado:'#ef4444' };
  const CTRL_LABEL = { optimo:'Óptimo', aceptable:'Aceptable', descontrolado:'Descontrolado' };

  // CHO desde requerimientos
  const choTotal = dm.cho_total_g || r.cho_g_dia || Math.round((r.kcal_objetivo||0) * (r.cho_pct||50)/100/4) || '';

  // Distribución CHO por defecto (si no hay guardados)
  const choDist = {
    desayuno:  dm.cho_desayuno_g   || (choTotal ? Math.round(choTotal*0.25) : ''),
    colacion1: dm.cho_colacion1_g  || (choTotal ? Math.round(choTotal*0.10) : ''),
    almuerzo:  dm.cho_almuerzo_g   || (choTotal ? Math.round(choTotal*0.30) : ''),
    colacion2: dm.cho_colacion2_g  || (choTotal ? Math.round(choTotal*0.10) : ''),
    cena:      dm.cho_cena_g       || (choTotal ? Math.round(choTotal*0.25) : ''),
  };

  function controlBadge(nivel) {
    if (!nivel) return '';
    const c = CTRL_COLOR[nivel]||'#888', l = CTRL_LABEL[nivel]||nivel;
    return `<span style="background:${c}22;color:${c};border:1px solid ${c}55;border-radius:20px;padding:3px 12px;font-size:12px;font-weight:700">${l}</span>`;
  }

  return `
<!-- ─── 1. CONTROL GLUCÉMICO ──────────────────────────── -->
<div class="card">
  <div class="card-title">Control glucémico
    <span style="float:right" id="dm-control-badge">${controlBadge(controlAuto)}</span>
  </div>
  <div class="g3">
    <div class="field"><label>Glucemia ayunas (mg/dL)</label>
      <div class="field-wrap">
        <input type="number" id="dm-gluc-ayunas" value="${glucAyAuto}"
          oninput="dmAutoCalc()" placeholder="mg/dL">
        <span class="field-unit">mg/dL</span>
      </div>
      <div id="dm-gluc-ayunas-ref" style="font-size:10px;margin-top:3px;color:var(--muted)">
        ${glucAyAuto ? dmGlucRef(glucAyAuto) : ''}
      </div>
    </div>
    <div class="field"><label>Glucemia postprandial 2h (mg/dL)</label>
      <div class="field-wrap">
        <input type="number" id="dm-gluc-post" value="${dm.glucemia_postprandial||''}"
          oninput="dmAutoCalc()" placeholder="mg/dL">
        <span class="field-unit">mg/dL</span>
      </div>
      <div id="dm-gluc-post-ref" style="font-size:10px;margin-top:3px;color:var(--muted)">
        ${dm.glucemia_postprandial ? dmGlucPostRef(dm.glucemia_postprandial) : ''}
      </div>
    </div>
    <div class="field"><label>Glucemia promedio (mg/dL)</label>
      <div class="field-wrap">
        <input type="number" id="dm-gluc-prom" value="${dm.glucemia_promedio||''}"
          oninput="dmAutoCalc()" placeholder="del glucómetro">
        <span class="field-unit">mg/dL</span>
      </div>
    </div>
  </div>
  <div class="g3" style="margin-top:8px">
    <div class="field"><label>HbA1c medida (%)</label>
      <div class="field-wrap">
        <input type="number" step="0.1" id="dm-hba1c" value="${hba1cAuto}"
          oninput="dmAutoCalc()" placeholder="%">
        <span class="field-unit">%</span>
      </div>
      <div id="dm-hba1c-ref" style="font-size:10px;margin-top:3px;color:var(--muted)">
        ${hba1cAuto ? dmHba1cRef(hba1cAuto) : ''}
      </div>
    </div>
    <div>
      <div style="font-size:11px;color:var(--muted);margin-bottom:4px">HbA1c estimada desde promedio</div>
      <div class="computed" id="dm-hba1c-est" style="font-size:15px;color:var(--accent)">
        ${dm.glucemia_promedio ? estimarHba1c(dm.glucemia_promedio)+'%' : '—'}
      </div>
      <div style="font-size:10px;color:var(--muted);margin-top:2px">Fórmula Nathan: (prom+46.7)/28.7</div>
    </div>
    <div class="field"><label>Fructosamina (µmol/L)</label>
      <div class="field-wrap">
        <input type="number" id="dm-fruct" value="${dm.fructosamina||''}" placeholder="opcional">
        <span class="field-unit">µmol/L</span>
      </div>
      <div style="font-size:10px;color:var(--muted);margin-top:3px">Normal: 200-285 µmol/L</div>
    </div>
  </div>

  <!-- Nivel de control -->
  <div style="background:var(--bg);border:1px solid var(--border);border-radius:8px;padding:12px;margin-top:10px">
    <div style="font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px">Clasificación del control glucémico</div>
    <div style="display:flex;gap:10px;flex-wrap:wrap">
      ${['optimo','aceptable','descontrolado'].map(k => `
        <label style="cursor:pointer">
          <input type="radio" name="dm_control" value="${k}" ${controlAuto===k?'checked':''} onchange="dmUpdateBadge()" id="dm-ctrl-${k}" style="display:none">
          <div onclick="document.getElementById('dm-ctrl-${k}').click()" style="padding:7px 16px;border-radius:8px;font-weight:600;font-size:12px;border:2px solid ${controlAuto===k?CTRL_COLOR[k]:'var(--border)'};background:${controlAuto===k?CTRL_COLOR[k]+'22':'var(--bg)'};color:${controlAuto===k?CTRL_COLOR[k]:'var(--muted)'};cursor:pointer;transition:.15s">
            ${CTRL_LABEL[k]}<br>
            <span style="font-size:10px;font-weight:400">${{optimo:'HbA1c <7% / GA <130',aceptable:'HbA1c 7-8% / GA 130-180',descontrolado:'HbA1c >8% / GA >180'}[k]}</span>
          </div>
        </label>`).join('')}
    </div>
  </div>
</div>

<!-- ─── 2. TIEMPO EN RANGO (CGM) ──────────────────────── -->
<div class="card">
  <div class="card-title">Tiempo en rango — TAR
    <span style="float:right;font-size:10px;font-weight:400;color:var(--muted)">Solo si usa monitoreo continuo (CGM/Flash)</span>
  </div>
  <div class="g4">
    <div class="field"><label style="color:#22c55e;font-weight:700">En rango (70-180 mg/dL)</label>
      <div class="field-wrap">
        <input type="number" step="0.1" id="dm-tar-rango" value="${dm.tar_en_rango||''}"
          oninput="dmTarCalc()" placeholder="%" max="100">
        <span class="field-unit">%</span>
      </div>
      <div style="font-size:10px;color:var(--muted);margin-top:2px">Meta: ≥70%</div>
    </div>
    <div class="field"><label style="color:#ef4444;font-weight:700">Por debajo rango (&lt;70)</label>
      <div class="field-wrap">
        <input type="number" step="0.1" id="dm-tar-bajo" value="${dm.tar_debajo_rango||''}"
          oninput="dmTarCalc()" placeholder="%" max="100">
        <span class="field-unit">%</span>
      </div>
      <div style="font-size:10px;color:var(--muted);margin-top:2px">Meta: &lt;4%</div>
    </div>
    <div class="field"><label style="color:#f97316;font-weight:700">Por encima rango (&gt;180)</label>
      <div class="field-wrap">
        <input type="number" step="0.1" id="dm-tar-alto" value="${dm.tar_encima_rango||''}"
          oninput="dmTarCalc()" placeholder="%" max="100">
        <span class="field-unit">%</span>
      </div>
      <div style="font-size:10px;color:var(--muted);margin-top:2px">Meta: &lt;25%</div>
    </div>
    <div class="field"><label style="color:#7f1d1d;font-weight:700">Hipoglucemia (&lt;54)</label>
      <div class="field-wrap">
        <input type="number" step="0.1" id="dm-tar-hipo" value="${dm.tar_hipoglucemia||''}"
          oninput="dmTarCalc()" placeholder="%" max="100">
        <span class="field-unit">%</span>
      </div>
      <div style="font-size:10px;color:var(--muted);margin-top:2px">Meta: &lt;1%</div>
    </div>
  </div>
  <!-- Barra TAR visual -->
  <div style="margin-top:10px" id="dm-tar-bar-wrap">
    <div style="font-size:10px;color:var(--muted);margin-bottom:4px">Distribución TAR</div>
    <div id="dm-tar-bar" style="height:20px;border-radius:6px;overflow:hidden;display:flex;background:var(--border)"></div>
    <div id="dm-tar-legend" style="display:flex;gap:14px;margin-top:5px;font-size:10px;color:var(--muted)"></div>
  </div>
  <div style="margin-top:8px" id="dm-tar-eval"></div>
</div>

<!-- ─── 3. INSULINA BASAL ──────────────────────────────── -->
<div class="card">
  <div class="card-title">Insulina basal</div>
  <div class="g3">
    <div class="field"><label>Tipo de insulina basal</label>
      <select id="dm-ins-tipo" onchange="dmInsChange()">
        <option value="ninguna" ${(dm.insulina_basal_tipo||'ninguna')==='ninguna'?'selected':''}>Sin insulina basal</option>
        <option value="glargina"  ${dm.insulina_basal_tipo==='glargina'?'selected':''}>Glargina (Lantus / Toujeo)</option>
        <option value="degludec"  ${dm.insulina_basal_tipo==='degludec'?'selected':''}>Degludec (Tresiba)</option>
        <option value="detemir"   ${dm.insulina_basal_tipo==='detemir'?'selected':''}>Detemir (Levemir)</option>
        <option value="nph"       ${dm.insulina_basal_tipo==='nph'?'selected':''}>NPH (Insulina N)</option>
        <option value="glargina300" ${dm.insulina_basal_tipo==='glargina300'?'selected':''}>Glargina 300 U/mL (Toujeo Max)</option>
      </select>
    </div>
    <div class="field" id="dm-ins-dosis-wrap" style="display:${dm.insulina_basal_tipo && dm.insulina_basal_tipo!=='ninguna'?'block':'none'}">
      <label>Dosis (unidades)</label>
      <div class="field-wrap">
        <input type="number" step="1" id="dm-ins-dosis" value="${insulAuto}" placeholder="UI">
        <span class="field-unit">UI</span>
      </div>
    </div>
    <div class="field" id="dm-ins-horario-wrap" style="display:${dm.insulina_basal_tipo && dm.insulina_basal_tipo!=='ninguna'?'block':'none'}">
      <label>Horario de aplicación</label>
      <select id="dm-ins-horario">
        <option value="noche"   ${(dm.insulina_basal_horario||'noche')==='noche'?'selected':''}>Nocturno (22:00)</option>
        <option value="manana"  ${dm.insulina_basal_horario==='manana'?'selected':''}>Mañana (8:00)</option>
        <option value="2_dosis" ${dm.insulina_basal_horario==='2_dosis'?'selected':''}>2 dosis (NPH)</option>
      </select>
    </div>
  </div>

  <!-- Insulina rápida / bolo -->
  <div style="margin-top:10px;border-top:1px solid var(--border);padding-top:10px">
    <label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-size:12px;font-weight:600">
      <input type="checkbox" id="dm-ins-rapida" ${dm.insulina_rapida?'checked':''} onchange="dmInsRapidaChange()">
      Usa insulina rápida / bolo
    </label>
    <div id="dm-ins-rapida-wrap" style="display:${dm.insulina_rapida?'grid':'none'};grid-template-columns:1fr 1fr 1fr;gap:10px;margin-top:10px">
      <div class="field"><label>Tipo</label>
        <select id="dm-ins-rapida-tipo">
          <option value="lispro"   ${dm.insulina_rapida_tipo==='lispro'?'selected':''}>Lispro (Humalog)</option>
          <option value="aspart"   ${dm.insulina_rapida_tipo==='aspart'?'selected':''}>Aspart (NovoRapid)</option>
          <option value="glulisina" ${dm.insulina_rapida_tipo==='glulisina'?'selected':''}>Glulisina (Apidra)</option>
          <option value="regular"  ${dm.insulina_rapida_tipo==='regular'?'selected':''}>Regular (R)</option>
        </select>
      </div>
      <div class="field"><label>Ratio insulina:CHO</label>
        <div class="field-wrap">
          <input type="number" step="0.5" id="dm-ratio-cho" value="${dm.ratio_insulina_cho||''}" placeholder="1 UI por…">
          <span class="field-unit">UI/10g</span>
        </div>
      </div>
      <div class="field"><label>Factor de sensibilidad</label>
        <div class="field-wrap">
          <input type="number" step="1" id="dm-factor-sens" value="${dm.factor_sensibilidad||''}" placeholder="ej. 50">
          <span class="field-unit">mg/dL/UI</span>
        </div>
        <div style="font-size:10px;color:var(--muted);margin-top:2px">Cuánto baja 1 UI</div>
      </div>
    </div>
  </div>

  <!-- Tratamiento general -->
  <div style="margin-top:10px;border-top:1px solid var(--border);padding-top:10px">
    <div class="g2">
      <div class="field"><label>Tipo de tratamiento DM</label>
        <select id="dm-trat-tipo">
          <option value="solo_dieta" ${(dm.tratamiento_tipo||'solo_dieta')==='solo_dieta'?'selected':''}>Solo dieta / estilo de vida</option>
          <option value="aod"        ${dm.tratamiento_tipo==='aod'?'selected':''}>Antidiabéticos orales (ADO)</option>
          <option value="glp1"       ${dm.tratamiento_tipo==='glp1'?'selected':''}>Agonista GLP-1 (semaglutida/tirzepatida)</option>
          <option value="insulina"   ${dm.tratamiento_tipo==='insulina'?'selected':''}>Insulinoterapia</option>
          <option value="combinado"  ${dm.tratamiento_tipo==='combinado'?'selected':''}>Combinado (ADO + insulina)</option>
        </select>
      </div>
      <div class="field"><label>Medicamentos DM (detalle)</label>
        <input type="text" id="dm-medicamentos" value="${dm.medicamentos_dm||''}"
          placeholder="ej. Metformina 1g c/12h + Glargina 20 UI nocturna">
      </div>
    </div>
  </div>
</div>

<!-- ─── 4. GLUCOMETRÍA DIARIA ─────────────────────────── -->
<div class="card">
  <div class="card-title">Glucometría — Promedios por momento del día</div>
  <div style="overflow-x:auto">
    <table style="width:100%;border-collapse:collapse;font-size:12px">
      <thead>
        <tr style="background:var(--bg2)">
          <th style="padding:8px 10px;text-align:left;font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase">Momento</th>
          <th style="padding:8px 10px;text-align:center;font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase">Promedio (mg/dL)</th>
          <th style="padding:8px 10px;text-align:center;font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase">Meta ADA</th>
          <th style="padding:8px 10px;text-align:center;font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase">Estado</th>
        </tr>
      </thead>
      <tbody>
        ${[
          ['gluco_ayunas_prom',        'Ayunas / Preprandial',     '80-130'],
          ['gluco_pre_almuerzo_prom',  'Pre-almuerzo',             '80-130'],
          ['gluco_post_almuerzo_prom', 'Post-almuerzo (2h)',       '<180'],
          ['gluco_pre_cena_prom',      'Pre-cena',                 '80-130'],
          ['gluco_post_cena_prom',     'Post-cena (2h)',           '<180'],
          ['gluco_nocturna_prom',      'Nocturna (3am)',           '100-140'],
        ].map(([field, label, meta]) => `
          <tr style="border-bottom:1px solid var(--border)">
            <td style="padding:7px 10px;font-weight:500">${label}</td>
            <td style="padding:7px 10px;text-align:center">
              <div class="field-wrap" style="justify-content:center">
                <input type="number" id="dm-${field}" value="${dm[field]||''}"
                  oninput="dmGlucoCheck('dm-${field}','${meta}')"
                  style="width:90px;text-align:center;font-size:13px;font-weight:600" placeholder="—">
                <span class="field-unit">mg/dL</span>
              </div>
            </td>
            <td style="padding:7px 10px;text-align:center;color:var(--muted);font-size:11px">${meta}</td>
            <td style="padding:7px 10px;text-align:center" id="dm-${field}-st">—</td>
          </tr>`).join('')}
      </tbody>
    </table>
  </div>
  <div style="display:flex;justify-content:flex-end;margin-top:8px">
    <button class="btn btn-ghost btn-sm" onclick="dmCalcPromedio()">📊 Calcular promedio general</button>
  </div>
  <div id="dm-prom-res" style="margin-top:8px;display:none;padding:10px;background:var(--bg);border-radius:8px;font-size:12px"></div>
</div>

<!-- ─── 5. HIPOGLUCEMIAS ───────────────────────────────── -->
<div class="card" style="border-top:3px solid #ef4444">
  <div class="card-title" style="color:#ef4444">Hipoglucemias</div>
  <div class="g3">
    <div class="field"><label>Episodios por semana</label>
      <input type="number" id="dm-hipo-n" value="${dm.hipo_episodios_semana||''}" placeholder="0" min="0">
    </div>
    <div>
      <div style="font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;margin-bottom:6px">Nivel de severidad</div>
      <label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-size:12px;padding:2px 0">
        <input type="checkbox" id="dm-hipo-n1" ${dm.hipo_nivel1?'checked':''}> Nivel 1 — 54-70 mg/dL (alerta)
      </label>
      <label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-size:12px;padding:2px 0">
        <input type="checkbox" id="dm-hipo-n2" ${dm.hipo_nivel2?'checked':''}> Nivel 2 — &lt;54 mg/dL (clínicamente significativa)
      </label>
      <label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-size:12px;padding:2px 0">
        <input type="checkbox" id="dm-hipo-n3" ${dm.hipo_nivel3?'checked':''}> Nivel 3 — Severa (requirió ayuda/glucagón)
      </label>
    </div>
    <div>
      <div class="field"><label>Horario más frecuente</label>
        <select id="dm-hipo-horario">
          <option value="" ${!dm.hipo_horario?'selected':''}>—</option>
          <option value="manana"    ${dm.hipo_horario==='manana'?'selected':''}>Mañana (en ayunas)</option>
          <option value="tarde"     ${dm.hipo_horario==='tarde'?'selected':''}>Tarde (preprandial)</option>
          <option value="noche"     ${dm.hipo_horario==='noche'?'selected':''}>Nocturna</option>
          <option value="post_ejercicio" ${dm.hipo_horario==='post_ejercicio'?'selected':''}>Post-ejercicio</option>
          <option value="variable"  ${dm.hipo_horario==='variable'?'selected':''}>Variable / sin patrón</option>
        </select>
      </div>
      <div class="field"><label>Causa probable</label>
        <input type="text" id="dm-hipo-causa" value="${dm.hipo_causa||''}"
          placeholder="ej. omisión de colación, dosis alta basal…">
      </div>
    </div>
  </div>
</div>

<!-- ─── 6. DISTRIBUCIÓN DE CHO ────────────────────────── -->
<div class="card">
  <div class="card-title">Distribución de carbohidratos por tiempo de comida
    ${choTotal ? `<span style="float:right;font-size:11px;font-weight:400;color:var(--muted)">Total plan: <strong>${choTotal} g CHO/día</strong></span>` : ''}
  </div>
  <div style="overflow-x:auto">
    <table style="width:100%;border-collapse:collapse;font-size:12px">
      <thead>
        <tr style="background:var(--bg2)">
          <th style="padding:8px 10px;text-align:left;font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase">Tiempo de comida</th>
          <th style="padding:8px 10px;text-align:center;font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase">CHO (g)</th>
          <th style="padding:8px 10px;text-align:center;font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase">% del total</th>
          <th style="padding:8px 10px;text-align:center;font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase">Raciones (15g)</th>
        </tr>
      </thead>
      <tbody>
        ${[
          ['desayuno',  'Desayuno',          choDist.desayuno],
          ['colacion1', '🥜 Colación AM',     choDist.colacion1],
          ['almuerzo',  'Almuerzo',           choDist.almuerzo],
          ['colacion2', '🍎 Colación PM',     choDist.colacion2],
          ['cena',      'Cena',               choDist.cena],
        ].map(([id, label, val]) => `
          <tr style="border-bottom:1px solid var(--border)">
            <td style="padding:7px 10px;font-weight:500">${label}</td>
            <td style="padding:7px 10px;text-align:center">
              <div class="field-wrap" style="justify-content:center">
                <input type="number" id="dm-cho-${id}" value="${val||''}"
                  oninput="dmChoPct()" style="width:80px;text-align:center;font-size:13px;font-weight:600">
                <span class="field-unit">g</span>
              </div>
            </td>
            <td style="padding:7px 10px;text-align:center;color:var(--accent);font-weight:600" id="dm-cho-${id}-pct">—</td>
            <td style="padding:7px 10px;text-align:center;color:var(--muted)" id="dm-cho-${id}-rac">—</td>
          </tr>`).join('')}
        <tr style="background:var(--bg2);font-weight:700">
          <td style="padding:7px 10px">Total</td>
          <td style="padding:7px 10px;text-align:center" id="dm-cho-total-calc">—</td>
          <td style="padding:7px 10px;text-align:center" id="dm-cho-total-pct">—</td>
          <td style="padding:7px 10px;text-align:center" id="dm-cho-total-rac">—</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div style="margin-top:8px;font-size:11px;color:var(--muted)">
    1 ración = 15 g CHO &nbsp;·&nbsp; Distribución recomendada: 25% D / 10% Col-AM / 30% A / 10% Col-PM / 25% C
  </div>
</div>

<!-- ─── 7. METAS ──────────────────────────────────────── -->
<div class="card">
  <div class="card-title">Metas glucémicas individualizadas</div>
  <div class="g3">
    <div class="field"><label>Meta HbA1c</label>
      <select id="dm-meta-hba1c">
        <option value="">—</option>
        <option value="6.5" ${dm.meta_hba1c==6.5?'selected':''}>≤6.5% — Joven, sin hipoglucemias, recién diagnóstico</option>
        <option value="7.0" ${(dm.meta_hba1c||7.0)==7.0?'selected':''}>≤7.0% — Estándar ADA 2024</option>
        <option value="7.5" ${dm.meta_hba1c==7.5?'selected':''}>≤7.5% — Comorbilidades / hipoglucemias</option>
        <option value="8.0" ${dm.meta_hba1c==8.0?'selected':''}>≤8.0% — Adulto mayor / fragilidad</option>
        <option value="8.5" ${dm.meta_hba1c==8.5?'selected':''}>≤8.5% — Muy frágil / limitada esperanza de vida</option>
      </select>
    </div>
    <div class="field"><label>Meta glucemia ayunas</label>
      <select id="dm-meta-gluc">
        <option value="">—</option>
        <option value="80-130" ${(dm.meta_glucemia_ayunas||'80-130')==='80-130'?'selected':''}>80-130 mg/dL — ADA Estándar</option>
        <option value="90-130" ${dm.meta_glucemia_ayunas==='90-130'?'selected':''}>90-130 mg/dL — ERC / riesgo hipoglucemia</option>
        <option value="100-150" ${dm.meta_glucemia_ayunas==='100-150'?'selected':''}>100-150 mg/dL — Adulto mayor frágil</option>
        <option value="110-180" ${dm.meta_glucemia_ayunas==='110-180'?'selected':''}>110-180 mg/dL — Paliativo / institucionalizado</option>
      </select>
    </div>
    <div class="field"><label>Meta TAR en rango (%)</label>
      <select id="dm-meta-tar">
        <option value="">—</option>
        <option value="70" ${(dm.meta_tar||70)==70?'selected':''}>≥70% — ADA/EASD Estándar</option>
        <option value="50" ${dm.meta_tar==50?'selected':''}>≥50% — Adulto mayor / fragilidad</option>
        <option value="80" ${dm.meta_tar==80?'selected':''}>≥80% — Embarazo con DM</option>
      </select>
    </div>
  </div>
  <div class="field" style="margin-top:8px"><label>Notas / Plan de ajuste</label>
    <textarea id="dm-notas" rows="2" placeholder="ej. Ajustar dosis basal si glucemia ayunas >140 por 3 días consecutivos…">${dm.notas||''}</textarea>
  </div>
</div>

<div style="display:flex;justify-content:flex-end;margin-top:4px">
  <button class="btn btn-success" onclick="saveDM()">Guardar módulo diabetes</button>
</div>`;
}

// ── HELPERS MÓDULO DIABETES ──────────────────────────────────

function dmGlucRef(g) {
  g = parseFloat(g);
  if (!g) return '';
  if (g < 70)  return '🔴 Hipoglucemia';
  if (g < 100) return '🟢 Normal';
  if (g < 126) return '🟡 Glucosa alterada en ayunas (prediabetes)';
  return '🔴 Compatible con diabetes (≥126 mg/dL)';
}
function dmGlucPostRef(g) {
  g = parseFloat(g);
  if (!g) return '';
  if (g < 140) return '🟢 Normal (&lt;140 mg/dL)';
  if (g < 200) return '🟡 Intolerancia glucosa (140-199)';
  return '🔴 DM — glucemia 2h ≥200 mg/dL';
}
function dmHba1cRef(h) {
  h = parseFloat(h);
  if (!h) return '';
  if (h < 5.7) return '🟢 Normal';
  if (h < 6.5) return '🟡 Prediabetes (5.7-6.4%)';
  if (h < 7.0) return '🟢 DM controlada (meta ≤7%)';
  if (h < 8.0) return '🟡 Control aceptable';
  return '🔴 DM descontrolada (>8%)';
}

function dmAutoCalc() {
  // Actualizar refs
  const ga   = document.getElementById('dm-gluc-ayunas')?.value;
  const gp   = document.getElementById('dm-gluc-post')?.value;
  const prom = document.getElementById('dm-gluc-prom')?.value;
  const hba1c= document.getElementById('dm-hba1c')?.value;

  const refAyEl = document.getElementById('dm-gluc-ayunas-ref');
  if (refAyEl && ga) refAyEl.textContent = dmGlucRef(ga);

  const refPoEl = document.getElementById('dm-gluc-post-ref');
  if (refPoEl && gp) refPoEl.textContent = dmGlucPostRef(gp);

  const refHbEl = document.getElementById('dm-hba1c-ref');
  if (refHbEl && hba1c) refHbEl.textContent = dmHba1cRef(hba1c);

  // HbA1c estimada desde promedio
  if (prom) {
    const est = ((parseFloat(prom) + 46.7) / 28.7).toFixed(1);
    const el = document.getElementById('dm-hba1c-est');
    if (el) el.textContent = est + '%';
  }

  // Auto-seleccionar nivel de control
  const h = parseFloat(hba1c) || 0;
  const g = parseFloat(ga)    || 0;
  let nivel = '';
  if (h)      nivel = h < 7 ? 'optimo' : h < 8 ? 'aceptable' : 'descontrolado';
  else if (g) nivel = g < 130 ? 'optimo' : g < 180 ? 'aceptable' : 'descontrolado';
  if (nivel) {
    const rb = document.querySelector(`input[name="dm_control"][value="${nivel}"]`);
    if (rb) rb.checked = true;
    dmUpdateBadge();
  }
}

function dmUpdateBadge() {
  const nivel = document.querySelector('input[name="dm_control"]:checked')?.value || '';
  const CTRL_COLOR = { optimo:'#22c55e', aceptable:'#f59e0b', descontrolado:'#ef4444' };
  const CTRL_LABEL = { optimo:'Óptimo', aceptable:'Aceptable', descontrolado:'Descontrolado' };
  const el = document.getElementById('dm-control-badge');
  if (el && nivel) {
    const c = CTRL_COLOR[nivel], l = CTRL_LABEL[nivel];
    el.innerHTML = `<span style="background:${c}22;color:${c};border:1px solid ${c}55;border-radius:20px;padding:3px 12px;font-size:12px;font-weight:700">${l}</span>`;
  }
}

function dmTarCalc() {
  const r = parseFloat(document.getElementById('dm-tar-rango')?.value) || 0;
  const b = parseFloat(document.getElementById('dm-tar-bajo')?.value)  || 0;
  const a = parseFloat(document.getElementById('dm-tar-alto')?.value)  || 0;
  const h = parseFloat(document.getElementById('dm-tar-hipo')?.value)  || 0;

  const bar = document.getElementById('dm-tar-bar');
  const leg = document.getElementById('dm-tar-legend');
  if (bar && (r || b || a)) {
    bar.innerHTML = `
      <div style="width:${b}%;background:#ef4444;height:100%" title="Bajo rango ${b}%"></div>
      <div style="width:${r}%;background:#22c55e;height:100%" title="En rango ${r}%"></div>
      <div style="width:${a}%;background:#f97316;height:100%" title="Sobre rango ${a}%"></div>`;
    leg.innerHTML = `
      <span><span style="display:inline-block;width:10px;height:10px;background:#22c55e;border-radius:2px;margin-right:3px"></span>En rango ${r}% ${r>=70?'✔':r>=50?'⚠':'✘'}</span>
      <span><span style="display:inline-block;width:10px;height:10px;background:#f97316;border-radius:2px;margin-right:3px"></span>Alto ${a}% ${a<=25?'✔':'✘'}</span>
      <span><span style="display:inline-block;width:10px;height:10px;background:#ef4444;border-radius:2px;margin-right:3px"></span>Bajo ${b}% ${b<=4?'✔':'✘'}</span>
      <span><span style="display:inline-block;width:10px;height:10px;background:#7f1d1d;border-radius:2px;margin-right:3px"></span>Hipo severa ${h}% ${h<=1?'✔':'✘'}</span>`;
  }

  const evalEl = document.getElementById('dm-tar-eval');
  if (evalEl && r) {
    const ok_tar = r >= 70, ok_bajo = b <= 4, ok_alto = a <= 25;
    const msgs = [];
    if (!ok_tar)  msgs.push(`TAR ${r}% — Meta ≥70% (ADA/TIR 2019)`);
    if (!ok_bajo) msgs.push(`Tiempo bajo rango ${b}% — Meta &lt;4% (riesgo hipoglucemia)`);
    if (!ok_alto) msgs.push(`Tiempo sobre rango ${a}% — Meta &lt;25%`);
    if (h > 1)    msgs.push(`Hipoglucemia severa ${h}% — Meta &lt;1%`);
    evalEl.innerHTML = msgs.length
      ? `<div style="background:#fef3c722;border-left:3px solid #f59e0b;border-radius:0 6px 6px 0;padding:8px 12px;font-size:11px">${msgs.map(m=>`⚠ ${m}`).join('<br>')}</div>`
      : `<div style="background:#f0fdf422;border-left:3px solid #22c55e;border-radius:0 6px 6px 0;padding:8px 12px;font-size:11px;color:#15803d">✔ TAR dentro de metas recomendadas (ADA 2024)</div>`;
  }
}

function dmInsChange() {
  const tipo = document.getElementById('dm-ins-tipo')?.value;
  const show = tipo && tipo !== 'ninguna';
  const dw = document.getElementById('dm-ins-dosis-wrap');
  const hw = document.getElementById('dm-ins-horario-wrap');
  if (dw) dw.style.display = show ? 'block' : 'none';
  if (hw) hw.style.display = show ? 'block' : 'none';
}

function dmInsRapidaChange() {
  const cb = document.getElementById('dm-ins-rapida');
  const wr = document.getElementById('dm-ins-rapida-wrap');
  if (wr) wr.style.display = cb?.checked ? 'grid' : 'none';
}

function dmGlucoCheck(id, meta) {
  const val = parseFloat(document.getElementById(id)?.value);
  const stEl = document.getElementById(id + '-st');
  if (!stEl || !val) return;
  let color = '#22c55e', label = '✔';
  if (meta === '<180') {
    if (val >= 180) { color = '#ef4444'; label = '✘ Alto'; }
    else label = '✔ OK';
  } else if (meta === '100-140') {
    if (val < 100 || val > 140) { color = val < 100 ? '#ef4444' : '#f97316'; label = val < 100 ? '✘ Bajo' : '⚠ Alto'; }
    else label = '✔ OK';
  } else { // 80-130 default
    if (val < 80)  { color = '#ef4444'; label = '✘ Hipo'; }
    else if (val > 130) { color = '#f97316'; label = '⚠ Alto'; }
    else label = '✔ OK';
  }
  stEl.innerHTML = `<span style="color:${color};font-weight:700;font-size:12px">${label}</span>`;
}

function dmCalcPromedio() {
  const fields = ['gluco_ayunas_prom','gluco_pre_almuerzo_prom','gluco_post_almuerzo_prom','gluco_pre_cena_prom','gluco_post_cena_prom','gluco_nocturna_prom'];
  const vals = fields.map(f => parseFloat(document.getElementById('dm-'+f)?.value)).filter(n => !isNaN(n) && n > 0);
  if (!vals.length) return;
  const prom = (vals.reduce((a,b)=>a+b,0)/vals.length).toFixed(0);
  const hba1cEst = ((parseFloat(prom)+46.7)/28.7).toFixed(1);
  const el = document.getElementById('dm-prom-res');
  if (el) {
    el.style.display = 'block';
    el.innerHTML = `<strong>Promedio glucémico:</strong> ${prom} mg/dL &nbsp;·&nbsp; <strong>HbA1c estimada:</strong> ${hba1cEst}% &nbsp;·&nbsp; <span style="font-size:10px;color:var(--muted)">(${vals.length} momentos del día)</span>`;
    const promEl = document.getElementById('dm-gluc-prom');
    if (promEl && !promEl.value) promEl.value = prom;
    const estEl = document.getElementById('dm-hba1c-est');
    if (estEl) estEl.textContent = hba1cEst + '%';
  }
}

function dmChoPct() {
  const ids = ['desayuno','colacion1','almuerzo','colacion2','cena'];
  const vals = ids.map(id => parseFloat(document.getElementById('dm-cho-'+id)?.value)||0);
  const total = vals.reduce((a,b)=>a+b,0);
  ids.forEach((id, i) => {
    const pct = total ? (vals[i]/total*100).toFixed(0) : '—';
    const rac = vals[i] ? (vals[i]/15).toFixed(1) : '—';
    const pEl = document.getElementById('dm-cho-'+id+'-pct');
    const rEl = document.getElementById('dm-cho-'+id+'-rac');
    if (pEl) pEl.textContent = total ? pct+'%' : '—';
    if (rEl) rEl.textContent = vals[i] ? rac+' rac' : '—';
  });
  const totEl  = document.getElementById('dm-cho-total-calc');
  const totPct = document.getElementById('dm-cho-total-pct');
  const totRac = document.getElementById('dm-cho-total-rac');
  if (totEl)  totEl.textContent  = total ? total+'g' : '—';
  if (totPct) totPct.textContent = total ? '100%' : '—';
  if (totRac) totRac.textContent = total ? (total/15).toFixed(1)+' rac' : '—';
}

async function saveDM() {
  const vid = State.currentVisita?.id;
  if (!vid) return;
  const getV  = id => document.getElementById(id)?.value   || null;
  const getN  = id => parseFloat(document.getElementById(id)?.value) || null;
  const getCh = id => document.getElementById(id)?.checked ? 1 : 0;
  const getR  = name => document.querySelector(`input[name="${name}"]:checked`)?.value || null;

  const body = {
    fecha: State.currentVisita.fecha,
    glucemia_ayunas:       getN('dm-gluc-ayunas'),
    glucemia_postprandial: getN('dm-gluc-post'),
    glucemia_promedio:     getN('dm-gluc-prom'),
    hba1c:                 getN('dm-hba1c'),
    hba1c_estimada:        getN('dm-hba1c-est') || parseFloat(document.getElementById('dm-hba1c-est')?.textContent) || null,
    fructosamina:          getN('dm-fruct'),
    control_nivel:         getR('dm_control'),
    tar_en_rango:          getN('dm-tar-rango'),
    tar_debajo_rango:      getN('dm-tar-bajo'),
    tar_encima_rango:      getN('dm-tar-alto'),
    tar_hipoglucemia:      getN('dm-tar-hipo'),
    insulina_basal_tipo:   getV('dm-ins-tipo'),
    insulina_basal_dosis:  getN('dm-ins-dosis'),
    insulina_basal_horario:getV('dm-ins-horario'),
    insulina_rapida:       getCh('dm-ins-rapida'),
    insulina_rapida_tipo:  getV('dm-ins-rapida-tipo'),
    ratio_insulina_cho:    getN('dm-ratio-cho'),
    factor_sensibilidad:   getN('dm-factor-sens'),
    gluco_ayunas_prom:          getN('dm-gluco_ayunas_prom'),
    gluco_pre_almuerzo_prom:    getN('dm-gluco_pre_almuerzo_prom'),
    gluco_post_almuerzo_prom:   getN('dm-gluco_post_almuerzo_prom'),
    gluco_pre_cena_prom:        getN('dm-gluco_pre_cena_prom'),
    gluco_post_cena_prom:       getN('dm-gluco_post_cena_prom'),
    gluco_nocturna_prom:        getN('dm-gluco_nocturna_prom'),
    hipo_episodios_semana: getN('dm-hipo-n'),
    hipo_nivel1:           getCh('dm-hipo-n1'),
    hipo_nivel2:           getCh('dm-hipo-n2'),
    hipo_nivel3:           getCh('dm-hipo-n3'),
    hipo_causa:            getV('dm-hipo-causa'),
    hipo_horario:          getV('dm-hipo-horario'),
    cho_total_g:           getN('dm-cho-total-calc') || null,
    cho_desayuno_g:        getN('dm-cho-desayuno'),
    cho_colacion1_g:       getN('dm-cho-colacion1'),
    cho_almuerzo_g:        getN('dm-cho-almuerzo'),
    cho_colacion2_g:       getN('dm-cho-colacion2'),
    cho_cena_g:            getN('dm-cho-cena'),
    tratamiento_tipo:      getV('dm-trat-tipo'),
    medicamentos_dm:       getV('dm-medicamentos'),
    meta_hba1c:            getN('dm-meta-hba1c'),
    meta_glucemia_ayunas:  getV('dm-meta-gluc'),
    meta_tar:              getN('dm-meta-tar'),
    notas:                 getV('dm-notas'),
  };

  await api(`/visitas/${vid}/diabetes`, 'POST', body);
  toast('Módulo diabetes guardado ✓');
  if (State.currentVisita) State.currentVisita.diabetes = body;
}

// ════════════════════════════════════════════════════════════
// MÓDULO RENAL
// ════════════════════════════════════════════════════════════

function renderTabRenal(rn, v) {
  const an  = v.analiticas || {};
  const cc  = v.composicion_corporal || {};
  const req = v.requerimientos || {};

  // Auto desde analíticas
  const egfr    = an.egfr || null;
  const estadioAuto = an.egfr_estadio || (egfr ? egfrLabel(egfr) : '');
  const caAuto  = an.calcio    || rn.calcio    || '';
  const pAuto   = an.fosforo   || rn.fosforo   || '';
  const pthAuto = an.pth       || rn.pth_intacta || '';
  const vdAuto  = an.vitamina_d || rn.vitamina_d_25 || '';
  const hbAuto  = an.hemoglobina || rn.hemoglobina || '';
  const ferrAuto= an.ferritina || rn.ferritina || '';
  const albAuto = an.albumina  || rn.albumina_renal || '';
  const hco3Auto= an.bicarbonato || rn.bicarbonato || '';

  const estadioCur = rn.estadio_erc || estadioAuto || '';
  const modalidadCur = rn.modalidad || (
    estadioCur==='HD' ? 'hd' : estadioCur==='DP' ? 'dp' :
    egfr && egfr < 15 ? 'conservador' : 'conservador'
  );

  function egfrLabel(e) {
    if (e >= 90) return 'G1'; if (e >= 60) return 'G2';
    if (e >= 45) return 'G3a'; if (e >= 30) return 'G3b';
    if (e >= 15) return 'G4'; return 'G5';
  }

  // Semáforo Ca/P/PTH
  function semMin(val, min, max) {
    if (!val) return '';
    const v = parseFloat(val);
    if (v < min) return '🔴';
    if (v > max) return '🔴';
    return '🟢';
  }

  // Producto Ca×P (meta <55 mg²/dL² en ERC)
  const prodCaP = (caAuto && pAuto)
    ? (parseFloat(caAuto) * parseFloat(pAuto)).toFixed(1) : (rn.producto_ca_p || '');

  const isDialisis = ['hd','dp'].includes(modalidadCur);
  const isHD = modalidadCur === 'hd';
  const isDP = modalidadCur === 'dp';

  // Restricciones por estadio (desde requerimientos si ya calculado)
  const restNa = rn.restriccion_na_mg || req.sodio_mg || '';
  const restK  = rn.restriccion_k_mg  || req.potasio_mg || '';
  const restP  = rn.restriccion_p_mg  || req.fosforo_mg || '';
  const restH2O= rn.restriccion_agua_ml || '';
  const protG  = rn.proteina_g_dia    || req.proteina_g_dia || '';

  // Kt/V estimado desde BUN (fórmula Daugirdas segunda generación)
  function calcKtV(preBUN, postBUN, pesoSeco, ganancia, durH) {
    if (!preBUN || !postBUN || !pesoSeco) return null;
    const r  = postBUN / preBUN;
    const t  = (durH || 4) * 60; // minutos
    const uf = (ganancia || 0) / pesoSeco;
    const ktv = -Math.log(r - 0.008 * t) + (4 - 3.5 * r) * uf;
    return ktv.toFixed(2);
  }
  const ktvAuto = rn.pre_bun && rn.post_bun
    ? calcKtV(rn.pre_bun, rn.post_bun, rn.peso_seco, rn.ganancia_interdial_kg, rn.duracion_sesion_h)
    : rn.ktv_calculado || '';

  function ktvChip(val, meta) {
    if (!val) return '';
    const ok = parseFloat(val) >= parseFloat(meta || 1.2);
    return `<span style="background:${ok?'#22c55e22':'#ef444422'};color:${ok?'#15803d':'#ef4444'};border:1px solid ${ok?'#22c55e55':'#ef444455'};border-radius:20px;padding:2px 10px;font-size:11px;font-weight:700">${ok?'✔ Adecuado':'✘ Inadecuado'} (Kt/V ${val})</span>`;
  }

  return `
<!-- ─── 1. ESTADIO Y MODALIDAD ───────────────────────────── -->
<div class="card">
  <div class="card-title">Enfermedad renal crónica — Estadio y modalidad
    ${egfr ? `<span style="float:right;font-size:11px;font-weight:400;color:var(--muted)">eGFR actual: <strong>${egfr.toFixed(0)} mL/min/1.73m²</strong></span>` : ''}
  </div>
  <div class="g3">
    <div class="field"><label>Estadio ERC</label>
      <select id="rn-estadio" onchange="rnModalidadChange()">
        ${['G1','G2','G3a','G3b','G4','G5','HD','DP'].map(e =>
          `<option value="${e}" ${estadioCur===e?'selected':''}>${e}${
            {G1:' — eGFR ≥90',G2:' — eGFR 60-89',G3a:' — eGFR 45-59',
             G3b:' — eGFR 30-44',G4:' — eGFR 15-29',G5:' — eGFR <15',
             HD:' — Hemodiálisis',DP:' — Diálisis Peritoneal'}[e]||''
          }</option>`).join('')}
      </select>
    </div>
    <div class="field"><label>Modalidad de tratamiento</label>
      <select id="rn-modalidad" onchange="rnModalidadChange()">
        <option value="conservador" ${modalidadCur==='conservador'?'selected':''}>Tratamiento conservador</option>
        <option value="hd"          ${modalidadCur==='hd'?'selected':''}>Hemodiálisis (HD)</option>
        <option value="dp"          ${modalidadCur==='dp'?'selected':''}>Diálisis peritoneal (DP)</option>
        <option value="trasplante"  ${modalidadCur==='trasplante'?'selected':''}>Post-trasplante renal</option>
      </select>
    </div>
    <div class="field"><label>Acceso vascular / peritoneal</label>
      <select id="rn-acceso">
        <option value="">—</option>
        <option value="fav"      ${rn.acceso_vascular==='fav'?'selected':''}>FAV (fístula arteriovenosa)</option>
        <option value="ptfe"     ${rn.acceso_vascular==='ptfe'?'selected':''}>Injerto PTFE</option>
        <option value="cvc_temp" ${rn.acceso_vascular==='cvc_temp'?'selected':''}>CVC temporal</option>
        <option value="cvc_perm" ${rn.acceso_vascular==='cvc_perm'?'selected':''}>CVC permanente (Tesio/Permcath)</option>
        <option value="cat_perit"${rn.acceso_vascular==='cat_perit'?'selected':''}>Catéter peritoneal (Tenckhoff)</option>
      </select>
    </div>
  </div>
  <div class="g3" style="margin-top:8px">
    <div class="field"><label>Fecha inicio diálisis</label>
      <input type="date" id="rn-fecha-dial" value="${rn.fecha_inicio_dialisis||''}"></div>
    <div class="field"><label>Tiempo en diálisis</label>
      <div class="field-wrap">
        <input type="number" id="rn-tiempo-dial" value="${rn.tiempo_en_dialisis_meses||''}" placeholder="meses">
        <span class="field-unit">meses</span>
      </div>
    </div>
    <div class="field"><label>Diuresis residual (FRR)</label>
      <div class="field-wrap">
        <input type="number" id="rn-diuresis" value="${rn.diuresis_residual_ml||''}" placeholder="mL/24h" oninput="rnAutoCalc()">
        <span class="field-unit">mL/24h</span>
      </div>
      <label style="display:flex;align-items:center;gap:5px;font-size:11px;margin-top:4px;cursor:pointer">
        <input type="checkbox" id="rn-frr" ${rn.funcion_renal_residual?'checked':''}> Tiene función renal residual
      </label>
    </div>
  </div>
</div>

<!-- ─── 2. BALANCE HÍDRICO (HD/DP) ───────────────────────── -->
<div class="card" id="rn-balance-card" style="display:${isDialisis?'block':'none'}">
  <div class="card-title">Balance hídrico interdialítico</div>
  <div class="g4">
    <div class="field"><label>Peso seco (kg)</label>
      <div class="field-wrap">
        <input type="number" step="0.1" id="rn-ps" value="${rn.peso_seco||''}" oninput="rnAutoCalc()" placeholder="kg">
        <span class="field-unit">kg</span>
      </div>
    </div>
    <div class="field"><label>Peso pre-diálisis (kg)</label>
      <div class="field-wrap">
        <input type="number" step="0.1" id="rn-ppre" value="${rn.peso_pre_dialisis||''}" oninput="rnAutoCalc()">
        <span class="field-unit">kg</span>
      </div>
    </div>
    <div class="field"><label>Peso post-diálisis (kg)</label>
      <div class="field-wrap">
        <input type="number" step="0.1" id="rn-ppost" value="${rn.peso_post_dialisis||''}" oninput="rnAutoCalc()">
        <span class="field-unit">kg</span>
      </div>
    </div>
    <div>
      <div style="font-size:10px;color:var(--muted);margin-bottom:4px">Ganancia interdialítica</div>
      <div class="computed" id="rn-gan-kg" style="font-size:15px;font-weight:700">—</div>
      <div id="rn-gan-eval" style="font-size:10px;margin-top:3px"></div>
    </div>
  </div>
  <div class="g3" style="margin-top:8px">
    <div class="field"><label>Sesiones / semana</label>
      <select id="rn-sesiones">
        <option value="3" ${(rn.sesiones_semana||3)==3?'selected':''}>3 por semana (estándar)</option>
        <option value="2" ${rn.sesiones_semana==2?'selected':''}>2 por semana</option>
        <option value="4" ${rn.sesiones_semana==4?'selected':''}>4 por semana (intensivo)</option>
        <option value="5" ${rn.sesiones_semana==5?'selected':''}>5 por semana (diario)</option>
      </select>
    </div>
    <div class="field"><label>Duración sesión (horas)</label>
      <select id="rn-duracion">
        <option value="3"   ${rn.duracion_sesion_h==3?'selected':''}>3 horas</option>
        <option value="3.5" ${rn.duracion_sesion_h==3.5?'selected':''}>3.5 horas</option>
        <option value="4"   ${(rn.duracion_sesion_h||4)==4?'selected':''}>4 horas (estándar)</option>
        <option value="4.5" ${rn.duracion_sesion_h==4.5?'selected':''}>4.5 horas</option>
        <option value="5"   ${rn.duracion_sesion_h==5?'selected':''}>5 horas</option>
      </select>
    </div>
    <div class="field"><label>Restricción hídrica</label>
      <div class="field-wrap">
        <input type="number" id="rn-rest-agua" value="${restH2O||''}" placeholder="mL/día">
        <span class="field-unit">mL/día</span>
      </div>
      <div style="font-size:10px;color:var(--muted);margin-top:3px" id="rn-agua-calc"></div>
    </div>
  </div>
</div>

<!-- ─── 3. KT/V — ADECUACIÓN DIÁLISIS ────────────────────── -->
<div class="card" id="rn-ktv-card" style="display:${isHD?'block':'none'}">
  <div class="card-title">Adecuación de diálisis — Kt/V
    <span style="float:right" id="rn-ktv-chip">${ktvAuto ? ktvChip(ktvAuto, rn.ktv_meta||1.2) : ''}</span>
  </div>
  <div class="g4">
    <div class="field"><label>BUN pre-diálisis</label>
      <div class="field-wrap">
        <input type="number" step="0.1" id="rn-bun-pre" value="${rn.pre_bun||''}" oninput="rnCalcKtV()">
        <span class="field-unit">mg/dL</span>
      </div>
    </div>
    <div class="field"><label>BUN post-diálisis</label>
      <div class="field-wrap">
        <input type="number" step="0.1" id="rn-bun-post" value="${rn.post_bun||''}" oninput="rnCalcKtV()">
        <span class="field-unit">mg/dL</span>
      </div>
    </div>
    <div class="field"><label>Kt/V medido (laboratorio)</label>
      <input type="number" step="0.01" id="rn-ktv-sp" value="${rn.ktv_sp||''}" oninput="rnUpdateKtvChip()">
    </div>
    <div>
      <div style="font-size:10px;color:var(--muted);margin-bottom:4px">Kt/V calculado (Daugirdas)</div>
      <div class="computed" id="rn-ktv-calc" style="font-size:15px;font-weight:700;color:var(--accent)">${ktvAuto||'—'}</div>
      <div style="font-size:10px;color:var(--muted);margin-top:2px">Meta HD: ≥1.2 — DP: ≥1.7</div>
    </div>
  </div>
</div>

<!-- ─── 4. MINERALES Y METABOLISMO ÓSEO ──────────────────── -->
<div class="card">
  <div class="card-title">Minerales y metabolismo óseo — MBD-ERC</div>
  <div style="overflow-x:auto">
    <table style="width:100%;border-collapse:collapse;font-size:12px">
      <thead>
        <tr style="background:var(--bg2)">
          <th style="padding:7px 10px;text-align:left;font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase">Parámetro</th>
          <th style="padding:7px 10px;text-align:center;font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase">Valor</th>
          <th style="padding:7px 10px;text-align:center;font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase">Rango meta ERC</th>
          <th style="padding:7px 10px;text-align:center;font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase">Estado</th>
        </tr>
      </thead>
      <tbody>
        ${[
          ['rn-calcio',   'Calcio total',      caAuto,   '8.4-9.5', 'mg/dL', 8.4, 9.5],
          ['rn-fosforo',  'Fósforo',           pAuto,    '<5.5 (G3-5) / <5.0 (diálisis)', 'mg/dL', 2.5, 5.5],
          ['rn-pth',      'PTH intacta',       pthAuto,  'G3:35-70 / G4:70-110 / G5/D:150-600', 'pg/mL', null, null],
          ['rn-vitd',     'Vitamina D 25-OH',  vdAuto,   '>30 ng/mL', 'ng/mL', 30, 150],
          ['rn-hco3',     'Bicarbonato',       hco3Auto, '22-26 mEq/L', 'mEq/L', 22, 26],
          ['rn-alb',      'Albúmina',          albAuto,  '>3.5 g/dL', 'g/dL', 3.5, 5.0],
        ].map(([id, label, val, meta, unit, min, max]) => `
          <tr style="border-bottom:1px solid var(--border)">
            <td style="padding:7px 10px;font-weight:500">${label}</td>
            <td style="padding:7px 10px;text-align:center">
              <div class="field-wrap" style="justify-content:center">
                <input type="number" step="0.1" id="${id}" value="${val||''}"
                  oninput="rnCheckMineral('${id}',${min},${max})"
                  style="width:90px;text-align:center;font-size:13px;font-weight:600">
                <span class="field-unit">${unit}</span>
              </div>
            </td>
            <td style="padding:7px 10px;text-align:center;color:var(--muted);font-size:10px">${meta}</td>
            <td style="padding:7px 10px;text-align:center" id="${id}-st">
              ${val && min ? rnStatusIcon(parseFloat(val), min, max) : '—'}
            </td>
          </tr>`).join('')}
        <!-- Producto Ca×P -->
        <tr style="border-bottom:1px solid var(--border);background:var(--bg2)">
          <td style="padding:7px 10px;font-weight:600">Producto Ca×P</td>
          <td style="padding:7px 10px;text-align:center;font-weight:700" id="rn-cap-val">${prodCaP || '—'}</td>
          <td style="padding:7px 10px;text-align:center;color:var(--muted);font-size:10px">&lt;55 mg²/dL²</td>
          <td style="padding:7px 10px;text-align:center" id="rn-cap-st">
            ${prodCaP ? (parseFloat(prodCaP) < 55 ? '<span style="color:#22c55e;font-weight:700">✔ OK</span>' : '<span style="color:#ef4444;font-weight:700">✘ Alto</span>') : '—'}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<!-- ─── 5. ANEMIA RENAL ───────────────────────────────────── -->
<div class="card">
  <div class="card-title">Anemia renal</div>
  <div class="g4">
    <div class="field"><label>Hemoglobina</label>
      <div class="field-wrap">
        <input type="number" step="0.1" id="rn-hb" value="${hbAuto||''}" oninput="rnCheckHb()">
        <span class="field-unit">g/dL</span>
      </div>
      <div id="rn-hb-ref" style="font-size:10px;margin-top:3px;color:var(--muted)">
        ${hbAuto ? rnHbRef(hbAuto) : 'Meta ERC: 10-12 g/dL'}
      </div>
    </div>
    <div class="field"><label>Hematocrito</label>
      <div class="field-wrap">
        <input type="number" step="0.1" id="rn-hto" value="${rn.hematocrito||''}">
        <span class="field-unit">%</span>
      </div>
    </div>
    <div class="field"><label>Ferritina</label>
      <div class="field-wrap">
        <input type="number" id="rn-ferr" value="${ferrAuto||''}">
        <span class="field-unit">ng/mL</span>
      </div>
      <div style="font-size:10px;color:var(--muted);margin-top:2px">Meta ERC: 200-500 ng/mL</div>
    </div>
    <div class="field"><label>Saturación transferrina</label>
      <div class="field-wrap">
        <input type="number" step="0.1" id="rn-sat-tf" value="${rn.saturacion_transferrina||''}">
        <span class="field-unit">%</span>
      </div>
      <div style="font-size:10px;color:var(--muted);margin-top:2px">Meta: >20%</div>
    </div>
  </div>
  <div class="g2" style="margin-top:8px">
    <div class="field"><label>Eritropoyetina / IEER (dosis)</label>
      <input type="text" id="rn-epo" value="${rn.epo_dosis||''}"
        placeholder="ej. Darbepoetina 40 mcg semanal SC">
    </div>
    <div>
      <label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-size:12px;margin-top:18px">
        <input type="checkbox" id="rn-hierro-iv" ${rn.hierro_iv?'checked':''}> Recibe hierro IV (sacarosa/gluconato/carboximaltosa)
      </label>
    </div>
  </div>
</div>

<!-- ─── 6. DESNUTRICIÓN PROTEICO-ENERGÉTICA (PEF-ERC) ────── -->
<div class="card" style="border-top:3px solid #f97316">
  <div class="card-title" style="color:#f97316">Desgaste Proteico-Energético (DPE-ERC)
    <span style="float:right;font-size:10px;font-weight:400;color:var(--muted)">Criterios ISRNM 2008</span>
  </div>
  <div class="g2" style="align-items:start">
    <div>
      <div style="font-size:11px;font-weight:600;margin-bottom:8px">Criterios diagnósticos (≥3 de 4 categorías)</div>
      ${[
        ['rn-pef-alb',    'Albumina sérica <3.8 g/dL', albAuto && parseFloat(albAuto) < 3.8],
        ['rn-pef-imc',    'IMC <23 kg/m² o pérdida >5% peso en 3m', cc.imc && parseFloat(cc.imc) < 23],
        ['rn-pef-ingesta','Ingesta proteica <0.8 g/kg/día o calórica <25 kcal/kg/día', false],
        ['rn-pef-masa',   'Masa muscular reducida (IAMM bajo o pérdida >5% en 3m)', false],
      ].map(([id, label, auto]) => `
        <label style="display:flex;align-items:flex-start;gap:6px;cursor:pointer;font-size:12px;padding:4px 0;border-bottom:1px solid var(--border)">
          <input type="checkbox" id="${id}" ${auto||rn['pef_'+id.replace('rn-pef-','')]?'checked':''} onchange="rnPefCheck()" style="margin-top:2px">
          <span>${label}${auto ? ' <span style="font-size:9px;background:#f9731622;color:#f97316;border-radius:4px;padding:1px 5px;font-weight:600">AUTO</span>' : ''}</span>
        </label>`).join('')}
      <div id="rn-pef-resultado" style="margin-top:10px;padding:8px 12px;border-radius:8px;font-size:12px;font-weight:600;background:var(--bg)">
        Complete los criterios arriba
      </div>
    </div>
    <div>
      <div class="field"><label>Nivel de DPE</label>
        <select id="rn-pef-nivel">
          <option value="">—</option>
          <option value="leve"    ${rn.pef_nivel==='leve'?'selected':''}>Leve</option>
          <option value="moderado" ${rn.pef_nivel==='moderado'?'selected':''}>Moderado</option>
          <option value="severo"  ${rn.pef_nivel==='severo'?'selected':''}>Severo</option>
        </select>
      </div>
      <div class="field" style="margin-top:8px">
        <label>Prealbúmina (mg/dL)</label>
        <div class="field-wrap">
          <input type="number" step="0.1" id="rn-prealb" value="${rn.prealbumin||''}">
          <span class="field-unit">mg/dL</span>
        </div>
        <div style="font-size:10px;color:var(--muted);margin-top:2px">Normal: 18-40 mg/dL · <15 = DPE significativo</div>
      </div>
    </div>
  </div>
</div>

<!-- ─── 7. RESTRICCIONES DIETÉTICAS ──────────────────────── -->
<div class="card">
  <div class="card-title">Restricciones dietéticas por estadio</div>
  <div class="g4">
    <div class="field"><label>Sodio</label>
      <div class="field-wrap">
        <input type="number" id="rn-rest-na" value="${restNa||''}" placeholder="mg/día">
        <span class="field-unit">mg/día</span>
      </div>
    </div>
    <div class="field"><label>Potasio</label>
      <div class="field-wrap">
        <input type="number" id="rn-rest-k" value="${restK||''}" placeholder="mg/día">
        <span class="field-unit">mg/día</span>
      </div>
    </div>
    <div class="field"><label>Fósforo</label>
      <div class="field-wrap">
        <input type="number" id="rn-rest-p" value="${restP||''}" placeholder="mg/día">
        <span class="field-unit">mg/día</span>
      </div>
    </div>
    <div class="field"><label>Proteína</label>
      <div class="field-wrap">
        <input type="number" step="0.1" id="rn-prot-dia" value="${protG||''}" placeholder="g/día">
        <span class="field-unit">g/día</span>
      </div>
    </div>
  </div>
  <!-- Referencia rápida por estadio -->
  <div id="rn-rest-ref" style="margin-top:10px;background:var(--bg);border:1px solid var(--border);border-radius:8px;padding:10px;font-size:11px;display:none"></div>
</div>

<!-- ─── 8. DIÁLISIS PERITONEAL (DP) ──────────────────────── -->
<div class="card" id="rn-dp-card" style="display:${isDP?'block':'none'}">
  <div class="card-title">Diálisis peritoneal — Detalle DP</div>
  <div class="g3">
    <div class="field"><label>Modalidad DP</label>
      <select id="rn-dp-mod">
        <option value="CAPD"  ${rn.dp_modalidad==='CAPD'?'selected':''}>CAPD (manual)</option>
        <option value="APD"   ${rn.dp_modalidad==='APD'?'selected':''}>APD (cicladora nocturna)</option>
        <option value="CCPD"  ${rn.dp_modalidad==='CCPD'?'selected':''}>CCPD (continua cicladora)</option>
      </select>
    </div>
    <div class="field"><label>Intercambios / día</label>
      <input type="number" id="rn-dp-intx" value="${rn.dp_intercambios||''}" placeholder="ej. 4">
    </div>
    <div class="field"><label>Volumen por intercambio</label>
      <div class="field-wrap">
        <input type="number" id="rn-dp-vol" value="${rn.dp_volumen_ml||''}" placeholder="2000" oninput="rnDpKcal()">
        <span class="field-unit">mL</span>
      </div>
    </div>
  </div>
  <div class="g3" style="margin-top:8px">
    <div class="field"><label>Concentración glucosa dializado</label>
      <select id="rn-dp-gluc" onchange="rnDpKcal()">
        <option value="1.5" ${rn.dp_glucosa_concentracion==='1.5%'?'selected':''}>1.5% (isoosmolar)</option>
        <option value="2.5" ${rn.dp_glucosa_concentracion==='2.5%'?'selected':''}>2.5% (hiperosmolar)</option>
        <option value="4.25" ${rn.dp_glucosa_concentracion==='4.25%'?'selected':''}>4.25% (muy hiperosmolar)</option>
        <option value="icodextrina" ${rn.dp_glucosa_concentracion==='icodextrina'?'selected':''}>Icodextrina 7.5%</option>
      </select>
    </div>
    <div>
      <div style="font-size:10px;color:var(--muted);margin-bottom:4px">kcal absorbidas del dializado</div>
      <div class="computed" id="rn-dp-kcal" style="font-size:15px;font-weight:700;color:var(--accent)">
        ${rn.dp_kcal_glucosa ? rn.dp_kcal_glucosa + ' kcal/día' : '—'}
      </div>
      <div style="font-size:10px;color:var(--muted);margin-top:2px">~60-70% de la glucosa del dializado</div>
    </div>
    <div style="background:var(--bg);border:1px solid var(--border);border-radius:8px;padding:10px">
      <div style="font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;margin-bottom:4px">Importante DP</div>
      <div style="font-size:11px;color:var(--text)">Descontar kcal del dializado del plan nutricional total. Meta proteína 1.3-1.5 g/kg/día.</div>
    </div>
  </div>
</div>

<!-- ─── 9. NOTAS ──────────────────────────────────────────── -->
<div class="card">
  <div class="card-title">Notas clínicas renales</div>
  <div class="field">
    <textarea id="rn-notas" rows="3" placeholder="Plan de manejo, ajuste de quelantes, cambios en pauta dialítica…">${rn.notas||''}</textarea>
  </div>
</div>

<div style="display:flex;justify-content:flex-end;margin-top:4px">
  <button class="btn btn-success" onclick="saveRenal()">Guardar módulo renal</button>
</div>`;
}

// ── HELPERS MÓDULO RENAL ─────────────────────────────────────

function rnStatusIcon(val, min, max) {
  if (!val || min === null) return '—';
  if (val < min || val > max)
    return `<span style="color:#ef4444;font-weight:700">✘ ${val < min ? 'Bajo' : 'Alto'}</span>`;
  return `<span style="color:#22c55e;font-weight:700">✔ OK</span>`;
}

function rnHbRef(hb) {
  const h = parseFloat(hb);
  if (h < 10) return '🔴 Anemia significativa (<10 g/dL) — evaluar IEER';
  if (h < 11) return '🟡 Límite bajo — monitorear';
  if (h <= 12) return '🟢 En meta ERC (10-12 g/dL)';
  return '🟡 Sobre meta — precaución trombosis';
}

function rnCheckMineral(id, min, max) {
  const val = parseFloat(document.getElementById(id)?.value);
  const stEl = document.getElementById(id + '-st');
  if (!stEl) return;
  if (!val || min === null) { stEl.innerHTML = '—'; return; }
  stEl.innerHTML = rnStatusIcon(val, min, max);

  // Actualizar producto Ca×P
  const ca = parseFloat(document.getElementById('rn-calcio')?.value) || 0;
  const p  = parseFloat(document.getElementById('rn-fosforo')?.value) || 0;
  if (ca && p) {
    const prod = (ca * p).toFixed(1);
    const capEl = document.getElementById('rn-cap-val');
    const capSt = document.getElementById('rn-cap-st');
    if (capEl) capEl.textContent = prod;
    if (capSt) capSt.innerHTML = parseFloat(prod) < 55
      ? '<span style="color:#22c55e;font-weight:700">✔ OK</span>'
      : '<span style="color:#ef4444;font-weight:700">✘ Alto (>55)</span>';
  }
}

function rnCheckHb() {
  const val = document.getElementById('rn-hb')?.value;
  const el  = document.getElementById('rn-hb-ref');
  if (el && val) el.textContent = rnHbRef(val);
}

function rnAutoCalc() {
  const ps   = parseFloat(document.getElementById('rn-ps')?.value)   || 0;
  const ppre = parseFloat(document.getElementById('rn-ppre')?.value) || 0;
  const diur = parseFloat(document.getElementById('rn-diuresis')?.value) || 0;

  // Ganancia interdialítica
  if (ps && ppre) {
    const gan    = (ppre - ps).toFixed(2);
    const ganPct = ps ? ((ppre - ps) / ps * 100).toFixed(1) : 0;
    const ganEl  = document.getElementById('rn-gan-kg');
    const evEl   = document.getElementById('rn-gan-eval');
    if (ganEl) {
      ganEl.textContent = gan + ' kg (' + ganPct + '%)';
      ganEl.style.color = parseFloat(gan) > ps * 0.05 ? '#ef4444' : parseFloat(gan) > ps * 0.03 ? '#f59e0b' : '#22c55e';
    }
    if (evEl) {
      evEl.innerHTML = parseFloat(gan) > ps * 0.05
        ? '<span style="color:#ef4444">⚠ Excede 5% del peso seco — restricción hídrica insuficiente</span>'
        : parseFloat(gan) > ps * 0.03
        ? '<span style="color:#f59e0b">⚠ Límite (3-5%) — reforzar restricción</span>'
        : '<span style="color:#22c55e">✔ Dentro de límite (&lt;3%)</span>';
    }
    // Auto-calcular restricción hídrica recomendada: diuresis + 500-750 mL
    const restH2O = diur + (diur > 0 ? 750 : 700);
    const acEl = document.getElementById('rn-agua-calc');
    if (acEl) acEl.textContent = `Sugerida: ${restH2O} mL/día (diuresis + 750 mL insensibles)`;
    const rAEl = document.getElementById('rn-rest-agua');
    if (rAEl && !rAEl.value) rAEl.value = restH2O;
  }

  // Recalcular Kt/V si hay BUN
  rnCalcKtV();
}

function rnCalcKtV() {
  const preBun  = parseFloat(document.getElementById('rn-bun-pre')?.value)  || 0;
  const postBun = parseFloat(document.getElementById('rn-bun-post')?.value) || 0;
  const ps      = parseFloat(document.getElementById('rn-ps')?.value)       || 0;
  const ppre    = parseFloat(document.getElementById('rn-ppre')?.value)     || 0;
  const dur     = parseFloat(document.getElementById('rn-duracion')?.value) || 4;

  if (!preBun || !postBun || !ps) return;

  const r   = postBun / preBun;
  const t   = dur * 60;
  const uf  = ppre > ps ? (ppre - ps) / ps : 0;
  const ktv = (-Math.log(r - 0.008 * t) + (4 - 3.5 * r) * uf).toFixed(2);

  const el = document.getElementById('rn-ktv-calc');
  if (el) el.textContent = ktv;
  rnUpdateKtvChip(ktv);
}

function rnUpdateKtvChip(ktv) {
  const val  = ktv || parseFloat(document.getElementById('rn-ktv-sp')?.value || document.getElementById('rn-ktv-calc')?.textContent) || 0;
  const meta = 1.2;
  const chip = document.getElementById('rn-ktv-chip');
  if (!chip || !val) return;
  const ok = parseFloat(val) >= meta;
  chip.innerHTML = `<span style="background:${ok?'#22c55e22':'#ef444422'};color:${ok?'#15803d':'#ef4444'};border:1px solid ${ok?'#22c55e55':'#ef444455'};border-radius:20px;padding:2px 10px;font-size:11px;font-weight:700">${ok?'✔ Adecuado':'✘ Inadecuado'} (Kt/V ${val})</span>`;
}

function rnModalidadChange() {
  const mod = document.getElementById('rn-modalidad')?.value;
  const isD = ['hd','dp'].includes(mod);
  const isH = mod === 'hd';
  const isP = mod === 'dp';
  const bc  = document.getElementById('rn-balance-card');
  const kc  = document.getElementById('rn-ktv-card');
  const dc  = document.getElementById('rn-dp-card');
  if (bc) bc.style.display = isD ? 'block' : 'none';
  if (kc) kc.style.display = isH ? 'block' : 'none';
  if (dc) dc.style.display = isP ? 'block' : 'none';

  // Prellenar restricciones según estadio
  const estadio = document.getElementById('rn-estadio')?.value || '';
  const ref = {
    G1:  {na:2300, k:null,  p:null},
    G2:  {na:2300, k:null,  p:null},
    G3a: {na:2000, k:null,  p:1000},
    G3b: {na:2000, k:3000,  p:800},
    G4:  {na:1500, k:2000,  p:600},
    G5:  {na:1500, k:1500,  p:600},
    HD:  {na:2000, k:2000,  p:800},
    DP:  {na:2000, k:3000,  p:1000},
  }[estadio];

  const refEl = document.getElementById('rn-rest-ref');
  if (ref && refEl) {
    refEl.style.display = 'block';
    refEl.innerHTML = `<strong>Restricciones sugeridas ${estadio}:</strong>
      Na: ${ref.na} mg/día &nbsp;·&nbsp;
      K: ${ref.k || 'Sin restricción'} mg/día &nbsp;·&nbsp;
      P: ${ref.p || 'Sin restricción'} mg/día`;
    const naEl = document.getElementById('rn-rest-na');
    const kEl  = document.getElementById('rn-rest-k');
    const pEl  = document.getElementById('rn-rest-p');
    if (naEl && !naEl.value && ref.na) naEl.value = ref.na;
    if (kEl  && !kEl.value  && ref.k)  kEl.value  = ref.k;
    if (pEl  && !pEl.value  && ref.p)  pEl.value  = ref.p;
  }
}

function rnDpKcal() {
  const vol   = parseFloat(document.getElementById('rn-dp-vol')?.value)  || 2000;
  const intx  = parseFloat(document.getElementById('rn-dp-intx')?.value) || 4;
  const gluc  = parseFloat(document.getElementById('rn-dp-gluc')?.value) || 1.5;
  // Absorción ~60-70% de la glucosa del dializado
  // Glucosa g/L según concentración: 1.5%=15g/L, 2.5%=25g/L, 4.25%=42.5g/L
  const glucGperL = { 1.5:15, 2.5:25, 4.25:42.5 }[gluc] || 15;
  const totalGlucG = glucGperL * (vol/1000) * intx;
  const kcalAbs    = Math.round(totalGlucG * 0.65 * 4); // 65% absorción × 4 kcal/g
  const el = document.getElementById('rn-dp-kcal');
  if (el) el.textContent = kcalAbs + ' kcal/día';
}

function rnPefCheck() {
  const crit = ['rn-pef-alb','rn-pef-imc','rn-pef-ingesta','rn-pef-masa']
    .filter(id => document.getElementById(id)?.checked).length;
  const el = document.getElementById('rn-pef-resultado');
  if (!el) return;
  if (crit >= 3) {
    el.style.background = '#ef444422'; el.style.color = '#ef4444';
    el.textContent = `✘ DPE-ERC probable (${crit}/4 criterios) — intervención nutricional urgente`;
    const nivelEl = document.getElementById('rn-pef-nivel');
    if (nivelEl && !nivelEl.value) nivelEl.value = crit === 4 ? 'severo' : 'moderado';
  } else if (crit >= 1) {
    el.style.background = '#f59e0b22'; el.style.color = '#92400e';
    el.textContent = `⚠ Riesgo de DPE (${crit}/4) — vigilancia nutricional estrecha`;
  } else {
    el.style.background = '#22c55e22'; el.style.color = '#15803d';
    el.textContent = '✔ Sin criterios de DPE actualmente';
  }
}

async function saveRenal() {
  const vid = State.currentVisita?.id;
  if (!vid) return;
  const getV  = id => document.getElementById(id)?.value   || null;
  const getN  = id => parseFloat(document.getElementById(id)?.value) || null;
  const getCh = id => document.getElementById(id)?.checked ? 1 : 0;

  const ps   = getN('rn-ps');
  const ppre = getN('rn-ppre');
  const ganKg  = ps && ppre ? parseFloat((ppre - ps).toFixed(2)) : null;
  const ganPct = ps && ganKg ? parseFloat((ganKg / ps * 100).toFixed(1)) : null;

  const ca = getN('rn-calcio');
  const p  = getN('rn-fosforo');

  const body = {
    fecha: State.currentVisita.fecha,
    estadio_erc:    getV('rn-estadio'),
    modalidad:      getV('rn-modalidad'),
    acceso_vascular:getV('rn-acceso'),
    fecha_inicio_dialisis:    getV('rn-fecha-dial'),
    tiempo_en_dialisis_meses: getN('rn-tiempo-dial'),
    peso_seco:          ps,
    peso_pre_dialisis:  ppre,
    peso_post_dialisis: getN('rn-ppost'),
    ganancia_interdial_kg:  ganKg,
    ganancia_interdial_pct: ganPct,
    sesiones_semana:  parseInt(getV('rn-sesiones')) || 3,
    duracion_sesion_h:parseFloat(getV('rn-duracion')) || 4,
    diuresis_residual_ml: getN('rn-diuresis'),
    funcion_renal_residual: getCh('rn-frr'),
    ktv_sp:      getN('rn-ktv-sp'),
    ktv_meta:    1.2,
    pre_bun:     getN('rn-bun-pre'),
    post_bun:    getN('rn-bun-post'),
    ktv_calculado: parseFloat(document.getElementById('rn-ktv-calc')?.textContent) || null,
    calcio:      ca,
    fosforo:     p,
    producto_ca_p: ca && p ? parseFloat((ca*p).toFixed(1)) : null,
    pth_intacta: getN('rn-pth'),
    vitamina_d_25:    getN('rn-vitd'),
    bicarbonato: getN('rn-hco3'),
    albumina_renal:   getN('rn-alb'),
    prealbumin:  getN('rn-prealb'),
    hemoglobina: getN('rn-hb'),
    hematocrito: getN('rn-hto'),
    ferritina:   getN('rn-ferr'),
    saturacion_transferrina: getN('rn-sat-tf'),
    epo_dosis:   getV('rn-epo'),
    hierro_iv:   getCh('rn-hierro-iv'),
    restriccion_na_mg:  getN('rn-rest-na'),
    restriccion_k_mg:   getN('rn-rest-k'),
    restriccion_p_mg:   getN('rn-rest-p'),
    restriccion_agua_ml:getN('rn-rest-agua'),
    proteina_g_dia:     getN('rn-prot-dia'),
    malnutricion_pef:   getCh('rn-pef-alb') || getCh('rn-pef-imc') || getCh('rn-pef-ingesta') || getCh('rn-pef-masa') ? 1 : 0,
    pef_nivel:   getV('rn-pef-nivel'),
    dp_modalidad:getV('rn-dp-mod'),
    dp_intercambios: getN('rn-dp-intx'),
    dp_volumen_ml:   getN('rn-dp-vol'),
    dp_glucosa_concentracion: getV('rn-dp-gluc') ? getV('rn-dp-gluc')+'%' : null,
    dp_kcal_glucosa: parseFloat(document.getElementById('rn-dp-kcal')?.textContent) || null,
    notas: getV('rn-notas'),
  };

  await api(`/visitas/${vid}/renal`, 'POST', body);
  toast('Módulo renal guardado ✓');
  if (State.currentVisita) State.currentVisita.renal = body;
}

// ════════════════════════════════════════════════════════════
// DIAGNÓSTICO NUTRICIONAL
// ════════════════════════════════════════════════════════════

function renderTabDiag(d, v) {
  const cc  = v.composicion_corporal || {};
  const an  = v.analiticas           || {};
  const pac = State.currentPaciente  || {};
  const sexo = pac.sexo || 'F';

  // ── Auto-calcular desde CC ──────────────────────────────
  const peso  = cc.peso  || 0;
  const talla = cc.talla || 0;
  const tallam = talla / 100;
  const imc   = peso && talla ? peso / (tallam * tallam) : null;
  const cintura = cc.cintura_cm || 0;
  const cadera  = cc.cadera_cm  || 0;
  const icc     = cintura && cadera ? cintura / cadera : null;

  // IMC clasificación
  function clsImc(v) {
    if (!v) return '';
    if (v < 18.5) return 'bajo_peso';
    if (v < 25)   return 'normal';
    if (v < 30)   return 'sobrepeso';
    if (v < 35)   return 'obesidad_I';
    if (v < 40)   return 'obesidad_II';
    return 'obesidad_III';
  }
  const imcClsAuto = clsImc(imc);

  // Cintura riesgo (OMS/IDF)
  function clsCintura(cin, sx) {
    if (!cin) return '';
    if (sx === 'M') return cin < 94 ? 'normal' : cin < 102 ? 'elevado' : 'muy_elevado';
    return cin < 80 ? 'normal' : cin < 88 ? 'elevado' : 'muy_elevado';
  }
  const cinRiesgoAuto = clsCintura(cintura, sexo);

  // ICC riesgo
  function clsIcc(v, sx) {
    if (!v) return '';
    if (sx === 'M') return v < 0.9 ? 'normal' : v < 1.0 ? 'elevado' : 'muy_elevado';
    return v < 0.85 ? 'normal' : 'muy_elevado';
  }
  const iccRiesgoAuto = clsIcc(icc, sexo);

  // Sarcopenia: IAMM (índice masa muscular apendicular) — si hay masa muscular en BIA
  // Aproximamos: masa muscular total × 0.75 ≈ masa apendicular
  const iammAuto = (cc.masa_muscular_kg && talla)
    ? ((cc.masa_muscular_kg * 0.75) / (tallam * tallam)).toFixed(2)
    : (d.sarc_iamm || '');

  // Fuerza prensil - criterios EWGSOP2 (kg)
  // Baja fuerza: <27 kg hombres, <16 kg mujeres
  const fpDer = cc.fuerza_prensil_d || 0;
  const fpIzq = cc.fuerza_prensil_i || 0;
  const fpMax  = Math.max(fpDer, fpIzq);
  const fuerzaBajaAuto = fpMax > 0
    ? (sexo === 'M' ? fpMax < 27 : fpMax < 16) ? 1 : 0
    : (d.sarc_fuerza_pos ?? 0);

  // Masa muscular baja: IAMM <7.0 hombres, <5.5 mujeres
  const iammNum = parseFloat(iammAuto) || 0;
  const masaBajaAuto = iammNum > 0
    ? (sexo === 'M' ? iammNum < 7.0 : iammNum < 5.5) ? 1 : 0
    : (d.sarc_masa_pos ?? 0);

  // Velocidad marcha baja: <0.8 m/s
  const vm = cc.velocidad_marcha || 0;
  const rendBajoAuto = vm > 0 ? (vm < 0.8 ? 1 : 0) : (d.sarc_rendimiento_pos ?? 0);

  // Analíticas → riesgo cardiometabólico
  function rcmGlucosa() {
    const g = an.glucosa, h = an.hba1c;
    if (!g && !h) return d.rcm_glucosa || '';
    if (h >= 6.5 || g >= 126) return h >= 9 || g >= 200 ? 'dm_descontrolada' : 'dm';
    if (h >= 5.7 || g >= 100) return 'alterada_ayunas';
    return 'normal';
  }
  function rcmLipidos() {
    const ldl = an.ldl, tg = an.trigliceridos, hdl = an.hdl;
    if (!ldl && !tg && !hdl) return d.rcm_lipidos || '';
    const ldlAlt = ldl  && ldl  > 130;
    const tgAlt  = tg   && tg   > 150;
    const hdlBaj = hdl  && (sexo === 'M' ? hdl < 40 : hdl < 50);
    if (ldlAlt && tgAlt) return 'dislipidemia_mixta';
    if (ldlAlt || tgAlt || hdlBaj) return 'dislipidemia';
    if ((ldl && ldl > 100) || (tg && tg > 100)) return 'limite';
    return 'normal';
  }
  function rcmTA() {
    const s = an.ta_sistolica || v.ta_sistolica;
    const di = an.ta_diastolica || v.ta_diastolica;
    if (!s) return d.rcm_ta || '';
    if (s >= 180 || di >= 110) return 'hta_g3';
    if (s >= 160 || di >= 100) return 'hta_g2';
    if (s >= 140 || di >= 90)  return 'hta_g1';
    if (s >= 130 || di >= 80)  return 'prehta';
    return 'normal';
  }

  const rcmGluc  = rcmGlucosa();
  const rcmLip   = rcmLipidos();
  const rcmTA_v  = rcmTA();
  const rcmObCen = cinRiesgoAuto === 'muy_elevado' ? 1 : (d.rcm_obesidad_central ?? 0);

  // Síndrome metabólico (3 de 5 criterios IDF/AHA 2009)
  const smCrit = [
    rcmObCen,
    tg => tg && tg >= 150 ? 1 : 0,
    hdl => hdl && (sexo==='M' ? hdl<40 : hdl<50) ? 1 : 0,
    (an.ta_sistolica >= 130 || an.ta_diastolica >= 85) ? 1 : 0,
    an.glucosa >= 100 ? 1 : 0,
  ];
  const smScore = rcmObCen
    + (an.trigliceridos >= 150 ? 1 : 0)
    + (an.hdl && (sexo==='M' ? an.hdl<40 : an.hdl<50) ? 1 : 0)
    + ((an.ta_sistolica >= 130 || an.ta_diastolica >= 85) ? 1 : 0)
    + (an.glucosa >= 100 ? 1 : 0);
  const smAuto = smScore >= 3 ? 1 : 0;

  // Resultado RCM general
  function calcRcm(gluc, lip, ta, ob, sm) {
    let pts = 0;
    if (gluc === 'dm_descontrolada') pts += 3;
    else if (gluc === 'dm') pts += 2;
    else if (gluc === 'alterada_ayunas') pts += 1;
    if (lip === 'dislipidemia_mixta') pts += 2;
    else if (lip === 'dislipidemia') pts += 1;
    if (ta === 'hta_g3' || ta === 'hta_g2') pts += 2;
    else if (ta === 'hta_g1' || ta === 'prehta') pts += 1;
    if (ob) pts += 1;
    if (sm) pts += 1;
    if (pts >= 6) return 'muy_alto';
    if (pts >= 4) return 'alto';
    if (pts >= 2) return 'moderado';
    return 'bajo';
  }
  const rcmResAuto = calcRcm(rcmGluc, rcmLip, rcmTA_v, rcmObCen, smAuto);

  // ── Labels ───────────────────────────────────────────────
  const IMC_LABEL = {
    bajo_peso:'Bajo peso', normal:'Normal', sobrepeso:'Sobrepeso',
    obesidad_I:'Obesidad grado I', obesidad_II:'Obesidad grado II', obesidad_III:'Obesidad grado III',
  };
  const IMC_COLOR = {
    bajo_peso:'#3b82f6', normal:'#22c55e', sobrepeso:'#f59e0b',
    obesidad_I:'#f97316', obesidad_II:'#ef4444', obesidad_III:'#7f1d1d',
  };
  const RIE_LABEL = { normal:'Sin riesgo', elevado:'Riesgo elevado', muy_elevado:'Riesgo muy elevado' };
  const RIE_COLOR = { normal:'#22c55e', elevado:'#f59e0b', muy_elevado:'#ef4444' };
  const GLIM_LABEL = { sin_desnutricion:'Sin desnutrición', grado1_moderada:'Desnutrición moderada (Grado 1)', grado2_severa:'Desnutrición severa (Grado 2)' };
  const SARC_LABEL = { sin_sarcopenia:'Sin sarcopenia', probable:'Sarcopenia probable', sarcopenia:'Sarcopenia confirmada', sarcopenia_severa:'Sarcopenia severa' };
  const SARC_COLOR = { sin_sarcopenia:'#22c55e', probable:'#f59e0b', sarcopenia:'#f97316', sarcopenia_severa:'#ef4444' };
  const RCM_LABEL  = { bajo:'Riesgo bajo', moderado:'Riesgo moderado', alto:'Riesgo alto', muy_alto:'Riesgo muy alto' };
  const RCM_COLOR  = { bajo:'#22c55e', moderado:'#f59e0b', alto:'#f97316', muy_alto:'#ef4444' };
  const GLUC_LABEL = { normal:'Normal', alterada_ayunas:'Glucosa alterada en ayunas / Prediabetes', dm:'Diabetes mellitus', dm_descontrolada:'DM descontrolada' };
  const LIP_LABEL  = { normal:'Normal', limite:'En límite', dislipidemia:'Dislipidemia', dislipidemia_mixta:'Dislipidemia mixta' };
  const TA_LABEL   = { normal:'Normal', prehta:'Pre-hipertensión', hta_g1:'HTA grado 1', hta_g2:'HTA grado 2', hta_g3:'HTA grado 3 (crisis)' };

  function chip(label, color) {
    return `<span style="display:inline-block;background:${color}22;color:${color};border:1px solid ${color}55;border-radius:20px;padding:2px 10px;font-size:11px;font-weight:600">${label}</span>`;
  }
  function radio(name, val, cur, label) {
    return `<label style="display:flex;align-items:center;gap:5px;cursor:pointer;font-size:12px;padding:3px 0">
      <input type="radio" name="${name}" value="${val}" ${cur===val?'checked':''} onchange="autoDiagResumen()"> ${label}
    </label>`;
  }
  function check(id, val, label, onch='autoDiagResumen()') {
    return `<label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-size:12px;padding:2px 0">
      <input type="checkbox" id="${id}" ${val?'checked':''} onchange="${onch}"> ${label}
    </label>`;
  }
  function autoTag(label) {
    return `<span style="font-size:9px;background:#6366f133;color:#6366f1;border-radius:4px;padding:1px 5px;margin-left:4px;font-weight:600">AUTO</span><span style="font-size:10px;color:var(--muted);margin-left:2px">${label}</span>`;
  }

  // Calcular diagnóstico sarcopenia automático
  function calcSarcDiag(fuerza, masa, rend) {
    if (!fuerza && !masa) return 'sin_sarcopenia';
    if (fuerza && !masa)  return 'probable';
    if (fuerza && masa && !rend) return 'sarcopenia';
    if (fuerza && masa && rend)  return 'sarcopenia_severa';
    if (!fuerza && masa) return 'sarcopenia'; // masa reducida sin fuerza medida
    return 'sin_sarcopenia';
  }
  const sarcDiagAuto = calcSarcDiag(fuerzaBajaAuto, masaBajaAuto, rendBajoAuto);

  // GLIM auto-diagnóstico
  const glimPerdPosAuto  = d.glim_perdida_peso_pos  ?? 0;
  const glimImcBajAuto   = imc && (imc < 20 || (calcAge(pac.fecha_nacimiento) >= 70 && imc < 22)) ? 1 : (d.glim_imc_bajo_pos ?? 0);
  const glimMasaRedAuto  = masaBajaAuto;
  const glimFenPos = (glimPerdPosAuto || glimImcBajAuto || glimMasaRedAuto) ? 1 : 0;
  const glimIngRedAuto  = d.glim_ingesta_red_pos  ?? 0;
  const glimInflamAuto  = d.glim_inflamacion_pos  ?? 0;
  const glimEtioPos = (glimIngRedAuto || glimInflamAuto) ? 1 : 0;

  function calcGlimDiag(fen, etio, perdPct, imcBaj, masaRed, ingRed, inflam) {
    if (!fen || !etio) return 'sin_desnutricion';
    // Severo: >10% pérdida o IMC muy bajo o masa muy reducida
    const severo = (perdPct && perdPct > 10) || (imcBaj && imc < 17) || (masaRed && iammNum > 0 && (sexo==='M' ? iammNum < 5.5 : iammNum < 4.0));
    return severo ? 'grado2_severa' : 'grado1_moderada';
  }
  const glimDiagAuto = calcGlimDiag(glimFenPos, glimEtioPos,
    d.glim_perdida_peso_pct, glimImcBajAuto, glimMasaRedAuto,
    glimIngRedAuto, glimInflamAuto);

  // Valores actuales para los controles (guardado o auto)
  const clsImcCur     = d.clasificacion_imc  || imcClsAuto;
  const cinRiesCur    = d.riesgo_cintura      || cinRiesgoAuto;
  const iccRiesCur    = d.riesgo_icc         || iccRiesgoAuto;
  const glimDiagCur   = d.glim_diagnostico   || glimDiagAuto;
  const sarcDiagCur   = d.sarc_diagnostico   || sarcDiagAuto;
  const rcmGlucCur    = d.rcm_glucosa        || rcmGluc;
  const rcmLipCur     = d.rcm_lipidos        || rcmLip;
  const rcmTACur      = d.rcm_ta             || rcmTA_v;
  const rcmResCur     = d.rcm_resultado      || rcmResAuto;

  return `
<!-- ─── 1. CLASIFICACIÓN PONDERAL ──────────────────────── -->
<div class="card">
  <div class="card-title">1. Clasificación ponderal</div>
  <div class="g3" style="align-items:start">

    <!-- IMC -->
    <div>
      <div style="font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px">
        IMC ${imc ? `= ${imc.toFixed(1)} kg/m²` : ''}
        ${imc ? autoTag('desde composición corporal') : ''}
      </div>
      ${['bajo_peso','normal','sobrepeso','obesidad_I','obesidad_II','obesidad_III'].map(k =>
        radio('cls_imc', k, clsImcCur, `${IMC_LABEL[k]}${k.startsWith('ob') ? ' <span style="font-size:10px;color:var(--muted)">(IMC '+{obesidad_I:'30-34.9',obesidad_II:'35-39.9',obesidad_III:'≥40'}[k]+')</span>' : ''}`)).join('')}
    </div>

    <!-- Cintura -->
    <div>
      <div style="font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px">
        Circunferencia cintura ${cintura ? `= ${cintura} cm` : ''}
        ${cintura ? autoTag('') : ''}
      </div>
      ${['normal','elevado','muy_elevado'].map(k =>
        radio('cls_cintura', k, cinRiesCur, RIE_LABEL[k] + ` <span style="font-size:10px;color:var(--muted)">${{normal: sexo==='M'?'<94 cm':'<80 cm', elevado: sexo==='M'?'94-101 cm':'80-87 cm', muy_elevado: sexo==='M'?'≥102 cm':'≥88 cm'}[k]}</span>`)).join('')}
      <div style="margin-top:12px;font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px">
        ICC ${icc ? `= ${icc.toFixed(2)}` : ''}
        ${icc ? autoTag('') : ''}
      </div>
      ${['normal','elevado','muy_elevado'].map(k =>
        radio('cls_icc', k, iccRiesCur, RIE_LABEL[k])).join('')}
    </div>

    <!-- Resumen visual -->
    <div>
      <div style="font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.06em;margin-bottom:10px">Resumen ponderal</div>
      <div id="diag-ponderal-chips" style="display:flex;flex-direction:column;gap:6px">
        ${clsImcCur  ? `<div>${chip(IMC_LABEL[clsImcCur]||clsImcCur, IMC_COLOR[clsImcCur]||'#888')} <span style="font-size:10px;color:var(--muted)">IMC</span></div>` : ''}
        ${cinRiesCur ? `<div>${chip(RIE_LABEL[cinRiesCur]||cinRiesCur, RIE_COLOR[cinRiesCur]||'#888')} <span style="font-size:10px;color:var(--muted)">Cintura</span></div>` : ''}
        ${iccRiesCur ? `<div>${chip(RIE_LABEL[iccRiesCur]||iccRiesCur, RIE_COLOR[iccRiesCur]||'#888')} <span style="font-size:10px;color:var(--muted)">ICC</span></div>` : ''}
      </div>
    </div>
  </div>
</div>

<!-- ─── 2. DESNUTRICIÓN — GLIM 2019 ────────────────────── -->
<div class="card">
  <div class="card-title">2. Desnutrición — Criterios GLIM 2019
    <span style="float:right;font-size:10px;font-weight:400;color:var(--muted)">Se requiere ≥1 fenotípico + ≥1 etiológico</span>
  </div>
  <div class="g2" style="align-items:start;gap:16px">

    <!-- Fenotípicos -->
    <div>
      <div style="font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;margin-bottom:8px">Criterios fenotípicos</div>
      <div style="background:var(--bg);border:1px solid var(--border);border-radius:8px;padding:10px;display:flex;flex-direction:column;gap:6px">

        <!-- Pérdida de peso -->
        <div>
          <div style="font-size:11px;font-weight:600;margin-bottom:4px">Pérdida de peso involuntaria</div>
          <div class="g2" style="gap:8px">
            <div class="field">
              <label style="font-size:10px">% pérdida</label>
              <div class="field-wrap"><input type="number" step="0.1" id="diag-glim-perdida-pct" value="${d.glim_perdida_peso_pct||''}" oninput="autoDiagResumen()" placeholder="ej. 8.5"><span class="field-unit">%</span></div>
            </div>
            <div style="align-self:end;padding-bottom:2px">
              <div style="font-size:10px;color:var(--muted)">Positivo si >5% en 6m o >10% en 12m</div>
            </div>
          </div>
          ${check('diag-glim-perd-pos', glimPerdPosAuto, '✔ Pérdida de peso significativa')}
        </div>

        <!-- IMC bajo -->
        <div style="border-top:1px solid var(--border);padding-top:8px">
          <div style="font-size:11px;font-weight:600;margin-bottom:2px">IMC reducido ${imc ? autoTag(imc.toFixed(1)+' kg/m²') : ''}</div>
          <div style="font-size:10px;color:var(--muted);margin-bottom:4px">&lt;20 (&lt;70 años) o &lt;22 (≥70 años)</div>
          ${check('diag-glim-imc-pos', glimImcBajAuto, '✔ IMC bajo según edad')}
        </div>

        <!-- Masa muscular -->
        <div style="border-top:1px solid var(--border);padding-top:8px">
          <div style="font-size:11px;font-weight:600;margin-bottom:2px">Masa muscular reducida ${iammNum > 0 ? autoTag('IAMM '+iammAuto+' kg/m²') : ''}</div>
          <div style="font-size:10px;color:var(--muted);margin-bottom:4px">&lt;7.0 hombres / &lt;5.5 mujeres (BIA)</div>
          ${check('diag-glim-masa-pos', glimMasaRedAuto, '✔ Masa muscular reducida')}
        </div>
      </div>

      <div id="diag-glim-fen-res" style="margin-top:8px;font-size:11px;padding:6px 10px;border-radius:6px;background:${glimFenPos?'#22c55e22':'#f3f4f6'};color:${glimFenPos?'#15803d':'#6b7280'}">
        ${glimFenPos ? '✔ Criterio fenotípico: POSITIVO' : '✘ Criterio fenotípico: negativo (ninguno cumplido)'}
      </div>
    </div>

    <!-- Etiológicos -->
    <div>
      <div style="font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;margin-bottom:8px">Criterios etiológicos</div>
      <div style="background:var(--bg);border:1px solid var(--border);border-radius:8px;padding:10px;display:flex;flex-direction:column;gap:8px">

        <div>
          <div style="font-size:11px;font-weight:600;margin-bottom:4px">Reducción de ingesta / absorción</div>
          <div style="font-size:10px;color:var(--muted);margin-bottom:4px">&lt;50% ingesta >1 semana, o reducción crónica, o malabsorción</div>
          ${check('diag-glim-ingesta-pos', glimIngRedAuto, '✔ Ingesta/absorción reducida')}
        </div>

        <div style="border-top:1px solid var(--border);padding-top:8px">
          <div style="font-size:11px;font-weight:600;margin-bottom:4px">Inflamación / carga de enfermedad</div>
          <div style="font-size:10px;color:var(--muted);margin-bottom:4px">ERC, EII, cáncer, cirugía mayor, infección crónica</div>
          ${check('diag-glim-inflam-pos', glimInflamAuto, '✔ Inflamación / enfermedad activa')}
          <div class="field" style="margin-top:6px">
            <input type="text" id="diag-glim-causa" value="${d.glim_causa_inflamacion||''}" placeholder="ej. ERC estadio G4, EII activa…" style="font-size:11px" oninput="autoDiagResumen()">
          </div>
        </div>
      </div>

      <div id="diag-glim-etio-res" style="margin-top:8px;font-size:11px;padding:6px 10px;border-radius:6px;background:${glimEtioPos?'#22c55e22':'#f3f4f6'};color:${glimEtioPos?'#15803d':'#6b7280'}">
        ${glimEtioPos ? '✔ Criterio etiológico: POSITIVO' : '✘ Criterio etiológico: negativo'}
      </div>

      <!-- Diagnóstico GLIM -->
      <div style="margin-top:14px">
        <div style="font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;margin-bottom:6px">Diagnóstico GLIM</div>
        ${['sin_desnutricion','grado1_moderada','grado2_severa'].map(k =>
          radio('glim_diag', k, glimDiagCur, `<strong>${GLIM_LABEL[k]}</strong> <span style="font-size:10px;color:var(--muted)">${{sin_desnutricion:'',grado1_moderada:'pérdida 5-10% / IMC 17-19.9 / masa moderada',grado2_severa:'pérdida >10% / IMC <17 / masa severamente reducida'}[k]}</span>`)).join('')}
        <div class="field" style="margin-top:8px">
          <label>Notas GLIM</label>
          <textarea id="diag-glim-notas" rows="2" style="font-size:11px">${d.glim_notas||''}</textarea>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- ─── 3. SARCOPENIA — EWGSOP2 ────────────────────────── -->
<div class="card">
  <div class="card-title">3. Sarcopenia — Criterios EWGSOP2 2019</div>
  <div class="g3" style="align-items:start">

    <!-- Fuerza muscular -->
    <div>
      <div style="font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;margin-bottom:6px">
        Fuerza muscular ${fpMax>0 ? autoTag(fpMax+' kg FP') : ''}
      </div>
      <div style="font-size:10px;color:var(--muted);margin-bottom:6px">
        Dinamometría: &lt;27 kg (H) / &lt;16 kg (M)<br>
        Chair Stand Test: >15 seg para 5 repeticiones
      </div>
      ${check('diag-sarc-fuerza', fuerzaBajaAuto, `Fuerza disminuida${fpMax>0?' ('+fpMax+' kg)':''}`)}
    </div>

    <!-- Masa muscular -->
    <div>
      <div style="font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;margin-bottom:6px">
        Masa muscular ${iammNum>0 ? autoTag('IAMM '+iammAuto+' kg/m²') : ''}
      </div>
      <div style="font-size:10px;color:var(--muted);margin-bottom:6px">
        IAMM BIA: &lt;7.0 (H) / &lt;5.5 (M) kg/m²<br>
        IAMM DEXA: &lt;7.0 (H) / &lt;5.4 (M) kg/m²
      </div>
      <div class="field">
        <label style="font-size:10px">IAMM medido (kg/m²)</label>
        <input type="number" step="0.01" id="diag-sarc-iamm" value="${iammAuto||''}" oninput="autoDiagSarc()" style="font-size:11px">
      </div>
      ${check('diag-sarc-masa', masaBajaAuto, 'Masa muscular reducida')}
    </div>

    <!-- Rendimiento físico -->
    <div>
      <div style="font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;margin-bottom:6px">
        Rendimiento físico ${vm>0 ? autoTag(vm+' m/s marcha') : ''}
      </div>
      <div style="font-size:10px;color:var(--muted);margin-bottom:6px">
        Vel. marcha: &lt;0.8 m/s<br>
        SPPB: ≤8 puntos<br>
        TUG: >20 segundos
      </div>
      ${check('diag-sarc-rend', rendBajoAuto, `Rendimiento deteriorado${vm>0?' ('+vm+' m/s)':''}`)}
    </div>
  </div>

  <!-- Algoritmo visual -->
  <div style="background:var(--bg);border:1px solid var(--border);border-radius:8px;padding:12px;margin-top:12px">
    <div style="font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;margin-bottom:10px">Algoritmo EWGSOP2</div>
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;font-size:11px">
      <div id="alg-fuerza" style="padding:5px 12px;border-radius:20px;font-weight:600;background:${fuerzaBajaAuto?'#fef3c7':'#f0fdf4'};color:${fuerzaBajaAuto?'#92400e':'#15803d'}">
        ${fuerzaBajaAuto ? '⚠ Fuerza ↓' : '✔ Fuerza OK'}
      </div>
      <span style="color:var(--muted)">→</span>
      <div id="alg-masa" style="padding:5px 12px;border-radius:20px;font-weight:600;background:${masaBajaAuto?'#fef3c7':'#f0fdf4'};color:${masaBajaAuto?'#92400e':'#15803d'}">
        ${masaBajaAuto ? '⚠ Masa ↓' : '✔ Masa OK'}
      </div>
      <span style="color:var(--muted)">→</span>
      <div id="alg-rend" style="padding:5px 12px;border-radius:20px;font-weight:600;background:${rendBajoAuto?'#fee2e2':'#f0fdf4'};color:${rendBajoAuto?'#991b1b':'#15803d'}">
        ${rendBajoAuto ? '⚠ Rendimiento ↓' : '✔ Rendimiento OK'}
      </div>
      <span style="color:var(--muted)">→</span>
      <div id="alg-sarc-res" style="padding:5px 14px;border-radius:20px;font-weight:700;background:${SARC_COLOR[sarcDiagCur]||'#888'}22;color:${SARC_COLOR[sarcDiagCur]||'#888'};border:1px solid ${SARC_COLOR[sarcDiagCur]||'#888'}44">
        ${SARC_LABEL[sarcDiagCur]||sarcDiagCur}
      </div>
    </div>
    <div style="margin-top:8px;font-size:10px;color:var(--muted)">
      Sin fuerza ↓ → Sin sarcopenia &nbsp;|&nbsp; Fuerza ↓ sin masa ↓ → Probable &nbsp;|&nbsp; Fuerza ↓ + Masa ↓ → Confirmada &nbsp;|&nbsp; + Rendimiento ↓ → Severa
    </div>
  </div>

  <!-- Diagnóstico Sarcopenia -->
  <div style="margin-top:12px">
    <div style="font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;margin-bottom:6px">Diagnóstico final sarcopenia</div>
    <div class="g2">
      <div>
        ${['sin_sarcopenia','probable','sarcopenia','sarcopenia_severa'].map(k =>
          radio('sarc_diag', k, sarcDiagCur, `<strong>${SARC_LABEL[k]}</strong>`)).join('')}
      </div>
      <div class="field">
        <label>Notas sarcopenia</label>
        <textarea id="diag-sarc-notas" rows="3" style="font-size:11px">${d.sarc_notas||''}</textarea>
      </div>
    </div>
  </div>
</div>

<!-- ─── 4. RIESGO CARDIOMETABÓLICO ─────────────────────── -->
<div class="card">
  <div class="card-title">4. Riesgo cardiometabólico</div>
  <div class="g2" style="align-items:start">

    <div style="display:flex;flex-direction:column;gap:10px">
      <!-- Glucometabolismo -->
      <div style="background:var(--bg);border:1px solid var(--border);border-radius:8px;padding:10px">
        <div style="font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;margin-bottom:6px">
          Glucometabolismo ${an.glucosa||an.hba1c ? autoTag(an.glucosa?an.glucosa+' mg/dL':'HbA1c '+an.hba1c+'%') : ''}
        </div>
        ${['normal','alterada_ayunas','dm','dm_descontrolada'].map(k =>
          radio('rcm_glucosa', k, rcmGlucCur, GLUC_LABEL[k])).join('')}
      </div>

      <!-- Lípidos -->
      <div style="background:var(--bg);border:1px solid var(--border);border-radius:8px;padding:10px">
        <div style="font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;margin-bottom:6px">
          Perfil lipídico ${an.ldl||an.trigliceridos ? autoTag((an.ldl?'LDL '+an.ldl:'')+(an.trigliceridos?' TG '+an.trigliceridos:'')) : ''}
        </div>
        ${['normal','limite','dislipidemia','dislipidemia_mixta'].map(k =>
          radio('rcm_lipidos', k, rcmLipCur, LIP_LABEL[k])).join('')}
      </div>
    </div>

    <div style="display:flex;flex-direction:column;gap:10px">
      <!-- TA -->
      <div style="background:var(--bg);border:1px solid var(--border);border-radius:8px;padding:10px">
        <div style="font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;margin-bottom:6px">
          Presión arterial ${an.ta_sistolica||v.ta_sistolica ? autoTag((an.ta_sistolica||v.ta_sistolica)+'/'+(an.ta_diastolica||v.ta_diastolica||'?')+' mmHg') : ''}
        </div>
        ${['normal','prehta','hta_g1','hta_g2','hta_g3'].map(k =>
          radio('rcm_ta', k, rcmTACur, TA_LABEL[k])).join('')}
      </div>

      <!-- Adicionales -->
      <div style="background:var(--bg);border:1px solid var(--border);border-radius:8px;padding:10px">
        <div style="font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;margin-bottom:6px">Otros factores</div>
        ${check('diag-rcm-obcen', rcmObCen, `Obesidad central ${cintura?'('+cintura+' cm)':''} ${cinRiesgoAuto==='muy_elevado'?autoTag(''):''}`)}
        <div id="diag-rcm-sm-wrap" style="margin-top:4px">
          ${check('diag-rcm-sm', smAuto, `Síndrome metabólico ${smScore>0?'('+smScore+'/5 criterios)':''} ${smAuto?autoTag(''):''}`)}
          <div style="font-size:10px;color:var(--muted);margin-left:22px">≥3 de: cintura, TG, HDL, TA, glucosa</div>
        </div>
      </div>
    </div>
  </div>

  <!-- Resultado RCM -->
  <div style="margin-top:12px;background:var(--bg);border:1px solid var(--border);border-radius:8px;padding:12px">
    <div style="font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;margin-bottom:8px">Resultado riesgo cardiometabólico global</div>
    <div style="display:flex;gap:10px;flex-wrap:wrap">
      ${['bajo','moderado','alto','muy_alto'].map(k => `
        <label style="cursor:pointer">
          <input type="radio" name="rcm_resultado" value="${k}" ${rcmResCur===k?'checked':''} onchange="autoDiagResumen()" style="display:none" id="rcm-res-${k}">
          <div onclick="document.getElementById('rcm-res-${k}').click()" style="padding:8px 16px;border-radius:8px;font-weight:600;font-size:12px;border:2px solid ${rcmResCur===k?RCM_COLOR[k]:'var(--border)'};background:${rcmResCur===k?RCM_COLOR[k]+'22':'var(--bg)'};color:${rcmResCur===k?RCM_COLOR[k]:'var(--muted)'};cursor:pointer;transition:.15s">
            ${RCM_LABEL[k]}
          </div>
        </label>`).join('')}
    </div>
  </div>
</div>

<!-- ─── 5. ESTADO NUTRICIONAL GLOBAL ─────────────────────── -->
<div class="card" style="border-top:3px solid var(--accent2)">
  <div class="card-title" style="color:var(--accent2)">5. Estado Nutricional Global — Resumen diagnóstico</div>

  <!-- Diagnóstico principal (etiqueta corta) -->
  <div class="field">
    <label>Diagnóstico principal (para cronología / informe)</label>
    <input type="text" id="diag-principal" value="${d.diagnostico_principal||''}"
      placeholder="ej. Obesidad grado II con sarcopenia probable y riesgo cardiometabólico alto"
      style="font-weight:600">
  </div>

  <!-- Chips de resumen auto-generados -->
  <div id="diag-chips-resumen" style="display:flex;flex-wrap:wrap;gap:6px;margin:10px 0">
    <!-- Se llena por autoDiagResumen() -->
  </div>

  <!-- Texto narrativo -->
  <div class="field">
    <label>Estado nutricional detallado <span style="font-size:10px;color:var(--muted);font-weight:400">(auto-generado, editable)</span></label>
    <textarea id="diag-estado-global" rows="5" style="font-size:12px;line-height:1.6">${d.estado_global||''}</textarea>
  </div>

  <!-- Plan de acción -->
  <div class="field">
    <label>Plan de acción / Intervención nutricional</label>
    <textarea id="diag-plan-accion" rows="3" style="font-size:12px">${d.plan_accion||''}</textarea>
  </div>

  <div style="display:flex;gap:10px;justify-content:flex-end;margin-top:4px">
    <button class="btn btn-ghost" onclick="autoDiagResumen(true)">🔄 Regenerar resumen</button>
    <button class="btn btn-success" onclick="saveDiagnostico()">Guardar diagnóstico</button>
  </div>
</div>`;
}

// ── LÓGICA DIAGNÓSTICO ────────────────────────────────────────

function autoDiagSarc() {
  const iammVal = parseFloat(document.getElementById('diag-sarc-iamm')?.value) || 0;
  const pac  = State.currentPaciente || {};
  const sexo = pac.sexo || 'F';
  if (iammVal > 0) {
    const bajaMasa = sexo === 'M' ? iammVal < 7.0 : iammVal < 5.5;
    const cb = document.getElementById('diag-sarc-masa');
    if (cb) cb.checked = bajaMasa;
  }
  autoDiagResumen();
}

function autoDiagResumen(forzar = false) {
  const pac  = State.currentPaciente || {};
  const v    = State.currentVisita   || {};
  const cc   = v.composicion_corporal || {};
  const an   = v.analiticas || {};
  const sexo = pac.sexo || 'F';

  // Leer radios
  const getR = name => document.querySelector(`input[name="${name}"]:checked`)?.value || '';
  const getCh = id   => document.getElementById(id)?.checked ? 1 : 0;

  const clsImc   = getR('cls_imc');
  const cinRies  = getR('cls_cintura');
  const glimDiag = getR('glim_diag');
  const sarcDiag = getR('sarc_diag');
  const rcmGluc  = getR('rcm_glucosa');
  const rcmLip   = getR('rcm_lipidos');
  const rcmTA    = getR('rcm_ta');
  const rcmRes   = getR('rcm_resultado');
  const glimPerd = getCh('diag-glim-perd-pos');
  const glimImc  = getCh('diag-glim-imc-pos');
  const glimMasa = getCh('diag-glim-masa-pos');
  const glimIng  = getCh('diag-glim-ingesta-pos');
  const glimInfl = getCh('diag-glim-inflam-pos');
  const sarcF    = getCh('diag-sarc-fuerza');
  const sarcM    = getCh('diag-sarc-masa');
  const sarcRend = getCh('diag-sarc-rend');
  const obCen    = getCh('diag-rcm-obcen');
  const sm       = getCh('diag-rcm-sm');

  // Actualizar estado GLIM fenotípico / etiológico
  const glimFen  = glimPerd || glimImc || glimMasa;
  const glimEtio = glimIng || glimInfl;
  const fenEl  = document.getElementById('diag-glim-fen-res');
  const etioEl = document.getElementById('diag-glim-etio-res');
  if (fenEl)  { fenEl.style.background  = glimFen  ? '#22c55e22' : '#f3f4f6'; fenEl.style.color  = glimFen  ? '#15803d' : '#6b7280'; fenEl.textContent  = glimFen  ? '✔ Criterio fenotípico: POSITIVO' : '✘ Criterio fenotípico: negativo'; }
  if (etioEl) { etioEl.style.background = glimEtio ? '#22c55e22' : '#f3f4f6'; etioEl.style.color = glimEtio ? '#15803d' : '#6b7280'; etioEl.textContent = glimEtio ? '✔ Criterio etiológico: POSITIVO'  : '✘ Criterio etiológico: negativo'; }

  // Auto-seleccionar GLIM si no hay selección o forzar
  if ((!getR('glim_diag') || forzar) && glimFen && glimEtio) {
    const perdPct = parseFloat(document.getElementById('diag-glim-perdida-pct')?.value) || 0;
    const auto = perdPct > 10 || glimImc ? 'grado2_severa' : 'grado1_moderada';
    const rb = document.querySelector(`input[name="glim_diag"][value="${auto}"]`);
    if (rb) rb.checked = true;
  } else if ((!getR('glim_diag') || forzar) && !(glimFen && glimEtio)) {
    const rb = document.querySelector('input[name="glim_diag"][value="sin_desnutricion"]');
    if (rb) rb.checked = true;
  }

  // Auto-seleccionar sarcopenia
  if (!getR('sarc_diag') || forzar) {
    let autoDiag = 'sin_sarcopenia';
    if (!sarcF && !sarcM) autoDiag = 'sin_sarcopenia';
    else if (sarcF && !sarcM) autoDiag = 'probable';
    else if (sarcF && sarcM && !sarcRend) autoDiag = 'sarcopenia';
    else if (sarcM && sarcRend) autoDiag = 'sarcopenia_severa';
    const rb = document.querySelector(`input[name="sarc_diag"][value="${autoDiag}"]`);
    if (rb) rb.checked = true;
  }

  // Actualizar algoritmo visual sarcopenia
  const SARC_COLOR = { sin_sarcopenia:'#22c55e', probable:'#f59e0b', sarcopenia:'#f97316', sarcopenia_severa:'#ef4444' };
  const SARC_LABEL = { sin_sarcopenia:'Sin sarcopenia', probable:'Sarcopenia probable', sarcopenia:'Sarcopenia confirmada', sarcopenia_severa:'Sarcopenia severa' };
  const sarcFin = getR('sarc_diag') || 'sin_sarcopenia';
  const algRes = document.getElementById('alg-sarc-res');
  if (algRes) {
    algRes.style.background = SARC_COLOR[sarcFin]+'22';
    algRes.style.color      = SARC_COLOR[sarcFin];
    algRes.style.border     = `1px solid ${SARC_COLOR[sarcFin]}44`;
    algRes.textContent      = SARC_LABEL[sarcFin];
  }

  // Construir chips resumen
  const IMC_LABEL = { bajo_peso:'Bajo peso', normal:'Normal', sobrepeso:'Sobrepeso', obesidad_I:'Obesidad I', obesidad_II:'Obesidad II', obesidad_III:'Obesidad III' };
  const IMC_COLOR = { bajo_peso:'#3b82f6', normal:'#22c55e', sobrepeso:'#f59e0b', obesidad_I:'#f97316', obesidad_II:'#ef4444', obesidad_III:'#7f1d1d' };
  const GLIM_LABEL = { sin_desnutricion:'Sin desnutrición', grado1_moderada:'Desnutrición moderada', grado2_severa:'Desnutrición severa' };
  const RCM_LABEL  = { bajo:'RCM bajo', moderado:'RCM moderado', alto:'RCM alto', muy_alto:'RCM muy alto' };
  const RCM_COLOR  = { bajo:'#22c55e', moderado:'#f59e0b', alto:'#f97316', muy_alto:'#ef4444' };

  function chip(label, color) {
    return `<span style="background:${color}22;color:${color};border:1px solid ${color}55;border-radius:20px;padding:3px 11px;font-size:11px;font-weight:600">${label}</span>`;
  }

  const chips = [];
  if (clsImc  && clsImc !== 'normal') chips.push(chip(IMC_LABEL[clsImc]||clsImc, IMC_COLOR[clsImc]||'#888'));
  if (clsImc === 'normal') chips.push(chip('Peso normal', '#22c55e'));
  const glimFin = getR('glim_diag');
  if (glimFin && glimFin !== 'sin_desnutricion') chips.push(chip(GLIM_LABEL[glimFin]||glimFin, glimFin==='grado2_severa'?'#ef4444':'#f97316'));
  if (sarcFin !== 'sin_sarcopenia') chips.push(chip(SARC_LABEL[sarcFin]||sarcFin, SARC_COLOR[sarcFin]||'#888'));
  if (sm)     chips.push(chip('Síndrome metabólico', '#7c3aed'));
  if (obCen)  chips.push(chip('Obesidad central', '#f59e0b'));
  const rcmFin = getR('rcm_resultado');
  if (rcmFin) chips.push(chip(RCM_LABEL[rcmFin]||rcmFin, RCM_COLOR[rcmFin]||'#888'));
  if (rcmGluc === 'dm' || rcmGluc === 'dm_descontrolada') chips.push(chip('Diabetes mellitus'+(rcmGluc==='dm_descontrolada'?' descontrolada':''), '#ef4444'));
  else if (rcmGluc === 'alterada_ayunas') chips.push(chip('Prediabetes', '#f59e0b'));
  if (rcmLip === 'dislipidemia' || rcmLip === 'dislipidemia_mixta') chips.push(chip('Dislipidemia'+(rcmLip==='dislipidemia_mixta'?' mixta':''), '#f97316'));
  if (rcmTA && rcmTA !== 'normal') chips.push(chip({prehta:'Pre-HTA',hta_g1:'HTA grado 1',hta_g2:'HTA grado 2',hta_g3:'HTA grado 3'}[rcmTA]||rcmTA, rcmTA==='hta_g3'?'#ef4444':'#f97316'));

  const chipsEl = document.getElementById('diag-chips-resumen');
  if (chipsEl) chipsEl.innerHTML = chips.join('');

  // Generar texto narrativo automático
  const partes = [];
  if (clsImc) {
    const imc_s = IMC_LABEL[clsImc] || clsImc;
    const peso_n = cc.peso ? ` (peso actual ${cc.peso} kg` + (cc.talla ? `, talla ${cc.talla} cm` : '') + ')' : '';
    partes.push(imc_s + peso_n);
  }
  if (sarcFin !== 'sin_sarcopenia') partes.push('con ' + (SARC_LABEL[sarcFin]||sarcFin).toLowerCase());
  const glimFin2 = getR('glim_diag');
  if (glimFin2 && glimFin2 !== 'sin_desnutricion') {
    const causa = document.getElementById('diag-glim-causa')?.value;
    partes.push((GLIM_LABEL[glimFin2]||glimFin2).toLowerCase() + (causa ? ` secundaria a ${causa}` : ''));
  }
  if (sm) partes.push('síndrome metabólico');
  if (rcmFin && rcmFin !== 'bajo') partes.push((RCM_LABEL[rcmFin]||rcmFin).toLowerCase());
  if (rcmGluc === 'dm_descontrolada') partes.push('diabetes mellitus descontrolada');
  else if (rcmGluc === 'dm') partes.push('diabetes mellitus');
  else if (rcmGluc === 'alterada_ayunas') partes.push('glucosa alterada en ayunas / prediabetes');
  if (rcmLip === 'dislipidemia_mixta') partes.push('dislipidemia mixta');
  else if (rcmLip === 'dislipidemia') partes.push('dislipidemia');
  if (rcmTA === 'hta_g3') partes.push('hipertensión grado 3');
  else if (rcmTA === 'hta_g2') partes.push('hipertensión grado 2');
  else if (rcmTA === 'hta_g1') partes.push('hipertensión grado 1');
  else if (rcmTA === 'prehta') partes.push('valores tensionales en rango pre-hipertensión');

  if ((forzar || !document.getElementById('diag-estado-global')?.value) && partes.length) {
    const texto = partes.length === 1
      ? partes[0].charAt(0).toUpperCase() + partes[0].slice(1) + '.'
      : partes[0].charAt(0).toUpperCase() + partes[0].slice(1) + ' ' + partes.slice(1).join(', ') + '.';
    const el = document.getElementById('diag-estado-global');
    if (el) el.value = texto;

    // También prellenar diagnóstico principal si está vacío o forzar
    const dpEl = document.getElementById('diag-principal');
    if (dpEl && (!dpEl.value || forzar)) {
      dpEl.value = partes[0].charAt(0).toUpperCase() + partes[0].slice(1)
        + (partes.length > 1 ? ' con ' + partes.slice(1).join(' y ') : '') + '.';
    }
  }
}

async function saveDiagnostico() {
  const vid = State.currentVisita?.id;
  if (!vid) return;

  const getR  = name => document.querySelector(`input[name="${name}"]:checked`)?.value || null;
  const getCh = id   => document.getElementById(id)?.checked ? 1 : 0;
  const getV  = id   => document.getElementById(id)?.value   || null;
  const getN  = id   => parseFloat(document.getElementById(id)?.value) || null;

  const body = {
    fecha: State.currentVisita.fecha,
    clasificacion_imc:   getR('cls_imc'),
    riesgo_cintura:      getR('cls_cintura'),
    riesgo_icc:          getR('cls_icc'),
    glim_perdida_peso_pct: getN('diag-glim-perdida-pct'),
    glim_perdida_peso_pos: getCh('diag-glim-perd-pos'),
    glim_imc_bajo_pos:     getCh('diag-glim-imc-pos'),
    glim_masa_musc_red_pos:getCh('diag-glim-masa-pos'),
    glim_ingesta_red_pos:  getCh('diag-glim-ingesta-pos'),
    glim_inflamacion_pos:  getCh('diag-glim-inflam-pos'),
    glim_causa_inflamacion:getV('diag-glim-causa'),
    glim_diagnostico:    getR('glim_diag'),
    glim_notas:          getV('diag-glim-notas'),
    sarc_fuerza_pos:     getCh('diag-sarc-fuerza'),
    sarc_masa_pos:       getCh('diag-sarc-masa'),
    sarc_rendimiento_pos:getCh('diag-sarc-rend'),
    sarc_iamm:           getN('diag-sarc-iamm'),
    sarc_diagnostico:    getR('sarc_diag'),
    sarc_notas:          getV('diag-sarc-notas'),
    rcm_glucosa:         getR('rcm_glucosa'),
    rcm_lipidos:         getR('rcm_lipidos'),
    rcm_ta:              getR('rcm_ta'),
    rcm_obesidad_central:getCh('diag-rcm-obcen'),
    rcm_resultado:       getR('rcm_resultado'),
    rcm_sindrome_metab:  getCh('diag-rcm-sm'),
    estado_global:       getV('diag-estado-global'),
    diagnostico_principal: getV('diag-principal'),
    plan_accion:         getV('diag-plan-accion'),
  };

  await api(`/visitas/${vid}/diagnostico`, 'POST', body);
  toast('Diagnóstico guardado ✓');
  if (State.currentVisita) State.currentVisita.diagnostico_nutricional = body;
}

// ════════════════════════════════════════════════════════════
// MÓDULO REQUERIMIENTOS Y METAS
// ════════════════════════════════════════════════════════════

function renderTabReqs(r, v) {
  const cc  = v.composicion_corporal || {};
  const an  = v.analiticas || {};
  const pac = State.currentPaciente || {};
  const sexo = pac.sexo || 'F';
  const edad = pac.fecha_nacimiento ? calcAge(pac.fecha_nacimiento) : '';

  // Prellenar desde composición corporal si hay datos y no hay requerimientos guardados
  const peso   = r.peso_actual   || cc.peso   || '';
  const talla  = r.talla_cm      || cc.talla  || '';
  const egfr   = an.egfr || null;
  const egfr_e = an.egfr_estadio || (egfr ? egfr_estadio_label(egfr) : '');

  const meds = ['mifflin','harris','oms'];

  return `
<!-- ─── DATOS BASE ─────────────────────────────────────── -->
<div class="card">
  <div class="card-title">Datos antropométricos de referencia
    <span style="float:right;font-size:11px;color:var(--muted)">Precargado desde composición corporal</span>
  </div>
  <div class="g4">
    <div class="field"><label>Peso actual (kg)</label>
      <div class="field-wrap"><input type="number" step="0.1" id="rq-peso" value="${peso}" oninput="autoCalcReqs()"><span class="field-unit">kg</span></div></div>
    <div class="field"><label>Talla (cm)</label>
      <div class="field-wrap"><input type="number" step="0.1" id="rq-talla" value="${talla}" oninput="autoCalcReqs()"><span class="field-unit">cm</span></div></div>
    <div class="field"><label>Sexo</label>
      <select id="rq-sexo" onchange="autoCalcReqs()">
        <option value="F" ${sexo==='F'?'selected':''}>Femenino</option>
        <option value="M" ${sexo==='M'?'selected':''}>Masculino</option>
      </select></div>
    <div class="field"><label>Edad (años)</label>
      <input type="number" id="rq-edad" value="${edad}" oninput="autoCalcReqs()"></div>
  </div>

  <!-- Pesos de referencia (calculados) -->
  <div style="background:var(--bg);border:1px solid var(--border);border-radius:8px;padding:12px;margin-top:12px">
    <div style="font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px">Pesos de referencia</div>
    <div class="g4">
      <div><div style="font-size:10px;color:var(--muted)">Peso ideal Hamwi</div><div class="computed" id="rq-pi-hamwi">—</div></div>
      <div><div style="font-size:10px;color:var(--muted)">Peso ideal Devine</div><div class="computed" id="rq-pi-devine">—</div></div>
      <div><div style="font-size:10px;color:var(--muted)">Peso ajustado (si IMC>30)</div><div class="computed" id="rq-pajust">—</div></div>
      <div><div style="font-size:10px;color:var(--muted)">IMC actual</div><div class="computed" id="rq-imc">—</div></div>
    </div>
    <div class="field" style="margin-top:10px"><label>Peso a usar para cálculos</label>
      <select id="rq-peso-tipo" onchange="autoCalcReqs()">
        <option value="actual" ${(r.peso_usado||'actual')==='actual'?'selected':''}>Actual</option>
        <option value="ideal"  ${r.peso_usado==='ideal'?'selected':''}>Ideal (Hamwi)</option>
        <option value="ajust"  ${r.peso_usado==='ajust'?'selected':''}>Ajustado (Obesidad)</option>
        <option value="seco"   ${r.peso_usado==='seco'?'selected':''}>Peso seco (Hemodiálisis)</option>
      </select>
    </div>
    <div class="field" id="rq-peso-seco-wrap" style="display:${r.peso_usado==='seco'?'block':'none'}">
      <label>Peso seco estimado (kg)</label>
      <input type="number" step="0.1" id="rq-peso-seco" value="${r.peso_usado_kg||''}" oninput="autoCalcReqs()">
    </div>
    <div style="margin-top:8px;font-size:12px">Peso seleccionado para cálculos: <strong id="rq-peso-calc-label" style="color:var(--accent)">—</strong></div>
  </div>
</div>

<!-- ─── REQUERIMIENTO ENERGÉTICO ──────────────────────── -->
<div class="card">
  <div class="card-title">Requerimiento energético</div>
  <div class="g3">
    <div class="field"><label>Fórmula TMB</label>
      <select id="rq-formula" onchange="autoCalcReqs()">
        <option value="mifflin" ${(r.formula_tmb||'mifflin')==='mifflin'?'selected':''}>Mifflin-St Jeor (recomendada)</option>
        <option value="harris"  ${r.formula_tmb==='harris'?'selected':''}>Harris-Benedict revisada</option>
        <option value="oms"     ${r.formula_tmb==='oms'?'selected':''}>OMS/FAO (por edad)</option>
        <option value="simplif" ${r.formula_tmb==='simplif'?'selected':''}>Simplificada kcal/kg</option>
      </select>
    </div>
    <div class="field" id="rq-kcal-kg-wrap" style="display:${r.formula_tmb==='simplif'?'block':'none'}">
      <label>kcal/kg a usar</label>
      <select id="rq-kcal-kg-sel" onchange="autoCalcReqs()">
        <option value="20">20 kcal/kg — Pérdida peso agresiva</option>
        <option value="22">22 kcal/kg — Pérdida peso moderada</option>
        <option value="25" selected>25 kcal/kg — Mantenimiento leve</option>
        <option value="27">27 kcal/kg — Mantenimiento</option>
        <option value="30">30 kcal/kg — Activo/recuperación</option>
        <option value="35">35 kcal/kg — ERC conservadora</option>
        <option value="30-35">30-35 kcal/kg — Diálisis (HD/DP)</option>
      </select>
    </div>
    <div class="field"><label>Factor de actividad</label>
      <select id="rq-fa" onchange="autoCalcReqs()">
        <option value="1.2"   ${(r.factor_actividad||1.2)==1.2?'selected':''}>Sedentario ×1.2</option>
        <option value="1.375" ${r.factor_actividad==1.375?'selected':''}>Leve ×1.375</option>
        <option value="1.55"  ${r.factor_actividad==1.55?'selected':''}>Moderado ×1.55</option>
        <option value="1.725" ${r.factor_actividad==1.725?'selected':''}>Intenso ×1.725</option>
      </select>
    </div>
    <div class="field"><label>Factor de estrés/enfermedad</label>
      <select id="rq-fe" onchange="autoCalcReqs()">
        <option value="1.0"  ${(r.factor_estres||1.0)==1.0?'selected':''}>Sin estrés ×1.0</option>
        <option value="1.1"  ${r.factor_estres==1.1?'selected':''}>Estrés leve ×1.1 (post-egreso)</option>
        <option value="1.2"  ${r.factor_estres==1.2?'selected':''}>Estrés moderado ×1.2</option>
        <option value="1.3"  ${r.factor_estres==1.3?'selected':''}>Cirugía / EII activa ×1.3</option>
        <option value="1.5"  ${r.factor_estres==1.5?'selected':''}>UCI / sepsis ×1.5</option>
      </select>
    </div>
  </div>
  <div style="background:var(--bg);border:1px solid var(--border);border-radius:8px;padding:14px;margin-top:12px">
    <div class="g4">
      <div><div style="font-size:10px;color:var(--muted)">TMB calculado</div><div class="computed" id="rq-tmb">—</div></div>
      <div><div style="font-size:10px;color:var(--muted)">GET (TMB × FA × FE)</div><div class="computed" id="rq-get" style="color:var(--accent);font-size:15px;font-weight:700">—</div></div>
      <div><div style="font-size:10px;color:var(--muted)">kcal/kg resultado</div><div class="computed" id="rq-kcalkg-res">—</div></div>
      <div class="field"><label>kcal objetivo prescrito</label>
        <div class="field-wrap"><input type="number" id="rq-kcal-obj" value="${r.kcal_objetivo||''}" oninput="autoCalcReqsMacros()"><span class="field-unit">kcal</span></div></div>
    </div>
    <div class="field" style="margin-top:8px"><label>Déficit calórico (pérdida de peso)</label>
      <select id="rq-deficit" onchange="autoCalcReqsMacros()">
        <option value="0"    ${(r.deficit_kcal||0)==0?'selected':''}>Sin déficit — Mantenimiento</option>
        <option value="250"  ${r.deficit_kcal==250?'selected':''}>-250 kcal/día → -0.25 kg/semana</option>
        <option value="500"  ${r.deficit_kcal==500?'selected':''}>-500 kcal/día → -0.5 kg/semana</option>
        <option value="750"  ${r.deficit_kcal==750?'selected':''}>-750 kcal/día → -0.75 kg/semana</option>
        <option value="1000" ${r.deficit_kcal==1000?'selected':''}>-1000 kcal/día → -1 kg/semana</option>
      </select>
    </div>
  </div>
</div>

<!-- ─── PROTEÍNA ───────────────────────────────────────── -->
<div class="card">
  <div class="card-title">Requerimiento proteico</div>
  <div class="g2">
    <div class="field"><label>Condición clínica predominante</label>
      <select id="rq-prot-cond" onchange="autoCalcProtein()">
        <option value="estandar"      ${(r.metodo_proteina||'estandar')==='estandar'?'selected':''}>Estándar / Adulto sano (0.8 g/kg)</option>
        <option value="obesidad"      ${r.metodo_proteina==='obesidad'?'selected':''}>Obesidad — pérdida de peso (1.2-1.5 g/kg PI)</option>
        <option value="sarc"          ${r.metodo_proteina==='sarc'?'selected':''}>Sarcopenia / Adulto mayor (1.5-2.0 g/kg)</option>
        <option value="erc_cons"      ${r.metodo_proteina==='erc_cons'?'selected':''}>ERC conservadora G3-G5 (0.6-0.8 g/kg)</option>
        <option value="erc_cons_dm"   ${r.metodo_proteina==='erc_cons_dm'?'selected':''}>ERC conservadora + DM (0.8 g/kg)</option>
        <option value="hd"            ${r.metodo_proteina==='hd'?'selected':''}>Hemodiálisis (1.2-1.4 g/kg PS)</option>
        <option value="dp"            ${r.metodo_proteina==='dp'?'selected':''}>Diálisis peritoneal (1.3-1.5 g/kg PS)</option>
        <option value="eii_remision"  ${r.metodo_proteina==='eii_remision'?'selected':''}>EII en remisión (1.0-1.2 g/kg)</option>
        <option value="eii_activa"    ${r.metodo_proteina==='eii_activa'?'selected':''}>EII brote activo (1.2-1.5 g/kg)</option>
        <option value="bariatrica_temprana" ${r.metodo_proteina==='bariatrica_temprana'?'selected':''}>Post-bariátrica temprana (≥60 g/día)</option>
        <option value="bariatrica"    ${r.metodo_proteina==='bariatrica'?'selected':''}>Post-bariátrica tardía (≥80 g/día)</option>
        <option value="embarazo"      ${r.metodo_proteina==='embarazo'?'selected':''}>Embarazo (+25 g/día)</option>
        <option value="personalizado" ${r.metodo_proteina==='personalizado'?'selected':''}>Personalizado (ingreso manual)</option>
      </select>
    </div>
    <div class="field"><label>g/kg/día asignado</label>
      <div class="field-wrap">
        <input type="number" step="0.1" id="rq-prot-gkg" value="${r.proteina_g_kg||''}" oninput="autoCalcProteinManual()">
        <span class="field-unit">g/kg</span>
      </div>
    </div>
  </div>

  <!-- Resultado proteína -->
  <div style="background:var(--bg);border:1px solid var(--border);border-radius:8px;padding:14px;margin-top:10px">
    <div id="rq-prot-referencia" style="font-size:11px;color:var(--warn);margin-bottom:10px;padding:8px 10px;background:var(--bg2);border-radius:6px;border-left:3px solid var(--warn)"></div>
    <div class="g4">
      <div><div style="font-size:10px;color:var(--muted)">Proteína total</div><div class="computed" id="rq-prot-g" style="color:var(--accent);font-size:15px;font-weight:700">—</div></div>
      <div><div style="font-size:10px;color:var(--muted)">% de kcal totales</div><div class="computed" id="rq-prot-pct">—</div></div>
      <div><div style="font-size:10px;color:var(--muted)">Rango recomendado</div><div class="computed" id="rq-prot-rango" style="font-size:11px">—</div></div>
    </div>
  </div>
</div>

<!-- ─── DISTRIBUCIÓN DE MACROS ─────────────────────────── -->
<div class="card">
  <div class="card-title">Distribución de macronutrientes</div>
  <div class="g4">
    <div class="field"><label>CHO %</label>
      <select id="rq-cho-pct" onchange="autoCalcMacros()">
        <option value="45" ${r.cho_pct==45?'selected':''}>45% — Bajo CHO</option>
        <option value="50" ${(r.cho_pct||50)==50?'selected':''}>50% — Estándar</option>
        <option value="55" ${r.cho_pct==55?'selected':''}>55% — Alto CHO</option>
        <option value="personalizado">Manual</option>
      </select>
    </div>
    <div class="field"><label>Grasas %</label>
      <select id="rq-fat-pct" onchange="autoCalcMacros()">
        <option value="25" ${r.grasa_pct==25?'selected':''}>25%</option>
        <option value="30" ${(r.grasa_pct||30)==30?'selected':''}>30% — Estándar</option>
        <option value="35" ${r.grasa_pct==35?'selected':''}>35%</option>
      </select>
    </div>
    <div class="field"><label>Fibra objetivo</label>
      <select id="rq-fibra" onchange="autoCalcMacros()">
        <option value="25" ${(r.fibra_g_dia||25)==25?'selected':''}>25 g/día — Mínimo AHA</option>
        <option value="30" ${r.fibra_g_dia==30?'selected':''}>30 g/día — Óptimo</option>
        <option value="38" ${r.fibra_g_dia==38?'selected':''}>38 g/día — Hombre activo</option>
        <option value="15" ${r.fibra_g_dia==15?'selected':''}>15 g/día — ERC restricción</option>
        <option value="20" ${r.fibra_g_dia==20?'selected':''}>20 g/día — Low-FODMAP</option>
      </select>
    </div>
  </div>
  <div style="background:var(--bg);border:1px solid var(--border);border-radius:8px;padding:14px;margin-top:10px">
    <div class="g4">
      <div><div style="font-size:10px;color:var(--muted)">Carbohidratos</div><div class="computed" id="rq-cho-g">—</div></div>
      <div><div style="font-size:10px;color:var(--muted)">Grasas totales</div><div class="computed" id="rq-fat-g">—</div></div>
      <div><div style="font-size:10px;color:var(--muted)">Fibra</div><div class="computed" id="rq-fibra-g">—</div></div>
    </div>
    <!-- Barra visual de macros -->
    <div style="margin-top:12px">
      <div style="font-size:10px;color:var(--muted);margin-bottom:4px">Distribución calórica</div>
      <div id="rq-macro-bar" style="height:18px;border-radius:6px;overflow:hidden;display:flex;background:var(--border)"></div>
      <div id="rq-macro-legend" style="display:flex;gap:12px;margin-top:5px;font-size:10px;color:var(--muted)"></div>
    </div>
  </div>
</div>

<!-- ─── AGUA ──────────────────────────────────────────── -->
<div class="card">
  <div class="card-title">Requerimiento hídrico</div>
  <div class="g3">
    <div class="field"><label>Método de cálculo</label>
      <select id="rq-agua-met" onchange="autoCalcAgua()">
        <option value="peso"   ${(r.metodo_agua||'peso')==='peso'?'selected':''}>30-35 mL/kg</option>
        <option value="40ml"   ${r.metodo_agua==='40ml'?'selected':''}>40 mL/kg (ejercicio / tropical)</option>
        <option value="1ml"    ${r.metodo_agua==='1ml'?'selected':''}>1 mL/kcal prescrita</option>
        <option value="erc"    ${r.metodo_agua==='erc'?'selected':''}>ERC — según diuresis residual</option>
        <option value="hd"     ${r.metodo_agua==='hd'?'selected':''}>Hemodiálisis (restricción)</option>
        <option value="dp"     ${r.metodo_agua==='dp'?'selected':''}>Diálisis peritoneal</option>
      </select>
    </div>
    <div class="field" id="rq-diuresis-wrap" style="display:${['erc','hd'].includes(r.metodo_agua)?'block':'none'}">
      <label>Diuresis residual (mL/24h)</label>
      <input type="number" id="rq-diuresis" value="${r.diuresis||''}" oninput="autoCalcAgua()" placeholder="ej. 500">
    </div>
    <div><div style="font-size:10px;color:var(--muted);margin-bottom:4px">Agua recomendada</div><div class="computed" id="rq-agua-res" style="color:var(--accent);font-size:15px;font-weight:700">—</div></div>
  </div>
</div>

<!-- ─── RESTRICCIONES ERC ──────────────────────────────── -->
<div class="card" id="rq-erc-card" style="border-top:3px solid var(--danger)">
  <div class="card-title" style="color:var(--danger)">⚠ Restricciones según estadio renal
    <span style="float:right;font-size:11px;font-weight:400;color:var(--muted)">eGFR: <strong id="rq-egfr-display">${egfr ? egfr.toFixed(0)+' mL/min — '+egfr_e : 'No registrado en analíticas'}</strong></span>
  </div>
  <div id="rq-erc-auto-msg" style="margin-bottom:10px"></div>
  <div class="g4">
    <div class="field"><label>Sodio</label>
      <div class="field-wrap"><input type="number" id="rq-na" value="${r.sodio_mg||''}"><span class="field-unit">mg/día</span></div></div>
    <div class="field"><label>Potasio</label>
      <div class="field-wrap"><input type="number" id="rq-k" value="${r.potasio_mg||''}"><span class="field-unit">mg/día</span></div></div>
    <div class="field"><label>Fósforo</label>
      <div class="field-wrap"><input type="number" id="rq-p" value="${r.fosforo_mg||''}"><span class="field-unit">mg/día</span></div></div>
  </div>
  <div class="g2" style="margin-top:6px">
    <label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-size:12px">
      <input type="checkbox" id="rq-rest-k" ${r.restriccion_k?'checked':''}> Restricción de potasio activa
    </label>
    <label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-size:12px">
      <input type="checkbox" id="rq-rest-p" ${r.restriccion_p?'checked':''}> Restricción de fósforo activa
    </label>
  </div>
</div>

<!-- ─── METAS CLÍNICAS ─────────────────────────────────── -->
<div class="card">
  <div class="card-title">Metas clínicas individualizadas</div>

  <div style="font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px">Peso / Composición</div>
  <div class="g4">
    <div class="field"><label>Peso objetivo (kg)</label>
      <input type="number" step="0.1" id="rq-meta-peso" value="${r.meta_peso_kg||''}" oninput="calcMetaPeso()"></div>
    <div class="field"><label>% pérdida objetivo</label>
      <div class="computed" id="rq-meta-pct-perd">—</div></div>
    <div class="field"><label>Cintura objetivo (cm)</label>
      <input type="number" step="0.1" id="rq-meta-cintura" value="${r.meta_cintura_cm||''}"></div>
    <div class="field"><label>IMC objetivo</label>
      <div class="computed" id="rq-meta-imc">—</div></div>
  </div>

  <div class="divider"></div>
  <div style="font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.06em;margin:8px 0">Glucometabolismo</div>
  <div class="g4">
    <div class="field"><label>Meta HbA1c</label>
      <select id="rq-meta-hba1c">
        <option value="">—</option>
        <option value="6.5" ${r.meta_hba1c==6.5?'selected':''}>≤6.5% — Joven sin comorbilidades</option>
        <option value="7.0" ${(r.meta_hba1c||7.0)==7.0?'selected':''}>≤7.0% — Estándar ADA</option>
        <option value="7.5" ${r.meta_hba1c==7.5?'selected':''}>≤7.5% — Mayor/comorbilidades</option>
        <option value="8.0" ${r.meta_hba1c==8.0?'selected':''}>≤8.0% — Adulto mayor frágil</option>
      </select>
    </div>
    <div class="field"><label>Meta glucemia ayunas</label>
      <select id="rq-meta-gluc">
        <option value="">—</option>
        <option value="80-130" ${r.meta_glucemia_ayunas==='80-130'?'selected':''}>80-130 mg/dL — ADA Estándar</option>
        <option value="90-130" ${r.meta_glucemia_ayunas==='90-130'?'selected':''}>90-130 mg/dL — ERC</option>
        <option value="100-150" ${r.meta_glucemia_ayunas==='100-150'?'selected':''}>100-150 mg/dL — Adulto mayor</option>
      </select>
    </div>
    <div class="field"><label>Meta LDL (mg/dL)</label>
      <select id="rq-meta-ldl">
        <option value="">—</option>
        <option value="190" ${r.meta_ldl==190?'selected':''}>≤190 — Sin riesgo CV</option>
        <option value="130" ${r.meta_ldl==130?'selected':''}>≤130 — Riesgo bajo</option>
        <option value="100" ${(r.meta_ldl||100)==100?'selected':''}>≤100 — Riesgo moderado/DM</option>
        <option value="70"  ${r.meta_ldl==70?'selected':''}>≤70 — Alto riesgo CV / ERC</option>
        <option value="55"  ${r.meta_ldl==55?'selected':''}>≤55 — Muy alto riesgo / ECV previo</option>
      </select>
    </div>
  </div>

  <div class="divider"></div>
  <div style="font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.06em;margin:8px 0">Presión arterial / Renal</div>
  <div class="g4">
    <div class="field"><label>Meta TA sistólica</label>
      <select id="rq-meta-tas">
        <option value="">—</option>
        <option value="130" ${(r.meta_ta_sistolica||130)==130?'selected':''}>≤130 mmHg — HTA + DM / ERC</option>
        <option value="140" ${r.meta_ta_sistolica==140?'selected':''}>≤140 mmHg — HTA general</option>
        <option value="120" ${r.meta_ta_sistolica==120?'selected':''}>≤120 mmHg — ERC + proteinuria</option>
        <option value="150" ${r.meta_ta_sistolica==150?'selected':''}>≤150 mmHg — Adulto mayor frágil</option>
      </select>
    </div>
    <div class="field"><label>Meta TA diastólica</label>
      <select id="rq-meta-tad">
        <option value="">—</option>
        <option value="80"  ${(r.meta_ta_diastolica||80)==80?'selected':''}>≤80 mmHg</option>
        <option value="90"  ${r.meta_ta_diastolica==90?'selected':''}>≤90 mmHg</option>
      </select>
    </div>
    <div class="field"><label>Meta albuminuria</label>
      <select id="rq-meta-alb">
        <option value="">—</option>
        <option value="30"  ${r.meta_proteina_orina==30?'selected':''}>≤30 mg/g — Normal</option>
        <option value="300" ${r.meta_proteina_orina==300?'selected':''}>≤300 mg/g — Microalbuminuria</option>
      </select>
    </div>
  </div>
</div>

<!-- ─── SUPLEMENTACIÓN RECOMENDADA ────────────────────── -->
<div class="card">
  <div class="card-title">Suplementación recomendada</div>
  <div id="rq-supl-auto" style="margin-bottom:10px"></div>
  <div class="field"><label>Indicaciones de suplementación</label>
    <textarea id="rq-supl" rows="3" placeholder="ej. Vitamina D3 2000 UI/día, Omega-3 2g/día…">${r.suplementacion||''}</textarea>
  </div>
  <div class="field"><label>Notas clínicas del plan</label>
    <textarea id="rq-notas" rows="2">${r.notas||''}</textarea>
  </div>
</div>

<!-- ─── RESUMEN VISUAL ─────────────────────────────────── -->
<div class="card" id="rq-resumen-card" style="border-top:3px solid var(--accent2);display:none">
  <div class="card-title" style="color:var(--accent2)">📋 Resumen de requerimientos</div>
  <div id="rq-resumen-content"></div>
</div>

<div style="display:flex;gap:10px;justify-content:flex-end;margin-top:4px">
  <button class="btn btn-ghost" onclick="generarResumenReqs()">📋 Ver resumen</button>
  <button class="btn btn-success" onclick="saveRequerimientos()">Guardar requerimientos</button>
</div>`;
}

// ── CONSTANTES ────────────────────────────────────────────────

const PROT_INFO = {
  estandar:     { rango:'0.8 g/kg',     val:0.8,  ref:'OMS/DRI — Adulto sano' },
  obesidad:     { rango:'1.2-1.5 g/kg PI', val:1.3, ref:'ASMBS/ESPEN Obesity 2023 — usar peso ideal' },
  sarc:         { rango:'1.5-2.0 g/kg', val:1.7,  ref:'EWGSOP2 2019 — sarcopenia / adulto mayor' },
  erc_cons:     { rango:'0.6-0.8 g/kg', val:0.7,  ref:'KDOQI 2020 — ERC conservadora sin diálisis' },
  erc_cons_dm:  { rango:'0.8 g/kg',     val:0.8,  ref:'ADA/KDOQI — ERC + Diabetes Mellitus' },
  hd:           { rango:'1.2-1.4 g/kg PS', val:1.3, ref:'KDOQI 2020 — Hemodiálisis (peso seco)' },
  dp:           { rango:'1.3-1.5 g/kg PS', val:1.4, ref:'KDOQI 2020 — Diálisis peritoneal' },
  eii_remision: { rango:'1.0-1.2 g/kg', val:1.1,  ref:'ESPEN IBD 2023 — remisión' },
  eii_activa:   { rango:'1.2-1.5 g/kg', val:1.35, ref:'ESPEN IBD 2023 — brote activo' },
  bariatrica_temprana: { rango:'≥60 g/día', val:null, ref:'ASMBS 2022 — post-bariátrica < 6 meses' },
  bariatrica:   { rango:'≥80 g/día',    val:null,  ref:'ASMBS 2022 — post-bariátrica > 6 meses' },
  embarazo:     { rango:'0.8 g/kg + 25 g/día extra', val:null, ref:'IOM — gestación' },
  personalizado:{ rango:'Manual',        val:null,  ref:'' },
};

const ERC_RECOM = {
  G1:  { na:2300, k:null,  p:null,  rest_k:false, rest_p:false, msg:'' },
  G2:  { na:2300, k:null,  p:null,  rest_k:false, rest_p:false, msg:'' },
  G3a: { na:2000, k:null,  p:1000, rest_k:false, rest_p:false, msg:'G3a: Iniciar restricción Na. Vigilar P.' },
  G3b: { na:2000, k:3000, p:800,  rest_k:true,  rest_p:true,  msg:'G3b: Restringir Na, K y P. Proteína 0.6-0.8 g/kg.' },
  G4:  { na:1500, k:2000, p:600,  rest_k:true,  rest_p:true,  msg:'G4: Restricción estricta Na/K/P. Ajuste proteína según tolerancia.' },
  G5:  { na:1500, k:1500, p:600,  rest_k:true,  rest_p:true,  msg:'G5: Restricción máxima. Evaluar inicio diálisis.' },
  HD:  { na:2000, k:2000, p:800,  rest_k:true,  rest_p:true,  msg:'HD: Restricción K/P interdialítica. Na 2 g/día. Proteína 1.2-1.4 g/kg PS.' },
  DP:  { na:2000, k:3000, p:1000, rest_k:false, rest_p:true,  msg:'DP: K menos restrictivo. P restringir. Proteína 1.3-1.5 g/kg PS.' },
};

function egfr_estadio_label(egfr) {
  if (!egfr) return '';
  if (egfr >= 90) return 'G1';
  if (egfr >= 60) return 'G2';
  if (egfr >= 45) return 'G3a';
  if (egfr >= 30) return 'G3b';
  if (egfr >= 15) return 'G4';
  return 'G5';
}

// ── CÁLCULOS AUTOMÁTICOS ──────────────────────────────────────

function autoCalcReqs() {
  const peso   = parseFloat(document.getElementById('rq-peso')?.value) || 0;
  const talla  = parseFloat(document.getElementById('rq-talla')?.value) || 0;
  const sexo   = document.getElementById('rq-sexo')?.value || 'F';
  const edad   = parseFloat(document.getElementById('rq-edad')?.value) || 30;
  const formula = document.getElementById('rq-formula')?.value || 'mifflin';
  const fa     = parseFloat(document.getElementById('rq-fa')?.value) || 1.2;
  const fe     = parseFloat(document.getElementById('rq-fe')?.value) || 1.0;
  const pesoTipo = document.getElementById('rq-peso-tipo')?.value || 'actual';

  // Mostrar/ocultar campos
  const kkw = document.getElementById('rq-kcal-kg-wrap');
  if (kkw) kkw.style.display = formula === 'simplif' ? 'block' : 'none';
  const sw = document.getElementById('rq-peso-seco-wrap');
  if (sw)  sw.style.display  = pesoTipo === 'seco'   ? 'block' : 'none';
  const dw = document.getElementById('rq-diuresis-wrap');
  const aguaMet = document.getElementById('rq-agua-met')?.value || 'peso';
  if (dw) dw.style.display = ['erc','hd'].includes(aguaMet) ? 'block' : 'none';

  if (!peso || !talla) return;

  // Pesos de referencia
  const tallam = talla / 100;
  const imc = peso / (tallam * tallam);

  let piHamwi, piDevine;
  const alturaIn = talla / 2.54;
  const extIn = Math.max(0, alturaIn - 60);
  if (sexo === 'M') {
    piHamwi  = 48 + 2.7 * extIn;
    piDevine = 50 + 2.3 * extIn;
  } else {
    piHamwi  = 45.5 + 2.2 * extIn;
    piDevine = 45.5 + 2.3 * extIn;
  }
  const pajust = piHamwi + 0.4 * (peso - piHamwi);

  setEl('rq-pi-hamwi', piHamwi.toFixed(1) + ' kg');
  setEl('rq-pi-devine', piDevine.toFixed(1) + ' kg');
  setEl('rq-pajust',   imc > 30 ? pajust.toFixed(1) + ' kg' : 'N/A (IMC ≤30)');
  setEl('rq-imc',      imc.toFixed(1) + ' kg/m²');

  // Peso de cálculo
  let pesoCalc = peso;
  let pesoLabel = `${peso} kg (actual)`;
  if (pesoTipo === 'ideal')  { pesoCalc = piHamwi;  pesoLabel = `${piHamwi.toFixed(1)} kg (ideal Hamwi)`; }
  if (pesoTipo === 'ajust')  { pesoCalc = imc > 30 ? pajust : piHamwi; pesoLabel = `${pesoCalc.toFixed(1)} kg (ajustado)`; }
  if (pesoTipo === 'seco') {
    const ps = parseFloat(document.getElementById('rq-peso-seco')?.value) || peso;
    pesoCalc  = ps;
    pesoLabel = `${ps} kg (seco)`;
  }
  setEl('rq-peso-calc-label', pesoLabel);

  // TMB
  let tmb = 0;
  if (formula === 'mifflin') {
    tmb = sexo === 'M'
      ? 10*pesoCalc + 6.25*talla - 5*edad + 5
      : 10*pesoCalc + 6.25*talla - 5*edad - 161;
  } else if (formula === 'harris') {
    tmb = sexo === 'M'
      ? 66.5 + 13.75*pesoCalc + 5.003*talla - 6.775*edad
      : 655.1 + 9.563*pesoCalc + 1.85*talla  - 4.676*edad;
  } else if (formula === 'oms') {
    // OMS por grupo de edad (Mujer)
    const t = [
      [18,30,  {F:[14.7,496],  M:[15.3,679]}],
      [30,60,  {F:[8.7,829],   M:[11.6,879]}],
      [60,999, {F:[10.5,596],  M:[13.5,487]}],
    ];
    for (const [a,b,s] of t) if (edad>=a && edad<b) { const c=s[sexo]; tmb=c[0]*pesoCalc+c[1]; break; }
  } else if (formula === 'simplif') {
    const kkSel = document.getElementById('rq-kcal-kg-sel')?.value || '25';
    const kk = kkSel.includes('-') ? (parseFloat(kkSel)+parseFloat(kkSel.split('-')[1]))/2 : parseFloat(kkSel);
    tmb = kk * pesoCalc;
    setEl('rq-tmb', Math.round(tmb) + ' kcal (' + kkSel + ' kcal/kg)');
    const get = tmb; // ya incluye actividad en método simplificado
    setEl('rq-get', Math.round(get) + ' kcal/día');
    setEl('rq-kcalkg-res', (get/pesoCalc).toFixed(1) + ' kcal/kg');
    const kcalObjEl = document.getElementById('rq-kcal-obj');
    if (kcalObjEl && !kcalObjEl.value) kcalObjEl.value = Math.round(get);
    autoCalcProtein();
    autoCalcMacros();
    autoCalcAgua();
    autoCalcERC();
    autoSuplementacion();
    return;
  }

  const get = tmb * fa * fe;
  const deficit = parseFloat(document.getElementById('rq-deficit')?.value) || 0;
  const kcalPres = get - deficit;

  setEl('rq-tmb', Math.round(tmb) + ' kcal');
  setEl('rq-get', Math.round(get) + ' kcal/día');
  setEl('rq-kcalkg-res', (get/pesoCalc).toFixed(1) + ' kcal/kg');

  const kcalObjEl = document.getElementById('rq-kcal-obj');
  if (kcalObjEl && !kcalObjEl.value) kcalObjEl.value = Math.round(kcalPres);

  autoCalcProtein();
  autoCalcMacros();
  autoCalcAgua();
  autoCalcERC();
  autoSuplementacion();
  calcMetaPeso();
}

function autoCalcReqsMacros() { autoCalcMacros(); }

function autoCalcProtein() {
  const cond  = document.getElementById('rq-prot-cond')?.value || 'estandar';
  const pesoT = document.getElementById('rq-peso-tipo')?.value || 'actual';
  const info  = PROT_INFO[cond];

  const peso = parseFloat(document.getElementById('rq-peso')?.value) || 0;
  const talla = parseFloat(document.getElementById('rq-talla')?.value) || 0;
  const tallam = talla/100;
  const imc = peso && talla ? peso/(tallam*tallam) : 0;
  const sexo = document.getElementById('rq-sexo')?.value || 'F';
  const edad = parseFloat(document.getElementById('rq-edad')?.value) || 30;
  const alturaIn = talla / 2.54;
  const extIn = Math.max(0, alturaIn - 60);
  const piHamwi = sexo==='M' ? 48+2.7*extIn : 45.5+2.2*extIn;
  const pajust  = piHamwi + 0.4*(peso-piHamwi);

  let pesoRef = peso;
  if (pesoT==='ideal') pesoRef = piHamwi;
  if (pesoT==='ajust') pesoRef = imc>30 ? pajust : piHamwi;
  if (pesoT==='seco')  pesoRef = parseFloat(document.getElementById('rq-peso-seco')?.value) || peso;

  // Para obesidad, usar peso ideal
  if (cond==='obesidad') pesoRef = piHamwi;

  const gkgEl = document.getElementById('rq-prot-gkg');

  let protG = 0;
  if (info.val) {
    if (gkgEl && cond !== 'personalizado') gkgEl.value = info.val;
    protG = info.val * pesoRef;
  } else if (cond === 'bariatrica_temprana') {
    protG = 60;
    if (gkgEl) gkgEl.value = '';
  } else if (cond === 'bariatrica') {
    protG = 80;
    if (gkgEl) gkgEl.value = '';
  } else if (cond === 'embarazo') {
    protG = 0.8 * pesoRef + 25;
    if (gkgEl) gkgEl.value = '';
  } else {
    protG = (parseFloat(gkgEl?.value) || 1.0) * pesoRef;
  }

  const kcalObj = parseFloat(document.getElementById('rq-kcal-obj')?.value) || 0;
  const protPct = kcalObj ? (protG*4/kcalObj*100).toFixed(1) : '—';

  setEl('rq-prot-g',    protG > 0 ? protG.toFixed(0) + ' g/día' : '—');
  setEl('rq-prot-pct',  protPct !== '—' ? protPct + '%' : '—');
  setEl('rq-prot-rango', info.rango);

  const refEl = document.getElementById('rq-prot-referencia');
  if (refEl) refEl.textContent = info.ref ? '📚 Evidencia: ' + info.ref : '';

  autoCalcMacros();
}

function autoCalcProteinManual() {
  const gkg   = parseFloat(document.getElementById('rq-prot-gkg')?.value) || 0;
  const pesoT = document.getElementById('rq-peso-tipo')?.value || 'actual';
  const peso  = parseFloat(document.getElementById('rq-peso')?.value) || 0;
  const pesoRef = peso; // simplificado para input manual
  const protG = gkg * pesoRef;
  const kcalObj = parseFloat(document.getElementById('rq-kcal-obj')?.value) || 0;
  const protPct = kcalObj ? (protG*4/kcalObj*100).toFixed(1) : '—';
  setEl('rq-prot-g',   protG > 0 ? protG.toFixed(0) + ' g/día' : '—');
  setEl('rq-prot-pct', protPct !== '—' ? protPct + '%' : '—');
  autoCalcMacros();
}

function autoCalcMacros() {
  const kcal  = parseFloat(document.getElementById('rq-kcal-obj')?.value) || 0;
  const choPct = parseFloat(document.getElementById('rq-cho-pct')?.value) || 50;
  const fatPct = parseFloat(document.getElementById('rq-fat-pct')?.value) || 30;
  const fibra  = parseFloat(document.getElementById('rq-fibra')?.value)  || 25;

  if (!kcal) return;
  const choG = (kcal * choPct/100 / 4).toFixed(0);
  const fatG = (kcal * fatPct/100 / 9).toFixed(0);

  setEl('rq-cho-g',   choG + ' g/día (' + choPct + '%)');
  setEl('rq-fat-g',   fatG + ' g/día (' + fatPct + '%)');
  setEl('rq-fibra-g', fibra + ' g/día');

  // Barra visual de macros
  const protEl = document.getElementById('rq-prot-g');
  const protGStr = protEl?.textContent || '0';
  const protG = parseFloat(protGStr) || 0;
  const protPct = protG ? Math.round(protG*4/kcal*100) : 0;
  const bar = document.getElementById('rq-macro-bar');
  const leg = document.getElementById('rq-macro-legend');
  if (bar) bar.innerHTML = `
    <div style="width:${protPct}%;background:#34c78a;height:100%"></div>
    <div style="width:${choPct}%;background:#a78bfa;height:100%"></div>
    <div style="width:${100-protPct-choPct}%;background:#f0a742;height:100%"></div>`;
  if (leg) leg.innerHTML = `
    <span><span style="display:inline-block;width:10px;height:10px;background:#34c78a;border-radius:2px;margin-right:3px"></span>Proteína ${protPct}%</span>
    <span><span style="display:inline-block;width:10px;height:10px;background:#a78bfa;border-radius:2px;margin-right:3px"></span>CHO ${choPct}%</span>
    <span><span style="display:inline-block;width:10px;height:10px;background:#f0a742;border-radius:2px;margin-right:3px"></span>Grasa ${100-protPct-choPct}%</span>`;
}

function autoCalcAgua() {
  const peso  = parseFloat(document.getElementById('rq-peso')?.value) || 0;
  const met   = document.getElementById('rq-agua-met')?.value || 'peso';
  const kcal  = parseFloat(document.getElementById('rq-kcal-obj')?.value) || 0;
  const diur  = parseFloat(document.getElementById('rq-diuresis')?.value) || 500;
  const dw    = document.getElementById('rq-diuresis-wrap');
  if (dw) dw.style.display = ['erc','hd'].includes(met) ? 'block' : 'none';

  let agua = 0, label = '';
  if (met === 'peso')  { agua = peso * 32.5; label = `${peso} kg × 32.5 mL`; }
  if (met === '40ml')  { agua = peso * 40;   label = `${peso} kg × 40 mL`; }
  if (met === '1ml')   { agua = kcal;        label = `1 mL/kcal × ${Math.round(kcal)} kcal`; }
  if (met === 'erc')   { agua = diur + 500;  label = `Diuresis (${diur} mL) + 500 mL insensibles`; }
  if (met === 'hd')    { agua = diur + 750;  label = `Diuresis residual (${diur} mL) + 750 mL`; }
  if (met === 'dp')    { agua = diur + 1000; label = `Diuresis (${diur} mL) + 1000 mL (DP)`; }

  setEl('rq-agua-res', agua > 0 ? `${Math.round(agua)} mL/día (${(agua/1000).toFixed(1)} L)` : '—');
}

function autoCalcERC() {
  const an = State.currentVisita?.analiticas || {};
  const egfr = an.egfr || null;
  const estadio = an.egfr_estadio || (egfr ? egfr_estadio_label(egfr) : null);
  const msgEl = document.getElementById('rq-erc-auto-msg');
  if (!estadio || !ERC_RECOM[estadio]) {
    if (msgEl) msgEl.innerHTML = '';
    return;
  }
  const rec = ERC_RECOM[estadio];
  // Prellenar solo si vacío
  const naEl = document.getElementById('rq-na');
  const kEl  = document.getElementById('rq-k');
  const pEl  = document.getElementById('rq-p');
  if (naEl && !naEl.value) naEl.value = rec.na || '';
  if (kEl  && !kEl.value  && rec.k) kEl.value = rec.k;
  if (pEl  && !pEl.value  && rec.p) pEl.value = rec.p;
  const rkEl = document.getElementById('rq-rest-k');
  const rpEl = document.getElementById('rq-rest-p');
  if (rkEl && !rkEl.checked) rkEl.checked = rec.rest_k;
  if (rpEl && !rpEl.checked) rpEl.checked = rec.rest_p;

  if (msgEl && rec.msg) {
    msgEl.innerHTML = `<div style="padding:8px 12px;background:var(--danger)12;border-left:3px solid var(--danger);border-radius:0 6px 6px 0;font-size:12px;color:var(--text)">${rec.msg}</div>`;
  }
}

function autoSuplementacion() {
  const an = State.currentVisita?.analiticas || {};
  const suggs = [];
  if (an.vitamina_d !== null && an.vitamina_d < 30)  suggs.push('Vitamina D3 2000-4000 UI/día (déficit)');
  if (an.vitamina_b12 !== null && an.vitamina_b12 < 200) suggs.push('Vitamina B12 1000 mcg/día oral');
  if (an.ferritina !== null && an.ferritina < 30)  suggs.push('Hierro oral o IV (ferritina baja)');
  if (an.magnesio !== null && an.magnesio < 1.7)   suggs.push('Magnesio glicinato 200-400 mg/día');
  if (an.folato !== null && an.folato < 3)          suggs.push('Ácido fólico 1-5 mg/día');
  const egfr = an.egfr;
  if (egfr && egfr < 45) suggs.push('Calcitriol 0.25-0.5 mcg/día (ajustar por PTH)');
  if (egfr && egfr < 60) suggs.push('Vitamina B complejo (hídrosolubles se pierden en diálisis si aplica)');

  const cond = document.getElementById('rq-prot-cond')?.value || '';
  if (cond.includes('bariatrica')) {
    suggs.push('Multivitamínico bariátrico masticable 2×/día');
    suggs.push('Vitamina B12 350 mcg sublingual diario');
    suggs.push('Calcio citrato 1200-1500 mg/día + Vitamina D3 3000 UI');
    suggs.push('Hierro elemental 45-60 mg/día');
  }

  const suplEl = document.getElementById('rq-supl-auto');
  if (suplEl && suggs.length) {
    suplEl.innerHTML = `<div style="background:var(--accent2)12;border-left:3px solid var(--accent2);border-radius:0 6px 6px 0;padding:8px 12px;font-size:11px">
      <div style="font-weight:600;margin-bottom:4px;color:var(--accent2)">Sugerencias automáticas según analíticas:</div>
      ${suggs.map(s=>`<div>• ${s}</div>`).join('')}
    </div>`;
  } else if (suplEl) suplEl.innerHTML = '';
}

function calcMetaPeso() {
  const pesoAct = parseFloat(document.getElementById('rq-peso')?.value) || 0;
  const metaPeso = parseFloat(document.getElementById('rq-meta-peso')?.value) || 0;
  const talla = parseFloat(document.getElementById('rq-talla')?.value) || 0;
  if (pesoAct && metaPeso) {
    const pct = ((pesoAct-metaPeso)/pesoAct*100).toFixed(1);
    setEl('rq-meta-pct-perd', pct + '% pérdida');
  }
  if (metaPeso && talla) {
    const tallam = talla/100;
    const imcMeta = (metaPeso/(tallam*tallam)).toFixed(1);
    setEl('rq-meta-imc', imcMeta + ' kg/m²');
  }
}

function setEl(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

function generarResumenReqs() {
  const card = document.getElementById('rq-resumen-card');
  const cont = document.getElementById('rq-resumen-content');
  if (!card || !cont) return;

  const get    = document.getElementById('rq-get')?.textContent    || '—';
  const kcalO  = document.getElementById('rq-kcal-obj')?.value     || '—';
  const protG  = document.getElementById('rq-prot-g')?.textContent || '—';
  const choG   = document.getElementById('rq-cho-g')?.textContent  || '—';
  const fatG   = document.getElementById('rq-fat-g')?.textContent  || '—';
  const agua   = document.getElementById('rq-agua-res')?.textContent || '—';
  const cond   = document.getElementById('rq-prot-cond')?.value    || '';
  const na     = document.getElementById('rq-na')?.value;
  const k      = document.getElementById('rq-k')?.value;
  const p      = document.getElementById('rq-p')?.value;

  cont.innerHTML = `
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:13px">
    ${[
      ['Energía GET',     get],
      ['kcal prescrito',  kcalO ? kcalO+' kcal/día' : '—'],
      ['Proteína',        protG],
      ['Carbohidratos',   choG],
      ['Grasas',          fatG],
      ['Agua',            agua],
      na ? ['Sodio máx', na+' mg/día'] : null,
      k  ? ['Potasio máx', k+' mg/día'] : null,
      p  ? ['Fósforo máx', p+' mg/día'] : null,
    ].filter(Boolean).map(([l,v]) => `
      <div style="display:flex;justify-content:space-between;padding:6px 10px;background:var(--bg2);border-radius:6px">
        <span style="color:var(--muted)">${l}</span>
        <span style="font-weight:600">${v}</span>
      </div>`).join('')}
  </div>`;

  card.style.display = 'block';
  card.scrollIntoView({ behavior:'smooth', block:'nearest' });
}

async function saveRequerimientos() {
  const vid = State.currentVisita?.id;
  if (!vid) return;

  const getNum = id => parseFloat(document.getElementById(id)?.value) || null;
  const getStr = id => document.getElementById(id)?.value || null;
  const getBool = id => document.getElementById(id)?.checked ? 1 : 0;

  const peso   = getNum('rq-peso');
  const talla  = getNum('rq-talla');
  const piH    = peso && talla ? (() => {
    const sexo=getStr('rq-sexo')||'F'; const altIn=talla/2.54; const ext=Math.max(0,altIn-60);
    return sexo==='M' ? 48+2.7*ext : 45.5+2.2*ext; })() : null;

  const body = {
    fecha: State.currentVisita.fecha,
    peso_actual: peso, talla_cm: talla,
    peso_ideal_hamwi: piH ? parseFloat(piH.toFixed(1)) : null,
    peso_usado: getStr('rq-peso-tipo'),
    peso_usado_kg: getNum('rq-peso-seco') || peso,
    formula_tmb: getStr('rq-formula'),
    tmb_calculado: parseFloat(document.getElementById('rq-tmb')?.textContent) || null,
    factor_actividad: parseFloat(getStr('rq-fa')) || null,
    factor_estres:    parseFloat(getStr('rq-fe')) || null,
    get_calculado:    parseFloat(document.getElementById('rq-get')?.textContent) || null,
    kcal_objetivo:    getNum('rq-kcal-obj'),
    deficit_kcal:     parseFloat(getStr('rq-deficit')) || 0,
    metodo_proteina:  getStr('rq-prot-cond'),
    proteina_g_kg:    getNum('rq-prot-gkg'),
    proteina_g_dia:   parseFloat(document.getElementById('rq-prot-g')?.textContent) || null,
    cho_pct:    parseFloat(getStr('rq-cho-pct'))  || null,
    grasa_pct:  parseFloat(getStr('rq-fat-pct'))  || null,
    fibra_g_dia:parseFloat(getStr('rq-fibra'))    || null,
    agua_ml_dia: parseFloat(document.getElementById('rq-agua-res')?.textContent) || null,
    metodo_agua: getStr('rq-agua-met'),
    sodio_mg:   getNum('rq-na'),  potasio_mg: getNum('rq-k'),  fosforo_mg: getNum('rq-p'),
    restriccion_k: getBool('rq-rest-k'), restriccion_p: getBool('rq-rest-p'),
    meta_peso_kg: getNum('rq-meta-peso'), meta_cintura_cm: getNum('rq-meta-cintura'),
    meta_hba1c:   parseFloat(getStr('rq-meta-hba1c'))  || null,
    meta_glucemia_ayunas: getStr('rq-meta-gluc'),
    meta_ldl:     parseFloat(getStr('rq-meta-ldl'))    || null,
    meta_ta_sistolica:  parseInt(getStr('rq-meta-tas')) || null,
    meta_ta_diastolica: parseInt(getStr('rq-meta-tad')) || null,
    meta_proteina_orina: parseInt(getStr('rq-meta-alb')) || null,
    suplementacion: getStr('rq-supl'),
    notas: getStr('rq-notas'),
  };

  try {
    await api(`/visitas/${vid}/requerimientos`, 'POST', body);
    toast('Requerimientos guardados ✓');
    // Actualizar State para cronología
    if (State.currentVisita) State.currentVisita.requerimientos = body;
  } catch(e) {}
}

// ════════════════════════════════════════════════════════════
// CATÁLOGO DE FÁRMACOS — VISTA ADMINISTRACIÓN
// ════════════════════════════════════════════════════════════

const CatState = {
  farmacos: [],   // catálogo completo sin filtro de eGFR
  clases: []
};

const SEM_CYCLE = ['verde', 'amarillo', 'rojo'];
const SEM_COLOR = { verde: '#34c78a', amarillo: '#f0a742', rojo: '#e05c5c' };
const SEM_TXT   = { verde: '✓ Seguro', amarillo: '⚠ Precaución', rojo: '✕ Contraindicado' };
const SEM_KEYS  = ['g1','g2','g3a','g3b','g4','g5','hd','dp'];

async function loadCatalogoAdmin() {
  const [farmacos, clases, inters] = await Promise.all([
    api('/farmacos/catalogo'),
    api('/farmacos/clases'),
    api('/farmacos/interacciones')
  ]);
  CatState.farmacos      = farmacos || [];
  CatState.clases        = clases   || [];
  CatState.interacciones = inters   || [];

  // Poblar datalist de clases en el modal
  const dl = document.getElementById('nf-clase-list');
  if (dl) dl.innerHTML = CatState.clases.map(c => `<option value="${c}">`).join('');

  // Poblar select de filtro
  const sel = document.getElementById('farm-cat-clase');
  if (sel) {
    sel.innerHTML = '<option value="">Todas las clases</option>' +
      CatState.clases.map(c => `<option value="${c}">${c}</option>`).join('');
  }

  // Estadísticas
  renderCatStats();
  renderCatalogoAdmin();
  renderInteraccionesCatalogo();
}

function renderCatStats() {
  const el = document.getElementById('farm-cat-stats');
  if (!el) return;
  const total = CatState.farmacos.length;
  const byClase = {};
  CatState.farmacos.forEach(f => { byClase[f.clase] = (byClase[f.clase]||0)+1; });
  const topClases = Object.entries(byClase).sort((a,b)=>b[1]-a[1]).slice(0,5);

  el.innerHTML = `
    <div style="background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:12px 18px;min-width:120px;text-align:center">
      <div style="font-size:28px;font-weight:700;color:var(--accent)">${total}</div>
      <div style="font-size:11px;color:var(--muted)">Fármacos en catálogo</div>
    </div>
    ${topClases.map(([cls,n])=>`
      <div style="background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:10px 14px;min-width:100px;text-align:center">
        <div style="font-size:20px;font-weight:700;color:var(--text)">${n}</div>
        <div style="font-size:10px;color:var(--muted)">${cls}</div>
      </div>`).join('')}
  `;
}

function semDot(val) {
  const cls = val==='verde'?'sem-v':val==='amarillo'?'sem-a':'sem-r';
  return `<span class="sem-cell ${cls}" title="${SEM_TXT[val]||val}"></span>`;
}

function renderCatalogoAdmin() {
  const el = document.getElementById('farm-cat-table');
  if (!el) return;

  const q     = (document.getElementById('farm-cat-search')?.value || '').toLowerCase();
  const clase = document.getElementById('farm-cat-clase')?.value || '';
  const sem   = document.getElementById('farm-cat-sem')?.value   || '';

  let items = CatState.farmacos;
  if (q) {
    items = items.filter(f => {
      const comer = Array.isArray(f.nombres_comer) ? f.nombres_comer.join(' ') : (f.nombres_comer||'');
      return f.nombre.toLowerCase().includes(q) ||
             comer.toLowerCase().includes(q) ||
             (f.clase||'').toLowerCase().includes(q) ||
             (f.subclase||'').toLowerCase().includes(q);
    });
  }
  if (clase) items = items.filter(f => f.clase === clase);
  if (sem)   items = items.filter(f => f.egfr_g3b === sem);  // semáforo en G3b como referencia

  if (!items.length) {
    el.innerHTML = `<div style="color:var(--muted);padding:24px;text-align:center">Sin resultados.</div>`;
    return;
  }

  el.innerHTML = `
  <table class="farm-table">
    <thead><tr>
      <th>Fármaco</th>
      <th>Clase</th>
      <th>Dosis estándar</th>
      <th style="text-align:center">G1</th>
      <th style="text-align:center">G2</th>
      <th style="text-align:center">G3a</th>
      <th style="text-align:center">G3b</th>
      <th style="text-align:center">G4</th>
      <th style="text-align:center">G5</th>
      <th style="text-align:center">HD</th>
      <th style="text-align:center">DP</th>
      <th></th>
    </tr></thead>
    <tbody>
      ${items.map(f => {
        const comer = Array.isArray(f.nombres_comer) ? f.nombres_comer.join(', ') : (f.nombres_comer||'');
        return `<tr>
          <td>
            <div style="font-weight:600;font-size:13px">${f.nombre}</div>
            ${comer ? `<div style="font-size:10px;color:var(--muted);margin-top:2px">${comer}</div>` : ''}
            ${f.nota_egfr ? `<div style="font-size:10px;color:var(--warn);margin-top:3px;max-width:280px">⚠ ${f.nota_egfr.substring(0,80)}${f.nota_egfr.length>80?'…':''}</div>` : ''}
          </td>
          <td><span class="farm-clase-badge">${f.clase||'—'}</span>${f.subclase?`<div style="font-size:10px;color:var(--muted);margin-top:3px">${f.subclase}</div>`:''}</td>
          <td style="font-size:11px;color:var(--muted);min-width:120px">${f.dosis_std||'—'}</td>
          <td style="text-align:center">${semDot(f.egfr_g1)}</td>
          <td style="text-align:center">${semDot(f.egfr_g2)}</td>
          <td style="text-align:center">${semDot(f.egfr_g3a)}</td>
          <td style="text-align:center">${semDot(f.egfr_g3b)}</td>
          <td style="text-align:center">${semDot(f.egfr_g4)}</td>
          <td style="text-align:center">${semDot(f.egfr_g5)}</td>
          <td style="text-align:center">${semDot(f.egfr_hd)}</td>
          <td style="text-align:center">${semDot(f.egfr_dp)}</td>
          <td style="white-space:nowrap">
            <button onclick="editFarmacoModal(${f.id})" style="background:none;border:none;color:var(--accent);cursor:pointer;font-size:12px;padding:2px 6px" title="Editar">✏</button>
            <button onclick="deleteFarmacoCatalogo(${f.id},'${f.nombre.replace(/'/g,"\\'")}',this)" style="background:none;border:none;color:var(--danger);cursor:pointer;font-size:14px;padding:2px 4px" title="Desactivar">×</button>
          </td>
        </tr>`;
      }).join('')}
    </tbody>
  </table>`;
}

function renderInteraccionesCatalogo() {
  const el = document.getElementById('farm-cat-interacciones');
  if (!el) return;
  const inters = CatState.interacciones || [];
  if (!inters.length) { el.innerHTML = ''; return; }

  const porSev = { contraindicado:[], grave:[], moderada:[], leve:[] };
  inters.forEach(i => (porSev[i.severidad] = porSev[i.severidad] || []).push(i));

  el.innerHTML = `
  <div class="card" style="margin-top:20px">
    <div class="card-title">Base de datos de interacciones (${inters.length} pares registrados)</div>
    ${['contraindicado','grave','moderada','leve'].filter(s=>porSev[s]?.length).map(sev => `
      <div style="margin-bottom:14px">
        <div style="font-size:10px;font-weight:700;color:${SEV_COLOR[sev]};text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px">
          ${SEV_ICON[sev]} ${sev.toUpperCase()} (${porSev[sev].length})
        </div>
        ${porSev[sev].map(i => {
          const a = i.nombre_farmaco_a || i.clase_a || i.subclase_a || '?';
          const b = i.nombre_farmaco_b || i.clase_b || i.subclase_b || '?';
          return `
          <div style="display:flex;align-items:flex-start;gap:10px;padding:8px 0;border-bottom:1px solid var(--border)">
            <span style="width:10px;height:10px;border-radius:50%;background:${SEV_COLOR[sev]};flex-shrink:0;margin-top:3px"></span>
            <div style="flex:1">
              <div style="font-size:12px;font-weight:600">${a} ↔ ${b}</div>
              <div style="font-size:11px;color:var(--muted)">${i.consecuencia}</div>
              <div style="font-size:10px;color:var(--accent2)">✦ ${i.manejo}</div>
            </div>
          </div>`;
        }).join('')}
      </div>`).join('')}
  </div>`;
}

// ── MODAL NUEVO / EDITAR ──────────────────────────────────────

const NF_DEFAULT_SEM = { g1:'verde', g2:'verde', g3a:'verde', g3b:'amarillo', g4:'rojo', g5:'rojo', hd:'rojo', dp:'rojo' };
let nfSemValues = { ...NF_DEFAULT_SEM };

function setSemPicker(key, value) {
  nfSemValues[key] = value;
  const el = document.getElementById(`nf-sem-${key}`);
  if (!el) return;
  el.className = `sem-picker active-${value}`;
}

function cycleSem(el) {
  const key = el.dataset.key;
  const cur = nfSemValues[key] || 'verde';
  const next = SEM_CYCLE[(SEM_CYCLE.indexOf(cur) + 1) % 3];
  setSemPicker(key, next);
}

function resetNfModal() {
  ['nf-id','nf-nombre','nf-comer','nf-clase','nf-subclase','nf-dosis',
   'nf-freq','nf-indic','nf-nota-egfr','nf-contra'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  document.getElementById('nf-via').value = 'oral';
  nfSemValues = { ...NF_DEFAULT_SEM };
  SEM_KEYS.forEach(k => setSemPicker(k, nfSemValues[k]));
  document.getElementById('nfTitle').textContent = 'Nuevo fármaco';
}

function openNuevoFarmacoModal() {
  resetNfModal();
  document.getElementById('overlayNuevoFarmaco').classList.add('open');
}

function editFarmacoModal(fid) {
  const f = CatState.farmacos.find(x => x.id === fid);
  if (!f) return;

  resetNfModal();
  document.getElementById('nfTitle').textContent = `Editar — ${f.nombre}`;
  document.getElementById('nf-id').value      = f.id;
  document.getElementById('nf-nombre').value  = f.nombre || '';
  const comer = Array.isArray(f.nombres_comer) ? f.nombres_comer.join(', ') : (f.nombres_comer||'');
  document.getElementById('nf-comer').value   = comer;
  document.getElementById('nf-clase').value   = f.clase || '';
  document.getElementById('nf-subclase').value = f.subclase || '';
  document.getElementById('nf-dosis').value   = f.dosis_std || '';
  document.getElementById('nf-freq').value    = f.frecuencia_std || '';
  const ind = Array.isArray(f.indicaciones) ? f.indicaciones.join(', ') : (f.indicaciones||'');
  document.getElementById('nf-indic').value   = ind;
  document.getElementById('nf-via').value     = f.via || 'oral';
  document.getElementById('nf-nota-egfr').value = f.nota_egfr || '';
  document.getElementById('nf-contra').value  = f.contraindicaciones || '';

  SEM_KEYS.forEach(k => setSemPicker(k, f[`egfr_${k}`] || 'verde'));

  document.getElementById('overlayNuevoFarmaco').classList.add('open');
}

async function guardarNuevoFarmaco() {
  const nombre = document.getElementById('nf-nombre').value.trim();
  const clase  = document.getElementById('nf-clase').value.trim();
  if (!nombre || !clase) { toast('Nombre y clase son obligatorios', 'err'); return; }

  const body = {
    nombre,
    nombres_comer: document.getElementById('nf-comer').value,
    clase,
    subclase:      document.getElementById('nf-subclase').value,
    dosis_std:     document.getElementById('nf-dosis').value,
    frecuencia_std:document.getElementById('nf-freq').value,
    indicaciones:  document.getElementById('nf-indic').value,
    via:           document.getElementById('nf-via').value,
    nota_egfr:     document.getElementById('nf-nota-egfr').value,
    contraindicaciones: document.getElementById('nf-contra').value,
    egfr_g1:  nfSemValues.g1,  egfr_g2:  nfSemValues.g2,
    egfr_g3a: nfSemValues.g3a, egfr_g3b: nfSemValues.g3b,
    egfr_g4:  nfSemValues.g4,  egfr_g5:  nfSemValues.g5,
    egfr_hd:  nfSemValues.hd,  egfr_dp:  nfSemValues.dp,
  };

  const fid = document.getElementById('nf-id').value;
  try {
    let saved;
    if (fid) {
      saved = await api(`/farmacos/catalogo/${fid}`, 'PUT', body);
      const idx = CatState.farmacos.findIndex(f => f.id === parseInt(fid));
      if (idx >= 0) CatState.farmacos[idx] = saved;
    } else {
      saved = await api('/farmacos/catalogo', 'POST', body);
      CatState.farmacos.push(saved);
      if (!CatState.clases.includes(saved.clase)) {
        CatState.clases.push(saved.clase);
        CatState.clases.sort();
        const sel = document.getElementById('farm-cat-clase');
        const dl  = document.getElementById('nf-clase-list');
        if (sel) sel.innerHTML = '<option value="">Todas las clases</option>' + CatState.clases.map(c=>`<option value="${c}">${c}</option>`).join('');
        if (dl)  dl.innerHTML  = CatState.clases.map(c=>`<option value="${c}">`).join('');
      }
    }
    closeOverlay('overlayNuevoFarmaco');
    renderCatStats();
    renderCatalogoAdmin();
    toast(fid ? 'Fármaco actualizado ✓' : 'Fármaco agregado al catálogo ✓');
  } catch(e) { /* toast shown by api() */ }
}

async function deleteFarmacoCatalogo(fid, nombre, btn) {
  if (!confirm(`¿Desactivar "${nombre}" del catálogo?`)) return;
  await api(`/farmacos/catalogo/${fid}`, 'DELETE');
  CatState.farmacos = CatState.farmacos.filter(f => f.id !== fid);
  renderCatStats();
  renderCatalogoAdmin();
  toast('Fármaco desactivado');
}

// ════════════════════════════════════════════════════════════
// INFORME CLÍNICO IMPRIMIBLE
// ════════════════════════════════════════════════════════════

// ── BUSCADOR GLOBAL DE FÁRMACOS ────────────────────────────────
function onFarmBusquedaGlobal() {
  const q   = document.getElementById('farm-busqueda-global')?.value.trim().toLowerCase();
  const res = document.getElementById('farm-busqueda-resultados');
  if (!res) return;
  if (!q || q.length < 2) { res.style.display = 'none'; return; }

  const matches = FarmState.catalogo.filter(f =>
    f.nombre?.toLowerCase().includes(q) ||
    (f.nombres_comer || []).some(n => n.toLowerCase().includes(q)) ||
    f.clase?.toLowerCase().includes(q)
  ).slice(0, 12);

  if (!matches.length) {
    res.style.display = 'block';
    res.innerHTML = `<div style="padding:12px;color:var(--muted);font-size:13px">Sin resultados para "${q}"</div>`;
    return;
  }

  const semColor = { verde:'#16a34a', amarillo:'#d97706', rojo:'#dc2626', gris:'#6b7280' };
  res.style.display = 'block';
  res.innerHTML = matches.map(f => {
    const sem = f.semaforo_actual || 'gris';
    const comercial = f.nombres_comer?.length ? `<span style="color:var(--muted);font-size:11px"> · ${f.nombres_comer.join(', ')}</span>` : '';
    return `<div onclick="farmSeleccionarDesdeSearch(${f.id})"
      style="padding:10px 14px;cursor:pointer;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:10px;transition:background .1s"
      onmouseover="this.style.background='#eff6ff'" onmouseout="this.style.background=''">
      <span style="width:10px;height:10px;border-radius:50%;background:${semColor[sem]||'#999'};flex-shrink:0"></span>
      <div>
        <div style="font-size:13px;font-weight:600">${f.nombre}${comercial}</div>
        <div style="font-size:11px;color:var(--muted)">${f.clase} · ${SEMAFORO_LABEL[sem]||sem}</div>
      </div>
      <button onclick="event.stopPropagation();farmAgregarDirecto(${f.id})" class="btn btn-primary btn-xs" style="margin-left:auto">+ Agregar</button>
    </div>`;
  }).join('');
}

function farmSeleccionarDesdeSearch(fid) {
  document.getElementById('farm-busqueda-global').value = '';
  document.getElementById('farm-busqueda-resultados').style.display = 'none';
  openAddFarmacoModal(fid);
}

function farmAgregarDirecto(fid) {
  document.getElementById('farm-busqueda-global').value = '';
  document.getElementById('farm-busqueda-resultados').style.display = 'none';
  openAddFarmacoModal(fid);
}

// cerrar resultados al click fuera
document.addEventListener('click', e => {
  if (!e.target.closest('#farm-busqueda-global') && !e.target.closest('#farm-busqueda-resultados')) {
    const r = document.getElementById('farm-busqueda-resultados');
    if (r) r.style.display = 'none';
  }
});

// ── IMPRIMIR RECETA ────────────────────────────────────────────
function imprimirReceta() {
  const v   = State.currentVisita;
  const pac = State.currentPaciente;
  if (!v || !pac) { toast('No hay visita activa', 'err'); return; }

  const farmacos = FarmState.visita_farmacos || [];
  const now = new Date().toLocaleDateString('es-DO', { day:'2-digit', month:'long', year:'numeric' });
  const edad = calcAge(pac.fecha_nacimiento);

  const filasFarm = farmacos.length
    ? farmacos.map((f, i) => `
        <tr>
          <td style="padding:8px 6px;font-size:13px;font-weight:600;border-bottom:1px solid #eee">${i+1}. ${f.nombre}</td>
          <td style="padding:8px 6px;font-size:13px;border-bottom:1px solid #eee">${f.dosis || '—'}</td>
          <td style="padding:8px 6px;font-size:13px;border-bottom:1px solid #eee">${f.frecuencia || '—'}</td>
          <td style="padding:8px 6px;font-size:13px;border-bottom:1px solid #eee">${f.notas || ''}</td>
        </tr>`).join('')
    : `<tr><td colspan="4" style="padding:16px;color:#999;font-size:13px">Sin fármacos registrados</td></tr>`;

  const instNombre = v.institucion==='UM' ? INST.um : v.institucion==='MAT' ? INST.mat : INST.priv;

  const html = `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8">
  <title>Receta — ${pac.nombre_completo || pac.nombre}</title>
  <style>
    @page { size: A4; margin: 20mm 18mm; }
    *{box-sizing:border-box;margin:0;padding:0}
    body { font-family: Arial, Helvetica, sans-serif; color: #111; font-size: 13px; line-height:1.5; }
    .header { display:flex; justify-content:space-between; align-items:center; border-bottom:3px solid #1a2a4a; padding-bottom:14px; margin-bottom:18px; }
    .logo-wrap { display:flex; align-items:center; gap:12px; }
    .logo-wrap img { height:60px; width:auto; }
    .logo-text h1 { font-size:16px; color:#1a2a4a; font-weight:700; }
    .logo-text p  { font-size:11px; color:#555; margin:1px 0; }
    .logo-text .inst { font-size:10px; color:#b8860b; font-weight:700; margin-top:3px; text-transform:uppercase; letter-spacing:.5px; }
    .fecha-area { text-align:right; font-size:12px; color:#555; line-height:1.7; }
    .fecha-area strong { font-size:13px; color:#1a2a4a; display:block; }
    .paciente-box { background:#f0f7ff; border-left:4px solid #2563eb; border-radius:0 8px 8px 0; padding:12px 16px; margin-bottom:18px; }
    .paciente-box h3 { margin:0 0 4px; font-size:15px; color:#1e40af; font-weight:700; }
    .paciente-box p  { margin:2px 0; font-size:12px; color:#374151; }
    table { width:100%; border-collapse:collapse; margin-bottom:20px; }
    thead th { background:#1a2a4a; color:#fff; padding:8px 10px; font-size:11px; text-align:left; font-weight:600; }
    tbody tr:nth-child(even){background:#f9fafb}
    tbody td { padding:8px 10px; border-bottom:1px solid #e5e7eb; vertical-align:top; font-size:12px; }
    .firma { margin-top:44px; display:flex; justify-content:flex-end; }
    .firma-box { text-align:center; width:240px; }
    .firma-linea { border-top:1px solid #555; padding-top:8px; margin-bottom:4px; }
    .firma-box p { font-size:12px; color:#333; margin:1px 0; }
    .firma-box .gold { color:#b8860b; font-weight:700; font-size:13px; }
    .advertencia { font-size:9px; color:#aaa; margin-top:24px; border-top:1px dashed #ddd; padding-top:8px; text-align:center; }
    @media print { body{-webkit-print-color-adjust:exact;print-color-adjust:exact} }
  </style></head><body>
  <div class="header">
    <div class="logo-wrap">
      <img src="${LOGO_B64}" alt="Logo">
      <div class="logo-text">
        <h1>${INST.nombre}</h1>
        <p>${INST.titulo}</p>
        <p>${INST.registro}</p>
        <p class="inst">${instNombre}</p>
      </div>
    </div>
    <div class="fecha-area">
      <strong>PRESCRIPCIÓN NUTRICIONAL</strong>
      Fecha: ${now}<br>Visita #${v.numero_visita || '?'}<br>Tel: ${INST.tel}<br>${INST.email}
    </div>
  </div>
  <div class="paciente-box">
    <h3>${pac.nombre_completo || pac.nombre + ' ' + pac.apellidos}</h3>
    <p>Cédula: ${pac.cedula || '—'} &nbsp;·&nbsp; Edad: ${edad} años &nbsp;·&nbsp; Sexo: ${pac.sexo === 'F' ? 'Femenino' : 'Masculino'}</p>
    <p>Institución: ${v.institucion || '—'} &nbsp;·&nbsp; Motivo: ${v.motivo_consulta || '—'}</p>
  </div>
  <table>
    <thead><tr>
      <th style="width:35%">Medicamento</th>
      <th style="width:20%">Dosis</th>
      <th style="width:20%">Frecuencia</th>
      <th style="width:25%">Indicaciones</th>
    </tr></thead>
    <tbody>${filasFarm}</tbody>
  </table>
  ${v.notas_clinicas ? `<p style="font-size:12px;margin-bottom:16px"><strong>Notas clínicas:</strong> ${v.notas_clinicas}</p>` : ''}
  <div class="firma">
    <div class="firma-box">
      <div class="firma-linea"></div>
      <p class="gold">${INST.nombre}</p>
      <p>${INST.titulo}</p>
      <p>${INST.registro}</p>
    </div>
  </div>
  <div class="advertencia">Este documento es una prescripción nutricional emitida por un profesional certificado. No sustituye la consulta médica.</div>
  <script>window.onload = () => { window.print(); }<\/script>
  </body></html>`;

  const win = window.open('', '_blank', 'width=800,height=900');
  win.document.write(html);
  win.document.close();
}

// ── IMPRIMIR DIETA ─────────────────────────────────────────────
function imprimirDieta() {
  const v   = State.currentVisita;
  const pac = State.currentPaciente;
  if (!v || !pac) { toast('No hay visita activa', 'err'); return; }

  const r   = v.requerimientos || {};
  const plan = v.plan_nutricional || {};
  const r24 = v.registro_24h || {};
  const now = new Date().toLocaleDateString('es-DO', { day:'2-digit', month:'long', year:'numeric' });
  const edad = calcAge(pac.fecha_nacimiento);

  const distribucion = (kcal) => {
    if (!kcal) return '';
    const des = Math.round(kcal * 0.25);
    const alm = Math.round(kcal * 0.35);
    const cen = Math.round(kcal * 0.25);
    const col = Math.round(kcal * 0.15);
    return `<table style="width:100%;border-collapse:collapse;margin-bottom:16px">
      <thead><tr>
        <th style="background:#2563eb;color:#fff;padding:7px 10px;font-size:12px;text-align:left">Tiempo de comida</th>
        <th style="background:#2563eb;color:#fff;padding:7px 10px;font-size:12px;text-align:center">% kcal</th>
        <th style="background:#2563eb;color:#fff;padding:7px 10px;font-size:12px;text-align:center">kcal</th>
        <th style="background:#2563eb;color:#fff;padding:7px 10px;font-size:12px">Orientación</th>
      </tr></thead>
      <tbody>
        <tr style="border-bottom:1px solid #eee"><td style="padding:7px 10px">🌅 Desayuno</td><td style="padding:7px 10px;text-align:center">25%</td><td style="padding:7px 10px;text-align:center;font-weight:700">${des}</td><td style="padding:7px 10px;font-size:12px;color:#555">${r24.desayuno || 'Según plan indicado'}</td></tr>
        <tr style="border-bottom:1px solid #eee;background:#f9fafb"><td style="padding:7px 10px">🍎 Media mañana</td><td style="padding:7px 10px;text-align:center">10%</td><td style="padding:7px 10px;text-align:center;font-weight:700">${col}</td><td style="padding:7px 10px;font-size:12px;color:#555">Colación saludable</td></tr>
        <tr style="border-bottom:1px solid #eee"><td style="padding:7px 10px">🍽 Almuerzo</td><td style="padding:7px 10px;text-align:center">35%</td><td style="padding:7px 10px;text-align:center;font-weight:700">${alm}</td><td style="padding:7px 10px;font-size:12px;color:#555">${r24.almuerzo || 'Plato principal balanceado'}</td></tr>
        <tr style="border-bottom:1px solid #eee;background:#f9fafb"><td style="padding:7px 10px">☕ Merienda</td><td style="padding:7px 10px;text-align:center">5%</td><td style="padding:7px 10px;text-align:center;font-weight:700">${Math.round(kcal*0.05)}</td><td style="padding:7px 10px;font-size:12px;color:#555">Colación ligera</td></tr>
        <tr><td style="padding:7px 10px">🌙 Cena</td><td style="padding:7px 10px;text-align:center">25%</td><td style="padding:7px 10px;text-align:center;font-weight:700">${cen}</td><td style="padding:7px 10px;font-size:12px;color:#555">${r24.cena || 'Cena ligera'}</td></tr>
      </tbody>
    </table>`;
  };

  const kcalPres = r.kcal_objetivo || plan.kcal_prescritas || null;
  const protPres = r.proteina_objetivo_g || plan.proteina_prescrita || null;
  const aguaL    = r.agua_total_l || plan.agua_recomendada || null;

  const html = `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8">
  <title>Plan dietético — ${pac.nombre_completo || pac.nombre}</title>
  <style>
    @page { size: A4; margin: 18mm; }
    body { font-family: Arial, sans-serif; color: #111; font-size: 13px; }
    .header { display:flex; justify-content:space-between; align-items:flex-start; border-bottom:2px solid #16a34a; padding-bottom:12px; margin-bottom:18px; }
    .logo-area h1 { font-size:22px; color:#16a34a; font-weight:700; margin:0; }
    .logo-area p  { font-size:12px; color:#555; margin:2px 0 0; }
    .fecha-area   { text-align:right; font-size:12px; color:#555; }
    .pac-box { background:#f0fdf4; border:1px solid #bbf7d0; border-radius:8px; padding:12px 16px; margin-bottom:16px; }
    .pac-box h3 { margin:0 0 4px; font-size:15px; color:#15803d; }
    .metas { display:flex; gap:12px; margin-bottom:16px; flex-wrap:wrap; }
    .meta-card { flex:1; min-width:120px; background:#f0fdf4; border:1px solid #bbf7d0; border-radius:8px; padding:10px 14px; text-align:center; }
    .meta-card .val { font-size:22px; font-weight:700; color:#15803d; font-family:monospace; }
    .meta-card .lbl { font-size:11px; color:#555; margin-top:2px; }
    .sec-title { font-size:13px; font-weight:700; color:#15803d; border-bottom:1px solid #bbf7d0; padding-bottom:4px; margin:16px 0 10px; text-transform:uppercase; letter-spacing:.05em; }
    .recomendaciones { background:#f9fafb; border:1px solid #e5e7eb; border-radius:8px; padding:12px 16px; font-size:12px; line-height:1.7; white-space:pre-line; }
    .firma { margin-top:36px; border-top:1px solid #ccc; padding-top:10px; text-align:center; font-size:12px; color:#555; }
    .prox { background:#fffbeb; border:1px solid #fde68a; border-radius:6px; padding:8px 14px; font-size:12px; margin-top:16px; }
  </style></head><body>
  <div class="header">
    <div class="logo-wrap">
      <img src="${LOGO_B64}" alt="Logo" style="height:56px;width:auto">
      <div class="logo-text">
        <h1 style="font-size:16px;color:#15803d;font-weight:700">${INST.nombre}</h1>
        <p style="font-size:11px;color:#555">${INST.titulo}</p>
        <p style="font-size:10px;color:#b8860b;font-weight:700;text-transform:uppercase">${v.institucion==='UM'?INST.um:v.institucion==='MAT'?INST.mat:INST.priv}</p>
      </div>
    </div>
    <div class="fecha-area">
      <strong style="color:#15803d;display:block">PLAN DIETÉTICO</strong>
      Fecha: ${now}<br>Visita #${v.numero_visita || '?'}<br>${INST.tel}<br>${INST.email}
    </div>
  </div>

  <div class="pac-box">
    <h3>${pac.nombre_completo || pac.nombre + ' ' + pac.apellidos}</h3>
    <p>Edad: ${edad} años &nbsp;·&nbsp; Sexo: ${pac.sexo === 'F' ? 'Femenino' : 'Masculino'} &nbsp;·&nbsp; Cédula: ${pac.cedula || '—'}</p>
    <p>Objetivo: <strong>${plan.objetivo_principal || r.condicion_proteica || '—'}</strong></p>
  </div>

  <div class="sec-title">Metas nutricionales prescritas</div>
  <div class="metas">
    ${kcalPres ? `<div class="meta-card"><div class="val">${kcalPres}</div><div class="lbl">kcal / día</div></div>` : ''}
    ${protPres ? `<div class="meta-card"><div class="val">${protPres}g</div><div class="lbl">Proteína / día</div></div>` : ''}
    ${r.cho_objetivo_g ? `<div class="meta-card"><div class="val">${r.cho_objetivo_g}g</div><div class="lbl">CHO / día</div></div>` : ''}
    ${r.grasa_objetivo_g ? `<div class="meta-card"><div class="val">${r.grasa_objetivo_g}g</div><div class="lbl">Grasa / día</div></div>` : ''}
    ${aguaL ? `<div class="meta-card"><div class="val">${parseFloat(aguaL).toFixed(1)}L</div><div class="lbl">Agua / día</div></div>` : ''}
  </div>

  <div class="sec-title">Distribución de comidas</div>
  ${distribucion(kcalPres)}

  ${plan.indicaciones || plan.suplementacion ? `
  <div class="sec-title">Indicaciones y suplementación</div>
  <div class="recomendaciones">${[plan.indicaciones, plan.suplementacion ? '💊 Suplementación: ' + plan.suplementacion : ''].filter(Boolean).join('\n\n')}</div>` : ''}

  ${plan.proxima_evaluacion || v.proxima_cita ? `
  <div class="prox">📅 Próxima evaluación: <strong>${plan.proxima_evaluacion || v.proxima_cita || '—'}</strong></div>` : ''}

  <div class="firma" style="margin-top:36px;border-top:1px solid #ccc;padding-top:10px;display:flex;justify-content:flex-end">
    <div style="text-align:center;width:240px">
      <p style="font-size:12px;color:#333"><strong>${INST.nombre}</strong></p>
      <p style="font-size:12px;color:#555">${INST.titulo}</p>
      <p style="font-size:11px;color:#888">${INST.registro} &nbsp;·&nbsp; ${INST.tel}</p>
    </div>
  </div>
  <script>window.onload = () => { window.print(); }<\/script>
  </body></html>`;

  const win = window.open('', '_blank', 'width=820,height=950');
  win.document.write(html);
  win.document.close();
}

function generarInforme() {
  const v   = State.currentVisita;
  const pac = State.currentPaciente;
  if (!v || !pac) { toast('No hay visita activa'); return; }

  const cc  = v.composicion_corporal || {};
  const an  = v.analiticas           || {};
  const r   = v.requerimientos       || {};
  const now = new Date().toLocaleDateString('es-DO', {day:'2-digit', month:'long', year:'numeric'});
  const fechaVisita = fmtDate(v.fecha);
  const edad = calcAge(pac.fecha_nacimiento);

  // ── helpers de formato ──────────────────────────────────────
  const row = (label, val, unit='') =>
    val !== null && val !== undefined && val !== '' && val !== '—'
      ? `<tr><td class="rl">${label}</td><td class="rv">${val}${unit ? ' <span class="ru">'+unit+'</span>' : ''}</td></tr>`
      : '';

  const seccion = (titulo, contenido) => `
    <div class="sec">
      <div class="sec-title">${titulo}</div>
      ${contenido}
    </div>`;

  const tabla = (filas) => `<table class="data-tbl">${filas}</table>`;

  const semLabel = {'verde':'✔ Permitido','amarillo':'⚠ Precaución','rojo':'✘ Contraindicado'};

  // ── Composición corporal ───────────────────────────────────
  const imc = cc.peso && cc.talla ? (cc.peso / ((cc.talla/100)**2)).toFixed(1) : null;
  const imcLabel = imc ? (imc<18.5?'Bajo peso':imc<25?'Normal':imc<30?'Sobrepeso':imc<35?'Obesidad I':imc<40?'Obesidad II':'Obesidad III') : '';

  const ccHTML = tabla([
    row('Peso',           cc.peso,   'kg'),
    row('Talla',          cc.talla,  'cm'),
    row('IMC',            imc ? `${imc} <em style="font-weight:400;color:#555">(${imcLabel})</em>` : null, 'kg/m²'),
    row('Cintura',        cc.cintura,        'cm'),
    row('Cadera',         cc.cadera,         'cm'),
    row('ICC',            cc.cintura_cadera  ? parseFloat(cc.cintura_cadera).toFixed(2) : null),
    row('Cintura/Talla',  cc.cintura_talla   ? parseFloat(cc.cintura_talla).toFixed(3)  : null),
    row('Masa muscular',  cc.kg_masa_muscular, 'kg'),
    row('Masa grasa',     cc.kg_grasa,         'kg'),
    row('% Grasa',        cc.pct_grasa ? parseFloat(cc.pct_grasa).toFixed(1) : null, '%'),
    row('Agua corporal',  cc.agua_corporal,    'kg'),
    row('Masa ósea',      cc.masa_osea,        'kg'),
    row('Fuerza prensil', cc.handgrip_der_mejor ? `${cc.handgrip_der_mejor} kg (${cc.handgrip_interpretacion||'—'})` : null),
    row('Velocidad marcha', cc.velocidad_marcha, 'm/s'),
    row('Sit-to-Stand',   cc.sit_to_stand_reps ? `${cc.sit_to_stand_reps} rep (${cc.sit_to_stand_interp||'—'})` : null),
    row('SARC-F',         cc.sarcf_total !== null && cc.sarcf_total !== undefined ? `${cc.sarcf_total}/10 — ${cc.sarcf_interpretacion||''}` : null),
    row('Equipo',         cc.equipo),
  ].filter(Boolean).join(''));

  // ── Analíticas ─────────────────────────────────────────────
  const anHTML = tabla([
    row('Glucemia ayunas', an.glucemia_ayunas, 'mg/dL'),
    row('HbA1c',           an.hba1c,           '%'),
    row('Insulina basal',  an.insulina_ayunas, 'µU/mL'),
    row('HOMA-IR',         an.homa_ir ? `${parseFloat(an.homa_ir).toFixed(2)} (${an.homa_interpretacion||''})` : null),
    row('Colesterol total',an.colesterol_total,'mg/dL'),
    row('LDL',             an.ldl,             'mg/dL'),
    row('HDL',             an.hdl,             'mg/dL'),
    row('No-HDL',          an.no_hdl,          'mg/dL'),
    row('Triglicéridos',   an.trigliceridos,   'mg/dL'),
    row('ApoB',            an.apob,            'mg/dL'),
    row('Índice aterogénico', an.indice_aterogenico ? parseFloat(an.indice_aterogenico).toFixed(2) : null),
    row('Creatinina',      an.creatinina,      'mg/dL'),
    row('BUN',             an.bun,             'mg/dL'),
    row('eGFR (CKD-EPI)',  an.egfr ? `${parseFloat(an.egfr).toFixed(0)} — ${an.egfr_estadio||''}` : null, 'mL/min/1.73m²'),
    row('Ácido úrico',     an.acido_urico,     'mg/dL'),
    row('ALT (TGP)',       an.alt,             'U/L'),
    row('AST (TGO)',       an.ast,             'U/L'),
    row('Hemoglobina',     an.hemoglobina,     'g/dL'),
    row('Ferritina',       an.ferritina,       'ng/mL'),
    row('Vitamina D 25-OH',an.vitamina_d,      'ng/mL'),
    row('Vitamina B12',    an.vitamina_b12,    'pg/mL'),
    row('TSH',             an.tsh,             'mIU/L'),
    row('Albúmina',        an.albumina,        'g/dL'),
    row('PCR',             an.pcr,             'mg/L'),
    row('Proteinuria',     an.proteinuria,     'mg/24h'),
  ].filter(Boolean).join(''));

  // ── Requerimientos ─────────────────────────────────────────
  const condMap = {
    estandar:'Estándar / adulto sano', obesidad:'Obesidad / pérdida de peso',
    sarc:'Sarcopenia / adulto mayor', erc_cons:'ERC conservadora',
    hd:'Hemodiálisis', dp:'Diálisis peritoneal',
    eii_activa:'EII brote activo', eii_remision:'EII en remisión',
    bariatrica:'Post-bariátrica', bariatrica_temprana:'Post-bariátrica temprana',
    embarazo:'Embarazo',
  };

  const formulaMap = {mifflin:'Mifflin-St Jeor', harris:'Harris-Benedict', oms:'OMS/FAO', simplif:'Simplificada kcal/kg'};

  const reqqHTML = tabla([
    row('Peso de referencia', r.peso_usado==='seco' ? `${r.peso_usado_kg} kg (seco/HD)` : r.peso_usado==='ideal' ? `${r.peso_ideal_hamwi} kg (ideal)` : r.peso_actual ? `${r.peso_actual} kg (actual)` : null),
    row('Fórmula TMB',   formulaMap[r.formula_tmb] || r.formula_tmb),
    row('TMB calculado', r.tmb_calculado, 'kcal'),
    row('GET (GET×FA×FE)', r.get_calculado, 'kcal/día'),
    row('kcal prescritas', r.kcal_objetivo, 'kcal/día'),
    row('Déficit calórico', r.deficit_kcal && r.deficit_kcal>0 ? `-${r.deficit_kcal}` : null, 'kcal/día'),
    row('Condición proteica', condMap[r.metodo_proteina] || r.metodo_proteina),
    row('Proteína',      r.proteina_g_dia, 'g/día'),
    row('Proteína g/kg', r.proteina_g_kg,  'g/kg'),
    row('Carbohidratos', r.cho_pct        ? `${Math.round((r.kcal_objetivo||0)*r.cho_pct/100/4)} g (${r.cho_pct}%)` : null),
    row('Grasas',        r.grasa_pct      ? `${Math.round((r.kcal_objetivo||0)*r.grasa_pct/100/9)} g (${r.grasa_pct}%)` : null),
    row('Fibra',         r.fibra_g_dia,   'g/día'),
    row('Agua',          r.agua_ml_dia    ? `${Math.round(r.agua_ml_dia)} mL (${(r.agua_ml_dia/1000).toFixed(1)} L)` : null),
    r.sodio_mg   ? row('Sodio (máx)',    r.sodio_mg,   'mg/día') : '',
    r.potasio_mg ? row('Potasio (máx)',  r.potasio_mg, 'mg/día') : '',
    r.fosforo_mg ? row('Fósforo (máx)',  r.fosforo_mg, 'mg/día') : '',
  ].filter(Boolean).join(''));

  // ── Metas clínicas ─────────────────────────────────────────
  const metasHTML = tabla([
    row('Peso objetivo',   r.meta_peso_kg,    'kg'),
    row('% pérdida peso',  r.meta_peso_kg && r.peso_actual ? `${((r.peso_actual - r.meta_peso_kg)/r.peso_actual*100).toFixed(1)}%` : null),
    row('Cintura objetivo', r.meta_cintura_cm, 'cm'),
    row('Meta HbA1c',      r.meta_hba1c ? `≤${r.meta_hba1c}%` : null),
    row('Meta glucemia ayunas', r.meta_glucemia_ayunas ? `${r.meta_glucemia_ayunas} mg/dL` : null),
    row('Meta LDL',        r.meta_ldl    ? `≤${r.meta_ldl} mg/dL` : null),
    row('Meta TA',         r.meta_ta_sistolica ? `≤${r.meta_ta_sistolica}/${r.meta_ta_diastolica||80} mmHg` : null),
    row('Meta albuminuria', r.meta_proteina_orina ? `≤${r.meta_proteina_orina} mg/g` : null),
  ].filter(Boolean).join(''));

  // ── Fármacos activos ───────────────────────────────────────
  const farmacos = v.farmacoterapia || [];
  const farmHTML = farmacos.length
    ? `<table class="data-tbl">
        <tr><th>Medicamento</th><th>Clase</th><th>Dosis / Frecuencia</th><th>Seg. renal</th></tr>
        ${farmacos.map(f => `
          <tr>
            <td>${f.nombre_comercial||f.nombre_generico||f.nombre||'—'}</td>
            <td style="color:#555;font-size:11px">${f.clase||''}</td>
            <td>${[f.dosis,f.frecuencia].filter(Boolean).join(' ')}</td>
            <td style="font-size:11px">${f.semaforo_visita ? semLabel[f.semaforo_visita]||f.semaforo_visita : '—'}</td>
          </tr>`).join('')}
      </table>`
    : '<p style="color:#888;font-size:12px;margin:4px 0">Sin fármacos registrados en esta visita.</p>';

  // ── Plan nutricional y notas ───────────────────────────────
  const pn = v.plan_nutricional || {};
  const planTxt = pn.texto_libre || pn.recomendaciones || pn.plan || '';
  const planHTML = planTxt
    ? `<div class="texto-libre">${planTxt.replace(/\n/g,'<br>')}</div>` : '';
  const notasTxt = v.notas_clinicas || v.plan_general || '';
  const notasHTML = notasTxt
    ? `<div class="texto-libre">${notasTxt.replace(/\n/g,'<br>')}</div>` : '';
  const suplHTML = (r.suplementacion||pn.suplementacion)
    ? `<div class="texto-libre">${(r.suplementacion||pn.suplementacion||'').replace(/\n/g,'<br>')}</div>` : '';

  // ── Diagnóstico nutricional ────────────────────────────────
  const dn  = v.diagnostico_nutricional || {};
  const dnHTML = dn.estado_global ? `
    <div style="background:#f0f4ff;border-left:4px solid #1a56db;border-radius:0 8px 8px 0;padding:10px 14px;margin-bottom:10px;font-size:12px;font-weight:600;color:#1a1a1a">
      ${dn.estado_global}
    </div>
    ${tabla([
      row('GLIM — Fenotípico',  dn.glim_fenotipico),
      row('GLIM — Etiológico',  dn.glim_etiologico),
      row('GLIM — Diagnóstico', dn.glim_diagnostico),
      row('Sarcopenia (EWGSOP2)', dn.sarcopenia_dx),
      row('Riesgo cardiometabólico', dn.riesgo_cardiometabolico),
      row('Obesidad clínica',   dn.obesidad_clinica_dx),
    ].filter(Boolean).join(''))}` : '<p style="color:#888;font-size:11px">Sin diagnóstico registrado.</p>';

  // ── Construir HTML del reporte ─────────────────────────────
  const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Informe Nutricional — ${pac.nombre_completo} — ${fechaVisita}</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Inter', Arial, sans-serif;
    font-size: 12px;
    color: #1a1a1a;
    background: #f5f5f5;
    padding: 20px;
  }

  .page {
    background: #fff;
    max-width: 780px;
    margin: 0 auto;
    padding: 36px 44px 50px;
    box-shadow: 0 2px 16px rgba(0,0,0,.12);
  }

  /* ── Header ── */
  .hdr { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; padding-bottom: 16px; border-bottom: 2.5px solid #1a56db; }
  .hdr-logo { font-size: 11px; color: #888; text-align: right; }
  .clinic-name { font-size: 17px; font-weight: 700; color: #1a56db; }
  .clinic-sub  { font-size: 11px; color: #555; margin-top: 2px; }
  .report-label { font-size: 11px; font-weight: 600; color: #fff; background: #1a56db; padding: 3px 10px; border-radius: 20px; margin-top: 4px; display: inline-block; }

  /* ── Paciente bloque ── */
  .pac-block { background: #f0f4ff; border-left: 4px solid #1a56db; border-radius: 0 8px 8px 0; padding: 12px 16px; margin-bottom: 18px; display: grid; grid-template-columns: 1fr 1fr; gap: 6px 24px; }
  .pac-name  { grid-column: 1/-1; font-size: 15px; font-weight: 700; color: #1a1a1a; margin-bottom: 4px; }
  .pac-item  { font-size: 11px; color: #333; }
  .pac-item strong { color: #1a56db; }

  /* ── Secciones ── */
  .sec { margin-bottom: 18px; page-break-inside: avoid; }
  .sec-title { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; color: #1a56db; border-bottom: 1px solid #c7d7f7; padding-bottom: 4px; margin-bottom: 8px; }

  /* ── Tablas de datos ── */
  .data-tbl { width: 100%; border-collapse: collapse; }
  .data-tbl th { font-size: 10px; font-weight: 600; color: #555; text-transform: uppercase; letter-spacing: .04em; border-bottom: 1px solid #e5e7eb; padding: 4px 8px; text-align: left; }
  .data-tbl td { padding: 3.5px 8px; border-bottom: 1px solid #f0f0f0; vertical-align: top; }
  .data-tbl tr:last-child td { border-bottom: none; }
  .rl { color: #444; width: 46%; font-weight: 400; }
  .rv { color: #111; font-weight: 600; }
  .ru { font-weight: 400; color: #666; font-size: 10px; }

  /* ── Grid 2 cols ── */
  .g2 { display: grid; grid-template-columns: 1fr 1fr; gap: 0 24px; }

  /* ── Texto libre ── */
  .texto-libre { background: #f8f9fb; border-left: 3px solid #c7d7f7; border-radius: 0 6px 6px 0; padding: 8px 12px; font-size: 11.5px; color: #222; line-height: 1.6; }

  /* ── Firma ── */
  .firma { margin-top: 40px; display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
  .firma-box { border-top: 1.5px solid #333; padding-top: 6px; font-size: 11px; color: #333; }
  .firma-box .fn { font-weight: 700; font-size: 12px; color: #1a1a1a; }

  /* ── Footer ── */
  .footer { margin-top: 24px; border-top: 1px solid #e5e7eb; padding-top: 8px; font-size: 10px; color: #888; display: flex; justify-content: space-between; }

  /* ── Badges ── */
  .badge { display: inline-block; padding: 1px 7px; border-radius: 10px; font-size: 10px; font-weight: 600; }
  .badge-um  { background: #dbeafe; color: #1e40af; }
  .badge-mat { background: #fce7f3; color: #9d174d; }
  .badge-priv { background: #ecfdf5; color: #065f46; }

  /* ── Print ── */
  @media print {
    body { background: #fff; padding: 0; }
    .page { box-shadow: none; max-width: 100%; padding: 20px 28px 30px; }
    .no-print { display: none !important; }
    .sec { page-break-inside: avoid; }
  }
</style>
</head>
<body>
<div class="page">

  <!-- Botones solo en pantalla -->
  <div class="no-print" style="display:flex;gap:10px;margin-bottom:16px;justify-content:flex-end">
    <button onclick="window.print()" style="background:#1a56db;color:#fff;border:none;padding:8px 20px;border-radius:6px;font-size:13px;cursor:pointer;font-weight:600">🖨 Imprimir / Guardar PDF</button>
    <button onclick="window.close()" style="background:#f3f4f6;color:#333;border:1px solid #d1d5db;padding:8px 16px;border-radius:6px;font-size:13px;cursor:pointer">✕ Cerrar</button>
  </div>

  <!-- ─── Encabezado ──────────────────────────────────────── -->
  <div class="hdr">
    <div style="display:flex;align-items:center;gap:14px">
      <img src="${LOGO_B64}" alt="Logo" style="height:64px;width:auto">
      <div>
        <div class="clinic-name">${INST.nombre}</div>
        <div class="clinic-sub">${INST.titulo}</div>
        <div class="clinic-sub" style="color:#b8860b;font-weight:600">${v.institucion==='UM'?INST.um:v.institucion==='MAT'?INST.mat:INST.priv}</div>
        <div class="report-label" style="margin-top:6px">📋 Informe Nutricional</div>
      </div>
    </div>
    <div class="hdr-logo">
      <div style="font-size:10px;color:#aaa;margin-top:8px;text-align:right">Fecha emisión:<br><strong style="color:#555">${now}</strong><br>${INST.tel}<br>${INST.email}</div>
    </div>
  </div>

  <!-- ─── Datos del paciente ──────────────────────────────── -->
  <div class="pac-block">
    <div class="pac-name">${pac.nombre_completo}</div>
    <div class="pac-item"><strong>Cédula:</strong> ${pac.cedula || '—'}</div>
    <div class="pac-item"><strong>Sexo:</strong> ${pac.sexo==='F'?'Femenino':'Masculino'}</div>
    <div class="pac-item"><strong>Fecha de nacimiento:</strong> ${fmtDate(pac.fecha_nacimiento)} (${edad} años)</div>
    <div class="pac-item"><strong>Institución:</strong> ${v.institucion==='UM'?'Unión Médica del Norte':v.institucion==='MAT'?'Centro Materno':'Privada'}</div>
    <div class="pac-item"><strong>Fecha de visita:</strong> ${fechaVisita}</div>
    <div class="pac-item"><strong>Visita #:</strong> ${v.numero_visita || '—'}</div>
    ${v.motivo_consulta ? `<div class="pac-item" style="grid-column:1/-1"><strong>Motivo:</strong> ${v.motivo_consulta}</div>` : ''}
    ${pac.diagnosticos ? `<div class="pac-item" style="grid-column:1/-1"><strong>Diagnósticos:</strong> ${pac.diagnosticos}</div>` : ''}
  </div>

  <!-- ─── Grid 2 columnas: CC + Analíticas ────────────────── -->
  <div class="g2">
    <div>
      ${seccion('Composición corporal', ccHTML || '<p style="color:#888;font-size:11px">Sin datos registrados.</p>')}
    </div>
    <div>
      ${seccion('Analíticas', anHTML || '<p style="color:#888;font-size:11px">Sin analíticas registradas.</p>')}
    </div>
  </div>

  <!-- ─── Diagnóstico Nutricional ──────────────────────────── -->
  ${seccion('Diagnóstico nutricional', dnHTML)}

  <!-- ─── Requerimientos ──────────────────────────────────── -->
  ${Object.keys(r).length > 0 ? `
  <div class="g2">
    <div>${seccion('Plan energético y proteico', reqqHTML)}</div>
    <div>${seccion('Metas clínicas', metasHTML || '<p style="color:#888;font-size:11px">Sin metas registradas.</p>')}</div>
  </div>` : ''}

  <!-- ─── Fármacos ────────────────────────────────────────── -->
  ${seccion('Medicamentos activos', farmHTML)}

  <!-- ─── Suplementación ──────────────────────────────────── -->
  ${suplHTML ? seccion('Suplementación indicada', suplHTML) : ''}

  <!-- ─── Plan nutricional ────────────────────────────────── -->
  ${planHTML ? seccion('Plan nutricional', planHTML) : ''}

  <!-- ─── Notas clínicas ──────────────────────────────────── -->
  ${notasHTML ? seccion('Notas / Observaciones', notasHTML) : ''}

  <!-- ─── Próxima cita ─────────────────────────────────────── -->
  <div class="sec">
    <div class="sec-title">Próxima cita</div>
    <table class="data-tbl">
      <tr>
        <td class="rl">Fecha</td>
        <td class="rv" style="min-width:180px">__________________________</td>
        <td class="rl" style="padding-left:24px">Hora</td>
        <td class="rv">______________</td>
      </tr>
      <tr>
        <td class="rl">Indicaciones para próxima visita</td>
        <td class="rv" colspan="3">__________________________________________________</td>
      </tr>
    </table>
  </div>

  <!-- ─── Firma ───────────────────────────────────────────── -->
  <div class="firma">
    <div class="firma-box">
      <div class="fn">${INST.nombre}</div>
      <div>${INST.titulo}</div>
      <div style="color:#888;margin-top:2px">${INST.registro}</div>
    </div>
    <div class="firma-box">
      <div class="fn">Firma del paciente / Recibido por</div>
      <div style="color:#888;margin-top:2px">Fecha: ${now}</div>
    </div>
  </div>

  <!-- ─── Footer ──────────────────────────────────────────── -->
  <div class="footer">
    <span>NutriCare · ${INST.nombre} · ${INST.titulo}</span>
    <span>Generado: ${now} · Visita #${v.numero_visita||'?'} · ${fechaVisita}</span>
  </div>

</div>
</body>
</html>`;

  const win = window.open('', '_blank', 'width=860,height=900,scrollbars=yes');
  win.document.write(html);
  win.document.close();
}

// ── PORTAL PACIENTE — PIN WHATSAPP ────────────────────────────
async function generarPinPaciente(pid, nombre, tieneTelefono) {
  if (!tieneTelefono) {
    toast('Este paciente no tiene teléfono registrado. Agrégalo primero.', 'err');
    return;
  }
  const res = await api(`/pacientes/${pid}/generar_pin`, 'POST', {});
  if (!res) return;

  const pin = res.pin;
  if (res.enviado) {
    toast(`✓ PIN ${pin} enviado por WhatsApp a ${nombre}`, 'ok');
  } else if (res.en_cola) {
    toast(`PIN ${pin} generado — se enviará al recuperar la red 📶`, 'warn');
  } else if (res.sin_telefono) {
    toast(`PIN generado: ${pin} — sin teléfono para enviar`, 'warn');
  }

  // Recargar ficha para actualizar el botón
  openPaciente(pid);
}

// ── CONFIGURACIÓN CALLMEBOT ────────────────────────────────────
async function abrirConfigCallmebot() {
  const status = await api('/config/callmebot') || {};
  const html = `
  <div style="position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:3000;display:flex;align-items:center;justify-content:center" id="callmebot-modal" onclick="if(event.target===this)this.remove()">
    <div style="background:var(--surface);border-radius:16px;padding:28px;width:min(460px,95vw);box-shadow:var(--shadow)" onclick="event.stopPropagation()">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:20px">
        <span style="font-size:28px">📲</span>
        <div>
          <div style="font-weight:700;font-size:16px">WhatsApp · CallMeBot</div>
          <div style="font-size:12px;color:var(--muted)">Configuración para envío de PIN a pacientes</div>
        </div>
      </div>
      <div style="background:${status.configurado?'#f0fdf4':'#fffbeb'};border:1px solid ${status.configurado?'#86efac':'#fcd34d'};border-radius:10px;padding:12px 16px;margin-bottom:18px;font-size:13px">
        ${status.configurado
          ? `✅ <strong>Activo</strong> — CallMeBot configurado. ${status.pendientes_cola>0?`<br>⏳ ${status.pendientes_cola} PIN(s) en cola esperando red.`:''}`
          : `⚠️ <strong>No configurado</strong> — Sigue los pasos abajo para activar.`}
      </div>
      <div style="background:var(--bg2);border-radius:10px;padding:14px 16px;margin-bottom:18px;font-size:12px;line-height:1.9;color:var(--text2)">
        <strong>Registro (una sola vez):</strong><br>
        1. Agrega este contacto en WhatsApp: <strong>+34 644 60 16 15</strong><br>
        2. Envíale exactamente: <code style="background:var(--bg);padding:2px 6px;border-radius:4px">I allow callmebot to send me messages</code><br>
        3. Te responde con tu <strong>API Key</strong> (ej: 1234567)<br>
        4. Ingrésala abajo ↓
      </div>
      <div class="field" style="margin-bottom:12px">
        <label style="font-size:11px;font-weight:700;color:var(--text2);text-transform:uppercase;letter-spacing:.05em">Tu API Key de CallMeBot</label>
        <input id="cb-apikey" placeholder="Ej: 1234567" style="width:100%;padding:10px 14px;border:2px solid var(--border);border-radius:8px;background:var(--bg);color:var(--text);font-size:15px;letter-spacing:2px;outline:none"
               onfocus="this.style.borderColor='var(--accent)'" onblur="this.style.borderColor='var(--border)'">
      </div>
      <div style="font-size:11px;color:var(--muted);margin-bottom:18px">
        El API Key se guarda en memoria mientras el servidor corra. Para que persista entre reinicios,
        agrégalo como variable de entorno: <code>CALLMEBOT_APIKEY=tu_key</code>
      </div>
      <div style="display:flex;gap:10px;justify-content:flex-end">
        <button class="btn btn-ghost" onclick="document.getElementById('callmebot-modal').remove()">Cancelar</button>
        <button class="btn btn-success" onclick="guardarCallmebot()">Guardar y activar</button>
      </div>
    </div>
  </div>`;
  document.body.insertAdjacentHTML('beforeend', html);
}

async function guardarCallmebot() {
  const apikey = document.getElementById('cb-apikey')?.value?.trim();
  if (!apikey) { toast('Ingresa el API Key de CallMeBot', 'err'); return; }
  await api('/config/callmebot', 'POST', { apikey });
  document.getElementById('callmebot-modal')?.remove();
  toast('✓ CallMeBot activado — los PINs se enviarán por WhatsApp');

  // Intentar vaciar cola pendiente
  if (navigator.onLine) fetch(`${API}/portal/flush_queue`, { method:'POST' }).catch(()=>{});
}

// ── INIT ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  loadPacientes();
  document.getElementById('searchQ')?.addEventListener('input', () => loadPacientes());
  document.getElementById('syncBadge').textContent =
    'Última sincronización: ' + new Date().toLocaleDateString('es-DO');
});
