import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const letters = 'GAURI INTERIORS'.split('')

export default function SplashScreen({ onComplete }) {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 1000)
    const t2 = setTimeout(() => setPhase(2), 2800)
    const t3 = setTimeout(() => onComplete(), 3500)
    return () => [t1, t2, t3].forEach(clearTimeout)
  }, [onComplete])

  return (
    <AnimatePresence>
      {phase < 2 && (
        <motion.div
          key="splash"
          exit={{ opacity: 0, scale: 1.05, filter: 'blur(12px)' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[200] bg-[#0A0A0A] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Single gold glow */}
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full bg-[#C9A84C] blur-[150px]"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.12, scale: 1.2 }}
            transition={{ duration: 2.5, ease: 'easeOut' }}
          />

          {/* Slow rotating ring */}
          <motion.div
            className="absolute w-72 h-72 rounded-full border border-[#C9A84C15]"
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute w-52 h-52 rounded-full border border-[#C9A84C10]"
            animate={{ rotate: -360 }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          />

          {/* Corner brackets */}
          {[
            'top-10 left-10 border-t border-l',
            'top-10 right-10 border-t border-r',
            'bottom-10 left-10 border-b border-l',
            'bottom-10 right-10 border-b border-r',
          ].map((cls, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
              className={`absolute w-7 h-7 border-[#C9A84C22] ${cls}`}
            />
          ))}

          {/* Logo */}
          <div className="relative z-10 flex items-center gap-0.5 mb-5">
            {letters.map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.055, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className={`font-['Cormorant_Garamond'] text-4xl md:text-6xl font-600 ${
                  char === ' ' ? 'w-4' : 'gold-text'
                }`}
              >
                {char}
              </motion.span>
            ))}
          </div>

          {/* Tagline */}
          <AnimatePresence>
            {phase >= 1 && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 flex items-center gap-3"
              >
                <motion.div
                  className="h-px bg-[#C9A84C44]"
                  initial={{ width: 0 }}
                  animate={{ width: 32 }}
                  transition={{ duration: 0.5 }}
                />
                <p className="text-[10px] tracking-[0.45em] text-white/35 uppercase">
                  Transforming Spaces with Premium Interiors
                </p>
                <motion.div
                  className="h-px bg-[#C9A84C44]"
                  initial={{ width: 0 }}
                  animate={{ width: 32 }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Loading bar */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-44 h-px bg-white/5">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2.6, ease: 'easeInOut' }}
              className="h-full origin-left bg-gradient-to-r from-[#C9A84C] to-[#E8C97A]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
