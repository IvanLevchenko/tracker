const mongoose = require('mongoose')
const ActivityModel = require('../models/ActivityModel')

const createActivity = async (req, res) => {
  try {
    const createdActivity = await ActivityModel.create({
      ...req.body,
      time: req.body.payload.timeResult,
      velocity: req.body.payload.velocity,
    })
    res.status(200)
  } catch (e) {
    console.log(e)
  }
}

const getAllActivities = async (req, res) => {
  try {
    const findedActivities = await ActivityModel.find()
    res.status(200).send(findedActivities)
  } catch (e) {
    console.log(e)
  }
}

const deleteActivity = async (req, res) => {
  try {
    await ActivityModel.findOneAndDelete({ _id: req.body._id })
    res.status(200).send('ok')
  } catch (e) {
    console.log(e)
  }
}

module.exports = { createActivity, getAllActivities, deleteActivity }
