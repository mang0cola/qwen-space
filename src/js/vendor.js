/**
 * Vendor Bundle - External Libraries
 * THREE.js, GSAP, Barba.js, WebFont Loader
 */

// THREE.js - WebGL 3D Engine
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

// GSAP - Animation Platform
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Barba.js - Page Transitions
import barba from '@barba/core';

// WebFont Loader - Font Loading
import WebFont from 'webfontloader';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Export for global access
window.THREE = THREE;
window.GLTFLoader = GLTFLoader;
window.DRACOLoader = DRACOLoader;
window.gsap = gsap;
window.ScrollTrigger = ScrollTrigger;
window.barba = barba;
window.WebFont = WebFont;

export {
    THREE,
    GLTFLoader,
    DRACOLoader,
    gsap,
    ScrollTrigger,
    barba,
    WebFont
};
