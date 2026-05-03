import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, ArrowRight } from "lucide-react";
import { fetchCategory, fetchProducts } from "../lib/api";

export default function CategoryPage() {
  const { slug } = useParams();
  const [cat, setCat] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchCategory(slug), fetchProducts({ category: slug, limit: 12 })])
      .then(([c, p]) => {
        setCat(c);
        setProducts(p);
      })
      .catch(() => setCat(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="gx-container py-32 text-center text-slate-500" data-testid="category-loading">
        Loading...
      </div>
    );
  }
  if (!cat) {
    return (
      <div className="gx-container py-32 text-center" data-testid="category-not-found">
        <h2 className="font-outfit text-3xl">Category not found</h2>
        <Link to="/categories" className="btn-primary mt-6 inline-flex">Back to Categories</Link>
      </div>
    );
  }

  return (
    <div data-testid="category-page">
      {/* Banner */}
      <section className="relative h-[360px] md:h-[440px] overflow-hidden">
        <img src={cat.image} alt={cat.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/50 to-slate-950/30" />
        <div className="absolute inset-0 flex items-end">
          <div className="gx-container pb-12 md:pb-16 w-full">
            <div className="flex items-center gap-2 text-xs text-slate-300 mb-4">
              <Link to="/" className="hover:text-white">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link to="/categories" className="hover:text-white">Categories</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-gold">{cat.name}</span>
            </div>
            <h1 className="font-outfit text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight leading-[1.05] max-w-3xl">
              {cat.name}
            </h1>
            <p className="mt-4 max-w-2xl text-slate-300 leading-relaxed">{cat.description}</p>
          </div>
        </div>
      </section>

      {/* Subcategories */}
      <section className="gx-section !py-16 md:!py-20 bg-[#FAFAFA]">
        <div className="gx-container">
          <div className="gx-overline mb-3">Subcategories</div>
          <h2 className="font-outfit text-2xl md:text-3xl font-light mb-10">
            Explore by type
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {cat.subcategories?.map((sub, i) => (
              <motion.div
                key={sub.slug}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <Link
                  to={`/category/${cat.slug}/${sub.slug}`}
                  data-testid={`subcategory-card-${sub.slug}`}
                  className="group block bg-white border border-slate-200 overflow-hidden hover:border-slate-900 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
                >
                  {sub.image && (
                    <div className="aspect-[4/3] bg-slate-100 overflow-hidden">
                      <img
                        src={sub.image}
                        alt={sub.name}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="text-[10px] tracking-[0.2em] uppercase text-gold font-semibold mb-2">
                      0{i + 1}
                    </div>
                    <h3 className="font-outfit text-lg font-medium text-slate-900">
                      {sub.name}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-2">{sub.description}</p>
                    <div className="mt-4 inline-flex items-center gap-1.5 text-xs tracking-[0.15em] uppercase font-semibold text-slate-900">
                      Explore <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products preview */}
      {products.length > 0 && (
        <section className="gx-section !py-16 md:!py-20">
          <div className="gx-container">
            <div className="flex items-end justify-between mb-10 gap-4 flex-wrap">
              <div>
                <div className="gx-overline mb-3">Products in {cat.name}</div>
                <h2 className="font-outfit text-2xl md:text-3xl font-light">
                  Featured gifts
                </h2>
              </div>
              <Link
                to={`/category/${cat.slug}/products`}
                data-testid="category-view-all-products"
                className="text-xs tracking-[0.15em] uppercase font-semibold link-underline"
              >
                View all products →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {products.slice(0, 8).map((p) => (
                <Link
                  key={p.slug}
                  to={`/product/${p.slug}`}
                  data-testid={`category-product-${p.slug}`}
                  className="group"
                >
                  <div className="aspect-[4/5] bg-slate-100 overflow-hidden img-zoom">
                    <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <h3 className="font-outfit text-base font-medium text-slate-900 mt-4 group-hover:text-gold transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">{p.price_range}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
