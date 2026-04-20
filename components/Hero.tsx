"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import TrailerCard from "./TrailerCard";

const TRAILER_URL = "https://res.cloudinary.com/dbqv4cbdy/video/upload/v1776591501/AQMZKjISlql1_6Wf9n8f4Oe2zPjIREw001oXMwe3IE1eQ3CYWHr3BZO2Sg_D_WnD4T_RqG5t6Zdj5BwXehbriZFO7mvIZ8Ut9Q49tVA_jov2mg.mp4";

export default function Hero() {
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  return (
    <section className="relative w-full min-h-[100dvh] sm:h-screen flex flex-col sm:block bg-black text-white overflow-hidden pb-12 sm:pb-0">

      {/* -- Video wrapper --
          Mobile: in-flow block at top, fixed 55vh tall.
          Desktop: absolute fullscreen overlay (unchanged). */}
      <div className="relative w-full h-[55vh] shrink-0 sm:absolute sm:inset-0 sm:h-full z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-50 pointer-events-none mix-blend-screen"
        >
          <source src="https://res.cloudinary.com/dbqv4cbdy/video/upload/q_auto/f_auto/v1776450826/4a1701d0-bd8e-41f9-8262-867583b87ec2_qtv3jg.mp4" type="video/mp4" />
        </video>

        {/* Mobile-only gradient fade at the bottom of the video
            so the transition into the black content area is seamless */}
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent pointer-events-none sm:hidden" />
      </div>

      {/* -- Heading --
          Mobile: centered below the video, pulled up slightly with negative margin
                  so it overlaps the gradient for a cinematic feel.
          Desktop: absolutely positioned, specialized intro flow. */}
      
      {/* MOBILE HEADING (Restored to original) */}
      <h1 className="sm:hidden relative z-10 w-full text-center px-[6vw] mt-2 font-sans font-light uppercase tracking-[0.12em] leading-[1.1] text-[clamp(22px,8vw,36px)]">
        <span className="text-transparent bg-clip-text bg-linear-to-r from-red-600 via-orange-500 to-amber-400">Apocalypse is coming</span>
        <span className="text-red-600 drop-shadow-[0_0_15px_rgba(220,38,38,1)] font-heading">!!</span>
        <br />
        <span className="font-heading font-normal text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] filter drop-shadow-[0_0_15px_rgba(0,0,0,1)] drop-shadow-[0_0_30px_rgba(0,0,0,1)] tracking-widest block mt-4">Singularity Protocol</span>
      </h1>
 
      {/* DESKTOP HEADING (Asymmetrical Layout - Reset to left) */}
      <div className="hidden sm:flex absolute z-10 bottom-[38%] left-[11%] w-full flex-col items-start text-left uppercase transform -translate-y-[80px]">



        {/* Row 1: Intro Tagline */}
        <div className="font-sans font-semibold tracking-[0.12em] leading-[1.1] text-[clamp(24px,4vw,60px)] flex items-center gap-[0.7em] whitespace-nowrap mb-4">
          <div className="text-transparent bg-clip-text bg-linear-to-r from-red-700 via-red-600 to-red-500 flex gap-[0.6em]">
            <span>Apocalypse</span>
            <span>is</span>
            <span>coming</span>
          </div>
          <span className="text-red-600 drop-shadow-[0_0_15px_rgba(220,38,38,1)] font-heading">!!</span>
        </div>

        {/* Row 2: Main Title (Single line, left-aligned above card) */}
        <h1 className="font-heading font-normal text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] filter drop-shadow-[0_0_15px_rgba(0,0,0,1)] drop-shadow-[0_0_35px_rgba(0,0,0,1)] tracking-[0.05em] text-[clamp(20px,6vw,78px)]">
          Singularity Protocol
        </h1>
      </div>

      {/* -- Trailer Card (Back to original place) -- */}
      <div className="hidden sm:block absolute z-20 bottom-[6%] left-[11%]">
        <TrailerCard />
      </div>

      {/* -- Footer tagline & CTA --
          Mobile: centered below heading, pushed down with auto margin.
          Desktop: absolutely positioned bottom-center (unchanged). */}
      <div className="relative z-10 w-full flex flex-col items-center px-[6vw] mt-[5vh] mb-auto sm:mb-0 sm:mt-0 sm:px-0 opacity-80 sm:opacity-100 sm:absolute sm:bottom-[6%] sm:left-1/2 sm:-translate-x-1/2 font-tech uppercase drop-shadow-md gap-6 sm:gap-8">
        <div className="text-center">
          <div className="text-[10px] sm:text-[clamp(10px,1vw,14px)] tracking-[0.28em] mb-[0.6em]">
            UNCOVER THE MYSTERY OF
          </div>
          <div className="text-[9px] sm:text-[clamp(9px,0.85vw,12px)] tracking-[0.22em] text-[#bbb] sm:text-[#777] leading-[1.8] sm:leading-[1.7]">
            NYX-47 IN A CINEMATIC SCI-FI<br />
            SURVIVAL JOURNEY
          </div>
        </div>

        <button
          onClick={() => setIsTrailerOpen(true)}
          className="relative overflow-hidden group px-10 py-4 rounded-full border border-white/40 bg-white/10 text-white font-heading font-medium tracking-[0.15em] shadow-[0_0_25px_rgba(255,255,255,0.2)] transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:shadow-[0_0_45px_rgba(255,255,255,0.4)]"
        >
          <span className="relative z-10">GET STARTED</span>
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-[0.15] transition-opacity duration-300" />
        </button>
      </div>

      {/* -- Trailer video modal (portalled) -- */}
      {isTrailerOpen && createPortal(
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm flex justify-center items-center z-[150]"
          onClick={() => setIsTrailerOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl aspect-video px-4 sm:px-0"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              className="w-full h-full rounded-2xl border border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.1)]"
              src={TRAILER_URL}
              controls
              autoPlay
            />
            <button
              className="absolute -top-12 right-4 sm:-right-12 text-white/60 hover:text-white transition-colors"
              onClick={() => setIsTrailerOpen(false)}
            >
              Close ✕
            </button>
          </div>
        </div>,
        document.body
      )}

    </section>
  );
}
