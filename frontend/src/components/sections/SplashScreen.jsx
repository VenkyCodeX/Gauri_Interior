import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// 5 interior SVG icons
const icons = [
  {
    label: 'Home',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
        <path d="M9 21V12h6v9" />
      </svg>
    ),
  },
  {
    label: 'Sofa',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M2 12c0-1.5 1-2.5 2.5-2.5S7 10.5 7 12v2H2v-2z" />
        <path d="M17 12c0-1.5 1-2.5 2.5-2.5S22 10.5 22 12v2h-5v-2z" />
        <path d="M7 13h10M7 9.5V7a2 2 0 012-2h6a2 2 0 012 2v2.5" />
        <path d="M5 17v1m14-1v1" />
      </svg>
    ),
  },
  {
    label: 'Blinds',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <rect x="3" y="3" width="18" height="18" rx="1" />
        <line x1="3" y1="7" x2="21" y2="7" />
        <line x1="3" y1="11" x2="21" y2="11" />
        <line x1="3" y1="15" x2="21" y2="15" />
        <line x1="3" y1="19" x2="21" y2="19" />
        <line x1="14" y1="3" x2="14" y2="21" strokeDasharray="2 2" />
      </svg>
    ),
  },
  {
    label: 'Lamp',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M9 2h6l2 8H7L9 2z" />
        <line x1="12" y1="10" x2="12" y2="20" />
        <line x1="8" y1="20" x2="16" y2="20" />
        <path d="M7 10h10" />
      </svg>
    ),
  },
  {
    label: 'Curtain',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <line x1="3" y1="3" x2="21" y2="3" />
        <path d="M5 3c0 5 4 7 4 10s-2 5-2 8" />
        <path d="M19 3c0 5-4 7-4 10s2 5 2 8" />
        <line x1="3" y1="21" x2="21" y2="21" />
      </svg>
    ),
  },
]

export default function SplashScreen({ onComplete }) {
  const [phase, setPhase] = useState(0) // 0=icons, 1=logo, 2=done
  const called = useRef(false)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 1800)
    const t2 = setTimeout(() => setPhase(2), 3200)
    const t3 = setTimeout(() => {
      if (!called.current) { called.current = true; onComplete() }
    }, 3800)
    return () => [t1, t2, t3].forEach(clearTimeout)
  }, [])

  return (
    <AnimatePresence>
      {phase < 2 && (
        <motion.div
          key="splash"
          exit={{ opacity: 0, scale: 1.05, filter: 'blur(12px)' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[200] bg-[#0A0A0A] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Gold glow */}
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full bg-[#C9A84C] blur-[150px]"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.1, scale: 1.2 }}
            transition={{ duration: 2.5, ease: 'easeOut' }}
          />

          {/* Rotating rings */}
          <motion.div className="absolute w-80 h-80 rounded-full border border-[#C9A84C15]"
            animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: 'linear' }} />
          <motion.div className="absolute w-56 h-56 rounded-full border border-[#C9A84C10]"
            animate={{ rotate: -360 }} transition={{ duration: 18, repeat: Infinity, ease: 'linear' }} />

          {/* Corner brackets */}
          {['top-10 left-10 border-t border-l', 'top-10 right-10 border-t border-r',
            'bottom-10 left-10 border-b border-l', 'bottom-10 right-10 border-b border-r'].map((cls, i) => (
            <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              className={`absolute w-7 h-7 border-[#C9A84C22] ${cls}`} />
          ))}

          {/* Phase 0 — Icons */}
          <AnimatePresence mode="wait">
            {phase === 0 && (
              <motion.div
                key="icons"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
                transition={{ duration: 0.5 }}
                className="relative z-10 flex flex-col items-center gap-8"
              >
                {/* Icons row */}
                <div className="flex items-end gap-6">
                  {icons.map((icon, i) => (
                    <motion.div
                      key={icon.label}
                      initial={{ opacity: 0, y: 30, scale: 0.7 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: i * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="flex flex-col items-center gap-2"
                    >
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ delay: i * 0.12 + 0.6, duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                        className="w-14 h-14 border border-[#C9A84C33] flex items-center justify-center text-[#C9A84C] bg-[#C9A84C08]"
                      >
                        {icon.svg}
                      </motion.div>
                      <span className="text-[9px] tracking-[0.3em] text-white/20 uppercase">{icon.label}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Animated line under icons */}
                <motion.div
                  className="h-px bg-gradient-to-r from-transparent via-[#C9A84C44] to-transparent"
                  initial={{ width: 0 }}
                  animate={{ width: 280 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                />
              </motion.div>
            )}

            {/* Phase 1 — Logo */}
            {phase === 1 && (
              <motion.div
                key="logo"
                initial={{ opacity: 0, scale: 0.9, filter: 'blur(8px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 flex flex-col items-center gap-4"
              >
                <span className="font-['Cormorant_Garamond'] text-5xl md:text-7xl font-600 gold-text tracking-widest">
                  GAURI
                </span>
                <div className="flex items-center gap-3">
                  <div className="h-px w-8 bg-[#C9A84C44]" />
                  <span className="text-[10px] tracking-[0.45em] text-white/35 uppercase">Interiors</span>
                  <div className="h-px w-8 bg-[#C9A84C44]" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Loading bar */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-44 h-px bg-white/5">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 3.4, ease: 'easeInOut' }}
              className="h-full origin-left bg-gradient-to-r from-[#C9A84C] to-[#E8C97A]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
