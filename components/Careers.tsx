"use client";

import dynamic from "next/dynamic";

// Lazy-load the heavy WebGL canvas — no SSR
const LineWaves = dynamic(() => import("./LineWaves"), { ssr: false });

const openings = [
  {
    title: "Game Developer",
    type: "Full-time · Remote",
    description:
      "Build and optimise core gameplay systems using Unreal Engine / Unity. Strong C++ or C# skills required.",
  },
  {
    title: "3D Environment Artist",
    type: "Full-time · Remote",
    description:
      "Create immersive sci-fi environments, props, and lighting setups that push visual fidelity.",
  },
  {
    title: "Sound Designer",
    type: "Contract · Remote",
    description:
      "Design atmospheric SFX and adaptive audio systems that react to gameplay in real time.",
  },
  {
    title: "Community Manager",
    type: "Part-time · Remote",
    description:
      "Grow and engage our player community across Discord, Reddit, and social platforms.",
  },
];

export default function Careers() {
  return (
    <section
      id="careers"
      className="relative w-full min-h-[100dvh] sm:h-full bg-black overflow-hidden flex flex-col items-center justify-center py-12 sm:py-20"
    >
      {/* ── LineWaves WebGL background ── */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-25 sm:opacity-40">
        <LineWaves
          speed={0.15}
          innerLineCount={3}
          outerLineCount={3}
          warpIntensity={0.6}
          rotation={-30}
          edgeFadeWidth={0.15}
          colorCycleSpeed={0.5}
          brightness={0.2}
          color1="#ffffff"
          color2="#aaaaaa"
          color3="#ffffff"
          enableMouseInteraction={false}
          mouseInfluence={0}
        />
      </div>

      {/* ── Top / bottom vignette ── */}
      <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-black via-transparent to-black" />

      {/* ── Content ── */}
      <div className="relative z-[10] w-full max-w-6xl px-6 sm:px-12 flex flex-col items-center gap-6 sm:gap-10 sm:translate-y-[35px]">

        {/* Heading */}
        <div className="text-center">
          <p className="text-white/40 font-tech tracking-[0.4em] text-xs uppercase mb-3">
            Singularity Protocol
          </p>
          <h2 className="text-white font-heading text-[clamp(36px,6vw,90px)] uppercase tracking-widest leading-none drop-shadow-[0_0_40px_rgba(255,255,255,0.3)]">
            Careers
          </h2>
          <div className="mt-4 w-24 h-px bg-white/20 mx-auto" />
          <p className="mt-6 text-white/45 font-sans text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            We&apos;re looking for passionate creators to join the team. If you thrive in the unknown, you belong here.
          </p>
        </div>

        {/* Job cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-5 w-full px-1 sm:px-0">
          {openings.map((job) => (
            <div
              key={job.title}
              className="group relative rounded-xl sm:rounded-2xl p-3 sm:p-7 flex flex-col gap-2 sm:gap-3
                         bg-white/[0.04] backdrop-blur-[16px]
                         border border-white/[0.08]
                         shadow-[0_8px_32px_rgba(0,0,0,0.6)]
                         hover:bg-white/[0.08] hover:border-white/[0.18]
                         hover:shadow-[0_12px_48px_rgba(255,255,255,0.07),0_8px_32px_rgba(0,0,0,0.8)]
                         hover:-translate-y-1 transition-all duration-400 cursor-default"
            >
              {/* Role title */}
              <h3 className="text-white font-tech tracking-widest text-sm sm:text-base font-bold uppercase drop-shadow-md">
                {job.title}
              </h3>

              {/* Type badge */}
              <span className="inline-block w-fit text-white/50 font-tech tracking-[0.15em] text-[9px] sm:text-[10px] uppercase px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.03]">
                {job.type}
              </span>

              {/* Description */}
              <p className="text-white/50 font-sans text-[9px] sm:text-sm leading-[1.6] sm:leading-relaxed">
                {job.description}
              </p>

              {/* Apply link placeholder */}
              <div className="mt-auto pt-2 flex items-center justify-between">
                <span className="text-white/20 font-tech tracking-widest text-[9px] uppercase cursor-not-allowed">
                  Closed
                </span>
                <span className="text-red-500 font-tech tracking-[0.2em] text-[8px] sm:text-[9px] uppercase font-bold animate-pulse drop-shadow-[0_0_8px_rgba(239,44,44,0.6)]">
                  Hiring Paused
                </span>
              </div>

              {/* Card top glow line */}
              <div className="absolute top-0 left-4 right-4 sm:left-6 sm:right-6 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-white/40 transition-colors duration-400" />
            </div>
          ))}
        </div>

        {/* Bottom tagline */}
        <p className="text-white/25 font-tech tracking-[0.3em] text-xs uppercase text-center">
          Shape the future. Break the protocol.
        </p>
      </div>
    </section>
  );
}
