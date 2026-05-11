const router = require('express').Router()
const Gallery = require('../models/Gallery')
const Video = require('../models/Video')
const Testimonial = require('../models/Testimonial')
const Inquiry = require('../models/Inquiry')
const { protect } = require('../middleware/auth')

router.get('/', protect, async (req, res) => {
  try {
    const [gallery, videos, testimonials, inquiries] = await Promise.all([
      Gallery.countDocuments(),
      Video.countDocuments(),
      Testimonial.countDocuments(),
      Inquiry.countDocuments(),
    ])
    res.json({ gallery, videos, testimonials, inquiries })
  } catch { res.status(500).json({ message: 'Server error' }) }
})

module.exports = router
