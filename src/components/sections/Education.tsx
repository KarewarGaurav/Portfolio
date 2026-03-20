"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";

const education = [
  {
    degree: "B.Tech Computer Science",
    school: "Walchand Institute of Technology",
    score: "CGPA: 8.83",
    year: "Aug 2021 – May 2025"
  },
  {
    degree: "Class 12th (HSC)",
    school: "Bharat Bharati High School",
    score: "94.00%",
    year: "Feb 2020 – Feb 2021"
  },
  {
    degree: "Class 10th (SSC)",
    school: "Bal Vidya Mandir",
    score: "84.74%",
    year: "Mar 2018 – Mar 2019"
  }
];

export default function Education() {
  return (
    <section id="education" className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Education</h2>
          <div className="h-px bg-border flex-grow max-w-[300px]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {education.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Card className="h-full bg-card/50 hover:bg-card/80 transition-colors border-border/50">
                <CardHeader>
                  <div className="mb-4 text-primary bg-primary/10 w-12 h-12 flex items-center justify-center rounded-lg">
                    <GraduationCap size={24} />
                  </div>
                  <CardTitle className="text-xl leading-tight">{edu.degree}</CardTitle>
                  <CardDescription className="text-base text-foreground/80 font-medium">
                    {edu.school}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col space-y-1 mt-auto">
                    <span className="text-primary font-semibold text-lg">{edu.score}</span>
                    <span className="text-muted-foreground text-sm font-mono">{edu.year}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
