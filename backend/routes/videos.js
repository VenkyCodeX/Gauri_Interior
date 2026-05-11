const router = require('express').Router()
const Video = require('../models/Video')
const { protect } = require('../middleware/auth')
const { uploadVideo, cloudinary } = require('../config/cloudinary')

router.get('/', async (req, res) => {
  try {
    const { limit = 10, page = 1 } = req.query
    const items = await Video.find().sort({ createdAt: -1 }).limit(Number(limit)).skip((page - 1) * limit)
    const total = await Video.countDocuments()
    res.json({ data: items, total })
  } catch { res.status(500).json({ message: 'Server error' }) }
})

router.post('/', protect, uploadVideo.single('video'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'Video required' })
    const thumbnailUrl = req.file.path.replace('/upload/', '/upload/so_0,w_600,h_400,c_fill/').replace(/\.[^/.]+$/, '.jpg')
    const item = await Video.create({
      videoUrl: req.file.path,
      thumbnailUrl,
      publicId: req.file.filename,
      title: req.body.title || '',
    })
    res.status(201).json({ data: item })
  } catch { res.status(500).json({ message: 'Upload failed' }) }
})

router.put('/:id', protect, async (req, res) => {
  try {
    const item = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!item) return res.status(404).json({ message: 'Not found' })
    res.json({ data: item })
  } catch { res.status(500).json({ message: 'Server error' }) }
})

router.delete('/:id', protect, async (req, res) => {
  try {
    const item = await Video.findById(req.params.id)
    if (!item) return res.status(404).json({ message: 'Not found' })
    await cloudinary.uploader.destroy(item.publicId, { resource_type: 'video' })
    await item.deleteOne()
    res.json({ message: 'Deleted' })
  } catch { res.status(500).json({ message: 'Server error' }) }
})

module.exports = router
