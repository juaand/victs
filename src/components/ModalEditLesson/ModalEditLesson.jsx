import './ModalEditLesson.css'
import React, {useState} from "react"
import {useFormState} from "../../hooks/useFormState"
import InputWithLabel from "../Form/InputWithLabel/InputWithLabel"
import Button from "../Button/Button"
import {getInstructors, updateLesson} from "../../services/ApiClient"

export default function ModalEditLesson({onClick, user}) {

  const {state, onBlur, onChange} = useFormState(
    {
      data: {
        id: user.id,
        name: user.name,
        instructor: user.instructor.id,
        address: user.address,
        city: user.city,
        zipcode: user.zipcode,
        date: new Date(user.date),
        duration: user.duration,
        details: user.details,
      },
      error: {
        name: true,
        instructor: true,
        address: true,
        city: true,
        zipcode: true,
      },
      touch: {},
    },
    {
      name: (v) => v.length,
      instructor: (v) => v.length,
      address: (v) => v.length,
      city: (v) => v.length,
      zipcode: (v) => v.length,
      date: (v) => v.length,
      duration: (v) => v.length,
      details: (v) => v.length,
    }
  )

  const {data} = state
  
  // eslint-disable-next-line no-unused-vars
  const [registerError, setRegisterError] = useState(null)
  const [isInstructor] = useState(true)
  const [instructorName, setInstructorName] = useState(user?.instructor?.user?.name)
  const [instructorBool, setInstructorBool] = useState(false)
  const [instructorsData, setInstructorsData] = useState([])
  const [instructorId, setInstructorId] = useState(data.instructor)
  const [search, setSearch] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      data.instructor = instructorId
      await updateLesson(data)

    } catch (err) {
      setRegisterError(err.response?.data?.message)
    }
  }

  const selectInstructor = (event) => {
    event.preventDefault()
    setInstructorBool(!instructorBool)
    data.instructor = ""
    getInstructors().then((instructors) => setInstructorsData(instructors))
  }

  const instructorSelected = (e) => {
    e.preventDefault()
    setInstructorId(e.target.id)
    setInstructorBool(!instructorBool)
    setInstructorName(e.target.innerText)
  }

  const goBackInstructors = (e) => {
    e.preventDefault()
    setInstructorBool(!instructorBool)
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

  return (
    <div className="modal ModalEditLesson">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-6 col-12 modal-body">
            <span className="close" onClick={onClick}></span>
            <div className="row edit-profile">
              <form className="col-12" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-12 lesson-info">
                    <div className={`avatar ${user.discipline}`}>
                    </div>
                    <h1 className="big big-yellow">{user.discipline}</h1>
                  </div>
                  <div className="col-12 profile-info">
                    <div className="row content-block">
                      <div className="col-12">
                        <InputWithLabel
                          value={data.name}
                          onBlur={onBlur}
                          onChange={onChange}
                          name="name"
                          type="text"
                          className="form-control"
                          placeholder={data.name}
                        />
                      </div>
                    </div>
                    <div className="row content-block d-flex align-items-start">
                      <div className="col-12">
                        <InputWithLabel
                          value={data.address}
                          onBlur={onBlur}
                          onChange={onChange}
                          name="address"
                          type="text"
                          className="form-control"
                          placeholder={
                            data.address ? data.address : "Insert the address"
                          }
                        />
                        <InputWithLabel
                          value={data.city}
                          onBlur={onBlur}
                          onChange={onChange}
                          name="city"
                          type="text"
                          className="form-control"
                          placeholder={
                            data.city ? data.city : "Insert the city"
                          }
                        />
                        <InputWithLabel
                          value={data.zipcode}
                          onBlur={onBlur}
                          onChange={onChange}
                          name="zipcode"
                          type="text"
                          className="form-control"
                          placeholder={
                            data.zipcode ? data.zipcode : "Insert the zipcode"
                          }
                        />
                        <InputWithLabel
                          value={data.duration}
                          onBlur={onBlur}
                          onChange={onChange}
                          name="duration"
                          type="text"
                          className="form-control"
                          placeholder={
                            data.duration ? data.duration : "Insert duration"
                          }
                        />
                        <InputWithLabel
                          value={data.details}
                          onBlur={onBlur}
                          onChange={onChange}
                          name="details"
                          type="text"
                          className="form-control"
                          placeholder={
                            data.details ? data.details : "Insert details"
                          }
                        />
                      </div>

                      {isInstructor && (
                        <>
                          <div className="col-12 instructor">
                            <strong>Instructor</strong>
                          </div>
                          <div className="col-12">
                            {instructorName}
                          </div>
                        </>
                      )}


                      <div className="col-12">
                        <Button
                          className="select-coach"
                          onClick={selectInstructor}
                        >Change instructor</Button>
                      </div>

                      {instructorBool && (
                        <>
                          <hr />
                          <div className="col-12">
                            <div
                              className="go-back"
                              onClick={goBackInstructors}
                            >close</div>
                          </div>
                          <div className="col-12 form-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search by instructor name"
                              onChange={handleChange}
                              value={search}
                            />
                          </div>
                          {filteredInstructors.map((el) => (
                            <div
                              className="col-sm-6 col-12 instructor-row"
                              onClick={instructorSelected}
                              id={el.id}
                            >
                              {el.user.name}
                            </div>
                          ))}
                        </>
                      )}


                      <div className="col-12 col-sm-6">
                        <Button className="button __yellow-btn" onClick={onClick}>
                          Edit Lesson
                        </Button>
                      </div>
                      <div className="col-12 col-sm-6 d-flex justify-content-end">
                        <Button className="button __delete-btn">Delete Lesson</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
