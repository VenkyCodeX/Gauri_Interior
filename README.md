# Gauri Interiors — Complete Project Documentation

> Premium Luxury Interior Design & Blinds Website
> Built with React + Vite + Tailwind CSS + Node.js + MongoDB + Cloudinary

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Folder Structure](#3-folder-structure)
4. [Prerequisites](#4-prerequisites)
5. [Installation & Setup](#5-installation--setup)
6. [Environment Variables](#6-environment-variables)
7. [Running the Project](#7-running-the-project)
8. [Website Flow — Page by Page](#8-website-flow--page-by-page)
9. [All Components & What They Do](#9-all-components--what-they-do)
10. [All Pages & Routes](#10-all-pages--routes)
11. [Backend API Reference](#11-backend-api-reference)
12. [Database Models](#12-database-models)
13. [Admin Dashboard Guide](#13-admin-dashboard-guide)
14. [Admin Manager Pages](#14-admin-manager-pages)
15. [Security Features](#15-security-features)
16. [SEO Setup](#16-seo-setup)
17. [Deployment Guide](#17-deployment-guide)
18. [Customization Guide](#18-customization-guide)
19. [Troubleshooting](#19-troubleshooting)

---

## 1. Project Overview

Gauri Interiors is a **premium luxury interior design and blinds business website** built for a Hyderabad-based interior studio. The website features:

- Cinematic animations and transitions
- Full admin dashboard for daily content management
- Photo and video gallery with Cloudinary CDN
- Contact form with WhatsApp integration
- SEO optimized for local Hyderabad search
- Fully responsive for all devices

---

## 2. Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 + Vite | UI framework + build tool |
| Tailwind CSS v4 | Styling |
| Framer Motion | Animations and transitions |
| GSAP | Advanced scroll animations |
| Lenis | Smooth scroll |
| React Router DOM | Client-side routing |
| Axios | API calls |
| React Dropzone | Drag & drop file uploads |
| React Compare Slider | Before/After image slider |
| React Hot Toast | Notifications |
| Lucide React | Icons |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express | REST API server |
| MongoDB + Mongoose | Database |
| Cloudinary | Image/video CDN storage |
| JWT | Authentication |
| Bcryptjs | Password hashing |
| Multer | File upload handling |
| Helmet | HTTP security headers |
| Express Rate Limit | API rate limiting |
| Morgan | Request logging |

---

## 3. Folder Structure

```
Gauri_Interior/
│
├── frontend/                          # React + Vite app
│   ├── public/
│   │   ├── favicon.svg
│   │   ├── robots.txt                 # SEO robots file
│   │   └── sitemap.xml                # SEO sitemap
│   │
│   └── src/
│       ├── components/
│       │   ├── admin/                 # Admin panel components
│       │   │   ├── AdminGallery.jsx   # Gallery management UI
│       │   │   ├── AdminVideos.jsx    # Video management UI
│       │   │   ├── AdminOverview.jsx  # Dashboard stats
│       │   │   ├── AdminTestimonials.jsx
│       │   │   ├── AdminInquiries.jsx
│       │   │   └── ProtectedRoute.jsx # JWT route guard
│       │   │
│       │   ├── layout/
│       │   │   ├── Navbar.jsx         # Sticky glassmorphism navbar
│       │   │   └── Footer.jsx         # Multi-column footer
│       │   │
│       │   ├── sections/              # All homepage sections
│       │   │   ├── SplashScreen.jsx
│       │   │   ├── HeroSection.jsx
│       │   │   ├── ProductCategories.jsx
│       │   │   ├── WhyChooseUs.jsx
│       │   │   ├── ServiceProcess.jsx
│       │   │   ├── BeforeAfterSection.jsx
│       │   │   ├── GallerySection.jsx
│       │   │   ├── VideoShowcase.jsx
│       │   │   ├── Testimonials.jsx
│       │   │   ├── TrustSection.jsx
│       │   │   └── ContactSection.jsx
│       │   │
│       │   └── ui/                    # Reusable UI components
│       │       ├── CustomCursor.jsx
│       │       ├── ScrollProgress.jsx
│       │       ├── SectionDivider.jsx
│       │       └── Skeleton.jsx
│       │
│       ├── context/
│       │   └── AuthContext.jsx        # JWT auth state
│       │
│       ├── pages/
│       │   ├── Home.jsx               # Main homepage
│       │   ├── GalleryPage.jsx        # Full gallery page
│       │   └── admin/
│       │       ├── AdminLogin.jsx
│       │       ├── AdminDashboard.jsx
│       │       ├── GalleryManager.jsx # Standalone gallery manager
│       │       └── VideoManager.jsx   # Standalone video manager
│       │
│       ├── services/
│       │   └── api.js                 # All Axios API calls
│       │
│       ├── App.jsx                    # Routes + Lenis setup
│       ├── main.jsx                   # React entry point
│       └── index.css                  # Global styles + Tailwind
│
└── backend/                           # Node.js + Express API
    ├── config/
    │   └── cloudinary.js              # Cloudinary + Multer config
    ├── middleware/
    │   ├── auth.js                    # JWT verification middleware
    │   └── errorHandler.js            # Global error handler
    ├── models/
    │   ├── Admin.js
    │   ├── Gallery.js
    │   ├── Video.js
    │   ├── Testimonial.js
    │   └── Inquiry.js
    ├── routes/
    │   ├── auth.js
    │   ├── gallery.js
    │   ├── videos.js
    │   ├── testimonials.js
    │   ├── inquiries.js
    │   └── stats.js
    ├── .env                           # Environment variables
    └── server.js                      # Main server entry point
```

---

## 4. Prerequisites

Make sure you have these installed:

```bash
node --version    # v18 or higher required
npm --version     # v9 or higher
```

You also need accounts on:
- **MongoDB Atlas** — https://mongodb.com/atlas (free tier works)
- **Cloudinary** — https://cloudinary.com (free tier works)

---

## 5. Installation & Setup

### Step 1 — Clone / Open the project
```bash
cd Gauri_Interior
```

### Step 2 — Install Backend dependencies
```bash
cd backend
npm install
```

### Step 3 — Install Frontend dependencies
```bash
cd ../frontend
npm install
```

### Step 4 — Configure environment variables
```bash
# Edit backend/.env with your credentials
# See Section 6 below for all variables
```

---

## 6. Environment Variables

Create/edit `backend/.env`:

```env
# Server
PORT=5000
NODE_ENV=development

# MongoDB Atlas
MONGO_URI=mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/gauri_interiors?retryWrites=true&w=majority&appName=Cluster0

# JWT
JWT_SECRET=your_super_secret_key_change_this_in_production
JWT_EXPIRE=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Admin credentials (used for auto-seeding on first run)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

> ⚠️ Never commit `.env` to Git. It is already in `.gitignore`.

---

## 7. Running the Project

You need **2 terminals open simultaneously**.

### Terminal 1 — Start Backend
```bash
cd backend
npm run dev
```

Expected output:
```
✅ MongoDB connected
✅ Admin seeded — change password after first login!
🚀 Server running on port 5000
```

### Terminal 2 — Start Frontend
```bash
cd frontend
npm run dev
```

Expected output:
```
VITE v8.x ready in Xms
➜ Local: http://localhost:5173/
```

### Open in Browser
| URL | Description |
|---|---|
| `http://localhost:5173` | Main website |
| `http://localhost:5173/gallery` | Full project gallery |
| `http://localhost:5173/admin/login` | Admin login |
| `http://localhost:5173/admin/dashboard` | Admin dashboard |
| `http://localhost:5173/admin/gallery-manager` | Gallery manager |
| `http://localhost:5173/admin/video-manager` | Video manager |

---

## 8. Website Flow — Page by Page

### Step 1 — Splash Screen (3.5 seconds)
When the website first loads, a full-screen splash screen appears:
- Animated letter-by-letter logo reveal: **G A U R I  I N T E R I O R S**
- Rotating decorative gold rings
- Corner bracket decorations
- Tagline fades in: *"Transforming Spaces with Premium Interiors"*
- Gold gradient loading bar fills from left to right
- After 3.5 seconds → smooth blur + scale exit transition → Homepage appears

### Step 2 — Homepage Loads
After splash screen exits, the full homepage renders with:
- Sticky glassmorphism Navbar
- Gold scroll progress bar at top of page
- Custom gold cursor (desktop only)
- Lenis smooth scroll activated

### Step 3 — Hero Section
- Fullscreen cinematic background image slider (3 slides, auto-advances every 6 seconds)
- Parallax effect — background moves slightly with mouse
- Subtle gold glow follows mouse cursor
- Animated heading with blur-in transition on slide change
- Two CTA buttons:
  - **Explore Collection** → scrolls to Products section
  - **Book Consultation** → scrolls to Contact section
- Stats row at bottom: 2500+ Clients · 3200+ Projects · 14+ Years
- Slide indicator dots at bottom center
- Scroll indicator line on bottom right

### Step 4 — Product Categories Section
- Horizontal scrollable cards (drag or use arrow buttons)
- 8 product cards: Roller Blinds, Zebra Blinds, Venetian Blinds, Wooden Blinds, Smart Motorized, Curtains, Wallpapers, Interior Decor
- Each card: 3D tilt on mouse move, image zoom on hover, gold border glow, arrow icon appears
- "Swipe to explore" hint on mobile

### Step 5 — Why Choose Us Section
- 4 animated stat cards with counting numbers:
  - 2500+ Happy Customers
  - 3200+ Projects Done
  - 14+ Years Experience
  - 100% Quality Assured
- Numbers count up when scrolled into view
- 4 feature highlights below stats

### Step 6 — Service Process Section
- 5-step process timeline
- Desktop: horizontal timeline with animated connecting line
- Mobile: vertical timeline with dots
- Steps: Consultation → Measurement → Design → Installation → Handover

### Step 7 — Before & After Section
- Horizontal scrollable comparison sliders
- Drag the gold handle left/right to reveal before/after
- 4 project comparisons

### Step 8 — Project Gallery Section (Homepage Preview)
- Masonry grid layout (3 columns)
- Category filter chips
- Click any image → fullscreen lightbox
- Lightbox: prev/next navigation, keyboard arrows, project details panel
- **"View Full Gallery →"** button → navigates to `/gallery` page

### Step 9 — Video Showcase Section
- Instagram reel-style vertical video cards (2×4 grid)
- Click → modal video player opens
- Skeleton loader while videos load from API

### Step 10 — Testimonials Section
- Auto-sliding carousel (every 5 seconds)
- Glass card design with star ratings
- Manual prev/next controls
- Dot indicators

### Step 11 — Trust Section
- Google Reviews banner (4.9/5 rating)
- 6 trust badges: Rating, Guarantee, On-Time, Certified, Free Consultation, Service Areas
- Hyderabad service areas listed: Banjara Hills, Jubilee Hills, Gachibowli, etc.

### Step 12 — Contact Section
- Contact form: Name, Phone, Email, Message
- Form submits to backend → saved as Inquiry in MongoDB
- Contact info: Phone (click to call), Email (click to email), Address + Google Maps embed
- **WhatsApp floating button** (bottom right) — opens WhatsApp with prefilled message:
  *"Hello, I saw your website and I'm interested in a free consultation for blinds / interior design. Please let me know the next available slot."*

### Step 13 — Footer
- Multi-column: Brand info + social icons, Quick Links, Products list, Contact + Newsletter
- Newsletter email input
- Copyright year auto-updates

---

## 9. All Components & What They Do

### UI Components (`src/components/ui/`)

| Component | Description |
|---|---|
| `CustomCursor.jsx` | Gold ring cursor with trail effect. Enlarges on hover over links/buttons. Desktop only. |
| `ScrollProgress.jsx` | Gold gradient progress bar fixed at top of page showing scroll position. |
| `SectionDivider.jsx` | Animated horizontal gold gradient line between sections. |
| `Skeleton.jsx` | Shimmer loading placeholders for Gallery and Video sections. |

### Layout Components (`src/components/layout/`)

| Component | Description |
|---|---|
| `Navbar.jsx` | Sticky glassmorphism navbar. Transparent on top, dark glass on scroll. Supports both hash-scroll (home page) and route navigation (other pages). Active link highlighting. Mobile hamburger menu with full-screen overlay. |
| `Footer.jsx` | 4-column footer with brand, quick links, products, contact info, newsletter signup, social icons. |

### Section Components (`src/components/sections/`)

| Component | Description |
|---|---|
| `SplashScreen.jsx` | Full-screen intro animation. Auto-dismisses after 3.5s. |
| `HeroSection.jsx` | Fullscreen hero with image slider, parallax, mouse glow, magnetic CTA buttons, stats row. |
| `ProductCategories.jsx` | Horizontal scrollable product cards with 3D tilt and hover effects. |
| `WhyChooseUs.jsx` | Animated stat counters + feature highlights. |
| `ServiceProcess.jsx` | 5-step process — horizontal on desktop, vertical on mobile. |
| `BeforeAfterSection.jsx` | Horizontal scrollable before/after comparison sliders. |
| `GallerySection.jsx` | Masonry gallery preview with lightbox + "View Full Gallery" button. |
| `VideoShowcase.jsx` | Video grid with modal player. |
| `Testimonials.jsx` | Auto-sliding testimonial carousel. |
| `TrustSection.jsx` | Google rating banner + trust badges + service areas. |
| `ContactSection.jsx` | Contact form + map + WhatsApp float button. |

### Admin Components (`src/components/admin/`)

| Component | Description |
|---|---|
| `ProtectedRoute.jsx` | Wraps admin routes — redirects to login if no JWT token. |
| `AdminOverview.jsx` | Dashboard stats cards + quick action links. |
| `AdminGallery.jsx` | Gallery management inside dashboard. |
| `AdminVideos.jsx` | Video management inside dashboard. |
| `AdminTestimonials.jsx` | Add/delete testimonials. |
| `AdminInquiries.jsx` | View/manage contact form submissions. |

---

## 10. All Pages & Routes

| Route | Page | Protected | Description |
|---|---|---|---|
| `/` | `Home.jsx` | No | Main website homepage |
| `/gallery` | `GalleryPage.jsx` | No | Full project gallery with search, filter, sort |
| `/admin/login` | `AdminLogin.jsx` | No | Admin login form |
| `/admin/dashboard` | `AdminDashboard.jsx` | ✅ Yes | Main admin panel with sidebar |
| `/admin/gallery` | Inside Dashboard | ✅ Yes | Gallery tab in dashboard |
| `/admin/videos` | Inside Dashboard | ✅ Yes | Videos tab in dashboard |
| `/admin/testimonials` | Inside Dashboard | ✅ Yes | Testimonials tab |
| `/admin/inquiries` | Inside Dashboard | ✅ Yes | Inquiries tab |
| `/admin/gallery-manager` | `GalleryManager.jsx` | ✅ Yes | Standalone full-featured gallery manager |
| `/admin/video-manager` | `VideoManager.jsx` | ✅ Yes | Standalone full-featured video manager |

---

## 11. Backend API Reference

Base URL: `http://localhost:5000/api`

### Auth
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/auth/login` | No | Login with username + password → returns JWT token |

### Gallery
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/gallery` | No | Get all gallery images. Query: `?limit=20&page=1&category=Blinds` |
| POST | `/gallery` | ✅ | Upload new image (multipart/form-data: `image`, `caption`, `category`) |
| PUT | `/gallery/:id` | ✅ | Update caption or category |
| DELETE | `/gallery/:id` | ✅ | Delete image (also removes from Cloudinary) |

### Videos
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/videos` | No | Get all videos. Query: `?limit=10&page=1` |
| POST | `/videos` | ✅ | Upload new video (multipart/form-data: `video`, `title`, `category`) |
| PUT | `/videos/:id` | ✅ | Update title or category |
| DELETE | `/videos/:id` | ✅ | Delete video (also removes from Cloudinary) |

### Testimonials
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/testimonials` | No | Get all active testimonials |
| POST | `/testimonials` | ✅ | Add new testimonial (`name`, `role`, `review`, `rating`) |
| PUT | `/testimonials/:id` | ✅ | Update testimonial |
| DELETE | `/testimonials/:id` | ✅ | Delete testimonial |

### Inquiries
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/inquiries` | ✅ | Get all contact form submissions |
| POST | `/inquiries` | No | Submit contact form (`name`, `phone`, `email`, `message`) |
| PUT | `/inquiries/:id` | ✅ | Update status (`new` / `contacted` / `resolved`) |
| DELETE | `/inquiries/:id` | ✅ | Delete inquiry |

### Stats
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/stats` | ✅ | Get counts: gallery, videos, testimonials, inquiries |

### Health Check
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/health` | No | Check if API is running |

---

## 12. Database Models

### Admin
```
username    String  (unique, required)
password    String  (bcrypt hashed, min 6 chars)
createdAt   Date
updatedAt   Date
```

### Gallery
```
imageUrl    String  (Cloudinary URL, required)
publicId    String  (Cloudinary public ID for deletion)
caption     String  (default: '')
category    String  (default: 'General')
featured    Boolean (default: false)
createdAt   Date
updatedAt   Date
```

### Video
```
videoUrl      String  (Cloudinary URL, required)
thumbnailUrl  String  (auto-generated from Cloudinary)
publicId      String  (Cloudinary public ID)
title         String  (default: '')
category      String
featured      Boolean (default: false)
createdAt     Date
updatedAt     Date
```

### Testimonial
```
name      String  (required)
role      String  (e.g. "Homeowner, Mumbai")
review    String  (required)
rating    Number  (1-5, default: 5)
active    Boolean (default: true)
createdAt Date
updatedAt Date
```

### Inquiry
```
name      String  (required)
phone     String
email     String
message   String
status    String  (enum: 'new' | 'contacted' | 'resolved', default: 'new')
createdAt Date
updatedAt Date
```

---

## 13. Admin Dashboard Guide

### Login
- URL: `http://localhost:5173/admin/login`
- Default credentials: `admin` / `admin123`
- ⚠️ Change password after first login!

### Dashboard Tabs

#### Overview Tab
- Shows total counts: Gallery photos, Videos, Testimonials, Inquiries
- Quick action buttons to jump to each section

#### Gallery Tab
- Upload photos with drag & drop
- Set caption and category before uploading
- Edit caption/category inline on each card
- Delete photos (also removes from Cloudinary)
- Search by caption, filter by category
- Pagination (20 per page)
- Preview fullscreen lightbox

#### Videos Tab
- Upload videos with drag & drop
- Set title and category before uploading
- Edit title/category inline
- Delete videos (also removes from Cloudinary)
- Preview video in modal player
- Pagination (12 per page)

#### Testimonials Tab
- Add new testimonials with name, role, review, star rating
- Delete existing testimonials
- All active testimonials show on homepage carousel

#### Inquiries Tab
- View all contact form submissions
- See name, phone, email, message, date
- Mark as resolved (green badge)
- Delete inquiries

---

## 14. Admin Manager Pages

These are **separate standalone pages** — not linked publicly anywhere.

### Gallery Manager
- URL: `http://localhost:5173/admin/gallery-manager`
- Full-featured photo management
- 5-column grid layout
- Upload with progress bars per file
- Hover to reveal Edit / Preview / Delete actions
- Switch to Video Manager button in top bar

### Video Manager
- URL: `http://localhost:5173/admin/video-manager`
- Full-featured video management
- 4-column grid with thumbnails
- Upload with progress bars
- Full video player preview
- Switch to Gallery Manager button in top bar

Both pages:
- Redirect to `/admin/login` if not authenticated
- Have Logout button
- Have "Back to Site" navigation

---

## 15. Security Features

| Feature | Implementation |
|---|---|
| Password hashing | bcryptjs with 12 salt rounds |
| JWT authentication | 7-day expiry, verified on every protected request |
| HTTP security headers | Helmet middleware |
| Rate limiting | 200 req/15min global, 10 login attempts/15min, 20 form submissions/hour |
| CORS protection | Whitelist of allowed origins only |
| File type validation | Mimetype check on image and video uploads |
| File size limits | Images: 10MB max, Videos: 200MB max |
| Request body limit | JSON body capped at 10kb |
| Admin route protection | All write operations require valid JWT |
| Public inquiry endpoint | Rate limited to prevent spam |

---

## 16. SEO Setup

### Meta Tags (index.html)
- Title: "Gauri Interiors | Premium Luxury Interior Design & Blinds in Hyderabad"
- Description with Hyderabad keywords
- Keywords: interior design Hyderabad, blinds Hyderabad, roller blinds, zebra blinds, etc.
- Open Graph tags for social sharing
- Twitter Card tags

### Schema Markup
- LocalBusiness schema with:
  - Business name, address, phone, email
  - Opening hours
  - Price range
  - Service catalog (all 8 product types)
  - Aggregate rating

### Files
- `public/sitemap.xml` — Submit to Google Search Console
- `public/robots.txt` — Blocks `/admin/` and `/api/` from indexing

### To Submit Sitemap
1. Go to Google Search Console
2. Add your domain
3. Submit: `https://yourdomain.com/sitemap.xml`

---

## 17. Deployment Guide

### Recommended Stack
| Layer | Service | Cost |
|---|---|---|
| Frontend | Vercel | Free |
| Backend | Render | Free tier |
| Database | MongoDB Atlas | Free 512MB |
| Media | Cloudinary | Free 25GB |

### Frontend → Vercel
```bash
# 1. Push frontend/ to GitHub
# 2. Import on vercel.com
# 3. Build command: npm run build
# 4. Output directory: dist
# 5. Add env variable: VITE_API_URL=https://your-backend.onrender.com
```

Update `frontend/src/services/api.js`:
```js
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api'
})
```

### Backend → Render
```bash
# 1. Push backend/ to GitHub
# 2. New Web Service on render.com
# 3. Build command: npm install
# 4. Start command: node server.js
# 5. Add all .env variables in Render dashboard
```

### Post-Deployment Checklist
- [ ] Change admin password from `admin123`
- [ ] Update `FRONTEND_URL` in backend `.env` to Vercel URL
- [ ] Update CORS origins in `server.js`
- [ ] Set `NODE_ENV=production` on Render
- [ ] Update Google Maps embed with real location
- [ ] Update WhatsApp number in `ContactSection.jsx`
- [ ] Update phone/email in `Footer.jsx` and `ContactSection.jsx`
- [ ] Replace placeholder Unsplash images with real project photos
- [ ] Submit sitemap to Google Search Console
- [ ] Set up Google Analytics

---

## 18. Customization Guide

### Change Business Info
| What | File | What to change |
|---|---|---|
| Phone number | `ContactSection.jsx`, `Footer.jsx` | `+91 98765 43210` |
| Email | `ContactSection.jsx`, `Footer.jsx` | `info@gauriinteriors.com` |
| Address | `ContactSection.jsx`, `Footer.jsx` | Mumbai → your city |
| WhatsApp number | `ContactSection.jsx` | `919876543210` in href |
| WhatsApp message | `ContactSection.jsx` | The prefilled text in href |
| Google Maps | `ContactSection.jsx` | Replace iframe src |
| Service areas | `TrustSection.jsx` | Edit the desc field |

### Change Colors
Edit `frontend/src/index.css`:
```css
/* Primary gold color */
--gold: #C9A84C;
--gold-light: #E8C97A;
--gold-dark: #A07830;
```

### Change Fonts
Edit `frontend/index.html` — update Google Fonts link.
Edit `frontend/src/index.css` — update `font-family`.

### Change Hero Images
Edit `frontend/src/components/sections/HeroSection.jsx`:
```js
const slides = [
  { bg: 'YOUR_IMAGE_URL', heading: '...', sub: '...' },
  ...
]
```

### Change Product Categories
Edit `frontend/src/components/sections/ProductCategories.jsx`:
```js
const categories = [
  { name: 'Your Category', desc: 'Description', img: 'IMAGE_URL' },
  ...
]
```

### Change Admin Password
Either:
1. Update `ADMIN_PASSWORD` in `backend/.env` and delete the admin from MongoDB (it will re-seed)
2. Or directly update in MongoDB Atlas

---

## 19. Troubleshooting

### MongoDB connection failed
```
❌ MongoDB connection failed: querySrv ECONNREFUSED
```
**Fix:**
1. Open PowerShell as Administrator
2. Run: `netsh interface ip set dns "Wi-Fi" static 8.8.8.8`
3. Run: `ipconfig /flushdns`
4. Try again

Or switch to mobile hotspot — some ISPs block MongoDB port 27017.

### Frontend build fails — missing export
```
"Instagram" is not exported by lucide-react
```
**Fix:** Use inline SVG for social icons instead of lucide-react social icons (already fixed in current code).

### Black screen when scrolling
**Fix:** Each section needs its own `<Suspense>` wrapper (already fixed in current `Home.jsx`).

### WhyChooseUs error
```
An error occurred in the <div> component
```
**Fix:** Replace `react-countup` with custom Counter component (already fixed in current code).

### Admin login not working
- Check `ADMIN_USERNAME` and `ADMIN_PASSWORD` in `backend/.env`
- Check MongoDB is connected (backend terminal should show ✅)
- Check browser console for API errors

### Images not uploading
- Check Cloudinary credentials in `backend/.env`
- Check file size (max 10MB for images)
- Check file type (JPG, PNG, WebP only)

### Videos not uploading
- Check file size (max 200MB)
- Check file type (MP4, MOV, WebM only)
- Video uploads can take 30-60 seconds depending on file size

---

## Quick Reference Card

```
START BACKEND:   cd backend && npm run dev
START FRONTEND:  cd frontend && npm run dev

WEBSITE:         http://localhost:5173
GALLERY PAGE:    http://localhost:5173/gallery
ADMIN LOGIN:     http://localhost:5173/admin/login
ADMIN PANEL:     http://localhost:5173/admin/dashboard
GALLERY MANAGER: http://localhost:5173/admin/gallery-manager
VIDEO MANAGER:   http://localhost:5173/admin/video-manager

DEFAULT LOGIN:   admin / admin123
API HEALTH:      http://localhost:5000/api/health
```

---

*Built for Gauri Interiors — Premium Luxury Interior Design & Blinds, Hyderabad*
