import { useState } from 'react';

export function ConstructionTape() {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) {
    return (
      <div className="fixed bottom-20 left-4 z-50 flex items-center gap-1.5 rounded-full border border-yellow-500/50 bg-black/90 p-1.5 shadow-lg shadow-black/60 backdrop-blur-md transition-all hover:border-yellow-400">
        <a
          href="https://www.simplemente.com.uy"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center rounded-full p-1 transition-transform hover:scale-110"
          title="Ir a www.simplemente.com.uy"
        >
          <img
            src="https://pub-f24c794dd2b44b4e8351b5f54de70b4a.r2.dev/logo_simplemente_sf.png"
            alt="Simplemente"
            className="h-4.5 w-auto brightness-110"
          />
        </a>
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-2 py-0.5 text-xs font-bold text-yellow-400 transition-colors hover:text-yellow-300"
          title="Ver aviso de mantenimiento"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-yellow-500"></span>
          </span>
          <span className="font-mono tracking-wider">🚧 ESTAMOS TRABAJANDO</span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-black/60 backdrop-blur-sm transition-all duration-500">
      {/* Dynamic diagonal caution tapes across background */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        {/* Tape 1: Top-Left to Bottom-Right */}
        <div className="absolute w-[180vw] rotate-[-12deg] transform border-y-4 border-black bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 py-3 shadow-[0_0_35px_rgba(0,0,0,0.9)]">
          <div className="hazard-stripes flex w-full items-center justify-around whitespace-nowrap font-display text-xl tracking-widest text-black sm:text-2xl md:text-3xl">
            <span className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 bg-black px-2 py-0.5 text-yellow-400">
                <img
                  src="https://pub-f24c794dd2b44b4e8351b5f54de70b4a.r2.dev/logo_simplemente_sf.png"
                  alt=""
                  className="h-4 w-auto brightness-125"
                />
                PRECAUCIÓN
              </span>
              <span>ESTAMOS TRABAJANDO · ALGO BUENO SE VIENE...</span>
            </span>
            <span className="hidden items-center gap-3 sm:flex">
              <span className="inline-flex items-center gap-1.5 bg-black px-2 py-0.5 text-yellow-400">
                <img
                  src="https://pub-f24c794dd2b44b4e8351b5f54de70b4a.r2.dev/logo_simplemente_sf.png"
                  alt=""
                  className="h-4 w-auto brightness-125"
                />
                KEEP OUT
              </span>
              <span>ESTAMOS TRABAJANDO · ALGO BUENO SE VIENE...</span>
            </span>
          </div>
        </div>

        {/* Tape 2: Bottom-Left to Top-Right */}
        <div className="absolute w-[180vw] rotate-[14deg] transform border-y-4 border-black bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-300 py-3 shadow-[0_0_35px_rgba(0,0,0,0.9)]">
          <div className="hazard-stripes flex w-full items-center justify-around whitespace-nowrap font-display text-xl tracking-widest text-black sm:text-2xl md:text-3xl">
            <span className="flex items-center gap-3">
              <span>ALGO BUENO SE VIENE</span>
              <span className="bg-black px-2 py-0.5 text-yellow-400">🚧 PRÓXIMAMENTE</span>
              <span>ESTAMOS TRABAJANDO</span>
            </span>
            <span className="hidden items-center gap-3 md:flex">
              <span>ALGO BUENO SE VIENE</span>
              <span className="inline-flex items-center gap-1.5 bg-black px-2 py-0.5 text-yellow-400">
                <img
                  src="https://pub-f24c794dd2b44b4e8351b5f54de70b4a.r2.dev/logo_simplemente_sf.png"
                  alt=""
                  className="h-4 w-auto brightness-125"
                />
                JBURGER
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Central Interactive Banner Modal */}
      <div className="relative z-10 mx-4 max-w-lg rounded-2xl border-2 border-yellow-500/60 bg-gradient-to-b from-surface/95 via-charcoal/95 to-black/95 p-6 text-center shadow-[0_0_50px_rgba(240,160,32,0.3)] backdrop-blur-md sm:p-8">
        {/* Subtle Simplemente Logo Branding with Link */}
        <div className="mb-4 flex items-center justify-center gap-2">
          <a
            href="https://www.simplemente.com.uy"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-1.5 transition-transform hover:scale-105"
            title="Visitar www.simplemente.com.uy"
          >
            <img
              src="https://pub-f24c794dd2b44b4e8351b5f54de70b4a.r2.dev/logo_simplemente_sf.png"
              alt="Simplemente"
              className="h-6 w-auto opacity-80 brightness-110 drop-shadow-[0_0_8px_rgba(240,160,32,0.5)] transition-opacity group-hover:opacity-100"
            />
          </a>
          <span className="h-3 w-[1px] bg-yellow-500/40"></span>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-yellow-500/40 bg-yellow-500/10 px-3 py-1 text-[11px] font-black uppercase tracking-widest text-yellow-400">
            <span className="animate-pulse">⚠️</span> ZONA EN CONSTRUCCIÓN
          </div>
        </div>

        <h2 className="font-display text-3xl font-bold tracking-wide text-cream sm:text-4xl">
          ESTAMOS TRABAJANDO
        </h2>
        <p className="mt-1 font-display text-xl text-yellow-400 sm:text-2xl">
          ¡ALGO BUENO SE VIENE!
        </p>

        <p className="mt-4 text-sm leading-relaxed text-cream-muted sm:text-base">
          Estamos sintonizando los últimos detalles de la experiencia <strong>JBurger</strong>. Podés mirar todo el sitio de fondo o presionar el botón para interactuar libremente.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={() => setIsOpen(false)}
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-yellow-500 to-amber-500 px-6 py-3 font-extrabold text-black shadow-lg shadow-yellow-500/25 transition-all hover:scale-105 hover:from-yellow-400 hover:to-amber-400 active:scale-95"
          >
            <span className="flex items-center gap-2">
              <span>ENTRAR Y EXPLORAR EL SITIO</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </span>
          </button>
        </div>

        <div className="mt-5 flex items-center justify-center">
          <a
            href="https://www.simplemente.com.uy"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-1.5 text-[11px] uppercase tracking-wider text-cream-muted/70 transition-colors hover:text-yellow-400"
            title="Visitar www.simplemente.com.uy"
          >
            <span>Powered by</span>
            <img
              src="https://pub-f24c794dd2b44b4e8351b5f54de70b4a.r2.dev/logo_simplemente_sf.png"
              alt="Simplemente"
              className="h-3.5 w-auto opacity-70 grayscale transition-all group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
