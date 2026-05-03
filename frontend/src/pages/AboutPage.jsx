import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Award, Package, Users, Globe } from "lucide-react";

export default function AboutPage({ onEnquire }) {
  return (
    <div data-testid="about-page">
      <section className="mesh-bg">
        <div className="gx-container pt-16 md:pt-24 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="gx-overline mb-4">About GiftXpert</div>
              <h1 className="font-outfit text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.05] text-slate-900">
                We craft corporate gifting <span className="italic">worth</span> <span className="text-gold">remembering.</span>
              </h1>
              <p className="mt-6 text-slate-600 leading-relaxed max-w-xl">
                GiftXpert is a modern corporate gifting solutions company dedicated to helping
                businesses create meaningful and lasting impressions through thoughtfully curated
                gifting experiences. From celebrating employees and onboarding new hires to
                delighting clients and elevating brand presence at events — we bring it all to life
                with precision and polish.
              </p>
            </div>
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                className="aspect-square overflow-hidden"
              >
                <img
                  src="https://images.unsplash.com/photo-1773450970959-cef81e9b1053?auto=format&fit=crop&w=1000&q=80"
                  alt="About"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="gx-section">
        <div className="gx-container grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="gx-overline mb-3">Our Mission</div>
            <h2 className="font-outfit text-3xl md:text-4xl font-light mb-5">
              To make every corporate gift <span className="italic text-gold">feel personal.</span>
            </h2>
            <p className="text-slate-600 leading-relaxed">
              We believe gifting is one of the most powerful tools businesses have to show
              appreciation. Our mission is to build meaningful gifting experiences that strengthen
              relationships between companies and the people who matter most — their employees,
              clients, and partners.
            </p>
          </div>
          <div>
            <div className="gx-overline mb-3">Our Approach</div>
            <h2 className="font-outfit text-3xl md:text-4xl font-light mb-5">
              Bespoke, at <span className="italic">scale.</span>
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Whether you need 25 welcome kits or 5,000 festive hampers — our process blends design
              thinking with logistics precision. We handle sourcing, customization, branding,
              packaging, and pan-India delivery — so your team can focus on what matters.
            </p>
          </div>
        </div>
      </section>

      <section className="gx-section !pt-0">
        <div className="gx-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Users, stat: "350+", label: "Corporate Clients" },
              { icon: Package, stat: "10K+", label: "Gifts Delivered" },
              { icon: Globe, stat: "28", label: "States Covered" },
              { icon: Award, stat: "99%", label: "Satisfaction Rate" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="border border-slate-200 p-7 bg-white"
                data-testid={`about-stat-${i}`}
              >
                <s.icon className="w-5 h-5 text-gold mb-4" strokeWidth={1.75} />
                <div className="font-outfit text-3xl md:text-4xl font-light text-slate-900">{s.stat}</div>
                <div className="text-xs uppercase tracking-wider text-slate-500 mt-2">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="gx-section !pt-0">
        <div className="gx-container">
          <div className="bg-slate-950 text-white p-10 md:p-16">
            <div className="gx-overline !text-gold mb-4">Values</div>
            <h2 className="font-outfit text-3xl md:text-4xl font-light mb-10 max-w-2xl">
              The principles that guide <span className="italic text-gold">every box we ship.</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                { t: "Thoughtful by design", d: "Every item is chosen with intention — because a box should feel considered, not assembled." },
                { t: "Uncompromising quality", d: "Premium products, premium packaging, premium experience — no shortcuts." },
                { t: "Built to scale", d: "From 25 units to 5,000 — our systems scale while the quality stays the same." },
              ].map((v) => (
                <div key={v.t}>
                  <div className="w-10 h-[2px] bg-gold mb-5" />
                  <h3 className="font-outfit text-xl font-medium mb-3">{v.t}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{v.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="gx-section !pt-0">
        <div className="gx-container text-center">
          <h2 className="font-outfit text-3xl md:text-4xl font-light mb-6">
            Ready to craft your next gift story?
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={onEnquire} className="btn-primary" data-testid="about-enquire-btn">
              Request a Quote
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link to="/categories" className="btn-secondary">Browse Categories</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
