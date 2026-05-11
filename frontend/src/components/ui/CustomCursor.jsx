import { useEffect, useState } from 'react'

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [trail, setTrail] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', move)

    const interval = setInterval(() => {
      setTrail((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.12,
        y: prev.y + (pos.y - prev.y) * 0.12,
      }))
    }, 16)

    const addHover = () => {
      document.querySelectorAll('a, button, [data-cursor]').forEach((el) => {
        el.addEventListener('mouseenter', () => setHovered(true))
        el.addEventListener('mouseleave', () => setHovered(false))
      })
    }
    addHover()

    return () => {
      window.removeEventListener('mousemove', move)
      clearInterval(interval)
    }
  }, [pos.x, pos.y])

  return (
    <>
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{ transform: `translate(${pos.x - 6}px, ${pos.y - 6}px)`, transition: 'transform 0.05s linear' }}
      >
        <div className={`rounded-full bg-white transition-all duration-200 ${hovered ? 'w-4 h-4' : 'w-3 h-3'}`} />
      </div>
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{ transform: `translate(${trail.x - 20}px, ${trail.y - 20}px)` }}
      >
        <div className={`rounded-full border border-[#C9A84C] transition-all duration-300 ${hovered ? 'w-12 h-12 bg-[#C9A84C11]' : 'w-10 h-10'}`} />
      </div>
    </>
  )
}
