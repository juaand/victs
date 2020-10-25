import axios from 'axios'

const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true
})

http.interceptors.response.use(function (response) {
  return response.data
}, function (error) {
  if (error.response?.status === 401) {
    localStorage.clear()
    window.location.assign('/login')
  }

  return Promise.reject(error)
})

export const login = ({email, password}) => http.post('/login', {email, password})

export const logOut = () => http.post('/logout')

export const register = ({name, avatar, email, password, role}) => http.post('/register', {name, avatar, email, password, role})

export const activateUser = (token) => http.get(`/activate/${token}`)

export const updateUser = ({name, role, address, phone, city, zipcode, avatar, id}) => http.patch(`/user-profile/${id}/edit`, {name, role, address, phone, city, zipcode, avatar, id})

// export const updateUserAvatar = (id) => http.patch(`/user-profile/${id}/edit-avatar`)

export const updatePassword = ({password, newpassword, id}) => http.post(`/update-password/${id}`, {password, newpassword})
