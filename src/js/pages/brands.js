/**
 * Brands Page Initialization
 */

import { gsap, ScrollTrigger } from '../vendor';

export function initBrands(webgl) {
    // Animate brand grid on load
    const brandGrid = document.querySelector('.brands-grid');
    if (brandGrid) {
        gsap.fromTo(brandGrid.querySelectorAll('.brand-item'),
            { opacity: 0, y: 40 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out'
            }
        );
    }
    
    // Brand detail animations
    const brandDetails = document.querySelectorAll('.brand-detail');
    brandDetails.forEach(detail => {
        gsap.fromTo(detail.querySelectorAll('img'),
            { opacity: 0, scale: 1.05 },
            {
                opacity: 1,
                scale: 1,
                duration: 1,
                scrollTrigger: {
                    trigger: detail,
                    start: 'top 75%'
                }
            }
        );
    });
}

window.initBrands = initBrands;
