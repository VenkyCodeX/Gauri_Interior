## 🚀 Deployment Guide

### Recommended Hosting Stack

| Layer | Service | Why |
|---|---|---|
| Frontend | **Vercel** | Zero-config, CDN, auto-deploy from Git |
| Backend | **Render** or **Railway** | Free tier, Node.js support, env vars |
| Database | **MongoDB Atlas** | Free 512MB, global clusters |
| Media | **Cloudinary** | Auto-optimization, CDN delivery |

---

### Frontend → Vercel

1. Push `frontend/` to GitHub
2. Import repo on [vercel.com](https://vercel.com)
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Add env variable: `VITE_API_URL=https://your-backend.onrender.com`

Update `frontend/src/services/api.js` baseURL:
```js
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || '/api' })
```

---

### Backend → Render

1. Push `backend/` to GitHub
2. Create new **Web Service** on [render.com](https://render.com)
3. Build command: `npm install`
4. Start command: `node server.js`
5. Add all `.env` variables in Render dashboard

---

### MongoDB Atlas

1. Create free cluster at [mongodb.com/atlas](https://mongodb.com/atlas)
2. Whitelist `0.0.0.0/0` for Render IPs
3. Copy connection string → set as `MONGO_URI` in Render

---

### Cloudinary

1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Copy Cloud Name, API Key, API Secret
3. Set in Render environment variables

---

### Post-Deployment Checklist

- [ ] Change admin password from `admin123`
- [ ] Update `FRONTEND_URL` in backend `.env` to Vercel URL
- [ ] Update CORS origins in `server.js`
- [ ] Set `NODE_ENV=production` on Render
- [ ] Update Google Maps embed with real location
- [ ] Update WhatsApp number
- [ ] Update phone/email in Footer and Contact
- [ ] Replace placeholder images with real project photos
- [ ] Submit sitemap to Google Search Console
- [ ] Set up Google Analytics
