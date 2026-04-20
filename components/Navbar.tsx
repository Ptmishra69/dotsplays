"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSectionNav, getSectionIndex } from "./SectionSlider";
import "./navbar.css";

const navItems = ["Home", "Game", "About Us", "Career", "Contact"];

export default function Navbar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const navRef = useRef<HTMLUListElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);

  // Hook into the horizontal section slider (desktop)
  const { activeSection, goToSection, isTrailerOpen, setIsTrailerOpen } = useSectionNav();

  // Reverse map: section index → nav item index
  // Home=0→0, Game=1→1, About=2→2, Career=3→3, Contact=4→4
  const sectionToNavIndex: Record<number, number> = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4 };

  const movePill = (el: HTMLElement) => {
    if (!pillRef.current || !navRef.current) return;
    const rect = el.getBoundingClientRect();
    const pRect = navRef.current.getBoundingClientRect();
    pillRef.current.style.width = `${rect.width}px`;
    pillRef.current.style.left = `${rect.left - pRect.left}px`;
  };

  // Sync navbar active state when section changes externally (wheel, Continue, Go Back)
  useEffect(() => {
    const navIdx = sectionToNavIndex[activeSection];
    if (navIdx !== undefined && navIdx !== activeIndex) {
      setActiveIndex(navIdx);
    }
  }, [activeSection]);

  useEffect(() => {
    // Initial pill placement after hydration
    const activeEl = navRef.current?.children[activeIndex + 1] as HTMLElement;
    if (activeEl) {
      setTimeout(() => movePill(activeEl), 100);
    }

    // Update on resize
    const onResize = () => {
      const activeEl = navRef.current?.children[activeIndex + 1] as HTMLElement;
      if (activeEl) movePill(activeEl);
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activeIndex]);

  const flashPill = () => {
    if (!pillRef.current) return;
    pillRef.current.classList.remove("flash");
    void pillRef.current.offsetWidth; // force reflow
    pillRef.current.classList.add("flash");
    pillRef.current.addEventListener(
      "animationend",
      () => pillRef.current?.classList.remove("flash"),
      { once: true }
    );
  };

  const spawnShockwaves = (el: HTMLElement) => {
    if (!navRef.current) return;
    const rect = el.getBoundingClientRect();
    const pRect = navRef.current.getBoundingClientRect();
    const cx = rect.left - pRect.left + rect.width / 2;
    const cy = rect.top - pRect.top + rect.height / 2;

    [0, 1].forEach((i) => {
      const ring = document.createElement("div");
      ring.className = "shockwave" + (i === 1 ? " delay" : "");
      ring.style.left = cx + "px";
      ring.style.top = cy + "px";
      navRef.current?.appendChild(ring);
      setTimeout(() => ring.remove(), 700);
    });
  };

  const spawnSparks = (el: HTMLElement) => {
    if (!navRef.current) return;
    const rect = el.getBoundingClientRect();
    const pRect = navRef.current.getBoundingClientRect();
    const cx = rect.left - pRect.left + rect.width / 2;
    const cy = rect.top - pRect.top + rect.height / 2;
    const total = 20;
    const colors = ["#ffffff", "#ffffff", "#e2e2e2", "#ffffff", "#f0f0f0"];

    for (let i = 0; i < total; i++) {
      const spark = document.createElement("div");
      spark.className = "spark";

      const angle = (i / total) * 2 * Math.PI + (Math.random() - 0.5) * 0.4;
      const dist = 30 + Math.random() * 55;
      const size = 4 + Math.random() * 6;
      const dur = 380 + Math.random() * 260 + "ms";
      const delay = i * 12 + "ms";
      const color = colors[Math.floor(Math.random() * colors.length)];

      spark.style.cssText = `
          left: ${cx}px;
          top: ${cy}px;
          width: ${size}px;
          height: ${size}px;
          background: ${color};
          box-shadow: 0 0 6px ${color};
          --tx: ${Math.cos(angle) * dist}px;
          --ty: ${Math.sin(angle) * dist}px;
          --dur: ${dur};
          --delay: ${delay};
        `;

      navRef.current.appendChild(spark);
      setTimeout(() => spark.remove(), 700);
    }
  };

  const popLabel = (el: HTMLElement) => {
    el.classList.remove("pop");
    void el.offsetWidth;
    el.classList.add("pop");
    el.addEventListener(
      "animationend",
      () => el.classList.remove("pop"),
      { once: true }
    );
  };

  const flashScene = () => {
    const overlay = document.createElement("div");
    overlay.className = "flash-overlay";
    document.body.appendChild(overlay);
    setTimeout(() => overlay.remove(), 420);
  };

  const handleClick = (e: React.MouseEvent<HTMLLIElement>, index: number, item: string) => {
    if (index === activeIndex) return;

    const target = e.currentTarget;

    // Animate everything explicitly targeting the DOM node
    movePill(target);
    flashPill();
    spawnShockwaves(target);
    spawnSparks(target);
    popLabel(target);
    flashScene();

    // Desktop: slide to the section horizontally
    const sectionIndex = getSectionIndex(item);
    goToSection(sectionIndex);

    // Mobile: smooth scroll fallback
    if (typeof window !== 'undefined' && window.innerWidth < 640) {
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
    }

    // Finally commit to React state
    setActiveIndex(index);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLLIElement>) => {
    movePill(e.currentTarget);
  };

  const handleMouseLeave = () => {
    const activeEl = navRef.current?.children[activeIndex + 1] as HTMLElement;
    if (activeEl) movePill(activeEl);
  };

  // Mobile menu state
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Mobile scroll detection only
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* -- DESKTOP LOGO (Centered in gap between Go Back and Navbar) -- strength */}
      <a 
        onClick={() => goToSection(0)}
        className="hidden sm:block fixed top-[4%] left-[calc(24vw-52px)] -translate-x-1/2 sm:-translate-y-[20px] z-[85] cursor-pointer transition-all duration-500 hover:scale-110 active:scale-95 group"
      >
        <img 
          src="https://res.cloudinary.com/dbqv4cbdy/image/upload/v1776612688/erasebg-transformed_azc2tc.png" 
          alt="Singularity Protocol Logo" 
          className="h-[86px] w-auto drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] filter brightness-110"
        />
      </a>

      {/* -- DESKTOP CONNECT (Red Radial Blossom Menu) -- strength */}
      <div className="hidden sm:block fixed top-[4%] right-[calc(20vw+13px)] translate-x-1/2 sm:translate-y-[4px] z-[85] group flex flex-col items-center">
        {/* Hover Bridge: Expands the hit area so the menu doesn't close when moving to icons */}
        <div className="absolute inset-x-[-120px] top-[-40px] bottom-[-160px] pointer-events-none group-hover:pointer-events-auto z-0" />

        {/* Main Red Button - Elevated z-index to ensure clickability */}
        <button className="relative z-[90] px-5 py-[11px] rounded-full overflow-hidden border border-red-500/50 bg-red-600/10 backdrop-blur-3xl text-red-500 font-heading text-[11px] tracking-[0.3em] uppercase transition-all duration-500 cursor-pointer shadow-[0_0_30px_rgba(220,38,38,0.2)] group-hover:bg-red-600/20 group-hover:border-red-400 group-hover:scale-105 group-hover:shadow-[0_0_40px_rgba(220,38,38,0.4)]">
          {/* Subtle scanning line */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          <span className="relative z-10 flex items-center justify-center">
            Connect
          </span>
        </button>
        
        {/* Radial Social Icons (Blossom spread - Optimized for 'Below' direction) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[80] pointer-events-none group-hover:pointer-events-auto">
          {[
            { 
              name: "Instagram", 
              url: "https://www.instagram.com/aarya.playz", 
              color: "hover:bg-pink-600/80",
              pos: "group-hover:-translate-x-[75px] group-hover:translate-y-[55px]",
              icon: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.948-.2-4.358-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            },
            { 
              name: "YouTube", 
              url: "https://www.youtube.com/@DotPlayzStudio", 
              color: "hover:bg-red-600",
              pos: "group-hover:-translate-x-[38px] group-hover:translate-y-[75px]",
              icon: <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            },
            { 
              name: "Facebook", 
              url: "https://www.facebook.com/profile.php?id=61587105685970", 
              color: "hover:bg-blue-600",
              pos: "group-hover:translate-x-0 group-hover:translate-y-[85px]",
              icon: <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            },
            { 
              name: "Reddit", 
              url: "https://www.reddit.com/user/aarya_playz/", 
              color: "hover:bg-orange-600",
              pos: "group-hover:translate-x-[38px] group-hover:translate-y-[75px]",
              icon: <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.051l-2.594-.544-.537 2.472c.362.122.698.277.984.457a3.3 3.3 0 0 1 .222-.003c1.446 0 2.618 1.17 2.618 2.612 0 1.44-1.174 2.611-2.618 2.611-.341 0-.666-.065-.964-.183-1.052.645-2.485 1.053-4.062 1.087l-.006.002-.515 2.37c-.056.247-.297.4-.536.342-.24-.055-.392-.293-.336-.54l.58-2.67c-1.581-.03-3.027-.433-4.088-1.077a2.53 2.53 0 0 1-.951.186C4.17 12.82 3 11.65 3 10.211c0-1.44 1.17-2.611 2.613-2.611a2.52 2.52 0 0 1 .228.01 3.28 3.28 0 0 1 .951-.43l.705-3.242a.52.52 0 0 1 .615-.397l2.89.606zM12 11.516c-1.396 0-2.528.473-2.528 1.057s1.132 1.057 2.528 1.057c1.398 0 2.528-.473 2.528-1.057s-1.13-1.057-2.528-1.057z" />
            },
            { 
              name: "X (Twitter)", 
              url: "https://x.com/aarya_playz", 
              color: "hover:bg-white/20",
              pos: "group-hover:translate-x-[75px] group-hover:translate-y-[55px]",
              icon: <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
            }
          ].map((link, i) => (
            <a 
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`absolute top-0 left-0 w-11 h-11 rounded-full bg-black/80 backdrop-blur-3xl border border-white/10 flex items-center justify-center text-white/70 transition-all duration-500 ease-out opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 ${link.pos} ${link.color} shadow-lg hover:border-red-500/50 hover:shadow-[0_0_15px_rgba(220,38,38,0.3)] hover:text-white`}
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                {link.icon}
              </svg>
            </a>
          ))}
        </div>
      </div>

      {/* -- DESKTOP NAV -- */}
      <nav className="nav hidden sm:block fixed top-[4%] left-1/2 -translate-x-1/2 z-[85] font-heading bg-black/50 border border-white/15 shadow-[0_15px_50px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.1)] backdrop-blur-2xl">
        <ul ref={navRef} id="navList" onMouseLeave={handleMouseLeave}>
          <div className="pill" id="pill" ref={pillRef}></div>
          {navItems.map((item, i) => (
            <li
              key={item}
              className={i === activeIndex ? "active" : ""}
              onClick={(e) => handleClick(e, i, item)}
              onMouseEnter={handleMouseEnter}
            >
              {item}
            </li>
          ))}
        </ul>
      </nav>

      {/* -- MOBILE LOGO (Top Left) -- strength */}
      <div className={`sm:hidden fixed left-[6vw] z-[100] transition-all duration-500 ${isScrolled ? 'top-4 scale-90' : 'top-6'}`}>
        <a onClick={() => { goToSection(0); setActiveIndex(0); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="cursor-pointer">
          <img 
            src="https://res.cloudinary.com/dbqv4cbdy/image/upload/v1776612688/erasebg-transformed_azc2tc.png" 
            alt="Logo" 
            className="h-9 w-auto drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
          />
        </a>
      </div>

      {/* -- MOBILE HEADER ACTIONS (Top Right) -- strength */}
      <div className={`sm:hidden fixed right-[6vw] z-[100] flex items-center gap-3 transition-all duration-500 ${isScrolled ? 'top-4' : 'top-6'}`}>
        <button
          onClick={() => setIsTrailerOpen(true)}
          className={`px-4 h-10 rounded-full border border-white/20 text-white font-bold text-[10px] tracking-widest shadow-[0_0_15px_rgba(255,255,255,0.05)] transition-all duration-500 ${isScrolled ? 'bg-black/60 backdrop-blur-3xl' : 'bg-white/10 backdrop-blur-md'}`}
        >
          WATCH TRAILER
        </button>
        <button
          className={`w-10 h-10 flex flex-col justify-center items-center gap-[5px] rounded-full shadow-lg transition-all duration-500 ${isScrolled ? 'bg-black/60 backdrop-blur-3xl border border-white/20' : 'bg-white/5 backdrop-blur-md border border-white/10'}`}
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          <span className={`block w-4 h-[1.5px] bg-white transition-transform duration-300 ${isMobileOpen ? 'rotate-45 translate-y-[3px]' : ''}`} />
          <span className={`block w-4 h-[1.5px] bg-white transition-opacity duration-300 ${isMobileOpen ? 'opacity-0' : 'opacity-100'}`} />
          <span className={`block w-4 h-[1.5px] bg-white transition-transform duration-300 ${isMobileOpen ? '-rotate-45 -translate-y-[10px]' : ''}`} />
        </button>
      </div>

      {/* -- MOBILE MENU OVERLAY -- strength */}
      {isMobileOpen && (
        <div className="sm:hidden fixed inset-0 z-[90] bg-black/60 backdrop-blur-2xl flex flex-col justify-center items-center text-center font-heading tracking-widest text-sm text-white/70 uppercase">
          {/* Navigation Links */}
          <ul className="flex flex-col gap-8 mb-16 px-6">
            {navItems.map((item, i) => (
              <li
                key={item}
                className={`cursor-pointer transition-all duration-300 transform active:scale-95 ${i === activeIndex ? 'text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] font-bold scale-110' : 'hover:text-white/80 opacity-60 hover:opacity-100'}`}
                onClick={() => {
                  const sectionIndex = getSectionIndex(item);
                  goToSection(sectionIndex);
                  setActiveIndex(i);
                  setIsMobileOpen(false);
                  
                  // Small delay to let menu close animation start for smoother transition
                  setTimeout(() => {
                    const idMap: Record<string, string> = {
                      "Home": "home",
                      "Game": "game",
                      "About Us": "about",
                      "Career": "careers",
                      "Contact": "contact"
                    };
                    const targetId = idMap[item] || item.toLowerCase().replace(" ", "");
                    const el = document.getElementById(targetId);
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth", block: "start" });
                    } else if (item === "Home") {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }, 150);
                }}
              >
                {item}
              </li>
            ))}
          </ul>

          {/* Mobile Social Connections (Mapped from Desktop) */}
          <div className="flex flex-col items-center gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            <div className="w-12 h-px bg-white/10" />
            <p className="text-white/30 font-tech text-[10px] tracking-[0.3em] uppercase">Connection established</p>
            <div className="flex gap-4">
              {[
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
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center transition-all hover:bg-white/10 hover:border-white/20 active:scale-90"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-white/40">
                    {link.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* -- TRAILER VIDEO MODAL -- strength */}
      {isTrailerOpen && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm flex justify-center items-center z-[150]"
          onClick={() => setIsTrailerOpen(false)}
        >
          <div className="relative w-full max-w-5xl aspect-video px-4 sm:px-0">
            <video
              className="w-full h-full rounded-2xl border border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.1)]"
              src="https://res.cloudinary.com/dbqv4cbdy/video/upload/v1776591501/AQMZKjISlql1_6Wf9n8f4Oe2zPjIREw001oXMwe3IE1eQ3CYWHr3BZO2Sg_D_WnD4T_RqG5t6Zdj5BwXehbriZFO7mvIZ8Ut9Q49tVA_jov2mg.mp4"
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
        </div>
      )}
    </>
  );
}
