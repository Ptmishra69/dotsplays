const GAME_DATA = [
  {
    title: "3D Game Visuals",
    desc: "Experience a premium vibe with semi open mode environments crafted in breathtaking fidelity.",
    img: "https://res.cloudinary.com/dbqv4cbdy/image/upload/v1776613931/Screenshot_2026-03-26_214748_f9wjzb.png",
  },
  {
    title: "Alien Shooting",
    desc: "Intense survival action with unlimited outcomes based on your split-second decisions.",
    img: "https://res.cloudinary.com/dbqv4cbdy/image/upload/v1776620781/ChatGPT_Image_Apr_19_2026_11_16_12_PM_vbs6e2.png",
  },
  {
    title: "Story Mode",
    desc: "Dive into a narrative grounded in real scientific phenomenon and dark mysteries.",
    img: "https://res.cloudinary.com/dbqv4cbdy/image/upload/v1776619703/ChatGPT_Image_Mar_22_2026_04_34_18_AM_mekhyk.png",
  },
  {
    title: "Apocalypse Event",
    desc: "The end is coming. The main character must escape within strict real-time limitations.",
    img: "/apocalypse_event.png",
  },
];

function MobileCard({ title, desc, img, delay }: { title: string; desc: string; img: string; delay: string }) {
  return (
    <div 
      className={`relative w-full rounded-xl p-2.5 sm:p-4 bg-white/[0.03] backdrop-blur-[8px] border border-white/5 shadow-xl flex flex-col gap-2 group animate-in fade-in slide-in-from-bottom-4 duration-1000 ${delay}`}
    >
      <div className="relative h-[80px] sm:h-[130px] rounded-lg overflow-hidden border border-white/5">
        <img 
          src={img} 
          alt={title} 
          className="w-full h-full object-cover grayscale-0 opacity-100 group-hover:scale-105 transition-all duration-700" 
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </div>
      <div>
        <h3 className="text-white font-tech tracking-wider text-[9px] sm:text-[11px] font-bold uppercase mb-0.5 line-clamp-1">
          {title}
        </h3>
        <p className="text-white/30 font-sans text-[8px] sm:text-[10px] leading-tight line-clamp-2">
          {desc}
        </p>
      </div>
    </div>
  );
}

