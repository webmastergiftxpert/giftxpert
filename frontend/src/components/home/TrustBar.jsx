import React from "react";
import Marquee from "react-fast-marquee";
import { Package, Sparkles, Truck, Gem, Award, Leaf } from "lucide-react";

const items = [
  { icon: Package, label: "Bulk Orders" },
  { icon: Sparkles, label: "Custom Branding" },
  { icon: Truck, label: "Pan India Delivery" },
  { icon: Gem, label: "Premium Quality" },
  { icon: Award, label: "Dedicated Account Manager" },
  { icon: Leaf, label: "Sustainable Options" },
];

export default function TrustBar() {
  return (
    <section className="bg-[#FAFAFA] border-y border-slate-100 py-10" data-testid="trust-section">
      <div className="gx-container text-center mb-6">
        <div className="gx-overline">Why teams choose us</div>
      </div>
      <Marquee gradient={false} speed={40} pauseOnHover>
        {[...items, ...items].map((it, i) => (
          <div key={i} className="marquee-item">
            <it.icon className="w-4 h-4 text-gold" strokeWidth={1.75} />
            <span className="font-outfit text-base text-slate-700">{it.label}</span>
            <span className="text-slate-300 ml-12">·</span>
          </div>
        ))}
      </Marquee>
    </section>
  );
}
