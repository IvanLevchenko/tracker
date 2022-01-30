const calculateValues = (req, res, next) => {
  let start = req.body.startTime
  let finish = req.body.finishTime
  let distance = req.body.distance

  let hours = (new Date(finish) - new Date(start)) / 100 / 60 / 60 / 10
  let days = new Date(finish).getDate() - new Date(start).getDate()
  let timestamp = (
    `${new Date(finish).getHours()}.${new Date(finish).getMinutes()}` -
    `${new Date(start).getHours()}.${new Date(start).getMinutes()}`
  ).toFixed(2)

  if (timestamp.split('.')[0] >= 24) {
    days += Math.floor((hours / 24 + '').split('.')[0])
    timestamp =
      timestamp.split('.')[0] +
      (timestamp / 24 + '').split('.')[1] +
      '.' +
      timestamp.split('.')[1]
  }

  if (timestamp.split('.')[1] >= 60) {
    timestamp =
      timestamp.split('.')[0] +
      (timestamp / 60).split('.')[0] +
      '.' +
      timestamp.split('.')[1] +
      (timestamp / 60).split('.')[1]
  }

  let timeResult = `${days > 0 ? days + ' d ' : ''}${
    timestamp > 0
      ? timestamp.split('.')[0] + ' h ' + timestamp.split('.')[1] + ' min'
      : timestamp.split('.')[1] + ' min'
  }`

  req.body.payload = {
    velocity: (distance / hours).toFixed(2) + ' km/hour',
    timeResult,
  }

  next()
}

module.exports = { calculateValues }
