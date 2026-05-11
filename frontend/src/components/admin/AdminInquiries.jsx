import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Trash2, Mail, Phone, Clock, CheckCircle } from 'lucide-react'
import { inquiryAPI } from '../../services/api'
import toast from 'react-hot-toast'

export default function AdminInquiries() {
  const [items, setItems] = useState([])

  const fetchItems = () => inquiryAPI.getAll().then((r) => setItems(r.data.data || [])).catch(() => {})
  useEffect(() => { fetchItems() }, [])

  const handleStatus = async (id, status) => {
    try {
      await inquiryAPI.updateStatus(id, status)
      fetchItems()
    } catch { toast.error('Failed to update') }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this inquiry?')) return
    try {
      await inquiryAPI.delete(id)
      toast.success('Deleted')
      fetchItems()
    } catch { toast.error('Failed to delete') }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-white text-2xl font-['Cormorant_Garamond'] mb-1">Contact Inquiries</h1>
        <p className="text-white/30 text-sm">{items.length} total inquiries</p>
      </div>

      <div className="space-y-3">
        {items.map((item, i) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className={`bg-[#111111] border p-5 ${item.status === 'resolved' ? 'border-white/5 opacity-60' : 'border-white/10'}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <p className="text-white font-500 text-sm">{item.name}</p>
                  <span className={`text-[10px] px-2 py-0.5 tracking-wider uppercase ${
                    item.status === 'resolved' ? 'bg-green-400/10 text-green-400' : 'bg-[#C9A84C11] text-[#C9A84C]'
                  }`}>
                    {item.status || 'new'}
                  </span>
                </div>
                <div className="flex flex-wrap gap-4 mb-3">
                  {item.phone && (
                    <a href={`tel:${item.phone}`} className="flex items-center gap-1.5 text-white/40 text-xs hover:text-[#C9A84C] transition-colors">
                      <Phone size={11} /> {item.phone}
                    </a>
                  )}
                  {item.email && (
                    <a href={`mailto:${item.email}`} className="flex items-center gap-1.5 text-white/40 text-xs hover:text-[#C9A84C] transition-colors">
                      <Mail size={11} /> {item.email}
                    </a>
                  )}
                  <span className="flex items-center gap-1.5 text-white/20 text-xs">
                    <Clock size={11} /> {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
                {item.message && <p className="text-white/40 text-xs leading-relaxed">{item.message}</p>}
              </div>
              <div className="flex gap-2 shrink-0">
                {item.status !== 'resolved' && (
                  <button
                    onClick={() => handleStatus(item._id, 'resolved')}
                    className="text-white/20 hover:text-green-400 transition-colors"
                    title="Mark resolved"
                  >
                    <CheckCircle size={16} />
                  </button>
                )}
                <button onClick={() => handleDelete(item._id)} className="text-white/20 hover:text-red-400 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {items.length === 0 && <p className="text-center text-white/20 text-sm py-12">No inquiries yet</p>}
    </div>
  )
}
