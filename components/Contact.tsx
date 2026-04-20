"use client";

import { useForm, ValidationError } from "@formspree/react";
import dynamic from "next/dynamic";

// Lazy-load the heavy WebGL canvas — no SSR
const Beams = dynamic(() => import("./Beams"), { ssr: false });

export default function Contact() {
  const [state, handleSubmit] = useForm("mlganzjo");

  // Handle successful submission UI
  if (state.succeeded) {
    return (
      <section
        id="contact"
        className="relative w-full h-screen bg-black overflow-hidden flex flex-col items-center justify-center py-16 sm:py-20"
      >
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
          <Beams beamWidth={2} beamHeight={15} beamNumber={5} lightColor="#ffffff" speed={1.5} noiseIntensity={1.5} scale={0.18} rotation={0} />
        </div>
        <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-black via-transparent to-black" />
        
        <div className="relative z-[10] text-center p-10 rounded-2xl bg-white/[0.04] backdrop-blur-2xl border border-white/10 shadow-2xl animate-in zoom-in duration-500">
           <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/20">
             <span className="text-white text-2xl">✓</span>
           </div>
           <h2 className="text-white font-heading text-3xl uppercase tracking-widest mb-4">Transmission Received</h2>
           <p className="text-white/50 font-sans text-sm max-w-xs mx-auto leading-relaxed">
             The protocol has been updated. Our team will contact you shortly through the secure channel.
           </p>
           <button 
             onClick={() => window.location.reload()} 
             className="mt-8 text-white/30 font-tech text-[10px] tracking-widest uppercase hover:text-white transition-colors"
           >
             Send another message
           </button>
        </div>
      </section>
    );
  }

  return (
    <section
      id="contact"
      className="relative w-full h-full bg-black overflow-hidden flex flex-col items-center justify-center py-16 sm:py-20"
    >
      {/* -- Beams WebGL background -- */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <Beams
          beamWidth={2}
          beamHeight={15}
          beamNumber={5}
          lightColor="#ffffff"
          speed={1.5}
          noiseIntensity={1.5}
          scale={0.18}
          rotation={0}
        />
      </div>

      {/* -- Top / bottom vignette -- */}
      <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-black via-transparent to-black" />

      {/* -- Content -- */}
      {/* -- Content -- */}
      <div className="relative z-[10] w-full max-w-3xl px-6 sm:px-12 flex flex-col items-center gap-4 sm:gap-6 pt-32 sm:pt-44 pb-12">

        {/* Mobile Heading Only */}
        <div className="text-center sm:hidden mb-4">
          <p className="text-white/40 font-tech tracking-[0.4em] text-xs uppercase mb-3">
            Singularity Protocol
          </p>
          <h2 className="text-white font-heading text-[clamp(40px,7vw,70px)] uppercase tracking-widest leading-none drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
            Contact
          </h2>
          <div className="mt-4 w-20 h-px bg-white/20 mx-auto" />
        </div>

        {/* -- Contact Form (Heading embedded on Desktop) -- */}
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-4 sm:gap-6 p-5 sm:p-8 rounded-2xl
                     bg-white/[0.04] backdrop-blur-[16px]
                     border border-white/[0.08]
                     shadow-[0_8px_32px_rgba(0,0,0,0.6)]
                     focus-within:border-white/20 focus-within:shadow-[0_0_40px_rgba(255,255,255,0.03)]
                     transition-all duration-500"
        >
          {/* Desktop Embedded Heading */}
          <div className="hidden sm:block text-center -mb-2">
            <h2 className="text-white font-heading text-6xl lg:text-8xl uppercase tracking-widest leading-[0.8] drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                Contact
            </h2>
            <div className="mt-2 w-20 h-px bg-white/20 mx-auto opacity-50" />
          </div>

          {/* Tagline */}
          <p className="text-white/30 font-tech tracking-[0.3em] text-[9px] uppercase hidden sm:block text-center mt-2">
            Singularity Protocol Communication Link
          </p>

          {/* Name + Email row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="contact-name" className="text-white/60 font-tech tracking-[0.1em] text-[9px] uppercase">
                Name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                placeholder="Name"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    e.currentTarget.closest('form')?.requestSubmit();
                  }
                }}
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-2.5
                           text-white font-sans text-sm placeholder:text-white/40
                           hover:bg-white/[0.06] hover:border-white/20
                           focus:outline-none focus:border-white/40 focus:bg-white/[0.08] 
                           focus:shadow-[0_0_20px_rgba(255,255,255,0.05)]
                           transition-all duration-300"
              />
              <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-500/70 text-[9px] mt-1 uppercase" />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="contact-email" className="text-white/60 font-tech tracking-[0.1em] text-[10px] uppercase">
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                placeholder="Email"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    e.currentTarget.closest('form')?.requestSubmit();
                  }
                }}
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-2.5
                           text-white font-sans text-sm placeholder:text-white/40
                           hover:bg-white/[0.06] hover:border-white/20
                           focus:outline-none focus:border-white/40 focus:bg-white/[0.08] 
                           focus:shadow-[0_0_20px_rgba(255,255,255,0.05)]
                           transition-all duration-300"
              />
              <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500/70 text-[9px] mt-1 uppercase" />
            </div>
          </div>

          {/* Subject */}
          <div className="flex flex-col gap-1">
            <label htmlFor="contact-subject" className="text-white/60 font-tech tracking-[0.1em] text-[9px] uppercase">
              Subject
            </label>
            <input
              id="contact-subject"
              name="subject"
              type="text"
              required
              placeholder="Subject"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  e.currentTarget.closest('form')?.requestSubmit();
                }
              }}
              className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-2.5
                         text-white font-sans text-sm placeholder:text-white/20
                         hover:bg-white/[0.06] hover:border-white/20
                         focus:outline-none focus:border-white/40 focus:bg-white/[0.08] 
                         focus:shadow-[0_0_20px_rgba(255,255,255,0.05)]
                         transition-all duration-300"
            />
            <ValidationError prefix="Subject" field="subject" errors={state.errors} className="text-red-500/70 text-[9px] mt-1 uppercase" />
          </div>

          {/* Message */}
          <div className="flex flex-col gap-1">
            <label htmlFor="contact-message" className="text-white/60 font-tech tracking-[0.1em] text-[9px] uppercase">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={3}
              placeholder="Your inquiry..."
              className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-2.5
                         text-white font-sans text-sm placeholder:text-white/40
                         hover:bg-white/[0.06] hover:border-white/20
                         focus:outline-none focus:border-white/40 focus:bg-white/[0.08] 
                         focus:shadow-[0_0_20px_rgba(255,255,255,0.05)]
                         transition-all duration-300 resize-none"
            />
            <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500/70 text-[9px] mt-1 uppercase" />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={state.submitting}
            className="group mt-2 px-10 py-3 rounded-full
                       border border-white/20 bg-white/[0.05] backdrop-blur-xl
                       text-white font-heading text-[10px] tracking-[0.2em] uppercase
                       cursor-pointer transition-all duration-400
                       hover:bg-white/10 hover:border-white/60
                       hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]
                       active:scale-95 disabled:opacity-40"
          >
            {state.submitting ? "Transmitting..." : "Initiate Contact"}
          </button>
        </form>

        {/* Desktop-Only Subheading below Glass */}
        <p className="hidden sm:block text-white/40 font-sans text-xs lg:text-sm max-w-md mx-auto text-center leading-relaxed">
            Have a question, proposal, or just want to say hello? Drop us a message.
        </p>

        {/* Bottom tagline */}
        <p className="text-white/20 font-tech tracking-[0.3em] text-[9px] uppercase text-center">
          Monitoring the frequency for incoming signals.
        </p>
      </div>
    </section>
  );
}