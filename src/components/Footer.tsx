import {
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  SCHEDULE,
  WHATSAPP_DISPLAY,
} from '../data/products';
import { openWhatsAppSimple } from '../utils/whatsapp';

export function Footer() {
  return (
    <footer
      id="info"
      className="relative border-t border-white/10 bg-cover sm:bg-[length:100%_auto] bg-bottom bg-no-repeat pb-28 md:pb-10 scroll-mt-24"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(18, 14, 11, 0.45), rgba(10, 8, 6, 0.70)), url('https://pub-f24c794dd2b44b4e8351b5f54de70b4a.r2.dev/jburger-footer-background.webp')`,
      }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cheese/40 to-transparent" />

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <img
              src="/images/logo-jburger.png"
              alt="J Burger"
              className="h-16 w-16 object-contain"
              width={64}
              height={64}
            />
            <div>
              <p className="display-title text-2xl tracking-[0.06em] text-cream">J Burger</p>
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-cream/40">
                Smash Burger
              </p>
            </div>
          </div>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream-muted">
            Smash burgers como tiene que ser. Pedí por WhatsApp y lo armamos al momento.
          </p>
        </div>

        <div>
          <h3 className="section-kicker">Horario</h3>
          <p className="mt-3 text-sm font-medium text-cream/80">{SCHEDULE}</p>
          <h3 className="section-kicker mt-6">Medios de pago</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {['Efectivo', 'Débito', 'Transferencia'].map((m) => (
              <span
                key={m}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-semibold text-cream/70"
              >
                {m}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="section-kicker">Contacto</h3>
          <ul className="mt-3 space-y-3 text-sm">
            <li>
              <button
                type="button"
                onClick={() => openWhatsAppSimple()}
                className="group inline-flex items-center gap-2 font-semibold text-cream/85 transition hover:text-cheese"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366]/15 text-[#25D366] ring-1 ring-[#25D366]/30">
                  <WhatsAppIcon className="h-4 w-4" />
                </span>
                {WHATSAPP_DISPLAY}
              </button>
            </li>
            <li>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 font-semibold text-cream/85 transition hover:text-cheese"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-cream ring-1 ring-white/10">
                  <IgIcon className="h-4 w-4" />
                </span>
                {INSTAGRAM_HANDLE}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/[0.05] py-5 text-center text-xs text-cream/30">
        © {new Date().getFullYear()} J Burger · Smash Burger
      </div>

      <div className="border-t border-white/[0.04]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-1.5 px-4 py-3.5 text-center text-[11px] text-cream/35 sm:flex-row sm:gap-3">
          <span>
            ¿Querés un sitio como este? <span className="text-cream/55">Contactanos</span>
          </span>
          <span aria-hidden="true" className="hidden h-1 w-1 rounded-full bg-cream/15 sm:inline-block" />
          <a
            href="https://wa.me/59899703585"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 transition-colors duration-300 hover:text-cream/70"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#25D366]/10 ring-1 ring-[#25D366]/25 transition-colors duration-300 group-hover:bg-[#25D366]/20">
              <SmallWhatsAppIcon className="h-2.5 w-2.5 text-[#25D366]" />
            </span>
            +598 99 703 585
          </a>
          <span aria-hidden="true" className="hidden h-1 w-1 rounded-full bg-cream/15 sm:inline-block" />
          <a
            href="https://www.simplemente.com.uy"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 transition-colors duration-300 hover:text-cream/70"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/[0.04] ring-1 ring-white/10 transition-colors duration-300 group-hover:bg-white/[0.08]">
              <GlobeIcon className="h-2.5 w-2.5" />
            </span>
            simplemente.com.uy
          </a>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.85 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function IgIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

function SmallWhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.85 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 3 2.5 15 0 18M12 3c-2.5 3-2.5 15 0 18" />
    </svg>
  );
}
