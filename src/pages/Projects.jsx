import { useRef, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { FaExternalLinkAlt, FaArrowLeft } from "react-icons/fa";
import omaraf from "../images/omaraf.png";
import everythingtax from "../images/everythingtax.png";
import gaitanoe from "../images/gaitanoe.png";
import geebees from "../images/geebees.png";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const PROJECTS = [
  {
    number: "01",
    title: "Omaraf",
    subtitle: "Raffle Platform",
    category: "Web App",
    year: "2025",
    link: "https://myomaraf.com/",
    image: omaraf,
    description: "A modern raffle platform built with React and Tailwind CSS. Fully responsive, component-driven architecture designed to scale into a full-stack product.",
    highlights: [
      "Responsive UI with mobile-first approach",
      "Reusable component library for scalability",
      "Scalable architecture for full-stack expansion",
    ],
    tags: ["React.js", "Tailwind CSS", "JavaScript (ES6+)", "Responsive Design"],
    color: "#3b82f6",
    role: "Frontend Developer",
    credit: "Foxy Labs",
    creditLink: "https://www.thefoxylabs.com/",
  },
  {
    number: "02",
    title: "Everything Tax Nigeria",
    subtitle: "Corporate Tax Advisory",
    category: "Client Project",
    year: "2025",
    link: "https://everythingtax.ng/",
    image: everythingtax,
    description: "Frontend for a professional Nigerian tax advisory firm. Built to communicate authority and trust — polished animations, fast load times, consistent design system.",
    highlights: [
      "Framer Motion animations for polished UX",
      "Consistent Tailwind CSS design system",
      "Professional tone matching brand identity",
    ],
    tags: ["React.js", "Tailwind CSS", "Framer Motion", "JavaScript"],
    color: "#818cf8",
    role: "Frontend Developer",
    credit: "Foxy Labs",
    creditLink: "https://www.thefoxylabs.com/",
  },
  {
    number: "03",
    title: "Gaitanoe Properties",
    subtitle: "Real Estate Website",
    category: "Client Project",
    year: "2024",
    link: "https://gaitanoe.com/",
    image: gaitanoe,
    description: "Enhanced real estate website with a mobile-first approach. Features hero section, property listings grid, stats dashboard, testimonials carousel, and team showcase.",
    highlights: [
      "Mobile-first responsive design",
      "Dynamic statistics dashboard",
      "Testimonials carousel with smooth interactions",
    ],
    tags: ["HTML5", "Tailwind CSS", "JavaScript", "CSS Animations"],
    color: "#38bdf8",
    role: "Frontend Developer",
    credit: "Foxy Labs",
    creditLink: "https://www.thefoxylabs.com/",
  },
  {
    number: "04",
    title: "GeeBee's",
    subtitle: "Food & Restaurant",
    category: "Client Project",
    year: "2024",
    link: "http://geebees.me/",
    image: geebees,
    description: "Website for GeeBee's — a Nigerian cuisine restaurant founded by Chef Mayokun Alli, named in honour of his mother. Built to capture the warmth and culture behind the brand, showcasing signature dishes like Gizzard Dodo, Jollof Rice, and the family-themed Tee Time Box.",
    highlights: [
      "Warm, culture-rich design reflecting the brand story",
      "Signature dish showcase with appetising layout",
      "Fully responsive across mobile and desktop",
    ],
    tags: ["HTML5", "Bootstrap", "JavaScript", "Responsive Design"],
    color: "#f59e0b",
    role: "Frontend Developer",
    credit: "Foxy Labs",
    creditLink: "https://www.thefoxylabs.com/",
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
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.09 } } };

const AnimSection = ({ children, className = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"} className={className}>
      {children}
    </motion.div>
  );
};

// ─── DINO GAME ────────────────────────────────────────────────────────────────

const GROUND = 130;
const GW = 700;
const GH = 180;

