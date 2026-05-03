import React, { useState, useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "sonner";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import EnquiryDialog from "@/components/EnquiryDialog";

import HomePage from "@/pages/HomePage";
import CategoriesPage from "@/pages/CategoriesPage";
import CategoryPage from "@/pages/CategoryPage";
import ProductListingPage from "@/pages/ProductListingPage";
import ProductDetailPage from "@/pages/ProductDetailPage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

function Shell() {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [enquiryProduct, setEnquiryProduct] = useState(null);

  const openEnquiry = (product = null) => {
    setEnquiryProduct(product || null);
    setEnquiryOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header onEnquire={() => openEnquiry()} />
      <ScrollToTop />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage onEnquire={() => openEnquiry()} />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/category/:slug/products" element={<ProductListingPage />} />
          <Route path="/category/:slug/:sub" element={<ProductListingPage />} />
          <Route path="/product/:slug" element={<ProductDetailPage onEnquire={openEnquiry} />} />
          <Route path="/about" element={<AboutPage onEnquire={() => openEnquiry()} />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={
            <div className="gx-container py-32 text-center" data-testid="not-found">
              <h1 className="font-outfit text-5xl font-light">404</h1>
              <p className="text-slate-600 mt-3">Page not found.</p>
            </div>
          } />
        </Routes>
      </main>
      <Footer />
      <WhatsAppFloat />
      <EnquiryDialog open={enquiryOpen} onOpenChange={setEnquiryOpen} product={enquiryProduct} />
      <Toaster position="top-right" richColors closeButton />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  );
}
