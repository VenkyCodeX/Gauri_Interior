import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'

const categories = [
  { name: 'Roller Blinds',   desc: 'Clean lines, modern elegance',  img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80'  },
  { name: 'Zebra Blinds',    desc: 'Dual-layer light control',       img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80' },
  { name: 'Venetian Blinds', desc: 'Timeless horizontal slats',      img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80'  },
  { name: 'Wooden Blinds',   desc: 'Natural warmth & texture',       img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80' },
  { name: 'Smart Motorized', desc: 'Automated luxury living',        img: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&q=80'  },
  { name: 'Curtains',        desc: 'Flowing fabric elegance',        img: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=600&q=80' },
  { name: 'Wallpapers',      desc: 'Transform every wall',           img: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=600&q=80' },
  { name: 'Interior Decor',  desc: 'Complete space styling',         img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80' },
]

function CategoryCard({ cat, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex-shrink-0 w-64 sm:w-72 overflow-hidden cursor-pointer group"
    >
      <div className="relative h-80 overflow-hidden">
        <motion.img
          src={cat.img}
          alt={cat.name}
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.1 : 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        <motion.div
          className="absolute inset-0 bg-[#C9A84C]"
          animate={{ opacity: hovered ? 0.08 : 0 }}
          transition={{ duration: 0.4 }}
        />
        <motion.div
          className="absolute inset-0 border border-[#C9A84C]"
          animate={{ opacity: hovered ? 0.4 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Arrow */}
        <motion.div
          className="absolute top-4 right-4 w-8 h-8 bg-[#C9A84C] flex items-center justify-center"
          animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.7 }}
          transition={{ duration: 0.25 }}
        >
          <ArrowUpRight size={14} className="text-black" />
        </motion.div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className={`font-['Cormorant_Garamond'] text-xl mb-1 transition-colors duration-300 ${hovered ? 'text-[#C9A84C]' : 'text-white'}`}>
            {cat.name}
          </h3>
          <p className="text-white/50 text-xs tracking-wider">{cat.desc}</p>
          <motion.div
            className="h-px bg-gradient-to-r from-[#C9A84C] to-transparent mt-3 origin-left"
            animate={{ scaleX: hovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>
    </motion.div>
  )
}

export default function ProductCategories() {
  const ref = useRef(null)
  const scrollRef = useRef(null)
  const inView = useInView(ref, { once: true })

  const scroll = (dir) => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({ left: dir * 300, behavior: 'smooth' })
  }

  return (
    <section id="products" className="section-padding bg-[#0D0D0D] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C33] to-transparent" />

      <div className="container-custom">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <p className="text-[11px] tracking-[0.5em] text-[#C9A84C] uppercase mb-3">Our Collections</p>
            <h2 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl text-white">
              Premium Product <span className="gold-text italic">Categories</span>
            </h2>
          </div>

          {/* Arrow controls */}
          <div className="hidden sm:flex gap-2 mb-1">
            <button
              onClick={() => scroll(-1)}
              className="w-10 h-10 border border-white/10 flex items-center justify-center text-white/40 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all duration-300"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll(1)}
              className="w-10 h-10 border border-white/10 flex items-center justify-center text-white/40 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all duration-300"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>

        {/* Horizontal scroll container */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onMouseDown={(e) => {
            const el = scrollRef.current
            el.isDragging = true
            el.startX = e.pageX - el.offsetLeft
            el.scrollLeftStart = el.scrollLeft
          }}
          onMouseMove={(e) => {
            const el = scrollRef.current
            if (!el.isDragging) return
            const x = e.pageX - el.offsetLeft
            el.scrollLeft = el.scrollLeftStart - (x - el.startX)
          }}
          onMouseUp={() => { scrollRef.current.isDragging = false }}
          onMouseLeave={() => { scrollRef.current.isDragging = false }}
        >
          {categories.map((cat, i) => (
            <CategoryCard key={cat.name} cat={cat} index={i} />
          ))}
        </div>

        {/* Scroll hint on mobile */}
        <p className="sm:hidden text-center text-white/20 text-xs tracking-widest mt-4 uppercase">
          ← Swipe to explore →
        </p>
      </div>
    </section>
  )
}
