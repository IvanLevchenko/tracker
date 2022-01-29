const mongoose = require('mongoose')

const ActivityModel = new mongoose.Schema({
  startTime: { type: String, required: true },
  finishTime: { type: String, required: true },
  distance: { type: String, required: true },
  type: { type: String, required: true },
  time: { type: String, required: true },
  velocity: { type: String, required: true },
})

module.exports = mongoose.model('Tracker', ActivityModel, 'Activities')
