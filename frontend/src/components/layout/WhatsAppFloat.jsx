import React from "react";
import { MessageCircle } from "lucide-react";
import { CONTACT } from "../../lib/api";

export default function WhatsAppFloat() {
  const href = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    "Hi GiftXpert, I'd like to enquire about corporate gifting."
  )}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      data-testid="whatsapp-float-btn"
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 group"
      aria-label="Chat on WhatsApp"
    >
      <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-20" />
      <div className="relative bg-emerald-500 hover:bg-emerald-600 text-white w-14 h-14 md:w-16 md:h-16 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110">
        <MessageCircle className="w-7 h-7 md:w-8 md:h-8" strokeWidth={1.75} />
      </div>
      <span className="pointer-events-none absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs px-3 py-1.5 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
        Chat on WhatsApp
      </span>
    </a>
  );
}
