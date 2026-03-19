import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import { Link } from "react-router-dom";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  FaReact, FaHtml5, FaCss3Alt, FaJs, FaGitAlt, FaNpm,
  FaCode, FaBrain, FaLaptopCode, FaWhatsapp, FaLinkedin,
  FaTiktok, FaEnvelope, FaDownload, FaBars, FaTimes,
  FaHome, FaUser, FaFolderOpen, FaExternalLinkAlt, FaGithub,
} from "react-icons/fa";
import { SiTailwindcss, SiFramer, SiBootstrap } from "react-icons/si";
import profile from "../images/profile.avif";
import bgimg from "../images/bgimg.avif";
import omaraf from "../images/omaraf.avif";
import everythingtax from "../images/everythingtax.avif";
import gaitanoe from "../images/gaitanoe.avif";

// ─── CONSTANTS ────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { id: "home",     label: "Home",     icon: <FaHome /> },
  { id: "about",    label: "About",    icon: <FaUser /> },
  { id: "projects", label: "Projects", icon: <FaFolderOpen /> },
];

const SKILLS = [
  { name: "React.js",      icon: <FaReact />,       color: "text-cyan-400",   docs: "https://react.dev" },
  { name: "HTML5",         icon: <FaHtml5 />,        color: "text-orange-500", docs: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { name: "CSS3",          icon: <FaCss3Alt />,      color: "text-blue-500",   docs: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
  { name: "JavaScript",    icon: <FaJs />,           color: "text-yellow-400", docs: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { name: "Tailwind CSS",  icon: <SiTailwindcss />,  color: "text-sky-400",    docs: "https://tailwindcss.com/docs" },
  { name: "Bootstrap",     icon: <SiBootstrap />,    color: "text-purple-500", docs: "https://getbootstrap.com/docs" },
  { name: "Framer Motion", icon: <SiFramer />,       color: "text-purple-400", docs: "https://www.framer.com/motion" },
  { name: "Git",           icon: <FaGitAlt />,       color: "text-orange-600", docs: "https://git-scm.com/doc" },
  { name: "NPM",           icon: <FaNpm />,          color: "text-red-500",    docs: "https://docs.npmjs.com" },
];

const HIGHLIGHTS = [
  { icon: <FaCode />,       title: "Clean Code",      desc: "Maintainable, efficient, well-documented code" },
  { icon: <FaBrain />,      title: "Problem Solving", desc: "Analytical approach to debugging & features" },
  { icon: <FaLaptopCode />, title: "Always Learning", desc: "Exploring new tech and best practices daily" },
];

const SOCIALS = [
  { icon: <FaWhatsapp />,  label: "WhatsApp", href: "https://wa.me/2349131940037" },
  { icon: <FaLinkedin />,  label: "LinkedIn", href: "https://linkedin.com/in/yourusername" },
  { icon: <FaTiktok />,    label: "TikTok",   href: "https://www.tiktok.com/@david.codess" },
  { icon: <FaGithub />,    label: "GitHub",   href: "https://github.com/Dvdokolo" },
];

const JOURNEY = [
  { year: "Age 13", label: "First Lines of Code",          desc: "Curiosity about how websites worked led me to write my first HTML code and sparked my interest in technology." },
  { year: "2023",   label: "Career Shift into Tech",       desc: "Transitioned from Accounting to Software Development, choosing to pursue a path aligned with my passion for technology." },
  { year: "2024",   label: "Focused Learning",             desc: "Committed to mastering JavaScript, React, and modern web development through consistent study and hands-on practice." },
  { year: "2024",   label: "First Professional Projects",  desc: "Joined a startup and built real-world applications including a pizza ordering website, weather app, and task management system." },
  { year: "2025",   label: "Client Work Experience",       desc: "Began working on client projects, applying my skills to real business problems and production-level applications." },
  { year: "2025",   label: "Diploma in Software Engineering", desc: "Graduated with a Diploma in Software Engineering from Aptech Computing Education — a major milestone marking my formal entry into the tech industry." },
  { year: "Now",    label: "Student & Product Builder",    desc: "Recently admitted to Lincoln University Malaysia to study IT. Actively building projects and expanding into full-stack development and AI-powered solutions." },
];

const BIO = [
  "Hi, I'm David — a front-end developer passionate about building clean, responsive, and user-focused web experiences. I enjoy turning ideas into real products that solve practical problems, combining design, functionality, and performance to create applications people actually enjoy using.",
  "My journey into tech began at the age of 13, when curiosity about how websites worked led me to write my first lines of code. What started as simple experimentation quickly grew into a genuine passion for technology and problem-solving.",
  "Currently, I'm a student pursuing a degree in Information Technology while actively working to build my career early. I focus on modern web development using HTML, CSS, JavaScript, and React — while expanding toward full-stack development and AI-powered applications.",
  "Looking ahead, my goal is to evolve into a full-stack engineer and product builder, developing scalable applications and innovative tools that create real impact. I'm driven by curiosity, creativity, and the ambition to build technology that not only works well but also makes life easier for people and businesses.",
];

const EDUCATION = [
  {
    school: "Aptech Computing Education",
    degree: "Diploma in Software Engineering",
    year: "2023 — 2025",
    desc: "Completed a comprehensive software engineering diploma covering web development, programming fundamentals, databases, and modern development practices.",
  },
  {
    school: "Lincoln University Malaysia",
    degree: "Bachelor of Information Technology",
    year: "2025 — Present",
    desc: "Recently admitted to pursue a degree in Information Technology, furthering my academic foundation alongside active professional development.",
  },
];

const PROJECTS = [
  {
    number: "01",
    title: "Omaraf",
    subtitle: "Raffle Platform",
    description: "Developed a modern raffle platform frontend using React and Tailwind CSS, implementing responsive layouts, reusable UI components, and scalable architecture to support user participation workflows and future full-stack expansion.",
    tags: ["React.js", "Tailwind CSS", "JavaScript (ES6+)", "Responsive Design"],
    image: omaraf,
    link: "https://myomaraf.com/",
  },
  {
    number: "02",
    title: "Everything Tax Nigeria",
    subtitle: "Corporate Tax Advisory Website",
    description: "Built the frontend for a professional tax advisory firm — a modern, high-performance digital presence built with React and Tailwind CSS. Integrated Framer Motion animations to add polish while maintaining a clean, authoritative tone.",
    tags: ["React.js", "Tailwind CSS", "Framer Motion", "Component Architecture"],
    image: everythingtax,
    link: "https://everythingtax.ng/",
  },
  {
    number: "03",
    title: "Gaitanoe Properties",
    subtitle: "Real Estate Website",
    description: "Recreated and enhanced the Gaitanoe Properties real estate website with a mobile-first approach. Implemented hero section, statistics dashboard, featured properties grid, testimonials carousel, and responsive navigation.",
    tags: ["HTML5", "Tailwind CSS", "JavaScript", "Responsive Design"],
    image: gaitanoe,
    link: "https://gaitanoe.com/",
  },
];

// ─── ANIMATION VARIANTS ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

// ─── HELPERS ──────────────────────────────────────────────────────────────────

const AnimSection = ({ children, className = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"} className={className}>
      {children}
    </motion.div>
  );
};

const SectionTag = ({ label }) => (
  <AnimSection>
    <motion.div
      variants={fadeUp}
      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs tracking-widest uppercase mb-10 border border-blue-900 text-slate-500 bg-blue-950/30"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" />
      {label}
    </motion.div>
  </AnimSection>
);

// ─── COUNTER ──────────────────────────────────────────────────────────────────

const Counter = ({ to, label }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let n = 0;
    const step = Math.ceil(to / 40);
    const t = setInterval(() => {
      n += step;
      if (n >= to) { setCount(to); clearInterval(t); }
      else setCount(n);
    }, 28);
    return () => clearInterval(t);
  }, [inView, to]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl font-black text-blue-400 leading-none" style={{ fontFamily: "'Space Mono', monospace" }}>
        {count}+
      </div>
      <div className="text-xs tracking-widest uppercase text-slate-500 mt-1.5">{label}</div>
    </div>
  );
};

// ─── ROTATING CIRCLE ─────────────────────────────────────────────────────────

const RotatingCircle = ({ onClick }) => (
  <motion.button
    onClick={onClick}
    aria-label="Scroll to projects section"
    className="relative w-28 h-28 flex items-center justify-center cursor-pointer bg-transparent border-none flex-shrink-0"
    whileHover={{ scale: 1.07 }}
    whileTap={{ scale: 0.95 }}
  >
    <motion.svg
      viewBox="0 0 110 110"
      className="absolute inset-0 w-full h-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
    >
      <defs>
        <path id="c-path" d="M 55,55 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
      </defs>
      <text fill="#60a5fa" fontSize="9" fontFamily="'Space Mono', monospace" letterSpacing="3">
        <textPath href="#c-path">MY PROJECTS • MY PROJECTS • </textPath>
      </text>
    </motion.svg>
    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-lg font-bold shadow-[0_0_22px_#3b82f660]">
      ↓
    </div>
  </motion.button>
);

// ─── NAV ──────────────────────────────────────────────────────────────────────

const Nav = ({ active, scrollTo }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.button
        onClick={() => setOpen(o => !o)}
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        className="fixed top-6 right-6 z-50 w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white flex items-center justify-center shadow-[0_0_24px_#3b82f650] border-none cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={open ? "x" : "b"}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            {open ? <FaTimes size={15} /> : <FaBars size={15} />}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: -8 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            className="fixed top-20 right-6 z-40 rounded-2xl overflow-hidden min-w-[190px]"
            style={{ background: "rgba(5,12,26,0.97)", backdropFilter: "blur(20px)", border: "1px solid #1e3a6e" }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link.id}
                custom={i} variants={fadeUp} initial="hidden" animate="visible"
                onClick={() => { scrollTo(link.id); setOpen(false); }}
                aria-label={`Navigate to ${link.label} section`}
                className="w-full flex items-center gap-3 px-5 py-3.5 bg-transparent border-none cursor-pointer text-sm"
                style={{ color: active === link.id ? "#60a5fa" : "#94a3b8", fontFamily: "'Space Mono', monospace" }}
                whileHover={{ backgroundColor: "#0f1f3d", color: "#93c5fd" }}
              >
                <span className="text-blue-500">{link.icon}</span>
                {link.label}
              </motion.button>
            ))}
            <div className="border-t border-blue-950" />
            <motion.button
              custom={3} variants={fadeUp} initial="hidden" animate="visible"
              onClick={() => { scrollTo("contact"); setOpen(false); }}
              className="w-full flex items-center gap-3 px-5 py-3.5 bg-transparent border-none cursor-pointer text-sm"
              style={{ color: "#94a3b8", fontFamily: "'Space Mono', monospace" }}
              whileHover={{ backgroundColor: "#0f1f3d", color: "#93c5fd" }}
            >
              <FaEnvelope className="text-blue-500" /> Contact
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// ─── HERO SECTION ─────────────────────────────────────────────────────────────

