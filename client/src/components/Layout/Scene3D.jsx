import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { PerspectiveCamera } from '@react-three/drei'
import GlobalEffects from './GlobalEffects'

export default function Scene3D() {
    return (
        <div className="canvas-container fixed top-0 left-0 w-full h-full -z-10">
            <Canvas
                gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
                dpr={[1, 1.5]}
            >
                <PerspectiveCamera makeDefault position={[0, 0, 8]} />
                <Suspense fallback={null}>
                    <GlobalEffects />
                </Suspense>
            </Canvas>
        </div>
    )
}
