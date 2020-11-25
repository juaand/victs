import './ModalEditReservation.css'
import React, {useState} from "react"
import {useFormState} from "../../hooks/useFormState"
import InputWithLabel from "../Form/InputWithLabel/InputWithLabel"
import Button from "../Button/Button"
import {updateReservation, getAllLessons} from "../../services/ApiClient"

export default function ModalEditReservation({onClick, user, deleteReservation}) {

  const {state, onBlur, onChange} = useFormState(
    {
      data: {
        id: user.id,
        user: user.user.id,
        lesson: user.lesson.id,
        row: user.row,
        column: user.column,
        points: user.points,
      },
      error: {
        user: true,
        lesson: true,
        row: true,
        column: true,
        points: true,
      },
      touch: {},
    },
    {
      user: (v) => v.length,
      lesson: (v) => v.length,
      row: (v) => v.length,
      column: (v) => v.length,
      points: (v) => v.length,
    }
  )

  const {data} = state

  // eslint-disable-next-line no-unused-vars
  const [registerError, setRegisterError] = useState(null)
  const [isLesson] = useState(true)
  const [lessonName, setLessonName] = useState(user.lesson.name)
  const [lessonBool, setLessonBool] = useState(false)
  const [lessonsData, setLessonsData] = useState([])
  const [lessonId, setLessonId] = useState(data.lesson)
  const [search, setSearch] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      data.lesson = lessonId
      await updateReservation(data)

    } catch (err) {
      setRegisterError(err.response?.data?.message)
    }
  }

  const selectLesson = (event) => {
    event.preventDefault()
    setLessonBool(!lessonBool)
    data.lesson = ""
    getAllLessons().then((lessons) => setLessonsData(lessons))

  }

  const lessonSelected = (e) => {
    e.preventDefault()
    setLessonId(e.target.id)
    setLessonBool(!lessonBool)
    setLessonName(e.target.innerText)
  }

  const goBackLessons = (e) => {
    e.preventDefault()
    setLessonBool(!lessonBool)
  }

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const filteredLessons = lessonsData.filter((lesson) => {
    return (
      lesson.name.toLowerCase().indexOf(search.toLocaleLowerCase()) >
      -1
    )
  })

  return (
    <div className="modal ModalEditReservation">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-6 col-12 modal-body">
            <span className="close" onClick={onClick}></span>
            <div className="row edit-profile">
              <form className="col-12" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-12 profile-info">
                    <div className="row content-block d-flex align-items-start">
                      <div className="col-6">
                        <InputWithLabel
                          value={data.row}
                          onBlur={onBlur}
                          onChange={onChange}
                          name="row"
                          type="text"
                          className="form-control"
                          placeholder={
                            data.row ? data.row : "Insert the row"
                          }
                        />
                      </div>
                      <div className="col-6">
                        <InputWithLabel
                          value={data.column}
                          onBlur={onBlur}
                          onChange={onChange}
                          name="column"
                          type="text"
                          className="form-control"
                          placeholder={
                            data.column ? data.column : "Insert the column"
                          }
                        />
                      </div>

                      {isLesson && (
                        <>
                          <div className="col-12 instructor">
                            <strong>Lesson</strong>
                          </div>
                          <div className="col-12">
                            {lessonName}
                          </div>
                        </>
                      )}


                      <div className="col-12">
                        <Button
                          className="select-coach"
                          onClick={selectLesson}
                        >Change Lesson</Button>
                      </div>

                      {lessonBool && (
                        <>
                          <hr />

                          <div className="col-12">
                            <div
                              className="go-back"
                              onClick={goBackLessons}
                            >close</div>
                          </div>
                          <div className="col-12 form-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search by lesson name"
                              onChange={handleChange}
                              value={search}
                            />
                          </div>
                          {filteredLessons.map((el) => (
                            <div
                              className="col-sm-6 col-12 instructor-row"
                              onClick={lessonSelected}
                              id={el.id}
                            >
                              {el.name}
                            </div>
                          ))}
                        </>
                      )}

                      <div className="col-12 col-sm-6">
                        <Button className="button __yellow-btn" onClick={onClick}>
                          Edit Reservation
                        </Button>
                      </div>
                      <div className="col-12 col-sm-6 d-flex justify-content-end">
                        <Button className="button __delete-btn" onClick={() => deleteReservation(user)}>reservation</Button>
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
