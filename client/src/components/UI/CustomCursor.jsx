import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'

export default function CustomCursor() {
    const cursorRef = useRef(null)
    const [isClicking, setIsClicking] = useState(false)
    const [isHovering, setIsHovering] = useState(false)

    useEffect(() => {
        const cursor = cursorRef.current

        // Hide default cursor
        document.body.style.cursor = 'none'

        const moveCursor = (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: 'power2.out'
            })
        }

        const handleMouseDown = () => setIsClicking(true)
        const handleMouseUp = () => setIsClicking(false)

        // Check for hoverable elements
        const handleMouseOver = (e) => {
            if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || e.target.closest('.cursor-pointer')) {
                setIsHovering(true)
            } else {
                setIsHovering(false)
            }
        }

        window.addEventListener('mousemove', moveCursor)
        window.addEventListener('mousedown', handleMouseDown)
        window.addEventListener('mouseup', handleMouseUp)
        window.addEventListener('mouseover', handleMouseOver)

        return () => {
            document.body.style.cursor = 'auto'
            window.removeEventListener('mousemove', moveCursor)
            window.removeEventListener('mousedown', handleMouseDown)
            window.removeEventListener('mouseup', handleMouseUp)
            window.removeEventListener('mouseover', handleMouseOver)
        }
    }, [])

    return (
        <div
            ref={cursorRef}
            className="fixed top-0 left-0 z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2 font-mono font-bold text-neon-cyan mix-blend-difference"
        >
            <motion.div
                animate={{
                    scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
                    rotate: isClicking ? -15 : 0
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative"
            >
                <span className="text-xl">{'</>'}</span>

                {/* Glow backing */}
                <div className="absolute inset-0 bg-neon-cyan blur-lg opacity-40 rounded-full scale-150 -z-10"></div>
            </motion.div>
        </div>
    )
}
