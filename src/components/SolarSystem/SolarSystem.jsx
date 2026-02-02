import { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import InfoPanel from './InfoPanel';
import { planetsData, sunInfo } from './planetData';
import './SolarSystem.css';

// Create realistic planet texture
function createRealisticTexture(data) {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 2048;
    const ctx = canvas.getContext('2d');

    if (data.isAsteroidBelt) {
        // Asteroid belt visualization
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, 2048, 2048);

        // Draw many small asteroids
        for (let i = 0; i < 500; i++) {
            const x = Math.random() * 2048;
            const y = Math.random() * 2048;
            const size = Math.random() * 8 + 2;

            ctx.fillStyle = data.texture.base;
            ctx.globalAlpha = Math.random() * 0.8 + 0.2;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.globalAlpha = 1;

        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        return texture;
    }

    // Planet-specific realistic textures
    const centerX = 1024;
    const centerY = 1024;
    const radius = 1024;

    if (data.id === 'earth') {
        // Deep ocean base
        const oceanGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
        oceanGradient.addColorStop(0, '#1E90FF');
        oceanGradient.addColorStop(0.7, '#0066CC');
        oceanGradient.addColorStop(1, '#003366');
        ctx.fillStyle = oceanGradient;
        ctx.fillRect(0, 0, 2048, 2048);

        // Continents with realistic shapes
        ctx.fillStyle = '#228B22';
        for (let i = 0; i < 12; i++) {
            ctx.save();
            ctx.translate(Math.random() * 2048, Math.random() * 2048);
            ctx.rotate(Math.random() * Math.PI * 2);
            ctx.beginPath();
            for (let j = 0; j < 25; j++) {
                const angle = (j / 25) * Math.PI * 2;
                const r = 150 + Math.random() * 100;
                ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
            }
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }

        // Ice caps
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, 2048, 120);
        ctx.fillRect(0, 1928, 2048, 120);

        // Clouds
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        for (let i = 0; i < 60; i++) {
            const x = Math.random() * 2048;
            const y = Math.random() * 2048;
            const w = Math.random() * 150 + 100;
            const h = Math.random() * 80 + 40;
            ctx.beginPath();
            ctx.ellipse(x, y, w, h, Math.random() * Math.PI, 0, Math.PI * 2);
            ctx.fill();
        }
    } else if (data.id === 'jupiter') {
        // Atmospheric bands
        for (let y = 0; y < 2048; y += 100) {
            const colors = ['#C88B3A', '#D4A574', '#B8864F', '#E0C097', '#A67C52'];
            ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
            ctx.fillRect(0, y, 2048, 100);

            // Turbulence in bands
            for (let i = 0; i < 20; i++) {
                ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
                ctx.globalAlpha = 0.5;
                ctx.fillRect(Math.random() * 2048, y + Math.random() * 100, Math.random() * 200, Math.random() * 30);
            }
            ctx.globalAlpha = 1;
        }

        // Great Red Spot
        const grsGradient = ctx.createRadialGradient(1400, 1200, 0, 1400, 1200, 120);
        grsGradient.addColorStop(0, '#E07040');
        grsGradient.addColorStop(0.5, '#C85030');
        grsGradient.addColorStop(1, '#A04020');
        ctx.fillStyle = grsGradient;
        ctx.beginPath();
        ctx.ellipse(1400, 1200, 120, 90, 0, 0, Math.PI * 2);
        ctx.fill();
    } else if (data.id === 'saturn') {
        // Subtle bands
        for (let y = 0; y < 2048; y += 80) {
            const colors = ['#FAD5A5', '#F0D0A0', '#E8C89F', '#F5E0B8', '#EDD5A8'];
            ctx.fillStyle = colors[Math.floor(y / 80) % colors.length];
            ctx.fillRect(0, y, 2048, 80);
        }

        // Swirls
        for (let i = 0; i < 40; i++) {
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(Math.random() * 2048, Math.random() * 2048, Math.random() * 100 + 50, 0, Math.PI);
            ctx.stroke();
        }
    } else if (data.id === 'mars') {
        // Rust-colored base
        const marsGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
        marsGradient.addColorStop(0, '#E27B58');
        marsGradient.addColorStop(1, '#8B4513');
        ctx.fillStyle = marsGradient;
        ctx.fillRect(0, 0, 2048, 2048);

        // Dark regions
        ctx.fillStyle = '#654321';
        for (let i = 0; i < 15; i++) {
            ctx.globalAlpha = 0.6;
            ctx.beginPath();
            ctx.arc(Math.random() * 2048, Math.random() * 2048, Math.random() * 200 + 100, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.globalAlpha = 1;

        // Craters
        for (let i = 0; i < 80; i++) {
            const x = Math.random() * 2048;
            const y = Math.random() * 2048;
            const r = Math.random() * 40 + 10;

            ctx.fillStyle = '#5C3317';
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fill();

            ctx.strokeStyle = '#8B6914';
            ctx.lineWidth = 2;
            ctx.stroke();
        }

        // Ice caps
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, 2048, 100);
        ctx.fillRect(0, 1948, 2048, 100);
    } else if (data.id === 'mercury') {
        // Gray cratered surface
        const mercuryGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
        mercuryGradient.addColorStop(0, '#A0A0A0');
        mercuryGradient.addColorStop(1, '#606060');
        ctx.fillStyle = mercuryGradient;
        ctx.fillRect(0, 0, 2048, 2048);

        // Heavy cratering
        for (let i = 0; i < 100; i++) {
            const x = Math.random() * 2048;
            const y = Math.random() * 2048;
            const r = Math.random() * 50 + 15;

            ctx.fillStyle = '#707070';
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fill();

            ctx.strokeStyle = '#909090';
            ctx.lineWidth = 3;
            ctx.stroke();
        }
    } else if (data.id === 'venus') {
        // Thick yellowish atmosphere
        const venusGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
        venusGradient.addColorStop(0, '#FFC870');
        venusGradient.addColorStop(1, '#E8B060');
        ctx.fillStyle = venusGradient;
        ctx.fillRect(0, 0, 2048, 2048);

        // Swirling clouds
        for (let i = 0; i < 70; i++) {
            ctx.fillStyle = 'rgba(255, 255, 200, 0.3)';
            ctx.beginPath();
            ctx.ellipse(
                Math.random() * 2048,
                Math.random() * 2048,
                Math.random() * 150 + 80,
                Math.random() * 100 + 50,
                Math.random() * Math.PI,
                0,
                Math.PI * 2
            );
            ctx.fill();
        }
    } else if (data.id === 'uranus') {
        // Cyan ice giant
        const uranusGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
        uranusGradient.addColorStop(0, '#4FD0E0');
        uranusGradient.addColorStop(1, '#2A9BA8');
        ctx.fillStyle = uranusGradient;
        ctx.fillRect(0, 0, 2048, 2048);

        // Subtle features
        for (let i = 0; i < 25; i++) {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.beginPath();
            ctx.arc(Math.random() * 2048, Math.random() * 2048, Math.random() * 80 + 40, 0, Math.PI * 2);
            ctx.fill();
        }
    } else if (data.id === 'neptune') {
        // Deep blue
        const neptuneGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
        neptuneGradient.addColorStop(0, '#4169E1');
        neptuneGradient.addColorStop(1, '#1E3A8A');
        ctx.fillStyle = neptuneGradient;
        ctx.fillRect(0, 0, 2048, 2048);

        // Atmospheric bands
        for (let y = 0; y < 2048; y += 130) {
            ctx.fillStyle = 'rgba(100, 149, 237, 0.3)';
            ctx.fillRect(0, y, 2048, 65);
        }

        // Great Dark Spot
        ctx.fillStyle = '#0F1E3A';
        ctx.beginPath();
        ctx.ellipse(1200, 900, 120, 90, 0, 0, Math.PI * 2);
        ctx.fill();
    } else if (data.id === 'pluto') {
        // Tan/brown base
        const plutoGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
        plutoGradient.addColorStop(0, '#D4C4B4');
        plutoGradient.addColorStop(1, '#8B7355');
        ctx.fillStyle = plutoGradient;
        ctx.fillRect(0, 0, 2048, 2048);

        // Dark regions
        for (let i = 0; i < 8; i++) {
            ctx.fillStyle = '#6B5D52';
            ctx.globalAlpha = 0.7;
            ctx.beginPath();
            ctx.arc(Math.random() * 2048, Math.random() * 2048, Math.random() * 250 + 150, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.globalAlpha = 1;

        // Tombaugh Regio (heart)
        ctx.fillStyle = '#E8D8C8';
        ctx.beginPath();
        ctx.moveTo(1024, 900);
        ctx.bezierCurveTo(1024, 800, 900, 750, 850, 850);
        ctx.bezierCurveTo(800, 900, 800, 1000, 1024, 1150);
        ctx.bezierCurveTo(1248, 1000, 1248, 900, 1198, 850);
        ctx.bezierCurveTo(1148, 750, 1024, 800, 1024, 900);
        ctx.fill();
    } else {
        // Generic planet
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
        gradient.addColorStop(0, data.color);
        gradient.addColorStop(1, data.texture?.dark || '#000000');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 2048, 2048);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
}

// Celestial Body Component
function CelestialBody({ data, isCurrent }) {
    const meshRef = useRef();
    const texture = createRealisticTexture(data);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.002;
        }
    });

    if (data.isAsteroidBelt) {
        // Render asteroid belt as a ring of particles
        return (
            <group>
                {[...Array(200)].map((_, i) => {
                    const angle = (i / 200) * Math.PI * 2;
                    const distance = 8 + Math.random() * 4;
                    const x = Math.cos(angle) * distance;
                    const z = Math.sin(angle) * distance;
                    const y = (Math.random() - 0.5) * 2;
                    const size = Math.random() * 0.1 + 0.05;

                    return (
                        <mesh key={i} position={[x, y, z]}>
                            <sphereGeometry args={[size, 8, 8]} />
                            <meshStandardMaterial color={data.color} roughness={0.9} />
                        </mesh>
                    );
                })}
            </group>
        );
    }

    const scale = isCurrent ? data.size * 4 : data.size * 3;

    return (
        <group>
            <mesh ref={meshRef} scale={scale}>
                <sphereGeometry args={[1, 64, 64]} />
                <meshStandardMaterial
                    map={texture}
                    roughness={0.7}
                    metalness={0.1}
                />
            </mesh>

            {/* Atmospheric glow for gas giants */}
            {['jupiter', 'saturn', 'uranus', 'neptune'].includes(data.id) && (
                <mesh scale={scale * 1.05}>
                    <sphereGeometry args={[1, 64, 64]} />
                    <meshBasicMaterial
                        color={data.color}
                        transparent
                        opacity={0.15}
                        side={THREE.BackSide}
                    />
                </mesh>
            )}

            {/* Saturn's rings */}
            {data.id === 'saturn' && (
                <>
                    <mesh rotation={[Math.PI / 2.2, 0, 0]} scale={scale}>
                        <ringGeometry args={[1.5, 2.5, 128]} />
                        <meshStandardMaterial
                            color="#C9B896"
                            side={THREE.DoubleSide}
                            transparent
                            opacity={0.8}
                        />
                    </mesh>
                    <mesh rotation={[Math.PI / 2.2, 0, 0]} scale={scale}>
                        <ringGeometry args={[1.8, 2.2, 128]} />
                        <meshStandardMaterial
                            color="#8B7355"
                            side={THREE.DoubleSide}
                            transparent
                            opacity={0.6}
                        />
                    </mesh>
                </>
            )}
        </group>
    );
}

