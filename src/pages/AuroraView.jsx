import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, useTexture, Float } from '@react-three/drei';
import * as THREE from 'three';
import { useNavigate } from 'react-router-dom';

// Aurora Shader Material
// Aurora Shader Material
const AuroraMaterial = {
    uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color('#00ff88') }
    },
    vertexShader: `
    varying vec2 vUv;
    varying vec3 vNormal;
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    fragmentShader: `
    uniform float uTime;
    uniform vec3 uColor;
    varying vec2 vUv;
    varying vec3 vNormal;

    // Simplex noise function
    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
    float snoise(vec2 v){
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
               -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    // Fractal Brownian Motion for more natural details
    float fbm(vec2 st) {
        float value = 0.0;
        float amplitude = 0.5;
        for (int i = 0; i < 5; i++) {
            value += amplitude * snoise(st);
            st *= 2.0;
            amplitude *= 0.5;
        }
        return value;
    }

    void main() {
      // 1. Organic, Random Flow using FBM
      // We distort the UVs with noise to make it look like fluid/gas
      vec2 distortedUV = vUv;
      distortedUV.x += snoise(vec2(vUv.y * 10.0, uTime * 0.1)) * 0.1;
      
      // Generate the main aurora pattern
      float pattern = fbm(vec2(distortedUV.x * 12.0, distortedUV.y * 4.0) + vec2(uTime * 0.05, uTime * 0.02));
      
      // sharpening the pattern
      float aurora = smoothstep(0.1, 0.6, pattern); 

      // 2. Polar Masking (More organic than a strict ring)
      // Allow it to exist generally near the poles but randomly fade
      float poleDist = min(abs(vUv.y - 0.9), abs(vUv.y - 0.1));
      float poleMask = smoothstep(0.2, 0.0, poleDist);
      
      // 3. Vertical "Curtains"
      float streaks = smoothstep(0.3, 1.0, snoise(vec2(vUv.x * 50.0, vUv.y) + uTime * 0.1));
      
      // Combine everything
      float finalAlpha = aurora * poleMask * (0.6 + 0.4 * streaks);
      
      // 4. Random Color Variation
      vec3 color1 = vec3(0.0, 1.0, 0.5); // Teal/Green
      vec3 color2 = vec3(0.6, 0.2, 1.0); // Purple
      vec3 color3 = vec3(0.2, 0.5, 1.0); // Blue
      
      // Mix colors based on position and noise
      float colorMix = fbm(vUv * 5.0 + uTime * 0.1);
      vec3 finalColor = mix(mix(color1, color2, colorMix), color3, streaks);

      gl_FragColor = vec4(finalColor, finalAlpha * 0.8);
    }
  `
};

const Earth = () => {
    const earthRef = useRef();
    const cloudsRef = useRef();
    // Use textures if available, otherwise fallback handles itself (or we could use color)
    const [colorMap, cloudsMap] = useTexture([
        '/assets/textures/earth.jpg',
        '/assets/textures/earth_clouds.jpg'
    ]);

    useFrame((state) => {
        if (earthRef.current) {
            earthRef.current.rotation.y += 0.0005;
        }
        if (cloudsRef.current) {
            cloudsRef.current.rotation.y += 0.0007;
        }
    });

    return (
        <group>
            {/* Earth Sphere */}
            <mesh ref={earthRef}>
                <sphereGeometry args={[2, 64, 64]} />
                <meshStandardMaterial
                    map={colorMap}
                    roughness={0.5}
                    metalness={0.1}
                />
            </mesh>

            {/* Cloud Layer */}
            <mesh ref={cloudsRef} scale={[1.02, 1.02, 1.02]}>
                <sphereGeometry args={[2, 64, 64]} />
                <meshStandardMaterial
                    map={cloudsMap}
                    transparent
                    opacity={0.4}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>
        </group>
    );
};

const AuroraBorealis = () => {
    const meshRef = useRef();
    const materialRef = useRef();

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
        }
        if (meshRef.current) {
            meshRef.current.rotation.y -= 0.001;
        }
    });

    return (
        <mesh ref={meshRef} scale={[1.1, 1.1, 1.1]} rotation={[0.2, 0, 0]}>
            <sphereGeometry args={[2, 64, 64]} />
            <shaderMaterial
                ref={materialRef}
                args={[AuroraMaterial]}
                transparent
                depthWrite={false}
                side={THREE.DoubleSide}
                blending={THREE.AdditiveBlending}
            />
        </mesh>
    );
};


const AuroraView = () => {
    const navigate = useNavigate();

    return (
        <div style={{ width: '100vw', height: '100vh', background: '#000', position: 'relative' }}>
            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                style={{
                    position: 'absolute',
                    top: '100px', // Below header
                    left: '20px',
                    zIndex: 10,
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    backdropFilter: 'blur(5px)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontWeight: 600
                }}
            >
                ← Back
            </button>

            {/* Title */}
            <div style={{
                position: 'absolute',
                top: '100px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 10,
                textAlign: 'center',
                pointerEvents: 'none'
            }}>
                <h1 style={{
                    color: '#00ff88',
                    textShadow: '0 0 20px rgba(0, 255, 136, 0.5)',
                    fontSize: '2.5rem',
                    margin: 0,
                    fontWeight: 300,
                    letterSpacing: '4px'
                }}>AURORA BOREALIS</h1>
                <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: '8px' }}>Live Simulation</p>
            </div>


            <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                <color attach="background" args={['#050510']} />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                <ambientLight intensity={0.1} />
                <directionalLight position={[5, 3, 5]} intensity={1.5} />

                <Suspense fallback={null}>
                    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                        <Earth />
                        <AuroraBorealis />
                    </Float>
                </Suspense>

                <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI - Math.PI / 4} />
            </Canvas>

            {/* Info Card */}
            <div style={{
                position: 'absolute',
                bottom: '40px',
                right: '40px',
                maxWidth: '300px',
                background: 'rgba(0, 20, 40, 0.8)',
                padding: '20px',
                borderRadius: '16px',
                border: '1px solid rgba(0, 255, 136, 0.3)',
                color: 'white',
                backdropFilter: 'blur(10px)'
            }}>
                <h3 style={{ color: '#00ff88', margin: '0 0 10px 0' }}>Northern Lights</h3>
                <p style={{ fontSize: '14px', lineHeight: '1.5', color: 'rgba(255,255,255,0.8)' }}>
                    Auroras are produced when the magnetosphere is sufficiently disturbed by the solar wind.
                    The trajectories of charged particles in both solar wind and magnetospheric plasma are perturbed by the magnetic and electric fields.
                </p>
            </div>
        </div>
    );
};

export default AuroraView;
