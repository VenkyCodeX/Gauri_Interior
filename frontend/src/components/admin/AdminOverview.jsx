import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Images, Video, MessageSquare, Star, TrendingUp } from 'lucide-react'
import { statsAPI } from '../../services/api'

export default function AdminOverview() {
  const [stats, setStats] = useState({ gallery: 0, videos: 0, inquiries: 0, testimonials: 0 })

  useEffect(() => {
    statsAPI.get().then((res) => setStats(res.data)).catch(() => {})
  }, [])

  const cards = [
    { label: 'Gallery Items', value: stats.gallery, icon: Images, color: '#C9A84C' },
    { label: 'Videos', value: stats.videos, icon: Video, color: '#8B5CF6' },
    { label: 'Inquiries', value: stats.inquiries, icon: MessageSquare, color: '#10B981' },
    { label: 'Testimonials', value: stats.testimonials, icon: Star, color: '#F59E0B' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-white text-2xl font-['Cormorant_Garamond'] mb-1">Dashboard Overview</h1>
        <p className="text-white/30 text-sm">Welcome back to Gauri Interiors admin panel</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#111111] border border-white/5 p-6 hover:border-white/10 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 flex items-center justify-center" style={{ background: `${card.color}15` }}>
                <card.icon size={18} style={{ color: card.color }} />
              </div>
              <TrendingUp size={14} className="text-white/20" />
            </div>
            <p className="text-3xl font-['Cormorant_Garamond'] text-white mb-1">{card.value}</p>
            <p className="text-white/30 text-xs tracking-wider uppercase">{card.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="bg-[#111111] border border-white/5 p-6">
        <h3 className="text-white text-sm font-500 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Upload Photo', href: '/admin/gallery' },
            { label: 'Upload Video', href: '/admin/videos' },
            { label: 'Add Testimonial', href: '/admin/testimonials' },
            { label: 'View Inquiries', href: '/admin/inquiries' },
          ].map((action) => (
            <a
              key={action.label}
              href={action.href}
              className="px-4 py-3 border border-white/10 text-white/50 text-xs tracking-wider uppercase text-center hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all duration-300"
            >
              {action.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
