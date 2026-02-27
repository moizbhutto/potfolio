"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Load Spline ONLY on client to prevent null DOM / hydration crashes
const Spline = dynamic(
  () => import("@splinetool/react-spline").then((mod) => mod.default),
  { ssr: false }
);

function Loader({ visible }: { visible: boolean }) {
  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black text-white transition-opacity duration-700 ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      <div className="text-center">
        <div className="w-12 h-12 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="mt-4 text-sm tracking-wide">Loading Experience...</p>
      </div>
    </div>
  );
}

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Dev runtime checks (basic tests)
  if (process.env.NODE_ENV !== "production") {
    console.assert(typeof window !== "undefined", "Window should exist on client");
  }

  const handleSplineLoad = () => {
    // Small delay for smoother reveal
    setTimeout(() => {
      setLoading(false);
      setAnimateIn(true);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Loading Screen */}
      <Loader visible={loading} />

      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black/30 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold tracking-wide">Abdulmoiz</h1>
          <nav className="space-x-6 text-sm">
            <a href="#about" className="hover:text-gray-300">About</a>
            <a href="#projects" className="hover:text-gray-300">Projects</a>
            <a href="#contact" className="hover:text-gray-300">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Render Spline only AFTER mount */}
        {mounted && (
          <div className="absolute inset-0">
            <Spline
              scene="https://prod.spline.design/O2dA8-ZGZtnRjczq/scene.splinecode"
              onLoad={handleSplineLoad}
            />
          </div>
        )}

        <div
          style={{
            opacity: animateIn ? 1 : 0,
            transform: animateIn ? "translateY(0px)" : "translateY(40px)",
            transition: "all 0.9s ease"
          }}
          className="relative z-10 text-center px-6"
        >
          <h2 className="text-5xl md:text-7xl font-bold leading-tight">
            Hi, I'm <span className="text-gray-300">Abdulmoiz</span>
          </h2>
          <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Computer Science Student | Web Developer | Building Creative Digital Experiences
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <button className="px-6 py-3 bg-white text-black rounded-2xl hover:opacity-90 transition">
              View Projects
            </button>
            <button className="px-6 py-3 border border-white rounded-2xl hover:bg-white hover:text-black transition">
              Contact Me
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 max-w-5xl mx-auto text-center">
        <h3 className="text-3xl font-semibold mb-6">About Me</h3>
        <p className="text-gray-400 leading-relaxed">
          I'm Abdulmoiz, a passionate Computer Science student focused on web development,
          problem solving, and creating modern interactive interfaces. I enjoy building
          visually appealing applications that combine creativity with performance.
        </p>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 bg-zinc-900">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-3xl font-semibold mb-12">Projects</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((p) => (
              <div
                key={p}
                className="bg-black/60 border border-white/10 rounded-2xl p-6 shadow-lg hover:scale-105 transition"
              >
                <h4 className="text-xl font-medium mb-2">Project {p}</h4>
                <p className="text-gray-400 text-sm">
                  A modern web application showcasing design, performance, and responsive layouts.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 max-w-4xl mx-auto text-center">
        <h3 className="text-3xl font-semibold mb-6">Contact</h3>
        <p className="text-gray-400 mb-8">Let's work together or just say hello.</p>
        <button className="px-6 py-3 bg-white text-black rounded-2xl hover:opacity-90 transition">
          Send Message
        </button>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500 text-sm border-t border-white/10">
        © {new Date().getFullYear()} Abdulmoiz. All rights reserved.
      </footer>
    </div>
  );
}
