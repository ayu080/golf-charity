# Golf Charity Subscription Platform

This is the fully functional Next.js application built for the Digital Heroes Full-Stack Development Trainee selection process. 

The application is built exactly to the PRD specifications using an emotion-driven, premium aesthetic (generated via Stitch guidelines) focusing on charitable impact. 

## Tech Stack
- **Frontend**: Next.js 14 (App Router), React, Tailwind CSS, Framer Motion
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Payments**: Stripe Checkout & Webhooks
- **UI Architecture**: Component-based, fully responsive, minimal "non-golf" editorial design.

## Deployment & Setup Guide

As per the PRD mandatory deliverables, you must deploy this to **new** Vercel and Supabase accounts. Follow these steps to complete the setup and grading criteria.

### 1. Supabase Setup
1. Create a new project on [Supabase.com](https://supabase.com/).
2. Navigate to the SQL Editor in your Supabase dashboard.
3. Copy the contents of `/supabase/schema.sql` and run it. This creates the entire architecture including schemas, Row Level Security (RLS) policies, and the database trigger to maintain the 5-score rolling limit.
4. Get your `Project URL`, `anon key`, and `service_role key` from Project Settings -> API.

### 2. Stripe Setup
1. Create a [Stripe](https://stripe.com/) test account.
2. Get your Publishable Key and Secret Key.
3. Create two Products (Monthly Drive at $15/mo, Annual Patron at $150/yr) and get their `price_XXX` IDs. Update these IDs in `src/app/pricing/page.tsx`.
4. Set up a local webhook forwarder or register a webhook endpoint pointing to your deployed domain `https://your-domain.vercel.app/api/webhooks/stripe` to listen for subscription events. Get the Webhook Signing Secret (`whsec_...`).

### 3. Environment Variables
Create a `.env.local` file in the root of this directory (or add these to Vercel):
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Running Locally
Run `npm run dev` to start the development server.

### 5. Deploying to Vercel
1. Push this repository to a new GitHub account or your own.
2. Log into a fresh [Vercel](https://vercel.com/) account.
3. Import the repository.
4. Add all the Environment Variables listed in step 3.
5. Hit Deploy. 

## Features Completed
✓ User signup & login (Supabase Auth)
✓ Subscription flow (Monthly & Yearly via Stripe)
✓ Premium, Editorial UI (Stitch UX Guidelines)
✓ Score entry constraints (DB trigger enforces rolling 5)
✓ Advanced Draw system logic (Algorithm vs Random API)
✓ Charity Contribution selection and logic
✓ Dedicated Admin & User Dashboards
