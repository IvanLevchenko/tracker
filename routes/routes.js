const {
  createActivity,
  getAllActivities,
  deleteActivity,
} = require('../controllers/controllers')

const { calculateValues } = require('../middlewares/middleware')

const express = require('express')
const app = express()

app.post('/create-new-activity', calculateValues, (req, res) =>
  createActivity(req, res),
)
app.get('/get-activities', (req, res) => getAllActivities(req, res))
app.patch('/delete-activity', (req, res) => deleteActivity(req, res))

module.exports = app
