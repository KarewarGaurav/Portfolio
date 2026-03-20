import { Navbar } from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Education from "@/components/sections/Education";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 w-full max-w-5xl mx-auto px-6 pb-12">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <div className="grid grid-cols-1 mb-6">
          <Education />
          <div className="flex justify-center mt-6 items-center w-full h-full">
            <img 
              src="https://quotes-github-readme.vercel.app/api?type=horizontal&theme=dark" 
              alt="Programming Quote" 
              className="h-auto object-contain"
            />
          </div>
        </div>
        <Contact />
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
