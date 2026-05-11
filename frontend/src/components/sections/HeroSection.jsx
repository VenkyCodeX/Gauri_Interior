import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const slides = [
  {
    bg: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80',
    heading: 'Transforming Spaces',
    sub: 'with Premium Interiors',
  },
  {
    bg: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1920&q=80',
    heading: 'Luxury Blinds &',
    sub: 'Window Treatments',
  },
  {
    bg: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1920&q=80',
    heading: 'Crafting Elegance',
    sub: 'One Space at a Time',
  },
]

function MagneticButton({ children, className, onClick, style }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 25 })
  const springY = useSpring(y, { stiffness: 300, damping: 25 })

  const handleMouseMove = useCallback((e) => {
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left - rect.width / 2) * 0.25)
    y.set((e.clientY - rect.top - rect.height / 2) * 0.25)
  }, [x, y])

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY, ...style }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      className={className}
    >
      {children}
    </motion.button>
  )
}

export default function HeroSection() {
  const [current, setCurrent] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const heroRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => setCurrent((p) => (p + 1) % slides.length), 6000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const onMove = (e) => {
      if (!heroRef.current) return
      const rect = heroRef.current.getBoundingClientRect()
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 30,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 30,
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <section id="home" ref={heroRef} className="relative h-screen overflow-hidden bg-[#0A0A0A]">

      {/* ── Background slides ── */}
      {slides.map((slide, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: i === current ? 1 : 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${slide.bg})`,
              transform: `scale(1.08) translate(${mousePos.x * 0.2}px, ${mousePos.y * 0.2}px)`,
              transition: 'transform 0.15s ease-out',
            }}
          />
          {/* Clean dark overlay — no color tint */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/85" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
        </motion.div>
      ))}

      {/* ── Subtle gold glow only — no teal/purple ── */}
      <div
        className="absolute pointer-events-none z-10 w-[500px] h-[500px] rounded-full blur-[140px] bg-[#C9A84C] opacity-[0.07] transition-all duration-500"
        style={{
          left: `calc(50% + ${mousePos.x * 3}px - 250px)`,
          top: `calc(50% + ${mousePos.y * 3}px - 250px)`,
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6">

        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-[11px] tracking-[0.5em] text-[#C9A84C] uppercase mb-5"
        >
          Premium Luxury Interiors · Hyderabad
        </motion.p>

        {/* Heading */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 35, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="font-['Cormorant_Garamond'] text-[2.6rem] sm:text-5xl md:text-7xl lg:text-[5.5rem] font-300 text-white leading-[1.1] mb-3">
              {slides[current].heading}
              <br />
              <span className="gold-text italic">{slides[current].sub}</span>
            </h1>
          </motion.div>
        </AnimatePresence>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-white/50 text-sm md:text-base max-w-lg mt-5 mb-10 leading-relaxed"
        >
          Elevating living spaces with bespoke interior solutions, premium blinds, and timeless design craftsmanship.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <MagneticButton
            onClick={() => document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-9 py-4 bg-[#C9A84C] text-black text-[11px] tracking-[0.25em] uppercase font-600 hover:bg-[#E8C97A] transition-colors duration-300 min-w-[200px]"
          >
            Explore Collection
          </MagneticButton>

          <MagneticButton
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-9 py-4 border border-white/30 text-white text-[11px] tracking-[0.25em] uppercase hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all duration-300 min-w-[200px]"
          >
            Book Consultation
          </MagneticButton>
        </motion.div>

        {/* Slide indicators */}
        <div className="absolute bottom-24 sm:bottom-20 flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="transition-all duration-500 rounded-full"
              style={{
                width: i === current ? 28 : 6,
                height: 3,
                background: i === current ? '#C9A84C' : 'rgba(255,255,255,0.25)',
              }}
            />
          ))}
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="absolute bottom-6 sm:bottom-8 left-0 right-0 flex justify-center gap-8 sm:gap-16"
        >
          {[['2500+', 'Happy Clients'], ['3200+', 'Projects'], ['14+', 'Years']].map(([val, label]) => (
            <div key={label} className="text-center">
              <p className="font-['Cormorant_Garamond'] text-xl sm:text-2xl text-[#C9A84C] font-600">{val}</p>
              <p className="text-white/30 text-[9px] tracking-[0.2em] uppercase mt-0.5">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 right-6 z-20 hidden sm:flex flex-col items-center gap-2 text-white/30"
      >
        <div className="w-px h-10 bg-gradient-to-b from-transparent to-[#C9A84C66]" />
        <span className="text-[9px] tracking-[0.3em] uppercase">Scroll</span>
      </motion.div>
    </section>
  )
}
