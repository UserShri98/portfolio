import { useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useLenis } from 'lenis/react'

export default function Navbar() {
    const lenis = useLenis()
    const { scrollY } = useScroll()
    const [hovered, setHovered] = useState(null)
    const [isOpen, setIsOpen] = useState(false)

    // Aesthetic Transformation: Full width -> Compact Pill
    const width = useTransform(scrollY, [0, 100], ["100%", "60%"])
    const top = useTransform(scrollY, [0, 100], ["0px", "16px"])
    // Softer, more transparent white
    // Softer, more transparent dark theme
    const background = useTransform(scrollY, [0, 100], ["rgba(0,0,0,0)", "rgba(10,10,10,0.8)"])
    const backdropBlur = useTransform(scrollY, [0, 100], ["0px", "10px"])
    const textColor = useTransform(scrollY, [0, 100], ["#ffffff", "#ffffff"]) // Always white

    const scrollTo = (id) => {
        if (lenis) {
            lenis.scrollTo(`#${id}`, { offset: 0, duration: 1.2 })
        } else {
            const element = document.getElementById(id)
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
            }
        }
        setIsOpen(false)
    }

    const navItems = ['About', 'Skills', 'Projects', 'Contact']

    return (
        <div className="fixed top-0 left-0 w-full z-50 flex justify-center pointer-events-none">
            <motion.nav
                style={{ width, top, background, backdropFilter: backdropBlur }}
                className="pointer-events-auto flex items-center justify-between px-4 md:px-8 py-3 md:py-4 rounded-full transition-all duration-700 ease-out shadow-sm"
            >
                {/* Minimal Logo */}
                <motion.div
                    className="text-2xl font-display font-bold tracking-tighter cursor-pointer group"
                    whileHover={{ scale: 1.05 }}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                    sc.<span className="text-accent-primary group-hover:animate-pulse">.</span>
                </motion.div>

                {/* Aesthetic Links */}
                <div className="hidden md:flex items-center gap-2">
                    {navItems.map((item) => (
                        <div key={item} className="relative">
                            <motion.button
                                onClick={() => scrollTo(item.toLowerCase())}
                                onMouseEnter={() => setHovered(item)}
                                onMouseLeave={() => setHovered(null)}
                                style={{ color: textColor }}
                                className="relative px-3 lg:px-4 py-2 text-xs lg:text-sm font-medium tracking-wide uppercase transition-colors"
                            >
                                <span className="relative z-10">{item}</span>

                                {/* Zoomed In Hover Background */}
                                <AnimatePresence>
                                    {hovered === item && (
                                        <motion.div
                                            layoutId="nav-hover"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 0.15, scale: 1.1 }} // Transparent zoom
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                            className="absolute inset-0 bg-current opacity-10 rounded-lg -z-0"
                                            style={{ backgroundColor: textColor.get() === '#ffffff' ? '#ffffff' : '#000000' }}
                                        />
                                    )}
                                </AnimatePresence>
                            </motion.button>
                        </div>
                    ))}
                </div>

                {/* Status Dot & Mobile Toggle */}
                <div className="flex items-center gap-4">
                    <div className="hidden md:block w-2 h-2 rounded-full bg-current opacity-50 animate-pulse" style={{ backgroundColor: textColor ? undefined : 'white' }}></div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden flex flex-col gap-1.5 p-2"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <motion.span
                            animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                            className="w-6 h-0.5 bg-white rounded-full"
                        />
                        <motion.span
                            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                            className="w-6 h-0.5 bg-white rounded-full"
                        />
                        <motion.span
                            animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                            className="w-6 h-0.5 bg-white rounded-full"
                        />
                    </button>
                </div>

            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 top-0 left-0 w-full h-screen bg-[#030303]/98 backdrop-blur-3xl z-[51] flex flex-col items-center justify-center p-8 md:hidden pointer-events-auto"
                    >
                        {/* Close Button Inside Menu */}
                        <button
                            className="absolute top-8 right-8 p-4 text-white hover:text-accent-primary transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>

                        <div className="flex flex-col items-center gap-8">
                            {navItems.map((item, i) => (
                                <motion.button
                                    key={item}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    onClick={() => scrollTo(item.toLowerCase())}
                                    className="text-4xl font-display font-bold text-white hover:text-accent-primary transition-colors uppercase tracking-widest"
                                >
                                    {item}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
