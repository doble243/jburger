import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from '../data/products';
import { Reveal } from './Reveal';

export function InstagramStrip() {
  return (
    <section className="py-8 sm:py-12" aria-label="Instagram">
      <Reveal variant="zoom" duration={900} className="mx-auto max-w-6xl px-4 sm:px-6">
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex flex-col items-center justify-between gap-6 overflow-hidden rounded-[2rem] border border-white/10 px-6 py-9 text-center transition hover:border-cheese/35 sm:flex-row sm:px-10 sm:text-left"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface to-[#2a1f10]" />
          <div className="absolute -right-10 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-cheese/20 blur-3xl transition group-hover:bg-cheese/30" />
          <div className="absolute inset-0 opacity-40 mix-blend-overlay" style={{
            backgroundImage:
              'radial-gradient(circle at 20% 50%, rgba(240,160,32,0.15), transparent 40%)',
          }} />

          <div className="relative">
            <p className="section-kicker justify-center sm:justify-start">Seguinos</p>
            <p className="display-title mt-2 text-4xl tracking-wide text-cream sm:text-5xl">
              {INSTAGRAM_HANDLE}
            </p>
            <p className="mt-2 text-sm text-cream-muted">
              Novedades, drops y smash en vivo.
            </p>
          </div>
          <span className="relative inline-flex min-h-12 items-center rounded-full bg-cream px-7 text-sm font-extrabold uppercase tracking-wider text-charcoal shadow-lg transition group-hover:bg-cheese">
            Abrir Instagram
          </span>
        </a>
      </Reveal>
    </section>
  );
}
