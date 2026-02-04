import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion'

// --- DECRYPTION TEXT EFFECT ---
function DecryptText({ text, className }) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*"
    const [display, setDisplay] = useState("")
    const [start, setStart] = useState(false)

    useEffect(() => {
        if (!start) return
        let iteration = 0
        const interval = setInterval(() => {
            setDisplay(text.split("").map((char, index) => {
                if (index < iteration) return text[index]
                return chars[Math.floor(Math.random() * chars.length)]
            }).join(""))
            if (iteration >= text.length) clearInterval(interval)
            iteration += 1 / 3
        }, 30)
        return () => clearInterval(interval)
    }, [start, text])

    return (
        <motion.span
            onViewportEnter={() => setStart(true)}
            className={className}
        >
            {display}
        </motion.span>
    )
}

export default function About() {
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    const y = useTransform(scrollYProgress, [0, 1], [100, -100])

    return (
        <section id="about" ref={containerRef} className="relative py-12 md:py-20 px-4 md:px-8 lg:px-12 bg-transparent overflow-hidden">
            {/* Background Decoration */}
            <motion.div
                animate={{
                    y: [0, -20, 0],
                    rotate: [0, 5, 0]
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute top-1/4 -right-20 w-80 h-80 bg-accent-primary/5 rounded-full blur-[100px] -z-10"
            />
            <motion.div
                animate={{
                    y: [0, 20, 0],
                    rotate: [0, -5, 0]
                }}
                transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute bottom-1/4 -left-20 w-96 h-96 bg-accent-primary/5 rounded-full blur-[120px] -z-10"
            />

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 relative z-10">

                {/* --- MAIN INFO (Floating Text) --- */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="col-span-1 md:col-span-2 pt-6 md:pt-12"
                >
                    <motion.h2
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 md:mb-8 text-white"
                        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -50]) }}
                    >
                        About <span className="text-accent-primary">Me</span>
                    </motion.h2>

                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-[1px] w-full bg-slate-800 mb-8 origin-left"
                    ></motion.div>

                    <motion.p
                        className="text-lg md:text-xl lg:text-2xl font-light leading-relaxed text-slate-300"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        I’m <span className="text-white font-medium">Shrinath Chikodikar</span>, a passionate Full Stack Developer focused on building <span className="text-white font-medium">scalable, user-friendly</span> web applications using the MERN stack. I enjoy turning complex problems into clean, functional interfaces and reliable backend systems.
                    </motion.p>

                    <motion.div
                        className="mt-8 md:mt-12 flex flex-wrap gap-3 md:gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <motion.div
                            className="px-6 py-2 rounded-full border border-slate-700 bg-slate-900/50 text-slate-300 text-sm tracking-wide cursor-pointer"
                            whileHover={{ scale: 1.1, borderColor: "#fbbf24", backgroundColor: "rgba(251, 191, 36, 0.1)", color: "#fbbf24" }}
                            transition={{ type: "spring", stiffness: 400 }}
                        >
                            Full Stack
                        </motion.div>
                        
                    </motion.div>
                </motion.div>

                {/* --- PROFILE HOLOGRAM (Enhanced with Animations) --- */}
                <motion.div
                    className="col-span-1 flex items-center justify-center relative h-[300px] md:h-[400px]"
                    initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    {/* Abstract Circle */}
                    <motion.div
                        className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center"
                        whileHover={{ scale: 1.15, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <motion.div
                            className="absolute inset-0 border-2 border-slate-800 rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        ></motion.div>
                        <motion.div
                            className="absolute inset-4 border-2 border-accent-primary/30 rounded-full border-dashed"
                            animate={{ rotate: -360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        ></motion.div>
                        <motion.div
                            className="absolute inset-0 rounded-full bg-gradient-to-tr from-accent-primary/20 to-transparent blur-2xl"
                            animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.1, 1] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        ></motion.div>

                        {/* Center Text */}
                        <motion.div
                            className="text-center z-10"
                            whileHover={{ scale: 1.2 }}
                        >
                            <h3 className="text-3xl font-display font-bold text-white tracking-widest">DEV</h3>
                            <motion.p
                                className="text-xs font-mono text-accent-primary mt-1 tracking-widest"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                ONLINE
                            </motion.p>
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* --- TIMELINE STATS (Clean Professional) --- */}
              

                {/* --- DOWNLOAD RESUME (Premium Call to Action) --- */}
                {/* <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="col-span-1 md:col-span-3 flex justify-center mt-20"
                >
                    <motion.a
                        href="/resume.pdf"
                        download="Chikodikar_Shrinath_Software_Developer_Resume.pdf"
                        className="group relative px-12 py-5 bg-white/5 border border-white/10 rounded-full text-white font-display font-bold uppercase tracking-widest overflow-hidden flex items-center gap-4 transition-all hover:border-accent-primary/50"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="relative z-10">Download Full Resume</span>
                        <div className="relative z-10 w-8 h-8 rounded-full bg-accent-primary text-black flex items-center justify-center group-hover:rotate-12 transition-transform">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                        </div>

                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
                            animate={{ x: ["100%", "-100%"] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        />
                    </motion.a>
                </motion.div> */}

            </div>
        </section>
    )
}
