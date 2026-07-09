const CALENDAR_API_KEY = CONFIG.CALENDAR_API_KEY;
const CALENDAR_ID      = CONFIG.CALENDAR_ID;

// Estado del calendario
let fechasOcupadas     = [];
let fechaSeleccionada  = null;
let mesActual          = new Date().getMonth();
let anioActual         = new Date().getFullYear();

const meses = [
  'Enero','Febrero','Marzo','Abril','Mayo','Junio',
  'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'
];
const dias = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];

// ─────────────────────────────────────────────
// Obtener eventos de Google Calendar
// ─────────────────────────────────────────────
async function obtenerEventosCalendar() {
  const hoy = new Date();
  const fin = new Date();
  fin.setMonth(fin.getMonth() + 6);

  const params = new URLSearchParams({
    key:          CALENDAR_API_KEY,
    timeMin:      hoy.toISOString(),
    timeMax:      fin.toISOString(),
    singleEvents: true,
    orderBy:      'startTime',
    maxResults:   100,
  });

  try {
    const response = await fetch(`${CALENDAR_API_URL}?${params}`);

    if (!response.ok) throw new Error(`Error Calendar API: ${response.status}`);

    const data = await response.json();

    fechasOcupadas = data.items
      .map(evento => {
        const fechaInicio = evento.start.date || evento.start.dateTime?.split('T')[0];
        const fechaFin    = evento.end.date   || evento.end.dateTime?.split('T')[0];
        return generarRangoFechas(fechaInicio, fechaFin);
      })
      .flat();

    fechasOcupadas = [...new Set(fechasOcupadas)];
    return fechasOcupadas;

  } catch (error) {
    console.error('Error al obtener eventos:', error);
    return [];
  }
}

// ─────────────────────────────────────────────
// Generar rango de fechas entre inicio y fin
// ─────────────────────────────────────────────
function generarRangoFechas(fechaInicio, fechaFin) {
  if (!fechaInicio) return [];

  const fechas = [];
  const actual = new Date(fechaInicio);
  const fin    = fechaFin ? new Date(fechaFin) : new Date(fechaInicio);

  while (actual < fin) {
    fechas.push(actual.toISOString().split('T')[0]);
    actual.setDate(actual.getDate() + 1);
  }

  if (fechas.length === 0) fechas.push(fechaInicio);

  return fechas;
}

// ─────────────────────────────────────────────
// Renderizar el calendario
// ─────────────────────────────────────────────
function renderCalendario(mes, anio) {
  const contenedor = document.getElementById('calendario');
  if (!contenedor) return;

  contenedor.innerHTML = '';

  const header = document.createElement('div');
  header.classList.add('calendario__header');

  const btnAnterior = document.createElement('button');
  btnAnterior.classList.add('calendario__nav');
  btnAnterior.innerHTML = '&#8592;';
  btnAnterior.setAttribute('aria-label', 'Mes anterior');
  btnAnterior.addEventListener('click', () => {
    if (mes === 0) renderCalendario(11, anio - 1);
    else renderCalendario(mes - 1, anio);
  });

  const titulo = document.createElement('h3');
  titulo.classList.add('calendario__titulo');
  titulo.textContent = `${meses[mes]} ${anio}`;

  const btnSiguiente = document.createElement('button');
  btnSiguiente.classList.add('calendario__nav');
  btnSiguiente.innerHTML = '&#8594;';
  btnSiguiente.setAttribute('aria-label', 'Mes siguiente');
  btnSiguiente.addEventListener('click', () => {
    if (mes === 11) renderCalendario(0, anio + 1);
    else renderCalendario(mes + 1, anio);
  });

  header.appendChild(btnAnterior);
  header.appendChild(titulo);
  header.appendChild(btnSiguiente);

  const gridDias = document.createElement('div');
  gridDias.classList.add('calendario__dias-semana');
  dias.forEach(dia => {
    const span = document.createElement('span');
    span.textContent = dia;
    gridDias.appendChild(span);
  });

  const grid = document.createElement('div');
  grid.classList.add('calendario__grid');

  const primerDia = new Date(anio, mes, 1).getDay();
  const totalDias = new Date(anio, mes + 1, 0).getDate();
  const hoy       = new Date();

  for (let i = 0; i < primerDia; i++) {
    const vacio = document.createElement('div');
    vacio.classList.add('calendario__dia', 'calendario__dia--vacio');
    grid.appendChild(vacio);
  }

  for (let dia = 1; dia <= totalDias; dia++) {
    const fecha    = `${anio}-${String(mes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
    const fechaObj = new Date(anio, mes, dia);
    const esPasado       = fechaObj < new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
    const esOcupado      = fechasOcupadas.includes(fecha);
    const esSeleccionado = fechaSeleccionada === fecha;

    const celda = document.createElement('div');
    celda.classList.add('calendario__dia');
    celda.textContent = dia;

    if (esPasado) {
      celda.classList.add('calendario__dia--pasado');
    } else if (esOcupado) {
      celda.classList.add('calendario__dia--ocupado');
      celda.setAttribute('title', 'Fecha no disponible');
    } else if (esSeleccionado) {
      celda.classList.add('calendario__dia--seleccionado');
    } else {
      celda.classList.add('calendario__dia--disponible');
      celda.addEventListener('click', () => seleccionarFecha(fecha, mes, anio));
    }

    grid.appendChild(celda);
  }

  contenedor.appendChild(header);
  contenedor.appendChild(gridDias);
  contenedor.appendChild(grid);
}

// ─────────────────────────────────────────────
// Seleccionar fecha y llenar el formulario
// ─────────────────────────────────────────────
function seleccionarFecha(fecha, mes, anio) {
  fechaSeleccionada = fecha;

  const inputFecha = document.getElementById('fecha_evento');
  if (inputFecha) inputFecha.value = fecha;

  const formulario = document.getElementById('disponibilidad-formulario');
  if (formulario) formulario.scrollIntoView({ behavior: 'smooth', block: 'start' });

  renderCalendario(mes, anio);
}

// ─────────────────────────────────────────────
// Estado de carga
// ─────────────────────────────────────────────
function mostrarCargando() {
  const contenedor = document.getElementById('calendario');
  if (!contenedor) return;
  contenedor.innerHTML = `
    <div style="text-align:center;padding:2rem;color:var(--color-tertiary);
    font-family:var(--font-secondary);font-size:var(--font-size-body-md);">
      <p>Cargando disponibilidad...</p>
    </div>`;
}

// ─────────────────────────────────────────────
// Inicializar
// ─────────────────────────────────────────────
async function inicializar() {
  mostrarCargando();
  await obtenerEventosCalendar();
  renderCalendario(mesActual, anioActual);
}

inicializar();