export default function Game() {
  return (
    <section 
      id="game" 
      className="relative w-full min-h-[100dvh] sm:h-screen bg-black overflow-hidden flex flex-col items-center justify-center py-12 sm:py-0"
    >
      {/* ── Sliding/Panning Background Layer (Moon + Heading) ── */}
      <div className="absolute inset-[-10%] z-0 pointer-events-none animate-[slide-pan_40s_ease-in-out_infinite_alternate]">
        {/* The Moon */}
        <div 
          className="absolute inset-0 bg-[url('/moon.png')] bg-cover sm:bg-contain sm:bg-no-repeat bg-center"
        />

        {/* Desktop Heading (Centered on the moon and synchronized) */}
        <div className="hidden sm:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center">
          <h2 className="text-white font-heading text-4xl lg:text-5xl xl:text-6xl uppercase tracking-[0.3em] leading-[1] drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]">
            Into the<br/>
            <span className="text-6xl lg:text-7xl xl:text-8xl tracking-[0.4em] text-white/90">Game</span>
          </h2>
          <div className="mt-8 w-20 h-[1px] bg-white/20 mx-auto" />
        </div>
      </div>

      {/* ── MOBILE VIEW: 2x2 grid split by Center Text ── */}
      <div className="relative z-[20] flex flex-col items-center gap-16 sm:hidden w-full max-w-[400px] px-4">
        {/* Top row */}
        <div className="grid grid-cols-2 gap-2.5 w-full">
          <MobileCard {...GAME_DATA[0]} delay="delay-0" />
          <MobileCard {...GAME_DATA[1]} delay="delay-150" />
        </div>

        {/* Center Heading */}
        <div className="text-center py-2">
          <h2 className="text-white font-heading text-[clamp(28px,9vw,60px)] uppercase tracking-[0.25em] leading-none drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">
            INTO THE<br/>GAME
          </h2>
          <div className="mt-3 w-10 h-px bg-white/30 mx-auto" />
        </div>

        {/* Bottom row */}
        <div className="grid grid-cols-2 gap-2.5 w-full">
          <MobileCard {...GAME_DATA[2]} delay="delay-300" />
          <MobileCard {...GAME_DATA[3]} delay="delay-450" />
        </div>
      </div>

      {/* ── Desktop-Only Info Cards (Positioned at 4 extreme corners) ── */}
      <div className="hidden sm:block absolute inset-0 z-[15] pointer-events-none w-full h-full">
        {/* Top Left - Standard Rectangle (Restored) */}
        <div className="absolute top-[16vh] left-[3vw] lg:left-[5vw] pointer-events-auto origin-top-left hover:z-20 w-[280px] lg:w-[340px]">
          <div className="rounded-2xl p-5 bg-white/5 backdrop-blur-[20px] border border-white/10 shadow-2xl transition-all duration-400 hover:-translate-y-2 hover:bg-white/10 group">
            <div className="relative h-[130px] lg:h-[160px] rounded-xl overflow-hidden mb-4 border border-white/5">
              <img src={GAME_DATA[0].img} alt={GAME_DATA[0].title} className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="absolute bottom-0 left-0 right-0 h-[40px] bg-gradient-to-t from-black to-transparent z-[2]" />
            </div>
            <h3 className="text-white font-tech tracking-widest text-xs lg:text-sm font-bold uppercase mb-1.5 drop-shadow-md">{GAME_DATA[0].title}</h3>
            <p className="text-white/50 font-sans text-[11px] lg:text-xs leading-relaxed line-clamp-2">{GAME_DATA[0].desc}</p>
          </div>
        </div>

        {/* Top Right - Standard Rectangle */}
        <div className="absolute top-[16vh] right-[3vw] lg:right-[5vw] pointer-events-auto origin-top-right hover:z-20 w-[280px] lg:w-[340px]">
          <div className="rounded-2xl p-5 bg-white/5 backdrop-blur-[20px] border border-white/10 shadow-2xl transition-all duration-400 hover:-translate-y-2 hover:bg-white/10 group">
            <div className="relative h-[130px] lg:h-[160px] rounded-xl overflow-hidden mb-4 border border-white/5">
              <img src={GAME_DATA[1].img} alt={GAME_DATA[1].title} className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="absolute bottom-0 left-0 right-0 h-[40px] bg-gradient-to-t from-black to-transparent z-[2]" />
            </div>
            <h3 className="text-white font-tech tracking-widest text-xs lg:text-sm font-bold uppercase mb-1.5 drop-shadow-md">{GAME_DATA[1].title}</h3>
            <p className="text-white/50 font-sans text-[11px] lg:text-xs leading-relaxed line-clamp-2">{GAME_DATA[1].desc}</p>
          </div>
        </div>

        {/* Bottom Left */}
        <div className="absolute bottom-[5vh] left-[3vw] lg:left-[5vw] pointer-events-auto origin-bottom-left hover:z-20 w-[280px] lg:w-[340px]">
          <div className="rounded-2xl p-5 bg-white/5 backdrop-blur-[20px] border border-white/10 shadow-2xl transition-all duration-400 hover:-translate-y-2 hover:bg-white/10 group">
            <div className="relative h-[130px] lg:h-[160px] rounded-xl overflow-hidden mb-4 border border-white/5">
              <img src={GAME_DATA[2].img} alt={GAME_DATA[2].title} className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="absolute bottom-0 left-0 right-0 h-[40px] bg-gradient-to-t from-black to-transparent z-[2]" />
            </div>
            <h3 className="text-white font-tech tracking-widest text-xs lg:text-sm font-bold uppercase mb-1.5 drop-shadow-md">{GAME_DATA[2].title}</h3>
            <p className="text-white/50 font-sans text-[11px] lg:text-xs leading-relaxed line-clamp-2">{GAME_DATA[2].desc}</p>
          </div>
        </div>

        {/* Bottom Right */}
        <div className="absolute bottom-[5vh] right-[3vw] lg:right-[5vw] pointer-events-auto origin-bottom-right hover:z-20 w-[280px] lg:w-[340px]">
          <div className="rounded-2xl p-5 bg-white/5 backdrop-blur-[20px] border border-white/10 shadow-2xl transition-all duration-400 hover:-translate-y-2 hover:bg-white/10 group">
            <div className="relative h-[130px] lg:h-[160px] rounded-xl overflow-hidden mb-4 border border-white/5">
              <img src={GAME_DATA[3].img} alt={GAME_DATA[3].title} className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="absolute bottom-0 left-0 right-0 h-[40px] bg-gradient-to-t from-black to-transparent z-[2]" />
            </div>
            <h3 className="text-white font-tech tracking-widest text-xs lg:text-sm font-bold uppercase mb-1.5 drop-shadow-md">{GAME_DATA[3].title}</h3>
            <p className="text-white/50 font-sans text-[11px] lg:text-xs leading-relaxed line-clamp-2">{GAME_DATA[3].desc}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

