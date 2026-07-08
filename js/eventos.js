// Credenciales EmailJS
const EMAILJS_PUBLIC_KEY  = 'TToN-EQvqsU2iB0E-';
const EMAILJS_SERVICE_ID  = 'service_tf62goz';
const EMAILJS_TEMPLATE_ID = 'template_3218bna';

// ─────────────────────────────────────────────
// Inicializar EmailJS
// ─────────────────────────────────────────────
function inicializarEmailJS() {
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
  script.onload = () => {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
    configurarFormulario();
  };
  document.head.appendChild(script);
}

// ─────────────────────────────────────────────
// Configurar el formulario
// ─────────────────────────────────────────────
function configurarFormulario() {
  const form = document.getElementById('formEvento');
  const btnEnviar = document.getElementById('btnEnviar');
  const mensajeDiv = document.getElementById('formularioMensaje');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Estado de carga
    btnEnviar.textContent = 'Enviando...';
    btnEnviar.disabled = true;
    mensajeDiv.className = 'formulario__mensaje';
    mensajeDiv.textContent = '';

    // Recopilar datos del formulario
    const templateParams = {
      name:         form.nombre.value,
      email:        form.email.value,
      tipo_evento:  form.tipo_evento.value,
      fecha_evento: form.fecha_evento.value,
      num_invitados:form.num_invitados.value,
      presupuesto:  form.presupuesto.value || 'No especificado',
      message:      form.message.value || 'Sin mensaje adicional',
    };

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);

      // Éxito
      mensajeDiv.textContent = '¡Solicitud enviada! Te contactaremos en menos de 24 horas.';
      mensajeDiv.classList.add('formulario__mensaje--exito');
      form.reset();

    } catch (error) {
      // Error
      console.error('EmailJS error:', error);
      mensajeDiv.textContent = 'Hubo un error al enviar. Por favor intenta de nuevo o contáctanos directamente.';
      mensajeDiv.classList.add('formulario__mensaje--error');

    } finally {
      btnEnviar.textContent = 'Enviar solicitud';
      btnEnviar.disabled = false;
    }
  });
}

// Inicializar
inicializarEmailJS();