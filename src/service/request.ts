import Axios, { AxiosInstance } from 'axios'

const axios = Axios.create({
  baseURL: import.meta.env.VITE_BASE_URL + '',
  timeout: 10000,
  headers: {
    'Content-Type': 'text/plain'
  }
})

// response interceptor
axios.interceptors.response.use(
  (response) => {
    const data = response.data
    console.log('response:', response)
    if (response.status === 200) {
      return data
    }

    return Promise.reject(new Error(response.statusText || 'Error'))
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axios
