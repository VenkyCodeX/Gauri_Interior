const router = require('express').Router()
const Testimonial = require('../models/Testimonial')
const { protect } = require('../middleware/auth')

router.get('/', async (req, res) => {
  try {
    const items = await Testimonial.find({ active: true }).sort({ createdAt: -1 })
    res.json({ data: items })
  } catch { res.status(500).json({ message: 'Server error' }) }
})

router.post('/', protect, async (req, res) => {
  try {
    const item = await Testimonial.create(req.body)
    res.status(201).json({ data: item })
  } catch { res.status(500).json({ message: 'Server error' }) }
})

router.put('/:id', protect, async (req, res) => {
  try {
    const item = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!item) return res.status(404).json({ message: 'Not found' })
    res.json({ data: item })
  } catch { res.status(500).json({ message: 'Server error' }) }
})

router.delete('/:id', protect, async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id)
    res.json({ message: 'Deleted' })
  } catch { res.status(500).json({ message: 'Server error' }) }
})

module.exports = router
