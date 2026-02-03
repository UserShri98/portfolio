import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'

const projects = [
    {
        id: 1,
        title: "User Management System",
        category: "Full Stack",
        description: "Secure system with authentication, role-based access, and full CRUD operations for managing users efficiently.",
        tech: ["React", "Node.js", "MongoDB"],
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070",
        color: "#fbbf24",
        liveUrl: "https://github.com/NiveshPole18"
    },
    {
        id: 2,
        title: "Task Management App",
        category: "Web App",
        description: "Create, update, delete, and track tasks with a clean UI and REST API integration.",
        tech: ["React", "Express", "MongoDB"],
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=2064",
        color: "#94a3b8",
        liveUrl: "https://github.com/NiveshPole18"
    },
    {
        id: 3,
        title: "Quiz Application",
        category: "Frontend + Backend",
        description: "Interactive quiz platform with dynamic questions, scoring system, and backend data handling.",
        tech: ["React", "Node.js", "MySQL"],
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2072",
        color: "#fbbf24",
        liveUrl: "https://github.com/NiveshPole18"
    },
    {
        id: 4,
        title: "Chatbot Frontend",
        category: "Frontend",
        description: "AI chatbot interface with smooth UI, API-based message handling, and responsive design.",
        tech: ["React", "Tailwind", "APIs"],
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=2070",
        color: "#64748b",
        liveUrl: "https://github.com/NiveshPole18"
    },
    {
        id: 5,
        title: "E-Commerce Platform",
        category: "Full Stack",
        description: "Product listing, cart management, authentication, and order workflow system.",
        tech: ["React", "Node.js", "MongoDB"],
        image: "https://images.unsplash.com/photo-1639322537228-ad7117a3a63b?auto=format&fit=crop&q=80&w=2070",
        color: "#fbbf24",
        liveUrl: "https://github.com/NiveshPole18"
    },
    {
        id: 6,
        title: "Dreams",
        category: "AI Art",
        description: "Platform for training and minting AI-generated art models on the edge, seamlessly integrated with IPFS.",
        tech: ["Stable", "WebGL", "Node"],
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1965",
        color: "#94a3b8",
        liveUrl: "https://github.com/NiveshPole18"
    }
]


// Individual Card Component with Scroll Animations
function ProjectCard({ project, index }) {
    const cardRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    })

    // Simplified scale effect for better performance
    const scale = useTransform(
        scrollYProgress,
        [0, 0.4, 1],
        [0.85, 1, 0.95]
    )

    // Simplified opacity effect
    const opacity = useTransform(
        scrollYProgress,
        [0, 0.3, 0.9, 1],
        [0, 1, 1, 0.7]
    )

    return (
        <motion.div
            ref={cardRef}
            style={{
                scale,
                opacity,
                willChange: "transform, opacity"
            }}
            className="sticky top-20 md:top-32 mb-6 md:mb-8"
        >
            <motion.div
                className="relative w-full max-w-6xl mx-auto h-[400px] md:h-[500px] rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{
                    boxShadow: `0 20px 60px -10px ${project.color}30`
                }}
            >
                {/* Background Image */}
                <div className="absolute inset-0">
                    <motion.img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        style={{ willChange: "transform" }}
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                </div>

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

                {/* Glass Effect Border */}
                <div className="absolute inset-0 border-2 border-white/10 rounded-3xl backdrop-blur-sm" />

                {/* Accent Glow on Hover */}
                <motion.div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                        boxShadow: `inset 0 0 80px ${project.color}40, 0 0 100px ${project.color}20`
                    }}
                />

                {/* Content */}
                <div className="absolute inset-0 p-6 md:p-12 flex flex-col justify-between">
                    {/* Top Section - Category */}
                    <div className="flex items-start justify-between">
                        <motion.div
                            className="flex items-center gap-2 md:gap-3 px-3 md:px-5 py-1.5 md:py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
                            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                        >
                            <div
                                className="w-2 h-2 rounded-full animate-pulse"
                                style={{ backgroundColor: project.color }}
                            />
                            <span className="text-xs font-mono uppercase tracking-widest text-slate-300">
                                {project.category}
                            </span>
                        </motion.div>

                        {/* Card Number */}
                        <motion.div
                            className="w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center backdrop-blur-md"
                            style={{
                                backgroundColor: `${project.color}20`,
                                border: `2px solid ${project.color}60`
                            }}
                            whileHover={{ scale: 1.1, rotate: 360 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span
                                className="text-lg font-mono font-bold"
                                style={{ color: project.color }}
                            >
                                {String(index + 1).padStart(2, '0')}
                            </span>
                        </motion.div>
                    </div>

                    {/* Bottom Section - Title & Description */}
                    <div>
                        <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-4 md:mb-6 leading-none">
                            {project.title}
                        </h3>

                        {/* Accent Line */}
                        <div
                            className="h-0.5 md:h-1 w-16 md:w-24 mb-4 md:mb-6 rounded-full"
                            style={{ backgroundColor: project.color }}
                        />

                        <p className="text-base md:text-lg text-slate-300 max-w-2xl mb-6 md:mb-8 leading-relaxed line-clamp-3 md:line-clamp-none">
                            {project.description}
                        </p>

                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-2 md:gap-3">
                            {project.tech.map((tech, i) => (
                                <span
                                    key={tech}
                                    className="px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-white/5 border border-white/20 text-xs md:text-sm text-white backdrop-blur-sm hover:bg-white/10 hover:border-accent-primary transition-all"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>

                        {/* View Project Button */}
                        <motion.a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-6 md:mt-8 px-6 md:px-8 py-3 md:py-4 rounded-xl text-sm md:text-base font-bold uppercase tracking-widest text-black relative overflow-hidden group/btn inline-block"
                            style={{ backgroundColor: project.color }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                View Project
                                <motion.svg
                                    className="w-5 h-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </motion.svg>
                            </span>
                            <motion.div
                                className="absolute inset-0 bg-white"
                                initial={{ x: "-100%" }}
                                whileHover={{ x: 0 }}
                                transition={{ duration: 0.3 }}
                            />
                        </motion.a>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default function Projects() {
    // Start with local data so the UI isn't empty, then update if server responds
    const [projectsData, setProjectsData] = useState(projects)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001'
        fetch(`${apiUrl}/api/projects`)
            .then(res => res.json())
            .then(data => {
                if (data && data.length > 0) {
                    setProjectsData(data)
                }
                setLoading(false)
            })
            .catch(err => {
                console.warn("Server not reached, using local project data:", err)
                setLoading(false)
            })
    }, [])

    return (
        <section id="projects" className="relative bg-transparent py-16 md:py-32 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mb-16 md:mb-32 text-center relative"
                >
                    <motion.div
                        className="inline-block mb-4 px-6 py-2 rounded-full bg-accent-primary/10 border border-accent-primary/30"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                    >
                        <span className="text-accent-primary font-mono text-sm uppercase tracking-widest">
                            Portfolio
                        </span>
                    </motion.div>

                    <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-display font-bold text-white leading-none mb-4 md:mb-6">
                        Selected <span className="text-slate-600">Work</span>
                    </h2>

                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-0.5 md:h-1 w-20 md:w-32 bg-accent-primary mx-auto rounded-full"
                    />

                    {/* Ambient Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-accent-primary/5 blur-[120px] rounded-full -z-10" />
                </motion.div>

                {/* Stacked Cards */}
                <div className="relative">
                    {projectsData.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>

                {/* Bottom Spacer */}
                <div className="h-48 md:h-96" />
            </div>
        </section>
    )
}
