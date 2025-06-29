// Inicializa AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true // Animações acontecem apenas uma vez
});

// Script para o menu Hamburguer e navegação
const mobileMenu = document.getElementById('mobile-menu');
const navUl = document.querySelector('header nav ul');
const header = document.querySelector('header');

if (mobileMenu && navUl) {
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
        navUl.classList.toggle('open');
    });

    // Fecha o menu ao clicar em um link e rola suavemente
    navUl.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');

            // Verifica se é um link para uma seção na mesma página
            if (targetId.startsWith('#')) {
                e.preventDefault(); // Impede o comportamento padrão de salto

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = header.offsetHeight; // Altura do cabeçalho fixo
                    const offsetTop = targetElement.offsetTop - headerHeight;

                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
            // Fecha o menu mobile após clicar em qualquer link (se aberto)
            if (mobileMenu.classList.contains('open')) {
                mobileMenu.classList.remove('open');
                navUl.classList.remove('open');
            }
        });
    });

    // Adicionar classe 'active' ao link de navegação conforme a rolagem da página
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - header.offsetHeight;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = '#' + section.getAttribute('id');
            }
        });

        navUl.querySelectorAll('a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === current) {
                link.classList.add('active');
            }
        });
    });
}


// Script para Acordeão de FAQ (se usado na página FAQ)
// Este script será útil se o `faq.html` mantiver o acordeão
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const accordionItem = header.closest('.accordion-item');
        const accordionContent = accordionItem.querySelector('.accordion-content');

        // Fecha todos os outros itens
        document.querySelectorAll('.accordion-item.active').forEach(item => {
            if (item !== accordionItem) {
                item.classList.remove('active');
                item.querySelector('.accordion-content').style.maxHeight = 0;
            }
        });

        // Alterna o item clicado
        accordionItem.classList.toggle('active');
        if (accordionItem.classList.contains('active')) {
            accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px'; // Ajusta a altura
        } else {
            accordionContent.style.maxHeight = 0;
        }
    });
});