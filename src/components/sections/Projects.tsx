"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Globe, Github, Play, ArrowRight, X, Volume2, VolumeX, Maximize, Minimize, Pause, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { useRef, useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { projects, Project } from "@/lib/projectsData";

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

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={togglePlay}
                        className="text-white hover:text-zinc-300 transition-colors p-1 rounded"
                      >
                        {playing ? <Pause size={20} fill="white" /> : <Play size={20} fill="white" />}
                      </button>

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

                      <span className="text-xs text-zinc-300 font-mono select-none">
                        {currentTime} / {duration}
                      </span>
                    </div>

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
export function ProjectCard({ project, idx }: { project: Project; idx: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

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
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: idx * 0.1 }}
      >
        <Card className="flex flex-col h-full bg-white/[0.01] backdrop-blur-xl border-white/[0.08] hover:border-white/[0.15] transition-all duration-500 overflow-hidden group rounded-3xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
          <StyledTooltip title={project.video ? "Click to Watch Demo" : "Project Preview"} arrow placement="top">
            <div
              className={`h-[240px] w-full ${project.coverImage ? '' : project.imagePlaceholder || 'bg-zinc-900'} flex items-center justify-center relative overflow-hidden cursor-pointer`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => project.video && setModalOpen(true)}
            >
              {project.coverImage && (
                <img
                  src={project.coverImage}
                  alt={`${project.title} preview`}
                  className="absolute inset-0 w-full h-full object-cover object-top"
                  draggable={false}
                />
              )}
              {project.video && (
                <div className="absolute top-4 right-4 z-30 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center gap-2 group-hover:bg-white/20 transition-colors">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider">Demo</span>
                </div>
              )}

              {/* Category Badge */}
              <motion.div 
                className="absolute top-4 left-4 z-30 px-3 py-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-full flex items-center gap-2"
                animate={project.category === 'AI' ? {
                  boxShadow: ["0 0 0px rgba(59, 130, 246, 0)", "0 0 10px rgba(59, 130, 246, 0.3)", "0 0 0px rgba(59, 130, 246, 0)"],
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {project.category === 'AI' && (
                  <motion.div
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Sparkles size={12} className="text-blue-400" />
                  </motion.div>
                )}
                <span className="text-[10px] font-bold text-white uppercase tracking-wider">{project.category}</span>
              </motion.div>

              <div
                className="absolute inset-0 transition-opacity duration-500"
                style={{
                  opacity: isHovered && project.video ? 0.7 : 1,
                  background: "inherit",
                }}
              />

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

              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-all duration-500 z-10" />
            </div>
          </StyledTooltip>

          <CardContent className="flex flex-col flex-grow p-5 pt-5 bg-transparent">
            <div className="flex flex-row items-center justify-between mb-4">
              <h3 className="text-[22px] font-bold tracking-tight text-white">{project.title}</h3>
              <div className="flex items-center gap-3 text-zinc-400">
                {project.website && (
                  <a href={project.website} target="_blank" rel="noreferrer" className="hover:text-zinc-100 transition-colors">
                    <Globe size={20} />
                  </a>
                )}
                {project.github && (
                  <a href={project.github} target="_blank" rel="noreferrer" className="hover:text-zinc-100 transition-colors">
                    <Github size={20} />
                  </a>
                )}
              </div>
            </div>

            <p className="text-[15px] text-zinc-400 leading-relaxed mb-4">
              {project.description}
            </p>

            {project.points && (
              <ul className="mb-6 space-y-2">
                {project.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-[13px] text-zinc-500 leading-snug">
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-700 mt-1.5 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="mb-6 mt-auto">
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

            <div className="flex items-center justify-between mt-4">
              <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full ${project.status.bg} border ${project.status.border} ${project.status.color}`}>
                <div className={`w-2 h-2 rounded-full ${project.status.dot}`} />
                <span className="text-[13px] font-semibold whitespace-nowrap">{project.status.label}</span>
              </div>

              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-[14px] font-medium text-zinc-100 hover:text-white transition-colors bg-transparent hover:bg-zinc-800/50 px-4 py-2 rounded-full border border-zinc-800"
                >
                  View Repo <ArrowRight size={16} />
                </a>
              )}
              {!project.github && project.website && (
                <a
                  href={project.website}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-[14px] font-medium text-zinc-100 hover:text-white transition-colors bg-transparent hover:bg-zinc-800/50 px-4 py-2 rounded-full border border-zinc-800"
                >
                  Live Demo <ArrowRight size={16} />
                </a>
              )}
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
  const aiProjects = projects.filter(p => p.category === 'AI').slice(0, 2);
  const fullStackProjects = projects.filter(p => p.category === 'Full Stack' && (p.title === 'Zica-Zima CRM' || p.title === 'AstraClean')).slice(0, 2);

  return (
    <section id="projects" className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Featured Work</h2>
            <div className="h-px bg-zinc-800 flex-grow w-24 md:w-48" />
          </div>
        </div>

        {/* AI Projects Section */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Sparkles size={20} className="text-blue-500" />
            </motion.div>
            <h3 className="text-xl font-bold text-zinc-200 uppercase tracking-widest text-sm">AI Projects</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {aiProjects.map((project, idx) => (
              <ProjectCard key={project.title} project={project} idx={idx} />
            ))}
          </div>
        </div>

        {/* Full Stack Projects Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-8">
            <Globe size={20} className="text-emerald-500" />
            <h3 className="text-xl font-bold text-zinc-200 uppercase tracking-widest text-sm">Full Stack Projects</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {fullStackProjects.map((project, idx) => (
              <ProjectCard key={project.title} project={project} idx={idx} />
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-12">
          <Link href="/projects">
            <Button 
              variant="outline" 
              className="group relative overflow-hidden rounded-full px-8 py-6 border-zinc-800 bg-[#0a0a0a] hover:border-zinc-600 transition-all duration-300"
            >
              <span className="relative z-10 flex items-center gap-2 text-lg font-semibold text-zinc-300 group-hover:text-white">
                View All Projects <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 to-zinc-950 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
