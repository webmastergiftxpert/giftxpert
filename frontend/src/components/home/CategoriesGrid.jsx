import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// Fixed bento span mapping
const SPAN_MAP = {
  "employee-gifting": "md:col-span-8 md:row-span-2",
  "client-gifting": "md:col-span-4 md:row-span-2",
  "festive-gifting": "md:col-span-4",
  "promotional-gifts": "md:col-span-4",
  "welcome-kits": "md:col-span-4",
  "reward-recognition": "md:col-span-6",
  "sustainable-gifting": "md:col-span-6",
  "luxury-gifting": "md:col-span-6",
  "wellness-gifting": "md:col-span-6",
};

const TALL = ["employee-gifting", "client-gifting"];

export default function CategoriesGrid({ categories }) {
  return (
    <section className="gx-section bg-white" data-testid="categories-section">
      <div className="gx-container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-20">
          <div className="max-w-2xl">
            <div className="gx-overline mb-4">Explore Categories</div>
            <h2 className="font-outfit text-3xl md:text-4xl lg:text-5xl tracking-tight text-slate-900 font-light leading-[1.1]">
              Curated gifting for <span className="italic">every</span> corporate occasion.
            </h2>
          </div>
          <p className="text-slate-600 max-w-md leading-relaxed">
            From onboarding kits to luxury hampers — find the right gifting solution across nine
            thoughtfully built categories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5 auto-rows-[220px]">
          {categories.map((cat, i) => {
            const isTall = TALL.includes(cat.slug);
            return (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className={`${SPAN_MAP[cat.slug] || "md:col-span-4"} group relative`}
              >
                <Link
                  to={`/category/${cat.slug}`}
                  data-testid={`category-card-${cat.slug}`}
                  className="relative block w-full h-full overflow-hidden img-zoom bg-slate-100"
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-7">
                    <div className={`${isTall ? "max-w-md" : "max-w-full"}`}>
                      <div className="text-[10px] tracking-[0.2em] uppercase text-gold font-semibold mb-2">
                        0{i + 1}
                      </div>
                      <h3 className={`font-outfit text-white ${isTall ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"} font-medium leading-tight`}>
                        {cat.name}
                      </h3>
                      {isTall && (
                        <p className="text-slate-200 text-sm mt-3 leading-relaxed line-clamp-2">
                          {cat.description}
                        </p>
                      )}
                    </div>
                    <div className="absolute top-5 right-5 w-10 h-10 bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 transition-all duration-300 group-hover:bg-white group-hover:text-slate-900">
                      <ArrowUpRight className="w-4 h-4 text-white group-hover:text-slate-900 transition-colors" strokeWidth={1.75} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
