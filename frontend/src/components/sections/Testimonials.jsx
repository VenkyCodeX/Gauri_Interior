import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { testimonialAPI } from '../../services/api'

const fallback = [
  { _id: '1', name: 'Priya Sharma', role: 'Homeowner, Mumbai', review: 'Gauri Interiors transformed our home beyond imagination. The attention to detail and quality of blinds is absolutely world-class.', rating: 5 },
  { _id: '2', name: 'Rahul Mehta', role: 'Interior Architect', review: 'I recommend Gauri Interiors to all my clients. Their premium materials and expert installation make every project exceptional.', rating: 5 },
  { _id: '3', name: 'Anita Desai', role: 'Business Owner', review: 'Our office space looks stunning after the makeover. Professional team, timely delivery, and outstanding results.', rating: 5 },
]

export default function Testimonials() {
  const [items, setItems] = useState(fallback)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    testimonialAPI.getAll()
      .then((res) => { if (res.data?.data?.length) setItems(res.data.data) })
      .catch(() => {})
  }, [])

  useEffect(() => {
    const t = setInterval(() => setCurrent((p) => (p + 1) % items.length), 5000)
    return () => clearInterval(t)
  }, [items.length])

  const prev = () => setCurrent((p) => (p - 1 + items.length) % items.length)
  const next = () => setCurrent((p) => (p + 1) % items.length)

  return (
    <section className="section-padding bg-[#0D0D0D] relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-[#C9A84C] opacity-[0.03] blur-[100px]" />
      </div>

      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.5em] text-[#C9A84C] uppercase mb-4">Client Stories</p>
          <h2 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl text-white">
            What Our Clients <span className="gold-text italic">Say</span>
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5 }}
              className="glass p-10 text-center"
            >
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: items[current]?.rating || 5 }).map((_, i) => (
                  <Star key={i} size={16} className="text-[#C9A84C] fill-[#C9A84C]" />
                ))}
              </div>

              <p className="font-['Cormorant_Garamond'] text-xl md:text-2xl text-white/80 italic leading-relaxed mb-8">
                "{items[current]?.review}"
              </p>

              <div>
                <p className="text-white font-500 text-sm">{items[current]?.name}</p>
                <p className="text-[#C9A84C] text-xs tracking-wider mt-1">{items[current]?.role}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button onClick={prev} className="w-10 h-10 border border-white/10 flex items-center justify-center text-white/40 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all duration-300">
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-px transition-all duration-300 ${i === current ? 'w-8 bg-[#C9A84C]' : 'w-3 bg-white/20'}`}
                />
              ))}
            </div>
            <button onClick={next} className="w-10 h-10 border border-white/10 flex items-center justify-center text-white/40 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all duration-300">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
