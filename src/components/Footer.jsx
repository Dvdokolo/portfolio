import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaLinkedin, FaWhatsapp, FaTiktok, FaArrowUp, FaCode, FaGithub } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

// ─── DATA ─────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Home",     href: "#home" },
  { label: "About",   href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact",  href: "#contact" },
];

const SOCIALS = [
  { href: "https://wa.me/2349065256711",                icon: <FaWhatsapp size={15} />, label: "WhatsApp" },
  { href: "https://linkedin.com/in/yourusername",       icon: <FaLinkedin size={15} />, label: "LinkedIn" },
  { href: "https://www.tiktok.com/@david.codess",       icon: <FaTiktok size={14} />,   label: "TikTok" },
  // { href: "mailto:dvdokolo@gmail.com",               icon: <MdEmail size={16} />,    label: "Email" },
  { href: "https://github.com/Dvdokolo",                 icon: <FaGithub size={15} />,   label: "GitHub" },
];

// ─── ANIMATION VARIANTS ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

// ─── FOOTER ───────────────────────────────────────────────────────────────────

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: "#030810", borderTop: "1px solid #1e3a6e", fontFamily: "'Inter', sans-serif" }}
    >
      {/* Top glow line */}
      <div className="absolute top-0 left-[10%] right-[10%] h-px" style={{ background: "linear-gradient(90deg, transparent, #3b82f6, transparent)" }} />

      {/* BG glow blob */}
      <div
        className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[600px] h-[200px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(37,99,235,0.07) 0%, transparent 70%)" }}
      />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-5xl mx-auto px-8 pt-14 pb-8"
      >
        {/* ── TOP 3-COL GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Brand */}
          <motion.div custom={0} variants={fadeUp}>
            {/* Logo */}
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-[0_0_16px_#2563eb50]">
                <FaCode size={15} color="#fff" />
              </div>
              <span className="font-bold text-lg text-slate-100" style={{ fontFamily: "'Space Mono', monospace" }}>
                David<span className="text-blue-500">.</span>
              </span>
            </div>

            <p className="text-slate-500 text-xs leading-relaxed max-w-[260px] mb-6">
              Front-end developer passionate about building clean, responsive, and user-focused web experiences. Currently available for work.
            </p>

            {/* Socials */}
            <div className="flex gap-2">
              {SOCIALS.map(s => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  title={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit my ${s.label} profile`}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.92 }}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-slate-500 no-underline transition-colors hover:text-blue-400"
                  style={{ background: "rgba(37,99,235,0.08)", border: "1px solid #1e3a6e" }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div custom={1} variants={fadeUp}>
            <p className="text-xs tracking-widest uppercase text-slate-700 font-semibold mb-5">
              Quick Links
            </p>
            <nav className="flex flex-col gap-3">
              {NAV_LINKS.map(link => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={e => scrollToSection(e, link.href)}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-2 text-sm no-underline transition-colors"
                  style={{ color: "#64748b", cursor: "pointer" }}
                  onMouseEnter={e => { e.currentTarget.style.color = "#60a5fa"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "#64748b"; }}
                >
                  <span className="w-1 h-1 rounded-full bg-blue-800 flex-shrink-0" />
                  {link.label}

                </motion.a>
              ))}
            </nav>
          </motion.div>

          {/* Contact */}
          <motion.div custom={2} variants={fadeUp}>
            <p className="text-xs tracking-widest uppercase text-slate-700 font-semibold mb-5">
              Get In Touch
            </p>
            <div className="flex flex-col gap-4">
              <motion.a
                href="#contact"
                aria-label="Send me an email"
                className="flex items-center gap-3 text-slate-500 text-xs no-underline transition-colors hover:text-blue-400"
              >
                <span className="w-8 h-8 rounded-lg flex items-center justify-center text-blue-500 flex-shrink-0" style={{ background: "rgba(37,99,235,0.1)", border: "1px solid #1e3a6e" }}>
                  <MdEmail size={14} />
                </span>
                dvdokolo@gmail.com
              </motion.a>

              <a
                href="https://wa.me/2349131940037"
                aria-label="Message me on WhatsApp"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-slate-500 text-xs no-underline transition-colors hover:text-blue-400"
              >
                <span className="w-8 h-8 rounded-lg flex items-center justify-center text-blue-500 flex-shrink-0" style={{ background: "rgba(37,99,235,0.1)", border: "1px solid #1e3a6e" }}>
                  <FaWhatsapp size={13} />
                </span>
                +234 913 194 0037
              </a>

              {/* Available badge */}
              <motion.div
                animate={{ opacity: [1, 0.55, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full w-fit mt-1"
                style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.25)" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />
                <span className="text-green-400 text-xs font-semibold">Available for work</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* ── DIVIDER ── */}
        <div className="h-px mb-7" style={{ background: "linear-gradient(90deg, transparent, #1e3a6e, transparent)" }} />

        {/* ── BOTTOM BAR ── */}
        <motion.div
          custom={3} variants={fadeUp}
          className="flex items-center justify-between flex-wrap gap-4"
        >
          <p className="text-slate-700 text-xs m-0">
            © {currentYear}{" "}
            <span className="text-blue-600" style={{ fontFamily: "'Space Mono', monospace" }}>David Okolo</span>
            . All rights reserved.
          </p>

          <p className="text-blue-950 text-xs m-0" style={{ fontFamily: "'Space Mono', monospace" }}>
            Built with React & Framer Motion
          </p>

          <motion.button
            onClick={scrollToTop}
            aria-label="Scroll back to top of page"
            whileHover={{ y: -3, borderColor: "#3b82f6", color: "#60a5fa" }}
            whileTap={{ scale: 0.92 }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full text-slate-500 text-xs cursor-pointer transition-all border-none"
            style={{ background: "rgba(37,99,235,0.08)", border: "1px solid #1e3a6e", fontFamily: "'Inter', sans-serif" }}
          >
            <FaArrowUp size={10} /> Back to top
          </motion.button>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;