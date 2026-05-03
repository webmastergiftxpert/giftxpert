import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CTA({ onEnquire }) {
  return (
    <section className="relative gx-section bg-slate-950 text-white overflow-hidden" data-testid="cta-section">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 -left-20 w-96 h-96 rounded-full bg-gold/20 blur-3xl" />
        <div className="absolute bottom-0 -right-20 w-96 h-96 rounded-full bg-slate-700/40 blur-3xl" />
      </div>
      <div className="gx-container relative">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="gx-overline !text-gold mb-5">Bulk Orders</div>
            <h2 className="font-outfit text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05] tracking-tight">
              Looking for bulk orders? <br />
              <span className="italic text-gold">Let's craft something memorable.</span>
            </h2>
            <p className="mt-7 text-slate-300 leading-relaxed max-w-xl">
              Tell us about your brief — budget, quantity, occasion and branding needs — and our
              team will respond within 24 hours with a curated proposal.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <button
                onClick={onEnquire}
                className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 px-7 py-3.5 text-sm font-medium tracking-wide transition-all duration-300 hover:bg-gold hover:text-white active:scale-[0.98]"
                data-testid="cta-get-quote-btn"
              >
                Get a Custom Quote
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="https://wa.me/917296976875?text=Hi%20GiftXpert%2C%20I%27d%20like%20a%20bulk%20quote"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-white/30 px-7 py-3.5 text-sm font-medium tracking-wide transition-all hover:bg-white/10"
                data-testid="cta-whatsapp-btn"
              >
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
