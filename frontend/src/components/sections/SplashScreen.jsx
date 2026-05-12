import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sofa, Bed, Bath, Leaf, Blinds, Home } from 'lucide-react'

// ── Timing constants (ms) ──────────────────────────────────────────────────
const SCENE_DUR  = 580   // fly-in duration
const HOLD_DUR   = 260   // hold at center
const FLY_OUT    = 580   // fly-out duration
const GAP        = 80    // gap between icons

// Each icon occupies: SCENE_DUR + HOLD_DUR + FLY_OUT = 1020ms
// Next icon starts after: SCENE_DUR + HOLD_DUR + GAP = 660ms (overlaps fly-out)
const ICON_CYCLE = SCENE_DUR + HOLD_DUR + GAP   // 660ms stagger

const ICONS = [
  { Icon: Sofa,   label: 'Living Room', from: { x: -320, y: 0 },    to: { x: 320, y: 0 } },
  { Icon: Bed,    label: 'Bedroom',     from: { x: 0, y: -320 },    to: { x: 0, y: 320 } },
  { Icon: Bath,   label: 'Bathroom',    from: { x: 320, y: 0 },     to: { x: -320, y: 0 } },
  { Icon: Leaf,   label: 'Decor',       from: { x: 0, y: 320 },     to: { x: 0, y: -320 } },
  { Icon: Blinds, label: 'Blinds',      from: { x: -260, y: -260 }, to: { x: 260, y: 260 } },
]

// Last icon starts at: 4 * 660 = 2640ms, exits at: 2640 + 1020 = 3660ms
// Brand reveal starts right after last icon exits
const BRAND_START_MS = ICON_CYCLE * (ICONS.length - 1) + SCENE_DUR + HOLD_DUR + FLY_OUT  // 3660ms
const BRAND_DUR_MS   = 800
const TOTAL_MS       = 5000   // hard cap — onComplete fires here
const SAFETY_MS      = 5500   // fallback

const GOLD = '#C9A84C'

const CORNERS = [
  { top: 16,    left: 16,  borderTop: true,    borderLeft: true   },
  { top: 16,    right: 16, borderTop: true,    borderRight: true  },
  { bottom: 16, left: 16,  borderBottom: true, borderLeft: true   },
  { bottom: 16, right: 16, borderBottom: true, borderRight: true  },
]

export default function SplashScreen({ onComplete }) {
  const [activeIcon, setActiveIcon] = useState(0)
  const [iconVisible, setIconVisible] = useState(true)
  const [showBrand, setShowBrand] = useState(false)

  // Safety fallback — always fires onComplete even if animations fail
  useEffect(() => {
    const safety = setTimeout(() => onComplete?.(), SAFETY_MS)
    return () => clearTimeout(safety)
  }, [])  // eslint-disable-line

  // Main sequence
  useEffect(() => {
    const timers = []

    ICONS.forEach((_, i) => {
      const startAt = i * ICON_CYCLE

      // Show icon i
      timers.push(setTimeout(() => {
        setActiveIcon(i)
        setIconVisible(true)
      }, startAt))

      // Hide icon i (start fly-out)
      timers.push(setTimeout(() => {
        setIconVisible(false)
      }, startAt + SCENE_DUR + HOLD_DUR))
    })

    // Show brand after last icon exits
    timers.push(setTimeout(() => setShowBrand(true), BRAND_START_MS))

    // Call onComplete at hard cap
    timers.push(setTimeout(() => onComplete?.(), TOTAL_MS))

    return () => timers.forEach(clearTimeout)
  }, [onComplete])

  const { Icon, label, from, to } = ICONS[activeIcon] || ICONS[0]

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.04, filter: 'blur(12px)' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: '#0a0a0a',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Corner brackets */}
      {CORNERS.map((c, i) => (
        <div key={i} style={{
          position: 'absolute', width: 18, height: 18,
          top: c.top, bottom: c.bottom, left: c.left, right: c.right,
          borderTop:    c.borderTop    ? `1px solid rgba(201,168,76,0.3)` : 'none',
          borderBottom: c.borderBottom ? `1px solid rgba(201,168,76,0.3)` : 'none',
          borderLeft:   c.borderLeft   ? `1px solid rgba(201,168,76,0.3)` : 'none',
          borderRight:  c.borderRight  ? `1px solid rgba(201,168,76,0.3)` : 'none',
        }} />
      ))}

      {/* Icon stage */}
      <AnimatePresence mode="wait">
        {iconVisible && !showBrand && (
          <motion.div
            key={activeIcon}
            initial={{ x: from.x, y: from.y, scale: 0.6, opacity: 0 }}
            animate={{ x: 0, y: 0, scale: 1, opacity: 1 }}
            exit={{ x: to.x, y: to.y, scale: 0.65, opacity: 0 }}
            transition={{
              default: { duration: SCENE_DUR / 1000, ease: [0.22, 1, 0.36, 1] },
              exit:    { duration: FLY_OUT / 1000,   ease: [0.55, 0, 1, 0.45] },
            }}
            style={{
              position: 'absolute',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 14,
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
        )}
      </AnimatePresence>

      {/* Brand reveal */}
      <AnimatePresence>
        {showBrand && (
          <motion.div
            key="brand"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 16,
            }}
          >
            {/* Rings + icon */}
            <motion.div
              initial={{ scale: 0.75, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{
                width: 130, height: 130, borderRadius: '50%',
                border: '0.5px solid rgba(201,168,76,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <div style={{
                width: 110, height: 110, borderRadius: '50%',
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
                fontFamily: 'Georgia, serif', fontSize: 24,
                letterSpacing: '8px', textTransform: 'uppercase',
                color: '#f0ead6', margin: 0,
              }}
            >
              Gauri Interiors
            </motion.p>

            {/* Divider */}
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
                fontSize: 11, letterSpacing: '5px',
                textTransform: 'uppercase',
                color: 'rgba(201,168,76,0.7)', margin: 0,
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
          transition={{ duration: TOTAL_MS / 1000, ease: 'linear' }}
          style={{ height: '100%', background: GOLD }}
        />
      </div>
    </motion.div>
  )
}