// Sun Component
function Sun({ isCurrent }) {
    const sunRef = useRef();

    useFrame(() => {
        if (sunRef.current) {
            sunRef.current.rotation.y += 0.001;
        }
    });

    const scale = isCurrent ? 3 : 2.5;

    return (
        <group>
            <mesh ref={sunRef} scale={scale}>
                <sphereGeometry args={[1, 64, 64]} />
                <meshBasicMaterial color="#FDB813" />
                <pointLight intensity={3} distance={200} decay={2} />
            </mesh>

            <mesh scale={scale * 1.15}>
                <sphereGeometry args={[1, 64, 64]} />
                <meshBasicMaterial color="#FDB813" transparent opacity={0.4} />
            </mesh>

            <mesh scale={scale * 1.3}>
                <sphereGeometry args={[1, 64, 64]} />
                <meshBasicMaterial color="#FFD700" transparent opacity={0.2} />
            </mesh>
        </group>
    );
}

function SolarSystem() {
    // Create celestial bodies array: Sun + Planets
    const celestialBodies = [
        { id: 'sun', name: 'The Sun', isSun: true },
        ...planetsData
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const currentBody = celestialBodies[currentIndex];

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
            <Canvas camera={{ position: [0, 5, 15], fov: 60 }} className="solar-system-canvas">
                <Stars radius={300} depth={60} count={7000} factor={5} saturation={0} fade speed={1} />
                <ambientLight intensity={0.5} />

                {currentBody.isSun ? (
                    <Sun isCurrent={true} />
                ) : (
                    <CelestialBody data={currentBody} isCurrent={true} />
                )}

                <OrbitControls
                    enablePan={true}
                    enableZoom={true}
                    enableRotate={true}
                    minDistance={5}
                    maxDistance={30}
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
                    <span className="nav-text">Previous</span>
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
                    <span className="progress-text">
                        {currentIndex + 1} / {celestialBodies.length}
                    </span>
                </div>

                <button
                    className="nav-button next-button"
                    onClick={handleNext}
                    disabled={currentIndex === celestialBodies.length - 1}
                >
                    <span className="nav-text">Next</span>
                    <span className="nav-arrow">→</span>
                </button>
            </div>

            {/* Information Panel */}
            <InfoPanel
                selectedPlanet={currentBody.isSun ? null : currentBody}
                selectedSun={currentBody.isSun}
                onBack={() => { }}
            />
        </div>
    );
}

export default SolarSystem;
