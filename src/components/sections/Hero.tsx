"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section id="hero" className="min-h-[70vh] flex flex-col justify-center items-start pt-12 text-zinc-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-secondary-foreground text-sm md:text-base font-normal tracking-widest uppercase mb-4">
          Hi, my name is
        </h2>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-4">
          Gaurav Karewar.
        </h1>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-muted-foreground mb-6 leading-tight">
          I build production ready AI systems with LLMs.
        </h1>

        <p className="text-xs md:text-sm font-medium tracking-wide text-zinc-400 mb-2">
          <span className="text-[#FF4D4D]">AI Full Stack Engineer</span>
          <span className="mx-2 text-zinc-600">|</span>
          <span className="text-[#A855F7]">AI Agents, RAG, Automation, LLM Integration</span>
        </p>

        <div className="flex flex-wrap gap-4 mt-8">
          <a href="#contact" className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-dashed border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800 transition-all group">
            <Mail className="text-lg text-[#FF4D4D] group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-zinc-100">Get in Touch</span>
          </a>
          <a href="https://github.com/KarewarGaurav" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-dashed border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800 transition-all group">
            <Github className="text-lg text-[#ffffff] group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-zinc-100">GitHub</span>
          </a>
          <a href="https://www.linkedin.com/in/gaurav-karewar" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-dashed border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800 transition-all group">
            <Linkedin className="text-lg text-[#0A66C2] group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-zinc-100">LinkedIn</span>
          </a>
          <a href="/Resume%20AI.pdf" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-dashed border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800 transition-all group">
            <FileText className="text-lg text-[#A855F7] group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-zinc-100">Resume / CV</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
