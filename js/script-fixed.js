// Portfolio Website JavaScript - Single Page Scrolling

// Global variables
let currentSlide = 0;
let totalSlides = 5;
let isScrolling = false;
let scrollTimeout;
let introComplete = false;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...');
    
    // Start intro animation
    startIntroAnimation();
    
    // Initialize other functionality after intro
    setTimeout(() => {
        initNavigation();
        initProjectSlides();
        initScrollNavigation();
        init360Viewer();
        
        // Set initial slide
        goToSlide(0);
    }, 7500); // Wait for intro to complete (extended timing)
});

// Intro Animation
function startIntroAnimation() {
    document.body.classList.add('loading');
    
    // Start video slideshow
    startVideoSlideshow();
    
    // Complete intro after 7 seconds (extended for video slideshow)
    setTimeout(() => {
        document.body.classList.add('loaded');
        introComplete = true;
        
        // Remove intro overlay after animation
        setTimeout(() => {
            const introOverlay = document.getElementById('intro-animation');
            if (introOverlay) {
                introOverlay.classList.add('hidden');
            }
            document.body.classList.remove('loading');
        }, 1000);
    }, 6000);
}

// Video slideshow functionality
function startVideoSlideshow() {
    const slides = document.querySelectorAll('.video-slide');
    let currentSlideIndex = 0;
    
    if (slides.length <= 1) return;
    
    setInterval(() => {
        // Remove active class from current slide
        slides[currentSlideIndex].classList.remove('active');
        
        // Move to next slide
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        
        // Add active class to new slide
        slides[currentSlideIndex].classList.add('active');
    }, 2500); // Change slide every 2.5 seconds
}

// Navigation functionality
function initNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const sideMenuOverlay = document.querySelector('.side-menu-overlay');
    const closeMenu = document.querySelector('.close-menu');
    const sideMenuLinks = document.querySelectorAll('.side-menu-link');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            sideMenuOverlay.classList.toggle('active');
            document.body.style.overflow = sideMenuOverlay.classList.contains('active') ? 'hidden' : '';
        });
    }

    if (closeMenu) {
        closeMenu.addEventListener('click', closeSideMenu);
    }
    
    if (sideMenuOverlay) {
        sideMenuOverlay.addEventListener('click', function(e) {
            if (e.target === sideMenuOverlay) {
                closeSideMenu();
            }
        });
    }

    // Close menu when clicking on links
    sideMenuLinks.forEach((link, index) => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            closeSideMenu();
            
            // Navigate to corresponding slide
            let targetSlide = 0;
            if (link.getAttribute('href') === '#about') targetSlide = 4;
            else if (link.getAttribute('href') === '#contact') targetSlide = 4;
            
            goToSlide(targetSlide);
        });
    });

    function closeSideMenu() {
        if (menuToggle) menuToggle.classList.remove('active');
        if (sideMenuOverlay) sideMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Project slides functionality
function initProjectSlides() {
    const navLabels = document.querySelectorAll('.nav-label');

    // Navigation labels click handlers
    navLabels.forEach((label, index) => {
        label.addEventListener('click', () => {
            console.log('Clicked label', index);
            goToSlide(index);
        });
    });

    // 360° viewer buttons
    const view360Buttons = document.querySelectorAll('.view-360-btn');
    view360Buttons.forEach(button => {
        button.addEventListener('click', function() {
            const projectType = this.dataset.project;
            open360Viewer(projectType);
        });
    });
}

// Scroll navigation
function initScrollNavigation() {
    // Prevent default scrolling
    document.addEventListener('wheel', handleScroll, { passive: false });
    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowDown' || e.key === 'PageDown') {
            e.preventDefault();
            nextSlide();
        } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
            e.preventDefault();
            prevSlide();
        }
    });
}

// Touch handling
let touchStartY = 0;
let touchEndY = 0;

function handleTouchStart(e) {
    touchStartY = e.touches[0].clientY;
}

function handleTouchMove(e) {
    e.preventDefault();
    touchEndY = e.touches[0].clientY;
    
    if (Math.abs(touchStartY - touchEndY) > 50) {
        if (touchStartY > touchEndY) {
            nextSlide();
        } else {
            prevSlide();
        }
        touchStartY = touchEndY;
    }
}

// Scroll handling
function handleScroll(e) {
    e.preventDefault();
    
    if (isScrolling || !introComplete) return;
    
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        if (e.deltaY > 0) {
            nextSlide();
        } else {
            prevSlide();
        }
    }, 50);
}

// Slide navigation functions
function nextSlide() {
    if (currentSlide < totalSlides - 1) {
        goToSlide(currentSlide + 1);
    }
}

function prevSlide() {
    if (currentSlide > 0) {
        goToSlide(currentSlide - 1);
    }
}

