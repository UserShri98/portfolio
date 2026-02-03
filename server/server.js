const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Mock Data
const projects = [
    {
        id: 1,
        title: "User Management",
        category: "Full Stack",
        description: "Secure system with authentication, role-based access, and full CRUD operations for managing users efficiently.",
        tech: ["React", "Node.js", "MongoDB"],
        image: "https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&q=80&w=2070",
        color: "#3b82f6",
        liveUrl: "https://github.com/NiveshPole18"
    },
    {
        id: 2,
        title: "Task Manager",
        category: "Web App",
        description: "Task tracker that allows users to create, update, delete, and monitor tasks with a clean UI and REST API integration.",
        tech: ["React", "Express", "MongoDB"],
        image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=2072",
        color: "#10b981",
        liveUrl: "https://github.com/NiveshPole18"
    },
    {
        id: 3,
        title: "Quiz Application",
        category: "MERN",
        description: "Interactive quiz platform with dynamic questions, scoring system, and backend data handling using MySQL.",
        tech: ["React", "Node.js", "MySQL"],
        image: "https://images.unsplash.com/photo-1606326666830-a146892303ce?auto=format&fit=crop&q=80&w=2070",
        color: "#f59e0b",
        liveUrl: "https://github.com/NiveshPole18"
    },
    {
        id: 4,
        title: "Chatbot UI",
        category: "Frontend",
        description: "AI chatbot interface with smooth UI, API-based message handling, and responsive design.",
        tech: ["React", "Tailwind", "APIs"],
        image: "https://images.unsplash.com/photo-1531746790731-6c087fecd05a?auto=format&fit=crop&q=80&w=2012",
        color: "#6366f1",
        liveUrl: "https://github.com/NiveshPole18"
    },
    {
        id: 5,
        title: "E-Commerce",
        category: "Full Stack",
        description: "Complete shopping platform with product listing, cart management, authentication, and order workflow.",
        tech: ["React", "Node.js", "MongoDB"],
        image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=2070",
        color: "#9333ea",
        liveUrl: "https://github.com/NiveshPole18"
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

app.get('/api/resume', (req, res) => {
    const resumePath = path.join(__dirname, 'resume.pdf');
    res.download(resumePath, 'Nivesh_Pole_Resume.pdf', (err) => {
        if (err) {
            console.error(err);
            res.status(404).json({ error: "Resume file not found on server." });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
