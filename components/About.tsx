"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Lazy-load the heavy WebGL canvas — no SSR
const Beams = dynamic(() => import("./Beams"), { ssr: false });

const teamMembers = [
  {
    name: "Sourav Kumar",
    role: "Founder & Script Writer",
    bio: "The visionary who founded Protocol Breach. He writes every script and shapes the narrative universe from the ground up.",
  },
  {
    name: "Abhisht Jaiswal",
    role: "Co-Founder & Director",
    bio: "Drives business development and brand strategy. He manages social media outreach and keeps the project moving forward.",
  },
  {
    name: "Arya Choudhary",
    role: "Co-Founder & Lead Developer",
    bio: "The architect behind the game engine and core systems. He turns creative concepts into playable, high-performance code.",
  },
  {
    name: "Utkarsh",
    role: "Editor & Content Creator",
    bio: "Shapes the visual identity through cinematic edits. He crafts compelling content that defines the brand across platforms.",
  },
];

export default function About() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col items-center justify-center py-16 sm:py-32"
    >
      {/* -- Beams WebGL background -- */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40 sm:opacity-60">
        {mounted && (
          <Beams
            beamWidth={2}
            beamHeight={15}
            beamNumber={window.innerWidth < 640 ? 3 : 5}
            lightColor="#ffffff"
            speed={1.2}
            noiseIntensity={1.2}
            scale={window.innerWidth < 640 ? 0.12 : 0.18}
            rotation={0}
          />
        )}
      </div>

      {/* -- Subtle top/bottom vignette -- */}
      <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-black via-transparent to-black" />

      {/* -- Content -- */}
      <div className="relative z-[10] w-full max-w-6xl px-6 sm:px-12 flex flex-col items-center gap-10 sm:gap-16">

        {/* Heading */}
        <div className="text-center">
          <p className="text-white/40 font-tech tracking-[0.4em] text-xs uppercase mb-3">Singularity Protocol</p>
          <h2 className="text-white font-heading text-[clamp(36px,6vw,90px)] uppercase tracking-widest leading-none drop-shadow-[0_0_40px_rgba(255,255,255,0.3)]">
            The Team
          </h2>
          <div className="mt-4 w-24 h-px bg-white/20 mx-auto" />
        </div>

        {/* Team cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-6 w-full px-1 sm:px-0">
          {teamMembers.map((member, i) => (
            <div
              key={member.name}
              onClick={() => {
                if (typeof window !== 'undefined' && window.innerWidth < 640) {
                  setActiveIndex(activeIndex === i ? null : i);
                }
              }}
              className={`group relative rounded-xl sm:rounded-2xl p-3 sm:p-6 flex flex-col gap-2 sm:gap-3
                         backdrop-blur-[16px] border transition-all duration-400 cursor-default
                         ${activeIndex === i 
                           ? "bg-white/[0.12] border-white/40 shadow-[0_0_30px_rgba(255,255,255,0.1)] scale-[1.02] z-[11]" 
                           : "bg-white/[0.03] border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.6)]"}
                         hover:bg-white/[0.08] hover:border-white/[0.18]
                         hover:shadow-[0_12px_48px_rgba(255,255,255,0.07),0_8px_32px_rgba(0,0,0,0.8)]
                         sm:hover:-translate-y-1`}
            >
              {/* Avatar circle */}
              <div className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full border flex items-center justify-center mb-0.5 sm:mb-1 transition-colors duration-400
                              ${activeIndex === i ? "bg-white/30 border-white/40" : "bg-white/10 border-white/20 group-hover:bg-white/20"}`}>
                <span className={`font-tech text-sm sm:text-lg font-bold select-none transition-colors
                                 ${activeIndex === i ? "text-white" : "text-white/60"}`}>
                  {member.name.charAt(0)}
                </span>
              </div>

              <div>
                <h3 className={`font-tech tracking-widest text-[10px] sm:text-sm font-bold uppercase drop-shadow-md transition-colors
                               ${activeIndex === i ? "text-white" : "text-white"}`}>
                  {member.name}
                </h3>
                <p className={`font-tech tracking-[0.15em] text-[8px] sm:text-[10px] uppercase mt-0.5 transition-colors
                               ${activeIndex === i ? "text-white/60" : "text-white/40"}`}>
                  {member.role}
                </p>
              </div>

              <p className={`font-sans text-[9px] sm:text-xs leading-[1.6] sm:leading-relaxed mt-auto transition-colors
                             ${activeIndex === i ? "text-white/80" : "text-white/55"}`}>
                {member.bio}
              </p>

              {/* Card top glow line */}
              <div className={`absolute top-0 left-3 right-3 sm:left-6 sm:right-6 h-px bg-gradient-to-r from-transparent to-transparent transition-colors duration-400
                              ${activeIndex === i ? "via-white/60" : "via-white/20 group-hover:via-white/40"}`} />
            </div>
          ))}
        </div>

        {/* Bottom tagline */}
        <p className="text-white/25 font-tech tracking-[0.3em] text-xs uppercase text-center">
          Built in darkness. Shipped to the stars.
        </p>
      </div>
    </section>
  );
}
