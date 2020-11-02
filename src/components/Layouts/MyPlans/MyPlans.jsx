import './MyPlans.css'
import React, {useState, useEffect} from 'react'
import plansData from '../../../data/plans'
import PlanItem from '../PlanItem/PlanItem'
import StripeModal from '../../StripeComponents/StripeModal/StripeModal'

const MyPlans = ({plans}) => {

    const [showPackages, setShowPackages] = useState(false)
    const [userPlans, setUserPlans] = useState(plans)
    const [bool, setBool] = useState(false)
    const [planInfo, setPlanInfo] = useState([])

    const updatePlan = (value) => {
        console.log(value)
        setUserPlans(value)
    }

    const showPlans = () => {
        setShowPackages(true)
    }

    const showModal = (plan) => {
        setBool(!bool)
        setPlanInfo(plan)
    }

    const onCloseModal = () => {
        setBool(!bool)
    }

    useEffect(() => {
        setUserPlans(plans)
    }, [plans])


    return (
        <>
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
                                    <PlanItem plan={plan} onModal={showModal} />
                                )}
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
        {bool && <StripeModal onClick={updatePlan} plan={planInfo} onCloseModal={onCloseModal} />}
        </>
    )
}

export default MyPlans