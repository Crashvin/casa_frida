const navLinks = [
  { texto: "Inicio", href: "index.html" },
  { texto: "Restaurante", href: "restaurante.html" },
  { texto: "Eventos", href: "eventos.html" },
  { texto: "Menú", href: "menu.html" },
  { texto: "Sobre Nosotros", href: "nosotros.html" },
  { texto: "Contacto", href: "contacto.html" },
];

function crearNavbar() {
  const nav = document.createElement("nav");
  nav.classList.add("navbar");
  nav.setAttribute("id", "navbar");

  const logo = document.createElement('a');
logo.setAttribute('href', 'index.html');
logo.classList.add('navbar__logo');

const logoImg = document.createElement('img');
logoImg.setAttribute('src', 'assets/brand/casafrida_white.svg');
logoImg.setAttribute('alt', 'Casa Frida');
logoImg.classList.add('navbar__logo-img');

logo.appendChild(logoImg);

  const ul = document.createElement("ul");
  ul.classList.add("navbar__links");
  ul.setAttribute("id", "navLinks");

  navLinks.forEach((link) => {
    const li = document.createElement("li");
    const a = document.createElement("a");

    a.setAttribute("href", link.href);
    a.textContent = link.texto;
    a.classList.add("navbar__link");

    li.appendChild(a);
    ul.appendChild(li);
  });

  marcarLinkActivo(ul);

  const btnReservar = document.createElement("a");
  btnReservar.setAttribute("href", "contacto.html");
  btnReservar.classList.add("navbar__cta");
  btnReservar.textContent = "Reservar";

  const btnHamburguesa = document.createElement("button");
  btnHamburguesa.classList.add("navbar__hamburger");
  btnHamburguesa.setAttribute("id", "btnHamburguesa");
  btnHamburguesa.setAttribute("aria-label", "Abrir menú");
  btnHamburguesa.setAttribute("aria-expanded", "false");

  for (let i = 0; i < 3; i++) {
    const span = document.createElement("span");
    btnHamburguesa.appendChild(span);
  }

  nav.appendChild(logo);
  nav.appendChild(ul);
  nav.appendChild(btnReservar);
  nav.appendChild(btnHamburguesa);

  // Redes sociales — solo visibles en mobile
  const redesSociales = document.createElement("div");
  redesSociales.classList.add("navbar__redes");

  const redes = [
    {
      texto: "Instagram",
      href: "https://www.instagram.com/casafrida_tepotzotlan?igsh=bjltNm5haGFmZnpy",
    },
    {
      texto: "Facebook",
      href: "https://www.facebook.com/casadefridatepotzotlan",
    },
  ];

  redes.forEach((red) => {
    const a = document.createElement("a");
    a.setAttribute("href", red.href);
    a.setAttribute("target", "_blank");
    a.textContent = red.texto;
    a.classList.add("navbar__red");
    redesSociales.appendChild(a);
  });

  ul.appendChild(redesSociales);

  // Botón cerrar menú mobile
  const btnCerrar = document.createElement("button");
  btnCerrar.classList.add("navbar__cerrar");
  btnCerrar.setAttribute("aria-label", "Cerrar menú");
  btnCerrar.textContent = "✕";
  ul.prepend(btnCerrar);

  document.body.prepend(nav);
}

function marcarLinkActivo(ul) {
  const paginaActual = location.pathname.split("/").pop() || "index.html";

  const links = ul.querySelectorAll(".navbar__link");
  links.forEach((link) => {
    if (link.getAttribute("href") === paginaActual) {
      link.classList.add("navbar__link--active");
    }
  });
}

function detectarScroll() {
  const nav = document.getElementById("navbar");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
      nav.classList.add("navbar--scrolled");
    } else {
      nav.classList.remove("navbar--scrolled");
    }
  });
}

function toggleMenuMobile() {
  const btn = document.getElementById("btnHamburguesa");
  const menu = document.getElementById("navLinks");
  const btnCerrar = document.querySelector(".navbar__cerrar");

  btn.addEventListener("click", () => {
    menu.classList.toggle("navbar__links--open");
    btn.classList.toggle("navbar__hamburger--active");
    btn.setAttribute(
      "aria-expanded",
      menu.classList.contains("navbar__links--open"),
    );
  });

  btnCerrar.addEventListener("click", () => {
    menu.classList.remove("navbar__links--open");
    btn.classList.remove("navbar__hamburger--active");
    btn.setAttribute("aria-expanded", false);
  });
}

crearNavbar();
detectarScroll();
toggleMenuMobile();
