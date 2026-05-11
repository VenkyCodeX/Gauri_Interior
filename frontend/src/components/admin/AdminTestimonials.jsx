import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Trash2, Star } from 'lucide-react'
import { testimonialAPI } from '../../services/api'
import toast from 'react-hot-toast'

const empty = { name: '', role: '', review: '', rating: 5 }

export default function AdminTestimonials() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState(empty)
  const [showForm, setShowForm] = useState(false)

  const fetchItems = () => testimonialAPI.getAll().then((r) => setItems(r.data.data || [])).catch(() => {})
  useEffect(() => { fetchItems() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await testimonialAPI.create(form)
      toast.success('Testimonial added')
      setForm(empty)
      setShowForm(false)
      fetchItems()
    } catch { toast.error('Failed to add') }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this testimonial?')) return
    try {
      await testimonialAPI.delete(id)
      toast.success('Deleted')
      fetchItems()
    } catch { toast.error('Failed to delete') }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-white text-2xl font-['Cormorant_Garamond'] mb-1">Testimonials</h1>
          <p className="text-white/30 text-sm">Manage client reviews</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-[#C9A84C] text-black text-xs tracking-widest uppercase hover:bg-[#E8C97A] transition-colors"
        >
          <Plus size={14} /> Add New
        </button>
      </div>

      {showForm && (
        <motion.form
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="bg-[#111111] border border-white/5 p-6 mb-6 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {[
            { name: 'name', label: 'Client Name', type: 'text' },
            { name: 'role', label: 'Role / Location', type: 'text' },
          ].map((f) => (
            <div key={f.name}>
              <label className="text-xs tracking-widest text-white/40 uppercase block mb-2">{f.label}</label>
              <input
                type={f.type}
                value={form[f.name]}
                onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                required
                className="w-full bg-white/5 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:border-[#C9A84C] transition-colors"
              />
            </div>
          ))}
          <div className="md:col-span-2">
            <label className="text-xs tracking-widest text-white/40 uppercase block mb-2">Review</label>
            <textarea
              rows={3}
              value={form.review}
              onChange={(e) => setForm({ ...form, review: e.target.value })}
              required
              className="w-full bg-white/5 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:border-[#C9A84C] transition-colors resize-none"
            />
          </div>
          <div>
            <label className="text-xs tracking-widest text-white/40 uppercase block mb-2">Rating</label>
            <select
              value={form.rating}
              onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
              className="w-full bg-white/5 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:border-[#C9A84C]"
            >
              {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} Stars</option>)}
            </select>
          </div>
          <div className="flex items-end">
            <button type="submit" className="px-6 py-2 bg-[#C9A84C] text-black text-xs tracking-widest uppercase hover:bg-[#E8C97A] transition-colors">
              Save
            </button>
          </div>
        </motion.form>
      )}

      <div className="space-y-3">
        {items.map((item, i) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-[#111111] border border-white/5 p-4 flex items-start gap-4"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-white text-sm font-500">{item.name}</p>
                <span className="text-white/20 text-xs">·</span>
                <p className="text-white/40 text-xs">{item.role}</p>
              </div>
              <div className="flex gap-0.5 mb-2">
                {Array.from({ length: item.rating || 5 }).map((_, j) => (
                  <Star key={j} size={10} className="text-[#C9A84C] fill-[#C9A84C]" />
                ))}
              </div>
              <p className="text-white/50 text-xs leading-relaxed">{item.review}</p>
            </div>
            <button onClick={() => handleDelete(item._id)} className="text-white/20 hover:text-red-400 transition-colors shrink-0">
              <Trash2 size={14} />
            </button>
          </motion.div>
        ))}
      </div>

      {items.length === 0 && <p className="text-center text-white/20 text-sm py-12">No testimonials yet</p>}
    </div>
  )
}
