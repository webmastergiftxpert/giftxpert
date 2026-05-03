import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { fetchCategories } from "../lib/api";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetchCategories().then(setCategories).catch(() => setCategories([]));
  }, []);

  return (
    <div data-testid="categories-page">
      <section className="mesh-bg">
        <div className="gx-container pt-16 md:pt-24 pb-10">
          <div className="gx-overline mb-4">All Categories</div>
          <h1 className="font-outfit text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-slate-900 leading-[1.05]">
            Corporate gifting, <br />
            <span className="italic">reimagined</span> across <span className="text-gold">9</span> categories.
          </h1>
          <p className="mt-6 max-w-2xl text-slate-600 leading-relaxed">
            Browse through nine curated verticals built for HR, admin and marketing teams looking
            for bulk, branded, premium gifting.
          </p>
        </div>
      </section>

      <section className="gx-section !pt-10">
        <div className="gx-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 6) * 0.05 }}
            >
              <Link
                to={`/category/${cat.slug}`}
                data-testid={`categories-page-card-${cat.slug}`}
                className="group block relative aspect-[4/5] overflow-hidden img-zoom bg-slate-100"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />
                <div className="absolute inset-0 p-7 flex flex-col justify-end">
                  <div className="text-[10px] tracking-[0.2em] uppercase text-gold font-semibold mb-2">
                    0{i + 1}
                  </div>
                  <h3 className="font-outfit text-2xl text-white font-medium leading-tight">
                    {cat.name}
                  </h3>
                  <p className="text-slate-300 text-sm mt-2 line-clamp-2">{cat.description}</p>
                </div>
                <div className="absolute top-5 right-5 w-10 h-10 bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 group-hover:bg-white transition-all">
                  <ArrowUpRight className="w-4 h-4 text-white group-hover:text-slate-900 transition-colors" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
