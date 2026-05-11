import { useEffect, useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn, ChevronLeft, ChevronRight, Info, Search, SlidersHorizontal } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { galleryAPI } from '../services/api'
import { GallerySkeleton } from '../components/ui/Skeleton'
import ScrollProgress from '../components/ui/ScrollProgress'

const fallbackImages = [
  { _id: '1',  imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80', caption: 'Modern Living Room',    category: 'Living Room' },
  { _id: '2',  imageUrl: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80', caption: 'Luxury Bedroom',         category: 'Bedroom' },
  { _id: '3',  imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80', caption: 'Premium Blinds',         category: 'Blinds' },
  { _id: '4',  imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',    caption: 'Elegant Sofa',           category: 'Living Room' },
  { _id: '5',  imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', caption: 'Kitchen Design',         category: 'Kitchen' },
  { _id: '6',  imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80', caption: 'Dining Area',            category: 'Dining' },
  { _id: '7',  imageUrl: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=800&q=80', caption: 'Curtain Installation',   category: 'Blinds' },
  { _id: '8',  imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',    caption: 'Roller Blinds',          category: 'Blinds' },
  { _id: '9',  imageUrl: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80', caption: 'Cozy Bedroom',           category: 'Bedroom' },
  { _id: '10', imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',    caption: 'Modern Kitchen',         category: 'Kitchen' },
  { _id: '11', imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80', caption: 'Master Bedroom',         category: 'Bedroom' },
  { _id: '12', imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80', caption: 'Wooden Blinds',          category: 'Blinds' },
]

const SORT_OPTIONS = [
  { label: 'Newest First', value: 'newest' },
  { label: 'Oldest First', value: 'oldest' },
]

export default function GalleryPage() {
  const [images, setImages]         = useState([])
  const [loading, setLoading]       = useState(true)
  const [filter, setFilter]         = useState('All')
  const [search, setSearch]         = useState('')
  const [sort, setSort]             = useState('newest')
  const [showFilters, setShowFilters] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [showDetails, setShowDetails]     = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
    galleryAPI.getAll({ limit: 100 })
      .then((res) => setImages(res.data?.data?.length ? res.data.data : fallbackImages))
      .catch(() => setImages(fallbackImages))
      .finally(() => setLoading(false))
  }, [])

  const categories = ['All', ...new Set(images.map((img) => img.category).filter(Boolean))]

  const filtered = images
    .filter((img) => filter === 'All' || img.category === filter)
    .filter((img) => !search || img.caption?.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => sort === 'newest'
      ? new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      : new Date(a.createdAt || 0) - new Date(b.createdAt || 0)
    )

  const openLightbox = (index) => { setLightboxIndex(index); setShowDetails(false) }
  const closeLightbox = () => setLightboxIndex(null)
  const prev = useCallback(() => setLightboxIndex((i) => (i - 1 + filtered.length) % filtered.length), [filtered.length])
  const next = useCallback(() => setLightboxIndex((i) => (i + 1) % filtered.length), [filtered.length])

  useEffect(() => {
    if (lightboxIndex === null) return
    const handler = (e) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'Escape') closeLightbox()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightboxIndex, prev, next])

  const currentImage = lightboxIndex !== null ? filtered[lightboxIndex] : null

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <ScrollProgress />
      <Navbar isPage />

      {/* Hero banner */}
      <div className="relative h-64 md:h-80 overflow-hidden flex items-end">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#0A0A0A]" />
        <div className="relative z-10 container-custom pb-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-[11px] tracking-[0.5em] text-[#C9A84C] uppercase mb-2">Our Work</p>
            <h1 className="font-['Cormorant_Garamond'] text-4xl md:text-6xl text-white">
              Project <span className="gold-text italic">Gallery</span>
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="container-custom py-8 pb-32">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
          {/* Search */}
          <div className="relative w-full sm:w-72">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#111] border border-white/10 pl-9 pr-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#C9A84C] transition-colors"
            />
          </div>

          <div className="flex items-center gap-3">
            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-[#111] border border-white/10 px-3 py-2.5 text-xs text-white/60 focus:outline-none focus:border-[#C9A84C] transition-colors"
            >
              {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>

            {/* Filter toggle mobile */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="sm:hidden flex items-center gap-2 px-3 py-2.5 border border-white/10 text-white/40 text-xs hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all"
            >
              <SlidersHorizontal size={14} /> Filters
            </button>

            {/* Result count */}
            <span className="text-white/20 text-xs hidden sm:block">{filtered.length} projects</span>
          </div>
        </div>

        {/* Category filters */}
        <AnimatePresence>
          {(showFilters || true) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="flex flex-wrap gap-2 mb-10"
            >
              {categories.map((cat) => (
                <motion.button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-1.5 text-xs tracking-widest uppercase transition-all duration-300 rounded-full ${
                    filter === cat
                      ? 'bg-[#C9A84C] text-black'
                      : 'border border-white/10 text-white/50 hover:border-[#C9A84C] hover:text-[#C9A84C]'
                  }`}
                >
                  {cat}
                </motion.button>
              ))}
              <span className="text-white/20 text-xs self-center ml-2 sm:hidden">{filtered.length} results</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Masonry Grid */}
        {loading ? (
          <GallerySkeleton />
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-white/20 text-sm">No projects found</p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
            {filtered.map((img, i) => (
              <motion.div
                key={img._id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ delay: i * 0.03, duration: 0.4 }}
                className="break-inside-avoid mb-4 group relative overflow-hidden cursor-pointer"
                onClick={() => openLightbox(i)}
              >
                <img
                  src={img.imageUrl}
                  alt={img.caption}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Zoom icon — desktop hover only */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 hidden sm:flex items-center justify-center">
                  <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={28} />
                </div>
                {/* Caption: always visible on mobile, slide up on desktop hover */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/85 to-transparent sm:translate-y-full sm:group-hover:translate-y-0 sm:transition-transform sm:duration-300">
                  <p className="text-white text-xs font-500 leading-snug">{img.caption}</p>
                  {img.category && (
                    <span className="inline-block mt-1 px-2 py-0.5 text-[9px] tracking-widest uppercase bg-[#C9A84C22] text-[#C9A84C] border border-[#C9A84C33]">
                      {img.category}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <div className="pb-20" />
      <Footer />

      {/* Fullscreen Lightbox */}
      <AnimatePresence>
        {currentImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-black/97 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Top controls */}
            <div className="absolute top-5 right-5 z-10 flex gap-2">
              <button
                className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-[#C9A84C] border border-white/10 hover:border-[#C9A84C33] transition-all"
                onClick={(e) => { e.stopPropagation(); setShowDetails(!showDetails) }}
              >
                <Info size={16} />
              </button>
              <button
                className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-white border border-white/10 hover:border-white/30 transition-all"
                onClick={closeLightbox}
              >
                <X size={16} />
              </button>
            </div>

            {/* Prev / Next */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center text-white/50 hover:text-white border border-white/10 hover:border-white/30 transition-all"
              onClick={(e) => { e.stopPropagation(); prev() }}
            >
              <ChevronLeft size={22} />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center text-white/50 hover:text-white border border-white/10 hover:border-white/30 transition-all"
              onClick={(e) => { e.stopPropagation(); next() }}
            >
              <ChevronRight size={22} />
            </button>

            {/* Image */}
            <motion.img
              key={currentImage._id}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.3 }}
              src={currentImage.imageUrl}
              alt={currentImage.caption}
              className="max-w-[80vw] max-h-[85vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Details panel */}
            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 40 }}
                  className="absolute right-0 top-0 bottom-0 w-72 glass-dark p-8 flex flex-col justify-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <p className="text-[10px] tracking-[0.4em] text-[#C9A84C] uppercase mb-4">Project Details</p>
                  <h3 className="font-['Cormorant_Garamond'] text-2xl text-white mb-3">
                    {currentImage.caption || 'Untitled Project'}
                  </h3>
                  {currentImage.category && (
                    <span className="inline-block px-3 py-1 text-xs tracking-widest uppercase bg-[#C9A84C22] text-[#C9A84C] border border-[#C9A84C33] mb-4 w-fit">
                      {currentImage.category}
                    </span>
                  )}
                  <p className="text-white/40 text-xs leading-relaxed">
                    A premium interior transformation by Gauri Interiors, crafted with attention to detail and luxury materials.
                  </p>
                  <div className="mt-6 pt-6 border-t border-white/5 text-white/20 text-xs">
                    {lightboxIndex + 1} of {filtered.length}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/30 text-xs tracking-widest">
              {lightboxIndex + 1} / {filtered.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
