"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">About Me</h2>
          <div className="h-px bg-border flex-grow max-w-[300px]" />
        </div>
        
        <div className="text-muted-foreground text-lg leading-relaxed max-w-3xl space-y-6">
          <p>
            I build <span className="text-foreground font-medium">AI systems</span> and full stack applications.
          </p>
          <p>
            I work on AI agents, RAG systems, and automation workflows using LLMs. I use tools like n8n and LangChain to automate tasks and build real world systems.
          </p>
          <p>
            I build end to end applications using React, Node.js, and Python. I design APIs, manage data flow, and deploy applications to production.
          </p>
          <p>
            I have experience integrating LLMs, vector databases, and external APIs to create scalable and reliable AI features.
          </p>
          <p>
            I also use AI tools like Cursor and Claude Code to speed up development, improve debugging, and ship faster.
          </p>
          <p>
            My focus is on building practical systems that automate workflows, reduce manual work, and solve real problems.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
