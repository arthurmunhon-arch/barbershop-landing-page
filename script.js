document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       MENU RESPONSIVO (MOBILE)
       ========================================================================== */
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Abre e fecha o menu lateral mobile ao clicar no hamburguer
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('open');
        navMenu.classList.toggle('open');
    });

    // Fecha o menu lateral quando clica em qualquer link interno
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('open');
            navMenu.classList.remove('open');
        });
    });

    /* ==========================================================================
       EFEITO DO HEADER AO ROLAR A PÁGINA (SCROLL HEADER)
       ========================================================================== */
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        updateActiveLink();
    });

    /* ==========================================================================
       LINK ATIVO CONFORME A SEÇÃO ATUAL NA TELA
       ========================================================================== */
    const sections = document.querySelectorAll('section');

    function updateActiveLink() {
        let scrollPosition = window.scrollY + 150; // Offset para detectar antes de chegar no topo

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    /* ==========================================================================
       ANIMAÇÃO DE REVELAÇÃO AO ROLAR (SCROLL REVEAL VIA INTERSECTION OBSERVER)
       ========================================================================== */
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealOptions = {
        threshold: 0.15, // Porcentagem do elemento visível para disparar a animação
        rootMargin: "0px 0px -50px 0px" // Dispara um pouco antes do elemento subir totalmente
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Deixa de observar uma vez que já animou
            }
        });
    }, revealOptions);

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
});