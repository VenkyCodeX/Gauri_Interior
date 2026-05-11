const mongoose = require('mongoose')

const VideoSchema = new mongoose.Schema({
  videoUrl: { type: String, required: true },
  thumbnailUrl: { type: String, default: '' },
  publicId: { type: String, required: true },
  title: { type: String, default: '' },
  featured: { type: Boolean, default: false },
}, { timestamps: true })

module.exports = mongoose.model('Video', VideoSchema)
