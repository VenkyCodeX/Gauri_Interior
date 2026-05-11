const cloudinary = require('cloudinary').v2
const multer = require('multer')
const { Readable } = require('stream')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/quicktime', 'video/webm']

const imageUpload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (ALLOWED_IMAGE_TYPES.includes(file.mimetype)) return cb(null, true)
    cb(new Error('Invalid file type. Only JPG, PNG, WebP allowed.'), false)
  },
  limits: { fileSize: 10 * 1024 * 1024 },
})

const videoUpload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (ALLOWED_VIDEO_TYPES.includes(file.mimetype)) return cb(null, true)
    cb(new Error('Invalid file type. Only MP4, MOV, WebM allowed.'), false)
  },
  limits: { fileSize: 200 * 1024 * 1024 },
})

const uploadToCloudinary = (buffer, options) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) return reject(error)
      resolve(result)
    })
    Readable.from(buffer).pipe(stream)
  })
}

module.exports = { cloudinary, imageUpload, videoUpload, uploadToCloudinary }
