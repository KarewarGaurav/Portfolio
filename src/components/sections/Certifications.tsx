"use client";

import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";

const certifications = [
  {
    title: "Database Management System (DBMS)",
    provider: "Infosys Springboard & Coursera"
  },
  {
    title: "DevOps Foundations",
    provider: "Infosys Springboard"
  },
  {
    title: "Full Stack Generative and Agentic AI with Python",
    provider: "Udemy (In Progress)"
  }
];

export default function Certifications() {
  return (
    <section id="certifications" className="py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold">Certifications</h2>
          <div className="h-px bg-border flex-grow max-w-[300px]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              className="group flex flex-col justify-between p-6 bg-secondary/20 hover:bg-secondary/40 border border-border/50 rounded-xl transition-all h-full"
            >
              <div>
                <BadgeCheck className="text-primary mb-4 h-8 w-8 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-semibold leading-tight text-foreground mb-2">
                  {cert.title}
                </h3>
              </div>
              <p className="text-muted-foreground text-sm font-medium mt-auto">
                {cert.provider}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
