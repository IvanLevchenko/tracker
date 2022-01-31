import { useEffect, useState } from 'react'
import './App.scss'
import { getActivities, deleteActivity } from './api/api'

import ActivityForm from './Components/ActivityForm/ActivityForm'
import ActivityItem from './Components/ActivityItem/ActivityItem'

function App() {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  const [recentActivities, setRecentActivities] = useState([])
  const [longestActions, setLongestActions] = useState(null)

  const findLongestAction = (activities) => {
    let longestRide = activities.filter((act) => act.type == 'Ride')
    let longestRun = activities.filter((act) => act.type == 'Run')
    let rideDate
    let runDate
    let rideDistance
    let runDistance
    let outputObject = {}

    if (longestRide.length) {
      longestRide = longestRide.reduce((prev, item) =>
        new Date(item.finishTime) - new Date(item.startTime) >
        new Date(prev.finishTime) - new Date(prev.startTime)
          ? item
          : prev,
      )

      rideDate =
        months[new Date(longestRide.startTime).getMonth()] +
        ' ' +
        new Date(longestRide.startTime).getDate()
      rideDistance = longestRide.distance + ' km'
    } else {
      longestRide = null
      runDate = null
      runDistance = null
    }

    if (longestRun.length) {
      longestRun = longestRun.reduce((prev, item) =>
        new Date(item.finishTime) - new Date(item.startTime) >
        new Date(prev.finishTime) - new Date(prev.startTime)
          ? item
          : prev,
      )

      runDate =
        months[new Date(longestRun.startTime).getMonth()] +
        ' ' +
        new Date(longestRun.startTime).getDate()
      runDistance = longestRun.distance + ' km'
    } else {
      longestRun = null
      runDate = null
      runDistance = null
    }

    if (longestRide) {
      outputObject.ride = { rideDate, rideDistance, rideTime: longestRide.time }
    }

    if (longestRun) {
      outputObject.run = { runDate, runDistance, runTime: longestRun.time }
    }

    setLongestActions(outputObject)
  }

  const getAllActivities = () => {
    console.log('getting activities')
    getActivities().then((activities) => {
      setRecentActivities(activities.data)
      findLongestAction(activities.data)
    })
  }

  const deleteActivityHandler = (_id) => {
    deleteActivity({ _id }).then((res) => {
      getAllActivities()
    })
  }

  useEffect(() => {
    console.log('effect')
    getAllActivities()
  }, [])

  return (
    <div className="App">
      <header className="header">
        <h1>Activity tracker</h1>
      </header>
      <ActivityForm onUpdateActivities={getAllActivities} />
      <main className="main">
        <div className="activity-items">
          <p>Recent activities</p>
          {recentActivities.length
            ? recentActivities.map((activitie) => {
                return (
                  <ActivityItem
                    {...activitie}
                    months={months}
                    onDeleteActivity={deleteActivityHandler}
                    key={activitie._id}
                  />
                )
              })
            : null}
        </div>
        <div className="statistics">
          <div className="statistics-main">
            <div className="statistics-main__ride">
              <p>Longest ride: </p>
              <div>
                <span>
                  {longestActions && longestActions.hasOwnProperty('ride')
                    ? longestActions.ride.rideDate + ' / '
                    : ''}
                </span>
                <span>
                  {longestActions && longestActions.hasOwnProperty('ride')
                    ? longestActions.ride.rideDistance + ' / '
                    : ''}
                </span>
                <span>
                  {longestActions && longestActions.hasOwnProperty('ride')
                    ? longestActions.ride.rideTime
                    : ''}
                </span>
              </div>
            </div>
            <div className="statistics-main__run">
              <p>Longest run: </p>
              <div>
                <span>
                  {longestActions && longestActions.hasOwnProperty('run')
                    ? longestActions.run.runDate + ' / '
                    : ''}
                </span>
                <span>
                  {longestActions && longestActions.hasOwnProperty('run')
                    ? longestActions.run.runDistance + ' / '
                    : ''}
                </span>
                <span>
                  {longestActions && longestActions.hasOwnProperty('run')
                    ? longestActions.run.runTime
                    : ''}
                </span>
              </div>
            </div>
          </div>
          <div className="statistics-total">
            <div className="statistics-total__ride">
              <p>Total ride distance:</p>
              <div>
                {recentActivities
                  .filter((act) => act.type == 'Ride')
                  .reduce((prev, item) => prev + +item.distance, 0) ||
                  '0 km'}{' '}
                km
              </div>
            </div>
            <div className="statistics-total__run">
              <p>Total run distance:</p>
              <div>
                {recentActivities
                  .filter((act) => act.type == 'Run')
                  .reduce((prev, item) => prev + +item.distance, 0) ||
                  '0 km'}{' '}
                km
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </main>
    </div>
  )
}

export default App
