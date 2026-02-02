# 🚀 The Ultimate Portfolio Customization Guide

This guide will walk you through exactly how to turn this high-end template into your personal brand. I've organized it by section so you know exactly which files to open.

---

## � 1. Core Identity (Name & Role)
**File:** [Intro.jsx](file:///c:/Users/asus/OneDrive/Desktop/New%20folder%20(2)/client/src/components/Sections/Intro.jsx)

Look for these lines (approx. L35-L42):
```jsx
<h1 className="text-lg ...">Software Engineer</h1> // Change your title here
<h1 className="text-5xl ...">
    CREATIVE <br />
    <span className="text-accent-primary">DEVELOPER</span> // Change your main "hook" here
</h1>
```

**File:** [Navbar.jsx](file:///c:/Users/asus/OneDrive/Desktop/New%20folder%20(2)/client/src/components/Layout/Navbar.jsx)
Look for the logo text (approx. L37):
```jsx
AG<span className="..."></span> // Replace "AG" with your initials
```

---

## 📂 2. About Me & Personal Bio
**File:** [About.jsx](file:///c:/Users/asus/OneDrive/Desktop/New%20folder%20(2)/client/src/components/Sections/About.jsx)

*   **Bio Text (L95-L100):** Change the multi-line paragraph to describe your journey.
*   **Timeline (L149-L151):** Update the years and descriptions:
    ```javascript
    { year: '2020', title: 'Started Journey', desc: 'First Line of Code' },
    ```
*   **Resume (L158):** Replace the text in the "Download Resume" button if needed.

---

## 📂 3. Skills & Expertise
**File:** [Skills.jsx](file:///c:/Users/asus/OneDrive/Desktop/New%20folder%20(2)/client/src/components/Sections/Skills.jsx)

Update the `skills` array at the top of the file (L7-L64).
*   `name`: The name of the technology.
*   `category`: Frontend, Backend, 3D, etc.
*   `image`: The background "vibe" image (Unsplash link).
*   `logo`: Simple Icons link (e.g., `https://cdn.simpleicons.org/react/61DAFB`).
*   `color`: The hex code for the glow effect.

---

## 📂 4. Projects (The Central Piece)
**File:** [server.js](file:///c:/Users/asus/OneDrive/Desktop/New%20folder%20(2)/server/server.js)

Since we are connecting the server, your projects will now live here! Update the `projects` array (L15-L40):
```javascript
{
    id: 1,
    title: "Project Name",
    category: "Category",
    description: "Detailed description...",
    tech: ["Tech 1", "Tech 2"],
    image: "https://your-image-link.com",
    color: "#61DAFB" // The highlight color for this specific card
}
```

---

## 📂 5. Contact & Socials
**File:** [Contact.jsx](file:///c:/Users/asus/OneDrive/Desktop/New%20folder%20(2)/client/src/components/Sections/Contact.jsx)

Look for the social links at the bottom (L198-L217):
*   Change the names (`GitHub`, `LinkedIn`, etc.) and the `href="#"` to your actual profile links.

---

## 📂 6. Images & Assets
*   **Profile Image:** If you want to change the "hologram" circle in the About section, replace the image source in `About.jsx` (approx. L118).
*   **Resume:** Put your actual `resume.pdf` into the `server` folder, replacing the dummy one.

---

## 🪄 The "Antigravity Magic" Prompt
If you don't want to dig through the code yourself, just fill this out and paste it to me:

```text
Hey Antigravity, please update my portfolio with these details:

NAME: [Your Full Name]
BIO: [1-2 sentences about you]
TITLE: [Your Job Title]
SOCIALS: GitHub([URL]), LinkedIn([URL]), Twitter([URL])
MY PROJECTS:
1. [Name] - [Short Description] - [Tech Stack] - [Image URL]
2. [Name] - [Short Description] - [Tech Stack] - [Image URL]
MY TOP SKILLS: [Skill 1, Skill 2, Skill 3, Skill 4]
```

I'll handle all the file edits, CSS adjustments, and server updates for you in one shot!
