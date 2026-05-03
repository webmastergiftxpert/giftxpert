import React from "react";
import { motion } from "framer-motion";
import { Heart, TrendingUp, Eye, Users } from "lucide-react";

const benefits = [
  {
    icon: Heart,
    title: "Builds lasting relationships",
    desc: "Thoughtful gifts create emotional bridges with clients, partners and employees that spreadsheets simply can't.",
  },
  {
    icon: TrendingUp,
    title: "Boosts employee morale",
    desc: "Recognition through meaningful gifting lifts motivation, belonging and performance across teams.",
  },
  {
    icon: Eye,
    title: "Improves brand recall",
    desc: "A beautifully branded box delivered at the right moment keeps your identity front-of-mind long after the moment.",
  },
  {
    icon: Users,
    title: "Strengthens client loyalty",
    desc: "Timely, personalised gifting signals care — turning one-time customers into long-term advocates.",
  },
];

export default function WhyGifting() {
  return (
    <section className="gx-section bg-[#FAFAFA]" data-testid="why-section">
      <div className="gx-container grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="gx-overline mb-4">Why Corporate Gifting</div>
          <h2 className="font-outfit text-3xl md:text-4xl lg:text-5xl font-light text-slate-900 leading-[1.1] tracking-tight">
            More than a gift. <br /><span className="italic text-gold">A strategic gesture.</span>
          </h2>
          <p className="mt-6 text-slate-600 leading-relaxed">
            When done right, corporate gifting becomes one of the most effective tools for
            retention, appreciation and brand-building. We help modern businesses get it right at
            scale.
          </p>
        </div>
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white border border-slate-200 p-7 hover:border-slate-400 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              data-testid={`why-benefit-${i}`}
            >
              <div className="w-10 h-10 bg-slate-900 flex items-center justify-center mb-5">
                <b.icon className="w-5 h-5 text-gold" strokeWidth={1.75} />
              </div>
              <h3 className="font-outfit text-lg font-medium text-slate-900 mb-2">{b.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
