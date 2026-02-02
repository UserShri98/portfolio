import { useRef, useMemo, useState, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Text, Float, Trail, Stars, Sparkles, TorusKnot, Icosahedron, Sphere } from '@react-three/drei'
import * as THREE from 'three'

function CyberShape() {
    const mesh = useRef()
    const mesh2 = useRef()
    const groupRef = useRef()
    const [scrollY, setScrollY] = useState(0)

    // Track scroll position
    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useFrame((state) => {
        const time = state.clock.getElapsedTime()

        if (mesh.current) {
            mesh.current.rotation.x = time * 0.4
            mesh.current.rotation.y = time * 0.5
        }
        if (mesh2.current) {
            mesh2.current.rotation.x = -time * 0.2
            mesh2.current.rotation.y = -time * 0.2
        }

        // Horizontal parallax based on scroll - starts from center
        if (groupRef.current) {
            // Smooth continuous movement from the start
            const movementFactor = scrollY / 500

            // Sine wave for left-right movement
            const xPosition = Math.sin(movementFactor) * 6

            // Cosine wave for up-down movement (offset to start at 0)
            const yPosition = (Math.cos(movementFactor) - 1) * 1.5

            groupRef.current.position.x = xPosition
            groupRef.current.position.y = yPosition
        }
    })

    // Centered position for maximum visibility
    return (
        <group ref={groupRef} position={[0, 0, -2]} scale={1.8}>
            {/* Main Core: Glowing Torus Knot */}
            <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                <TorusKnot ref={mesh} args={[1, 0.3, 128, 16]}>
                    <meshStandardMaterial
                        color="#000000"
                        roughness={0.1}
                        metalness={1}
                        emissive="#fcd34d" // Light Golden
                        emissiveIntensity={1}
                        wireframe
                    />
                </TorusKnot>
            </Float>

            {/* Outer Shell: Transparent Icosahedron */}
            <Float speed={3} rotationIntensity={2} floatIntensity={1}>
                <Icosahedron ref={mesh2} args={[2.2, 1]}>
                    <meshStandardMaterial
                        color="#fbbf24" // Gold
                        roughness={0}
                        metalness={0.5}
                        transparent
                        opacity={0.15}
                        wireframe
                        side={THREE.DoubleSide}
                    />
                </Icosahedron>
            </Float>

            {/* Intense Core Light */}
            <pointLight color="#fcd34d" intensity={8} distance={15} />
            <pointLight color="#b45309" intensity={5} distance={20} position={[2, 2, 2]} />
        </group>
    )
}

function FloatingDetails({ count = 40 }) {
    // Floating tech details around the scene
    const items = useMemo(() => {
        return new Array(count).fill(0).map(() => ({
            position: [
                (Math.random() - 0.5) * 30, // Spread wide
                (Math.random() - 0.5) * 30,
                (Math.random() - 0.5) * 15 - 5
            ],
            scale: Math.random() * 0.5 + 0.1,
            speed: Math.random() * 0.02
        }))
    }, [count])

    const group = useRef()
    useFrame(() => {
        if (group.current) {
            group.current.rotation.y -= 0.001
        }
    })

    return (
        <group ref={group}>
            {items.map((item, i) => (
                <mesh key={i} position={item.position} scale={item.scale}>
                    <octahedronGeometry args={[0.5]} />
                    <meshBasicMaterial color="#333" wireframe transparent opacity={0.3} />
                </mesh>
            ))}
        </group>
    )

}

function ClickSplash() {
    const [splashes, setSplashes] = useState([])
    const { viewport } = useThree()

    useEffect(() => {
        const handleClick = (e) => {
            const x = (e.clientX / window.innerWidth) * viewport.width - viewport.width / 2
            const y = -(e.clientY / window.innerHeight) * viewport.height + viewport.height / 2

            const id = Date.now()
            setSplashes(prev => [...prev, { id, x, y }])
            setTimeout(() => {
                setSplashes(prev => prev.filter(s => s.id !== id))
            }, 1000)
        }
        window.addEventListener('click', handleClick)
        return () => window.removeEventListener('click', handleClick)
    }, [viewport])

    return (
        <>
            {splashes.map(splash => (
                <group key={splash.id} position={[splash.x, splash.y, 0]}>
                    <Sparkles count={30} scale={3} size={10} speed={2} opacity={1} color="#fbbf24" />
                </group>
            ))}
        </>
    )
}

export default function GlobalEffects() {
    return (
        <>
            <color attach="background" args={['#050505']} />
            {/* Enhanced Stars for Rich Background */}
            <Stars radius={100} depth={50} count={8000} factor={5} saturation={0} fade speed={1} />
            <Stars radius={150} depth={80} count={2000} factor={3} saturation={0} fade speed={0.5} />

            <CyberShape />
            <FloatingDetails />
            <ClickSplash />

            {/* Subtler Lighting */}
            <ambientLight intensity={0.2} />
            <spotLight position={[10, 10, 10]} stroke={1} intensity={1} color="#ffffff" />
        </>
    )
}
