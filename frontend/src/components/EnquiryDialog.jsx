import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { toast } from "sonner";
import { Loader2, CheckCircle2 } from "lucide-react";
import { createEnquiry } from "../lib/api";

export default function EnquiryDialog({ open, onOpenChange, product }) {
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

  const reset = () => {
    setForm({ name: "", company: "", phone: "", email: "", requirement: "" });
    setDone(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      await createEnquiry({
        ...form,
        product_slug: product?.slug,
        product_name: product?.name,
        source: product ? "product_detail" : "website",
      });
      setDone(true);
      toast.success("Enquiry submitted! Our team will reach out within 24 hours.");
    } catch (err) {
      const msg = err?.response?.data?.detail || "Something went wrong. Please try again.";
      toast.error(typeof msg === "string" ? msg : "Please check the form and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = (v) => {
    onOpenChange(v);
    if (!v) setTimeout(reset, 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="sm:max-w-[540px] p-0 overflow-hidden bg-white border-slate-200"
        data-testid="enquiry-dialog"
      >
        {done ? (
          <div className="p-10 text-center" data-testid="enquiry-success">
            <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 className="w-9 h-9 text-emerald-600" strokeWidth={1.5} />
            </div>
            <h3 className="font-outfit text-2xl font-medium text-slate-900 mb-2">
              Enquiry Received
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed max-w-sm mx-auto">
              Thank you for reaching out. Our gifting consultants will get back to you within 24
              hours with a personalised proposal.
            </p>
            <button
              onClick={() => handleClose(false)}
              data-testid="enquiry-success-close"
              className="btn-primary mt-8"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="bg-slate-950 text-white px-8 pt-8 pb-6">
              <DialogHeader className="space-y-1 text-left">
                <div className="gx-overline !text-gold">Bulk Enquiry</div>
                <DialogTitle className="font-outfit text-2xl font-light text-white">
                  {product ? `Enquire about ${product.name}` : "Request a Custom Quote"}
                </DialogTitle>
                <DialogDescription className="text-slate-400 text-sm">
                  Share a few details and our team will craft a tailored proposal for your
                  business.
                </DialogDescription>
              </DialogHeader>
            </div>
            <form onSubmit={onSubmit} className="px-8 py-7 space-y-4" data-testid="enquiry-form">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="en-name" className="text-xs uppercase tracking-wider text-slate-500">
                    Name *
                  </Label>
                  <Input
                    id="en-name"
                    data-testid="enquiry-input-name"
                    required
                    minLength={1}
                    value={form.name}
                    onChange={update("name")}
                    placeholder="Your full name"
                    className="h-11"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="en-company" className="text-xs uppercase tracking-wider text-slate-500">
                    Company *
                  </Label>
                  <Input
                    id="en-company"
                    data-testid="enquiry-input-company"
                    required
                    value={form.company}
                    onChange={update("company")}
                    placeholder="Company name"
                    className="h-11"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="en-phone" className="text-xs uppercase tracking-wider text-slate-500">
                    Phone *
                  </Label>
                  <Input
                    id="en-phone"
                    data-testid="enquiry-input-phone"
                    required
                    value={form.phone}
                    onChange={update("phone")}
                    placeholder="+91 9XXXX XXXXX"
                    className="h-11"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="en-email" className="text-xs uppercase tracking-wider text-slate-500">
                    Email *
                  </Label>
                  <Input
                    id="en-email"
                    data-testid="enquiry-input-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={update("email")}
                    placeholder="work@company.com"
                    className="h-11"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="en-req" className="text-xs uppercase tracking-wider text-slate-500">
                  Your Requirement *
                </Label>
                <Textarea
                  id="en-req"
                  data-testid="enquiry-input-requirement"
                  required
                  minLength={5}
                  value={form.requirement}
                  onChange={update("requirement")}
                  placeholder="Quantity, occasion, budget, branding needs, delivery location..."
                  rows={4}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                data-testid="enquiry-submit-btn"
                className="btn-primary w-full disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
                  </>
                ) : (
                  "Submit Enquiry"
                )}
              </button>
              <p className="text-[11px] text-slate-400 text-center pt-1">
                By submitting, you agree to be contacted by GiftXpert regarding your enquiry.
              </p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
