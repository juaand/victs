import './EditClassroom.css'
import React, {useState, useEffect} from 'react'
import Banner from '../../Banner/Banner'
import {useFormState} from '../../../hooks/useFormState'
import {getDisciplines, updateClassroom, getClassroomLessons, deleteClassroom} from '../../../services/ApiClient'
import InputWithLabel from '../../Form/InputWithLabel/InputWithLabel'
import Button from '../../Button/Button'
import {useHistory} from 'react-router-dom'
import CheckBoxWithLabel from '../../Form/CheckBoxWithLabel/CheckBoxWithLabel'
import ClassroomLessons from '../../ClassroomLessons/ClassroomLessons'

export default function EditClassroom(props) {

    const user = props.user
    const classroomInfo = props.location.state.classroom

    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                user: user.user.id,
                gym: user.id,
                name: classroomInfo.name,
                rows: classroomInfo.rows,
                discipline: classroomInfo.discipline
            },
            error: {
                name: true,
                rows: true
            },
            touch: {},
        },
        {
            name: v => v.length,
            rows: v => v.length,
            discipline: v => v.length
        }
    )

    const history = useHistory()

    const {data, error, touch} = state

    const [disciplineList, setDisciplineList] = useState([])
    const [registerError, setRegisterError] = useState(null)
    const [lessonList, setLessonList] = useState([])
    const [isMessage, setIsMessage] = useState('')


    const handleSubmit = async (event) => {
        event.preventDefault()

        if (isNaN(data.rows)) {
            const rowsArr = data.rows.split(',').map(el => parseInt(el))
            data.rows = rowsArr
        } else {
            data.rows = classroomInfo.rows
        }

        try {
            console.log(data)
            data.id = classroomInfo.id
            await updateClassroom(data)
            history.push('/my-info-gym')
        } catch (err) {
            setRegisterError(err.response?.data?.message)
        }
    }

    const getDisciplineItems = (e) => {
        let newArray = [...data.discipline, e.target.id]
        if (data.discipline.includes(e.target.id)) {
            newArray = newArray.filter(el => el !== e.target.id)
        }
        data.discipline = newArray
    }

    const classroomDelete = async (classroomId) => {
        await deleteClassroom(classroomId)
        setIsMessage('Classroom deleted successfully')
        setTimeout(() => {
            history.push('/my-info-gym')
        }, 3000)
    }


    useEffect(() => {
        getDisciplines()
            .then(res => {
                setDisciplineList(res[0])
            })
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const lessons = await getClassroomLessons(classroomInfo.id)
            setLessonList(lessons)
        }
        fetchData()
    }, [classroomInfo.id])

    const isError = Object.values(error).some(err => err)

    return (
        <>
            {isMessage && <div className="EditLesson message">
                <div className="content">{isMessage}</div>
            </div>}
            <section className="container-fluid margin-top">
                <Banner title="Edit classroom" subtitle={classroomInfo.name} />
            </section>
            <section className="container-fluid my-plans EditClassroom">
                <div className="container">
                    <div className="row">
                        <div className="col-4 item">
                            <h1>Lessons booked in this classroom</h1>
                        </div>
                        <div className="col-8 lesson-guest d-flex align-items-center">
                            <div className="row w-100">
                                {lessonList.length === 0 ? <h3 className="no-info">No lessons were booked in this classroom</h3> : lessonList.map(el => <ClassroomLessons lesson={el} />)}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="container add-lesson">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-4 d-flex justify-content-end">
                        <h1 className="big-yellow big">Edit classroom</h1>
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
                                    className={`form-control ${touch.name && error.name ? "is-invalid" : ""}`}
                                    placeholder="Classroom name"

                                />

                                <div className="form-group">
                                    <label className="label" htmlFor="discipline">Disciplines</label>
                                    <CheckBoxWithLabel data={disciplineList} name="discipline" onChange={getDisciplineItems} />
                                </div>

                                <InputWithLabel
                                    value={data.rows}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    name="rows"
                                    type="text"
                                    className={`form-control ${touch.rows && error.rows ? "is-invalid" : ""}`}
                                    placeholder="Enter seats by rows facing instructor spot"
                                />
                                <small>Enter seats per rows separate by comma. Ex "2,3" means two seats on first row and three seats on second row.</small>

                                {registerError && <div className="alert alert-danger">{registerError}</div>}
                            </>

                            <Button
                                type="submit"
                                className="Button Button__enter"
                                disabled={isError}
                            >Edit classroom</Button>
                        </form>
                    </div>
                </div>
                <div className="delete-row delete-block row justify-content-center">
                    <div className="col-12 col-sm-4 d-flex justify-content-end">
                        <h1 className="big-yellow big">Delete classroom</h1>
                    </div>
                    <div className={lessonList.length > 0 ? 'col-sm-6 col-12 delete-btn' : 'col-sm-6 col-12'}>
                        {lessonList.length > 0 && <smal>Cannot delete classroom if any lesson were booked in it</smal>}

                        <Button className={lessonList.length > 0 ? 'Button Button__enter disabled' : 'Button Button__enter'} onClick={() => classroomDelete(classroomInfo.id)}>Delete classroom</Button>
                    </div>
                </div>
            </section>
        </>
    )
}
