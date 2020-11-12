import "./Lessons.css"
import React, {useState, useEffect} from "react"
import Banner from "../../Banner/Banner"
import {useFormState} from "../../../hooks/useFormState"
import {
  getDisciplines,
  getInstructors,
  getGymClassrooms,
  createLesson,
} from "../../../services/ApiClient"
import InputWithLabel from "../../Form/InputWithLabel/InputWithLabel"
import Button from "../../Button/Button"
import DateTimePicker from "react-datetime-picker"
import CheckBoxWithLabel from "../../Form/CheckBoxWithLabel/CheckBoxWithLabel"
import {useHistory} from "react-router-dom"


export default function Lessons({user}) {

  const {state, onBlur, onChange} = useFormState(
    {
      data: {
        name: "",
        address: user.role === "Gym" ? user.user.address : "",
        city: user.role === "Gym" ? user.user.city : "",
        zipcode: user.role === "Gym" ? user.user.zipcode : "",
        discipline: [],
        date: new Date(),
        instructor: user.id,
        gym: user.id,
        classroom: "",
        capacity: "",
        duration: 45,
      },
      error: {
        name: true,
        date: true,
      },
      touch: {},
    },
    {
      name: (v) => v.length,
      address: (v) => v.length,
      city: (v) => v.length,
      zipcode: (v) => v.length,
      details: (v) => v.length,
      capacity: (v) => v.length,
      date: (v) => v.length,
      duration: (v) => v.length,
    }
  )

  const {data, error, touch} = state

  const [date, setDate] = useState(new Date())
  const [disciplinesList, setDisciplinesList] = useState([])
  const [registerError, setRegisterError] = useState(null)
  const [bool, setBool] = useState(true)
  const [instructorBool, setInstructorBool] = useState(false)
  const [classroomBool, setClassroomBool] = useState(false)
  const [instructorsData, setInstructorsData] = useState([])
  const [classroomData, setClassroomData] = useState([])
  const [isInstructor, setIsInstructor] = useState(false)
  const [isClassroom, setIsClassroom] = useState(false)
  const [instructorName, setInstructorName] = useState("")
  const [classroomName, setClassroomName] = useState("")
  const [search, setSearch] = useState("")

  const history = useHistory()


  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      await createLesson(data)
      history.push(`/my-info-${user.role}`)
    } catch (err) {
      setRegisterError(err.response?.data?.message)
    }
  }

  const getDisciplinesItems = (e) => {
    let newArray = [...data.discipline, e.target.id]
    if (data.discipline.includes(e.target.id)) {
      newArray = newArray.filter((el) => el !== e.target.id)
    }
    data.discipline = newArray
  }

  const setTime = (e) => {
    setDate(e)
    data.date = e
  }

  useEffect(() => {
    getDisciplines().then((res) => {
      setDisciplinesList(res[0])
    })
  }, [])

  const isError = Object.values(error).some((err) => err)

  const selectInstructor = (event) => {
    event.preventDefault()
    setBool(!bool)
    setInstructorBool(!instructorBool)
    setClassroomBool(false)
    getInstructors().then((instructors) => setInstructorsData(instructors))
  }

  const selectClassroom = (event) => {
    event.preventDefault()
    setBool(!bool)
    setClassroomBool(!classroomBool)
    setInstructorBool(false)
    getGymClassrooms(user.id).then((classrooms) =>
      setClassroomData(classrooms)
    )
  }

  const goBackInstructors = (e) => {
    e.preventDefault()
    setBool(!bool)
    setInstructorBool(!instructorBool)
  }

  const goBackClassroom = (e) => {
    e.preventDefault()
    setBool(!bool)
    setClassroomBool(!classroomBool)
  }

  const instructorSelected = (e) => {
    e.preventDefault()
    data.instructor = e.target.id
    setIsInstructor(!isInstructor)
    setInstructorBool(!instructorBool)
    setInstructorName(e.target.innerText)
  }

  const classroomSelected = (e) => {
    e.preventDefault()
    data.capacity = e.target
      .getAttribute("data-rows")
      .split(",")
      .reduce((acc, el) => acc + parseInt(el), 0)
    data.classroom = e.target.id
    setIsClassroom(!isClassroom)
    setClassroomBool(!classroomBool)
    setClassroomName(e.target.innerText)
  }

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const filteredInstructors = instructorsData.filter((instructor) => {
    return (
      instructor.user.name.toLowerCase().indexOf(search.toLocaleLowerCase()) >
      -1
    )
  })

  const filteredClassroom = classroomData.filter((classroom) => {
    return (
      classroom.user.name.toLowerCase().indexOf(search.toLocaleLowerCase()) > -1
    )
  })

  return (
    <>
      <section className="container-fluid margin-top">
        <Banner title="Add lesson" subtitle={user.user.name} />
      </section>
      <section className="container add-lesson">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-4 d-flex justify-content-end">
            <h1 className="big-yellow big">Add lesson</h1>
          </div>
          <div className="col-sm-6 col-12">
            <form onSubmit={handleSubmit}>
              <>
                <InputWithLabel
                  value={data.name}
                  onBlur={onBlur}
                  onChange={onChange}
                  name="name"
                  type="text"
                  className={`form-control ${touch.name && error.name ? "is-invalid" : ""
                    }`}
                  placeholder="Lesson name"
                />

                <div className="form-group">
                  <label className="label" htmlFor="discipline">
                    Disciplines
                  </label>
                  <CheckBoxWithLabel
                    data={disciplinesList}
                    name="discipline"
                    onChange={getDisciplinesItems}
                  />
                </div>

                <InputWithLabel
                  value={data.address}
                  onBlur={onBlur}
                  onChange={onChange}
                  name="address"
                  type="text"
                  className={`form-control ${touch.address && error.address ? "is-invalid" : ""
                    }`}
                  placeholder={
                    user.role === "Gym"
                      ? user.user.address
                      : "Enter lesson addres"
                  }
                  role={user.role}
                />

                <InputWithLabel
                  value={data.city}
                  onBlur={onBlur}
                  onChange={onChange}
                  name="city"
                  type="text"
                  className={`form-control ${touch.city && error.city ? "is-invalid" : ""
                    }`}
                  placeholder={
                    user.role === "Gym" ? user.user.city : "Enter lesson city"
                  }
                  role={user.role}
                />

                <InputWithLabel
                  value={data.zipcode}
                  onBlur={onBlur}
                  onChange={onChange}
                  name="zipcode"
                  type="number"
                  className={`form-control ${touch.zipcode && error.zipcode ? "is-invalid" : ""
                    }`}
                  placeholder={
                    user.role === "Gym"
                      ? user.user.zipcode
                      : "Enter lesson zipcode"
                  }
                  role={user.role}
                />

                <div className="form-group">
                  <label className="label" htmlFor="date">
                    Date
                  </label>
                  <DateTimePicker
                    onChange={setTime}
                    value={data.date}
                    format="dd-MM-y h:mm a"
                  />
                </div>

                <InputWithLabel
                  value={data.details}
                  onBlur={onBlur}
                  onChange={onChange}
                  name="details"
                  type="text"
                  className={`form-control ${touch.details && error.details ? "is-invalid" : ""
                    }`}
                  placeholder="Enter lesson details"
                />

                <InputWithLabel
                  value={data.duration}
                  onBlur={onBlur}
                  onChange={onChange}
                  name="duration"
                  type="number"
                  className={`form-control ${touch.duration && error.duration ? "is-invalid" : ""
                    }`}
                  placeholder="Enter lesson duration in minutes (default 45min)"
                />

                <InputWithLabel
                  value={data.capacity}
                  onBlur={onBlur}
                  onChange={onChange}
                  name="capacity"
                  type="number"
                  className={`form-control ${touch.capacity && error.capacity ? "is-invalid" : ""
                    }`}
                  placeholder="Enter capacity"
                  role={user.role}
                />

                <div className="row justify-content-between class-instr-data">
                  {isInstructor && (
                    <div className="col-12 col-sm-6 instructor">
                      <strong>Instructor</strong>
                      {instructorName}
                    </div>
                  )}
                  {isClassroom && (
                    <div className="col-12 col-sm-6 instructor">
                      <strong>Classroom</strong>
                      {classroomName}
                    </div>
                  )}
                </div>

                {registerError && (
                  <div className="alert alert-danger">{registerError}</div>
                )}

                {user.role === "Gym" &&
                  <div className="row justify-content-between select-lesson-row">
                    <div className="col-6 d-flex justify-content-center">
                      <Button
                        className="button __yellow-btn m-0"
                        onClick={selectInstructor}
                      >
                        Select instructor
                  </Button>
                    </div>
                    <div className="col-6 d-flex justify-content-center">

                      <Button
                        className="button __yellow-btn m-0"
                        onClick={selectClassroom}
                      >
                        Select classroom
                  </Button>
                    </div>
                  </div>
                }
              </>

              {user.role === "Gym" && (
                <>
                  {instructorBool && (
                    <>
                      <h1 className="title">
                        <div
                          className="go-back"
                          onClick={goBackInstructors}
                        ></div>
                        back
                      </h1>
                      <div className="row">
                        <div className="col-12 form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Search by instructor name"
                            onChange={handleChange}
                            value={search}
                          />
                        </div>
                      </div>
                      <div className="row">
                        {filteredInstructors.map((el) => (
                          <div
                            className="col-sm-6 col-12 instructor-row"
                            onClick={instructorSelected}
                            id={el.id}
                          >
                            <div
                              className="avatar"
                              style={{
                                background: `url(${el.user.avatar}) no-repeat center center / contain`,
                              }}
                              id={el.id}
                            ></div>
                            {el.user.name}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                  {classroomBool && (
                    <>
                      <h1 className="title">
                        <div
                          className="go-back"
                          onClick={goBackClassroom}
                        ></div>
                        back
                      </h1>
                      <div className="row">
                        <div className="col-12 form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Search by classroom name"
                            onChange={handleChange}
                            value={search}
                          />
                        </div>
                      </div>
                      <div className="row">
                        {filteredClassroom.map((el) => (
                          <div
                            className="col-sm-6 col-12 instructor-row"
                            id={el.id}
                            data-rows={el.rows}
                            onClick={classroomSelected}
                          >
                            {el.name} room
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </>
              )}

              <Button
                type="submit"
                className="Button Button__enter"
                disabled={isError}
              >
                Create lesson
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
