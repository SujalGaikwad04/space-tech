import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Planet({ data, onClick, isSelected }) {
    const meshRef = useRef();
    const [hovered, setHovered] = useState(false);

    // Rotate the planet
    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += data.rotationSpeed;
        }
    });

    // Create highly detailed textured material based on planet data
    const createPlanetMaterial = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 1024; // Increased resolution for better detail
        canvas.height = 1024;
        const ctx = canvas.getContext('2d');

        if (data.id === 'earth') {
            // Earth with detailed continents, oceans, and clouds
            // Ocean base
            const oceanGradient = ctx.createRadialGradient(512, 512, 0, 512, 512, 512);
            oceanGradient.addColorStop(0, '#1E90FF');
            oceanGradient.addColorStop(0.5, '#4169E1');
            oceanGradient.addColorStop(1, '#000080');
            ctx.fillStyle = oceanGradient;
            ctx.fillRect(0, 0, 1024, 1024);

            // Continents (irregular shapes)
            ctx.fillStyle = '#228B22';
            for (let i = 0; i < 8; i++) {
                ctx.beginPath();
                const x = Math.random() * 1024;
                const y = Math.random() * 1024;
                for (let j = 0; j < 20; j++) {
                    const angle = (j / 20) * Math.PI * 2;
                    const radius = 80 + Math.random() * 100;
                    ctx.lineTo(x + Math.cos(angle) * radius, y + Math.sin(angle) * radius);
                }
                ctx.closePath();
                ctx.fill();
            }

            // Ice caps
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, 1024, 80);
            ctx.fillRect(0, 944, 1024, 80);

            // Clouds
            ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
            for (let i = 0; i < 40; i++) {
                ctx.beginPath();
                ctx.arc(Math.random() * 1024, Math.random() * 1024, Math.random() * 40 + 20, 0, Math.PI * 2);
                ctx.fill();
            }
        } else if (data.id === 'jupiter') {
            // Jupiter with detailed atmospheric bands and Great Red Spot
            const bandColors = ['#C88B3A', '#D4A574', '#B8864F', '#E5C29F', '#A67C52'];
            let y = 0;
            for (let i = 0; i < 20; i++) {
                const bandHeight = 1024 / 20;
                const color = bandColors[i % bandColors.length];
                ctx.fillStyle = color;
                ctx.fillRect(0, y, 1024, bandHeight);

                // Add turbulence to bands
                ctx.fillStyle = i % 2 === 0 ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
                for (let j = 0; j < 5; j++) {
                    ctx.beginPath();
                    ctx.arc(Math.random() * 1024, y + Math.random() * bandHeight, Math.random() * 20, 0, Math.PI * 2);
                    ctx.fill();
                }
                y += bandHeight;
            }

            // Great Red Spot
            const grs = ctx.createRadialGradient(700, 600, 0, 700, 600, 80);
            grs.addColorStop(0, '#FF6347');
            grs.addColorStop(0.5, '#CC6633');
            grs.addColorStop(1, '#8B4513');
            ctx.fillStyle = grs;
            ctx.beginPath();
            ctx.ellipse(700, 600, 100, 70, 0, 0, Math.PI * 2);
            ctx.fill();
        } else if (data.id === 'saturn') {
            // Saturn with subtle atmospheric bands
            const bandColors = ['#FAD5A5', '#F0D0A0', '#E8C89F', '#F5DDB0'];
            let y = 0;
            for (let i = 0; i < 25; i++) {
                const bandHeight = 1024 / 25;
                ctx.fillStyle = bandColors[i % bandColors.length];
                ctx.fillRect(0, y, 1024, bandHeight);
                y += bandHeight;
            }

            // Add subtle swirls
            ctx.fillStyle = 'rgba(255,255,255,0.15)';
            for (let i = 0; i < 30; i++) {
                ctx.beginPath();
                ctx.arc(Math.random() * 1024, Math.random() * 1024, Math.random() * 15, 0, Math.PI * 2);
                ctx.fill();
            }
        } else if (data.id === 'mars') {
            // Mars with detailed surface features
            const marsGradient = ctx.createRadialGradient(512, 512, 0, 512, 512, 512);
            marsGradient.addColorStop(0, '#E27B58');
            marsGradient.addColorStop(0.5, '#CD5C5C');
            marsGradient.addColorStop(1, '#A0522D');
            ctx.fillStyle = marsGradient;
            ctx.fillRect(0, 0, 1024, 1024);

            // Darker regions (Syrtis Major, etc.)
            ctx.fillStyle = 'rgba(139, 69, 19, 0.5)';
            for (let i = 0; i < 10; i++) {
                ctx.beginPath();
                const x = Math.random() * 1024;
                const y = Math.random() * 1024;
                for (let j = 0; j < 12; j++) {
                    const angle = (j / 12) * Math.PI * 2;
                    const radius = 50 + Math.random() * 80;
                    ctx.lineTo(x + Math.cos(angle) * radius, y + Math.sin(angle) * radius);
                }
                ctx.closePath();
                ctx.fill();
            }

            // Impact craters
            ctx.fillStyle = 'rgba(101, 67, 33, 0.6)';
            for (let i = 0; i < 50; i++) {
                ctx.beginPath();
                ctx.arc(Math.random() * 1024, Math.random() * 1024, Math.random() * 25 + 5, 0, Math.PI * 2);
                ctx.fill();
            }

            // Polar ice caps
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.fillRect(0, 0, 1024, 60);
            ctx.fillRect(0, 964, 1024, 60);
        } else if (data.id === 'mercury') {
            // Mercury with heavily cratered surface
            ctx.fillStyle = data.texture.base;
            ctx.fillRect(0, 0, 1024, 1024);

            // Large craters
            ctx.fillStyle = data.texture.crater;
            for (let i = 0; i < 60; i++) {
                const x = Math.random() * 1024;
                const y = Math.random() * 1024;
                const radius = Math.random() * 30 + 10;
                ctx.beginPath();
                ctx.arc(x, y, radius, 0, Math.PI * 2);
                ctx.fill();

                // Crater rim
                ctx.strokeStyle = '#9B8B7E';
                ctx.lineWidth = 2;
                ctx.stroke();
            }
        } else if (data.id === 'venus') {
            // Venus with thick cloud patterns
            const venusGradient = ctx.createRadialGradient(512, 512, 0, 512, 512, 512);
            venusGradient.addColorStop(0, '#FFF4E6');
            venusGradient.addColorStop(0.5, '#FFC649');
            venusGradient.addColorStop(1, '#E8B048');
            ctx.fillStyle = venusGradient;
            ctx.fillRect(0, 0, 1024, 1024);

            // Swirling cloud patterns
            ctx.fillStyle = 'rgba(232, 176, 72, 0.5)';
            for (let i = 0; i < 50; i++) {
                ctx.beginPath();
                const x = Math.random() * 1024;
                const y = Math.random() * 1024;
                ctx.arc(x, y, Math.random() * 40 + 20, 0, Math.PI * 2);
                ctx.fill();
            }
        } else if (data.id === 'uranus') {
            // Uranus with smooth cyan atmosphere
            const uranusGradient = ctx.createRadialGradient(512, 512, 0, 512, 512, 512);
            uranusGradient.addColorStop(0, '#7FE5F0');
            uranusGradient.addColorStop(0.5, '#4FD0E7');
            uranusGradient.addColorStop(1, '#3BA8C0');
            ctx.fillStyle = uranusGradient;
            ctx.fillRect(0, 0, 1024, 1024);

            // Subtle atmospheric features
            ctx.fillStyle = 'rgba(127, 229, 240, 0.3)';
            for (let i = 0; i < 20; i++) {
                ctx.beginPath();
                ctx.arc(Math.random() * 1024, Math.random() * 1024, Math.random() * 30, 0, Math.PI * 2);
                ctx.fill();
            }
        } else if (data.id === 'neptune') {
            // Neptune with deep blue atmosphere and dark spots
            const neptuneGradient = ctx.createRadialGradient(512, 512, 0, 512, 512, 512);
            neptuneGradient.addColorStop(0, '#5A7FFF');
            neptuneGradient.addColorStop(0.5, '#4166F5');
            neptuneGradient.addColorStop(1, '#2E4A9F');
            ctx.fillStyle = neptuneGradient;
            ctx.fillRect(0, 0, 1024, 1024);

            // Great Dark Spot
            ctx.fillStyle = 'rgba(46, 74, 159, 0.7)';
            ctx.beginPath();
            ctx.ellipse(650, 450, 80, 60, 0, 0, Math.PI * 2);
            ctx.fill();

            // Atmospheric bands
            ctx.fillStyle = 'rgba(90, 127, 255, 0.2)';
            for (let i = 0; i < 15; i++) {
                ctx.fillRect(0, i * 68, 1024, 34);
            }
        } else if (data.id === 'pluto') {
            // Pluto with heart-shaped region (Tombaugh Regio)
            ctx.fillStyle = data.texture.base;
            ctx.fillRect(0, 0, 1024, 1024);

            // Dark regions
            ctx.fillStyle = data.texture.dark;
            for (let i = 0; i < 5; i++) {
                ctx.beginPath();
                const x = Math.random() * 1024;
                const y = Math.random() * 1024;
                for (let j = 0; j < 10; j++) {
                    const angle = (j / 10) * Math.PI * 2;
                    const radius = 60 + Math.random() * 60;
                    ctx.lineTo(x + Math.cos(angle) * radius, y + Math.sin(angle) * radius);
                }
                ctx.closePath();
                ctx.fill();
            }

            // Tombaugh Regio (heart shape)
            ctx.fillStyle = data.texture.heart;
            ctx.beginPath();
            const heartX = 600;
            const heartY = 500;
            ctx.moveTo(heartX, heartY);
            ctx.bezierCurveTo(heartX, heartY - 30, heartX - 50, heartY - 60, heartX - 50, heartY - 30);
            ctx.bezierCurveTo(heartX - 50, heartY, heartX, heartY + 30, heartX, heartY + 60);
            ctx.bezierCurveTo(heartX, heartY + 30, heartX + 50, heartY, heartX + 50, heartY - 30);
            ctx.bezierCurveTo(heartX + 50, heartY - 60, heartX, heartY - 30, heartX, heartY);
            ctx.fill();
        } else {
            // Default gradient for any other bodies
            const gradient = ctx.createRadialGradient(512, 512, 0, 512, 512, 512);
            gradient.addColorStop(0, data.color);
            gradient.addColorStop(1, '#000000');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 1024, 1024);
        }

        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;

        return new THREE.MeshStandardMaterial({
            map: texture,
            roughness: 0.8,
            metalness: 0.1,
            emissive: new THREE.Color(data.color),
            emissiveIntensity: 0.05,
        });
    };

    return (
        <group position={[data.distance, 0, 0]}>
            {/* Orbital path */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[data.distance - 0.05, data.distance + 0.05, 128]} />
                <meshBasicMaterial
                    color={data.isDwarfPlanet ? "#FFD700" : "#ffffff"}
                    opacity={data.isDwarfPlanet ? 0.15 : 0.1}
                    transparent
                />
            </mesh>

            {/* Planet with enhanced visuals */}
            <mesh
                ref={meshRef}
                onClick={(e) => {
                    e.stopPropagation();
                    onClick(data);
                }}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                scale={hovered ? 1.15 : 1}
            >
                <sphereGeometry args={[data.size, 64, 64]} />
                <primitive object={createPlanetMaterial()} attach="material" />
            </mesh>

            {/* Atmospheric glow for gas giants */}
            {(data.id === 'jupiter' || data.id === 'saturn' || data.id === 'uranus' || data.id === 'neptune') && (
                <mesh scale={1.1}>
                    <sphereGeometry args={[data.size, 64, 64]} />
                    <meshBasicMaterial
                        color={data.color}
                        opacity={0.15}
                        transparent
                        side={THREE.BackSide}
                    />
                </mesh>
            )}

            {/* Hover glow effect */}
            {hovered && (
                <mesh scale={1.2}>
                    <sphereGeometry args={[data.size, 64, 64]} />
                    <meshBasicMaterial
                        color={data.color}
                        opacity={0.3}
                        transparent
                        side={THREE.BackSide}
                    />
                </mesh>
            )}

            {/* Saturn's enhanced rings */}
            {data.hasRings && (
                <>
                    <mesh rotation={[Math.PI / 2.2, 0, 0]}>
                        <ringGeometry args={[data.size * 1.5, data.size * 2.5, 128]} />
                        <meshStandardMaterial
                            color="#C9B896"
                            opacity={0.7}
                            transparent
                            side={THREE.DoubleSide}
                            roughness={0.9}
                        />
                    </mesh>
                    {/* Ring shadow effect */}
                    <mesh rotation={[Math.PI / 2.2, 0, 0]}>
                        <ringGeometry args={[data.size * 1.8, data.size * 2.2, 128]} />
                        <meshBasicMaterial
                            color="#8B7355"
                            opacity={0.3}
                            transparent
                            side={THREE.DoubleSide}
                        />
                    </mesh>
                </>
            )}

            {/* Satellites (enhanced when planet is selected) */}
            {isSelected && data.satellites.map((satellite, index) => {
                const angle = (index / data.satellites.length) * Math.PI * 2;
                const orbitRadius = data.size + 1.5 + index * 0.7;
                return (
                    <group key={satellite.name}>
                        {/* Satellite orbit path */}
                        <mesh rotation={[Math.PI / 2, 0, 0]}>
                            <ringGeometry args={[orbitRadius - 0.02, orbitRadius + 0.02, 64]} />
                            <meshBasicMaterial color="#888888" opacity={0.3} transparent />
                        </mesh>
                        {/* Satellite */}
                        <mesh
                            position={[
                                Math.cos(angle) * orbitRadius,
                                0,
                                Math.sin(angle) * orbitRadius
                            ]}
                        >
                            <sphereGeometry args={[0.15, 16, 16]} />
                            <meshStandardMaterial color="#CCCCCC" roughness={0.8} />
                        </mesh>
                    </group>
                );
            })}
        </group>
    );
}

export default Planet;
