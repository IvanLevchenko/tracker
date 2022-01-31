import _axios from './axios'

export const createNewActivity = (activityBody) => {
  return _axios.post('/create-new-activity', activityBody, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const getActivities = () => {
  return _axios.get('/get-activities', {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const deleteActivity = (_id) => {
  return _axios.patch('/delete-activity', _id, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
