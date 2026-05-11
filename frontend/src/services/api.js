import axios from 'axios'

const api = axios.create({ baseURL: '/api' })

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('adminToken')
      localStorage.removeItem('adminData')
      window.location.href = '/admin/login'
    }
    return Promise.reject(err)
  }
)

export const authAPI = {
  login: (data) => api.post('/auth/login', data),
}

export const galleryAPI = {
  getAll: (params) => api.get('/gallery', { params }),
  upload: (formData) => api.post('/gallery', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update: (id, data) => api.put(`/gallery/${id}`, data),
  delete: (id) => api.delete(`/gallery/${id}`),
}

export const videoAPI = {
  getAll: (params) => api.get('/videos', { params }),
  upload: (formData) => api.post('/videos', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update: (id, data) => api.put(`/videos/${id}`, data),
  delete: (id) => api.delete(`/videos/${id}`),
}

export const testimonialAPI = {
  getAll: () => api.get('/testimonials'),
  create: (data) => api.post('/testimonials', data),
  update: (id, data) => api.put(`/testimonials/${id}`, data),
  delete: (id) => api.delete(`/testimonials/${id}`),
}

export const bannerAPI = {
  getAll: () => api.get('/banners'),
  create: (formData) => api.post('/banners', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update: (id, data) => api.put(`/banners/${id}`, data),
  delete: (id) => api.delete(`/banners/${id}`),
}

export const categoryAPI = {
  getAll: () => api.get('/categories'),
  create: (data) => api.post('/categories', data),
  update: (id, data) => api.put(`/categories/${id}`, data),
  delete: (id) => api.delete(`/categories/${id}`),
}

export const inquiryAPI = {
  getAll: () => api.get('/inquiries'),
  create: (data) => api.post('/inquiries', data),
  updateStatus: (id, status) => api.put(`/inquiries/${id}`, { status }),
  delete: (id) => api.delete(`/inquiries/${id}`),
}

export const statsAPI = {
  get: () => api.get('/stats'),
}

export default api
