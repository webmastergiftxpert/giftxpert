import React, { useEffect, useState } from "react";
import Hero from "../components/home/Hero";
import TrustBar from "../components/home/TrustBar";
import CategoriesGrid from "../components/home/CategoriesGrid";
import WhyGifting from "../components/home/WhyGifting";
import Process from "../components/home/Process";
import CTA from "../components/home/CTA";
import { fetchCategories } from "../lib/api";

export default function HomePage({ onEnquire }) {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetchCategories().then(setCategories).catch(() => setCategories([]));
  }, []);

  return (
    <div data-testid="home-page">
      <Hero onEnquire={onEnquire} />
      <TrustBar />
      <CategoriesGrid categories={categories} />
      <WhyGifting />
      <Process />
      <CTA onEnquire={onEnquire} />
    </div>
  );
}
