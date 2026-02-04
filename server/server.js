const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const fs=require("fs")

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Mock Data
const projects = [
   {
         id: 1,
    title: "DevMeet",
    category: "Full Stack",
    description: "A developer collaboration and networking platform with secure APIs, enabling developers to connect, interact, and collaborate efficiently.",
    tech: [
        "React.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Tailwind CSS",
        "DaisyUI",
        "Redux Toolkit"
    ],
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=2070",
    color: "#38bdf8",
    liveUrl: "https://dev-meet-web-2726.vercel.app/"
    },
    {
    id: 2,
    title: "Blogging Platform",
    category: "Full Stack",
    description: "A full-stack blogging platform that allows users to create, edit, and manage blog posts with secure authentication and access control for user-specific content.",
    tech: [
        "React.js",
        "Node.js",
        "Express.js",
        "MongoDB"
    ],
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&q=80&w=2070",
    color: "#22c55e",
    liveUrl: "https://blog-application-2-rll6.onrender.com/user/signup"
},
 {
    id: 3,
    title: "GPTFlix",
    category: "Frontend",
    description: "An AI-powered movie discovery platform that helps users explore and search movies through intelligent interactions, real-time search, and a responsive, intuitive UI.",
    tech: [
        "React.js",
        "Tailwind CSS",
        "Firebase"
    ],
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=2070",
    color: "#ef4444",
    liveUrl: "https://gptnet.vercel.app/"
},
{
    id: 4,
    title: "Food Ordering System",
    category: "Frontend",
    description: "A modern food ordering application that allows users to browse restaurants, filter them by ratings, view menus, add items to cart, and place orders with a smooth user experience.",
    tech: [
        "React.js",
        "Tailwind CSS",
        "Redux Toolkit"
    ],
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=2070",
    color: "#f97316",
    liveUrl: "https://food-delivery-beta-ten.vercel.app/"
}


];

// Routes
app.get('/api/projects', (req, res) => {
    res.json(projects);
});

app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    console.log(`[CONTACT FORM] Message from ${name} (${email}): ${message}`);
    // Simulate email sending delay
    setTimeout(() => {
        res.json({ success: true, message: "Signal transmitted." });
    }, 1000);
});

app.get("/api/resume", (req, res) => {
    const resumePath = path.resolve(__dirname, "resume.pdf");

    if (!fs.existsSync(resumePath)) {
        return res.status(404).json({ error: "Resume file not found" });
    }

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
        "Content-Disposition",
        'attachment; filename="Chikodikar_Shrinath_Software_Developer_Resume.pdf"'
    );

    res.sendFile(resumePath);
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
