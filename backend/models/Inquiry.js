const mongoose = require('mongoose')

const InquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, default: '' },
  email: { type: String, default: '' },
  message: { type: String, default: '' },
  status: { type: String, enum: ['new', 'contacted', 'resolved'], default: 'new' },
}, { timestamps: true })

module.exports = mongoose.model('Inquiry', InquirySchema)
