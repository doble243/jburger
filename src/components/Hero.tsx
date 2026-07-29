import { useEffect, useState } from 'react';
import { Reveal, RevealLines } from './Reveal';

export function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setMounted(true), 60);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden pt-24 sm:pt-28 pb-4 text-center"
      aria-label="Inicio y Menú"
    >
      {/* Background glow orb */}
      <div className="glow-orb animate-pulse-glow left-1/2 -top-16 h-[22rem] w-[22rem] -translate-x-1/2 bg-cheese/20 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        <div
          className={`inline-flex items-center gap-2 rounded-full border border-cheese/40 bg-cheese/10 px-4 py-1.5 shadow-[0_0_24px_-6px_rgba(240,160,32,0.5)] backdrop-blur transition-all duration-700 ease-smooth ${
            mounted ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0'
          }`}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cheese opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cheese" />
          </span>
          <span className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-cheese-light">
            Smash Burgers · Delivery Jueves a Domingo 20:00 a 00:00
          </span>
        </div>

        <h1 className="display-title mt-3 text-[3.2rem] leading-[0.92] text-cream sm:text-6xl lg:text-[5.25rem] tracking-tight">
          <RevealLines
            delay={100}
            lines={[
              <>
                <span className="bg-gradient-to-r from-cheese-light via-cheese to-ember bg-clip-text text-transparent drop-shadow-[0_4px_25px_rgba(240,160,32,0.4)]">
                  SMASH BURGERS
                </span>{' '}
                COMO TIENE QUE SER.
              </>,
            ]}
          />
        </h1>
      </div>
    </section>
  );
}


