const router = require('express').Router()
const Inquiry = require('../models/Inquiry')
const { protect } = require('../middleware/auth')

router.get('/', protect, async (req, res) => {
  try {
    const items = await Inquiry.find().sort({ createdAt: -1 })
    res.json({ data: items })
  } catch { res.status(500).json({ message: 'Server error' }) }
})

router.post('/', async (req, res) => {
  try {
    const { name, phone, email, message } = req.body
    if (!name) return res.status(400).json({ message: 'Name is required' })
    const item = await Inquiry.create({ name, phone, email, message })
    res.status(201).json({ data: item })
  } catch { res.status(500).json({ message: 'Server error' }) }
})

router.put('/:id', protect, async (req, res) => {
  try {
    const item = await Inquiry.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!item) return res.status(404).json({ message: 'Not found' })
    res.json({ data: item })
  } catch { res.status(500).json({ message: 'Server error' }) }
})

router.delete('/:id', protect, async (req, res) => {
  try {
    await Inquiry.findByIdAndDelete(req.params.id)
    res.json({ message: 'Deleted' })
  } catch { res.status(500).json({ message: 'Server error' }) }
})

module.exports = router
