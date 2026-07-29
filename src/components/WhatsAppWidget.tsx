import { openWhatsAppSimple } from '../utils/whatsapp';

export function WhatsAppWidget() {
  return (
    <div className="fixed bottom-20 right-4 z-40 sm:bottom-6 sm:right-6">
      <button
        type="button"
        onClick={() => openWhatsAppSimple()}
        aria-label="Contactar por WhatsApp"
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgba(37,211,102,0.55)] transition-all duration-300 hover:scale-110 hover:shadow-[0_15px_40px_rgba(37,211,102,0.75)] active:scale-95 group"
      >
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping pointer-events-none" />
        <img
          src="/icon-whatsapp.svg"
          alt=""
          className="relative h-7 w-7 transition-transform duration-300 group-hover:rotate-12 brightness-0 invert"
        />
      </button>
    </div>
  );
}
