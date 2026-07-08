/**
 * Main Application Entry Point
 * Initializes all modules and starts the application
 */

import { gsap, ScrollTrigger, barba, WebFont } from './vendor';

// Import modules
import { WebGLRenderer } from './webgl/WebGLRenderer';
import { Cursor } from './components/Cursor';
import { Scrollbar } from './components/Scrollbar';
import { Navigation } from './components/Navigation';
import { initHome } from './pages/home';
import { initBrands } from './pages/brands';
import { initGallery } from './pages/gallery';

class App {
    constructor() {
        this.webgl = null;
        this.cursor = null;
        this.scrollbar = null;
        this.navigation = null;
        
        this.init();
    }
    
    async init() {
        // Load fonts first
        await this.loadFonts();
        
        // Initialize core systems
        this.initWebGL();
        this.initCursor();
        this.initScrollbar();
        this.initNavigation();
        
        // Initialize page-specific scripts
        this.initPageScripts();
        
        // Setup Barba.js for page transitions
        this.setupBarba();
        
        // Mark as loaded
        document.body.classList.add('is-loaded');
    }
    
    loadFonts() {
        return new Promise((resolve) => {
            WebFont.load({
                custom: {
                    families: ['nimbus-sans:n3,n4,n5,n6,n7'],
                    urls: [] // Typekit URL would go here
                },
                active: () => {
                    resolve();
                },
                inactive: () => {
                    resolve(); // Continue even if fonts fail
                }
            });
        });
    }
    
    initWebGL() {
        const canvas = document.querySelector('#js-front');
        if (canvas) {
            this.webgl = new WebGLRenderer(canvas);
            this.webgl.init();
        }
    }
    
    initCursor() {
        this.cursor = new Cursor();
        this.cursor.init();
    }
    
    initScrollbar() {
        this.scrollbar = new Scrollbar();
        this.scrollbar.init();
    }
    
    initNavigation() {
        this.navigation = new Navigation();
        this.navigation.init();
    }
    
    initPageScripts() {
        const namespace = document.querySelector('[data-barba-namespace]')?.dataset.barbaNamespace || 'home';
        
        switch(namespace) {
            case 'home':
                initHome(this.webgl);
                break;
            case 'brands':
                initBrands(this.webgl);
                break;
            case 'gallery':
                initGallery(this.webgl);
                break;
        }
    }
    
    setupBarba() {
        barba.init({
            debug: false,
            timeout: 5000,
            transitions: [{
                name: 'default',
                
                beforeLeave() {
                    document.body.classList.remove('is-loaded');
                },
                
                async leave(data) {
                    await data.current.container.animate({
                        opacity: 0,
                        y: -20
                    }, {
                        duration: 400,
                        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                    }).finished;
                },
                
                async enter(data) {
                    data.next.container.style.opacity = 0;
                    data.next.container.style.transform = 'translateY(20px)';
                    
                    await data.next.container.animate({
                        opacity: 1,
                        y: 0
                    }, {
                        duration: 600,
                        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                    }).finished;
                },
                
                afterEnter() {
                    document.body.classList.add('is-loaded');
                }
            }]
        });
        
        barba.hooks.after(() => {
            // Re-initialize page scripts after transition
            window.location.reload(); // Simplified - in production would re-init modules
        });
    }
}

// Start application when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new App();
    });
} else {
    new App();
}

export default App;
