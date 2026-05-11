const router = require('express').Router()
const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin')

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body
    if (!username || !password) return res.status(400).json({ message: 'Username and password required' })

    const admin = await Admin.findOne({ username })
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })
    res.json({ token, admin: { id: admin._id, username: admin.username } })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router
