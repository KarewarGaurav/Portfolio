import { SiReact, SiFirebase, SiExpress, SiPostgresql, SiVite, SiMongodb, SiNodedotjs, SiPython, SiFastapi, SiN8N, SiOpenai, SiGooglegemini } from "react-icons/si";
import { FaDatabase, FaCreditCard, FaRss, FaBrain, FaNetworkWired, FaSlack } from "react-icons/fa";

export interface TechIcon {
  name: string;
  icon: any;
  color: string;
}

export interface StatusBadge {
  label: string;
  color: string;
  bg: string;
  dot: string;
  border: string;
}

export interface Project {
  title: string;
  description: string;
  points?: string[];
  techIcons: TechIcon[];
  github?: string;
  website?: string;
  status: StatusBadge;
  imagePlaceholder?: string;
  coverImage?: string;
  video?: string | null;
  category: 'AI' | 'Full Stack';
}

export const projects: Project[] = [
  {
    title: "AI News Analyzer Agent",
    description: "Built an automated AI system that collects, filters, and summarizes news using LLMs and APIs.",
    points: [
      "Automated news ingestion from APIs and RSS",
      "Removed duplicates and categorized content",
      "Generated summaries using LLMs",
      "Delivered reports via dashboard and email",
      "Built backend using FastAPI and schedulers"
    ],
    techIcons: [
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "FastAPI", icon: SiFastapi, color: "#05998B" },
      { name: "LLM APIs", icon: SiOpenai, color: "#412991" },
      { name: "n8n", icon: SiN8N, color: "#FF6D5B" },
      { name: "RSS", icon: FaRss, color: "#EE802F" }
    ],
    github: "https://github.com/KarewarGaurav",
    status: {
      label: "AI System",
      color: "text-blue-900 font-bold",
      bg: "bg-blue-100/80 backdrop-blur-sm",
      dot: "bg-blue-600",
      border: "border-blue-200/50"
    },
    category: "AI",
    imagePlaceholder: "bg-gradient-to-br from-blue-600 to-indigo-900",
    coverImage: "/ai-news-preview.png",
  },
  {
    title: "RAG Chatbot",
    description: "Built a retrieval based chatbot using LLMs, embeddings, and vector database for accurate context aware responses.",
    points: [
      "Implemented RAG pipeline with embeddings and retrieval",
      "Stored data in Pinecone vector database",
      "Used Google Gemini for chat and embeddings",
      "Built AI agent with memory and tool support",
      "Automated workflows using n8n",
      "Integrated with Slack for real time interaction"
    ],
    techIcons: [
      { name: "n8n", icon: SiN8N, color: "#FF6D5B" },
      { name: "Pinecone", icon: FaDatabase, color: "#27272a" },
      { name: "Google Gemini", icon: SiGooglegemini, color: "#8E75FF" },
      { name: "LLM", icon: FaBrain, color: "#FF69B4" },
      { name: "Vector DB", icon: FaDatabase, color: "#4479A1" }
    ],
    github: "https://github.com/KarewarGaurav",
    status: {
      label: "AI System",
      color: "text-blue-900 font-bold",
      bg: "bg-blue-100/80 backdrop-blur-sm",
      dot: "bg-blue-600",
      border: "border-blue-200/50"
    },
    category: "AI",
    imagePlaceholder: "bg-gradient-to-br from-purple-600 to-blue-900",
    coverImage: "/rag-preview.png",
  },
  {
    title: "Zica-Zima CRM",
    description: "Built a CRM system for managing students, leads, fees, and operations.",
    points: [
      "Role based access control",
      "Automated fee alerts and notifications",
      "End to end workflow system"
    ],
    techIcons: [
      { name: "Vite", icon: SiVite, color: "#646CFF" },
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Express", icon: SiExpress, color: "#ffffff" },
      { name: "Firebase", icon: SiFirebase, color: "#FFCA28" }
    ],
    github: "https://github.com/KarewarGaurav/Zica-Zima-CRM",
    status: {
      label: "Operational",
      color: "text-orange-900 font-bold",
      bg: "bg-orange-100/80 backdrop-blur-sm",
      dot: "bg-orange-600",
      border: "border-orange-200/50"
    },
    category: "Full Stack",
    coverImage: "/image.png",
    video: "/zica-zima-crm.mp4",
  },
  {
    title: "AstraClean",
    description: "Built a service booking platform with payment integration and real time data handling.",
    points: [
      "Booking system with real time updates",
      "Secure payment integration",
      "Smooth user experience"
    ],
    techIcons: [
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
      { name: "Payment", icon: FaCreditCard, color: "#5F259F" }
    ],
    github: "",
    website: "https://astraclean.cleanto.in/",
    status: {
      label: "Live",
      color: "text-emerald-900 font-bold",
      bg: "bg-emerald-100/80 backdrop-blur-sm",
      dot: "bg-emerald-600",
      border: "border-emerald-200/50"
    },
    category: "Full Stack",
    coverImage: "/astraclean-preview.png",
  },
  {
    title: "Path2Placement",
    description: "Built an e learning platform with course purchases, test series, and internship applications.",
    techIcons: [
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" }
    ],
    github: "https://github.com/KarewarGaurav/Path2Placement",
    website: "https://www.path2placement.com/",
    status: {
      label: "Completed",
      color: "text-emerald-900 font-bold",
      bg: "bg-emerald-100/80 backdrop-blur-sm",
      dot: "bg-emerald-600",
      border: "border-emerald-200/50"
    },
    category: "Full Stack",
    coverImage: "/path2placement-preview.png",
  },
  {
    title: "Vitrag Lab System",
    description: "Built a lab management system with sample tracking and automated PDF report generation.",
    techIcons: [
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" }
    ],
    github: "https://github.com/KarewarGaurav/Vitrag-Lab-System",
    status: {
      label: "Completed",
      color: "text-emerald-900 font-bold",
      bg: "bg-emerald-100/80 backdrop-blur-sm",
      dot: "bg-emerald-600",
      border: "border-emerald-200/50"
    },
    category: "Full Stack",
    coverImage: "/vitrag-preview.png",
    video: "/vitrag-video1.mp4",
  }
];
