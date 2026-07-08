/**
 * Custom Scrollbar Component
 * GSAP-driven scroll indicator with drag support
 */

import { gsap } from '../vendor';

export class Scrollbar {
    constructor() {
        this.container = null;
        this.thumb = null;
        this.bg = null;
        
        // Scroll state
        this.scrollPercent = 0;
        this.isDragging = false;
        this.startY = 0;
        this.startScroll = 0;
        
        // Bind methods
        this.onScroll = this.onScroll.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
    }
    
    init() {
        this.createElement();
        this.addEventListeners();
        this.onScroll(); // Initial position
    }
    
    createElement() {
        // Create scrollbar container
        this.container = document.createElement('div');
        this.container.className = 'site-scroll-nav';
        
        // Background track
        this.bg = document.createElement('div');
        this.bg.className = 'site-scroll-bg';
        
        // Thumb (draggable indicator)
        this.thumb = document.createElement('div');
        this.thumb.className = 'site-scroll-thumb';
        
        this.container.appendChild(this.bg);
        this.container.appendChild(this.thumb);
        document.body.appendChild(this.container);
    }
    
    addEventListeners() {
        // Track native scroll
        window.addEventListener('scroll', this.onScroll, { passive: true });
        
        // Thumb drag events
        this.thumb.addEventListener('mousedown', this.onMouseDown);
        
        // Global mouse events for dragging
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);
    }
    
    onScroll() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        
        this.scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;
        this.scrollPercent = Math.max(0, Math.min(1, this.scrollPercent));
        
        this.updateThumbPosition();
        this.updateHeaderState(scrollTop);
    }
    
    updateThumbPosition() {
        if (!this.thumb || !this.container) return;
        
        const maxTranslate = this.container.clientHeight - this.thumb.clientHeight;
        const translateY = this.scrollPercent * maxTranslate;
        
        gsap.set(this.thumb, {
            y: translateY,
            scaleY: 1 // Could vary based on page length
        });
    }
    
    updateHeaderState(scrollTop) {
        const lastScroll = window.lastScrollTop || 0;
        const header = document.querySelector('.site-header');
        
        if (!header) return;
        
        // Determine scroll direction
        if (scrollTop > lastScroll && scrollTop > 100) {
            // Scrolling down
            document.body.classList.add('is-scroll');
            document.body.classList.remove('is-scroll-up');
        } else if (scrollTop < lastScroll) {
            // Scrolling up
            document.body.classList.remove('is-scroll');
            document.body.classList.add('is-scroll-up');
        }
        
        // Check if near footer
        const scrollHeight = document.documentElement.scrollHeight;
        const nearFooter = scrollTop + window.innerHeight >= scrollHeight - 500;
        
        if (nearFooter) {
            document.body.classList.add('is-page-footer-bottom');
        } else {
            document.body.classList.remove('is-page-footer-bottom');
        }
        
        window.lastScrollTop = scrollTop;
    }
    
    onMouseDown(event) {
        this.isDragging = true;
        this.startY = event.clientY;
        this.startScroll = window.scrollY;
        
        this.thumb.style.cursor = 'grabbing';
        document.body.style.userSelect = 'none';
    }
    
    onMouseMove(event) {
        if (!this.isDragging) return;
        
        const deltaY = event.clientY - this.startY;
        const containerHeight = this.container.clientHeight;
        const thumbHeight = this.thumb.clientHeight;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        
        // Convert thumb movement to scroll percentage
        const maxThumbDelta = containerHeight - thumbHeight;
        const scrollDelta = (deltaY / maxThumbDelta) * docHeight;
        
        const newScroll = this.startScroll + scrollDelta;
        window.scrollTo(0, Math.max(0, Math.min(docHeight, newScroll)));
    }
    
    onMouseUp() {
        this.isDragging = false;
        this.thumb.style.cursor = 'grab';
        document.body.style.userSelect = '';
    }
    
    destroy() {
        window.removeEventListener('scroll', this.onScroll);
        this.thumb.removeEventListener('mousedown', this.onMouseDown);
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
        
        if (this.container && this.container.parentNode) {
            this.container.parentNode.removeChild(this.container);
        }
    }
}
