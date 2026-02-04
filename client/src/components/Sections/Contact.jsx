import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useState } from 'react'

export default function Contact() {
    const [focused, setFocused] = useState(null)
    const [status, setStatus] = useState('idle') // idle, loading, success, error
    const [formData, setFormData] = useState({ name: '', email: '', message: '' })
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus('loading')

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
            const data = await response.json()
            if (data.success) {
                setStatus('success')
                setFormData({ name: '', email: '', message: '' })
                setTimeout(() => setStatus('idle'), 5000)
            } else {
                setStatus('error')
            }
        } catch (err) {
            console.error(err)
            setStatus('error')
        }
    }

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        mouseX.set(e.clientX - rect.left)
        mouseY.set(e.clientY - rect.top)
    }

    return (
        <section
            id="contact"
            className="min-h-screen flex items-center justify-center bg-transparent relative overflow-hidden py-16 md:py-24"
            onMouseMove={handleMouseMove}
        >
            {/* Animated Background Glow */}
            <motion.div
                className="absolute inset-0 opacity-30"
                style={{
                    background: useTransform(
                        [mouseX, mouseY],
                        ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(251, 191, 36, 0.15), transparent 40%)`
                    )
                }}
            />

            <div className="relative z-10 max-w-5xl w-full px-4 md:px-8 text-center">

                {/* Floating Title with Parallax */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                >
                    <motion.h2
                        className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-display font-bold text-white mb-4 md:mb-6"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        Let's <motion.span
                            className="text-accent-primary inline-block"
                            animate={{
                                textShadow: [
                                    "0 0 20px rgba(251, 191, 36, 0.5)",
                                    "0 0 40px rgba(251, 191, 36, 0.8)",
                                    "0 0 20px rgba(251, 191, 36, 0.5)"
                                ]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            Connect
                        </motion.span>
                    </motion.h2>
                    <motion.p
                        className="text-lg md:text-xl lg:text-2xl text-slate-400 mb-12 md:mb-20 max-w-2xl mx-auto font-light"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        Have a project in mind? Let's discuss how we can work together.
                    </motion.p>
                </motion.div>

                {/* Enhanced Form with Better Visibility */}
                <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-8 md:space-y-12 text-left">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                        {['Name', 'Email'].map((field, i) => (
                            <motion.div
                                key={field}
                                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 + (i * 0.1) }}
                                viewport={{ once: true }}
                                className="group relative"
                            >
                                <motion.div
                                    className="absolute -inset-2 bg-gradient-to-r from-accent-primary/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
                                />
                                <input
                                    type={field === 'Email' ? 'email' : 'text'}
                                    placeholder={field.toUpperCase()}
                                    value={formData[field.toLowerCase()]}
                                    onChange={(e) => setFormData({ ...formData, [field.toLowerCase()]: e.target.value })}
                                    required
                                    onFocus={() => setFocused(field)}
                                    onBlur={() => setFocused(null)}
                                    className="relative w-full bg-slate-900/50 border-2 border-slate-700 rounded-lg px-4 md:px-6 py-4 md:py-5 text-lg md:text-xl text-white outline-none placeholder:text-slate-500 transition-all duration-300 focus:border-accent-primary focus:bg-slate-900/80 focus:shadow-[0_0_30px_rgba(251,191,36,0.2)] font-sans backdrop-blur-sm"
                                />
                                {/* Animated Corner Accents */}
                                <motion.div
                                    animate={{
                                        opacity: focused === field ? 1 : 0,
                                        scale: focused === field ? 1 : 0.8
                                    }}
                                    className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-accent-primary"
                                />
                                <motion.div
                                    animate={{
                                        opacity: focused === field ? 1 : 0,
                                        scale: focused === field ? 1 : 0.8
                                    }}
                                    className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-accent-primary"
                                />
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        viewport={{ once: true }}
                        className="group relative"
                    >
                        <motion.div
                            className="absolute -inset-2 bg-gradient-to-r from-accent-primary/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
                        />
                        <textarea
                            rows="4"
                            placeholder="YOUR MESSAGE"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            required
                            onFocus={() => setFocused('Message')}
                            onBlur={() => setFocused(null)}
                            className="relative w-full bg-slate-900/50 border-2 border-slate-700 rounded-lg px-4 md:px-6 py-4 md:py-5 text-lg md:text-xl text-white outline-none placeholder:text-slate-500 transition-all duration-300 focus:border-accent-primary focus:bg-slate-900/80 focus:shadow-[0_0_30px_rgba(251,191,36,0.2)] resize-none font-sans backdrop-blur-sm"
                        ></textarea>
                        <motion.div
                            animate={{
                                opacity: focused === 'Message' ? 1 : 0,
                                scale: focused === 'Message' ? 1 : 0.8
                            }}
                            className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-accent-primary"
                        />
                        <motion.div
                            animate={{
                                opacity: focused === 'Message' ? 1 : 0,
                                scale: focused === 'Message' ? 1 : 0.8
                            }}
                            className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-accent-primary"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 }}
                        viewport={{ once: true }}
                        className="flex justify-center"
                    >
                        <motion.button
                            type="submit"
                            disabled={status === 'loading'}
                            className="group relative px-10 md:px-16 py-4 md:py-6 bg-accent-primary text-black font-bold uppercase tracking-[0.2em] overflow-hidden rounded-full text-base md:text-lg disabled:opacity-50"
                            whileHover={{ scale: 1.05, y: -5 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <motion.span
                                className="relative z-10"
                                animate={{
                                    letterSpacing: ["0.2em", "0.25em", "0.2em"]
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                {status === 'loading' ? 'Transmitting...' : status === 'success' ? 'Sent!' : 'Send Message'}
                            </motion.span>
                            <motion.div
                                className="absolute inset-0 bg-white"
                                initial={{ x: "-100%" }}
                                whileHover={{ x: 0 }}
                                transition={{ duration: 0.3 }}
                            />
                            <motion.div
                                className="absolute inset-0 bg-accent-primary opacity-50 blur-2xl"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        </motion.button>
                    </motion.div>
                </form>

                {/* Enhanced Footer Links */}
                <motion.div
                    className="mt-20 md:mt-32 flex flex-col md:flex-row justify-between items-center border-t border-slate-800 pt-8 md:pt-12 gap-6"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    viewport={{ once: true }}
                >
                    <motion.div
                        className="text-left"
                        whileHover={{ scale: 1.05 }}
                    >
                        <h3 className="font-display font-bold text-2xl text-white">
                            <span className="text-accent-primary">SC</span>
                        </h3>
                    </motion.div>
                    <div className="flex gap-12 mt-8 md:mt-0">
                        {[
                            { name: 'GitHub', url: 'https://github.com/UserShri98' },
                            { name: 'LinkedIn', url: 'http://www.linkedin.com/in/shrinathchikodikar' },
                            { name: 'Email', url: 'mailto:sjc3098@gmail.com' }
                        ].map((link, i) => (
                            <motion.a
                                key={link.name}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-500 hover:text-accent-primary transition-colors uppercase text-sm tracking-widest font-mono relative"
                                whileHover={{ y: -5, scale: 1.1 }}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.9 + (i * 0.1) }}
                                viewport={{ once: true }}
                            >
                                {link.name}
                                <motion.div
                                    className="absolute -bottom-1 left-0 h-0.5 bg-accent-primary"
                                    initial={{ width: 0 }}
                                    whileHover={{ width: "100%" }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.a>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
