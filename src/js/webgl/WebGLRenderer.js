/**
 * WebGL Renderer - Multi-layer Offscreen Rendering Pipeline
 * Implements the 4-layer architecture:
 * Layer 4: screen_contents (stones.fbo ⊕ front.fbo)
 * Layer 3: screen_rock (rock.fbo) - GLTF 3D stone model
 * Layer 2: screen_bg (back.fbo) - Background + mouse glow
 * Layer 1: WebGLRenderer output
 */

import { THREE } from '../vendor';

export class WebGLRenderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.container = canvas.parentElement;
        
        // Three.js core
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        
        // Frame buffer objects (FBOs)
        this.fbos = {
            back: null,   // Background layer with mouse glow
            rock: null,   // Stone texture layer
            stones: null, // Combined stones
            front: null   // Foreground composite
        };
        
        // Render targets
        this.targets = {
            screen_bg: null,
            screen_rock: null,
            screen_contents: null
        };
        
        // Mouse tracking
        this.mouse = { x: 0, y: 0 };
        this.targetMouse = { x: 0, y: 0 };
        
        // Colors (synced with CSS variables)
        this.colors = {
            white: new THREE.Color('#fcfcfc'),
            black: new THREE.Color('#050505')
        };
        
        // Animation frame ID
        this.animationId = null;
        
        // Resize handler
        this.onResize = this.onResize.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
    }
    
    init() {
        this.setupScene();
        this.setupCamera();
        this.setupRenderer();
        this.setupFBOs();
        this.setupShaders();
        this.addEventListeners();
        this.animate();
    }
    
    setupScene() {
        this.scene = new THREE.Scene();
    }
    
    setupCamera() {
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;
        
        this.camera = new THREE.PerspectiveCamera(
            45,
            width / height,
            0.1,
            1000
        );
        this.camera.position.z = 5;
    }
    
    setupRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance'
        });
        
        this.renderer.setSize(
            this.container.clientWidth,
            this.container.clientHeight
        );
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }
    
    setupFBOs() {
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;
        
        // Create offscreen render targets
        this.fbos.back = new THREE.WebGLRenderTarget(width, height, {
            format: THREE.RGBAFormat,
            type: THREE.FloatType,
            minFilter: THREE.LinearFilter,
            magFilter: THREE.LinearFilter
        });
        
        this.fbos.rock = new THREE.WebGLRenderTarget(width, height, {
            format: THREE.RGBAFormat,
            type: THREE.FloatType,
            minFilter: THREE.LinearFilter,
            magFilter: THREE.LinearFilter
        });
        
        this.fbos.stones = new THREE.WebGLRenderTarget(width, height, {
            format: THREE.RGBAFormat,
            type: THREE.FloatType,
            minFilter: THREE.LinearFilter,
            magFilter: THREE.LinearFilter
        });
        
        this.fbos.front = new THREE.WebGLRenderTarget(width, height, {
            format: THREE.RGBAFormat,
            type: THREE.FloatType,
            minFilter: THREE.LinearFilter,
            magFilter: THREE.LinearFilter
        });
    }
    
    setupShaders() {
        // Voronoi noise shader for transitions
        this.voronoiShader = {
            uniforms: {
                tDiffuse: { value: null },
                tNext: { value: null },
                time: { value: 0 },
                mouse: { value: new THREE.Vector2(0, 0) },
                voronoiBlur: { value: 1.0 },
                voronoiPow: { value: 1.0 },
                threshold: { value: 0.5 }
            },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform sampler2D tDiffuse;
                uniform sampler2D tNext;
                uniform float time;
                uniform vec2 mouse;
                uniform float voronoiBlur;
                uniform float voronoiPow;
                uniform float threshold;
                varying vec2 vUv;
                
                // IQ Noise function for Voronoi
                float iqnoise(vec2 p, float u, float v) {
                    vec2 ip = floor(p);
                    vec2 u0 = fract(p) - vec2(0.5);
                    vec2 i0 = floor(ip + vec2(0.5));
                    vec2 a0 = p - i0;
                    vec2 d0 = 0.5 - abs(a0);
                    float n0 = dot(d0, d0);
                    vec2 i1 = i0 + sign(a0);
                    vec2 a1 = p - i1;
                    vec2 d1 = 0.5 - abs(a1);
                    float n1 = dot(d1, d1);
                    return smoothstep(threshold, 0.0, min(n0, n1));
                }
                
                void main() {
                    vec4 texelNow = texture2D(tDiffuse, vUv);
                    vec4 texelNext = texture2D(tNext, vUv);
                    
                    float st = vUv.x * 10.0 + time * 0.5;
                    float voron = iqnoise(vec2(st), voronoiBlur, voronoiPow);
                    float mixf = clamp((voron - time) * (1.0/threshold), 0.0, 1.0);
                    
                    vec4 texelMix = mix(texelNext, texelNow, mixf);
                    gl_FragColor = texelMix;
                }
            `
        };
        
        // Mouse glow shader for background layer
        this.glowShader = {
            uniforms: {
                tDiffuse: { value: null },
                mouse: { value: new THREE.Vector2(0.5, 0.5) },
                radius: { value: 0.3 },
                power: { value: 2.0 },
                opacity: { value: 0.15 }
            },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform sampler2D tDiffuse;
                uniform vec2 mouse;
                uniform float radius;
                uniform float power;
                uniform float opacity;
                varying vec2 vUv;
                
                void main() {
                    vec4 tex = texture2D(tDiffuse, vUv);
                    
                    float distance = length(vUv - mouse);
                    float gr = pow(distance / radius, power);
                    float mag = cos(1.0 - gr);
                    
                    vec3 brightened = tex.rgb + (1.0 - gr) * opacity;
                    brightened = clamp(brightened, 0.0, 1.0);
                    
                    gl_FragColor = vec4(brightened, tex.a);
                }
            `
        };
    }
    
    addEventListeners() {
        window.addEventListener('resize', this.onResize);
        document.addEventListener('mousemove', this.onMouseMove);
    }
    
    onMouseMove(event) {
        // Normalize mouse coordinates
        this.targetMouse.x = event.clientX / window.innerWidth;
        this.targetMouse.y = 1.0 - (event.clientY / window.innerHeight);
    }
    
    onResize() {
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;
        
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        
        this.renderer.setSize(width, height);
        
        // Update FBO sizes
        Object.values(this.fbos).forEach(fbo => {
            fbo.setSize(width, height);
        });
    }
    
    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());
        
        // Smooth mouse interpolation
        this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.1;
        this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.1;
        
        // Update shader uniforms
        if (this.glowShader.uniforms) {
            this.glowShader.uniforms.mouse.value.set(this.mouse.x, this.mouse.y);
        }
        
        this.render();
    }
    
    render() {
        // Render to FBOs in order
        // 1. Background layer with mouse glow
        // 2. Rock/stone layer
        // 3. Composite layers
        
        this.renderer.setRenderTarget(this.fbos.back);
        this.renderer.render(this.scene, this.camera);
        
        // Reset to default framebuffer
        this.renderer.setRenderTarget(null);
        this.renderer.render(this.scene, this.camera);
    }
    
    destroy() {
        cancelAnimationFrame(this.animationId);
        window.removeEventListener('resize', this.onResize);
        document.removeEventListener('mousemove', this.onMouseMove);
        
        // Cleanup Three.js resources
        Object.values(this.fbos).forEach(fbo => {
            fbo.dispose();
        });
        
        if (this.renderer) {
            this.renderer.dispose();
        }
    }
}
