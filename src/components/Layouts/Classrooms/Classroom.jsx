import './Classroom.css'
import React, {useState, useEffect} from 'react'
import Banner from '../../Banner/Banner'
import {useFormState} from '../../../hooks/useFormState'
import {getDisciplines, createClassroom} from '../../../services/ApiClient'
import InputWithLabel from '../../Form/InputWithLabel/InputWithLabel'
import Button from '../../Button/Button'
import {useHistory} from 'react-router-dom'
import CheckBoxWithLabel from '../../Form/CheckBoxWithLabel/CheckBoxWithLabel'

export default function Classroom({user}) {

    console.log(user)

    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                user: user.user.id,
                gym: user.id,
                name: "",
                rows: [],
                discipline: []
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


    const handleSubmit = async (event) => {
        event.preventDefault()

        if (data.rows === 0) {
            data.rows = 0
        } else {data.rows = data.rows.split(',').map(el => parseInt(el))}

        try {
            console.log(data)
            await createClassroom(data)
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


    useEffect(() => {
        getDisciplines()
            .then(res => {
                console.log(res)
                setDisciplineList(res[0])
            })
    }, [])

    const isError = Object.values(error).some(err => err)

    return (
        <>
            <section className="container-fluid margin-top">
                <Banner title="Add classroom" subtitle={user.user.name} />
            </section>
            <section className="container add-lesson">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-4 d-flex justify-content-end">
                        <h1 className="big-yellow big">Add classroom</h1>
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
                            >Create classroom</Button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}
