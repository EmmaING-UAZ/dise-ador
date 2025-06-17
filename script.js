document.addEventListener('DOMContentLoaded', () => {

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const header = document.getElementById('main-header');
    const navMenu = document.querySelector('#main-nav ul');
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const scrollThreshold = 50; // Distancia de scroll para cambiar el navbar

    // --- 1. Funcionalidad del Menú Hamburguesa ---
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('menu-abierto');
            menuToggle.classList.toggle('active');
            // Actualizar aria-expanded
            const isExpanded = navMenu.classList.contains('menu-abierto');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });
    }

    // --- 2. Cambio de estilo del Navbar al hacer scroll ---
    function toggleHeaderBackground() {
        if (header) { // Asegurarse que el header exista
            if (window.scrollY > scrollThreshold) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    }
    // Llamada inicial por si la página carga con scroll
    toggleHeaderBackground();
    window.addEventListener('scroll', toggleHeaderBackground);

    // --- 3. Resaltar enlace activo en el menú ---
    const navLinks = document.querySelectorAll('#main-nav ul li a');
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active'); // Asegurar que solo el actual esté activo
        }
    });

    // --- 4. Actualizar año en el footer ---
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- 5. Animaciones al hacer scroll (Fade-in para secciones) ---
    const sectionsToAnimate = document.querySelectorAll('.fade-in-section');
    if (sectionsToAnimate.length > 0) {
        const revealSection = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        };
        const sectionObserver = new IntersectionObserver(revealSection, {
            root: null,
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px' // Activar un poco antes
        });
        sectionsToAnimate.forEach(section => {
            sectionObserver.observe(section);
        });
    }

    // --- 6. Animaciones de carga para elementos en hero (index.html) ---
    // Estas clases .fade-in-on-load .delay-N ya están en el HTML de index.html
    // y los keyframes y clases base en styles.css. No se necesita JS adicional
    // si las animaciones son puramente CSS al cargar.

    // === FUNCIONALIDADES ESPECÍFICAS POR PÁGINA ===

    // --- 7. Galería Modal (portafolio.html) ---
    if (currentPage === 'portafolio.html' || document.getElementById('portafolio-galeria')) {
        const modal = document.getElementById('modal-galeria');
        const modalImage = document.getElementById('imagen-modal');
        const modalDescription = document.getElementById('descripcion-modal');
        const galleryItems = document.querySelectorAll('.proyecto-item'); // Seleccionar el contenedor del item
        const closeModalButton = document.querySelector('.cerrar-modal');

        if (modal && modalImage && modalDescription && closeModalButton) {
            galleryItems.forEach(item => {
                item.addEventListener('click', () => {
                    const imgElement = item.querySelector('img');
                    modal.classList.add('visible'); // Usar clase para mostrar con flex
                    modalImage.src = imgElement.src;
                    modalImage.alt = imgElement.alt;
                    modalDescription.textContent = imgElement.dataset.descripcion || 'No hay descripción disponible.';
                    document.body.style.overflow = 'hidden';
                });
            });

            const closeModal = () => {
                modal.classList.remove('visible');
                document.body.style.overflow = 'auto';
            };

            closeModalButton.addEventListener('click', closeModal);
            modal.addEventListener('click', (event) => {
                if (event.target === modal) closeModal();
            });
            document.addEventListener('keydown', (event) => {
                if (event.key === 'Escape' && modal.classList.contains('visible')) closeModal();
            });
        }
    }

    // --- 8. Filtros del Portafolio (portafolio.html) - Funcionalidad básica ---
    if (currentPage === 'portafolio.html' || document.querySelector('.filtros-portafolio')) {
        const filtroBtns = document.querySelectorAll('.filtro-btn');
        const galeriaItems = document.querySelectorAll('.galeria .proyecto-item');

        if (filtroBtns.length > 0 && galeriaItems.length > 0) {
            filtroBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    // Manejar clase activa en botones
                    filtroBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');

                    const filtro = btn.dataset.filtro;

                    galeriaItems.forEach(item => {
                        item.style.display = 'none'; // Ocultar todos primero
                        if (filtro === 'todos' || item.dataset.categoria === filtro) {
                            // Forzar reflow para reiniciar animación si se usa una de aparición
                            // item.style.animation = 'none';
                            // void item.offsetWidth; // trigger reflow
                            // item.style.animation = '';
                            item.style.display = 'block'; // Mostrar los que coinciden
                        }
                    });
                });
            });
        }
    }

    // --- 9. Simulación de envío del Formulario de Contacto (contacto.html) ---
    if (currentPage === 'contacto.html' || document.getElementById('formulario-contacto')) {
        const contactForm = document.getElementById('formulario-contacto');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                // Aquí se podría añadir validación más robusta
                alert('Formulario enviado (simulación). ¡Gracias por contactarme!');
                this.reset();
            });
        }
    }

});
