# 🚀 Adis Kidan - Professional Computer Science Portfolio

A modern, high-performance developer portfolio built specifically for **Adis Kidan**, Computer Science student at **Debre Berhan University (DBU)** specializing in **Full-Stack Web Development**.

Designed with a sleek dark tech aesthetic, glassmorphic cards, interactive terminal CLI, rich project showcase, and a single source-of-truth configuration file.

---

## ✨ Features

- **⚡ Fast & Modern Tech Stack**: Built with React 19, Vite 8, and Tailwind CSS v4.
- **🎨 Sleek Dark Tech Aesthetic**: Deep obsidian theme with neon cyan & indigo glowing accents, glassmorphic blur effects, and developer typography (`Plus Jakarta Sans` & `JetBrains Mono`).
- **💡 Hero Section**:
  - Live availability status indicator
  - Typewriter animated role rotator (*Full-Stack Developer*, *CS Student @ DBU*, *Problem Solver*)
  - Quick action buttons (View Projects, Contact, Download CV)
  - Key statistics summary (Projects, Tech Stack, LeetCode Problem Solving)
- **📖 About Me**:
  - Academic story at Debre Berhan University
  - Key facts grid (Degree, Specialization, Philosophy, Location)
  - Interactive IDE code window (`adis-kidan.config.ts`) with one-click copy
- **🛠️ Filterable Skills Matrix**:
  - Categorized into *Frontend*, *Backend & APIs*, *Databases*, *DevOps & Tools*, and *CS Fundamentals*
  - Dedicated callout for Computer Science theoretical rigor (Algorithms, Big-O, DBMS, Networks)
- **💼 Featured Projects & Architecture Modal**:
  - Filterable by *All*, *Full-Stack*, and *Frontend*
  - High-res preview cards with tech badges, GitHub links, and Live Demo links
  - Interactive details modal showing architectural breakdown, technical highlights, and full overview
- **🎓 Education & Timeline**:
  - Detailed highlight card for **Debre Berhan University (DBU)**
  - Core CS coursework chips (Algorithms, OOP, DBMS, Web, OS, Networks)
  - Growth timeline (from first lines of code to current full-stack development)
- **💻 Interactive Developer CLI Terminal**:
  - Simulated interactive terminal with commands: `help`, `about`, `skills`, `projects`, `education`, `contact`, `clear`, `whoami`, `sudo`
  - Quick-click command pills for mobile & quick exploration
- **📬 Contact & Connection**:
  - Working interactive message form with auto-formatted email draft
  - Direct email card with one-click copy to clipboard
  - Social badges (GitHub, LinkedIn, Telegram)

---

## 🛠️ How to Customize Your Information

All your personal details, links, projects, and skills are organized in a single file:
👉 **[`src/data/portfolioData.js`](file:///a:/DBU/Project/MyPortfolio/src/data/portfolioData.js)**

To update your portfolio:
1. Open [`src/data/portfolioData.js`](file:///a:/DBU/Project/MyPortfolio/src/data/portfolioData.js)
2. Edit:
   - `personalInfo`: Name, email, phone, bio, GitHub, LinkedIn, Telegram links
   - `skillsData`: Add or remove skills and proficiency levels
   - `projectsData`: Add your own project titles, descriptions, live demo URLs, and GitHub links
   - `educationData`: Add specific courses, grades, or university achievements

---

## 💻 Local Development

To run the portfolio on your local machine:

```bash
# 1. Install dependencies (already installed)
npm install

# 2. Start the local development server
npm run dev
```

Visit **[http://localhost:5173](http://localhost:5173)** in your browser.

---

## 🚀 How to Deploy Your Portfolio Online

### Option 1: Vercel (Recommended - Free & Easiest)
1. Push your project to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of my portfolio"
   git branch -M main
   git remote add origin https://github.com/adiskidan/my-portfolio.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and log in with GitHub.
3. Click **"Add New Project"** and select your `my-portfolio` repository.
4. Click **Deploy**. Vercel will automatically build and host your portfolio with a free `.vercel.app` domain and free SSL!

### Option 2: GitHub Pages
1. In `vite.config.js`, add `base: '/my-portfolio/'` (matching your repo name).
2. Run `npm run build` and deploy the `dist/` folder via the `gh-pages` branch or GitHub Actions.

---

## 📄 License

Created by **Adis Kidan**. Feel free to customize and expand for your personal and professional use.
