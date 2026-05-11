const router = require('express').Router()
const Gallery = require('../models/Gallery')
const { protect } = require('../middleware/auth')
const { uploadImage, cloudinary } = require('../config/cloudinary')

// GET /api/gallery
router.get('/', async (req, res) => {
  try {
    const { category, limit = 20, page = 1 } = req.query
    const filter = category ? { category } : {}
    const items = await Gallery.find(filter).sort({ createdAt: -1 }).limit(Number(limit)).skip((page - 1) * limit)
    const total = await Gallery.countDocuments(filter)
    res.json({ data: items, total, page: Number(page) })
  } catch { res.status(500).json({ message: 'Server error' }) }
})

// POST /api/gallery (admin)
router.post('/', protect, uploadImage.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'Image required' })
    const item = await Gallery.create({
      imageUrl: req.file.path,
      publicId: req.file.filename,
      caption: req.body.caption || '',
      category: req.body.category || 'General',
    })
    res.status(201).json({ data: item })
  } catch { res.status(500).json({ message: 'Upload failed' }) }
})

// PUT /api/gallery/:id (admin)
router.put('/:id', protect, async (req, res) => {
  try {
    const item = await Gallery.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!item) return res.status(404).json({ message: 'Not found' })
    res.json({ data: item })
  } catch { res.status(500).json({ message: 'Server error' }) }
})

// DELETE /api/gallery/:id (admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id)
    if (!item) return res.status(404).json({ message: 'Not found' })
    await cloudinary.uploader.destroy(item.publicId)
    await item.deleteOne()
    res.json({ message: 'Deleted' })
  } catch { res.status(500).json({ message: 'Server error' }) }
})

module.exports = router
