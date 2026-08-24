const footerExplorar = [
  { texto: 'Inicio',         href: 'index.html' },
  { texto: 'Restaurante',    href: 'restaurante.html' },
  { texto: 'Eventos',        href: 'eventos.html' },
  { texto: 'Menú',           href: 'menu.html' },
  { texto: 'Sobre Nosotros', href: 'nosotros.html' },
  { texto: 'Contacto',       href: 'contacto.html' },
];

const footerConectar = [
  { texto: 'Contacto',            href: 'contacto.html' },
  { texto: 'FAQ',                 href: '#faq' },
  { texto: 'Instagram',           href: 'https://instagram.com/casafrida' },
  { texto: 'Facebook',            href: 'https://facebook.com/casafrida' },
  { texto: 'Trabaja con nosotros',href: 'mailto:contacto@casafrida.com.mx' },
];

const footerVisitar = {
  direccion: 'Carretera de las Cañadas, Andrés Molina Enríquez #3, Tepotzotlán, Estado de México, 54650',
  horarios: 'Mar – Vie 10:00–18:00 | Sáb – Dom 9:00–19:00',
};

function crearColumna(titulo, links) {
  const columna = document.createElement('div');
  columna.classList.add('footer__columna');

  const h4 = document.createElement('h4');
  h4.textContent = titulo;
  h4.classList.add('footer__titulo');

  const ul = document.createElement('ul');

  links.forEach(link => {
    const li = document.createElement('li');
    const a  = document.createElement('a');
    a.setAttribute('href', link.href);
    a.textContent = link.texto;
    a.classList.add('footer__link');
    li.appendChild(a);
    ul.appendChild(li);
  });

  columna.appendChild(h4);
  columna.appendChild(ul);
  return columna;
}

function crearFooter() {
  const footer = document.createElement('footer');
  footer.classList.add('footer');

  // Sección superior
  const footerTop = document.createElement('div');
  footerTop.classList.add('footer__top');

  // Columna 1: Logo + descripción
  const colLogo = document.createElement('div');
  colLogo.classList.add('footer__columna');

  const logo = document.createElement('a');
  logo.setAttribute('href', 'index.html');
  logo.textContent = 'Casa Frida';
  logo.classList.add('footer__logo');

  const descripcion = document.createElement('p');
  descripcion.textContent = 'Restaurante y salón de eventos en Tepotzotlán, Estado de México. Restaurante Mar & Tierra.';
  descripcion.classList.add('footer__descripcion');

  colLogo.appendChild(logo);
  colLogo.appendChild(descripcion);

  // Columna 2 y 3: usando crearColumna()
  const colExplorar = crearColumna('Explorar', footerExplorar);
  const colConectar = crearColumna('Conectar', footerConectar);

  // Columna 4: Visitar
  const colVisitar = document.createElement('div');
  colVisitar.classList.add('footer__columna');

  const tituloVisitar = document.createElement('h4');
  tituloVisitar.textContent = 'Visitar';
  tituloVisitar.classList.add('footer__titulo');

  const direccionP = document.createElement('p');
  direccionP.textContent = footerVisitar.direccion;
  direccionP.classList.add('footer__texto');

  const horariosP = document.createElement('p');
  horariosP.textContent = footerVisitar.horarios;
  horariosP.classList.add('footer__texto');

  colVisitar.appendChild(tituloVisitar);
  colVisitar.appendChild(direccionP);
  colVisitar.appendChild(horariosP);

  // Ensamblar columnas
  footerTop.appendChild(colLogo);
  footerTop.appendChild(colExplorar);
  footerTop.appendChild(colConectar);
  footerTop.appendChild(colVisitar);

  // Sección inferior
  const footerBottom = document.createElement('div');
  footerBottom.classList.add('footer__bottom');

  const disclaimer = document.createElement('p');
  disclaimer.textContent = '© 2026 Casa Frida. Todos los derechos reservados.';
  disclaimer.classList.add('footer__disclaimer');

  footerBottom.appendChild(disclaimer);

  // Ensamblar footer
  footer.appendChild(footerTop);
  footer.appendChild(footerBottom);

  document.body.appendChild(footer);
}

crearFooter();