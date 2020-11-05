import axios from "axios"

const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
})

http.interceptors.response.use(
  function (response) {
    return response.data
  },
  function (error) {
    if (error.response?.status === 401) {
      localStorage.clear()
      window.location.assign("/login")
    }

    return Promise.reject(error)
  }
)

//gym.routes
export const getGyms = () => http.get('/gyms')
export const getGymDetail = (id) => http.get(`/gym-detail/${id}`)
export const getGymClassrooms = (id) => http.get(`/gym-classrooms/${id}`)
export const getGymLessons = (id) => http.get(`/gym-lessons/${id}`)


//instructor.routes
export const getInstructors = () => http.get(`/instructors`)

//user.routes
export const login = ({email, password}) =>
  http.post("/login", {email, password})
export const logOut = () => http.post("/logout")
export const activateUser = (token) => http.get(`/activate/${token}`)
export const stripeInfo = ({data, id, plan}) =>
  http.post("/stripe/checkout", {id, plan, data})
export const followInfo = (id) => http.post(`/follow/${id}`, {id})
export const booking = (id, row, seat) =>
  http.post(`/book/${id}`, {id, row, seat})
export const unbooking = (reservations) => http.post(`/unbook`, {reservations})
export const getFollowersUsers = (followers) => http.post('/followers-users', followers)

  export const waitingList = (id) =>
  http.post(`/waitinglist/${id}`, { id });
export const unWaitingList = (id) =>
  http.post(`/unwaitinglist`, { id });


//data.routes
export const getDisciplines = () => http.get("/disciplines")
export const getServices = () => http.get("/services")

//crud.routes
export const register = ({name, email, password, role}) =>
  http.post("/register", {name, email, password, role})
export const updateUser = ({
  name,
  role,
  address,
  phone,
  city,
  zipcode,
  id,
  quote,
  services,
  disciplines,
}) =>
  http.patch(`/user-profile/${id}/edit`, {
    name,
    role,
    address,
    phone,
    city,
    zipcode,
    id,
    quote,
    services,
    disciplines,
  })
export const updateUserAvatar = (data, id) => {
  let fd = new FormData()
  fd.append("file", data)

  const config = {headers: {"Content-Type": "multipart/form-data"}}
  return http.post(`/user-profile/${id}/edit-avatar`, fd, config)
}
export const updatePassword = ({password, newpassword, id}) =>
  http.post(`/update-password/${id}`, {password, newpassword})
export const deleteUser = (id) => http.get(`/user/${id}/delete`)

//lesson.routes
export const createLesson = ({
  name,
  address,
  zipcode,
  city,
  discipline,
  date,
  duration,
  details,
  capacity,
  instructor,
  gym,
  classroom
}) =>
  http.post("/lesson", {
    name,
    address,
    zipcode,
    city,
    discipline,
    date,
    duration,
    details,
    capacity,
    instructor,
    gym,
    classroom
  })
export const lessonInfo = (id) => http.get(`/lesson/${id}`, {id})
export const updateLesson = ({
  name,
  address,
  zipcode,
  city,
  discipline,
  date,
  duration,
  details,
  capacity,
  instructor,
  id,
  classroom,
  gym
}) =>
  http.patch(`/lesson/${id}/edit`, {
    name,
    address,
    zipcode,
    city,
    discipline,
    date,
    duration,
    details,
    capacity,
    instructor,
    id,
    classroom,
    gym
  })

export const deleteLesson = (id) => http.get(`/lesson/${id}/delete`)
export const getLessonGuests = (id) => http.get(`/lesson-guests/${id}`)

//classroom routes

export const createClassroom = ({user, gym, name, rows, discipline}) =>
  http.post("/classroom", {
    user,
    gym,
    name,
    rows,
    discipline,
  })

export const classroomInfo = (id) => http.get(`/classroom/${id}`, {id})

export const updateClassroom = ({user, gym, name, rows, discipline, id}) =>
  http.patch(`/classroom/${id}/edit`, {
    user,
    gym,
    name,
    rows,
    discipline,
    id,
  })

export const deleteClassroom = (id) => http.get(`/classroom/${id}/delete`)

export const getClassroomLessons = (id) => http.get(`/classroom-lessons/${id}`)