const DinoGame = () => {
  const canvasRef = useRef(null);
  const gameRef = useRef({
    running: false, over: false, score: 0, hiScore: 0,
    frame: 0, speed: 5,
    dino: { x: 80, y: 0, vy: 0, jumping: false, dead: false },
    obstacles: [], clouds: [], groundX: 0,
  });
  const rafRef = useRef(null);
  const [gameState, setGameState] = useState("idle");
  const [displayScore, setDisplayScore] = useState(0);
  const [displayHi, setDisplayHi] = useState(0);

  const doJump = useCallback(() => {
    const g = gameRef.current;
    if (g.over) {
      // restart
      g.running = true; g.over = false; g.score = 0; g.frame = 0; g.speed = 5;
      g.dino = { x: 80, y: 0, vy: 0, jumping: false, dead: false };
      g.obstacles = []; g.clouds = [];
      setDisplayScore(0);
      setGameState("running");
      return;
    }
    if (!g.running) { g.running = true; setGameState("running"); }
    if (!g.dino.jumping) { g.dino.vy = -13; g.dino.jumping = true; }
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.code === "Space" || e.code === "ArrowUp") { e.preventDefault(); doJump(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [doJump]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const g = gameRef.current;

    const drawDino = (x, y, dead) => {
      const by = GROUND - 50 + y;
      ctx.fillStyle = dead ? "#ef4444" : "#60a5fa";
      ctx.fillRect(x, by + 10, 34, 28);       // body
      ctx.fillRect(x + 14, by, 22, 20);        // head
      ctx.fillStyle = "#050c1a";
      ctx.fillRect(x + 28, by + 5, 5, 5);      // eye
      ctx.fillStyle = dead ? "#fca5a5" : "#93c5fd";
      ctx.fillRect(x + 32, by + 13, 6, 3);     // mouth
      ctx.fillStyle = dead ? "#ef4444" : "#60a5fa";
      ctx.fillRect(x - 10, by + 16, 14, 8);    // tail
      const leg = dead ? 0 : Math.sin(g.frame * 0.28) * 7;
      ctx.fillRect(x + 6,  by + 38, 8, 12 + leg);
      ctx.fillRect(x + 20, by + 38, 8, 12 - leg);
    };

    const drawCactus = (x) => {
      ctx.fillStyle = "#1e3a6e";
      ctx.fillRect(x + 10, GROUND - 52, 12, 52);
      ctx.fillRect(x,      GROUND - 36, 12, 8);
      ctx.fillRect(x,      GROUND - 44, 8,  16);
      ctx.fillRect(x + 20, GROUND - 30, 12, 8);
      ctx.fillRect(x + 24, GROUND - 40, 8,  18);
      ctx.fillStyle = "#2563eb";
      ctx.fillRect(x + 10, GROUND - 56, 12, 6);
    };

    const drawBird = (x, y) => {
      const flap = Math.sin(g.frame * 0.22) > 0;
      ctx.fillStyle = "#818cf8";
      ctx.fillRect(x, y, 30, 12);
      ctx.fillRect(x + 4, flap ? y - 10 : y + 10, 22, 9);
      ctx.fillStyle = "#38bdf8";
      ctx.fillRect(x + 28, y + 4, 8, 4);
    };

    const drawCloud = (x, y) => {
      ctx.fillStyle = "rgba(37,99,235,0.055)";
      ctx.beginPath();
      ctx.ellipse(x,      y,     32, 14, 0, 0, Math.PI * 2);
      ctx.ellipse(x + 22, y - 7, 20, 11, 0, 0, Math.PI * 2);
      ctx.ellipse(x - 16, y - 4, 18, 10, 0, 0, Math.PI * 2);
      ctx.fill();
    };

    const collides = (dino, obs) => {
      const d = { x: dino.x + 6, y: GROUND - 50 + dino.y + 10, w: 26, h: 36 };
      const o = obs.type === "bird"
        ? { x: obs.x + 2, y: obs.y + 2, w: 26, h: 8 }
        : { x: obs.x + 4, y: GROUND - 48, w: 24, h: 48 };
      return d.x < o.x + o.w && d.x + d.w > o.x && d.y < o.y + o.h && d.y + d.h > o.y;
    };

    const tick = () => {
      ctx.clearRect(0, 0, GW, GH);

      // bg
      ctx.fillStyle = "#050c1a";
      ctx.fillRect(0, 0, GW, GH);

      // ground
      ctx.strokeStyle = "rgba(37,99,235,0.28)";
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(0, GROUND); ctx.lineTo(GW, GROUND); ctx.stroke();
      ctx.fillStyle = "rgba(37,99,235,0.12)";
      for (let i = 0; i < 15; i++) {
        const dx = ((g.groundX + i * 54) % (GW + 54)) - 10;
        ctx.fillRect(dx, GROUND + 4, 30, 2);
      }

      if (!g.running) {
        // idle
        ctx.fillStyle = "rgba(96,165,250,0.55)";
        ctx.font = "bold 13px 'Space Mono', monospace";
        ctx.textAlign = "center";
        ctx.fillText("PRESS SPACE OR TAP TO PLAY", GW / 2, GH / 2 - 8);
        ctx.fillStyle = "rgba(96,165,250,0.28)";
        ctx.font = "11px 'Space Mono', monospace";
        ctx.fillText("jump over obstacles — don't get hit", GW / 2, GH / 2 + 14);
        drawDino(80, 0, false);
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      g.frame++;
      g.groundX -= g.speed;
      if (g.frame % 500 === 0) g.speed = Math.min(g.speed + 0.6, 14);

      // clouds
      if (g.frame % 90 === 0) g.clouds.push({ x: GW + 50, y: 18 + Math.random() * 55 });
      g.clouds.forEach(c => { c.x -= 1.2; drawCloud(c.x, c.y); });
      g.clouds = g.clouds.filter(c => c.x > -80);

      // obstacles
      const last = g.obstacles[g.obstacles.length - 1];
      const gap = Math.max(260, 460 - g.score * 0.4);
      if (!last || last.x < GW - gap) {
        const isBird = Math.random() < 0.28 && g.score > 250;
        g.obstacles.push({
          type: isBird ? "bird" : "cactus",
          x: GW + 20,
          y: isBird ? GROUND - 60 - Math.random() * 28 : 0,
        });
      }
      g.obstacles.forEach(o => { o.x -= g.speed; if (o.type === "cactus") drawCactus(o.x); else drawBird(o.x, o.y); });
      g.obstacles = g.obstacles.filter(o => o.x > -60);

      // dino physics
      if (!g.over) {
        g.dino.vy += 0.72;
        g.dino.y += g.dino.vy;
        if (g.dino.y >= 0) { g.dino.y = 0; g.dino.vy = 0; g.dino.jumping = false; }
      }

      // collision
      if (!g.over) {
        for (const o of g.obstacles) {
          if (collides(g.dino, o)) {
            g.over = true; g.dino.dead = true;
            if (Math.floor(g.score / 2) > g.hiScore) {
              g.hiScore = Math.floor(g.score / 2);
              setDisplayHi(g.hiScore);
            }
            setGameState("over");
            break;
          }
        }
      }

      drawDino(g.dino.x, g.dino.y, g.dino.dead);

      if (!g.over) {
        g.score++;
        if (g.frame % 2 === 0) setDisplayScore(Math.floor(g.score / 2));
      }

      // score overlay
      ctx.fillStyle = "rgba(96,165,250,0.45)";
      ctx.font = "bold 12px 'Space Mono', monospace";
      ctx.textAlign = "right";
      ctx.fillText(String(Math.floor(g.score / 2)).padStart(5, "0"), GW - 14, 22);
      if (g.hiScore > 0) {
        ctx.fillStyle = "rgba(96,165,250,0.2)";
        ctx.fillText(`HI ${String(g.hiScore).padStart(5, "0")}`, GW - 80, 22);
      }

      if (g.over) {
        ctx.fillStyle = "rgba(5,12,26,0.72)";
        ctx.fillRect(0, 0, GW, GH);
        ctx.fillStyle = "#ef4444";
        ctx.font = "bold 16px 'Space Mono', monospace";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", GW / 2, GH / 2 - 14);
        ctx.fillStyle = "rgba(96,165,250,0.6)";
        ctx.font = "12px 'Space Mono', monospace";
        ctx.fillText("TAP OR PRESS SPACE TO RESTART", GW / 2, GH / 2 + 12);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className="mb-20">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-xs tracking-widest uppercase text-slate-700 font-semibold" style={{ fontFamily: "'Space Mono', monospace" }}>
           easter egg
        </span>
        <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, #1e3a6e44, transparent)" }} />
        <span className="text-xs text-slate-700">scroll past to see projects ↓</span>
      </div>

      <div
        className="relative rounded-2xl overflow-hidden cursor-pointer select-none"
        style={{ border: "1px solid rgba(37,99,235,0.15)", boxShadow: "0 0 40px rgba(37,99,235,0.05), inset 0 1px 0 rgba(255,255,255,0.03)" }}
        onClick={doJump}
      >
        <canvas
          ref={canvasRef}
          width={GW}
          height={GH}
          className="w-full block"
          style={{ imageRendering: "pixelated" }}
        />
      </div>

      <p
        className="text-center text-slate-700 text-xs mt-3"
        style={{ fontFamily: "'Space Mono', monospace" }}
      >
        {gameState === "idle"  && "— tap the canvas or press space to start —"}
        {gameState === "running" && `score: ${String(displayScore).padStart(5, "0")}`}
        {gameState === "over"  && `final: ${String(displayScore).padStart(5, "0")}  ·  best: ${String(displayHi).padStart(5, "0")}`}
      </p>
    </div>
  );
};

// ─── PROJECT CARD ─────────────────────────────────────────────────────────────

const ProjectCard = ({ project, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
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

      <div className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-10 md:gap-16 py-16`}>

        {/* ── TEXT SIDE ── */}
        <div className="flex-1 min-w-0">
          {/* Ghost number */}
          <div
            className="text-8xl font-black leading-none mb-3 select-none"
            style={{ fontFamily: "'Space Mono', monospace", color: "transparent", WebkitTextStroke: "1px rgba(37,99,235,0.15)" }}
          >
            {project.number}
          </div>

          {/* Meta row */}
          <div className="flex items-center flex-wrap gap-2.5 mb-3">
            <span
              className="text-xs tracking-widest uppercase font-bold px-2.5 py-1 rounded-full"
              style={{ color: project.color, background: `${project.color}12`, border: `1px solid ${project.color}30` }}
            >
              {project.subtitle}
            </span>
            <span className="text-slate-700 text-xs" style={{ fontFamily: "'Space Mono', monospace" }}>{project.year}</span>
            <span className="text-slate-700 text-xs">·</span>
            <span className="text-slate-600 text-xs">Role: {project.role}</span>
            {project.credit && (
              <a
                href={project.creditLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs no-underline px-2 py-0.5 rounded-full transition-colors hover:opacity-80"
                style={{ background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.2)", color: "#fbbf24" }}
              >
                Built with {project.credit}
              </a>
            )}
          </div>

          {/* Title */}
          <h2
            className="font-black text-slate-100 mb-4 leading-tight"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontFamily: "'Space Mono', monospace" }}
          >
            {project.title}
          </h2>

          {/* Description */}
          <p className="text-slate-400 text-sm leading-relaxed mb-5 max-w-md">{project.description}</p>

          {/* Highlights */}
          <ul className="space-y-2 mb-6">
            {project.highlights.map((h, i) => (
              <li key={i} className="flex items-center gap-2.5 text-xs text-slate-500">
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: project.color }} />
                {h}
              </li>
            ))}
          </ul>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-7">
            {project.tags.map(tag => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-medium text-blue-300"
                style={{ background: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.18)" }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA button */}
          <motion.a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, boxShadow: `0 0 28px ${project.color}40` }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold text-sm text-white no-underline"
            style={{ background: `linear-gradient(135deg, ${project.color}, ${project.color}bb)`, boxShadow: `0 4px 20px ${project.color}28` }}
          >
            <FaExternalLinkAlt size={11} /> Visit Live Site
          </motion.a>
        </div>

        {/* ── IMAGE SIDE ── */}
        <motion.div
          whileHover={{ scale: 1.025 }}
          transition={{ duration: 0.4 }}
          className="flex-1 w-full max-w-xl relative"
        >
          {/* Hover glow */}
          <div
            className="absolute -inset-4 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: `radial-gradient(ellipse, ${project.color}15 0%, transparent 70%)` }}
          />

          <div
            className="relative rounded-2xl overflow-hidden"
            style={{ border: `1px solid ${project.color}22`, boxShadow: "0 24px 60px rgba(0,0,0,0.55)" }}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full block"
              style={{ aspectRatio: "16/10", objectFit: "cover" }}
            />

            {/* ── OPACITY GRADIENT FADE EFFECTS ── */}
            {/* Bottom fade */}
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to bottom, transparent 35%, rgba(5,12,26,0.75) 100%)" }}
            />
            {/* Side fade toward text */}
            <div
              className="absolute inset-0 hidden md:block"
              style={{ background: isEven
                ? "linear-gradient(to left, rgba(5,12,26,0.3) 0%, transparent 45%)"
                : "linear-gradient(to right, rgba(5,12,26,0.3) 0%, transparent 45%)"
              }}
            />

            {/* Category badge */}
            <div
              className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold"
              style={{ background: "rgba(5,12,26,0.88)", border: `1px solid ${project.color}40`, color: project.color, backdropFilter: "blur(8px)" }}
            >
              {project.category}
            </div>

            {/* Bottom info overlay */}
            <div className="absolute bottom-0 left-0 right-0 px-5 py-4 flex items-center justify-between">
              <span
                className="text-white text-sm font-bold"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                {project.title}
              </span>
              <span className="text-xs font-semibold" style={{ color: project.color, fontFamily: "'Space Mono', monospace" }}>
                {project.year}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function ProjectsPage() {
  return (
    <div className="bg-[#050c1a] min-h-screen text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Inter:wght@400;500;600;700;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        body { margin: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #050c1a; }
        ::-webkit-scrollbar-thumb { background: #3b82f6; border-radius: 2px; }
      `}</style>

      {/* Fixed net background */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `linear-gradient(rgba(37,99,235,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.035) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      <div className="fixed inset-0 pointer-events-none z-0" style={{ background: "radial-gradient(ellipse at top, rgba(37,99,235,0.07) 0%, transparent 60%)" }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 py-16">

        {/* ── BACK BUTTON ── */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} className="mb-14">
          <Link
            to="/"
            className="inline-flex items-center gap-2.5 text-slate-500 text-sm no-underline hover:text-blue-400 transition-colors"
          >
            <motion.span whileHover={{ x: -3 }} transition={{ duration: 0.2 }} className="text-blue-500">
              <FaArrowLeft size={13} />
            </motion.span>
            Back to Home
          </Link>
        </motion.div>

        {/* ── PAGE HEADER ── */}
        <AnimSection className="mb-16">
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs tracking-widest uppercase mb-6 border border-blue-900 text-slate-500"
            style={{ background: "rgba(37,99,235,0.06)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" />
            All Projects
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-black text-slate-100 leading-none mb-5"
            style={{ fontSize: "clamp(3rem, 8vw, 6.5rem)", fontFamily: "'Space Mono', monospace" }}
          >
            My<br />
            <span className="text-blue-500" style={{ textShadow: "0 0 60px rgba(37,99,235,0.4)" }}>Work.</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-slate-500 text-sm max-w-lg leading-relaxed mb-8">
            Real projects, real clients, real impact — each one built with intention and shipped to production.
          </motion.p>

          {/* Tag pills */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-2.5">
            {["⚡ React & Tailwind", "🚀 Production Deployed", "🎯 Client-Focused", "📱 Mobile-First"].map(tag => (
              <span
                key={tag}
                className="px-4 py-1.5 rounded-full text-xs font-medium text-slate-400"
                style={{ background: "rgba(37,99,235,0.07)", border: "1px solid rgba(37,99,235,0.18)" }}
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </AnimSection>

        {/* ── DINO GAME EASTER EGG ── */}
        <AnimSection>
          <motion.div variants={fadeUp}>
            <DinoGame />
          </motion.div>
        </AnimSection>

        {/* ── PROJECT CARDS ── */}
        <div>
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

        {/* ── BOTTOM CTA ── */}
        <div className="h-px mt-4 mb-16" style={{ background: "linear-gradient(90deg, transparent, #1e3a6e, transparent)" }} />

        <AnimSection className="text-center">
          <motion.p variants={fadeUp} className="text-slate-600 text-sm mb-6">
            More projects on the way — have something in mind?
          </motion.p>
          <motion.div variants={fadeUp}>
            <Link
              to="/#contact"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-base text-white no-underline"
              style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)", boxShadow: "0 4px 28px rgba(37,99,235,0.35)" }}
            >
              Let's Work Together →
            </Link>
          </motion.div>
        </AnimSection>

      </div>
    </div>
  );
}