// ============================================
// CONTACTO.JS — Formularios con EmailJS
// Casa Frida
// ============================================

const EMAILJS_PUBLIC_KEY   = 'TToN-EQvqsU2iB0E-';
const EMAILJS_SERVICE_ID   = 'service_tf62goz';
const TEMPLATE_RESERVA     = 'template_bt5xsm9';  // Reserva de mesa
const TEMPLATE_EVENTO      = 'template_3218bna';   // Evento

// ─────────────────────────────────────────────
// Inicializar EmailJS y configurar formularios
// ─────────────────────────────────────────────
function inicializarEmailJS() {
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
  script.onload = () => {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
    configurarFormReserva();
    configurarFormEvento();
  };
  document.head.appendChild(script);
}

// ─────────────────────────────────────────────
// Formulario de reserva de mesa
// ─────────────────────────────────────────────
function configurarFormReserva() {
  const form      = document.getElementById('formReserva');
  const btn       = document.getElementById('btnReserva');
  const mensajeDiv = document.getElementById('mensajeReserva');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    btn.textContent = 'Enviando...';
    btn.disabled = true;
    mensajeDiv.className = 'formulario__mensaje';
    mensajeDiv.textContent = '';

    const params = {
      name:          form.nombre.value,
      email:         form.email.value,
      telefono:      form.telefono.value,
      fecha_reserva: form.fecha_reserva.value,
      hora_reserva:  form.hora_reserva.value,
      num_personas:  form.num_personas.value,
      message:       form.message.value || 'Sin comentarios adicionales',
    };

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, TEMPLATE_RESERVA, params);
      mensajeDiv.textContent = '¡Reserva enviada! Te confirmaremos disponibilidad en menos de 2 horas.';
      mensajeDiv.classList.add('formulario__mensaje--exito');
      form.reset();
    } catch (error) {
      console.error('EmailJS error:', error);
      mensajeDiv.textContent = 'Error al enviar. Por favor llámanos directamente.';
      mensajeDiv.classList.add('formulario__mensaje--error');
    } finally {
      btn.textContent = 'Confirmar disponibilidad';
      btn.disabled = false;
    }
  });
}

// ─────────────────────────────────────────────
// Formulario de evento
// ─────────────────────────────────────────────
function configurarFormEvento() {
  const form      = document.getElementById('formEvento');
  const btn       = document.getElementById('btnEvento');
  const mensajeDiv = document.getElementById('mensajeEvento');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    btn.textContent = 'Enviando...';
    btn.disabled = true;
    mensajeDiv.className = 'formulario__mensaje';
    mensajeDiv.textContent = '';

    const params = {
      name:          form.nombre.value,
      email:         form.email.value,
      tipo_evento:   form.tipo_evento.value,
      fecha_evento:  form.fecha_evento.value,
      num_invitados: form.num_invitados.value,
      presupuesto:   form.presupuesto.value || 'No especificado',
      message:       form.message.value || 'Sin mensaje adicional',
    };

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, TEMPLATE_EVENTO, params);
      mensajeDiv.textContent = '¡Solicitud enviada! Te contactaremos en menos de 24 horas.';
      mensajeDiv.classList.add('formulario__mensaje--exito');
      form.reset();
    } catch (error) {
      console.error('EmailJS error:', error);
      mensajeDiv.textContent = 'Error al enviar. Por favor contáctanos directamente.';
      mensajeDiv.classList.add('formulario__mensaje--error');
    } finally {
      btn.textContent = 'Enviar solicitud';
      btn.disabled = false;
    }
  });
}

// Inicializar
inicializarEmailJS();