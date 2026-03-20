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
            I am a passionate <span className="text-foreground font-medium">Software Developer</span> with a strong willingness to learn and adapt to new technologies. I specialize in building responsive, scalable web applications using React.js and modern UI frameworks.
          </p>
          <p>
            I have experience in AI powered development and modern web development. I build applications using manual coding and use AI tools such as Cursor, Replit, and Lovable to improve development efficiency, speed up debugging, and optimize workflows. I work with JavaScript and React to create responsive and efficient web applications.
          </p>
          <p>
            My recent focus is on workflow automation and agentic AI using tools like n8n and frameworks such as LangChain. I also integrate REST APIs and design backend workflows to ensure fast and reliable data flow across systems.
          </p>
          <p>
            I build end to end web application features from user interface development to backend logic implementation. I focus on writing clean code, creating responsive interfaces, and ensuring efficient data handling.
          </p>
          <p>
            I continuously improve my skills by exploring new technologies, AI driven development methods, and modern tools to build scalable and user focused applications.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
