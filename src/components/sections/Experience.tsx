"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    role: "Software Developer",
    company: "Bettercode Technologies Pvt Ltd",
    period: "June 2025 – Present",
    type: "Remote",
    logo: "/bettercode-logo.png", // Potential path if user adds it
    responsibilities: [
      "Building and maintaining scalable web applications using React.js, JavaScript, and modern UI frameworks.",
      "Integrating RESTful APIs and optimizing performance through code enhancements to ensure fast data flow.",
      "Collaborating in Agile teams and participating in code reviews to maintain high-quality user experiences.",
      "Leveraging AI-assisted development tools like Cursor and Replit to boost coding efficiency and project delivery."
    ]
  }
];

const BetterCodeLogo = () => (
  <div className="flex items-center font-bold text-lg select-none italic tracking-tight">
    <span className="text-[#3a5a40]">a-bettercode</span>
    <span className="text-[#fca311] not-italic ml-0.5 tracking-tighter">{`>>`}</span>
  </div>
);

export default function Experience() {
  return (
    <section id="experience" className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Experience</h2>
          <div className="h-px bg-border flex-grow max-w-[300px]" />
        </div>

        <div className="space-y-12">
          {experiences.map((exp, idx) => (
            <motion.div 
              key={idx}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="border-l-2 border-border/20 ml-2 pb-8 pl-8">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
                  <div className="flex items-start gap-5">
                    {/* Logo Section */}
                    <div className="flex-shrink-0 mt-1">
                       <div className="bg-zinc-900/50 border border-zinc-800 p-2.5 rounded-xl shadow-sm backdrop-blur-sm">
                          <BetterCodeLogo />
                       </div>
                    </div>
                    
                    {/* Role Info */}
                    <div className="pt-0.5">
                      <h3 className="text-2xl font-bold text-foreground leading-tight">{exp.role}</h3>
                      <p className="text-zinc-400 font-medium mt-1">{exp.company}</p>
                    </div>
                  </div>

                  <div className="text-muted-foreground text-[12px] font-mono bg-zinc-900/80 border border-zinc-800 px-4 py-2 rounded-full w-fit shadow-sm">
                    {exp.period} | {exp.type}
                  </div>
                </div>
                
                <ul className="space-y-3 text-zinc-400">
                  {exp.responsibilities.map((resp, i) => (
                    <li key={i} className="flex gap-3 text-[15px] leading-relaxed">
                      <span className="text-primary mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                      {resp}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
