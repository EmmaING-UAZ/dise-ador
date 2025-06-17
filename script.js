document.addEventListener('DOMContentLoaded', () => {

    // --- Efecto de cambio de color del navbar al hacer scroll ---
    const header = document.getElementById('main-header');
    const scrollThreshold = 50; // Distancia de scroll en píxeles para cambiar el navbar

    function toggleHeaderBackground() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // --- Actualizar año en el footer ---
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Galería Modal ---
    const modal = document.getElementById('modal-galeria');
    const modalImage = document.getElementById('imagen-modal');
    const modalDescription = document.getElementById('descripcion-modal');
    const galleryItems = document.querySelectorAll('.proyecto-item img');
    const closeModalButton = document.querySelector('.cerrar-modal');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            if (modal && modalImage && modalDescription) {
                modal.style.display = 'flex'; // Cambiado a flex para centrar con CSS
                modalImage.src = item.src;
                modalImage.alt = item.alt; // Copiar el alt de la imagen original
                // Usar el atributo data-descripcion para el texto del modal
                modalDescription.textContent = item.dataset.descripcion || 'No hay descripción disponible.';
                document.body.style.overflow = 'hidden'; // Evitar scroll del fondo
            }
        });
    });

    function closeModal() {
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restaurar scroll del fondo
        }
    }

    if (closeModalButton) {
        closeModalButton.addEventListener('click', closeModal);
    }

    // Cerrar modal al hacer clic fuera de la imagen (en el fondo oscuro)
    if (modal) {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) { // Si el clic es en el fondo del modal
                closeModal();
            }
        });
    }

    // Cerrar modal con la tecla Escape
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal && modal.style.display === 'flex') {
            closeModal();
        }
    });

    // --- Animaciones al hacer scroll (Fade-in) ---
    const sectionsToAnimate = document.querySelectorAll('.fade-in-section');

    const revealSection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // No observar más una vez que es visible
            }
        });
    };

    if (sectionsToAnimate.length > 0) {
        const sectionObserver = new IntersectionObserver(revealSection, {
            root: null, // Observa la intersección con el viewport
            threshold: 0.15, // Porcentaje de visibilidad para activar (15%)
            // rootMargin: '0px 0px -50px 0px' // Ejemplo: Activar un poco antes de que entre completamente
        });

        sectionsToAnimate.forEach(section => {
            sectionObserver.observe(section);
            // Para que funcione con las clases definidas en el CSS,
            // las secciones en HTML deben tener la clase 'fade-in-section'
            // Ejemplo: <section id="sobre-mi" class="fade-in-section">
        });
    }

    // Asegurarse de que el navbar se actualice al cargar la página si ya hay scroll
    toggleHeaderBackground();
    window.addEventListener('scroll', toggleHeaderBackground);

    // --- Smooth scroll para anclas (opcional, ya que html { scroll-behavior: smooth; } lo hace) ---
    // Si se quiere más control o compatibilidad:
    /*
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            let targetId = this.getAttribute('href');
            let targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    */

    // --- Placeholder para la funcionalidad del formulario de contacto ---
    const contactForm = document.getElementById('formulario-contacto');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevenir el envío real del formulario
            // Aquí se podría añadir validación y envío mediante AJAX (ej. Fetch API)
            alert('Formulario enviado (simulación). ¡Gracias por tu mensaje!');
            // Limpiar el formulario (opcional)
            // this.reset();
        });
    }

});
