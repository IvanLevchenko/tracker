const {
  createActivity,
  getAllActivities,
  deleteActivity,
} = require('../controllers/controllers')

const express = require('express')
const app = express()

app.post('/add-new-activity', (req, res) => createActivity(req, res))
app.get('/get-activities', (req, res) => getAllActivities(req, res))
app.patch('/delete-activity', (req, res) => deleteActivity(req, res))

module.exports = app
