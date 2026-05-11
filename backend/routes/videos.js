const router = require('express').Router()
const Video = require('../models/Video')
const { protect } = require('../middleware/auth')
const { cloudinary, videoUpload, uploadToCloudinary } = require('../config/cloudinary')

router.get('/', async (req, res) => {
  try {
    const { limit = 10, page = 1 } = req.query
    const items = await Video.find().sort({ createdAt: -1 }).limit(Number(limit)).skip((page - 1) * limit)
    const total = await Video.countDocuments()
    res.json({ data: items, total })
  } catch { res.status(500).json({ message: 'Server error' }) }
})

router.post('/', protect, videoUpload.single('video'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'Video required' })
    const result = await uploadToCloudinary(req.file.buffer, {
      folder: 'gauri-interiors/videos',
      resource_type: 'video',
      allowed_formats: ['mp4', 'mov', 'webm'],
    })
    const thumbnailUrl = result.secure_url.replace('/upload/', '/upload/so_0,w_600,h_400,c_fill/').replace(/\.[^/.]+$/, '.jpg')
    const item = await Video.create({
      videoUrl: result.secure_url,
      thumbnailUrl,
      publicId: result.public_id,
      title: req.body.title || '',
      category: req.body.category || '',
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
