import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Shield, Award, Users, Briefcase, CheckCircle, Star, Zap, Heart } from 'lucide-react'

function Counter({ value, duration = 2000, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = value / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= value) { setCount(value); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [inView, value, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

const stats = [
  { icon: Users,     value: 2500, suffix: '+', label: 'Happy Customers' },
  { icon: Briefcase, value: 3200, suffix: '+', label: 'Projects Done' },
  { icon: Award,     value: 14,   suffix: '+', label: 'Years Experience' },
  { icon: Shield,    value: 100,  suffix: '%', label: 'Quality Assured' },
]

const features = [
  { icon: CheckCircle, title: 'Premium Materials',   desc: 'Only the finest fabrics and materials sourced globally' },
  { icon: Star,        title: 'Expert Installation', desc: 'Certified professionals ensuring perfect fit every time' },
  { icon: Zap,         title: 'Custom Designs',      desc: 'Bespoke solutions tailored to your unique space' },
  { icon: Heart,       title: 'After-Sales Support', desc: 'Dedicated support team for lifetime assistance' },
]

export default function WhyChooseUs() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="section-padding bg-[#0A0A0A] relative overflow-hidden">
      {/* Subtle gold glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#C9A84C] opacity-[0.04] blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#C9A84C] opacity-[0.03] blur-[100px]" />
      </div>

      <div className="container-custom relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-[11px] tracking-[0.5em] text-[#C9A84C] uppercase mb-4">Why Choose Us</p>
          <h2 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl text-white mb-4">
            Excellence in Every <span className="gold-text italic">Detail</span>
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="w-20 h-px mx-auto mt-4 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent"
          />
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="relative p-6 text-center group cursor-default overflow-hidden"
              style={{ background: 'rgba(201,168,76,0.04)', border: '1px solid rgba(201,168,76,0.12)' }}
            >
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.1) 0%, transparent 70%)' }}
              />
              <div
                className="w-12 h-12 mx-auto mb-4 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)' }}
              >
                <stat.icon size={20} className="text-[#C9A84C]" />
              </div>
              <div className="font-['Cormorant_Garamond'] text-4xl gold-text font-600 mb-1">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-white/40 text-xs tracking-wider uppercase">{stat.label}</p>
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-px origin-left"
                animate={{ scaleX: inView ? 1 : 0 }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                style={{ background: 'linear-gradient(90deg, #C9A84C, transparent)' }}
              />
            </motion.div>
          ))}
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
              whileHover={{ x: 4 }}
              className="group cursor-default"
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-8 h-8 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
                  style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)' }}
                >
                  <f.icon size={14} className="text-[#C9A84C]" />
                </div>
                <motion.div
                  className="h-px flex-1 origin-left"
                  animate={{ scaleX: inView ? 1 : 0 }}
                  transition={{ delay: 0.6 + i * 0.1, duration: 0.6 }}
                  style={{ background: 'linear-gradient(90deg, rgba(201,168,76,0.5), transparent)' }}
                />
              </div>
              <h3 className="text-white text-sm font-500 mb-2 group-hover:text-[#C9A84C] transition-colors duration-300">
                {f.title}
              </h3>
              <p className="text-white/40 text-xs leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
