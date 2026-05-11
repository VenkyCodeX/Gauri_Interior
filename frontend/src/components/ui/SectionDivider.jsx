import { motion } from 'framer-motion'

export default function SectionDivider() {
  return (
    <div className="flex items-center justify-center py-4">
      <motion.div
        className="h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent w-full max-w-2xl"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
        viewport={{ once: true }}
      />
    </div>
  )
}