function goToSlide(slideIndex) {
    console.log('goToSlide called with index:', slideIndex);
    
    if (isScrolling || slideIndex === currentSlide || slideIndex < 0 || slideIndex >= totalSlides) {
        return;
    }
    
    isScrolling = true;
    
    // Update current slide
    currentSlide = slideIndex;
    
    // Update slides
    const slides = document.querySelectorAll('.project-slide');
    const navLabels = document.querySelectorAll('.nav-label');
    
    console.log('Found slides:', slides.length, 'Found labels:', navLabels.length);
    
    // Remove active class from all slides
    slides.forEach(slide => slide.classList.remove('active'));
    navLabels.forEach(label => label.classList.remove('active'));
    
    // Add active class to current slide
    if (slides[currentSlide]) {
        slides[currentSlide].classList.add('active');
    }
    if (navLabels[currentSlide]) {
        navLabels[currentSlide].classList.add('active');
    }
    
    // Reset scrolling flag after animation
    setTimeout(() => {
        isScrolling = false;
    }, 800);
    
    // Update URL hash without triggering scroll
    if (slides[currentSlide]) {
        const slideData = slides[currentSlide].dataset.project;
        if (slideData && slideData !== 'home') {
            history.replaceState(null, null, `#${slideData}`);
        } else {
            history.replaceState(null, null, window.location.pathname);
        }
    }
}

// 360° Viewer functionality
function init360Viewer() {
    const modal = document.querySelector('.viewer-360-modal');
    const closeModal = document.querySelector('.viewer-360-modal .close-modal');

    if (closeModal) {
        closeModal.addEventListener('click', close360Viewer);
    }
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                close360Viewer();
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            close360Viewer();
        }
    });
}

function open360Viewer(projectType) {
    const modal = document.querySelector('.viewer-360-modal');
    const container = document.getElementById('viewer-360');
    
    if (!modal || !container) return;
    
    // 360° image mapping
    const images360 = {
        'museum': '360-images/museum-360.jpg',
        'mall': '360-images/mall-360.jpg',
        'personal': '360-images/interior-360.jpg'
    };

    const imagePath = images360[projectType];
    
    if (imagePath) {
        // Clear previous viewer
        container.innerHTML = '';
        container.style.height = '100%';
        container.style.position = 'relative';
        
        // Initialize advanced 360° viewer
        if (typeof initAdvanced360Viewer === 'function') {
            initAdvanced360Viewer(container, imagePath);
        } else {
            // Fallback to simple viewer
            console.warn('Advanced 360° viewer not available, using fallback');
            createFallback360Viewer(container, imagePath);
        }
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function createFallback360Viewer(container, imagePath) {
    // Simple fallback viewer
    const img = document.createElement('img');
    img.src = imagePath;
    img.style.cssText = `
        width: 200%;
        height: 200%;
        object-fit: cover;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        cursor: grab;
        transition: transform 0.1s ease;
    `;
    
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let currentY = 0;
    
    img.addEventListener('mousedown', (e) => {
        isDragging = true;
        img.style.cursor = 'grabbing';
        startX = e.clientX - currentX;
        startY = e.clientY - currentY;
    });
    
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        currentX = e.clientX - startX;
        currentY = e.clientY - startY;
        
        currentX = Math.max(-200, Math.min(200, currentX));
        currentY = Math.max(-200, Math.min(200, currentY));
        
        img.style.transform = `translate(calc(-50% + ${currentX}px), calc(-50% + ${currentY}px))`;
    });
    
    document.addEventListener('mouseup', () => {
        isDragging = false;
        img.style.cursor = 'grab';
    });
    
    container.appendChild(img);
}

function close360Viewer() {
    const modal = document.querySelector('.viewer-360-modal');
    if (modal) {
        modal.classList.remove('active');
    }
    document.body.style.overflow = 'hidden'; // Keep body overflow hidden for single-page layout
    
    // Clear the viewer content
    const container = document.getElementById('viewer-360');
    if (container) {
        container.innerHTML = '';
    }
}

// Initialize on page load
window.addEventListener('load', function() {
    console.log('Window loaded');
    
    // Check URL hash and navigate to appropriate slide
    const hash = window.location.hash.substring(1);
    let initialSlide = 0;
    
    switch(hash) {
        case 'museum':
            initialSlide = 1;
            break;
        case 'mall':
            initialSlide = 2;
            break;
        case 'personal':
            initialSlide = 3;
            break;
        case 'about':
            initialSlide = 4;
            break;
        default:
            initialSlide = 0;
    }
    
    if (initialSlide !== 0) {
        setTimeout(() => {
            goToSlide(initialSlide);
        }, 500);
    }
    
    // Add loaded class for animations
    document.body.classList.add('loaded');
});

// Handle browser back/forward buttons
window.addEventListener('popstate', function(e) {
    const hash = window.location.hash.substring(1);
    let targetSlide = 0;
    
    switch(hash) {
        case 'museum':
            targetSlide = 1;
            break;
        case 'mall':
            targetSlide = 2;
            break;
        case 'personal':
            targetSlide = 3;
            break;
        case 'about':
            targetSlide = 4;
            break;
        default:
            targetSlide = 0;
    }
    
    goToSlide(targetSlide);
});

// Performance optimization
function optimizePerformance() {
    // Preload critical images
    const criticalImages = [
        'assets/museum-reference.jpg',
        'assets/mall-reference.jpg',
        'assets/360-reference.jpg',
        '360-images/museum-360.jpg',
        '360-images/mall-360.jpg',
        '360-images/interior-360.jpg'
    ];

    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize performance optimizations
optimizePerformance();

// Prevent context menu on right click for better UX
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

// Make functions globally available for debugging
window.goToSlide = goToSlide;
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;

