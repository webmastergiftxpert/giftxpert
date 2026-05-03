import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import { CONTACT } from "../../lib/api";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 mt-0" data-testid="site-footer">
      <div className="gx-container py-16 md:py-20 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-white flex items-center justify-center">
              <span className="font-outfit font-semibold text-lg text-slate-900">G</span>
            </div>
            <div>
              <div className="font-outfit text-xl font-semibold text-white">
                Gift<span className="text-gold">Xpert</span>
              </div>
              <div className="text-[10px] tracking-[0.2em] uppercase text-slate-500">
                Corporate Gifting
              </div>
            </div>
          </div>
          <p className="text-sm leading-relaxed max-w-md text-slate-400">
            Simplifying corporate gifting for modern businesses. End-to-end bulk gifting solutions
            with premium customization, branding, and pan-India delivery.
          </p>
          <div className="mt-8 space-y-3 text-sm">
            <div className="flex items-start gap-3 text-slate-400">
              <MapPin className="w-4 h-4 mt-0.5 text-gold shrink-0" />
              <span>{CONTACT.address}</span>
            </div>
            <div className="flex items-center gap-3 text-slate-400">
              <Phone className="w-4 h-4 text-gold shrink-0" />
              <a href={`tel:${CONTACT.phoneRaw}`} className="hover:text-white">
                {CONTACT.phone}
              </a>
            </div>
            <div className="flex items-center gap-3 text-slate-400">
              <Mail className="w-4 h-4 text-gold shrink-0" />
              <a href={`mailto:${CONTACT.email}`} className="hover:text-white">
                {CONTACT.email}
              </a>
            </div>
          </div>
        </div>

        <div>
          <div className="gx-overline !text-slate-400 mb-4">Explore</div>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link to="/categories" className="hover:text-white transition-colors">Categories</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <div className="gx-overline !text-slate-400 mb-4">Top Categories</div>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/category/employee-gifting" className="hover:text-white transition-colors">Employee Gifting</Link></li>
            <li><Link to="/category/client-gifting" className="hover:text-white transition-colors">Client Gifting</Link></li>
            <li><Link to="/category/luxury-gifting" className="hover:text-white transition-colors">Luxury Gifting</Link></li>
            <li><Link to="/category/sustainable-gifting" className="hover:text-white transition-colors">Sustainable Gifting</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800/80">
        <div className="gx-container py-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-slate-500">
          <div>© {new Date().getFullYear()} GiftXpert. All rights reserved.</div>
          <div className="flex items-center gap-2">
            <span>Crafted for teams that care about first impressions.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
