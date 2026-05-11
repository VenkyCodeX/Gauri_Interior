import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Send } from 'lucide-react'
import { inquiryAPI } from '../../services/api'
import toast from 'react-hot-toast'

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await inquiryAPI.create(form)
      toast.success('Message sent! We\'ll contact you soon.')
      setForm({ name: '', phone: '', email: '', message: '' })
    } catch {
      toast.error('Failed to send. Please try WhatsApp or call us.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="section-padding bg-[#0A0A0A]">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.5em] text-[#C9A84C] uppercase mb-4">Get In Touch</p>
          <h2 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl text-white mb-4">
            Let's Create Something <span className="gold-text italic">Beautiful</span>
          </h2>
          <p className="text-white/40 text-sm max-w-xl mx-auto">Book a free consultation and let our experts transform your space</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6 mb-10">
              {[
                { icon: Phone, label: 'Call Us', value: '+91 98765 43210', href: 'tel:+919876543210' },
                { icon: Mail, label: 'Email Us', value: 'info@gauriinteriors.com', href: 'mailto:info@gauriinteriors.com' },
                { icon: MapPin, label: 'Visit Us', value: 'Plot No 1, Sri Ram Nagar Colony, Nagarjuna Sagar Rd, Vanasthalipuram, Hyderabad, Telangana 500070', href: 'https://www.google.com/maps/place/Interior+Concept/@17.3211396,78.5576866,17z/data=!3m1!4b1!4m6!3m5!1s0x3bcba3a0af653f1f:0x9cc9f46fea1ae2e6' },
              ].map((item) => (
                <a key={item.label} href={item.href} className="flex items-center gap-4 group">
                  <div className="w-12 h-12 border border-[#C9A84C33] flex items-center justify-center group-hover:border-[#C9A84C] group-hover:bg-[#C9A84C11] transition-all duration-300">
                    <item.icon size={18} className="text-[#C9A84C]" />
                  </div>
                  <div>
                    <p className="text-white/30 text-xs tracking-wider uppercase">{item.label}</p>
                    <p className="text-white text-sm group-hover:text-[#C9A84C] transition-colors">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Map */}
            <div className="h-56 border border-white/5 overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.6956!2d78.5576866!3d17.3211396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcba3a0af653f1f%3A0x9cc9f46fea1ae2e6!2sInterior%20Concept!5e0!3m2!1sen!2sin!4v1699999999999!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen
                loading="lazy"
                title="Gauri Interiors Location"
              />
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="glass p-8 space-y-5"
          >
            {[
              { name: 'name', label: 'Full Name', type: 'text', placeholder: 'Your name' },
              { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+91 XXXXX XXXXX' },
              { name: 'email', label: 'Email Address', type: 'email', placeholder: 'your@email.com' },
            ].map((field) => (
              <div key={field.name}>
                <label className="text-xs tracking-widest text-white/40 uppercase block mb-2">{field.label}</label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  value={form[field.name]}
                  onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                  required
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#C9A84C] transition-colors"
                />
              </div>
            ))}
            <div>
              <label className="text-xs tracking-widest text-white/40 uppercase block mb-2">Message</label>
              <textarea
                rows={4}
                placeholder="Tell us about your project..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
                className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#C9A84C] transition-colors resize-none"
              />
            </div>
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-[#C9A84C] text-black text-xs tracking-widest uppercase font-600 hover:bg-[#E8C97A] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? 'Sending...' : (<><Send size={14} /> Send Message</>)}
            </motion.button>
          </motion.form>
        </div>
      </div>

      {/* WhatsApp Float */}
      <motion.a
        href="https://wa.me/919876543210?text=Hello%2C%20I%20saw%20your%20website%20and%20I%27m%20interested%20in%20a%20free%20consultation%20for%20blinds%20%2F%20interior%20design.%20Please%20let%20me%20know%20the%20next%20available%20slot."
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: 'spring' }}
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-8 right-8 z-[90] w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.4)]"
      >
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </motion.a>
    </section>
  )
}
