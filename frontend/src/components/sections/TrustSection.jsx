import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star, Shield, MapPin, Clock, Award, ThumbsUp } from 'lucide-react'

const trustItems = [
  {
    icon: Star,
    title: '4.9 / 5 Rating',
    desc: 'Based on 250+ Google reviews',
    highlight: true,
  },
  {
    icon: Shield,
    title: 'Installation Guarantee',
    desc: '2-year warranty on all installations',
  },
  {
    icon: Clock,
    title: 'On-Time Delivery',
    desc: '98% projects delivered on schedule',
  },
  {
    icon: Award,
    title: 'Certified Professionals',
    desc: 'ISO-certified installation team',
  },
  {
    icon: ThumbsUp,
    title: 'Free Consultation',
    desc: 'No-obligation home visit & quote',
  },
  {
    icon: MapPin,
    title: 'Serving Hyderabad',
    desc: 'Banjara Hills · Jubilee Hills · Gachibowli · Kondapur · Madhapur · Hitec City',
  },
]

export default function TrustSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="section-padding bg-[#0A0A0A]" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.5em] text-[#C9A84C] uppercase mb-4">Why Trust Us</p>
          <h2 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl text-white mb-4">
            Hyderabad's Most <span className="gold-text italic">Trusted</span> Studio
          </h2>
          <p className="text-white/40 text-sm max-w-xl mx-auto">
            14+ years of transforming homes across Hyderabad with unmatched quality
          </p>
        </motion.div>

        {/* Google Rating Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass border border-[#C9A84C22] p-6 mb-10 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-10 h-10">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </div>
            <div>
              <p className="text-white font-500 text-sm">Google Reviews</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} size={14} className="text-[#FBBC05] fill-[#FBBC05]" />
                  ))}
                </div>
                <span className="text-white font-600 text-sm">4.9</span>
                <span className="text-white/40 text-xs">(250+ reviews)</span>
              </div>
            </div>
          </div>
          <a
            href="https://g.page/r/gauriinteriors/review"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 border border-[#C9A84C] text-[#C9A84C] text-xs tracking-widest uppercase hover:bg-[#C9A84C] hover:text-black transition-all duration-300 whitespace-nowrap"
          >
            Write a Review
          </a>
        </motion.div>

        {/* Trust grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {trustItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
              className={`p-5 border transition-all duration-300 group hover:border-[#C9A84C33] ${
                item.highlight ? 'border-[#C9A84C33] bg-[#C9A84C08]' : 'border-white/5 bg-[#111111]'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 flex items-center justify-center shrink-0 ${
                  item.highlight ? 'bg-[#C9A84C22]' : 'bg-white/5'
                } group-hover:bg-[#C9A84C15] transition-all duration-300`}>
                  <item.icon size={18} className="text-[#C9A84C]" />
                </div>
                <div>
                  <h3 className="text-white text-sm font-500 mb-1">{item.title}</h3>
                  <p className="text-white/40 text-xs leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