const HeroSection = ({ scrollTo }) => (
  <section id="home" className="relative min-h-screen flex items-center overflow-hidden">

    {/* BG image */}
    <div
      className="absolute inset-0 bg-cover bg-center opacity-35 z-0"
      style={{ backgroundImage: `url(${bgimg})` }}
    />
    {/* Blue tint over bg */}
    <div className="absolute inset-0 z-0" style={{ background: "rgba(14,40,110,0.55)" }} />
    {/* Dark gradient */}
    <div className="absolute inset-0 z-0" style={{ background: "linear-gradient(135deg, rgba(5,12,26,0.88) 0%, rgba(7,21,40,0.72) 55%, rgba(5,12,26,0.88) 100%)" }} />
    {/* Stars */}
    <div className="absolute inset-0 z-0 pointer-events-none">
      <div className="stars" /><div className="stars2" /><div className="stars3" />
    </div>

    <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16 py-24">
      <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">

        {/* ── CARD ── */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex-shrink-0 flex flex-col items-center gap-4 rounded-3xl p-9 w-72 relative overflow-hidden"
          style={{
            background: "rgba(8,14,32,0.92)",
            border: "1.5px solid rgba(37,99,235,0.35)",
            backdropFilter: "blur(28px)",
            boxShadow: "0 0 80px rgba(37,99,235,0.12), 0 0 0 1px rgba(37,99,235,0.06), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          {/*
            ── CARD SIZE INCREASE ──────────────────────────────────────────
            Before: w-60 (240px), p-7 (28px), photo 120×130px
            After:  w-72 (288px), p-9 (36px), photo 150×165px
            Card width:   w-60  → w-72  (+48px wider)
            Card padding: p-7   → p-9   (+8px all sides)
            Photo width:  120px → 150px (+30px)
            Photo height: 130px → 165px (+35px)
            ────────────────────────────────────────────────────────────────
          */}
          <div
            className="absolute top-0 right-0 w-24 h-24 pointer-events-none"
            style={{ background: "linear-gradient(225deg, rgba(37,99,235,0.2) 0%, transparent 65%)", borderRadius: "0 24px 0 0" }}
          />
          {/* Dot grid pattern top-right */}
          <div
            className="absolute inset-0 pointer-events-none opacity-25"
            style={{
              backgroundImage: "radial-gradient(rgba(37,99,235,0.5) 1px, transparent 1px)",
              backgroundSize: "18px 18px",
              maskImage: "radial-gradient(ellipse at top right, black 15%, transparent 65%)",
              WebkitMaskImage: "radial-gradient(ellipse at top right, black 15%, transparent 65%)",
            }}
          />
          {/* Photo */}
          <div
            className="rounded-2xl overflow-hidden relative"
            style={{ width: 150, height: 165, boxShadow: "0 0 32px rgba(37,99,235,0.45)" }}
          >
            <img src={profile} alt="David Okolo — Front-end Developer based in Nigeria" className="w-full h-full object-cover grayscale" />
            <div className="absolute inset-0" style={{ background: "rgba(29,78,216,0.5)", mixBlendMode: "multiply" }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(155deg, rgba(255,255,255,0.07) 0%, transparent 55%)" }} />
          </div>

          {/* Name */}
          <div className="text-center">
            <p className="text-slate-100 font-bold text-sm tracking-wide">David Okolo</p>
            <p className="text-blue-400 text-xs mt-0.5 font-semibold">Front-end Developer</p>
          </div>

          {/* Available badge */}
          <motion.div
            animate={{ opacity: [1, 0.55, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold"
            style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.25)", color: "#4ade80" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />
            Available for work
          </motion.div>

          {/* Contact info */}
          <div className="text-center text-xs leading-relaxed">
            <a href="mailto:dvdokolo@gmail.com" className="text-slate-500 hover:text-blue-400 transition-colors no-underline">dvdokolo@gmail.com</a>
            <p className="mt-0.5 text-slate-600">Based in Nigeria 🇳🇬</p>
          </div>

          {/* Socials */}
          <div className="flex gap-2">
            {SOCIALS.map(s => (
              <motion.a
                key={s.label} href={s.href} title={s.label}
                aria-label={`Visit my ${s.label} profile`}
                target="_blank" rel="noopener noreferrer"
                whileHover={{ y: -3, color: "#60a5fa" }}
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs text-slate-500 transition-all no-underline"
                style={{ background: "rgba(37,99,235,0.1)", border: "1px solid rgba(37,99,235,0.22)" }}
              >
                {s.icon}
              </motion.a>
            ))}
          </div>

          {/* Hire Me — scrolls to contact form */}
          <motion.button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            aria-label="Hire me — go to contact form"
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
            className="w-full py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 text-white border-none cursor-pointer"
            style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)", boxShadow: "0 4px 22px rgba(37,99,235,0.45)" }}
          >
            <FaEnvelope size={12} /> Hire Me
          </motion.button>
        </motion.div>

        {/* ── HEADLINE ── */}
        <div className="flex-1 min-w-0">
          {/* Tag */}
          <motion.div
            custom={0} variants={fadeUp} initial="hidden" animate="visible"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs tracking-widest uppercase mb-8 border border-blue-900 text-slate-500 bg-blue-950/20"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" />
            Introduce
          </motion.div>

          {/* H1 */}
          <motion.h1
            custom={1} variants={fadeUp} initial="hidden" animate="visible"
            className="font-black leading-none mb-6 text-slate-100"
            style={{ fontSize: "clamp(2.6rem, 5.5vw, 5rem)", fontFamily: "'Space Mono', monospace" }}
          >
            Say Hi from{" "}
            <span className="text-blue-500" style={{ textShadow: "0 0 40px rgba(37,99,235,0.5)" }}>David</span>,
            <br />
            <span className="text-slate-400" style={{ fontSize: "0.68em" }}>Front-end Developer</span>
          </motion.h1>

          <motion.p
            custom={2} variants={fadeUp} initial="hidden" animate="visible"
            className="text-base md:text-lg leading-relaxed mb-10 max-w-lg text-slate-500"
          >
            Passionate about building intuitive, user-friendly web experiences. Currently expanding into full-stack development and AI-powered applications.
          </motion.p>

          {/* Stats */}
          <motion.div
            custom={3} variants={fadeUp} initial="hidden" animate="visible"
            className="flex items-end gap-12 mb-10 flex-wrap"
          >
            <Counter to={3}  label="Years of Experience" />
            <Counter to={8}  label="Technologies Mastered" />
            <RotatingCircle onClick={() => scrollTo("projects")} />
          </motion.div>

          {/* CTAs */}
          <motion.div
            custom={4} variants={fadeUp} initial="hidden" animate="visible"
            className="flex flex-wrap gap-4"
          >
            <motion.button
              onClick={() => scrollTo("projects")}
              aria-label="View my projects"
              whileHover={{ scale: 1.04, boxShadow: "0 0 28px #3b82f660" }}
              whileTap={{ scale: 0.97 }}
              className="px-7 py-3 rounded-xl font-bold text-sm text-white border-none cursor-pointer bg-gradient-to-br from-blue-500 to-blue-700 shadow-[0_4px_20px_#1d4ed840]"
            >
              View Projects
            </motion.button>
            <motion.button
              onClick={() => scrollTo("contact")}
              aria-label="Contact me"
              whileHover={{ scale: 1.04, backgroundColor: "#0f1f3d" }}
              whileTap={{ scale: 0.97 }}
              className="px-7 py-3 rounded-xl font-bold text-sm text-blue-400 border-2 border-blue-700 bg-transparent cursor-pointer transition-colors"
            >
              Contact Me
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  </section>
);

// ─── ABOUT SECTION ────────────────────────────────────────────────────────────

const AboutSection = () => (
  <section id="about" className="min-h-screen py-24 px-6 md:px-16" style={{ background: "linear-gradient(180deg, #0a0f1e 0%, #050c1a 100%)" }}>
    <div className="max-w-5xl mx-auto">

      <SectionTag label="About" />

      <AnimSection>
        <motion.h2
          variants={fadeUp}
          className="font-black leading-tight mb-4 text-slate-100"
          style={{ fontSize: "clamp(1.8rem, 4.5vw, 3.4rem)", fontFamily: "'Space Mono', monospace", maxWidth: 680 }}
        >
          Every great design begins with an even{" "}
          <span className="text-blue-400" style={{ textShadow: "0 0 30px #3b82f660" }}>better story</span>
        </motion.h2>
      </AnimSection>

      {/* Bio */}
      <AnimSection className="mb-14 mt-6 space-y-4">
        {BIO.map((text, i) => (
          <motion.p key={i} custom={i} variants={fadeUp} className="text-slate-400 text-sm leading-relaxed max-w-2xl">
            {text}
          </motion.p>
        ))}
      </AnimSection>

      {/* Education */}
      <AnimSection className="mb-14">
        <motion.p variants={fadeUp} className="text-xs tracking-widest uppercase text-slate-700 mb-5 font-semibold">
          Education
        </motion.p>
        <div className="flex flex-col gap-4">
          {EDUCATION.map((ed, i) => (
            <motion.div
              key={ed.school} custom={i} variants={fadeUp}
              className="flex gap-5 p-5 rounded-2xl"
              style={{ background: "rgba(10,18,40,0.7)", border: "1px solid #1e3a6e" }}
            >
              <div className="w-1 flex-shrink-0 rounded-full mt-1" style={{ background: "linear-gradient(to bottom, #3b82f6, #1d4ed8)", minHeight: 40 }} />
              <div>
                <div className="flex items-center gap-3 flex-wrap mb-1">
                  <p className="text-slate-100 font-bold text-sm m-0">{ed.school}</p>
                  <span className="text-xs text-blue-500 font-mono">{ed.year}</span>
                </div>
                <p className="text-blue-400 text-xs font-semibold mb-2">{ed.degree}</p>
                <p className="text-slate-500 text-xs leading-relaxed m-0">{ed.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimSection>

      {/* Highlights */}
      <AnimSection className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
        {HIGHLIGHTS.map((h, i) => (
          <motion.div
            key={h.title} custom={i} variants={fadeUp}
            whileHover={{ y: -6, borderColor: "#3b82f6" }}
            className="p-6 rounded-2xl transition-colors"
            style={{ background: "rgba(10,18,40,0.8)", border: "1px solid #1e3a6e", backdropFilter: "blur(12px)" }}
          >
            <div className="text-blue-500 text-2xl mb-3">{h.icon}</div>
            <h3 className="text-slate-100 font-bold mb-2 text-sm">{h.title}</h3>
            <p className="text-slate-500 text-xs leading-relaxed">{h.desc}</p>
          </motion.div>
        ))}
      </AnimSection>

      {/* Journey */}
      <AnimSection>
        <motion.p variants={fadeUp} className="text-xs tracking-widest uppercase text-slate-700 mb-7 font-semibold">
          My Journey
        </motion.p>
      </AnimSection>

      <AnimSection className="relative mb-16">
        {/* Vertical line */}
        <div className="absolute top-0 bottom-0 w-px" style={{ left: 68, background: "linear-gradient(to bottom, transparent, #2563eb55, transparent)" }} />
        {JOURNEY.map((j, i) => (
          <motion.div key={`${j.year}-${i}`} custom={i} variants={fadeUp} className="flex gap-7 items-start mb-8 relative">
            <div className="min-w-[56px] text-right text-blue-500 font-bold text-xs pt-1" style={{ fontFamily: "'Space Mono', monospace" }}>
              {j.year}
            </div>
            <div className="w-3 h-3 rounded-full flex-shrink-0 mt-1 z-10 bg-blue-800 border-2 border-blue-500 shadow-[0_0_12px_#3b82f660]" />
            <div>
              <p className="text-slate-100 font-bold text-sm mb-1">{j.label}</p>
              <p className="text-slate-500 text-xs leading-relaxed">{j.desc}</p>
            </div>
          </motion.div>
        ))}
      </AnimSection>

      {/* Skills */}
      <AnimSection>
        <motion.p variants={fadeUp} className="text-xs tracking-widest uppercase text-slate-700 mb-5 font-semibold">
          Technical Skills
        </motion.p>
      </AnimSection>

      <AnimSection className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-14">
        {SKILLS.map((skill, i) => (
          <motion.a
            key={skill.name} custom={i} variants={fadeUp}
            href={skill.docs} target="_blank" rel="noopener noreferrer"
            whileHover={{ y: -5, borderColor: "#3b82f6", boxShadow: "0 0 20px rgba(37,99,235,0.2)" }}
            className="flex flex-col items-center gap-2 py-4 px-2 rounded-xl transition-all no-underline group relative"
            style={{ background: "rgba(10,18,40,0.8)", border: "1px solid #1e3a6e", backdropFilter: "blur(10px)" }}
          >
            <span className={`text-2xl ${skill.color}`}>{skill.icon}</span>
            <span className="text-slate-500 text-xs text-center leading-tight group-hover:text-slate-300 transition-colors">{skill.name}</span>
            {/* Docs tooltip */}
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded text-xs text-blue-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap" style={{ background: "rgba(5,12,26,0.95)", border: "1px solid #1e3a6e" }}>
              View Docs ↗
            </span>
          </motion.a>
        ))}
      </AnimSection>

      {/* Resume */}
      <AnimSection>
        <motion.a
          variants={fadeUp}
          href="/DavidOkoloResume.pdf"
          download
          aria-label="Download David Okolo's resume PDF"
          whileHover={{ scale: 1.04, boxShadow: "0 0 28px #3b82f660" }}
          whileTap={{ scale: 0.96 }}
          className="inline-flex items-center gap-2.5 px-7 py-3 rounded-xl font-bold text-sm text-white no-underline bg-gradient-to-br from-blue-500 to-blue-700 shadow-[0_4px_24px_#1d4ed840]"
        >
          <FaDownload size={13} /> Download Resume
        </motion.a>
      </AnimSection>

    </div>
  </section>
);

// ─── PROJECTS SECTION ────────────────────────────────────────────────────────

const ProjectCard = ({ project, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative group"
    >
      {/* Row divider */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #1e3a6e, transparent)" }} />

      <div className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-12 md:gap-20 py-20`}>

        {/* ── TEXT SIDE ── */}
        <div className="flex-1 min-w-0">
          {/* Project number */}
          <div
            className="text-8xl font-black leading-none mb-4 select-none"
            style={{
              fontFamily: "'Space Mono', monospace",
              color: "transparent",
              WebkitTextStroke: "1px rgba(37,99,235,0.2)",
            }}
          >
            {project.number}
          </div>

          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs tracking-widest uppercase text-blue-500 font-semibold">
              {project.subtitle}
            </span>
          </div>

          <h3
            className="font-black text-slate-100 mb-5 leading-tight"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", fontFamily: "'Space Mono', monospace" }}
          >
            {project.title}
          </h3>

          <p className="text-slate-400 text-sm leading-relaxed mb-7 max-w-md">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map(tag => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-medium text-blue-300 border border-blue-900"
                style={{ background: "rgba(37,99,235,0.08)" }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Live link */}
          <motion.a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, boxShadow: "0 0 28px #3b82f640" }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold text-sm text-white no-underline bg-gradient-to-br from-blue-500 to-blue-700"
            style={{ boxShadow: "0 4px 20px rgba(37,99,235,0.3)" }}
          >
            <FaExternalLinkAlt size={12} /> Live Demo
          </motion.a>
        </div>

        {/* ── IMAGE SIDE ── */}
        <motion.div
          whileHover={{ scale: 1.02, rotateY: isEven ? -2 : 2 }}
          transition={{ duration: 0.4 }}
          className="flex-1 w-full max-w-xl relative"
          style={{ perspective: 1000 }}
        >
          {/* Glow behind image */}
          <div
            className="absolute -inset-4 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: "radial-gradient(ellipse, rgba(37,99,235,0.15) 0%, transparent 70%)" }}
          />

          <div
            className="relative rounded-2xl overflow-hidden"
            style={{ border: "1px solid rgba(37,99,235,0.25)", boxShadow: "0 24px 60px rgba(0,0,0,0.5)" }}
          >
            <img
              src={project.image}
              alt={`Screenshot of ${project.title} project`}
              className="w-full h-auto block"
              style={{ aspectRatio: "16/10", objectFit: "cover" }}
            />
            {/* Subtle blue tint overlay */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
              style={{ background: "rgba(37,99,235,0.08)" }}
            />
            {/* Corner badge */}
            <div
              className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-blue-300"
              style={{ background: "rgba(5,12,26,0.85)", border: "1px solid rgba(37,99,235,0.3)", backdropFilter: "blur(8px)" }}
            >
              {project.number}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => (
  <section
    id="projects"
    className="relative py-24 px-6 md:px-16 overflow-hidden"
    style={{ background: "#050c1a" }}
  >
    {/* Net / grid background */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `
          linear-gradient(rgba(37,99,235,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(37,99,235,0.04) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
      }}
    />
    {/* Fade edges */}
    <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, transparent 40%, #050c1a 100%)" }} />

    <div className="relative z-10 max-w-6xl mx-auto">
      {/* Heading */}
      <AnimSection className="mb-4">
        <motion.div
          variants={fadeUp}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs tracking-widest uppercase mb-6 border border-blue-900 text-slate-500 bg-blue-950/30"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" />
          Projects
        </motion.div>
      </AnimSection>

      <AnimSection className="mb-16">
        <motion.h2
          variants={fadeUp}
          className="font-black text-slate-100 leading-none"
          style={{ fontSize: "clamp(3rem, 8vw, 7rem)", fontFamily: "'Space Mono', monospace" }}
        >
          Selected<br />
          <span className="text-blue-500" style={{ textShadow: "0 0 60px rgba(37,99,235,0.4)" }}>
            Work.
          </span>
        </motion.h2>
        <motion.p variants={fadeUp} className="text-slate-500 text-sm mt-4 max-w-md">
          Real projects, real clients, real impact — built with modern web technologies.
        </motion.p>
      </AnimSection>

      {/* Project rows */}
      {PROJECTS.map((project, i) => (
        <ProjectCard key={project.title} project={project} index={i} />
      ))}

      {/* Bottom divider */}
      <div className="h-px mt-4" style={{ background: "linear-gradient(90deg, transparent, #1e3a6e, transparent)" }} />

      {/* View All Projects button */}
      <Link to="/projects" aria-label="View all projects page">
        <AnimSection className="flex justify-center mt-14">
          <motion.a
            variants={fadeUp}
            whileHover={{ scale: 1.04, boxShadow: "0 0 36px #3b82f640" }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-base text-white no-underline border border-blue-700 transition-all"
            style={{ background: "rgba(37,99,235,0.1)", backdropFilter: "blur(12px)" }}
          >
            View All Projects
            <span className="text-blue-400 text-lg">→</span>
          </motion.a>
        </AnimSection>
      </Link>
    </div>
  </section>
);

// ─── CONTACT SECTION ─────────────────────────────────────────────────────────

// ── EmailJS credentials ──
const EMAILJS_SERVICE_ID  = "service_wp9vohs";
const EMAILJS_TEMPLATE_ID = "template_0zbpct1";
const EMAILJS_PUBLIC_KEY  = "bCfHyy7C6wN5HlW5U";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError("");

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:  form.name,
          from_email: form.email,
          subject:    form.subject,
          message:    form.message,
        },
        EMAILJS_PUBLIC_KEY
      );
      setSent(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setError("Something went wrong. Please try again or email me directly at dvdokolo@gmail.com");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="relative min-h-screen py-24 px-6 md:px-16 overflow-hidden" style={{ background: "linear-gradient(180deg, #050c1a 0%, #03070f 100%)" }}>
      {/* Net background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(37,99,235,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.035) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at bottom left, rgba(37,99,235,0.08) 0%, transparent 60%)" }} />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

          {/* ── LEFT: CTA TEXT ── */}
          <div className="flex-1 lg:sticky lg:top-24">
            <AnimSection>
              <motion.div
                variants={fadeUp}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs tracking-widest uppercase mb-10 border border-blue-900 text-slate-500 bg-blue-950/30"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" />
                Contact Me
              </motion.div>
            </AnimSection>

            <AnimSection>
              <motion.h2
                variants={fadeUp}
                className="font-black text-slate-100 leading-none mb-6"
                style={{ fontSize: "clamp(2.8rem, 6vw, 5.5rem)", fontFamily: "'Space Mono', monospace" }}
              >
                Let's work<br />
                <span className="text-blue-500" style={{ textShadow: "0 0 50px rgba(37,99,235,0.5)" }}>
                  together.
                </span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-slate-400 text-base leading-relaxed max-w-sm mb-10">
                Have a project in mind? Want to collaborate or just say hi? My inbox is always open — I'd love to hear from you.
              </motion.p>
            </AnimSection>

            {/* Contact info pills - icon only */}
            <AnimSection className="flex gap-4">
              {[
                // { icon: <FaEnvelope size={14} />,  href: "mailto:dvdokolo@gmail.com" },
                { icon: <FaWhatsapp size={14} />,  href: "https://wa.me/2349131940037" },
                { icon: <FaTiktok size={14} />,    href: "https://www.tiktok.com/@david.codess" },
                { icon: <FaLinkedin size={14} />,  href: "https://linkedin.com/in/yourusername" },
                { icon: <FaGithub />,    label: "GitHub",   href: "https://github.com/Dvdokolo" },
              ].map((item, i) => (
                <motion.a
                  key={i}
                  custom={i} variants={fadeUp}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, borderColor: "#3b82f6", color: "#60a5fa" }}
                  className="w-12 h-12 flex items-center justify-center rounded-xl no-underline transition-all text-slate-500"
                  style={{ background: "rgba(10,18,40,0.7)", border: "1px solid #1e3a6e" }}
                >
                  <span className="text-blue-500">{item.icon}</span>
                </motion.a>
              ))}
            </AnimSection>
          </div>

          {/* ── RIGHT: FORM ── */}
          <AnimSection className="flex-1 w-full">
            <motion.div
              variants={fadeUp}
              className="rounded-3xl p-8 md:p-10 relative overflow-hidden"
              style={{
                background: "rgba(8,14,32,0.9)",
                border: "1.5px solid rgba(37,99,235,0.3)",
                backdropFilter: "blur(24px)",
                boxShadow: "0 0 80px rgba(37,99,235,0.08)",
              }}
            >
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none" style={{ background: "linear-gradient(225deg, rgba(37,99,235,0.15) 0%, transparent 65%)", borderRadius: "0 24px 0 0" }} />

              <h3 className="text-slate-100 font-bold text-xl mb-8" style={{ fontFamily: "'Space Mono', monospace" }}>
                Send a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name + Email row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-slate-500 mb-2">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="full name"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl text-sm text-slate-200 placeholder-slate-600 outline-none transition-all"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid #1e3a6e" }}
                      onFocus={e => e.target.style.borderColor = "#3b82f6"}
                      onBlur={e => e.target.style.borderColor = "#1e3a6e"}
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-slate-500 mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl text-sm text-slate-200 placeholder-slate-600 outline-none transition-all"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid #1e3a6e" }}
                      onFocus={e => e.target.style.borderColor = "#3b82f6"}
                      onBlur={e => e.target.style.borderColor = "#1e3a6e"}
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs tracking-widest uppercase text-slate-500 mb-2">Subject *</label>
                  <input
                    type="text"
                    required
                    placeholder="Project collaboration, freelance work..."
                    value={form.subject}
                    onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl text-sm text-slate-200 placeholder-slate-600 outline-none transition-all"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid #1e3a6e" }}
                    onFocus={e => e.target.style.borderColor = "#3b82f6"}
                    onBlur={e => e.target.style.borderColor = "#1e3a6e"}
                  />
                </div>

                {/* Message — bigger textarea */}
                <div>
                  <label className="block text-xs tracking-widest uppercase text-slate-500 mb-2">Message *</label>
                  <textarea
                    required
                    rows={8}
                    placeholder="Tell me about your project, timeline, budget... the more detail the better!"
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl text-sm text-slate-200 placeholder-slate-600 outline-none transition-all resize-none"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid #1e3a6e" }}
                    onFocus={e => e.target.style.borderColor = "#3b82f6"}
                    onBlur={e => e.target.style.borderColor = "#1e3a6e"}
                  />
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  aria-label="Send message"
                  disabled={sending || sent}
                  whileHover={{ scale: sending || sent ? 1 : 1.02, boxShadow: "0 0 32px #3b82f650" }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-4 rounded-xl font-bold text-base text-white flex items-center justify-center gap-3 cursor-pointer border-none transition-all"
                  style={{ background: sent ? "rgba(34,197,94,0.2)" : "linear-gradient(135deg, #2563eb, #1d4ed8)", boxShadow: "0 4px 24px rgba(37,99,235,0.35)" }}
                >
                  {sent ? (
                    <><span className="text-green-400">✓</span> <span className="text-green-400">Message Sent!</span></>
                  ) : sending ? (
                    <><span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" /> Sending...</>
                  ) : (
                    <>Send Message <span className="text-lg">→</span></>
                  )}
                </motion.button>

                {/* Error message */}
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-xs text-center leading-relaxed"
                  >
                    {error}
                  </motion.p>
                )}

                {!sent && !error && (
                  <p className="text-slate-600 text-xs text-center">
                    I'll get back to you within 24 hours. ✉️
                  </p>
                )}
              </form>
            </motion.div>
          </AnimSection>
        </div>
      </div>
    </section>
  );
};

