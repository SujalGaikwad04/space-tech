import { useState, useRef, useEffect, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, useTexture, Html, Ring } from '@react-three/drei';
import * as THREE from 'three';
import InfoPanel from './InfoPanel';
import { planetsData } from './planetData';
import './SolarSystem.css';

// Pre-load textures to avoid flicker
const TextureLoader = ({ data, isCurrent, isMobile }) => {
    const meshRef = useRef();

    // Map texture IDs to file paths
    const textureMap = {
        sun: '/assets/textures/sun.jpg',
        mercury: '/assets/textures/mercury.jpg',
        venus: '/assets/textures/venus.jpg',
        earth: '/assets/textures/earth.jpg',
        moon: '/assets/textures/moon.jpg',
        mars: '/assets/textures/mars.jpg',
        jupiter: '/assets/textures/jupiter.jpg',
        saturn: '/assets/textures/saturn.jpg',
        uranus: '/assets/textures/uranus.jpg',
        neptune: '/assets/textures/neptune.jpg',
        pluto: '/assets/textures/moon.jpg', // Fallback for Pluto
        'asteroid-belt': '/assets/textures/moon.jpg' // Not used but mapped
    };

    // Load texture
    const texturePath = textureMap[data.id] || textureMap.mercury;

    // Special handling for Earth clouds and Venus atmosphere
    const [colorMap, cloudsMap, ringMap] = useTexture([
        texturePath,
        data.id === 'earth' ? '/assets/textures/earth_clouds.jpg' :
            data.id === 'venus' ? '/assets/textures/venus_atmosphere.jpg' : null,
        data.id === 'saturn' ? '/assets/textures/saturn_ring.png' : null
    ].filter(Boolean));

    useFrame(() => {
        if (meshRef.current) {
            // Rotational and orbital logic
            meshRef.current.rotation.y += data.rotationSpeed || 0.002;
        }
    });

    const baseScale = isMobile ? data.size * 2.5 : data.size * 3;
    const currentScale = isCurrent ? baseScale * 1.3 : baseScale;

    if (data.isAsteroidBelt) {
        return (
            <group>
                {[...Array(isMobile ? 150 : 300)].map((_, i) => {
                    const angle = (i / (isMobile ? 150 : 300)) * Math.PI * 2;
                    const distance = 12 + Math.random() * 6; // Wider belt
                    const x = Math.cos(angle) * distance;
                    const z = Math.sin(angle) * distance;
                    const y = (Math.random() - 0.5) * 3;
                    const size = Math.random() * 0.15 + 0.05;

                    return (
                        <mesh key={i} position={[x, y, z]}>
                            <dodecahedronGeometry args={[size, 0]} />
                            <meshStandardMaterial
                                color="#8B7355"
                                roughness={0.8}
                                metalness={0.2}
                            />
                        </mesh>
                    );
                })}
            </group>
        );
    }

    return (
        <group>
            {/* Main Planet Body */}
            <mesh ref={meshRef} scale={currentScale}>
                <sphereGeometry args={[1, 64, 64]} />
                <meshStandardMaterial
                    map={colorMap}
                    roughness={data.id === 'earth' ? 0.5 : 0.7}
                    metalness={data.id === 'earth' ? 0.1 : 0.05}
                />
            </mesh>

            {/* Atmosphere/Clouds (Earth & Venus) */}
            {(data.id === 'earth' || data.id === 'venus') && cloudsMap && (
                <mesh scale={currentScale * 1.02}>
                    <sphereGeometry args={[1, 64, 64]} />
                    <meshStandardMaterial
                        map={cloudsMap}
                        transparent
                        opacity={data.id === 'venus' ? 0.8 : 0.4}
                        depthWrite={false}
                        side={THREE.DoubleSide}
                        blending={THREE.AdditiveBlending}
                    />
                </mesh>
            )}

            {/* Saturn's Rings */}
            {data.id === 'saturn' && ringMap && (
                <mesh rotation={[-Math.PI / 2.5, 0, 0]} scale={currentScale}>
                    <ringGeometry args={[1.4, 2.3, 128]} />
                    <meshStandardMaterial
                        map={ringMap}
                        color="#C9B896"
                        side={THREE.DoubleSide}
                        transparent
                        opacity={0.9}
                    />
                </mesh>
            )}

            {/* Atmospheric Glow (Fresnel-like effect) */}
            {['earth', 'venus', 'mars', 'jupiter', 'saturn', 'neptune', 'uranus'].includes(data.id) && (
                <mesh scale={currentScale * 1.05}>
                    <sphereGeometry args={[1, 32, 32]} />
                    <meshBasicMaterial
                        color={data.color}
                        transparent
                        opacity={0.15}
                        side={THREE.BackSide}
                        blending={THREE.AdditiveBlending}
                    />
                </mesh>
            )}
        </group>
    );
};

