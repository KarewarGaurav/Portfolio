"use client";

import { useState, useEffect } from "react";
import { ModeToggle } from "./ModeToggle";
import { VisitorCounter } from "./VisitorCounter";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-background/80 backdrop-blur-md border-b border-border shadow-sm py-4" : "bg-transparent py-6"}`}>
      <div className="container px-6 md:px-12 mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3 overflow-hidden">
          <a href="#" className="flex items-center gap-3 group transition-all">
            <div className="h-12 w-12 rounded-full border-2 border-border overflow-hidden shadow-md group-hover:border-primary transition-all duration-300 ring-2 ring-transparent group-hover:ring-primary/10">
              <img 
                src="/avatar.jpg" 
                alt="Logo" 
                className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <span className="font-bold text-2xl tracking-tighter sm:block hidden bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              Gaurav
            </span>
          </a>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
              {link.name}
            </a>
          ))}
          <ModeToggle />
          <VisitorCounter />
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-4">
          <ModeToggle />
          <button className="text-foreground p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-background border-b border-border shadow-md py-4 px-6 flex flex-col gap-4 md:hidden">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} onClick={() => setMobileMenuOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors py-2 border-b border-border/50">
              {link.name}
            </a>
          ))}
          <div className="pt-2 border-t border-border/50 flex justify-center">
            <VisitorCounter />
          </div>
        </div>
      )}
    </header>
  );
}
