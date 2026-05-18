# Find A Venue — Premium Redesign

South Africa's premium, curated venue directory for weddings, corporate events, and safari lodges.

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router, RSC)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS v4 + Custom design tokens
- **Animation**: Framer Motion + Lenis (smooth scroll)
- **Fonts**: Fraunces (display) + Inter (body) via next/font
- **Components**: shadcn/ui primitives + Radix UI
- **Database**: Supabase (Postgres, Auth, Storage, RLS)
- **Forms**: React Hook Form + Zod validation
- **Email**: Resend (React Email templates)
- **Hosting**: Vercel (Next.js 15 native support)

## 📁 Project Structure

```
find-avenue/
├── app/
│  ├── (marketing)/          # Public pages
│  ├── venues/               # Directory & detail pages
│  ├── collections/[category]
│  ├── journal/
│  ├── (auth)/               # Auth pages
│  ├── account/              # Client dashboard
│  ├── dashboard/            # Venue owner dashboard
│  ├── admin/                # Internal ops
│  ├── layout.tsx
│  ├── page.tsx              # Home (landing)
│  └── globals.css
├── components/
│  ├── ui/                   # shadcn primitives
│  ├── marketing/            # Landing page sections
│  │  ├── Hero.tsx
│  │  ├── VenueBento.tsx
│  │  ├── CategoryTriptych.tsx
│  │  ├── ProcessTimeline.tsx
│  │  ├── Testimonials.tsx
│  │  ├── OwnerCTA.tsx
│  │  ├── JournalTeaser.tsx
│  │  └── FinalCTA.tsx
│  ├── venues/               # Directory components
│  └── shared/               # Nav, Footer, etc.
├── lib/
│  ├── supabase/             # Server & client utilities
│  ├── email/                # Resend templates
│  ├── validators/           # Zod schemas
│  └── utils.ts
├── tailwind.config.ts
├── next.config.ts
└── .env.example
```

## 🎨 Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| Forest | `#0F3D2E` | Primary, header, buttons |
| Gold | `#C9A24B` | Accents, highlights, hover states |
| Sand | `#F6F1E7` | Section backgrounds |
| Ivory | `#FBF8F2` | Card surfaces, hero text |
| Charcoal | `#1B1B1B` | Body text |
| Muted | `#6B6B6B` | Secondary text |

## ✨ Key Features Built

### Phase 0 ✅
- [x] Next.js 15 + TypeScript scaffold
- [x] Tailwind CSS v4 with custom colors
- [x] Fraunces & Inter fonts via next/font
- [x] Folder structure & base files
- [x] Navigation (sticky, responsive)
- [x] Hero section with search bar
- [x] Featured Venues bento grid
- [x] Category triptych (expandable)
- [x] Process timeline (desktop/mobile)
- [x] Social proof/testimonials
- [x] Venue owner CTA
- [x] Journal teaser
- [x] Final CTA section
- [x] Footer
- [x] Supabase utilities (server/client)
- [x] Enquiry form validation (Zod)

### Phase 1 (Next)
- [ ] Enquiry form component with submission
- [ ] Resend email integration
- [ ] `/how-it-works`, `/list-your-venue`, `/about`, `/contact` pages
- [ ] WhatsApp deep linking
- [ ] Mobile sticky CTA bar

### Phase 2
- [ ] `/venues` directory with filters
- [ ] Mapbox integration
- [ ] `/venues/[slug]` detail page
- [ ] Gallery, capacity calculator, similar venues

### Phase 3
- [ ] Supabase Auth (magic link + Google)
- [ ] Client dashboard (saved venues, enquiries)
- [ ] Venue owner dashboard (listings, leads)
- [ ] Admin dashboard

## 🏗️ Setup

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Create a Supabase project and add credentials:
# NEXT_PUBLIC_SUPABASE_URL
# NEXT_PUBLIC_SUPABASE_ANON_KEY

# Run dev server
npm run dev
```

Visit `http://localhost:3000`

## 📋 Supabase Schema (To Run)

See `/supabase/migrations` for full schema. Key tables:
- `profiles` (extends auth.users)
- `venues` (name, category, province, capacity, price_band, etc.)
- `venue_media` (gallery images)
- `enquiries` (client requests, lead pipeline)
- `saved_venues` (favorites)
- `testimonials` (social proof)
- `posts` (journal articles)

## 🚀 Deployment

Recommended: **Vercel**

```bash
# Link to Vercel
vercel link

# Set environment variables in Vercel dashboard

# Deploy
vercel --prod
```

## 📖 Roadmap

**Week 1-2**: Foundation (Phase 0) ✅
**Week 3-4**: Marketing pages + enquiry forms (Phase 1)
**Week 5-6**: Directory & detail pages (Phase 2)
**Week 7+**: Auth & dashboards (Phase 3+)

## 🤝 Contributing

See CLAUDE.md for development notes.

## 📄 License

© 2026 Find A Venue. All rights reserved.
