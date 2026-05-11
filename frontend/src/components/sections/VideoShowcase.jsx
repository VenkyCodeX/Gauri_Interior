import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, X } from 'lucide-react'
import { videoAPI } from '../../services/api'
import { VideoSkeleton } from '../ui/Skeleton'

const fallbackVideos = [
  { _id: '1', thumbnailUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80', title: 'Living Room Transformation', videoUrl: '' },
  { _id: '2', thumbnailUrl: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600&q=80', title: 'Bedroom Makeover', videoUrl: '' },
  { _id: '3', thumbnailUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80', title: 'Blinds Installation', videoUrl: '' },
  { _id: '4', thumbnailUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80', title: 'Complete Home Decor', videoUrl: '' },
]

export default function VideoShowcase() {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [active, setActive] = useState(null)

  useEffect(() => {
    videoAPI.getAll({ limit: 8 })
      .then((res) => setVideos(res.data?.data?.length ? res.data.data : fallbackVideos))
      .catch(() => setVideos(fallbackVideos))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section id="videos" className="section-padding bg-[#0A0A0A]">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-xs tracking-[0.5em] text-[#C9A84C] uppercase mb-4">In Action</p>
          <h2 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl text-white mb-4">
            Video <span className="gold-text italic">Showcase</span>
          </h2>
          <p className="text-white/40 text-sm max-w-xl mx-auto">Watch our transformations come to life</p>
        </motion.div>

        {loading ? <VideoSkeleton /> : null}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${loading ? 'hidden' : ''}`}>
          {videos.map((video, i) => (
            <motion.div
              key={video._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden cursor-pointer aspect-[9/16]"
              onClick={() => setActive(video)}
            >
              <img
                src={video.thumbnailUrl}
                alt={video.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300" />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-14 h-14 rounded-full border-2 border-white/60 flex items-center justify-center group-hover:border-[#C9A84C] group-hover:bg-[#C9A84C22] transition-all duration-300"
                >
                  <Play size={20} className="text-white ml-1" />
                </motion.div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white text-xs font-500">{video.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setActive(null)}
          >
            <button className="absolute top-6 right-6 text-white/60 hover:text-white">
              <X size={28} />
            </button>
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="w-full max-w-3xl aspect-video bg-black"
              onClick={(e) => e.stopPropagation()}
            >
              {active.videoUrl ? (
                <video src={active.videoUrl} controls autoPlay className="w-full h-full" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/30 text-sm">
                  Video not available
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
