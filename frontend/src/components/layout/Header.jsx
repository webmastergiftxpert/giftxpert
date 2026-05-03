import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/categories", label: "Categories" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Header({ onEnquire }) {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="glass-header sticky top-0 z-50" data-testid="site-header">
      <div className="gx-container flex items-center justify-between py-4 md:py-5">
        <Link to="/" className="flex items-center gap-2 group" data-testid="logo-link">
          <div className="w-9 h-9 bg-slate-900 flex items-center justify-center">
            <span className="text-white font-outfit font-semibold text-lg">G</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-outfit text-lg font-semibold text-slate-900">
              Gift<span className="text-gold">Xpert</span>
            </span>
            <span className="text-[10px] tracking-[0.2em] uppercase text-slate-400">
              Corporate Gifting
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              data-testid={`nav-${n.label.toLowerCase()}`}
              className={({ isActive }) =>
                `text-sm font-medium tracking-wide link-underline transition-colors ${
                  isActive ? "text-slate-900" : "text-slate-600 hover:text-slate-900"
                }`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={onEnquire}
            data-testid="header-request-quote-btn"
            className="btn-primary !px-6 !py-3 text-xs uppercase tracking-[0.15em]"
          >
            Request a Quote
          </button>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-slate-900 p-2"
          data-testid="mobile-menu-toggle"
          aria-label="toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-slate-100 bg-white" data-testid="mobile-menu">
          <div className="gx-container py-4 flex flex-col gap-1">
            {nav.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                data-testid={`mobile-nav-${n.label.toLowerCase()}`}
                className={({ isActive }) =>
                  `py-3 text-sm font-medium ${isActive ? "text-slate-900" : "text-slate-600"}`
                }
              >
                {n.label}
              </NavLink>
            ))}
            <button
              onClick={() => {
                setOpen(false);
                onEnquire?.();
              }}
              data-testid="mobile-request-quote-btn"
              className="btn-primary mt-2"
            >
              Request a Quote
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
