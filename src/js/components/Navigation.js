/**
 * Navigation Component
 * Header, mobile menu, theme switcher, language switcher
 */

import { gsap } from '../vendor';

export class Navigation {
    constructor() {
        this.header = null;
        this.toggle = null;
        this.menuPanel = null;
        this.menuBg = null;
        this.themeSwitcher = null;
        this.langSwitchers = null;
        
        this.isMenuOpen = false;
        this.currentTheme = 'black';
        
        // Bind methods
        this.onToggleClick = this.onToggleClick.bind(this);
        this.onThemeSwitch = this.onThemeSwitch.bind(this);
        this.onLangSwitch = this.onLangSwitch.bind(this);
    }
    
    init() {
        this.getElements();
        this.addEventListeners();
    }
    
    getElements() {
        this.header = document.querySelector('.site-header');
        this.toggle = document.querySelector('.site-toggle');
        this.menuPanel = document.querySelector('.site-header-r');
        this.menuBg = document.querySelector('.site-menu-bg');
        this.themeSwitcher = document.querySelector('.js-switch-color');
        this.langSwitchers = document.querySelectorAll('.js-lang-switch');
    }
    
    addEventListeners() {
        // Mobile menu toggle
        if (this.toggle) {
            this.toggle.addEventListener('click', this.onToggleClick);
        }
        
        // Menu background click to close
        if (this.menuBg) {
            this.menuBg.addEventListener('click', () => this.closeMenu());
        }
        
        // Theme switcher
        if (this.themeSwitcher) {
            this.themeSwitcher.addEventListener('click', this.onThemeSwitch);
        }
        
        // Language switchers
        this.langSwitchers.forEach(switcher => {
            switcher.addEventListener('click', this.onLangSwitch);
        });
        
        // ESC key to close menu
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen) {
                this.closeMenu();
            }
        });
    }
    
    onToggleClick() {
        if (this.isMenuOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }
    
    openMenu() {
        this.isMenuOpen = true;
        document.body.classList.add('is-menu-open');
        
        // Animate menu items in
        if (this.menuPanel) {
            const links = this.menuPanel.querySelectorAll('a');
            gsap.fromTo(links, 
                { opacity: 0, y: 20 },
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 0.5, 
                    stagger: 0.05,
                    delay: 0.3
                }
            );
        }
    }
    
    closeMenu() {
        this.isMenuOpen = false;
        document.body.classList.remove('is-menu-open');
    }
    
    onThemeSwitch() {
        this.currentTheme = this.currentTheme === 'black' ? 'white' : 'black';
        
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        
        // Update theme switcher icon
        this.updateThemeIcon();
        
        // Notify WebGL renderer if available
        if (window.webglRenderer) {
            window.webglRenderer.setTheme(this.currentTheme);
        }
    }
    
    updateThemeIcon() {
        const icon = this.themeSwitcher?.querySelector('.site-color-icon');
        if (!icon) return;
        
        // SVG paths for sun/moon icons
        const sunPath = 'M12 4a1 1 0 011-1h0a1 1 0 011 1v0a1 1 0 01-1 1h0a1 1 0 01-1-1V4zm0 14a1 1 0 011-1h0a1 1 0 011 1v0a1 1 0 01-1 1h0a1 1 0 01-1-1v0zM6.34 6.34a1 1 0 011.41-1.41h0a1 1 0 010 1.41h0a1 1 0 01-1.41 0zm11.32 11.32a1 1 0 011.41-1.41h0a1 1 0 010 1.41h0a1 1 0 01-1.41 0zM4 12a1 1 0 011-1h0a1 1 0 010 1h0a1 1 0 01-1 0zm14 0a1 1 0 011-1h0a1 1 0 010 1h0a1 1 0 01-1 0zM6.34 17.66a1 1 0 010-1.41h0a1 1 0 011.41 0v0a1 1 0 01-1.41 1.41zm11.32-11.32a1 1 0 010-1.41h0a1 1 0 011.41 0v0a1 1 0 01-1.41 1.41z';
        const moonPath = 'M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z';
        
        icon.innerHTML = this.currentTheme === 'black' 
            ? `<path d="${sunPath}"/>`
            : `<path d="${moonPath}"/>`;
    }
    
    onLangSwitch(event) {
        event.preventDefault();
        
        const targetLang = event.currentTarget.dataset.lang;
        const currentPath = window.location.pathname;
        
        // Build new URL with language prefix
        let newPath;
        if (targetLang === 'en') {
            newPath = currentPath.replace(/^\/th\//, '/');
        } else {
            newPath = currentPath.startsWith('/th/') 
                ? currentPath 
                : '/th' + currentPath;
        }
        
        // Navigate to new URL
        window.location.href = newPath;
    }
    
    setActiveNavItem(path) {
        const navLinks = document.querySelectorAll('.site-nav a');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === path || (path === '/' && href === '/')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    destroy() {
        if (this.toggle) {
            this.toggle.removeEventListener('click', this.onToggleClick);
        }
        
        if (this.menuBg) {
            this.menuBg.removeEventListener('click', () => this.closeMenu());
        }
        
        if (this.themeSwitcher) {
            this.themeSwitcher.removeEventListener('click', this.onThemeSwitch);
        }
    }
}
