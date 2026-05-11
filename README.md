# Gauri Interiors — Premium Luxury Interior & Blinds Website

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Cloudinary account

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```
Runs at: http://localhost:5173

---

## Backend Setup

```bash
cd backend
# Edit .env with your MongoDB URI and Cloudinary credentials
npm run dev
```
Runs at: http://localhost:5000

---

## Environment Variables (backend/.env)

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/gauri_interiors
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

---

## Admin Dashboard

- URL: http://localhost:5173/admin/login
- Default credentials: `admin` / `admin123`
- **Change password after first login!**

---

## Project Structure

```
Gauri_Interior/
├── frontend/               # React + Vite + Tailwind
│   └── src/
│       ├── components/
│       │   ├── layout/     # Navbar, Footer
│       │   ├── sections/   # All page sections
│       │   ├── ui/         # Cursor, ScrollProgress, Divider
│       │   └── admin/      # Admin components
│       ├── pages/
│       │   ├── Home.jsx
│       │   └── admin/      # Login, Dashboard
│       ├── context/        # AuthContext
│       └── services/       # API service
│
└── backend/                # Node.js + Express
    ├── models/             # MongoDB schemas
    ├── routes/             # REST API routes
    ├── middleware/         # Auth, Error handler
    └── config/             # Cloudinary config
```

---

## Features

### Website
- ✅ Animated splash screen
- ✅ Cinematic hero with parallax + mouse glow
- ✅ Glassmorphism sticky navbar
- ✅ 8 product category cards with 3D tilt
- ✅ Animated stats counters
- ✅ Masonry gallery with lightbox + filters
- ✅ Instagram-style video showcase
- ✅ Testimonial carousel
- ✅ Contact form + WhatsApp float button
- ✅ Custom cursor + scroll progress bar
- ✅ Lenis smooth scroll
- ✅ Framer Motion animations throughout

### Admin Dashboard
- ✅ JWT-protected login
- ✅ Dashboard overview with stats
- ✅ Drag & drop image upload (Cloudinary)
- ✅ Drag & drop video upload (Cloudinary)
- ✅ Edit captions, delete media
- ✅ Manage testimonials
- ✅ View & manage contact inquiries