// Sun Component with enhanced glow
const Sun = ({ isCurrent, isMobile }) => {
    const sunRef = useRef();
    const sunTexture = useTexture('/assets/textures/sun.jpg');

    useFrame((state) => {
        if (sunRef.current) {
            sunRef.current.rotation.y += 0.001;
            // Pulsing effect
            const scale = 1 + Math.sin(state.clock.elapsedTime) * 0.005;
            sunRef.current.scale.set(scale, scale, scale);
        }
    });

    const baseScale = isMobile ? 2.5 : 3.5; // Larger sun
    const currentScale = isCurrent ? baseScale * 1.1 : baseScale;

    return (
        <group scale={currentScale}>
            {/* Core Sun */}
            <mesh ref={sunRef}>
                <sphereGeometry args={[1, 64, 64]} />
                <meshBasicMaterial map={sunTexture} />
                <pointLight intensity={2.5} distance={150} decay={1.5} color="#fff5d6" />
            </mesh>

            {/* Inner Glow */}
            <mesh scale={1.05}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshBasicMaterial color="#FFD700" transparent opacity={0.3} blending={THREE.AdditiveBlending} side={THREE.BackSide} />
            </mesh>

            {/* Outer Corona Glow */}
            <mesh scale={1.2}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshBasicMaterial color="#FF8C00" transparent opacity={0.15} blending={THREE.AdditiveBlending} side={THREE.BackSide} />
            </mesh>

            {/* Extended Rays/Corona */}
            <mesh scale={1.5}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshBasicMaterial color="#FF4500" transparent opacity={0.05} blending={THREE.AdditiveBlending} side={THREE.BackSide} />
            </mesh>
        </group>
    );
};

// Loading fallback
const Loader = () => (
    <Html center>
        <div className="loading-spinner">Loading Solar System...</div>
    </Html>
);


function SolarSystem() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const celestialBodies = [
        { id: 'sun', name: 'The Sun', isSun: true },
        ...planetsData
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const currentBody = celestialBodies[currentIndex];

    // Camera control refs
    const controlsRef = useRef();

    const handleNext = () => {
        if (currentIndex < celestialBodies.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    return (
        <div className="solar-system-container">
            {/* 3D Canvas */}
            <Canvas
                camera={{
                    position: isMobile ? [0, 8, 20] : [0, 5, 18],
                    fov: isMobile ? 60 : 45
                }}
                className="solar-system-canvas"
                dpr={[1, 2]} // Support high-DPI displays
                gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, outputColorSpace: THREE.SRGBColorSpace }}
            >
                {/* Space Environment */}
                <color attach="background" args={['#000000']} />
                <Stars radius={300} depth={60} count={isMobile ? 3000 : 8000} factor={4} saturation={0.5} fade speed={0.5} />

                {/* Lighting */}
                <ambientLight intensity={0.1} color="#404040" /> {/* Very dim ambient space light */}
                {/* We rely on the Sun's point light for main illumination */}

                <Suspense fallback={<Loader />}>
                    {currentBody.isSun ? (
                        <Sun isCurrent={true} isMobile={isMobile} />
                    ) : (
                        <>
                            {/* Directional light to mimic sunlight coming from a specific direction relative to the planet */}
                            <directionalLight position={[5, 2, 5]} intensity={1.5} castShadow />
                            <TextureLoader data={currentBody} isCurrent={true} isMobile={isMobile} />
                        </>
                    )}
                </Suspense>

                <OrbitControls
                    ref={controlsRef}
                    enablePan={false}
                    enableZoom={true}
                    enableRotate={true}
                    minDistance={5}
                    maxDistance={isMobile ? 50 : 40}
                    target={[0, 0, 0]}
                    autoRotate={currentBody.isSun} // Auto rotate only for Sun view for cinematic effect
                    autoRotateSpeed={0.5}
                />
            </Canvas>

            {/* Navigation Controls */}
            <div className="navigation-controls">
                <button
                    className="nav-button prev-button"
                    onClick={handlePrevious}
                    disabled={currentIndex === 0}
                >
                    <span className="nav-arrow">←</span>
                    {!isMobile && <span className="nav-text">Previous</span>}
                </button>

                <div className="progress-indicator">
                    <span className="current-body-name">{currentBody.name}</span>
                    <div className="progress-dots">
                        {celestialBodies.map((body, index) => (
                            <div
                                key={body.id}
                                className={`progress-dot ${index === currentIndex ? 'active' : ''} ${index < currentIndex ? 'completed' : ''}`}
                                onClick={() => setCurrentIndex(index)}
                                title={body.name}
                            />
                        ))}
                    </div>
                    {!isMobile && (
                        <span className="progress-text">
                            {currentIndex + 1} / {celestialBodies.length}
                        </span>
                    )}
                </div>

                <button
                    className="nav-button next-button"
                    onClick={handleNext}
                    disabled={currentIndex === celestialBodies.length - 1}
                >
                    {!isMobile && <span className="nav-text">Next</span>}
                    <span className="nav-arrow">→</span>
                </button>
            </div>

            {/* Information Panel */}
            <div className={`info-panel-mobile-wrapper ${isMobile ? 'mobile' : ''}`}>
                <InfoPanel
                    selectedPlanet={currentBody.isSun ? null : currentBody}
                    selectedSun={currentBody.isSun}
                    onBack={() => { }}
                />
            </div>
        </div>
    );
}

export default SolarSystem;
