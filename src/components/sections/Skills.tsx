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
  SiOpenai, SiReplit, SiGit, SiGithub, SiPostman, SiNodedotjs
} from "react-icons/si";
import { FaDatabase, FaHeart, FaCss3Alt, FaChartBar, FaFileExcel } from "react-icons/fa";
import { FaWandMagicSparkles, FaLink } from "react-icons/fa6";
import { BsSoundwave } from "react-icons/bs";
import { VscVscode } from "react-icons/vsc";

/** Official Cursor logo from Simple Icons */
const CursorLogo = ({ className, style }: { className?: string; style?: React.CSSProperties }) => {
  const color = (style?.color as string)?.replace("#", "") || "ffffff";
  return <img src={`https://cdn.simpleicons.org/cursor/${color}`} alt="Cursor" className={className} width={20} height={20} />;
};

/** Official n8n logo from Simple Icons */
const N8nLogo = ({ className, style }: { className?: string; style?: React.CSSProperties }) => {
  const color = (style?.color as string)?.replace("#", "") || "FF6D5A";
  return <img src={`https://cdn.simpleicons.org/n8n/${color}`} alt="n8n" className={className} width={20} height={20} />;
};

const skills = [
  { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
  { name: "CSS3", icon: FaCss3Alt, color: "#1572B6" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Bootstrap", icon: SiBootstrap, color: "#7952B3" },
  { name: "React.js", icon: SiReact, color: "#61DAFB" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "SQL", icon: FaDatabase, color: "#f8f9fa" },
  { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "Express.js", icon: SiExpress, color: "#ffffff" },
  { name: "Langchain", icon: FaLink, color: "#ffffff" },
  { name: "Gemini API", icon: SiGoogle, color: "#4285F4" },
  { name: "ChatGPT", icon: SiOpenai, color: "#10A37F" },
  { name: "n8n", icon: N8nLogo, color: "#FF6D5A" },
  { name: "Cursor", icon: CursorLogo, color: "#ffffff" },
  { name: "Replit", icon: SiReplit, color: "#F26207" },
  { name: "Lovable", icon: FaHeart, color: "#FF4D4D" },
  { name: "ElevenLabs", icon: BsSoundwave, color: "#ffffff" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "GitHub", icon: SiGithub, color: "#ffffff" },
  { name: "VS Code", icon: VscVscode, color: "#007ACC" },
  { name: "Postman", icon: SiPostman, color: "#FF6C37" },
  { name: "Power BI", icon: FaChartBar, color: "#F2C811" },
  { name: "Excel", icon: FaFileExcel, color: "#217346" },
  { name: "Prompt Engineering", icon: FaWandMagicSparkles, color: "#FFD700" }
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
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Skills & Tools</h2>
          <div className="h-px bg-border flex-grow max-w-[300px]" />
        </div>

        <div className="flex flex-wrap gap-3">
          {skills.map((skill, idx) => {
            const Icon = skill.icon;
            return (
              <motion.div 
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.2, delay: idx * 0.03 }}
              >
                <StyledTooltip title={skill.name} arrow placement="top" disableInteractive>
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2.5 h-auto px-4 py-2 rounded-xl border-dashed border-zinc-700 bg-zinc-900/50 shadow-sm hover:bg-zinc-800 transition-colors cursor-pointer group"
                  >
                    <Icon className="text-lg group-hover:scale-110 transition-transform" style={{ color: skill.color }} />
                    <span className="text-sm font-medium text-zinc-100">{skill.name}</span>
                  </Button>
                </StyledTooltip>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </section>
  );
}
