import React, { useState } from "react";
import { Phone, Mail, MapPin, Loader2, CheckCircle2 } from "lucide-react";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { toast } from "sonner";
import { createEnquiry, CONTACT } from "../lib/api";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    requirement: "",
  });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const update = (k) => (e) => setForm((s) => ({ ...s, [k]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createEnquiry({ ...form, source: "contact_page" });
      setDone(true);
      setForm({ name: "", company: "", phone: "", email: "", requirement: "" });
      toast.success("Thank you! We'll be in touch within 24 hours.");
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-testid="contact-page">
      <section className="mesh-bg">
        <div className="gx-container pt-16 md:pt-24 pb-10">
          <div className="gx-overline mb-4">Contact</div>
          <h1 className="font-outfit text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.05]">
            Let's build something <br />
            <span className="italic text-gold">memorable</span> together.
          </h1>
          <p className="mt-5 max-w-xl text-slate-600 leading-relaxed">
            Share your brief — our gifting consultants will respond within 24 hours with a
            personalised proposal.
          </p>
        </div>
      </section>

      <section className="gx-section !pt-12">
        <div className="gx-container grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* FORM */}
          <div className="lg:col-span-7">
            {done ? (
              <div className="bg-white border border-slate-200 p-10 text-center" data-testid="contact-success">
                <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 className="w-9 h-9 text-emerald-600" strokeWidth={1.5} />
                </div>
                <h3 className="font-outfit text-2xl">Message received</h3>
                <p className="text-slate-600 mt-3 max-w-md mx-auto">
                  Thanks for reaching out. Our team will get in touch with you within 24 hours.
                </p>
                <button
                  onClick={() => setDone(false)}
                  data-testid="contact-send-another"
                  className="btn-secondary mt-6"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-5" data-testid="contact-form">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-wider text-slate-500" htmlFor="c-name">Name *</Label>
                    <Input id="c-name" data-testid="contact-name" required value={form.name} onChange={update("name")} className="h-12" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-wider text-slate-500" htmlFor="c-company">Company *</Label>
                    <Input id="c-company" data-testid="contact-company" required value={form.company} onChange={update("company")} className="h-12" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-wider text-slate-500" htmlFor="c-email">Email *</Label>
                    <Input id="c-email" data-testid="contact-email" type="email" required value={form.email} onChange={update("email")} className="h-12" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-wider text-slate-500" htmlFor="c-phone">Phone *</Label>
                    <Input id="c-phone" data-testid="contact-phone" required value={form.phone} onChange={update("phone")} className="h-12" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-wider text-slate-500" htmlFor="c-req">Your Requirement *</Label>
                  <Textarea id="c-req" data-testid="contact-requirement" required minLength={5} rows={5} value={form.requirement} onChange={update("requirement")} placeholder="Occasion, quantity, budget, branding preferences..." />
                </div>
                <button type="submit" disabled={loading} className="btn-primary" data-testid="contact-submit-btn">
                  {loading ? (<><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>) : "Send Message"}
                </button>
              </form>
            )}
          </div>

          {/* Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-slate-950 text-white p-8">
              <div className="gx-overline !text-gold mb-5">Reach Us</div>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-white/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-gold" strokeWidth={1.75} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-slate-400 mb-1">Address</div>
                    <div className="text-sm leading-relaxed">{CONTACT.address}</div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-white/10 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-gold" strokeWidth={1.75} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-slate-400 mb-1">Phone</div>
                    <a href={`tel:${CONTACT.phoneRaw}`} className="text-sm hover:text-gold" data-testid="contact-phone-link">
                      {CONTACT.phone}
                    </a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-white/10 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-gold" strokeWidth={1.75} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-slate-400 mb-1">Email</div>
                    <a href={`mailto:${CONTACT.email}`} className="text-sm hover:text-gold" data-testid="contact-email-link">
                      {CONTACT.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="aspect-[4/3] bg-slate-100 overflow-hidden border border-slate-200" data-testid="contact-map">
              <iframe
                title="GiftXpert Location"
                src="https://www.google.com/maps?q=Enkay+Tower,+Udyog+Vihar,+Phase+V,+Gurugram&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
