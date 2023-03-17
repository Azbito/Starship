import axios from 'axios'
import Cookies from 'js-cookie'

const token = Cookies.get('Token')

const api = axios.create({
  baseURL: 'http://localhost:4000/api',
  headers: {
    Authorization: `Bearer ${token}`
  }
})

export default api
