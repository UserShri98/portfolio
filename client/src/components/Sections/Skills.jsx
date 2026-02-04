import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const skills = [
    {
        name: "React.js",
        category: "Frontend",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=2070",
        logo: "https://cdn.simpleicons.org/react/61DAFB",
        color: "#61DAFB"
    },
    {
        name: "Node.js",
        category: "Backend",
        image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&q=80&w=1974",
        logo: "https://cdn.simpleicons.org/nodedotjs/339933",
        color: "#339933"
    },
    {
        name: "Express.js",
        category: "Backend",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070",
        logo: "https://cdn.simpleicons.org/express/ffffff",
        color: "#ffffff"
    },
    {
        name: "MongoDB",
        category: "Database",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&q=80&w=2046",
        logo: "https://cdn.simpleicons.org/mongodb/47A248",
        color: "#47A248"
    },
    {
        name: "Tailwind",
        category: "Frontend",
        image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=2070",
        logo: "https://cdn.simpleicons.org/tailwindcss/06B6D4",
        color: "#06B6D4"
    },
    {
        name: "Java",
        category: "Backend",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=2070",
        logo: "https://cdn.simpleicons.org/openjdk/ED8B00",
        color: "#ED8B00"
    },
    {
        name: "Postman",
        category: "Tools",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2070",
        logo: "https://cdn.simpleicons.org/postman/FF6C37",
        color: "#FF6C37"
    },
    {
    name: "SQL",
    category: "Database",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=2070",
    logo: "https://cdn.simpleicons.org/mysql/4479A1",
    color: "#4479A1"
},
{
    name: "AWS",
    category: "Cloud",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2072",
    logo: "https://cdn.simpleicons.org/amazonaws/FF9900",
    color: "#FF9900"
},
{
    name: "Git",
    category: "Tools",
    image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?auto=format&fit=crop&q=80&w=2070",
    logo: "https://cdn.simpleicons.org/git/F05032",
    color: "#F05032"
},
{
    name: "Redux Toolkit",
    category: "Frontend",
    image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?auto=format&fit=crop&q=80&w=2070",
    logo: "https://cdn.simpleicons.org/redux/764ABC",
    color: "#764ABC"
},
{
    name: "Strapi",
    category: "Backend",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2070",
    logo: "https://cdn.simpleicons.org/strapi/4945FF",
    color: "#4945FF"
},
{
    name: "Next.js",
    category: "Frontend",
    image: "https://images.unsplash.com/photo-1555066931-bf19f8fd1085?auto=format&fit=crop&q=80&w=2070",
    logo: "https://cdn.simpleicons.org/nextdotjs/ffffff",
    color: "#ffffff"
}

]

export default function Skills() {
    const sectionRef = useRef(null)
    const triggerRef = useRef(null)

    useEffect(() => {
    const section = sectionRef.current
    const trigger = triggerRef.current

    const scrollWidth = section.scrollWidth
    const viewportWidth = window.innerWidth
    const scrollDistance = scrollWidth - viewportWidth

    const tween = gsap.to(section, {
        x: -scrollDistance,
        ease: "none",
        scrollTrigger: {
            trigger: trigger,
            start: "top top",
            end: () => `+=${scrollWidth}`,
            scrub: 0.6,
            pin: true,
            anticipatePin: 1
        }
    })

    return () => {
    tween.scrollTrigger?.kill()
    tween.kill()
}
}, [])

    return (
        <div id="skills" className="skills-wrapper overflow-hidden bg-transparent mt-0">
            <div ref={triggerRef} className="h-screen w-full flex items-center relative overflow-hidden pt-0">
                <div ref={sectionRef} className="flex flex-row items-center gap-12 md:gap-20 px-8 md:px-20 w-max">

                    {/* Intro Block */}
                    <div className="w-[90vw] md:w-[80vw] shrink-0 px-4 md:px-10 relative z-10">
                        <h2 className="text-[15vw] md:text-[10vw] font-display font-bold text-white leading-none">
                            My <br /> <span className="text-accent-primary">Expertise</span>
                        </h2>
                        <p className="text-lg md:text-2xl mt-6 md:mt-8 text-gray-400 max-w-xl">
                            A curated suite of technologies for building immersive digital realities.
                        </p>
                    </div>

                    {/* Skill Cards */}
                    {skills.map((skill, index) => (
                        <div key={index} className="w-[70vw] sm:w-[50vw] md:w-[30vw] lg:w-[25vw] h-[50vh] md:h-[60vh] shrink-0 border border-white/10 bg-zinc-900/95 backdrop-blur-md rounded-3xl flex flex-col justify-between overflow-hidden hover:bg-white/10 transition-colors group relative">
                            {/* Background Image with Overlay */}
                            <div className="absolute inset-0 z-0">
                                <img src={skill.image} alt={skill.name} className="w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-700 blur-sm group-hover:blur-0 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                            </div>

                            <div className="relative z-10 p-6 md:p-8 flex flex-col justify-between h-full">
                                {/* Top: Index */}
                                <div className="flex items-start justify-between">
                                    <span className="text-xs md:text-sm font-mono text-gray-500 uppercase index-counter">{(index + 1).toString().padStart(2, '0')}</span>
                                </div>

                                {/* Center: Skill Logo */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="relative">
                                        {/* Large Ambient Glow */}
                                        <div
                                            className="absolute inset-x-[-100px] inset-y-[-100px] blur-[80px] opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"
                                            style={{
                                                background: `radial-gradient(circle, ${skill.color} 0%, transparent 70%)`
                                            }}
                                        />

                                        <motion.div
                                            whileHover={{ scale: 1.2, rotate: 5 }}
                                            className="relative w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-5 md:p-8 flex items-center justify-center shadow-2xl transition-all duration-500 group-hover:border-white/20 group-hover:bg-white/10 pointer-events-auto"
                                        >
                                            <img
                                                src={skill.logo}
                                                alt={`${skill.name} logo`}
                                                className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                                                style={{ filter: 'brightness(0) invert(1)' }}
                                            />
                                        </motion.div>
                                    </div>
                                </div>

                                {/* Bottom: Info */}
                                <div className="relative z-20">
                                    <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white group-hover:text-neon-cyan transition-colors">{skill.name}</h3>
                                    <div className="mt-3 md:mt-4 px-3 md:px-4 py-1 border border-white/20 bg-black/50 backdrop-blur-xl rounded-full inline-block text-xs uppercase tracking-widest text-gray-300">
                                        {skill.category}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}
