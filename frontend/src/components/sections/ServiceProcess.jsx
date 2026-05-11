import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MessageCircle, Ruler, Palette, Wrench, CheckCircle } from 'lucide-react'

const steps = [
  {
    icon: MessageCircle,
    step: '01',
    title: 'Free Consultation',
    desc: 'We understand your vision, lifestyle, and budget to craft the perfect design brief.',
  },
  {
    icon: Ruler,
    step: '02',
    title: 'Site Measurement',
    desc: 'Our experts visit your space for precise measurements and detailed assessment.',
  },
  {
    icon: Palette,
    step: '03',
    title: 'Design & Selection',
    desc: 'Choose from our premium catalogue with expert guidance on materials and finishes.',
  },
  {
    icon: Wrench,
    step: '04',
    title: 'Professional Installation',
    desc: 'Certified installers deliver flawless execution with zero disruption to your routine.',
  },
  {
    icon: CheckCircle,
    step: '05',
    title: 'Quality Handover',
    desc: 'Final walkthrough, quality check, and lifetime after-sales support guaranteed.',
  },
]

export default function ServiceProcess() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="section-padding bg-[#0D0D0D] overflow-hidden" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.5em] text-[#C9A84C] uppercase mb-4">How We Work</p>
          <h2 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl text-white mb-4">
            Our <span className="gold-text italic">Process</span>
          </h2>
          <p className="text-white/40 text-sm max-w-xl mx-auto">
            A seamless journey from first conversation to stunning transformation
          </p>
        </motion.div>

        {/* Desktop: horizontal timeline */}
        <div className="hidden lg:block relative">
          {/* Connecting line */}
          <div className="absolute top-12 left-0 right-0 h-px bg-white/5" />
          <motion.div
            className="absolute top-12 left-0 h-px bg-gradient-to-r from-[#C9A84C] to-[#C9A84C44] origin-left"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.3, ease: 'easeInOut' }}
          />

          <div className="grid grid-cols-5 gap-4">
            {steps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
                className="flex flex-col items-center text-center group"
              >
                {/* Icon circle */}
                <div className="relative z-10 w-24 h-24 rounded-full border border-white/10 bg-[#0D0D0D] flex flex-col items-center justify-center mb-6 group-hover:border-[#C9A84C] group-hover:bg-[#C9A84C0A] transition-all duration-500">
                  <step.icon size={22} className="text-[#C9A84C] mb-1" />
                  <span className="text-[10px] tracking-widest text-white/30 uppercase">{step.step}</span>
                </div>
                <h3 className="text-white text-sm font-500 mb-2 group-hover:text-[#C9A84C] transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-white/30 text-xs leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="lg:hidden relative pl-8">
          <div className="absolute left-3 top-0 bottom-0 w-px bg-white/5" />
          <motion.div
            className="absolute left-3 top-0 w-px bg-gradient-to-b from-[#C9A84C] to-transparent origin-top"
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.3 }}
          />

          <div className="space-y-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.12, duration: 0.5 }}
                className="relative flex gap-5 group"
              >
                {/* Dot */}
                <div className="absolute -left-8 top-1 w-6 h-6 rounded-full border border-[#C9A84C44] bg-[#0D0D0D] flex items-center justify-center group-hover:border-[#C9A84C] transition-all duration-300">
                  <div className="w-2 h-2 rounded-full bg-[#C9A84C]" />
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <step.icon size={16} className="text-[#C9A84C]" />
                    <span className="text-[10px] tracking-widest text-white/30 uppercase">{step.step}</span>
                  </div>
                  <h3 className="text-white text-sm font-500 mb-1">{step.title}</h3>
                  <p className="text-white/40 text-xs leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