// ─── ROOT ─────────────────────────────────────────────────────────────────────

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && setActiveSection(e.target.id)),
      { threshold: 0.4 }
    );
    ["home", "about", "projects", "contact"].forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="bg-[#050c1a] min-h-screen text-white font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Inter:wght@400;500;600;700;900&display=swap');
        html { scroll-behavior: smooth; font-family: 'Inter', sans-serif; }
        *, *::before, *::after { box-sizing: border-box; }
        body { margin: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #050c1a; }
        ::-webkit-scrollbar-thumb { background: #3b82f6; border-radius: 2px; }
        .stars, .stars2, .stars3 { position: absolute; top: 0; left: 0; right: 0; bottom: 0; }
        .stars {
          background-image:
            radial-gradient(1px 1px at 12% 22%, rgba(255,255,255,0.5) 0%, transparent 100%),
            radial-gradient(1px 1px at 33% 62%, rgba(255,255,255,0.35) 0%, transparent 100%),
            radial-gradient(1px 1px at 68% 28%, rgba(255,255,255,0.45) 0%, transparent 100%),
            radial-gradient(1px 1px at 88% 78%, rgba(255,255,255,0.25) 0%, transparent 100%),
            radial-gradient(1px 1px at 52% 12%, rgba(255,255,255,0.4) 0%, transparent 100%),
            radial-gradient(1px 1px at 78% 48%, rgba(255,255,255,0.45) 0%, transparent 100%);
          animation: twinkle 4s ease-in-out infinite alternate;
        }
        .stars2 {
          background-image:
            radial-gradient(1px 1px at 18% 38%, rgba(255,255,255,0.3) 0%, transparent 100%),
            radial-gradient(1px 1px at 62% 82%, rgba(255,255,255,0.2) 0%, transparent 100%),
            radial-gradient(1px 1px at 38% 14%, rgba(255,255,255,0.4) 0%, transparent 100%),
            radial-gradient(1px 1px at 84% 24%, rgba(255,255,255,0.3) 0%, transparent 100%);
          animation: twinkle 6s ease-in-out infinite alternate;
        }
        .stars3 {
          background-image:
            radial-gradient(2px 2px at 55% 45%, rgba(96,165,250,0.25) 0%, transparent 100%),
            radial-gradient(2px 2px at 15% 72%, rgba(96,165,250,0.18) 0%, transparent 100%),
            radial-gradient(2px 2px at 72% 62%, rgba(96,165,250,0.22) 0%, transparent 100%);
          animation: twinkle 8s ease-in-out infinite alternate;
        }
        @keyframes twinkle { 0% { opacity: 0.35; } 100% { opacity: 1; } }
        .net-bg {
          background-image:
            linear-gradient(rgba(37,99,235,0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37,99,235,0.045) 1px, transparent 1px);
          background-size: 60px 60px;
        }
      `}</style>

      <Nav active={activeSection} scrollTo={scrollTo} />
      <HeroSection scrollTo={scrollTo} />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
}