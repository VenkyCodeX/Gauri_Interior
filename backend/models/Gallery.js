const mongoose = require('mongoose')

const GallerySchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  publicId: { type: String, required: true },
  caption: { type: String, default: '' },
  category: { type: String, default: 'General' },
  featured: { type: Boolean, default: false },
}, { timestamps: true })

module.exports = mongoose.model('Gallery', GallerySchema)
