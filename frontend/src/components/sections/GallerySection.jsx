import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn, ChevronLeft, ChevronRight, Info, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { galleryAPI } from '../../services/api'
import { GallerySkeleton } from '../ui/Skeleton'

const fallbackImages = [
  { _id: '1', imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80', caption: 'Modern Living Room', category: 'Interior' },
  { _id: '2', imageUrl: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80', caption: 'Luxury Bedroom',     category: 'Bedroom' },
  { _id: '3', imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80', caption: 'Premium Blinds',     category: 'Blinds' },
  { _id: '4', imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',    caption: 'Elegant Sofa',       category: 'Interior' },
  { _id: '5', imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', caption: 'Kitchen Design',     category: 'Kitchen' },
  { _id: '6', imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80', caption: 'Dining Area',        category: 'Interior' },
  { _id: '7', imageUrl: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=800&q=80', caption: 'Curtain Install',    category: 'Blinds' },
  { _id: '8', imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',    caption: 'Roller Blinds',      category: 'Blinds' },
]

export default function GallerySection() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [showDetails, setShowDetails] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    galleryAPI.getAll({ limit: 30 })
      .then((res) => setImages(res.data?.data?.length ? res.data.data : fallbackImages))
      .catch(() => setImages(fallbackImages))
      .finally(() => setLoading(false))
  }, [])

  const categories = ['All', ...new Set(images.map((img) => img.category).filter(Boolean))]
  const filtered = filter === 'All' ? images : images.filter((img) => img.category === filter)

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
    <section id="gallery" className="section-padding bg-[#0D0D0D]">
      <div className="container-custom">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-[11px] tracking-[0.5em] text-[#C9A84C] uppercase mb-4">Our Work</p>
          <h2 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl text-white mb-4">
            Project <span className="gold-text italic">Gallery</span>
          </h2>
          <p className="text-white/40 text-sm max-w-xl mx-auto">A showcase of our finest interior transformations</p>
        </motion.div>

        {/* Category chips */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
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
        </div>

        {/* Masonry Grid */}
        {loading ? (
          <GallerySkeleton />
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            <AnimatePresence>
              {filtered.map((img, i) => (
                <motion.div
                  key={img._id}
                  layout
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ delay: i * 0.04, duration: 0.4 }}
                  className="break-inside-avoid group relative overflow-hidden cursor-pointer"
                  onClick={() => openLightbox(i)}
                >
                  <img
                    src={img.imageUrl}
                    alt={img.caption}
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 hidden sm:flex items-center justify-center">
                    <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={28} />
                  </div>
                  {img.caption && (
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/85 to-transparent sm:translate-y-full sm:group-hover:translate-y-0 sm:transition-transform sm:duration-300">
                      <p className="text-white text-xs font-500 leading-snug">{img.caption}</p>
                      {img.category && (
                        <span className="inline-block mt-1 px-2 py-0.5 text-[9px] tracking-widest uppercase bg-[#C9A84C22] text-[#C9A84C] border border-[#C9A84C33]">
                          {img.category}
                        </span>
                      )}
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* View Full Gallery button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            onClick={() => navigate('/gallery')}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-3 px-8 py-4 border border-[#C9A84C] text-[#C9A84C] text-xs tracking-widest uppercase hover:bg-[#C9A84C] hover:text-black transition-all duration-300"
          >
            View Full Gallery <ArrowRight size={14} />
          </motion.button>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {currentImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-black/97 flex items-center justify-center"
            onClick={closeLightbox}
          >
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

            <motion.img
              key={currentImage._id}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.3 }}
              src={currentImage.imageUrl}
              alt={currentImage.caption}
              className="max-w-[85vw] max-h-[85vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 40 }}
                  className="absolute right-0 top-0 bottom-0 w-72 glass-dark p-6 flex flex-col justify-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <p className="text-[10px] tracking-[0.4em] text-[#C9A84C] uppercase mb-4">Project Details</p>
                  <h3 className="font-['Cormorant_Garamond'] text-2xl text-white mb-3">{currentImage.caption || 'Untitled'}</h3>
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

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/30 text-xs tracking-widest">
              {lightboxIndex + 1} / {filtered.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
