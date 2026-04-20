"use client";

import React from "react";
import { useSectionNav } from "./SectionSlider";

const navItems = ["Home", "Game", "About Us", "Career", "Contact"];

const socialLinks = [
  { 
    name: "Instagram", 
    url: "https://www.instagram.com/aarya.playz", 
    icon: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.948-.2-4.358-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  },
  { 
    name: "YouTube", 
    url: "https://www.youtube.com/@DotPlayzStudio", 
    icon: <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  },
  { 
    name: "Facebook", 
    url: "https://www.facebook.com/profile.php?id=61587105685970", 
    icon: <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  },
  { 
    name: "Reddit", 
    url: "https://www.reddit.com/user/aarya_playz/", 
    icon: <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.051l-2.594-.544-.537 2.472c.362.122.698.277.984.457a3.3 3.3 0 0 1 .222-.003c1.446 0 2.618 1.17 2.618 2.612 0 1.44-1.174 2.611-2.618 2.611-.341 0-.666-.065-.964-.183-1.052.645-2.485 1.053-4.062 1.087l-.006.002-.515 2.37c-.056.247-.297.4-.536.342-.24-.055-.392-.293-.336-.54l.58-2.67c-1.581-.03-3.027-.433-4.088-1.077a2.53 2.53 0 0 1-.951.186C4.17 12.82 3 11.65 3 10.211c0-1.44 1.17-2.611 2.613-2.611a2.52 2.52 0 0 1 .228.01 3.28 3.28 0 0 1 .951-.43l.705-3.242a.52.52 0 0 1 .615-.397l2.89.606zM12 11.516c-1.396 0-2.528.473-2.528 1.057s1.132 1.057 2.528 1.057c1.398 0 2.528-.473 2.528-1.057s-1.13-1.057-2.528-1.057z" />
  },
  { 
    name: "X (Twitter)", 
    url: "https://x.com/aarya_playz", 
    icon: <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  }
];

export default function MobileFooter() {
  const { setIsTrailerOpen } = useSectionNav();

  const handleNavClick = (item: string) => {
    if (item === "Home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const idMap: Record<string, string> = {
        "Game": "game",
        "About Us": "about",
        "Career": "careers",
        "Contact": "contact"
      };
      const targetId = idMap[item] || item.toLowerCase().replace(" ", "");
      document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full bg-black border-t border-white/5 px-6 pt-16 pb-12 flex flex-col gap-12 relative overflow-hidden">
      {/* -- Background Accents -- */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-red-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-[100px] pointer-events-none" />

      {/* -- Header Section: Branding & Connections -- */}
      <div className="flex flex-col gap-10 items-center text-center">
        <div className="flex flex-col gap-3 items-center">
          <h3 className="text-white font-heading text-2xl tracking-[0.3em] uppercase drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
            Singularity<br />Protocol
          </h3>
          <div className="w-12 h-[1px] bg-white/20" />
        </div>

        {/* Social Bar (Mapped from Desktop) */}
        <div className="flex flex-col gap-4 items-center">
          <p className="text-white/30 font-tech text-[10px] tracking-widest uppercase text-center">Connect with the Network</p>
          <div className="flex flex-wrap gap-4 justify-center">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-105 active:scale-95 group"
                title={link.name}
              >
                <svg className="w-5 h-5 fill-white/40 group-hover:fill-white transition-colors" viewBox="0 0 24 24">
                  {link.icon}
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* -- Middle: Actions & Navigation -- */}
      <div className="flex flex-col gap-12">
        <button
          onClick={() => setIsTrailerOpen(true)}
          className="relative w-full group overflow-hidden"
        >
          <div className="absolute inset-0 bg-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative py-5 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-xl flex items-center justify-center gap-4 text-white font-heading text-[11px] tracking-[0.3em] uppercase transition-all group-hover:border-white/30">
            <div className="relative w-2 h-2">
              <div className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-60" />
              <div className="absolute inset-0 rounded-full bg-red-500" />
            </div>
            Watch Final Trailer
          </div>
        </button>

        <div className="flex flex-col gap-5">
          <h4 className="text-white/30 font-tech text-[10px] tracking-widest uppercase">Directory</h4>
          <div className="grid grid-cols-2 gap-y-4 gap-x-2">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className="text-left text-white/60 font-sans text-[11px] uppercase tracking-[0.2em] hover:text-white transition-colors flex items-center gap-2 group"
              >
                <span className="w-1 h-1 rounded-full bg-white/10 group-hover:bg-white/40 transition-colors" />
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* -- Bottom: Terminal Footer -- */}
      <div className="pt-10 border-t border-white/5 flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <p className="text-white/20 font-tech text-[10px] tracking-[0.1em] uppercase leading-relaxed">
            © 2026 PROTOCOL BREACH.<br />
            CODED IN DARKNESS. SHIPPED TO THE STARS.
          </p>
        </div>
        
        <div className="flex items-center gap-6 text-white/30 font-tech text-[9px] uppercase tracking-widest">
          <a href="#" className="hover:text-white transition-colors">Log_Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Term_Access</a>
          <a href="#" className="hover:text-white transition-colors">Security_Node</a>
        </div>
      </div>
    </footer>
  );
}
