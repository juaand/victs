import './PlanItem.css'
import React from 'react'
import Button from '../../Button/Button'

const PlanItem = ({plan}) => {

    const stripeLaunch = () => {
        console.log('Stripe Launch here')
    }

    return (
        <div className="col-6 col-sm-3 plans-item">
            <h4 className="purple">{plan.quantity} Lessons</h4>
            <Button className="button __yellow-btn" onClick={stripeLaunch}>{plan.price} €</Button>
            <small>{plan.price / plan.quantity} € / Lesson</small>
            <p className="save">save {((4 - (plan.price / plan.quantity)) / 4 * 100).toFixed(1)} %</p>
        </div>
    )
}

export default PlanItem