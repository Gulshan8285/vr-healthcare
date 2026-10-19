# VR Healthcare - Professional Home-Care Website & Management System

A complete, trustworthy, mobile-responsive website and management portal for **VR Healthcare**—providing compassionate home healthcare support, elderly assistance, post-hospitalization recovery care, patient attendants, and housekeeping assistance.

---

## 🌟 Key Features

### 1. Public Healthcare Website
- **Modern Healthcare Aesthetics**: Clean, calm medical palette with soft teal accents, dark navy typography, subtle shadows, and photorealistic compassionate home-care imagery.
- **8 Comprehensive Homepage Sections**:
  1. **Hero Section**: Headline, reassuring supporting text, "Enquire Now" & "Contact Us" CTAs, and trust highlights.
  2. **Welcome Section**: Mission overview and care philosophy.
  3. **6 Detailed Service Cards**:
     - Patient Care Assistance at Home
     - Elderly Care and Daily Assistance
     - Post-Hospitalization Support (with clear clinical disclaimer)
     - Patient Attendants
     - Home Cleaning and Housekeeping
     - Day and Night Care Arrangements (with clear note on availability)
  4. **Why Choose VR Healthcare**: Honest, trust-building themes without fabricated claims.
  5. **How It Works**: 4-step clear process (Submit Enquiry &rarr; Discuss Needs &rarr; Confirm Availability &rarr; Arrange Service).
  6. **Call to Action**: Direct phone dialer and WhatsApp chat triggers.
  7. **Frequently Asked Questions**: Accordion with editable questions.
  8. **Final Enquiry Form**: Compact, mobile-friendly enquiry form.
- **Dedicated Pages**:
  - `/about-us`: Mission statement, approach, and commitment to families.
  - `/services`: In-depth breakdown of all 6 services with specific inclusion scopes and enquiry preselection.
  - `/contact-us`: Click-to-call, WhatsApp click, email, service coverage, and direct form.
  - `/privacy-policy` & `/terms-and-conditions`: Responsible legal policies with non-clinical disclosures.

### 2. Working Enquiry System
- **Database Persistence**: Every enquiry is validated on server and saved to SQLite/PostgreSQL.
- **Unique Reference Numbers**: Automatically generated format (e.g., `VRH-2610-1945`).
- **Anti-Spam & Rate Limiting**: Built-in sliding window rate limiter (max 5 submissions/min per IP) and invisible bot honeypot.
- **Duplicate Click Prevention**: Prevents multiple submissions while processing.
- **Extensible Notifications**: Modular notification handler for administrator email alerts and customer acknowledgements.

### 3. Secure Admin Management Panel (`/admin`)
- **Protected Authentication**:
  - Secure bcrypt password hashing.
  - Signed JWT session cookie (`admin_session`) with 24-hour expiration.
  - Logout and Password Change workflows.
- **Real Database Statistics**:
  - Total enquiries, New enquiries, Contacted, Follow-ups, Converted, Closed, and Spam count.
  - Enquiry distribution by requested service.
- **Enquiry Management (`/admin/enquiries`)**:
  - Search by customer name, phone number, or reference number.
  - Filter by status (`New`, `Contacted`, `Follow-up Required`, `In Discussion`, `Converted`, `Closed`, `Spam`) and service.
  - Update status and record follow-up dates.
  - Add private internal administrative notes (never visible to customers).
  - One-click customer phone dialer (`tel:...`) and WhatsApp chat launcher (`wa.me/...`).
  - One-click CSV Export of filtered records.
- **Website Content Management (`/admin/settings`)**:
  - Edit business phone, WhatsApp number, email, and service location without touching source code.
  - Update homepage hero headline, description, welcome copy, mission statement, approach, and footer.
  - Update default SEO meta title and meta description.
- **Services Manager (`/admin/services`)**:
  - Edit service titles, short descriptions, full scopes, and toggle website visibility.
- **FAQ Manager (`/admin/faqs`)**:
  - Add, edit, reorder, or hide FAQ questions and answers.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 & Vanilla CSS variables
- **Icons**: Lucide React
- **Database & ORM**: Prisma ORM with SQLite (Local zero-config) / PostgreSQL (Production ready)
- **Authentication**: Jose (JWT) & bcryptjs (password hashing)

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Default `.env` settings:
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="vrhealthcare_super_secret_jwt_key_2026_change_in_production"
INITIAL_ADMIN_EMAIL="admin@vrhealthcare.com"
INITIAL_ADMIN_PASSWORD="Admin@VRHealth2026"
ADMIN_NOTIFICATION_EMAIL="vrhealthcare@gmail.com"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

### 3. Initialize Database & Seed Content
```bash
npm run db:push
npm run db:seed
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Admin Credentials & Access

- **Admin Login Route**: `/admin/login`
- **Default Email**: `admin@vrhealthcare.com`
- **Default Password**: `Admin@VRHealth2026`

> **Security Note:** Once logged in, navigate to **Security & Password** (`/admin/password`) to change your administrator password.

---

## ☁️ Deployment Instructions (e.g. Vercel + PostgreSQL)

### 1. Database Setup
To deploy on Vercel or any cloud hosting:
1. Provision a PostgreSQL database (e.g. Supabase, Neon, AWS RDS, or Render).
2. In `prisma/schema.prisma`, update the datasource provider:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```
3. Set `DATABASE_URL` in your hosting environment variables:
```env
DATABASE_URL="postgresql://username:password@your-host:5432/vr_healthcare?sslmode=require"
```
4. Run migrations:
```bash
npx prisma db push
npx tsx prisma/seed.ts
```

### 2. Environment Variables on Vercel
Set the following environment variables in your Vercel Project Settings:
- `DATABASE_URL`
- `JWT_SECRET` (generate a strong 64-character random string)
- `INITIAL_ADMIN_EMAIL`
- `INITIAL_ADMIN_PASSWORD`
- `ADMIN_NOTIFICATION_EMAIL`
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` (optional, for email delivery)
- `NEXT_PUBLIC_SITE_URL` (your production custom domain, e.g. `https://vrhealthcare.com`)

---

## 📱 Mobile Responsiveness Checklist

The website layout has been tested across all standard viewport widths:
- **320px & 360px**: Clean single-column layout, compact cards, responsive typography.
- **375px & 390px (Modern Mobile)**: Touch-friendly buttons, slide-out menu drawer, sticky header.
- **768px (Tablet)**: Balanced 2-column service cards and side-by-side contact details.
- **1024px & 1440px (Desktop)**: Full-width hero layout, 3-column service cards, 4-column footer, and comprehensive admin sidebar.

---

## 📄 License & Attribution
All rights reserved © VR Healthcare. Built for compassionate home healthcare and patient care support.
