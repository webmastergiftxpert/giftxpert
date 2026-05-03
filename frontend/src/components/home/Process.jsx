import React from "react";
import { motion } from "framer-motion";

const steps = [
  {
    n: "01",
    title: "Requirement Understanding",
    desc: "We start with your goals, audience, budget and occasion — shaping a brief tailored to your brand.",
  },
  {
    n: "02",
    title: "Product Sourcing",
    desc: "From 10,000+ curated products, we shortlist options that match your aesthetic and budget.",
  },
  {
    n: "03",
    title: "Customization & Branding",
    desc: "Logo printing, embossing, custom notes, packaging — every detail tailored to your identity.",
  },
  {
    n: "04",
    title: "Packaging",
    desc: "Premium, brand-consistent packaging that makes every unbox feel like an occasion.",
  },
  {
    n: "05",
    title: "Delivery",
    desc: "Pan-India logistics, bulk shipping, and individual-address fulfilment — fully managed.",
  },
];

export default function Process() {
  return (
    <section className="gx-section bg-white" data-testid="process-section">
      <div className="gx-container">
        <div className="max-w-2xl mb-14 md:mb-20">
          <div className="gx-overline mb-4">Our Process</div>
          <h2 className="font-outfit text-3xl md:text-4xl lg:text-5xl font-light text-slate-900 leading-[1.1] tracking-tight">
            Five steps from <br />
            <span className="italic">brief</span> to <span className="text-gold">beautifully delivered.</span>
          </h2>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-[70px] left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative"
                data-testid={`process-step-${i}`}
              >
                <div className="relative z-10 w-14 h-14 mb-6 bg-white border border-slate-300 flex items-center justify-center font-outfit text-lg text-slate-900">
                  {s.n}
                </div>
                <h3 className="font-outfit text-lg font-medium text-slate-900 mb-2 leading-snug">
                  {s.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
