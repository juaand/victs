import './MyInfo.css'
import React, {useEffect} from 'react'
import CalendarItem from '../../CalendarItem/CalendarItem'
import MyPlans from '../../Layouts/MyPlans/MyPlans'
import AttendedLessons from '../../Layouts/AttendedLessons/AttendedLessons'
import WaitingLessons from '../../Layouts/WaitingLessons/WaitingLessons'
import UserInfo from '../../Layouts/UserInfo/UserInfo'
import UserAccordeon from '../../UserAccordeon/UserAccordeon'

const MyInfo = (props) => {

    const getGymName = (arr) => {
        return arr.filter((ele, ind) => ind === arr.findIndex(elem => elem.gym.user.name === ele.gym.user.name))
    }

    const byLessons = props.user.lessons.reduce((acc, e) => {
        acc[e.gym.id] = (acc[e.gym.id] || [])
        acc[e.gym.id].push(e)
        return acc
    }, {})

    useEffect(() => {
        document.querySelector('.navbar').classList.add('__grayHeader')
    }, [])

    return (
        <>
            <UserAccordeon user={props.user} />
            <MyPlans plans={props.user.packages} />
            <AttendedLessons title="Attended lessons" message="Oops no lessons attended..." strong="Keep calm and move on" />

            {props.user.lessons.length &&
                <div className="container my-info" >
                    <div className="row">
                        <div className="col-12">
                            {getGymName(props.user.lessons).map(el =>
                                <div className="row gym-name">
                                    <div className="col-4">
                                        <h1 className="big-yellow">Upcoming classes scheduled in <span>{el.gym.user.name}</span></h1>
                                    </div>
                                    <div className="col-8">
                                        <div className="row">
                                            {Object.keys(byLessons).map(key =>
                                                key === el.gym.id &&
                                                byLessons[key].map(el =>
                                                    <CalendarItem
                                                        lessonInstructor={el.instructor.user.name}
                                                        lessonDate={el.inithour}
                                                        lessonHour={el.inithour}
                                                        lessonDiscipline={el.discipline}
                                                        InstructorAvatar={el.instructor.user.avatar}
                                                        lessonCapacity={el.capacity}
                                                    />
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            }
            <>
                <WaitingLessons title="Waiting list lessons" message="No lessons on waiting list" strong="That's good news" />
                <UserInfo title="My info" data={props.user}/>
            </>
        </>
    )
}

export default MyInfo

