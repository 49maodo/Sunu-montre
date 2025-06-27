// Initialize Lucide icons
lucide.createIcons();

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
