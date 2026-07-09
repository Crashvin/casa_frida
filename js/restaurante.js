
function inicializarMenuNav() {
  const btns = document.querySelectorAll('.menu-nav__btn');
  const categorias = document.querySelectorAll('.menu-categoria');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const categoria = btn.getAttribute('data-categoria');

      // Remover activos
      btns.forEach(b => b.classList.remove('menu-nav__btn--active'));
      categorias.forEach(c => c.classList.remove('menu-categoria--active'));

      // Activar seleccionado
      btn.classList.add('menu-nav__btn--active');
      const categoriaActiva = document.getElementById(`cat-${categoria}`);
      if (categoriaActiva) categoriaActiva.classList.add('menu-categoria--active');
    });
  });
}

inicializarMenuNav();