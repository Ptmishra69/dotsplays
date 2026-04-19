"use client";

import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from "react";
import Navbar from "./Navbar";
import MobileFooter from "./MobileFooter";

// ── Section navigation context ──
// Shared between SectionSlider, Navbar, and Continue button
interface SectionContextType {
  activeSection: number;
  totalSections: number;
  goToSection: (index: number) => void;
  goNext: () => void;
  isTrailerOpen: boolean;
  setIsTrailerOpen: (open: boolean) => void;
}

const SectionContext = createContext<SectionContextType>({
  activeSection: 0,
  totalSections: 0,
  goToSection: () => {},
  goNext: () => {},
  isTrailerOpen: false,
  setIsTrailerOpen: () => {},
});

export const useSectionNav = () => useContext(SectionContext);

// ── Section name mapping for Navbar ──
const sectionMap: Record<string, number> = {
  Home: 0,
  Game: 1,
  "About Us": 2,
  Career: 3,
  Contact: 4,
};
export const getSectionIndex = (name: string) => sectionMap[name] ?? 0;

// ── Continue Button (desktop only) ──
function ContinueButton() {
  const { activeSection, totalSections, goNext } = useSectionNav();

  // Hide on the last section
  if (activeSection >= totalSections - 1) return null;

  return (
    <button
      onClick={goNext}
      className="hidden sm:flex fixed top-[4%] right-[4vw] sm:translate-y-[2px] z-[85] items-center gap-3 px-8 py-[14px] rounded-full border border-white/30 bg-black/40 backdrop-blur-3xl text-white font-heading text-[11px] tracking-[0.2em] uppercase cursor-pointer transition-all duration-400 hover:bg-white/15 hover:border-white/50 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:scale-[1.03] group"
    >
      <span>Continue</span>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className="transition-transform duration-300 group-hover:translate-x-1"
      >
        <path
          d="M3 8H13M13 8L9 4M13 8L9 12"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

// ── Go Back Button (desktop only) ──
function GoBackButton() {
  const { activeSection, goToSection } = useSectionNav();

  // Hide on the first section
  if (activeSection <= 0) return null;

  return (
    <button
      onClick={() => goToSection(activeSection - 1)}
      className="hidden sm:flex fixed top-[4%] left-[4vw] sm:-translate-y-[4px] z-[85] items-center gap-3 px-8 py-[14px] rounded-full border border-white/30 bg-black/40 backdrop-blur-3xl text-white font-heading text-[11px] tracking-[0.2em] uppercase cursor-pointer transition-all duration-400 hover:bg-white/15 hover:border-white/50 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:scale-[1.03] group"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className="transition-transform duration-300 group-hover:-translate-x-1"
      >
        <path
          d="M13 8H3M3 8L7 4M3 8L7 12"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>Go Back</span>
    </button>
  );
}

// ── Main Slider Wrapper ──
interface SectionSliderProps {
  children: React.ReactNode[];
}

export default function SectionSlider({ children }: SectionSliderProps) {
  const [activeSection, setActiveSection] = useState(0);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const totalSections = children.length;
  const cooldownRef = useRef(false);

  const goToSection = useCallback(
    (index: number) => {
      if (index >= 0 && index < totalSections) {
        setActiveSection(index);
      }
    },
    [totalSections]
  );

  const goNext = useCallback(() => {
    setActiveSection((prev) => Math.min(prev + 1, totalSections - 1));
  }, [totalSections]);

  const goPrev = useCallback(() => {
    setActiveSection((prev) => Math.max(prev - 1, 0));
  }, []);

  const scrollAccRef = useRef(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // ── Desktop: intercept wheel scroll to navigate sections ──
  useEffect(() => {
    // Only on desktop (640px+)
    if (typeof window === "undefined") return;

    const handleWheel = (e: WheelEvent) => {
      if (window.innerWidth < 640) return; // skip on mobile
      e.preventDefault();

      if (cooldownRef.current) return;

      // Accumulate deltaY
      scrollAccRef.current += e.deltaY;

      // Clear the "reset" timer
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

      const THRESHOLD = 60; // Minimum scroll intensity to trigger
      const COOLDOWN_DURATION = 1000; // Time before another scroll is accepted

      if (Math.abs(scrollAccRef.current) >= THRESHOLD) {
        cooldownRef.current = true;

        if (scrollAccRef.current > 0) {
          goNext();
        } else {
          goPrev();
        }

        // Reset accumulator
        scrollAccRef.current = 0;

        // Transition cooldown
        setTimeout(() => {
          cooldownRef.current = false;
        }, COOLDOWN_DURATION);
      } else {
        // If the user stops scrolling halfway to the threshold, reset the accumulator
        scrollTimeoutRef.current = setTimeout(() => {
          scrollAccRef.current = 0;
        }, 150);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [goNext, goPrev]);

  return (
    <SectionContext.Provider
      value={{ activeSection, totalSections, goToSection, goNext, isTrailerOpen, setIsTrailerOpen }}
    >
      {/* ── Global Navbar (fixed, overlays everything) ── */}
      <Navbar />

      {/* ── DESKTOP: Horizontal slider, no scroll ── */}
      <div className="hidden sm:block fixed inset-0 overflow-hidden bg-black">
        <div
          className="flex h-screen transition-transform duration-700 ease-[cubic-bezier(0.25,0.8,0.1,1)]"
          style={{
            width: `${totalSections * 100}vw`,
            transform: `translateX(-${activeSection * 100}vw)`,
          }}
        >
          {children.map((child, i) => (
            <div
              key={i}
              className="w-screen h-screen shrink-0 overflow-hidden relative"
            >
              {child}
            </div>
          ))}
        </div>

        <ContinueButton />
        <GoBackButton />
      </div>

      {/* ── MOBILE: Normal vertical flow, unchanged ── */}
      <div className="sm:hidden">
        {children}
        <MobileFooter />
      </div>
    </SectionContext.Provider>
  );
}
