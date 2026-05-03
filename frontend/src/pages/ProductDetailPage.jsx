import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, Check, Package, Palette, FileText, IndianRupee } from "lucide-react";
import { fetchProduct, fetchProducts } from "../lib/api";

export default function ProductDetailPage({ onEnquire }) {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [activeImg, setActiveImg] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setActiveImg(0);
    fetchProduct(slug)
      .then((p) => {
        setProduct(p);
        fetchProducts({ category: p.category_slug, limit: 8 })
          .then((r) => setRelated(r.filter((x) => x.slug !== p.slug).slice(0, 4)))
          .catch(() => {});
      })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return <div className="gx-container py-32 text-center text-slate-500" data-testid="product-loading">Loading...</div>;
  }
  if (!product) {
    return (
      <div className="gx-container py-32 text-center" data-testid="product-not-found">
        <h2 className="font-outfit text-3xl">Product not found</h2>
        <Link to="/categories" className="btn-primary mt-6 inline-flex">Back to Categories</Link>
      </div>
    );
  }

  const images = product.images && product.images.length > 0 ? product.images : [];

  return (
    <div data-testid="product-detail-page">
      <div className="gx-container pt-8 md:pt-12">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link to="/" className="hover:text-slate-900">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to={`/category/${product.category_slug}`} className="hover:text-slate-900 capitalize">
            {product.category_slug.replace(/-/g, " ")}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gold">{product.name}</span>
        </div>
      </div>

      <section className="gx-container pb-16 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Gallery */}
          <div>
            <motion.div
              key={activeImg}
              initial={{ opacity: 0.6 }}
              animate={{ opacity: 1 }}
              className="aspect-square bg-slate-100 overflow-hidden"
              data-testid="product-main-image"
            >
              {images[activeImg] && (
                <img src={images[activeImg]} alt={product.name} className="w-full h-full object-cover" />
              )}
            </motion.div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3 mt-4">
                {images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    data-testid={`thumb-${i}`}
                    className={`aspect-square bg-slate-100 overflow-hidden border-2 transition-all ${
                      i === activeImg ? "border-slate-900" : "border-transparent hover:border-slate-400"
                    }`}
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="lg:pt-6">
            <div className="gx-overline mb-3 capitalize">
              {product.category_slug.replace(/-/g, " ")}
            </div>
            <h1 className="font-outfit text-3xl md:text-4xl lg:text-5xl font-light text-slate-900 leading-[1.1] tracking-tight">
              {product.name}
            </h1>
            <p className="mt-5 text-slate-600 leading-relaxed">{product.description}</p>

            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="border border-slate-200 p-4">
                <div className="flex items-center gap-2 text-slate-500 mb-1.5">
                  <IndianRupee className="w-4 h-4" />
                  <span className="text-[10px] tracking-wider uppercase font-semibold">Price Range</span>
                </div>
                <div className="font-outfit text-lg font-medium text-slate-900">{product.price_range}</div>
                <div className="text-[10px] text-slate-400 mt-1">*per unit, varies with customization</div>
              </div>
              <div className="border border-slate-200 p-4">
                <div className="flex items-center gap-2 text-slate-500 mb-1.5">
                  <Package className="w-4 h-4" />
                  <span className="text-[10px] tracking-wider uppercase font-semibold">MOQ</span>
                </div>
                <div className="font-outfit text-lg font-medium text-slate-900">{product.moq}</div>
                <div className="text-[10px] text-slate-400 mt-1">Minimum order quantity</div>
              </div>
            </div>

            {product.features?.length > 0 && (
              <div className="mt-8">
                <div className="gx-overline mb-3 flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5" /> Features
                </div>
                <ul className="space-y-2">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-slate-700">
                      <Check className="w-4 h-4 text-gold mt-0.5 shrink-0" strokeWidth={2} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {product.customization && (
              <div className="mt-6 bg-slate-50 border-l-2 border-gold p-5">
                <div className="gx-overline mb-2 flex items-center gap-2 !text-gold">
                  <Palette className="w-3.5 h-3.5" /> Customization
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">{product.customization}</p>
              </div>
            )}

            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => onEnquire?.(product)}
                data-testid="product-enquire-btn"
                className="btn-primary flex-1"
              >
                Enquire Now
              </button>
              <a
                href={`https://wa.me/917296976875?text=${encodeURIComponent(
                  `Hi GiftXpert, I'm interested in "${product.name}". Please share more details.`
                )}`}
                target="_blank"
                rel="noreferrer"
                data-testid="product-whatsapp-btn"
                className="btn-secondary flex-1 !border-emerald-500 !text-emerald-600 hover:!bg-emerald-50"
              >
                Chat on WhatsApp
              </a>
            </div>

            {product.specifications?.length > 0 && (
              <div className="mt-10 border-t border-slate-200 pt-6">
                <div className="gx-overline mb-3">Specifications</div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-600">
                  {product.specifications.map((s) => (
                    <li key={s} className="flex items-start gap-2">
                      <span className="text-gold mt-0.5">·</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="gx-section !py-16 bg-[#FAFAFA]">
          <div className="gx-container">
            <h2 className="font-outfit text-2xl md:text-3xl font-light mb-8">You may also like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  to={`/product/${p.slug}`}
                  data-testid={`related-product-${p.slug}`}
                  className="group"
                >
                  <div className="aspect-[4/5] bg-white overflow-hidden img-zoom">
                    <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-outfit text-base font-medium mt-4 group-hover:text-gold transition-colors">
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
