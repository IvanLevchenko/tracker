const mongoose = require('mongoose')
const ActivityModel = require('../models/ActivityModel')

const createActivity = async (req, res) => {
  try {
    const calculateVelocity = (start, finish, distance) => {
      let hours = (new Date(finish) - new Date(start)) / 100 / 60 / 60 / 10
      return (distance / hours).toFixed(2) + ' km/hour'
    }

    const calculateTime = (start, finish) => {
      let days = new Date(finish).getDate() - new Date(start).getDate()
      let hours = (
        `${new Date(finish).getHours()}.${new Date(finish).getMinutes()}` -
        `${new Date(start).getHours()}.${new Date(start).getMinutes()}`
      ).toFixed(2)

      if (hours.split('.')[0] >= 24) {
        days += Math.floor((hours / 24 + '').split('.')[0])
        hours =
          hours.split('.')[0] +
          (hours / 24 + '').split('.')[1] +
          '.' +
          hours.split('.')[1]
      }

      if (hours.split('.')[1] >= 60) {
        hours =
          hours.split('.')[0] +
          (hours / 60).split('.')[0] +
          '.' +
          hours.split('.')[1] +
          (hours / 60).split('.')[1]
      }

      return `${days > 0 ? days + ' d ' : ''}${
        hours > 0
          ? hours.split('.')[0] + ' h ' + hours.split('.')[1] + ' min'
          : hours.split('.')[1] + ' min'
      }`
    }

    const createdModelObject = {
      ...req.body,
      time: calculateTime(req.body.startTime, req.body.finishTime),
      velocity: calculateVelocity(
        req.body.startTime,
        req.body.finishTime,
        req.body.distance,
      ),
    }

    const createdActivity = await ActivityModel.create(createdModelObject)
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
