import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { authAPI } from '../../services/api'
import toast from 'react-hot-toast'
import { Eye, EyeOff, Lock, User } from 'lucide-react'

export default function AdminLogin() {
  const [form, setForm] = useState({ username: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await authAPI.login(form)
      login(res.data.token, res.data.admin)
      toast.success('Welcome back!')
      navigate('/admin/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-96 h-96 rounded-full bg-[#C9A84C] opacity-5 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <span className="font-['Cormorant_Garamond'] text-3xl gold-text tracking-widest block">GAURI</span>
          <span className="text-[10px] tracking-[0.4em] text-white/30 uppercase">Admin Panel</span>
        </div>

        <form onSubmit={handleSubmit} className="glass p-8 space-y-5">
          <h2 className="text-white text-lg font-500 mb-6">Sign In</h2>

          <div>
            <label className="text-xs tracking-widest text-white/40 uppercase block mb-2">Username</label>
            <div className="relative">
              <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="text"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                required
                placeholder="admin"
                className="w-full bg-white/5 border border-white/10 pl-9 pr-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#C9A84C] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="text-xs tracking-widest text-white/40 uppercase block mb-2">Password</label>
            <div className="relative">
              <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type={showPass ? 'text' : 'password'}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 pl-9 pr-10 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#C9A84C] transition-colors"
              />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 bg-[#C9A84C] text-black text-xs tracking-widest uppercase font-600 hover:bg-[#E8C97A] transition-all duration-300 disabled:opacity-50 mt-2"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </motion.button>
        </form>

        <p className="text-center text-white/20 text-xs mt-6">
          <a href="/" className="hover:text-[#C9A84C] transition-colors">← Back to Website</a>
        </p>
      </motion.div>
    </div>
  )
}
