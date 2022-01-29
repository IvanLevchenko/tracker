import { useRef } from 'react'
import './ActivityForm.scss'
import { Input, Button, Select } from 'reactstrap'

import { createNewActivity } from '../../api/api'

export default function ActivityForm({ onUpdateActivities }) {
  const startTimeRef = useRef()
  const finishTimeRef = useRef()
  const distanceTimeRef = useRef()
  const typeRef = useRef()

  const handleActivitySubmit = (event) => {
    event.preventDefault()
    createNewActivity({
      startTime: startTimeRef.current.value,
      finishTime: finishTimeRef.current.value,
      distance: distanceTimeRef.current.value,
      type: typeRef.current.value,
    })
    onUpdateActivities()
    startTimeRef.current.value = ''
    finishTimeRef.current.value = ''
    distanceTimeRef.current.value = ''
    typeRef.current.value = ''
  }

  return (
    <form className="activity-form" onSubmit={handleActivitySubmit}>
      <div className="activity-form__header">
        <h4>Add some activities</h4>
      </div>
      <div className="activity-form__body">
        <div className="activity-form__item">
          <label htmlFor="start-time-input">Start time</label>
          <Input
            type="datetime-local"
            id="start-time-input"
            className="activity-form__input"
            innerRef={startTimeRef}
            name=""
            required
          />
        </div>
        <div className="activity-form__item">
          <label htmlFor="finish-time-input">Finish time</label>
          <Input
            type="datetime-local"
            id="finish-time-input"
            className="activity-form__input"
            innerRef={finishTimeRef}
            name=""
            required
          />
        </div>
        <div className="activity-form__item">
          <label htmlFor="distance-input">Distance</label>
          <Input
            type="number"
            id="distance-input"
            placeholder="(km)"
            className="activity-form__input"
            innerRef={distanceTimeRef}
            name=""
            min="1"
            required
          />
        </div>
        <div className="activity-form__item">
          <label htmlFor="selectType">Type</label>
          <Input type="select" name="" id="selectType" innerRef={typeRef}>
            <option value="Ride">Ride</option>
            <option value="Run">Run</option>
          </Input>
        </div>
        <Button type="submit" color="primary">
          Save
        </Button>
      </div>
    </form>
  )
}
