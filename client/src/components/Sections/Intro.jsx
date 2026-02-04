import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function Intro() {
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    })

    // Parallax effects
    const y = useTransform(scrollYProgress, [0, 1], [0, 200])
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

    return (
        <div ref={containerRef} id="intro" className="h-screen w-full relative overflow-hidden bg-transparent">

            {/* Chaotic Overlay */}
            {/* Chaotic Overlay Removed */}
            <div className="hidden"></div>

            {/* Content Layer */}
            <motion.div
                style={{ y, opacity, scale }}
                className="relative z-10 h-full flex flex-col justify-center items-center px-6 md:px-12 lg:px-24 pointer-events-none mix-blend-screen text-center"
            >

                <motion.div
                    initial={{ scale: 1.2, opacity: 0, filter: "blur(20px)" }}
                    animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative"
                >
                    <h1 className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-mono text-accent-primary tracking-[0.3em] md:tracking-[0.4em] uppercase mb-4 md:mb-6">
                        Software Developer
                    </h1>
                    <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-[7rem] font-display font-bold text-slate-100 leading-[0.85] uppercase">
                        Creative <br />
                        <span className="text-accent-primary">FullStack Developer</span>
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="mt-8 md:mt-12 flex flex-col md:flex-row items-center gap-4 md:gap-6"
                >
                    <div className="h-[1px] w-8 md:w-12 bg-slate-700"></div>
                    <p className="text-base md:text-lg text-slate-400 font-light max-w-lg leading-relaxed px-4 md:px-0">
                        Focused on building scalable, user-friendly web applications using the MERN stack.
                    </p>
                    <div className="h-[1px] w-8 md:w-12 bg-slate-700"></div>
                </motion.div>
            </motion.div>

        </div>
    )
}
