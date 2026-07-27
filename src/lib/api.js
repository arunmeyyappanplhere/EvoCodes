import axios from 'axios'

// ASSUMPTION: backend base URL. Override by setting VITE_API_URL in your .env
// (e.g. VITE_API_URL=https://api.evocodes.com/api). If your Express app mounts
// routes somewhere other than "/api", change the fallback below.
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

export default api