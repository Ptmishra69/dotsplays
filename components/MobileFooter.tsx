"use client";

import { useSectionNav } from "./SectionSlider";

const navItems = ["Home", "Game", "About Us", "Career", "Contact"];

export default function MobileFooter() {
  const { setIsTrailerOpen } = useSectionNav();

  const handleNavClick = (item: string) => {
    if (item === "Home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const id = item.toLowerCase().replace(" ", "");
      // Map for specific IDs if needed
      const targetId = item === "Career" ? "careers" : id;
      document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full bg-black border-t border-white/10 px-6 pt-16 pb-12 flex flex-col gap-12 relative overflow-hidden">
      {/* ── Background Accent ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/5 rounded-full blur-[100px] pointer-events-none" />

      {/* ── Top Section: Branding & Trailer Action ── */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h3 className="text-white font-heading text-xl tracking-[0.3em] uppercase opacity-90 drop-shadow-lg">
            Singularity Protocol
          </h3>
          <p className="text-white/40 font-tech text-[10px] tracking-[0.2em] uppercase max-w-[220px]">
            The reality engine is initializing. Connection established.
          </p>
        </div>

        <button
          onClick={() => setIsTrailerOpen(true)}
          className="w-full py-4 rounded-xl border border-white/20 bg-white/5 backdrop-blur-xl flex items-center justify-center gap-3 text-white font-heading text-xs tracking-[0.2em] uppercase active:scale-[0.98] transition-all group"
        >
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          Watch the Trailer
        </button>
      </div>

      {/* ── Middle Section: Two-Column Info ── */}
      <div className="grid grid-cols-2 gap-8">
        {/* Navigation Column */}
        <div className="flex flex-col gap-4">
          <h4 className="text-white/30 font-tech text-[10px] tracking-widest uppercase mb-1">Navigation</h4>
          <ul className="flex flex-col gap-3">
            {navItems.map((item) => (
              <li 
                key={item} 
                onClick={() => handleNavClick(item)}
                className="text-white/70 font-sans text-xs uppercase tracking-widest hover:text-white transition-colors cursor-pointer flex items-center gap-2 group"
              >
                <div className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-white transition-colors" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Socials Column */}
        <div className="flex flex-col gap-4">
          <h4 className="text-white/30 font-tech text-[10px] tracking-widest uppercase mb-1">Transmissions</h4>
          <div className="flex flex-col gap-4">
            {[
              { name: "Discord", color: "hover:text-[#5865F2]" },
              { name: "Twitter", color: "hover:text-[#1DA1F2]" },
              { name: "Instagram", color: "hover:text-[#E4405F]" },
            ].map((social) => (
              <a
                key={social.name}
                href="#"
                className={`text-white/70 font-sans text-xs uppercase tracking-widest ${social.color} transition-colors flex items-center gap-2 group`}
              >
                 <div className="w-5 h-5 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/20 transition-all">
                    <div className="w-1.5 h-1.5 rounded-[1px] border border-white/40 group-hover:border-white transition-colors" />
                 </div>
                 {social.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom Section: Legal & Credits ── */}
      <div className="flex flex-col gap-6 pt-6 border-t border-white/5">
        <div className="flex flex-col gap-2 opacity-30">
          <p className="text-white font-tech text-[9px] tracking-[0.1em] uppercase">
            © 2026 PROTOCOL BREACH. CODED IN DARKNESS.
          </p>
          <div className="flex items-center gap-4 text-white font-sans text-[8px] uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">Security Log</a>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <a href="#" className="hover:text-white transition-colors">Terms of Access</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
