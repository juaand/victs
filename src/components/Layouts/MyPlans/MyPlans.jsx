import './MyPlans.css'
import React, {useState} from 'react'
import plansData from '../../../data/plans'
import PlanItem from '../PlanItem/PlanItem'



const MyPlans = ({plans}) => {

    const [showPackages, setShowPackages] = useState(false)
    const [userPlans, setUserPlans] = useState(plans)
    const updatePlan = (value) => {
        setUserPlans(value)
    }


    const showPlans = () => {
        setShowPackages(true)
    }


    return (
        <div className="container-fluid my-plans">
            <div className="container">
                <div className="row">
                    <div className="col-4 item">
                        <h1>My Lessons</h1>
                        {plans === 0 ?
                            <h4 className="purple">Opps you don't have any plans</h4>
                            :
                            <h4 className="purple">You have {userPlans} lessons</h4>
                        }
                        <span className="add-plans" onClick={showPlans}>Wanna add more lessons?</span>
                    </div>
                    {showPackages &&
                        <div className="col-8 plans-block">
                            <div className="row">
                                {plansData.map(plan =>
                                    <PlanItem plan={plan} onClick={updatePlan} userPlans={userPlans} />
                                )}
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default MyPlans