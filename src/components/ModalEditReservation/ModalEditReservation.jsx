import React, { useState } from "react";
import { useFormState } from "../../hooks/useFormState";
import InputWithLabel from "../Form/InputWithLabel/InputWithLabel";
import Button from "../Button/Button";
import { updateReservation, getAllLessons } from "../../services/ApiClient";
import { useAuthContext } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";

export default function ModalEditReservation({ onClick, user }) {
  const {user2} = useAuthContext()

  const { state, onBlur, onChange } = useFormState(
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
  );

  const { data, error, touch } = state;

  const [edit, setEdit] = useState(false);
  const [registerError, setRegisterError] = useState(null);
  const [profileInfo, setProfileInfo] = useState(true);
  const [profileData, setProfileData] = useState(data);
  const [message, setMessage] = useState("");
  const [isLesson] = useState(true);
  const [lessonName, setLessonName] = useState(user.lesson.name);
  const [lessonBool, setLessonBool] = useState(false);
  const [lessonsData, setLessonsData] = useState([]);
  const [lessonId, setLessonId] = useState(data.lesson)
  const [search, setSearch] = useState('')

  const history = useHistory()

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
    event.preventDefault();
    setLessonBool(!lessonBool);
    data.lesson = "";
    getAllLessons().then((lessons) => setLessonsData(lessons));
    
  };

  const lessonSelected = (e) => {
    e.preventDefault();
    setLessonId(e.target.id);
    setLessonBool(!lessonBool);
    setLessonName(e.target.innerText);
  };

  const goBackLessons = (e) => {
    e.preventDefault();
    setLessonBool(!lessonBool);
  };

  const handleChange = (e) => {
    setSearch(e.target.value)
}

console.log(lessonsData)

  const filteredLessons = lessonsData.filter((lesson) => {
    return (
      lesson.name.toLowerCase().indexOf(search.toLocaleLowerCase()) >
      -1
    );
  });

  return (
    <div className="modal">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-6 col-12 modal-body">
            <span className="close" onClick={onClick}></span>
            <div className="row edit-profile">
              <form className="col-12" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-12 profile-info">
                    <div className="row content-block">
                      <div className="col-12">
                        <InputWithLabel
                          value={data.user}
                          onBlur={onBlur}
                          onChange={onChange}
                          name="user"
                          type="text"
                          className="form-control"
                          placeholder={data.user}
                        />
                      </div>
                    </div>
                    <div className="row content-block">
                      <div className="col-12">
                        <InputWithLabel
                          value={data.lesson}
                          onBlur={onBlur}
                          onChange={onChange}
                          name="lesson"
                          type="text"
                          className="form-control"
                          placeholder={
                            data.lesson
                              ? data.lesson
                              : "Insert the lesson"
                          }
                        />
                      </div>
                    </div>
                    <div className="row content-block d-flex align-items-start">
                      <div className="col-12">
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
                        <InputWithLabel
                          value={data.points}
                          onBlur={onBlur}
                          onChange={onChange}
                          name="points"
                          type="text"
                          className="form-control"
                          placeholder={
                            data.points ? data.points : "Insert the zipcode"
                          }
                        />
                      </div>
                      <div className="row justify-content-between class-instr-data">
                        {isLesson && (
                          <div className="col-6 col-sm-6 instructor">
                            <strong>Lesson</strong>
                            {lessonName}
                          </div>
                        )}
                      </div>
                      {registerError && (
                        <div className="alert alert-danger">
                          {registerError}
                        </div>
                      )}

                      <div className="row justify-content-between">
                        <div className="col-6 d-flex justify-content-center">
                          <Button
                            className="btn __yellow-btn m-0"
                            onClick={selectLesson}
                          >
                            Select Lesson
                          </Button>
                        </div>
                      </div>

                      {user2.role === "Admin" && (
                        <>
                          {lessonBool && (
                            <>
                              <h1 className="title">
                                <div
                                  className="go-back"
                                  onClick={goBackLessons}
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
                                {filteredLessons.map((el) => (
                                  <div
                                    className="col-sm-6 col-12 instructor-row"
                                    onClick={lessonSelected}
                                    id={el.id}
                                  >
                                    <div
                                      className="avatar"
                                      style={{
                                        background: `url(${el.instructor.user.avatar}) no-repeat center center / contain`,
                                      }}
                                      id={el.id}
                                    ></div>
                                    {el.name}
                                  </div>
                                ))}
                              </div>
                            </>
                          )}
                        </>
                      )}

                      <div className="col-12 col-sm-6">
                        <Button className="button __yellow-btn" onClick={onClick}>
                          Edit Reservation
                        </Button>
                      </div>
                      <div className="col-12 col-sm-6">
                        <Button className="button __yellow-btn">Cancel</Button>
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
  );
}
