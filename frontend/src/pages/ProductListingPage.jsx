import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronRight, ArrowRight } from "lucide-react";
import { fetchCategory, fetchProducts } from "../lib/api";

export default function ProductListingPage() {
  const { slug, sub } = useParams();
  const [cat, setCat] = useState(null);
  const [products, setProducts] = useState([]);
  const [activeSub, setActiveSub] = useState(sub || "all");

  useEffect(() => {
    fetchCategory(slug).then(setCat).catch(() => setCat(null));
  }, [slug]);

  useEffect(() => {
    const params = { category: slug };
    if (activeSub !== "all") params.subcategory = activeSub;
    fetchProducts(params).then(setProducts).catch(() => setProducts([]));
  }, [slug, activeSub]);

  useEffect(() => {
    if (sub) setActiveSub(sub);
  }, [sub]);

  if (!cat) return null;

  return (
    <div data-testid="product-listing-page">
      <section className="bg-[#FAFAFA] border-b border-slate-100">
        <div className="gx-container pt-12 md:pt-16 pb-10">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
            <Link to="/" className="hover:text-slate-900">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/categories" className="hover:text-slate-900">Categories</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to={`/category/${cat.slug}`} className="hover:text-slate-900">{cat.name}</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gold">Products</span>
          </div>
          <h1 className="font-outfit text-3xl md:text-4xl lg:text-5xl font-light tracking-tight leading-tight">
            {cat.name} <span className="italic">— Products</span>
          </h1>
          <p className="mt-3 max-w-xl text-slate-600">{cat.description}</p>

          <div className="flex flex-wrap gap-2 mt-8">
            <button
              onClick={() => setActiveSub("all")}
              data-testid="filter-all"
              className={`px-5 py-2 text-xs tracking-wider uppercase border transition-all ${
                activeSub === "all"
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-white text-slate-700 border-slate-200 hover:border-slate-900"
              }`}
            >
              All
            </button>
            {cat.subcategories?.map((s) => (
              <button
                key={s.slug}
                onClick={() => setActiveSub(s.slug)}
                data-testid={`filter-${s.slug}`}
                className={`px-5 py-2 text-xs tracking-wider uppercase border transition-all ${
                  activeSub === s.slug
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-white text-slate-700 border-slate-200 hover:border-slate-900"
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="gx-section !py-14">
        <div className="gx-container">
          {products.length === 0 ? (
            <div className="text-center py-24 text-slate-500" data-testid="no-products">
              No products found in this subcategory. Please check back soon.
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-7">
              {products.map((p) => (
                <Link
                  key={p.slug}
                  to={`/product/${p.slug}`}
                  data-testid={`product-card-${p.slug}`}
                  className="group"
                >
                  <div className="aspect-[4/5] bg-slate-100 overflow-hidden img-zoom relative">
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/10 transition-colors" />
                  </div>
                  <h3 className="font-outfit text-base md:text-lg font-medium text-slate-900 mt-4 group-hover:text-gold transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{p.short_description}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-700">{p.price_range}</span>
                    <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-semibold text-slate-900">
                      View <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
