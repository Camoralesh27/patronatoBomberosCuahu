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
const flagsElement = document.querySelector('#flags');
const textsToChange = document.querySelectorAll('[data-section]');
const inputName = document.querySelector('#name');
const inputEmail = document.querySelector('#email');
const inputMessage = document.querySelector('#message');

// Función para cambiar el idioma y guardar la preferencia en localStorage
const setLanguage = (language) => {
    flagsElement.setAttribute('data-language', language);
    localStorage.setItem('selectedLanguage', language);
    changeLanguages(language);
    
    inputName.placeholder = language === 'esp' ? 'Tu nombre' : 'Your name';
    inputEmail.placeholder = language === 'esp' ? 'Tu correo electrónico' : 'Your email';
    inputMessage.placeholder = language === 'esp' ? 'La descripción de tu proyecto' : 'Your project description';
};

// Escuchar el cambio de checkbox y actualizar idioma
flagsElement.addEventListener('change', (e) => {
    let language = e.target.checked ? 'eng' : 'esp';
    setLanguage(language);
});

// Cargar el idioma guardado al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    let savedLanguage = localStorage.getItem('selectedLanguage') || 'esp'; // Idioma predeterminado: inglés
    flagsElement.checked = savedLanguage === 'eng';
    setLanguage(savedLanguage);
});

// Toma el JSON y modifica el idioma
const changeLanguages = async (language) => {
    const requestJson = await fetch(`./languages/${language}.json`);
    const texts = await requestJson.json();

    for (const textToChange of textsToChange) {
        const section = textToChange.dataset.section;
        const value = textToChange.dataset.value;
        
        /* textToChange.innerHTML = texts[section][value]; */

        let keys = value.split('.');
        let translation = texts[section];

        for (const key of keys) {
            if (translation && key in translation) {
                translation = translation[key];
            } else {
                translation = undefined;
                break;
            }
        }

        if (translation !== undefined) {
            textToChange.innerHTML = translation;
        } else {
            console.warn(`⚠️ Traducción no encontrada para ${section}.${value}`);
        }

    }
};

/*======= Actualizar año footer =======*/
document.getElementById("year").textContent = new Date().getFullYear();