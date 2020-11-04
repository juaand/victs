import './EditLesson.css'
import React, {useState, useEffect} from 'react'
import Banner from '../Banner/Banner'
import {useFormState} from '../../hooks/useFormState'
import {getDisciplines, getInstructors, getGymClassrooms} from '../../services/ApiClient'

import InputWithLabel from '../Form/InputWithLabel/InputWithLabel'
import Button from '../Button/Button'
import DateTimePicker from 'react-datetime-picker'
import CheckBoxWithLabel from '../Form/CheckBoxWithLabel/CheckBoxWithLabel'

export default function EditLesson(props) {

    const user = props.user
    const lesson = props.location.state.lesson

    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                name: lesson.name,
                address: lesson.addres,
                city: lesson.city,
                zipcode: lesson.zipcode,
                discipline: lesson.discipline,
                details: lesson.details,
                inithour: lesson.inithour,
                instructor: lesson.instructor.user.name,
                classroom: lesson.classroom.name,
                capacity: lesson.capacity,
                duration: lesson.duration
            },
            error: {
                name: true,
                inithour: true
            },
            touch: {},
        },
        {
            name: v => v.length,
            address: v => v.length,
            city: v => v.length,
            zipcode: v => v.length,
            details: v => v.length,
            capacity: v => v.length,
            inithour: v => v.length,
            duration: v => v.length
        }
    )

    const {data, error, touch} = state

    const [inithour, setInithour] = useState(new Date())
    const [disciplinesList, setDisciplinesList] = useState([])
    const [registerError, setRegisterError] = useState(null)
    const [bool, setBool] = useState(true)
    const [instructorBool, setInstructorBool] = useState(false)
    const [classroomBool, setClassroomBool] = useState(false)
    const [instructorsData, setInstructorsData] = useState([])
    const [classroomData, setClassroomData] = useState([])
    const [isInstructor, setIsInstructor] = useState(true)
    const [isClassroom, setIsClassroom] = useState(true)
    const [instructorName, setInstructorName] = useState('')
    const [classroomName, setClassroomName] = useState('')
    const [search, setSearch] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            console.log(data)
            // await updateLesson(data)
            // update user / user login cookie
            // history.push('/my-info-gym')
        } catch (err) {
            setRegisterError(err.response?.data?.message)
        }
    }

    const getDisciplinesItems = (e) => {
        let newArray = [...data.disciplines, e.target.id]
        if (data.disciplines.includes(e.target.id)) {
            newArray = newArray.filter(el => el !== e.target.id)
        }
        data.disciplines = newArray
    }

    const setTime = (e) => {
        setInithour(e)
        console.log(inithour)
    }

    useEffect(() => {
        getDisciplines()
            .then(res => {
                console.log(res)
                setDisciplinesList(res[0])
            })
    }, [])

    const isError = Object.values(error).some(err => err)

    const selectInstructor = (event) => {
        event.preventDefault()
        setBool(!bool)
        setInstructorBool(!instructorBool)
        data.instructor = ''
        setClassroomBool(false)
        getInstructors()
            .then((instructors) => setInstructorsData(instructors))
        console.log('select instructor')
    }

    const selectClassroom = (event) => {
        event.preventDefault()
        setBool(!bool)
        setClassroomBool(!classroomBool)
        setInstructorBool(false)
        getGymClassrooms(user.id)
            .then(classrooms => setClassroomData(classrooms))
        console.log('select classroom')
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
        data.capacity = e.target.getAttribute('data-rows').split(',').reduce((acc, el) => acc + parseInt(el), 0)
        data.classroom = e.target.id
        setIsClassroom(!isClassroom)
        setClassroomBool(!classroomBool)
        setClassroomName(e.target.innerText)
    }

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    const filteredInstructors = instructorsData.filter(instructor => {
        return (
            (instructor.user.name.toLowerCase()).indexOf(search.toLocaleLowerCase()) > -1
        )
    })

    const filteredClassroom = classroomData.filter(classroom => {
        return (
            (classroom.user.name.toLowerCase()).indexOf(search.toLocaleLowerCase()) > -1
        )
    })

    return (
        <>
            <section className="container-fluid margin-top EditLesson">
                <Banner title="Edit lesson" subtitle={user.user.name} />
            </section>
            <section className="container add-lesson">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-4 d-flex justify-content-end">
                        <h1 className="big-yellow big">Edit lesson</h1>
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
                                    placeholder="Lesson name"

                                />

                                <div className="form-group">
                                    <label className="label" htmlFor="disciplines">Disciplines</label>
                                    <CheckBoxWithLabel data={disciplinesList} name="disciplines" onChange={getDisciplinesItems} />
                                </div>

                                <InputWithLabel
                                    value={data.address}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    name="address"
                                    type="text"
                                    className={`form-control ${touch.address && error.address ? "is-invalid" : ""}`}
                                    placeholder={user.role === 'Gym' ? user.user.address : 'Enter lesson addres'}
                                    role={user.role}
                                />

                                <InputWithLabel
                                    value={data.city}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    name="city"
                                    type="text"
                                    className={`form-control ${touch.city && error.city ? "is-invalid" : ""}`}
                                    placeholder={user.role === 'Gym' ? user.user.city : 'Enter lesson city'}
                                    role={user.role}

                                />

                                <InputWithLabel
                                    value={data.zipcode}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    name="zipcode"
                                    type="number"
                                    className={`form-control ${touch.zipcode && error.zipcode ? "is-invalid" : ""}`}
                                    placeholder={user.role === 'Gym' ? user.user.zipcode : 'Enter lesson zipcode'}
                                    role={user.role}
                                />

                                <div className="form-group">
                                    <label className="label" htmlFor="date">Date</label>
                                    <DateTimePicker
                                        onChange={setTime}
                                        value={data.inithour}
                                        format="dd-MM-y h:mm a"
                                    />
                                </div>

                                <InputWithLabel
                                    value={data.details}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    name="details"
                                    type="text"
                                    className={`form-control ${touch.details && error.details ? "is-invalid" : ""}`}
                                    placeholder="Enter lesson details"

                                />

                                <InputWithLabel
                                    value={data.duration}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    name="duration"
                                    type="number"
                                    className={`form-control ${touch.duration && error.duration ? "is-invalid" : ""}`}
                                    placeholder="Enter lesson duration in minutes (default 45min)"
                                />

                                <InputWithLabel
                                    value={data.capacity}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    name="capacity"
                                    type="number"
                                    className={`form-control ${touch.capacity && error.capacity ? "is-invalid" : ""}`}
                                    placeholder="Enter capacity"
                                    role={user.role}

                                />

                                <div className="row justify-content-between class-instr-data">
                                    {isInstructor &&
                                        <div className="col-12 col-sm-6 instructor">
                                            <strong>Instructor</strong>
                                            {data.instructor}
                                        </div>
                                    }
                                    {isClassroom &&
                                        <div className="col-12 col-sm-6 instructor">
                                            <strong>Classroom</strong>
                                            {data.classroom}
                                        </div>
                                    }
                                </div>

                                {registerError && <div className="alert alert-danger">{registerError}</div>}

                                <div className="row justify-content-between">

                                    <Button className="btn __yellow-btn" onClick={selectInstructor}>Select instructor</Button>

                                    <Button className="btn __yellow-btn" onClick={selectClassroom}>Select classroom</Button>
                                </div>
                            </>

                            {user.role === 'Gym' &&
                                <>
                                    {instructorBool &&
                                        <>
                                            <h1 className="title">
                                                <div className="go-back" onClick={goBackInstructors}></div>
                                            back
                                            </h1>
                                            <div className="row">
                                                <div className="col-12 form-group">
                                                    <input type="text" className="form-control" placeholder="Search by instructor name" onChange={handleChange} value={search} /></div>
                                            </div>
                                            <div className="row">
                                                {filteredInstructors.map(el => <div className="col-sm-6 col-12 instructor-row" onClick={instructorSelected} id={el.id}>
                                                    <div className="avatar" style={{background: `url(${el.user.avatar}) no-repeat center center / contain`}} id={el.id}></div>
                                                    {el.user.name}
                                                </div>)}
                                            </div>
                                        </>
                                    }
                                    {classroomBool &&
                                        <>
                                            <h1 className="title">
                                                <div className="go-back" onClick={goBackClassroom}></div>
                                            back
                                            </h1>
                                            <div className="row">
                                                <div className="col-12 form-group">
                                                    <input type="text" className="form-control" placeholder="Search by classroom name" onChange={handleChange} value={search} /></div>
                                            </div>
                                            <div className="row">
                                                {filteredClassroom.map(el => <div className="col-sm-6 col-12 instructor-row" id={el.id} data-rows={el.rows} onClick={classroomSelected}>
                                                    {el.name} room
                                                </div>)}
                                            </div>
                                        </>
                                    }
                                </>
                            }

                            <Button
                                type="submit"
                                className="Button Button__enter"
                                disabled={isError}
                            >Edit lesson</Button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}
