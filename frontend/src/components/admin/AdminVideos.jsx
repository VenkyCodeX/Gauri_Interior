import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import { Upload, Trash2, Edit2, Check, X, Search, ChevronLeft, ChevronRight, Eye, Play } from 'lucide-react'
import { videoAPI } from '../../services/api'
import toast from 'react-hot-toast'

const CATEGORIES = ['Living Room', 'Bedroom', 'Kitchen', 'Blinds', 'Curtains', 'Full Home', 'Office', 'Other']
const PAGE_SIZE = 12

export default function AdminVideos() {
  const [items, setItems] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [uploading, setUploading] = useState(false)
  const [uploadQueue, setUploadQueue] = useState([])
  const [editId, setEditId] = useState(null)
  const [editData, setEditData] = useState({ title: '', category: '' })
  const [preview, setPreview] = useState(null)
  const [showUpload, setShowUpload] = useState(false)
  const [newMeta, setNewMeta] = useState({ title: '', category: 'Living Room' })

  const fetchItems = useCallback(() => {
    videoAPI.getAll({ limit: PAGE_SIZE, page })
      .then((r) => { setItems(r.data.data || []); setTotal(r.data.total || 0) })
      .catch(() => {})
  }, [page])

  useEffect(() => { fetchItems() }, [fetchItems])

  const displayed = items.filter((v) =>
    !search || v.title?.toLowerCase().includes(search.toLowerCase())
  )

  const onDrop = useCallback(async (files) => {
    setUploading(true)
    const queue = files.map((f) => ({ name: f.name, progress: 0, done: false, error: false }))
    setUploadQueue(queue)

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const fd = new FormData()
      fd.append('video', file)
      fd.append('title', newMeta.title || file.name.replace(/\.[^/.]+$/, ''))
      fd.append('category', newMeta.category)
      setUploadQueue((prev) => prev.map((q, idx) => idx === i ? { ...q, progress: 40 } : q))
      try {
        await videoAPI.upload(fd)
        setUploadQueue((prev) => prev.map((q, idx) => idx === i ? { ...q, progress: 100, done: true } : q))
        toast.success(`Uploaded: ${file.name}`)
      } catch {
        setUploadQueue((prev) => prev.map((q, idx) => idx === i ? { ...q, error: true } : q))
        toast.error(`Failed: ${file.name}`)
      }
    }
    setUploading(false)
    setTimeout(() => { setUploadQueue([]); setShowUpload(false); setNewMeta({ title: '', category: 'Living Room' }) }, 1500)
    fetchItems()
  }, [newMeta, fetchItems])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'video/mp4': [], 'video/quicktime': [], 'video/webm': [] },
    multiple: true,
    disabled: uploading,
  })

  const handleDelete = async (id) => {
    if (!window.confirm('Permanently delete this video?')) return
    try { await videoAPI.delete(id); toast.success('Deleted'); fetchItems() }
    catch { toast.error('Delete failed') }
  }

  const startEdit = (v) => { setEditId(v._id); setEditData({ title: v.title || '', category: v.category || '' }) }

  const saveEdit = async (id) => {
    try { await videoAPI.update(id, editData); toast.success('Updated'); setEditId(null); fetchItems() }
    catch { toast.error('Update failed') }
  }

  const totalPages = Math.ceil(total / PAGE_SIZE)

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-white text-2xl font-['Cormorant_Garamond'] mb-1">Video Management</h1>
          <p className="text-white/30 text-sm">{total} total videos</p>
        </div>
        <motion.button
          onClick={() => setShowUpload(true)}
          whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 px-4 py-2 bg-[#C9A84C] text-black text-xs tracking-widest uppercase font-600 hover:bg-[#E8C97A] transition-colors"
        >
          <Upload size={14} /> Upload Videos
        </motion.button>
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {showUpload && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/80 flex items-center justify-center p-4"
            onClick={() => !uploading && setShowUpload(false)}
          >
            <motion.div
              initial={{ scale: 0.92 }} animate={{ scale: 1 }} exit={{ scale: 0.92 }}
              className="bg-[#111] border border-white/10 w-full max-w-lg p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-white font-['Cormorant_Garamond'] text-2xl">Upload Videos</h2>
                {!uploading && <button onClick={() => setShowUpload(false)} className="text-white/30 hover:text-white"><X size={18} /></button>}
              </div>
              <div className="grid grid-cols-2 gap-4 mb-5">
                <div>
                  <label className="text-[10px] tracking-widest text-white/40 uppercase block mb-2">Title</label>
                  <input type="text" placeholder="e.g. Living Room Makeover" value={newMeta.title}
                    onChange={(e) => setNewMeta({ ...newMeta, title: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 px-3 py-2 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#C9A84C] transition-colors" />
                </div>
                <div>
                  <label className="text-[10px] tracking-widest text-white/40 uppercase block mb-2">Category</label>
                  <select value={newMeta.category} onChange={(e) => setNewMeta({ ...newMeta, category: e.target.value })}
                    className="w-full bg-[#1A1A1A] border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:border-[#C9A84C] transition-colors">
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div {...getRootProps()} className={`border-2 border-dashed p-10 text-center cursor-pointer transition-all duration-300 mb-5 ${isDragActive ? 'border-[#C9A84C] bg-[#C9A84C08]' : 'border-white/10 hover:border-white/20'} ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                <input {...getInputProps()} />
                <Upload size={28} className={`mx-auto mb-3 ${isDragActive ? 'text-[#C9A84C]' : 'text-white/20'}`} />
                <p className="text-white/40 text-sm">{uploading ? 'Uploading...' : isDragActive ? 'Drop videos here' : 'Drag & drop or click to select'}</p>
                <p className="text-white/20 text-xs mt-1">MP4, MOV, WebM · Max 200MB each</p>
              </div>
              {uploadQueue.length > 0 && (
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {uploadQueue.map((q, i) => (
                    <div key={i} className="bg-white/5 p-2.5">
                      <div className="flex items-center justify-between mb-1.5">
                        <p className="text-white/60 text-xs truncate flex-1 mr-3">{q.name}</p>
                        <span className={`text-xs ${q.error ? 'text-red-400' : q.done ? 'text-green-400' : 'text-[#C9A84C]'}`}>
                          {q.error ? 'Failed' : q.done ? '✓ Done' : `${q.progress}%`}
                        </span>
                      </div>
                      <div className="h-0.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div className={`h-full ${q.error ? 'bg-red-400' : 'bg-[#C9A84C]'}`}
                          initial={{ width: 0 }} animate={{ width: `${q.progress}%` }} transition={{ duration: 0.4 }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search */}
      <div className="relative mb-6 max-w-sm">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
        <input type="text" placeholder="Search by title..." value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#111] border border-white/10 pl-9 pr-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#C9A84C] transition-colors" />
      </div>

      {/* Grid */}
      {displayed.length === 0 ? (
        <p className="text-center text-white/20 text-sm py-16">{search ? 'No videos match your search' : 'No videos uploaded yet'}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayed.map((v, i) => (
            <motion.div key={v._id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.03 }}
              className="group bg-[#111] border border-white/5 hover:border-[#C9A84C33] transition-all duration-300">
              <div className="relative overflow-hidden aspect-video bg-black">
                {v.thumbnailUrl ? (
                  <img src={v.thumbnailUrl} alt={v.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center"><Play size={32} className="text-white/10" /></div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <button onClick={() => setPreview(v)} className="w-8 h-8 bg-white/10 hover:bg-[#C9A84C] hover:text-black flex items-center justify-center transition-all"><Eye size={14} /></button>
                  <button onClick={() => startEdit(v)} className="w-8 h-8 bg-white/10 hover:bg-[#C9A84C] hover:text-black flex items-center justify-center transition-all"><Edit2 size={14} /></button>
                  <button onClick={() => handleDelete(v._id)} className="w-8 h-8 bg-white/10 hover:bg-red-500 flex items-center justify-center transition-all"><Trash2 size={14} /></button>
                </div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-10 h-10 rounded-full bg-black/50 border border-white/20 flex items-center justify-center group-hover:opacity-0 transition-opacity">
                    <Play size={16} className="text-white ml-0.5" />
                  </div>
                </div>
                {v.category && <span className="absolute top-2 left-2 px-1.5 py-0.5 text-[9px] tracking-wider uppercase bg-black/70 text-[#C9A84C] backdrop-blur-sm">{v.category}</span>}
              </div>
              <div className="p-3">
                {editId === v._id ? (
                  <div className="space-y-2">
                    <input value={editData.title} onChange={(e) => setEditData({ ...editData, title: e.target.value })} placeholder="Title" autoFocus
                      className="w-full bg-white/5 border border-white/10 px-2 py-1 text-xs text-white focus:outline-none focus:border-[#C9A84C]" />
                    <select value={editData.category} onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                      className="w-full bg-[#1A1A1A] border border-white/10 px-2 py-1 text-xs text-white focus:outline-none focus:border-[#C9A84C]">
                      {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <div className="flex gap-2">
                      <button onClick={() => saveEdit(v._id)} className="flex-1 py-1 bg-[#C9A84C] text-black text-xs flex items-center justify-center gap-1 hover:bg-[#E8C97A] transition-colors"><Check size={11} /> Save</button>
                      <button onClick={() => setEditId(null)} className="flex-1 py-1 bg-white/5 text-white/40 text-xs flex items-center justify-center gap-1 hover:bg-white/10 transition-colors"><X size={11} /> Cancel</button>
                    </div>
                  </div>
                ) : (
                  <p className="text-white/50 text-xs truncate">{v.title || 'No title'}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-8">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
            className="w-9 h-9 flex items-center justify-center border border-white/10 text-white/40 hover:border-[#C9A84C] hover:text-[#C9A84C] disabled:opacity-30 disabled:cursor-not-allowed transition-all">
            <ChevronLeft size={16} />
          </button>
          <span className="text-white/30 text-sm">Page {page} of {totalPages}</span>
          <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
            className="w-9 h-9 flex items-center justify-center border border-white/10 text-white/40 hover:border-[#C9A84C] hover:text-[#C9A84C] disabled:opacity-30 disabled:cursor-not-allowed transition-all">
            <ChevronRight size={16} />
          </button>
        </div>
      )}

      {/* Preview Modal */}
      <AnimatePresence>
        {preview && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-black/95 flex items-center justify-center p-4" onClick={() => setPreview(null)}>
            <button className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center border border-white/10 text-white/60 hover:text-white transition-all" onClick={() => setPreview(null)}><X size={18} /></button>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
              {preview.videoUrl ? (
                <video src={preview.videoUrl} controls autoPlay className="w-full aspect-video bg-black" />
              ) : (
                <div className="w-full aspect-video bg-[#111] flex items-center justify-center text-white/20 text-sm">Video not available</div>
              )}
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-white text-sm font-500">{preview.title || 'No title'}</p>
                  {preview.category && <p className="text-[#C9A84C] text-xs tracking-wider mt-0.5">{preview.category}</p>}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { startEdit(preview); setPreview(null) }} className="flex items-center gap-2 px-3 py-2 border border-white/10 text-white/40 text-xs hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all"><Edit2 size={12} /> Edit</button>
                  <button onClick={() => { handleDelete(preview._id); setPreview(null) }} className="flex items-center gap-2 px-3 py-2 border border-red-400/20 text-red-400/60 text-xs hover:border-red-400 hover:text-red-400 transition-all"><Trash2 size={12} /> Delete</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
