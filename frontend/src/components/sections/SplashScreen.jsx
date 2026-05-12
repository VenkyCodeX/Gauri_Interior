import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sofa, Bed, Bath, Lamp, Leaf, Blinds, Armchair, LayoutGrid, Home
} from 'lucide-react'

const ICONS = [
  { Icon: Sofa,       label: 'Living Room', from: { x: -300, y: 0 },    to: { x: 300, y: 0 } },
  { Icon: Bed,        label: 'Bedroom',     from: { x: 0, y: -300 },    to: { x: 0, y: 300 } },
  { Icon: Bath,       label: 'Bathroom',    from: { x: 300, y: 0 },     to: { x: -300, y: 0 } },
  { Icon: Lamp,       label: 'Lighting',    from: { x: 0, y: 300 },     to: { x: 0, y: -300 } },
  { Icon: Leaf,       label: 'Decor',       from: { x: -250, y: -250 }, to: { x: 250, y: 250 } },
  { Icon: Blinds,     label: 'Blinds',      from: { x: 250, y: -250 },  to: { x: -250, y: 250 } },
  { Icon: Armchair,   label: 'Furniture',   from: { x: -250, y: 250 },  to: { x: 250, y: -250 } },
  { Icon: LayoutGrid, label: 'Walls',       from: { x: 250, y: 250 },   to: { x: -250, y: -250 } },
]

// Each icon: 280ms in + 90ms hold + 280ms out = 650ms total
// But next starts right after previous exits → stagger by 650ms
const ICON_IN   = 0.28
const ICON_HOLD = 0.09
const ICON_OUT  = 0.28
const ICON_TOTAL = ICON_IN + ICON_HOLD + ICON_OUT  // 0.65s per icon

// All 8 icons finish at: 8 * 0.65 = 5.2s — too long, overlap them
// Start next icon when previous starts exiting: stagger = ICON_IN + ICON_HOLD = 0.37s
const STAGGER = ICON_IN + ICON_HOLD  // 0.37s

// Last icon starts at: 7 * 0.37 = 2.59s, finishes at 2.59 + 0.65 = 3.24s
// Brand reveal starts at ~3.3s
const BRAND_START = STAGGER * 7 + ICON_TOTAL + 0.1  // ~3.35s
const TOTAL_DURATION = BRAND_START + 1.2  // ~4.55s → call onComplete

const GOLD = '#C9A84C'

const corners = [
  { top: 16, left: 16,  borderTop: true,  borderLeft: true  },
  { top: 16, right: 16, borderTop: true,  borderRight: true },
  { bottom: 16, left: 16,  borderBottom: true, borderLeft: true  },
  { bottom: 16, right: 16, borderBottom: true, borderRight: true },
]

export default function SplashScreen({ onComplete }) {
  const [activeIcon, setActiveIcon] = useState(-1)   // index of currently shown icon
  const [showBrand, setShowBrand] = useState(false)

  useEffect(() => {
    // Sequence each icon
    ICONS.forEach((_, i) => {
      setTimeout(() => setActiveIcon(i), i * STAGGER * 1000)
    })

    // Hide last icon and show brand
    setTimeout(() => {
      setActiveIcon(-1)
      setShowBrand(true)
    }, BRAND_START * 1000)

    // Call onComplete
    setTimeout(() => onComplete(), TOTAL_DURATION * 1000)
  }, [onComplete])

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.04, filter: 'blur(12px)' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: '#0a0a0a',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Corner brackets */}
      {corners.map((c, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: 18, height: 18,
            top: c.top, bottom: c.bottom,
            left: c.left, right: c.right,
            borderTop:    c.borderTop    ? `1px solid rgba(201,168,76,0.3)` : 'none',
            borderBottom: c.borderBottom ? `1px solid rgba(201,168,76,0.3)` : 'none',
            borderLeft:   c.borderLeft   ? `1px solid rgba(201,168,76,0.3)` : 'none',
            borderRight:  c.borderRight  ? `1px solid rgba(201,168,76,0.3)` : 'none',
          }}
        />
      ))}

      {/* Icon stage */}
      <AnimatePresence mode="wait">
        {activeIcon >= 0 && !showBrand && (() => {
          const { Icon, label, from, to } = ICONS[activeIcon]
          return (
            <motion.div
              key={activeIcon}
              initial={{ x: from.x, y: from.y, scale: 0.6, opacity: 0 }}
              animate={{ x: 0, y: 0, scale: 1, opacity: 1 }}
              exit={{ x: to.x, y: to.y, scale: 0.65, opacity: 0 }}
              transition={{
                enter: { duration: ICON_IN, ease: [0.22, 1, 0.36, 1] },
                exit:  { duration: ICON_OUT, ease: [0.55, 0, 1, 0.45] },
                default: { duration: ICON_IN, ease: [0.22, 1, 0.36, 1] },
              }}
              style={{
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: 14,
                position: 'absolute',
              }}
            >
              <Icon size={72} color={GOLD} strokeWidth={1.2} />
              <span style={{
                fontFamily: 'Georgia, serif',
                fontSize: 12,
                letterSpacing: '5px',
                textTransform: 'uppercase',
                color: 'rgba(201,168,76,0.65)',
              }}>
                {label}
              </span>
            </motion.div>
          )
        })()}
      </AnimatePresence>

      {/* Brand reveal */}
      <AnimatePresence>
        {showBrand && (
          <motion.div
            key="brand"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 16,
              position: 'absolute',
            }}
          >
            {/* Outer ring */}
            <motion.div
              initial={{ scale: 0.75, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{
                width: 130, height: 130,
                borderRadius: '50%',
                border: '0.5px solid rgba(201,168,76,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              {/* Inner ring */}
              <div style={{
                width: 110, height: 110,
                borderRadius: '50%',
                border: '1px solid rgba(201,168,76,0.6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Home size={44} color={GOLD} strokeWidth={1.2} />
              </div>
            </motion.div>

            {/* Brand name */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.15, ease: 'easeOut' }}
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: 24,
                letterSpacing: '8px',
                textTransform: 'uppercase',
                color: '#f0ead6',
                margin: 0,
              }}
            >
              Gauri Interiors
            </motion.p>

            {/* Gold divider */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 60 }}
              transition={{ duration: 0.45, delay: 0.25, ease: 'easeOut' }}
              style={{ height: 1, background: 'rgba(201,168,76,0.5)' }}
            />

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.35 }}
              style={{
                fontSize: 11,
                letterSpacing: '5px',
                textTransform: 'uppercase',
                color: 'rgba(201,168,76,0.7)',
                margin: 0,
              }}
            >
              Premium Luxury Design
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading bar */}
      <div style={{
        position: 'absolute', bottom: 32,
        left: '50%', transform: 'translateX(-50%)',
        width: 200, height: 1,
        background: 'rgba(201,168,76,0.15)',
      }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: TOTAL_DURATION, ease: 'linear' }}
          style={{ height: '100%', background: GOLD }}
        />
      </div>
    </motion.div>
  )
}
