/**
 * Custom Cursor Component
 * Six states with smooth scale transitions
 */

import { gsap } from '../vendor';

export class Cursor {
    constructor() {
        this.element = null;
        this.x = 0;
        this.y = 0;
        this.targetX = 0;
        this.targetY = 0;
        
        // Cursor state classes
        this.states = {
            default: '',
            link: 'js-hover-a',
            header: 'js-hover-header',
            arrow: 'js-hover-arrow',
            text: 'js-hover-text',
            drag: 'js-hover-drag'
        };
        
        this.currentState = this.states.default;
        
        // Bind methods
        this.onMouseMove = this.onMouseMove.bind(this);
        this.update = this.update.bind(this);
    }
    
    init() {
        // Don't initialize on mobile/tablet
        if (window.innerWidth <= 1024) {
            return;
        }
        
        this.createElement();
        this.addEventListeners();
        this.update();
    }
    
    createElement() {
        this.element = document.createElement('div');
        this.element.className = 'cursor';
        document.body.appendChild(this.element);
    }
    
    addEventListeners() {
        document.addEventListener('mousemove', this.onMouseMove);
        
        // Setup hover state listeners
        this.setupHoverStates();
    }
    
    setupHoverStates() {
        // Links
        document.querySelectorAll('a, .js-hover-a').forEach(el => {
            el.addEventListener('mouseenter', () => this.setState(this.states.link));
            el.addEventListener('mouseleave', () => this.resetState());
        });
        
        // Header links
        document.querySelectorAll('.site-header a, .js-hover-header').forEach(el => {
            el.addEventListener('mouseenter', () => this.setState(this.states.header));
            el.addEventListener('mouseleave', () => this.resetState());
        });
        
        // Arrow buttons
        document.querySelectorAll('.scroll-down, .js-hover-arrow').forEach(el => {
            el.addEventListener('mouseenter', () => this.setState(this.states.arrow));
            el.addEventListener('mouseleave', () => this.resetState());
        });
        
        // Large text titles
        document.querySelectorAll('.felix-xxl, .felix-xl, .js-hover-text').forEach(el => {
            el.addEventListener('mouseenter', () => this.setState(this.states.text));
            el.addEventListener('mouseleave', () => this.resetState());
        });
        
        // Drag areas
        document.querySelectorAll('.js-drag-area, .js-hover-drag').forEach(el => {
            el.addEventListener('mouseenter', () => this.setState(this.states.drag));
            el.addEventListener('mouseleave', () => this.resetState());
        });
    }
    
    setState(state) {
        if (this.currentState === state) return;
        
        // Remove all state classes
        Object.values(this.states).forEach(s => {
            if (s) document.body.classList.remove(s);
        });
        
        // Add new state class
        if (state) {
            document.body.classList.add(state);
        }
        
        this.currentState = state;
    }
    
    resetState() {
        this.setState(this.states.default);
    }
    
    onMouseMove(event) {
        this.targetX = event.clientX;
        this.targetY = event.clientY;
    }
    
    update() {
        // Smooth interpolation (lerp)
        this.x += (this.targetX - this.x) * 0.15;
        this.y += (this.targetY - this.y) * 0.15;
        
        // Apply transform
        if (this.element) {
            this.element.style.transform = `translate(${this.x}px, ${this.y}px) translate(-50%, -50%)`;
        }
        
        requestAnimationFrame(this.update);
    }
    
    destroy() {
        document.removeEventListener('mousemove', this.onMouseMove);
        
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
    }
}
