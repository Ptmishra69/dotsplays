"use client";

import React, { useState } from "react";
import { createPortal } from "react-dom";

export default function TrailerCard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="w-[400px] rounded-[22px] p-[18px] bg-white/5 backdrop-blur-[25px] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.7)] transition-transform duration-300 hover:-translate-y-[6px]">

        {/* TRAILER */}
        <div
          className="relative h-[220px] rounded-[14px] overflow-hidden cursor-pointer group"
          onClick={() => setIsOpen(true)}
        >
          <img
            src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa"
            alt="Trailer"
            className="w-full h-full object-cover brightness-[0.85] transition-all duration-400 group-hover:scale-105 group-hover:brightness-100"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center gap-4">
            <span className="w-[60px] h-[60px] rounded-full bg-white/15 backdrop-blur-[12px] flex items-center justify-center text-[22px] text-white shadow-[0_0_20px_rgba(255,255,255,0.2)] pl-1 transition-transform duration-300 group-hover:scale-110">
              ▶
            </span>
            <span className="text-white font-tech tracking-[0.1em] text-[32px] font-extrabold opacity-90 group-hover:opacity-100 transition-all duration-300 [text-shadow:0_4px_25px_#000,0_0_10px_#000] group-hover:[text-shadow:0_4px_35px_#000,0_0_20px_#000]">
              WATCH TRAILER
            </span>
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-[16px] flex justify-between items-center">
          <div className="px-[18px] py-[10px] rounded-[12px] font-tech text-white uppercase border border-white/10 bg-white/5 flex items-center gap-[12px] cursor-not-allowed">
            <div className="w-[6px] h-[6px] rounded-full bg-white shadow-[0_0_8px_white] animate-[pulse_1.5s_infinite]" />
            <div className="flex flex-col">
              <span className="text-[9px] text-white/50 tracking-[0.2em] leading-none mb-[4px]">STEAM</span>
              <span className="text-[13px] tracking-[0.1em] leading-none">COMING SOON</span>
            </div>
          </div>

          <div className="w-[28px] h-[28px] grid grid-cols-2 gap-[2px] opacity-70">
            <span className="bg-white rounded-sm" />
            <span className="bg-white rounded-sm" />
            <span className="bg-white rounded-sm" />
            <span className="bg-white rounded-sm" />
          </div>
        </div>
      </div>

      {/* VIDEO MODAL — portalled to body to escape overflow-hidden */}
      {isOpen && createPortal(
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm flex justify-center items-center z-[150]"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl aspect-video px-4 sm:px-0"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              className="w-full h-full rounded-2xl border border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.1)]"
              src="https://res.cloudinary.com/dbqv4cbdy/video/upload/v1776591501/AQMZKjISlql1_6Wf9n8f4Oe2zPjIREw001oXMwe3IE1eQ3CYWHr3BZO2Sg_D_WnD4T_RqG5t6Zdj5BwXehbriZFO7mvIZ8Ut9Q49tVA_jov2mg.mp4"
              controls
              autoPlay
            />
            <button
              className="absolute -top-12 right-4 sm:-right-12 text-white/60 hover:text-white transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Close ✕
            </button>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
