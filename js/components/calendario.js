const fechasOcupadas = [
  '2025-07-05',
  '2025-07-12',
  '2025-07-19',
  '2025-07-26',
  '2025-08-02',
  '2025-08-09',
  '2025-08-16',
];

let fechaSeleccionada = null;
let mesActual = new Date().getMonth();
let anioActual = new Date().getFullYear();

const meses = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const dias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

// ─────────────────────────────────────────────
// Función principal: renderizar el calendario
// ─────────────────────────────────────────────
function renderCalendario(mes, anio) {
  const contenedor = document.getElementById('calendario');
  if (!contenedor) return;

  contenedor.innerHTML = '';

  // Header del calendario
  const header = document.createElement('div');
  header.classList.add('calendario__header');

  const btnAnterior = document.createElement('button');
  btnAnterior.classList.add('calendario__nav');
  btnAnterior.innerHTML = '&#8592;';
  btnAnterior.setAttribute('aria-label', 'Mes anterior');
  btnAnterior.addEventListener('click', () => {
    if (mes === 0) {
      renderCalendario(11, anio - 1);
    } else {
      renderCalendario(mes - 1, anio);
    }
  });

  const titulo = document.createElement('h3');
  titulo.classList.add('calendario__titulo');
  titulo.textContent = `${meses[mes]} ${anio}`;

  const btnSiguiente = document.createElement('button');
  btnSiguiente.classList.add('calendario__nav');
  btnSiguiente.innerHTML = '&#8594;';
  btnSiguiente.setAttribute('aria-label', 'Mes siguiente');
  btnSiguiente.addEventListener('click', () => {
    if (mes === 11) {
      renderCalendario(0, anio + 1);
    } else {
      renderCalendario(mes + 1, anio);
    }
  });

  header.appendChild(btnAnterior);
  header.appendChild(titulo);
  header.appendChild(btnSiguiente);

  // Nombres de días
  const gridDias = document.createElement('div');
  gridDias.classList.add('calendario__dias-semana');
  dias.forEach(dia => {
    const span = document.createElement('span');
    span.textContent = dia;
    gridDias.appendChild(span);
  });

  // Grid de fechas
  const grid = document.createElement('div');
  grid.classList.add('calendario__grid');

  const primerDia = new Date(anio, mes, 1).getDay();
  const totalDias = new Date(anio, mes + 1, 0).getDate();
  const hoy = new Date();

  // Espacios vacíos antes del primer día
  for (let i = 0; i < primerDia; i++) {
    const vacio = document.createElement('div');
    vacio.classList.add('calendario__dia', 'calendario__dia--vacio');
    grid.appendChild(vacio);
  }

  // Días del mes
  for (let dia = 1; dia <= totalDias; dia++) {
    const fecha = `${anio}-${String(mes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
    const fechaObj = new Date(anio, mes, dia);
    const esPasado = fechaObj < new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
    const esOcupado = fechasOcupadas.includes(fecha);
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
// Seleccionar una fecha del calendario
// ─────────────────────────────────────────────
function seleccionarFecha(fecha, mes, anio) {
  fechaSeleccionada = fecha;

  // Llenar automáticamente el campo de fecha en el formulario
  const inputFecha = document.getElementById('fecha_evento');
  if (inputFecha) {
    inputFecha.value = fecha;
  }

  // Scroll suave al formulario
  const formulario = document.getElementById('formulario-evento');
  if (formulario) {
    formulario.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Re-renderizar para mostrar la selección
  renderCalendario(mes, anio);
}

// Inicializar
renderCalendario(mesActual, anioActual);