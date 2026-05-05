"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { projects } from "@/lib/projectsData";
import { ProjectCard } from "@/components/sections/Projects";
import { Navbar } from "@/components/Navbar";

export default function ProjectsPage() {
  const aiProjects = projects.filter(p => p.category === 'AI');
  const fullStackProjects = projects.filter(p => p.category === 'Full Stack');

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 w-full max-w-5xl mx-auto px-6 pt-32 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col gap-4 mb-12">
            <Link href="/#projects">
              <Button variant="ghost" className="w-fit flex items-center gap-2 text-zinc-400 hover:text-white -ml-4">
                <ArrowLeft size={16} /> Back to Home
              </Button>
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500">
              All Projects
            </h1>
            <p className="text-lg text-zinc-400 max-w-2xl">
              A collection of my work in AI agents, full-stack development, and laboratory management systems.
            </p>
          </div>

          {/* AI Projects */}
          <section className="mb-20">
            <div className="flex items-center gap-3 mb-10 border-b border-zinc-800 pb-4">
              <Sparkles size={24} className="text-blue-500" />
              <h2 className="text-2xl font-bold text-white tracking-tight">AI Systems & Agents</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {aiProjects.map((project, idx) => (
                <ProjectCard key={project.title} project={project} idx={idx} />
              ))}
            </div>
          </section>

          {/* Full Stack Projects */}
          <section>
            <div className="flex items-center gap-3 mb-10 border-b border-zinc-800 pb-4">
              <Globe size={24} className="text-emerald-500" />
              <h2 className="text-2xl font-bold text-white tracking-tight">Full Stack Applications</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {fullStackProjects.map((project, idx) => (
                <ProjectCard key={project.title} project={project} idx={idx} />
              ))}
            </div>
          </section>
        </motion.div>
      </main>

      <footer className="w-full py-8 border-t border-border mt-auto">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-6 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()}. All rights reserved.</p>
          <p className="hidden sm:block text-zinc-400 font-medium">Design & Developed by Gaurav Karewar</p>
        </div>
      </footer>
    </div>
  );
}
