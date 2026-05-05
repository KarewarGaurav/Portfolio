"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Github, Linkedin, Mail, Send, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
  const email = "gauravkarewar724@gmail.com";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <section id="contact" className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Get In Touch</h2>
          <div className="h-px bg-border flex-grow max-w-[300px]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="flex flex-col space-y-8">
            <div>
              <h3 className="text-3xl font-bold tracking-tight mb-4">Let&apos;s build AI systems that solve real problems. 🤖🚀</h3>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
                Let&apos;s build AI systems.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-md mt-4">
                I work on AI agents, RAG systems, and automation using LLMs. Open to opportunities and collaborations.
              </p>
            </div>

            <div className="flex flex-col space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="text-primary h-5 w-5" />
                <a href={`mailto:${email}`} className="text-foreground font-medium hover:text-primary transition-colors">
                  {email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Github className="text-primary h-5 w-5" />
                <a href="https://github.com/KarewarGaurav" target="_blank" rel="noreferrer" className="text-foreground font-medium hover:text-primary transition-colors">
                  github.com/KarewarGaurav
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Linkedin className="text-primary h-5 w-5" />
                <a href="https://www.linkedin.com/in/gaurav-karewar" target="_blank" rel="noreferrer" className="text-foreground font-medium hover:text-primary transition-colors">
                  linkedin.com/in/gaurav-karewar
                </a>
              </div>
            </div>
            
            <div className="pt-4">
              <Button onClick={() => navigator.clipboard.writeText(email)} variant="secondary" className="gap-2">
                <Copy className="h-4 w-4" /> Copy Email Address
              </Button>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="bg-card/50 border-border/50 shadow-lg backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Send me a message</CardTitle>
              <CardDescription>Fill out the form below to reach out.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-medium">Name</label>
                  <Input 
                    id="name" 
                    placeholder="John Doe" 
                    className="bg-background" 
                    required
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="john@example.com" 
                    className="bg-background" 
                    required
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-sm font-medium">Message</label>
                  <Textarea 
                    id="message" 
                    placeholder="Hello Gaurav, let's talk about..." 
                    className="min-h-[150px] bg-background" 
                    required
                    value={formData.message}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  size="lg" 
                  className={`mt-2 font-semibold transition-all ${submitStatus === 'success' ? 'bg-emerald-600 hover:bg-emerald-700' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : submitStatus === "success" ? (
                    <>
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>

                {submitStatus === "error" && (
                  <p className="text-destructive text-sm font-medium mt-2 animate-in fade-in slide-in-from-top-1">
                    Failed to send message. Please try again or email me directly at {email}.
                  </p>
                )}
                
                {submitStatus === "success" && (
                  <p className="text-emerald-500 text-sm font-medium mt-2 animate-in fade-in slide-in-from-top-1">
                    Thanks for reaching out! I'll get back to you as soon as possible.
                  </p>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </section>
  );
}
