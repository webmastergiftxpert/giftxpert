import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

const HERO_POSTER = "/videos/giftxpert-hero-poster.jpg";
const HERO_VIDEO = "/videos/giftxpert-hero.mp4";

export default function Hero({ onEnquire }) {
  const videoRef = useRef(null);

  return (
    <section className="relative overflow-hidden mesh-bg pt-16 md:pt-20" data-testid="hero-section">
      <div className="gx-container grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 py-16 md:py-24 lg:py-28 items-center">
        {/* LEFT — copy */}
        <div className="lg:col-span-6 xl:col-span-7 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 bg-white/60 backdrop-blur-sm mb-8"
            data-testid="hero-badge"
          >
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span className="text-xs tracking-[0.2em] uppercase font-semibold text-slate-700">
              Trusted by 350+ Corporate Clients
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-outfit text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] tracking-tight font-light text-slate-900"
            data-testid="hero-headline"
          >
            Simplifying
            <br />
            <span className="italic font-outfit">Corporate Gifting</span>
            <br />
            for <span className="text-gold">Modern</span> Businesses
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 text-lg leading-relaxed text-slate-600 max-w-xl"
            data-testid="hero-subheadline"
          >
            End-to-end bulk gifting solutions with premium customization, branding, and pan-India
            delivery — crafted for HR, marketing and admin teams.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-10 flex flex-col sm:flex-row gap-3"
          >
            <Link to="/categories" className="btn-primary group" data-testid="hero-explore-btn">
              Explore Categories
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <button
              onClick={onEnquire}
              className="btn-secondary"
              data-testid="hero-request-quote-btn"
            >
              Request a Quote
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-14 flex items-center gap-8"
          >
            <div>
              <div className="font-outfit text-3xl font-light text-slate-900">350+</div>
              <div className="text-xs tracking-wider uppercase text-slate-500 mt-1">
                Corporate Clients
              </div>
            </div>
            <div className="w-px h-10 bg-slate-200" />
            <div>
              <div className="font-outfit text-3xl font-light text-slate-900">28</div>
              <div className="text-xs tracking-wider uppercase text-slate-500 mt-1">
                States Delivered
              </div>
            </div>
            <div className="w-px h-10 bg-slate-200" />
            <div>
              <div className="font-outfit text-3xl font-light text-slate-900">10K+</div>
              <div className="text-xs tracking-wider uppercase text-slate-500 mt-1">
                Gifts Curated
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT — video hero */}
        <div className="lg:col-span-6 xl:col-span-5 relative">
          <div className="relative aspect-[4/5] w-full max-w-xl mx-auto">
            <div className="absolute inset-0 overflow-hidden bg-slate-100">
              <video
                ref={videoRef}
                src={HERO_VIDEO}
                poster={HERO_POSTER}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="w-full h-full object-cover"
                data-testid="hero-video"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/15 via-transparent to-transparent pointer-events-none" />
            </div>
            <div className="absolute inset-0 ring-1 ring-slate-200/60 pointer-events-none" />
            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, y: 20, x: -20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="absolute -bottom-6 -left-4 md:-left-10 bg-white border border-slate-200 shadow-xl p-5 max-w-[240px]"
            >
              <div className="gx-overline text-gold">Bespoke</div>
              <div className="mt-2 font-outfit text-lg font-medium text-slate-900 leading-tight">
                Custom branded packaging for every box
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -20, x: 20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ duration: 0.7, delay: 1 }}
              className="hidden md:block absolute -top-6 -right-6 bg-slate-950 text-white p-5 max-w-[200px]"
            >
              <div className="gx-overline !text-gold">Delivered</div>
              <div className="mt-2 font-outfit text-base font-medium leading-tight">
                Pan-India logistics in 3–7 days
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
