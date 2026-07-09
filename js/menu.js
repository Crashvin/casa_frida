function inicializarStickyNav() {
  const nav = document.getElementById('menuStickyNav');
  const header = document.getElementById('menu-header');
  if (!nav || !header) return;

  // Activar sticky cuando pase el header
  window.addEventListener('scroll', () => {
    const headerBottom = header.getBoundingClientRect().bottom;
    if (headerBottom <= 80) {
      nav.classList.add('menu-sticky-nav--fixed');
    } else {
      nav.classList.remove('menu-sticky-nav--fixed');
    }
  });

  // Resaltar sección activa al hacer scroll
  const secciones = document.querySelectorAll('.menu-seccion');
  const links = document.querySelectorAll('.menu-sticky-nav__link');

  window.addEventListener('scroll', () => {
    let seccionActual = '';

    secciones.forEach(seccion => {
      const top = seccion.getBoundingClientRect().top;
      if (top <= 150) {
        seccionActual = seccion.getAttribute('id');
      }
    });

    links.forEach(link => {
      link.classList.remove('menu-sticky-nav__link--active');
      if (link.getAttribute('href') === `#${seccionActual}`) {
        link.classList.add('menu-sticky-nav__link--active');
      }
    });
  });
}

inicializarStickyNav();