"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Globe, Github, Play, ArrowRight, X, Volume2, VolumeX, Maximize, Minimize, Pause } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { useRef, useState, useCallback, useEffect } from "react";
import { SiReact, SiFirebase, SiExpress, SiPostgresql, SiVite, SiMongodb, SiNodedotjs } from "react-icons/si";
import { FaDatabase, FaCreditCard } from "react-icons/fa";

const StyledTooltip = styled(({ className, ...props }: any) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .MuiTooltip-tooltip`]: {
    backgroundColor: "#09090b",
    color: "#fafafa",
    fontSize: "12px",
    fontWeight: "600",
    padding: "8px 12px",
    borderRadius: "10px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.4)",
    backdropFilter: "blur(8px)",
  },
  [`& .MuiTooltip-arrow`]: {
    color: "#18181b",
    "&:before": {
      border: "1px solid #27272a",
    },
  },
}));

const projects = [
  {
    title: "Zica-Zima CRM",
    description: "Full-stack CRM platform for education centers with student and lead management, fee collection, batch tracking, and role-based access.",
    techIcons: [
      { name: "Vite", icon: SiVite, color: "#646CFF" },
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Express", icon: SiExpress, color: "#ffffff" },
      { name: "Firebase", icon: SiFirebase, color: "#FFCA28" }
    ],
    github: "https://github.com/KarewarGaurav/Zica-Zima-CRM",
    status: {
      label: "All Operational",
      color: "text-orange-900 font-bold",
      bg: "bg-orange-100",
      dot: "bg-orange-600",
      border: "border-transparent"
    },
    imagePlaceholder: "bg-[#161618]",
    coverImage: "/image.png",
    video: "/zica-zima-crm.mp4",
  },
  {
    title: "Vitrag Lab System",
    description: "Laboratory management platform for construction material testing with real-time sample tracking and automated PDF report generation.",
    techIcons: [
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" }
    ],
    github: "https://github.com/KarewarGaurav/Vitrag-Lab-System",
    status: {
      label: "Completed",
      color: "text-emerald-900 font-bold",
      bg: "bg-emerald-100",
      dot: "bg-emerald-600",
      border: "border-transparent"
    },
    imagePlaceholder: "bg-gradient-to-br from-zinc-800 to-black",
    coverImage: "/vitrag-preview.png",
    video: "/vitrag-video1.mp4",
  },
  {
    title: "Path2Placement",
    description: "Built a multi-role e-learning platform with course purchases, test series, and internships. Implemented secure management, real-time data, and user authentication.",
    techIcons: [
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
      { name: "MongoDB Atlas", icon: SiMongodb, color: "#47A248" }
    ],
    github: "https://github.com/KarewarGaurav/Path2Placement",
    website: "https://www.path2placement.com/",
    status: {
      label: "Completed",
      color: "text-emerald-900 font-bold",
      bg: "bg-emerald-100",
      dot: "bg-emerald-600",
      border: "border-transparent"
    },
    imagePlaceholder: "bg-gradient-to-br from-indigo-500 to-purple-600",
    coverImage: "/path2placement-preview.png",
    video: null,
  },
  {
    title: "AstraClean",
    description: "Built a service platform with secure payment integration. Enabled booking, real-time data handling, and smooth transaction processing.",
    techIcons: [
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
      { name: "PhonePe Gateway", icon: FaCreditCard, color: "#5F259F" }
    ],
    github: "",
    website: "https://astraclean.cleanto.in/",
    status: {
      label: "Live",
      color: "text-emerald-900 font-bold",
      bg: "bg-emerald-100",
      dot: "bg-emerald-600",
      border: "border-transparent"
    },
    imagePlaceholder: "bg-gradient-to-br from-teal-500 to-emerald-700",
    coverImage: "/astraclean-preview.png",
    video: null,
  },
];

/* ────────────────────────────────────────────────
   Full-Screen Video Modal
──────────────────────────────────────────────── */
function VideoModal({ src, title, onClose }: { src: string; title: string; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  const [volume, setVolume] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const resetHideTimer = useCallback(() => {
    setShowControls(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setShowControls(false), 3000);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {});
    resetHideTimer();
    return () => { if (hideTimer.current) clearTimeout(hideTimer.current); };
  }, [resetHideTimer]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === " ") { e.preventDefault(); togglePlay(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); } else { v.pause(); setPlaying(false); }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v) return;
    setProgress((v.currentTime / v.duration) * 100);
    setCurrentTime(formatTime(v.currentTime));
  };

  const handleLoadedMetadata = () => {
    const v = videoRef.current;
    if (!v) return;
    setDuration(formatTime(v.duration));
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    const bar = progressRef.current;
    if (!v || !bar) return;
    const rect = bar.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    v.currentTime = ratio * v.duration;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = videoRef.current;
    if (!v) return;
    const val = parseFloat(e.target.value);
    v.volume = val;
    setVolume(val);
    setMuted(val === 0);
    v.muted = val === 0;
  };

  const toggleFullscreen = () => {
    const el = containerRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(12px)" }}
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <motion.div
          ref={containerRef}
          className="relative w-full max-w-5xl mx-4 rounded-2xl overflow-hidden shadow-2xl"
          initial={{ scale: 0.88, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.88, opacity: 0, y: 40 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          style={{ background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.08)" }}
          onMouseMove={resetHideTimer}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-5 py-3 border-b"
            style={{ borderColor: "rgba(255,255,255,0.07)", background: "rgba(10,10,10,0.95)" }}
          >
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-2 text-sm font-semibold text-zinc-300">{title}</span>
            </div>
            <button
              onClick={onClose}
              className="text-zinc-500 hover:text-white transition-colors p-1 rounded-lg hover:bg-zinc-800"
            >
              <X size={20} />
            </button>
          </div>

          {/* Video */}
          <div
            className="relative bg-black"
            style={{ aspectRatio: "16/9" }}
            onMouseMove={resetHideTimer}
            onMouseLeave={() => { if (hideTimer.current) clearTimeout(hideTimer.current); setShowControls(false); }}
            onMouseEnter={resetHideTimer}
          >
            <video
              ref={videoRef}
              src={src}
              className="w-full h-full object-contain"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={() => setPlaying(false)}
              onClick={togglePlay}
              playsInline
              style={{ cursor: "pointer" }}
            />

            {/* Centered play/pause indicator */}
            <AnimatePresence>
              {!playing && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.15 }}
                >
                  <div className="w-20 h-20 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center border border-white/20">
                    <Play size={36} className="text-white ml-1" fill="white" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Controls overlay */}
            <AnimatePresence>
              {showControls && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 px-4 pb-4 pt-10"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)" }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Progress bar */}
                  <div
                    ref={progressRef}
                    className="w-full h-1.5 bg-zinc-700 rounded-full mb-3 cursor-pointer group relative"
                    onClick={handleProgressClick}
                  >
                    <div
                      className="h-full bg-white rounded-full relative transition-all"
                      style={{ width: `${progress}%` }}
                    >
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>

                  {/* Controls row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Play/Pause */}
                      <button
                        onClick={togglePlay}
                        className="text-white hover:text-zinc-300 transition-colors p-1 rounded"
                      >
                        {playing ? <Pause size={20} fill="white" /> : <Play size={20} fill="white" />}
                      </button>

                      {/* Volume */}
                      <div className="flex items-center gap-2">
                        <button onClick={toggleMute} className="text-white hover:text-zinc-300 transition-colors p-1">
                          {muted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
                        </button>
                        <input
                          type="range"
                          min={0}
                          max={1}
                          step={0.05}
                          value={muted ? 0 : volume}
                          onChange={handleVolumeChange}
                          className="w-20 accent-white cursor-pointer"
                        />
                      </div>

                      {/* Time */}
                      <span className="text-xs text-zinc-300 font-mono select-none">
                        {currentTime} / {duration}
                      </span>
                    </div>

                    {/* Fullscreen */}
                    <button
                      onClick={toggleFullscreen}
                      className="text-white hover:text-zinc-300 transition-colors p-1 rounded"
                    >
                      {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ────────────────────────────────────────────────
   Project Card
──────────────────────────────────────────────── */
function ProjectCard({ project, idx }: { project: (typeof projects)[0]; idx: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
      <AnimatePresence>
        {modalOpen && project.video && (
          <VideoModal
            src={project.video}
            title={project.title}
            onClose={() => setModalOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.div
        key={project.title}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: idx * 0.1 }}
      >
        <Card className="flex flex-col h-full bg-[#0a0a0a] border-zinc-800/80 hover:border-zinc-700 transition-all duration-300 overflow-hidden group rounded-3xl hover:shadow-[0_0_30px_rgba(255,255,255,0.02)]">
          {/* Image / Video Preview */}
          <StyledTooltip title={project.video ? "Click to Watch Demo" : "Project Preview"} arrow placement="top">
            <div
              className={`h-[240px] w-full ${project.coverImage ? '' : project.imagePlaceholder} flex items-center justify-center relative overflow-hidden cursor-pointer`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={() => project.video && setModalOpen(true)}
            >
              {/* Cover image */}
              {project.coverImage && (
                <img
                  src={project.coverImage}
                  alt={`${project.title} preview`}
                  className="absolute inset-0 w-full h-full object-cover object-top"
                  draggable={false}
                />
              )}
              {/* Badge for video projects */}
              {project.video && (
                <div className="absolute top-4 right-4 z-30 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center gap-2 group-hover:bg-white/20 transition-colors">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider">Demo</span>
                </div>
              )}

              {/* Gradient overlay */}
              <div
                className="absolute inset-0 transition-opacity duration-500"
                style={{
                  opacity: isHovered && project.video ? 0.7 : 1,
                  background: "inherit",
                }}
              />

              {/* Play button overlay */}
              {project.video && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center z-20"
                  animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
                  transition={{ duration: 0.25 }}
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      border: "1px solid rgba(255,255,255,0.4)",
                      backdropFilter: "blur(12px)",
                      boxShadow: "0 0 50px rgba(0,0,0,0.5)",
                    }}
                  >
                    <Play size={28} className="text-white ml-1 fill-white" />
                  </div>
                </motion.div>
              )}

              {/* Subtle dark overlay */}
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-all duration-500 z-10" />
            </div>
          </StyledTooltip>

          {/* Content */}
          <CardContent className="flex flex-col flex-grow p-4 pt-4 bg-[#0a0a0a]">
            {/* Title and Links */}
            <div className="flex flex-row items-center justify-between mb-4">
              <h3 className="text-[22px] font-bold tracking-tight text-white">{project.title}</h3>
              <div className="flex items-center gap-3 text-zinc-400">
                {project.website ? (
                  <a href={project.website} target="_blank" rel="noreferrer" className="hover:text-zinc-100 transition-colors">
                    <Globe size={20} />
                  </a>
                ) : (
                  <Globe size={20} className="hover:text-zinc-100 cursor-pointer transition-colors" />
                )}

                {project.video && (
                  <button
                    onClick={() => setModalOpen(true)}
                    className="hover:text-zinc-100 cursor-pointer transition-colors"
                  >
                    <Play size={20} />
                  </button>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-[15px] text-zinc-400 leading-relaxed mb-6 flex-grow">
              {project.description}
            </p>

            {/* Technologies */}
            <div className="mb-6 pt-2 flex-grow-0">
              <p className="text-[14px] font-medium text-zinc-400 mb-3">Technologies</p>
              <div className="flex flex-wrap gap-2">
                {project.techIcons.map((tech, i) => {
                  const Icon = tech.icon;
                  return (
                    <StyledTooltip key={i} title={tech.name} arrow placement="top" disableInteractive>
                      <Button
                        variant="outline"
                        className="flex items-center gap-2 h-auto px-3 py-1.5 rounded-xl border-dashed border-zinc-700 bg-zinc-900/50 shadow-sm hover:bg-zinc-800 transition-colors cursor-pointer group"
                      >
                        <Icon className="text-base group-hover:scale-110 transition-transform" style={{ color: tech.color }} />
                        <span className="text-[12px] font-medium text-zinc-100">{tech.name}</span>
                      </Button>
                    </StyledTooltip>
                  );
                })}
              </div>
            </div>

            {/* Footer Stats */}
            <div className="flex items-center justify-between mt-auto">
              <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full ${project.status.bg} border ${project.status.border} ${project.status.color}`}>
                <div className={`w-2 h-2 rounded-full ${project.status.dot}`} />
                <span className="text-[13px] font-semibold">{project.status.label}</span>
              </div>

              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-[14px] font-medium text-zinc-100 hover:text-white transition-colors bg-transparent hover:bg-zinc-800/50 px-4 py-2 rounded-full border border-zinc-800"
              >
                View Project <ArrowRight size={16} />
              </a>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
}

/* ────────────────────────────────────────────────
   Section
──────────────────────────────────────────────── */
export default function Projects() {
  return (
    <section id="projects" className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Featured Projects</h2>
          <div className="h-px bg-border flex-grow max-w-[300px]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, idx) => (
            <ProjectCard key={project.title} project={project} idx={idx} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
