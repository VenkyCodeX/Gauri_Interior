import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const comparisons = [
  {
    before: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80',
    label: 'Living Room Transformation',
  },
  {
    before: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80',
    label: 'Bedroom Makeover',
  },
  {
    before: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    label: 'Kitchen Redesign',
  },
  {
    before: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80',
    label: 'Blinds Installation',
  },
]

export default function BeforeAfterSection() {
  const ref = useRef(null)
  const scrollRef = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const scroll = (dir) => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({ left: dir * 340, behavior: 'smooth' })
  }

  return (
    <section className="section-padding bg-[#0A0A0A]" ref={ref}>
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <p className="text-[11px] tracking-[0.5em] text-[#C9A84C] uppercase mb-3">The Difference</p>
            <h2 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl text-white">
              Before & <span className="gold-text italic">After</span>
            </h2>
            <p className="text-white/40 text-sm mt-2">Drag the slider to witness the transformation</p>
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

        {/* Horizontal scroll */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 cursor-grab active:cursor-grabbing"
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
            el.scrollLeft = el.scrollLeftStart - (e.pageX - el.offsetLeft - el.startX)
          }}
          onMouseUp={() => { scrollRef.current.isDragging = false }}
          onMouseLeave={() => { scrollRef.current.isDragging = false }}
        >
          {comparisons.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className="flex-shrink-0 w-72 sm:w-80 group"
            >
              <div className="overflow-hidden border border-white/5 group-hover:border-[#C9A84C33] transition-all duration-500">
                <ReactCompareSlider
                  itemOne={
                    <ReactCompareSliderImage
                      src={item.before}
                      alt={`Before — ${item.label}`}
                      style={{ objectFit: 'cover' }}
                    />
                  }
                  itemTwo={
                    <ReactCompareSliderImage
                      src={item.after}
                      alt={`After — ${item.label}`}
                      style={{ objectFit: 'cover' }}
                    />
                  }
                  style={{ height: '300px' }}
                  handle={
                    <div className="flex items-center justify-center w-9 h-9 rounded-full bg-[#C9A84C] shadow-[0_0_20px_rgba(201,168,76,0.5)] cursor-ew-resize">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-black">
                        <path d="M8 5l-7 7 7 7V5zm8 0v14l7-7-7-7z" />
                      </svg>
                    </div>
                  }
                />
              </div>
              <div className="mt-3 flex items-center justify-between px-1">
                <p className="text-white/60 text-xs tracking-wider">{item.label}</p>
                <div className="flex gap-3 text-[10px] tracking-widest uppercase">
                  <span className="text-white/25">Before</span>
                  <span className="text-[#C9A84C]">After</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile hint */}
        <p className="sm:hidden text-center text-white/20 text-xs tracking-widest mt-4 uppercase">
          ← Swipe to explore →
        </p>
      </div>
    </section>
  )
}
