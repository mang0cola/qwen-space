/**
 * Homepage Initialization
 * First View, About, Brands Slider, News, Gallery sections
 */

import { gsap, ScrollTrigger } from '../vendor';

export function initHome(webgl) {
    // Initialize homepage sections
    initFirstView();
    initAboutSection();
    initBrandsSlider(webgl);
    initGalleryDrag(webgl);
}

function initFirstView() {
    const fv = document.querySelector('.home-fv');
    if (!fv) return;
    
    // Animate content on load
    const content = fv.querySelector('.home-fv-content');
    if (content) {
        gsap.fromTo(content,
            { opacity: 0, y: 50 },
            { 
                opacity: 1, 
                y: 0, 
                duration: 1.2, 
                ease: 'power3.out',
                delay: 0.5
            }
        );
    }
    
    // Scroll down arrow animation
    const scrollArrow = fv.querySelector('.scroll-down');
    if (scrollArrow) {
        scrollArrow.addEventListener('click', () => {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }
}

function initAboutSection() {
    const about = document.querySelector('.about-section');
    if (!about) return;
    
    // Animate text on scroll
    gsap.fromTo(about.querySelectorAll('p'),
        { opacity: 0, y: 30 },
        {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            scrollTrigger: {
                trigger: about,
                start: 'top 75%',
                toggleActions: 'play none none reverse'
            }
        }
    );
}

function initBrandsSlider(webgl) {
    const brandsSection = document.querySelector('.brands-section');
    if (!brandsSection) return;
    
    const brandButtons = brandsSection.querySelectorAll('.brand-nav button');
    const brandImages = brandsSection.querySelectorAll('.brand-image');
    const brandDescs = brandsSection.querySelectorAll('.brand-desc');
    
    let currentIndex = 0;
    
    // Setup click handlers for brand navigation
    brandButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            if (index === currentIndex) return;
            
            // Update active states
            brandButtons.forEach(b => b.classList.remove('active'));
            brandImages.forEach(img => img.classList.remove('active'));
            
            button.classList.add('active');
            brandImages[index].classList.add('active');
            
            // Animate description
            gsap.fromTo(brandDescs[index],
                { opacity: 0, x: 20 },
                { opacity: 1, x: 0, duration: 0.6 }
            );
            
            // Trigger Voronoi transition via WebGL
            if (webgl && webgl.triggerVoronoiTransition) {
                webgl.triggerVoronoiTransition(
                    brandImages[currentIndex],
                    brandImages[index]
                );
            }
            
            currentIndex = index;
        });
    });
    
    // Auto-advance slider every 5 seconds
    setInterval(() => {
        const nextIndex = (currentIndex + 1) % brandButtons.length;
        brandButtons[nextIndex].click();
    }, 5000);
}

function initGalleryDrag(webgl) {
    const dragArea = document.querySelector('.js-drag-area');
    const galleryMove = document.querySelector('.gallery-slide-move');
    
    if (!dragArea || !galleryMove) return;
    
    let isDragging = false;
    let startX = 0;
    let currentX = 0;
    let translateX = 0;
    
    // Mouse events
    dragArea.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX - translateX;
        dragArea.classList.add('is-dragging');
        document.body.classList.add('js-hover-drag');
    });
    
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        currentX = e.clientX - startX;
        translateX = Math.max(
            -galleryMove.scrollWidth + window.innerWidth,
            Math.min(0, currentX)
        );
        
        galleryMove.style.transform = `translateX(${translateX}px)`;
        
        // Update WebGL parallax if available
        if (webgl && webgl.updateParallax) {
            webgl.updateParallax(translateX);
        }
    });
    
    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            dragArea.classList.remove('is-dragging');
            document.body.classList.remove('js-hover-drag');
        }
    });
    
    // Touch events for mobile
    dragArea.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].clientX - translateX;
        dragArea.classList.add('is-dragging');
    });
    
    dragArea.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        
        currentX = e.touches[0].clientX - startX;
        translateX = Math.max(
            -galleryMove.scrollWidth + window.innerWidth,
            Math.min(0, currentX)
        );
        
        galleryMove.style.transform = `translateX(${translateX}px)`;
    });
    
    dragArea.addEventListener('touchend', () => {
        isDragging = false;
        dragArea.classList.remove('is-dragging');
    });
    
    // GSAP ScrollTrigger for gallery section visibility
    gsap.fromTo(galleryMove.querySelectorAll('.gallery-card'),
        { opacity: 0, scale: 0.95 },
        {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            scrollTrigger: {
                trigger: '.gallery-section',
                start: 'top 70%'
            }
        }
    );
}

// Export for Barba.js page transitions
window.initHome = initHome;
