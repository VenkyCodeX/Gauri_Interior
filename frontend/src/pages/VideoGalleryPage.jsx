import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, X } from 'lucide-react'
import { videoAPI } from '../services/api'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { VideoSkeleton } from '../components/ui/Skeleton'

const ALL = 'All'

export default function VideoGalleryPage() {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [active, setActive] = useState(null)
  const [filter, setFilter] = useState(ALL)

  useEffect(() => {
    videoAPI.getAll({ limit: 100 })
      .then((res) => setVideos(res.data?.data || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const categories = [ALL, ...Array.from(new Set(videos.map((v) => v.category).filter(Boolean)))]
  const displayed = filter === ALL ? videos : videos.filter((v) => v.category === filter)

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0A0A0A] pt-28 pb-20">
        <div className="container-custom">

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <p className="text-xs tracking-[0.5em] text-[#C9A84C] uppercase mb-4">In Action</p>
            <h1 className="font-['Cormorant_Garamond'] text-4xl md:text-6xl text-white mb-4">
              Video <span className="gold-text italic">Gallery</span>
            </h1>
            <p className="text-white/40 text-sm max-w-xl mx-auto">Watch our transformations come to life</p>
          </motion.div>

          {/* Category filters */}
          {categories.length > 1 && (
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-1.5 text-xs tracking-widest uppercase border transition-all duration-300 ${
                    filter === cat
                      ? 'border-[#C9A84C] text-[#C9A84C] bg-[#C9A84C11]'
                      : 'border-white/10 text-white/40 hover:border-white/30 hover:text-white/70'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {/* Grid */}
          {loading ? (
            <VideoSkeleton />
          ) : displayed.length === 0 ? (
            <p className="text-center text-white/20 text-sm py-24">No videos yet</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {displayed.map((video, i) => (
                <motion.div
                  key={video._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                  className="group relative overflow-hidden cursor-pointer aspect-[9/16]"
                  onClick={() => setActive(video)}
                >
                  {video.thumbnailUrl ? (
                    <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                  ) : (
                    <div className="w-full h-full bg-[#111] flex items-center justify-center">
                      <Play size={32} className="text-white/10" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full border-2 border-white/60 flex items-center justify-center group-hover:border-[#C9A84C] group-hover:bg-[#C9A84C22] transition-all duration-300">
                      <Play size={20} className="text-white ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/80">
                    <p className="text-white text-xs font-500">{video.title}</p>
                    {video.category && <p className="text-[#C9A84C] text-[10px] tracking-wider mt-0.5">{video.category}</p>}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* Play Modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setActive(null)}
          >
            <button className="absolute top-6 right-6 text-white/60 hover:text-white" onClick={() => setActive(null)}>
              <X size={28} />
            </button>
            <motion.div
              initial={{ scale: 0.85 }} animate={{ scale: 1 }} exit={{ scale: 0.85 }}
              className="w-full max-w-3xl aspect-video bg-black"
              onClick={(e) => e.stopPropagation()}
            >
              {active.videoUrl ? (
                <video src={active.videoUrl} controls autoPlay className="w-full h-full" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/30 text-sm">Video not available</div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
