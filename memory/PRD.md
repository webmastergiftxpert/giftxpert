# GiftXpert — B2B Corporate Gifting Website

## Problem Statement
Build a modern, premium corporate website for "GiftXpert" — a B2B corporate gifting lead-generation business (NOT e-commerce). No cart/checkout. Focus on enquiries. Target: HR, Admin, Marketing teams, corporate decision makers.

## Architecture
- **Stack**: React 19 (CRA + Craco) + FastAPI + MongoDB
- **Design**: Premium Corporate (Light Theme) — Outfit headings, Manrope body, Slate #0F172A + Gold #C5A059 accents
- **Libraries**: framer-motion, react-fast-marquee, lucide-react, sonner, shadcn/ui

## User Personas
1. HR / People Ops — needs joining kits, employee rewards, festive gifting
2. Admin teams — bulk orders, promotional merch, event giveaways
3. Marketing teams — client gifting, branded merchandise, event collateral
4. Senior decision makers — requesting custom proposals quickly

## Core Requirements (Static)
- 9 gifting categories with 4 subcategories each
- Product catalog with images, MOQ, price range, customization notes
- Enquiry-based lead gen only (no payments)
- WhatsApp + enquiry form as dual CTAs
- Premium, corporate, on-brand aesthetic
- Mobile responsive, SEO-friendly URLs (/category/:slug, /product/:slug)

## Implemented — 2026-05-03
- Backend (`/app/backend/server.py` + `seed_data.py`): self-seeds 9 categories, 35 dummy products on startup
- APIs: `/api/categories`, `/api/categories/:slug`, `/api/products` (filter by category/subcategory), `/api/products/:slug`, `/api/enquiries` (POST + GET)
- Frontend pages: Home, Categories, Category detail, Product listing (with subcategory filter chips), Product detail (gallery + Enquire Now), About, Contact (form + map iframe)
- Components: Header (sticky glass), Footer, WhatsApp floating button, EnquiryDialog (shadcn Dialog), bento categories grid, staggered-hero with image crossfade
- Contact info wired: sales@giftxpert.co, +91 7296976875, Gurugram address
- WhatsApp deep links: wa.me/917296976875
- All interactive elements have data-testid attributes
- Testing: 13/13 backend + 13/13 frontend tests passed (iteration_1.json)

## Prioritized Backlog
- **P1**: Email notification on new enquiry (Resend/SendGrid) — user to provide API key when ready
- **P1**: Admin dashboard page to view/manage enquiries (currently via GET /api/enquiries)
- **P2**: Replace dummy products with real SKUs + CMS/admin for products
- **P2**: Blog/resources section for SEO (corporate gifting guides)
- **P2**: Testimonials / case studies section on home
- **P3**: Multilingual support (Hindi), analytics integration, sitemap.xml
