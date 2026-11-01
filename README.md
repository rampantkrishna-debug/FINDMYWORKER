🔧 FindMyWorker
> **On-demand home services & verified trade workers — Mohali & Chandigarh.**
![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=flat-square&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)
![Supabase](https://img.shields.io/badge/Supabase-Auth_&_DB-3ECF8E?style=flat-square&logo=supabase)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)
---
📋 Project Overview
FindMyWorker is a full-stack web platform that connects residents of Mohali and Chandigarh with background-verified skilled and unskilled workers — electricians, plumbers, carpenters, AC technicians, cleaning helpers, daily wage labourers, and more.
The Problem It Solves
Finding a trustworthy local handyman or service worker in India is unreliable — phone book referrals are outdated, aggregator apps overcharge, and there is no accountability after the worker arrives. FindMyWorker addresses this by:
Providing Aadhaar-verified, police-record-checked workers.
Using a transparent token booking system (₹99–₹199) that gets fully adjusted in the final bill — no hidden charges.
Giving workers a dedicated dashboard to manage jobs, quotations, and earnings.
Giving customers real-time booking status tracking from acceptance to completion.
Exposing an admin console for platform operations, user management, and worker verification.
---
✨ Key Features
For Customers
📱 Email + Password & Phone OTP authentication via Supabase Auth
🗓️ Service booking with slot scheduling across Mohali & Chandigarh areas
💳 Token payment system — pay ₹99–₹199 to confirm a slot; adjusted in final bill
📍 Saved address management with named labels (Home / Office / Other)
🔔 Real-time booking status tracking — Accepted → En Route → Inspecting → Completed
⭐ Post-job review and rating system
🏠 Customer dashboard with booking history and profile management
For Workers
🪪 Aadhaar KYC verification before going live on the platform
📋 Job management dashboard — accept/reject incoming bookings
🧾 On-site quotation submission with labour + materials breakdown
💰 Earnings wallet tracking gross pay, platform commission, and net payout
🌐 Service area and availability management
For Admins
🛡️ Platform Administration Console at `/admin`
👥 Full Supabase user directory — search, filter by role, view all registrations
🔑 Role management — promote/demote users (Customer / Worker / Admin)
✅ Worker verification queue — approve or reject pending Aadhaar documents
📊 Bookings overview with status monitoring
⚙️ Platform commission and fee configuration
Security & Architecture
🔐 Row Level Security (RLS) on all database tables — users can only read/write their own data
🚫 Self-grant admin prevention via database-enforced RLS policies
🔄 Session persistence across page refreshes using Supabase `localStorage` adapter
🛣️ Protected routes with role-based access control (`ProtectedRoute` component)
🌍 Environment variable–based secrets — no credentials in source code
---
🖼️ Screenshots / Preview
> _Replace the placeholders below with actual screenshots from your deployed application._
Page	Preview
Home Page	`![Home Page](./screenshots/homepage.png)`
Services Listing	`![Services](./screenshots/services.png)`
Service Detail & Booking	`![Booking](./screenshots/booking.png)`
Customer Dashboard	`![Customer Dashboard](./screenshots/customer-dashboard.png)`
Worker Dashboard	`![Worker Dashboard](./screenshots/worker-dashboard.png)`
Admin Console	`![Admin Console](./screenshots/admin.png)`
Login Page	`![Login](./screenshots/login.png)`
---
🛠️ Technologies Used
Frontend
Technology	Version	Purpose
React	18.3	UI component framework
TypeScript	5.7	Static type safety
Vite	6.0	Build tool & dev server
React Router DOM	6.28	Client-side routing
Tailwind CSS	3.4	Utility-first styling
Lucide React	0.469	Icon library
clsx + tailwind-merge	latest	Conditional class management
Backend / Platform
Technology	Purpose
Supabase Auth	Email + Password & Phone OTP authentication
Supabase PostgreSQL	User profiles database with RLS
Supabase JS SDK	v2.118 — client-side DB & Auth access
Tooling
Tool	Purpose
PostCSS + Autoprefixer	CSS processing
TypeScript strict mode	Build-time type checking
Design System
Brand Colors: Navy `#0B192C` + Orange `#FF6B00`
Typography: Plus Jakarta Sans, Inter
Custom Tailwind tokens: `brand-navy`, `brand-orange`, card shadows, glow effects
---
📁 Project Structure
```
find-my-worker/
│
├── public/                         # Static assets
├── src/
│   ├── App.tsx                     # Root app — router & provider tree
│   ├── main.tsx                    # React DOM entry point
│   ├── index.css                   # Global styles & Tailwind directives
│   ├── vite-env.d.ts               # Vite environment variable types
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.tsx          # Global navigation bar
│   │   │   ├── Footer.tsx          # Global footer with admin link
│   │   │   ├── ProtectedRoute.tsx  # Auth guard with role enforcement
│   │   │   ├── Badge.tsx           # Status badge component
│   │   │   ├── RatingStars.tsx     # Star rating display
│   │   │   └── PaymentModal.tsx    # Token payment flow modal
│   │   └── home/
│   │       ├── HeroSection.tsx     # Landing hero with city selector
│   │       ├── ServiceGrid.tsx     # Service category grid
│   │       ├── HowItWorks.tsx      # 3-step process explainer
│   │       ├── TestimonialSection.tsx
│   │       ├── WhyChooseUs.tsx
│   │       └── WorkerCTA.tsx       # Worker partner recruitment section
│   │
│   ├── context/
│   │   ├── AuthContext.tsx         # Supabase Auth state, login, signup, OTP
│   │   └── DataContext.tsx         # Bookings, workers, platform config state
│   │
│   ├── data/
│   │   ├── services.ts             # 13 service definitions (skilled + unskilled)
│   │   ├── locations.ts            # Mohali & Chandigarh area data
│   │   └── initialData.ts          # Seed data (empty for production)
│   │
│   ├── lib/
│   │   └── supabase.ts             # Supabase client, profile CRUD helpers, RLS helpers
│   │
│   ├── pages/
│   │   ├── HomePage.tsx            # Landing page
│   │   ├── ServicesPage.tsx        # All services listing
│   │   ├── ServiceDetailPage.tsx   # Individual service detail + booking CTA
│   │   ├── BookingCheckoutPage.tsx # Slot scheduling & token payment
│   │   ├── BookingTrackingPage.tsx # Real-time booking status
│   │   ├── CustomerDashboardPage.tsx
│   │   ├── CustomerLoginPage.tsx   # Email/password + phone OTP login
│   │   ├── CustomerRegisterPage.tsx
│   │   ├── WorkerDashboardPage.tsx
│   │   ├── WorkerLoginPage.tsx
│   │   ├── WorkerRegisterPage.tsx
│   │   ├── AdminDashboardPage.tsx  # Super admin console
│   │   ├── AboutPage.tsx
│   │   ├── ContactPage.tsx
│   │   ├── PrivacyPage.tsx
│   │   └── TermsPage.tsx
│   │
│   └── types/
│       └── index.ts                # All TypeScript interfaces (User, Booking, Service, etc.)
│
├── supabase/
│   └── migrations/
│       └── 20261031_create_profiles.sql  # DB migration: profiles table, RLS, triggers
│
├── scripts/
│   └── verify-supabase.mjs         # CLI diagnostic tool
│
├── .env.local                      # Local environment variables (not committed)
├── .env.example                    # Environment variable template
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── package.json
```
---
⚙️ Installation & Setup
Prerequisites
Node.js ≥ 18.x — Download
npm ≥ 9.x (comes with Node)
A Supabase account — Create free account
---
1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/findmyworker.git
cd findmyworker
```
2. Install Dependencies
```bash
npm install
```
3. Create a Supabase Project
Go to https://supabase.com/dashboard → New Project
Note your Project URL and anon / public key from:
`Project Settings → Data API`
4. Configure Environment Variables
Copy the example file and fill in your credentials:
```bash
cp .env.example .env.local
```
Open `.env.local` and add your values:
```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGci...your_anon_key_here
```
> ⚠️ **Never use the `service_role` key in frontend code.** Only the `anon` / `public` key belongs here.
5. Run the Database Migration
Open your Supabase project → SQL Editor → paste and run the contents of:
```
supabase/migrations/20261031_create_profiles.sql
```
This creates:
`public.profiles` table linked to `auth.users`
Auto-create profile trigger on user signup
Row Level Security policies
6. Configure Supabase Authentication
In your Supabase dashboard → Authentication → Providers:
Provider	Setting
Email	Enable. Optionally disable "Confirm email" for local testing
Phone	Enable if using phone OTP. Add test numbers for dev
In Authentication → URL Configuration, add your dev URL to Redirect URLs:
```
http://localhost:3000/**
```
7. Start the Development Server
```bash
npm run dev
```
Open http://localhost:3000 in your browser.
---
Available Scripts
```bash
npm run dev            # Start development server (port 3000)
npm run build          # TypeScript check + production build
npm run preview        # Preview production build locally
npm run test:supabase  # Verify Supabase connection & DB setup
```
---
🚀 Usage
Customer Flow
Browse services at `/services` — electricians, plumbers, AC repair, cleaning, etc.
Register at `/customer/register` with name, phone, email, password, and city.
Log in at `/customer/login` — email + password or phone OTP.
Book a service — choose date/time slot, describe the issue, pay the booking token (₹99–₹199).
Track your booking in real-time from worker acceptance to job completion.
Review and rate the worker after the job is marked complete.
Worker Flow
Register at `/worker/register` with trade skills, experience, service areas.
Log in at `/worker/login`.
Get verified — admin reviews your Aadhaar and trade certificate.
Accept jobs from the worker dashboard and manage quotations on-site.
Track earnings and wallet balance in real-time.
Admin Flow
Log in at `/customer/login` using admin credentials.
Access the Admin Console at `/admin`.
Manage users — view all registered users, change roles, remove profiles.
Verify workers — approve or reject pending worker applications.
Monitor bookings platform-wide.
Configure platform fees — commission rate and inspection token fee.
---
#----|-------|
| Email | `admin@findmyworker.in` |
| Password | `admin123` |
| Admin Panel | `/admin` |
> After first login, run the following in Supabase SQL Editor to persist admin status in the database:
> ```sql
> UPDATE public.profiles
> SET account_type = 'admin'
> WHERE email = 'admin@findmyworker.in';
> ```
---
🌐 Live Demo
> 🔗 **[https://findmyworker.vercel.app](https://findmyworker.vercel.app)** ← _Replace with your deployed URL_
---
🗺️ Service Coverage
City	Areas Covered
Mohali	Phase 3B2, Phase 5, Phase 7, Sector 68, 70, 71, 82 (JLPL), Aerocity & IT City, Kharar–Landran Road
Chandigarh	Sector 8–9, 17, 20–21, 22, 35-C, 43, Manimajra & IT Park, Industrial Area Ph 1 & 2
---
📦 Services Offered
Skilled Services (Trained Technicians)
Service	Token	Est. Cost
Electrician	₹99	₹199–₹499
Plumber	₹99	₹249–₹599
Carpenter	₹149	₹349–₹899
AC Repair Technician	₹199	₹399–₹1,499
Appliance Repair	₹149	₹299–₹799
Painter	₹149	₹499–₹2,499
Unskilled Services (Verified Helpers)
Service	Token	Est. Cost
Cleaning Help	₹149	₹399–₹1,199
Household Helper	₹99	₹249–₹499
Loading & Shifting	₹199	₹499–₹1,499
Gardening Help	₹99	₹249–₹599
Daily Wage Labour	₹199	₹650–₹850/day
Event Helpers	₹149	₹450–₹900/shift
Shop Helpers	₹199	₹500–₹900/day
---
🔮 Future Improvements
Feature	Description
Real-time GPS tracking	Live worker location on a map during En Route status
In-app messaging	Direct chat between customer and assigned worker
UPI / Razorpay integration	Live payment gateway for token and final payments
Worker mobile app	React Native app for workers to manage jobs on mobile
Recurring bookings	Weekly/monthly subscription for household helpers and cleaning
Multi-language support	Hindi and Punjabi language toggle
Worker ID card generation	Auto-generated digital ID with QR for verified partners
Panchkula expansion	Add the third tri-city to the service coverage area
Email notifications	Booking confirmations, OTP fallback, and status updates via email
Analytics dashboard	Charts for revenue, bookings per service, and city-wise demand
---
🤝 Contributing
Contributions are welcome! Please follow these steps:
Fork the repository.
Create a feature branch:
```bash
   git checkout -b feature/your-feature-name
   ```
Make your changes and ensure the TypeScript build passes:
```bash
   npm run build
   ```
Commit with a clear message:
```bash
   git commit -m "feat: add real-time worker GPS tracking"
   ```
Push your branch:
```bash
   git push origin feature/your-feature-name
   ```
Open a Pull Request on GitHub with a description of what you changed and why.
Code Standards
Use TypeScript strictly — no `any` types without justification.
Follow the existing component structure (`pages/` for full views, `components/` for reusable pieces).
All environment secrets must go in `.env.local` only — never hardcode.
New database tables must include RLS policies.
Run `npm run build` before submitting a PR — all TypeScript errors must be resolved.
---
👤 Author
Rampant Krishna
🔗 GitHub: @YOUR_GITHUB_USERNAME
---
📄 License
This project is licensed under the MIT License.
```
MIT License

Copyright (c) 2026 Rampant Krishna

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
---
<div align="center">
  <strong>Built for the Tri-City — Mohali · Chandigarh · Panchkula</strong><br/>
  <sub>FindMyWorker © 2026 — Connecting verified workers with homes that need them.</sub>
</div>
