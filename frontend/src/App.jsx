import React, { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import CustomCursor from './components/ui/CustomCursor'
import ScrollProgress from './components/ui/ScrollProgress'
import Home from './pages/Home'
import GalleryPage from './pages/GalleryPage'
import GalleryManager from './pages/admin/GalleryManager'
import VideoManager from './pages/admin/VideoManager'
import VideoGalleryPage from './pages/VideoGalleryPage'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import ProtectedRoute from './components/admin/ProtectedRoute'

export default function App() {
  const lenisRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.4, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    lenisRef.current = lenis

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  return (
    <AuthProvider>
      <Router>
        <CustomCursor />
        <ScrollProgress />
        <Toaster position="top-right" toastOptions={{ style: { background: '#1A1A1A', color: '#fff', border: '1px solid #C9A84C33' } }} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/videos" element={<VideoGalleryPage />} />
          <Route path="/admin/gallery-manager" element={<ProtectedRoute><GalleryManager /></ProtectedRoute>} />
          <Route path="/admin/video-manager" element={<ProtectedRoute><VideoManager /></ProtectedRoute>} />
          <Route path="/admin/*" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}
