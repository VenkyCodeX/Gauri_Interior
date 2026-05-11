import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useDropzone } from 'react-dropzone'
import {
  Upload, Trash2, Edit2, Check, X, Search,
  ChevronLeft, ChevronRight, LogOut, ArrowLeft, Eye
} from 'lucide-react'
import { galleryAPI } from '../../services/api'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'

const CATEGORIES = ['Living Room', 'Bedroom', 'Kitchen', 'Dining', 'Blinds', 'Curtains', 'Wallpaper', 'Office', 'Bathroom', 'Other']
const PAGE_SIZE = 20

export default function GalleryManager() {
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const [items, setItems] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [filterCat, setFilterCat] = useState('All')
  const [uploading, setUploading] = useState(false)
  const [uploadQueue, setUploadQueue] = useState([]) // [{name, progress, done, error}]
  const [editId, setEditId] = useState(null)
  const [editData, setEditData] = useState({ caption: '', category: '' })
  const [preview, setPreview] = useState(null) // lightbox
  const [showUpload, setShowUpload] = useState(false)
  const [newMeta, setNewMeta] = useState({ caption: '', category: 'Living Room' })

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) navigate('/admin/login')
  }, [isAuthenticated, navigate])

  const fetchItems = useCallback(() => {
    galleryAPI.getAll({ limit: PAGE_SIZE, page })
      .then((r) => { setItems(r.data.data || []); setTotal(r.data.total || 0) })
      .catch(() => {})
  }, [page])

  useEffect(() => { fetchItems() }, [fetchItems])

  // Filtered locally
  const displayed = items.filter((img) => {
    const matchSearch = !search || img.caption?.toLowerCase().includes(search.toLowerCase())
    const matchCat = filterCat === 'All' || img.category === filterCat
    return matchSearch && matchCat
  })

  const onDrop = useCallback(async (files) => {
    setUploading(true)
    const queue = files.map((f) => ({ name: f.name, progress: 0, done: false, error: false }))
    setUploadQueue(queue)

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const fd = new FormData()
      fd.append('image', file)
      fd.append('caption', newMeta.caption || file.name.replace(/\.[^/.]+$/, ''))
      fd.append('category', newMeta.category)

      setUploadQueue((prev) => prev.map((q, idx) => idx === i ? { ...q, progress: 30 } : q))

      try {
        await galleryAPI.upload(fd)
        setUploadQueue((prev) => prev.map((q, idx) => idx === i ? { ...q, progress: 100, done: true } : q))
        toast.success(`Uploaded: ${file.name}`)
      } catch {
        setUploadQueue((prev) => prev.map((q, idx) => idx === i ? { ...q, error: true } : q))
        toast.error(`Failed: ${file.name}`)
      }
    }

    setUploading(false)
    setTimeout(() => { setUploadQueue([]); setShowUpload(false); setNewMeta({ caption: '', category: 'Living Room' }) }, 1500)
    fetchItems()
  }, [newMeta, fetchItems])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/jpeg': [], 'image/png': [], 'image/webp': [] },
    multiple: true,
    disabled: uploading,
  })

  const handleDelete = async (id) => {
    if (!window.confirm('Permanently delete this photo?')) return
    try {
      await galleryAPI.delete(id)
      toast.success('Photo deleted')
      fetchItems()
    } catch { toast.error('Delete failed') }
  }

  const startEdit = (img) => {
    setEditId(img._id)
    setEditData({ caption: img.caption || '', category: img.category || '' })
  }

  const saveEdit = async (id) => {
    try {
      await galleryAPI.update(id, editData)
      toast.success('Updated')
      setEditId(null)
      fetchItems()
    } catch { toast.error('Update failed') }
  }

  const totalPages = Math.ceil(total / PAGE_SIZE)

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">

      {/* ── Top Bar ── */}
      <div className="sticky top-0 z-50 bg-[#0A0A0A]/95 backdrop-blur border-b border-white/5 px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/gallery')}
            className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft size={16} /> Back to Gallery
          </button>
          <div className="w-px h-5 bg-white/10" />
          <div>
            <span className="font-['Cormorant_Garamond'] text-lg gold-text tracking-widest">GAURI</span>
            <span className="text-white/30 text-xs ml-2">Gallery Manager</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Switch to Video Manager */}
          <button
            onClick={() => navigate('/admin/video-manager')}
            className="hidden sm:flex items-center gap-2 px-3 py-2 border border-white/10 text-white/40 text-xs hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all"
          >
            Videos
          </button>
          <motion.button
            onClick={() => setShowUpload(true)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-4 py-2 bg-[#C9A84C] text-black text-xs tracking-widest uppercase font-600 hover:bg-[#E8C97A] transition-colors"
          >
            <Upload size={14} /> Upload Photos
          </motion.button>
          <button
            onClick={() => { logout(); navigate('/admin/login') }}
            className="w-9 h-9 flex items-center justify-center border border-white/10 text-white/30 hover:text-red-400 hover:border-red-400/30 transition-all"
          >
            <LogOut size={14} />
          </button>
        </div>
      </div>

      {/* ── Upload Panel ── */}
      <AnimatePresence>
        {showUpload && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4"
            onClick={() => !uploading && setShowUpload(false)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className="bg-[#111] border border-white/10 w-full max-w-lg p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-white font-['Cormorant_Garamond'] text-2xl">Upload Photos</h2>
                {!uploading && (
                  <button onClick={() => setShowUpload(false)} className="text-white/30 hover:text-white">
                    <X size={18} />
                  </button>
                )}
              </div>

              {/* Meta fields */}
              <div className="grid grid-cols-2 gap-4 mb-5">
                <div>
                  <label className="text-[10px] tracking-widest text-white/40 uppercase block mb-2">Caption</label>
                  <input
                    type="text"
                    placeholder="e.g. Modern Living Room"
                    value={newMeta.caption}
                    onChange={(e) => setNewMeta({ ...newMeta, caption: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 px-3 py-2 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#C9A84C] transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[10px] tracking-widest text-white/40 uppercase block mb-2">Category</label>
                  <select
                    value={newMeta.category}
                    onChange={(e) => setNewMeta({ ...newMeta, category: e.target.value })}
                    className="w-full bg-[#1A1A1A] border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:border-[#C9A84C] transition-colors"
                  >
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              {/* Dropzone */}
              <div
                {...getRootProps()}
                className={`border-2 border-dashed p-10 text-center cursor-pointer transition-all duration-300 mb-5 ${
                  isDragActive ? 'border-[#C9A84C] bg-[#C9A84C08]' : 'border-white/10 hover:border-white/20'
                } ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <input {...getInputProps()} />
                <Upload size={28} className={`mx-auto mb-3 ${isDragActive ? 'text-[#C9A84C]' : 'text-white/20'}`} />
                <p className="text-white/40 text-sm">
                  {uploading ? 'Uploading...' : isDragActive ? 'Drop photos here' : 'Drag & drop or click to select'}
                </p>
                <p className="text-white/20 text-xs mt-1">JPG, PNG, WebP · Multiple files supported</p>
              </div>

              {/* Upload progress */}
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
                        <motion.div
                          className={`h-full ${q.error ? 'bg-red-400' : 'bg-[#C9A84C]'}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${q.progress}%` }}
                          transition={{ duration: 0.4 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {/* Stats bar */}
        <div className="flex items-center gap-6 mb-8 pb-6 border-b border-white/5">
          <div>
            <p className="text-2xl font-['Cormorant_Garamond'] gold-text">{total}</p>
            <p className="text-white/30 text-xs tracking-wider uppercase">Total Photos</p>
          </div>
          <div className="w-px h-10 bg-white/5" />
          <div>
            <p className="text-2xl font-['Cormorant_Garamond'] text-white">{displayed.length}</p>
            <p className="text-white/30 text-xs tracking-wider uppercase">Showing</p>
          </div>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              placeholder="Search by caption..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#111] border border-white/10 pl-9 pr-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#C9A84C] transition-colors"
            />
          </div>
          <select
            value={filterCat}
            onChange={(e) => setFilterCat(e.target.value)}
            className="bg-[#111] border border-white/10 px-3 py-2.5 text-xs text-white/60 focus:outline-none focus:border-[#C9A84C] transition-colors"
          >
            <option value="All">All Categories</option>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Grid */}
        {displayed.length === 0 ? (
          <div className="text-center py-24 text-white/20 text-sm">
            {search || filterCat !== 'All' ? 'No photos match your filter' : 'No photos uploaded yet'}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {displayed.map((img, i) => (
              <motion.div
                key={img._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.02 }}
                className="group bg-[#111] border border-white/5 hover:border-[#C9A84C33] transition-all duration-300"
              >
                {/* Image */}
                <div className="relative overflow-hidden aspect-square">
                  <img
                    src={img.imageUrl}
                    alt={img.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Action overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                    <button
                      onClick={() => setPreview(img)}
                      className="w-8 h-8 bg-white/10 hover:bg-[#C9A84C] hover:text-black flex items-center justify-center transition-all duration-200"
                    >
                      <Eye size={14} />
                    </button>
                    <button
                      onClick={() => startEdit(img)}
                      className="w-8 h-8 bg-white/10 hover:bg-[#C9A84C] hover:text-black flex items-center justify-center transition-all duration-200"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(img._id)}
                      className="w-8 h-8 bg-white/10 hover:bg-red-500 flex items-center justify-center transition-all duration-200"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  {/* Category badge */}
                  {img.category && (
                    <span className="absolute top-2 left-2 px-1.5 py-0.5 text-[9px] tracking-wider uppercase bg-black/70 text-[#C9A84C] backdrop-blur-sm">
                      {img.category}
                    </span>
                  )}
                </div>

                {/* Caption / Edit */}
                <div className="p-2.5">
                  {editId === img._id ? (
                    <div className="space-y-2">
                      <input
                        value={editData.caption}
                        onChange={(e) => setEditData({ ...editData, caption: e.target.value })}
                        placeholder="Caption"
                        className="w-full bg-white/5 border border-white/10 px-2 py-1 text-xs text-white focus:outline-none focus:border-[#C9A84C]"
                        autoFocus
                      />
                      <select
                        value={editData.category}
                        onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                        className="w-full bg-[#1A1A1A] border border-white/10 px-2 py-1 text-xs text-white focus:outline-none focus:border-[#C9A84C]"
                      >
                        {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                      <div className="flex gap-2">
                        <button
                          onClick={() => saveEdit(img._id)}
                          className="flex-1 py-1 bg-[#C9A84C] text-black text-xs flex items-center justify-center gap-1 hover:bg-[#E8C97A] transition-colors"
                        >
                          <Check size={11} /> Save
                        </button>
                        <button
                          onClick={() => setEditId(null)}
                          className="flex-1 py-1 bg-white/5 text-white/40 text-xs flex items-center justify-center gap-1 hover:bg-white/10 transition-colors"
                        >
                          <X size={11} /> Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-white/50 text-xs truncate">{img.caption || 'No caption'}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-9 h-9 flex items-center justify-center border border-white/10 text-white/40 hover:border-[#C9A84C] hover:text-[#C9A84C] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-white/30 text-sm">Page {page} of {totalPages}</span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="w-9 h-9 flex items-center justify-center border border-white/10 text-white/40 hover:border-[#C9A84C] hover:text-[#C9A84C] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>

      {/* ── Preview Lightbox ── */}
      <AnimatePresence>
        {preview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setPreview(null)}
          >
            <button
              className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center border border-white/10 text-white/60 hover:text-white transition-all"
              onClick={() => setPreview(null)}
            >
              <X size={18} />
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={preview.imageUrl} alt={preview.caption} className="w-full max-h-[75vh] object-contain" />
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-white text-sm font-500">{preview.caption || 'No caption'}</p>
                  {preview.category && (
                    <span className="text-[#C9A84C] text-xs tracking-wider">{preview.category}</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => { startEdit(preview); setPreview(null) }}
                    className="flex items-center gap-2 px-3 py-2 border border-white/10 text-white/40 text-xs hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all"
                  >
                    <Edit2 size={12} /> Edit
                  </button>
                  <button
                    onClick={() => { handleDelete(preview._id); setPreview(null) }}
                    className="flex items-center gap-2 px-3 py-2 border border-red-400/20 text-red-400/60 text-xs hover:border-red-400 hover:text-red-400 transition-all"
                  >
                    <Trash2 size={12} /> Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
