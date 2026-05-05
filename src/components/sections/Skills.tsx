"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

const StyledTooltip = styled(({ className, ...props }: any) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .MuiTooltip-tooltip`]: {
    backgroundColor: "#18181b",
    color: "#f4f4f5",
    fontSize: "12px",
    fontWeight: "600",
    padding: "8px 12px",
    borderRadius: "8px",
    border: "1px solid #27272a",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.4)",
  },
  [`& .MuiTooltip-arrow`]: {
    color: "#18181b",
    "&:before": {
      border: "1px solid #27272a",
    },
  },
}));
import { 
  SiReact, SiJavascript, SiHtml5, SiTailwindcss, SiBootstrap, 
  SiPython, SiFirebase, SiPostgresql, SiExpress, SiGoogle, 
  SiOpenai, SiReplit, SiGit, SiGithub, SiPostman, SiNodedotjs,
  SiVercel, SiRender, SiGithubactions, SiLinux, SiTypescript
} from "react-icons/si";
import { FaDatabase, FaHeart, FaCss3Alt, FaServer } from "react-icons/fa";
import { FaWandMagicSparkles, FaLink } from "react-icons/fa6";
import { VscVscode } from "react-icons/vsc";

/** Official Cursor logo */
const CursorLogo = ({ className, style }: { className?: string; style?: React.CSSProperties }) => {
  const color = (style?.color as string)?.replace("#", "") || "ffffff";
  return <img src={`https://cdn.simpleicons.org/cursor/${color}`} alt="Cursor" className={className} width={20} height={20} />;
};

/** Official n8n logo */
const N8nLogo = ({ className, style }: { className?: string; style?: React.CSSProperties }) => {
  const color = (style?.color as string)?.replace("#", "") || "FF6D5A";
  return <img src={`https://cdn.simpleicons.org/n8n/${color}`} alt="n8n" className={className} width={20} height={20} />;
};

/** Official Anthropic/Claude logo */
const ClaudeLogo = ({ className, style }: { className?: string; style?: React.CSSProperties }) => {
  const color = (style?.color as string)?.replace("#", "") || "D97757";
  return <img src={`https://cdn.simpleicons.org/anthropic/${color}`} alt="Claude" className={className} width={20} height={20} />;
};

const skillCategories = [
  {
    title: "AI and Automation",
    skills: [
      { name: "OpenAI", icon: SiOpenai, color: "#10A37F" },
      { name: "Gemini", icon: SiGoogle, color: "#4285F4" },
      { name: "LangChain", icon: FaLink, color: "#ffffff" },
      { name: "n8n", icon: N8nLogo, color: "#FF6D5A" },
      { name: "Prompt Engineering", icon: FaWandMagicSparkles, color: "#FFD700" },
      { name: "Vector Database", icon: FaDatabase, color: "#47A248" },
    ],
  },
  {
    title: "Full Stack Development",
    skills: [
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "Express.js", icon: SiExpress, color: "#ffffff" },
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
      { name: "SQL", icon: FaDatabase, color: "#f8f9fa" },
    ],
  },
  {
    title: "Production and Deployment",
    skills: [
      { name: "GitHub Actions", icon: SiGithubactions, color: "#2088FF" },
      { name: "Vercel", icon: SiVercel, color: "#ffffff" },
      { name: "Render", icon: SiRender, color: "#46E3B7" },
      { name: "VPS", icon: FaServer, color: "#ffffff" },
    ],
  },
  {
    title: "Tools and AI Efficiency",
    skills: [
      { name: "Cursor", icon: CursorLogo, color: "#ffffff" },
      { name: "Claude Code", icon: ClaudeLogo, color: "#D97757" },
      { name: "Replit", icon: SiReplit, color: "#F26207" },
      { name: "Lovable", icon: FaHeart, color: "#FF4D4D" },
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "GitHub", icon: SiGithub, color: "#ffffff" },
      { name: "VS Code", icon: VscVscode, color: "#007ACC" },
      { name: "Postman", icon: SiPostman, color: "#FF6C37" },
    ],
  },
  {
    title: "Fundamentals",
    skills: [
      { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
      { name: "CSS3", icon: FaCss3Alt, color: "#1572B6" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Bootstrap", icon: SiBootstrap, color: "#7952B3" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold">Skills & Tools</h2>
          <div className="h-px bg-border flex-grow max-w-[300px]" />
        </div>

        <div className="space-y-12">
          {skillCategories.map((category, catIdx) => (
            <div key={category.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 mb-6 ml-1">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, idx) => {
                  const Icon = skill.icon;
                  return (
                    <motion.div 
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.2, delay: idx * 0.02 }}
                    >
                      <StyledTooltip title={skill.name} arrow placement="top" disableInteractive>
                        <Button 
                          variant="outline" 
                          className="flex items-center gap-2.5 h-auto px-4 py-2.5 rounded-xl border-dashed border-zinc-700 bg-zinc-900/50 shadow-sm hover:bg-zinc-800 transition-all cursor-pointer group"
                        >
                          <Icon className="text-lg group-hover:scale-110 transition-transform" style={{ color: skill.color }} />
                          <span className="text-sm font-medium text-zinc-100">{skill.name}</span>
                        </Button>
                      </StyledTooltip>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
