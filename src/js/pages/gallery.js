/**
 * Gallery Page Initialization
 */

import { gsap, ScrollTrigger } from '../vendor';

export function initGallery(webgl) {
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
    
    // Touch events
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
}

window.initGallery = initGallery;
