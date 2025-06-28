// // Initialize Lucide icons
// lucide.createIcons();

// // Mobile menu toggle function
// function toggleMobileMenu() {
//     const mobileMenu = document.getElementById('mobile-menu');
//     const menuIcon = document.getElementById('menu-icon');
//     const closeIcon = document.getElementById('close-icon');

//     mobileMenu.classList.toggle('active');
//     menuIcon.classList.toggle('hidden');
//     closeIcon.classList.toggle('hidden');
// }

// // Close mobile menu when clicking on a link
// document.querySelectorAll('#mobile-menu a').forEach(link => {
//     link.addEventListener('click', () => {
//         toggleMobileMenu();
//     });
// });

// // Close mobile menu when clicking outside
// document.addEventListener('click', (e) => {
//     const mobileMenu = document.getElementById('mobile-menu');
//     const menuButton = document.querySelector('[onclick="toggleMobileMenu()"]');

//     if (!mobileMenu.contains(e.target) && !menuButton.contains(e.target)) {
//         if (mobileMenu.classList.contains('active')) {
//             toggleMobileMenu();
//         }
//     }
// });
// Initialize Lucide icons
lucide.createIcons();

// Page activation management
function setActivePage() {
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';

    // Mapping des pages
    const pageMap = {
        '': 'index.html',
        'index.html': 'index.html',
        'products.html': 'products.html',
        'about.html': 'about.html',
        'contact.html': 'contact.html'
    };

    // Déterminer la page active
    const activePage = pageMap[currentPage] || 'index.html';

    // Supprimer toutes les classes actives existantes
    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
        link.classList.remove('text-saumon-100');
        link.classList.add('text-blue-dark0');
    });

    // Ajouter la classe active à la page courante
    const activeLinks = document.querySelectorAll(`a[href="${activePage}"], a[href="/${activePage}"]`);
    activeLinks.forEach(link => {
        link.classList.add('active');
        link.classList.remove('text-blue-dark0');
        link.classList.add('text-saumon-100');
        link.style.fontWeight = '600'; // Rendre le texte plus bold
    });

    // Cas spécial pour la racine (/) qui doit activer l'accueil
    if (currentPath === '/' || currentPath === '') {
        const homeLinks = document.querySelectorAll('a[href="index.html"], a[href="/"]');
        homeLinks.forEach(link => {
            link.classList.add('active');
            link.classList.remove('text-blue-dark0');
            link.classList.add('text-saumon-100');
            link.style.fontWeight = '600';
        });
    }
}

// Mobile menu toggle function
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');

    mobileMenu.classList.toggle('active');
    menuIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
}

// Close mobile menu when clicking on a link
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        toggleMobileMenu();
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuButton = document.querySelector('[onclick="toggleMobileMenu()"]');

    if (!mobileMenu.contains(e.target) && !menuButton.contains(e.target)) {
        if (mobileMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    }
});

// Navigation avec gestion d'état
function navigateTo(page) {
    // Optionnel : Vous pouvez ajouter des animations de transition ici
    window.location.href = page;
}

// Ajouter des event listeners pour la navigation
document.addEventListener('DOMContentLoaded', function () {
    // Activer la page courante au chargement
    setActivePage();

    // Ajouter des event listeners aux liens de navigation
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function (e) {
            // Optionnel : Ajouter une classe de transition
            this.style.transition = 'all 0.3s ease';
        });
    });
});

// Gestion des styles hover avec état actif
function addHoverEffects() {
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function () {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(-1px)';
                this.style.transition = 'all 0.2s ease';
            }
        });

        link.addEventListener('mouseleave', function () {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });
}

// Initialiser les effets hover
document.addEventListener('DOMContentLoaded', addHoverEffects);

// Fonction utilitaire pour forcer l'activation d'une page (pour usage manuel)
function forceActivePage(pageName) {
    // Supprimer toutes les classes actives
    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active', 'text-saumon-100');
        link.classList.add('text-blue-dark0');
        link.style.fontWeight = 'normal';
    });

    // Activer la page spécifiée
    const targetLinks = document.querySelectorAll(`a[href="${pageName}"], a[href="/${pageName}"]`);
    targetLinks.forEach(link => {
        link.classList.add('active', 'text-saumon-100');
        link.classList.remove('text-blue-dark0');
        link.style.fontWeight = '600';
    });
}

// carrousel functionality

document.querySelectorAll('[data-carousel]').forEach((carousel) => {
    const gallery = carousel.querySelector('[data-gallery]');
    const items = gallery.children;
    const prevBtn = carousel.querySelector('[data-prev]');
    const nextBtn = carousel.querySelector('[data-next]');
    const dotsContainer = carousel.querySelector('[data-dots]');
    const basePerPage = parseInt(carousel.dataset.perpage) || 3;
    let currentPage = 0;

    function getItemsPerPage() {
        const width = window.innerWidth;
        if (width < 640) return 1;
        if (width < 1024) return 2;
        return basePerPage || 3; // 
    }

    function getItemWidth() {
        return items[0].offsetWidth + 32; // gap-8
    }

    function getTotalPages() {
        return Math.ceil(items.length / getItemsPerPage());
    }

    function updateCarousel() {
        const perPage = getItemsPerPage();
        const offset = currentPage * perPage * getItemWidth();
        gallery.style.transform = `translateX(-${offset}px)`;
        updateDots();
        updateButtons();
    }

    function updateDots() {
        dotsContainer.innerHTML = '';
        const totalPages = getTotalPages();
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('div');
            dot.className = `w-3 h-3 rounded-full cursor-pointer transition-all ${i === currentPage ? 'bg-saumon-200' : 'bg-gray-400'}`;
            dot.addEventListener('click', () => {
                currentPage = i;
                updateCarousel();
            });
            dotsContainer.appendChild(dot);
        }
    }

    function updateButtons() {
        const totalPages = getTotalPages();
        prevBtn.disabled = currentPage === 0;
        nextBtn.disabled = currentPage >= totalPages - 1;
    }

    prevBtn.addEventListener('click', () => {
        if (currentPage > 0) {
            currentPage--;
            updateCarousel();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentPage < getTotalPages() - 1) {
            currentPage++;
            updateCarousel();
        }
    });

    window.addEventListener('resize', () => {
        currentPage = 0;
        updateCarousel();
    });

    updateCarousel();
});
