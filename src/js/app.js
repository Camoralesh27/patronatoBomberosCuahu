/*======= SHOW MENU =======*/
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId);

    toggle.addEventListener('click', () => {
        nav.classList.toggle('show-menu');
        toggle.classList.toggle('show-icon');
    });

    const dropdownToggle = document.querySelector('.navM__dropdown-toggle');
    const dropdownParent = document.querySelector('.navM__dropdown');

    // Cierra menú al hacer clic en cualquier link que NO sea el botón de dropdown
    const navLinks = document.querySelectorAll(`#${navId} .navM__link`);
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Si NO es el botón del dropdown, cierra menú y dropdown
            if (!link.classList.contains('navM__dropdown-toggle')) {
                nav.classList.remove('show-menu');
                toggle.classList.remove('show-icon');
                if (dropdownParent.classList.contains('active')) {
                    dropdownParent.classList.remove('active');
                }
            }
        });
    });

    // Activa el dropdown al tocar "Productos"
    if (dropdownToggle && dropdownParent) {
        dropdownToggle.addEventListener('click', (e) => {
            e.preventDefault(); // evita que navegue
            dropdownParent.classList.toggle('active');
        });
    }
};

showMenu('navM-toggle', 'navM-menu');


/*==================== CAMBIAR IDIOMA ====================*/


/*======= ACTUALIZAR AÑO FOOTER =======*/
document.getElementById("year").textContent = new Date().getFullYear();