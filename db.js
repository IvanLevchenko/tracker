require('dotenv').config();

const mongoose = require('mongoose');

const connectMongo = () => {
  mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  mongoose.connection.on('connected', () => console.log('connected'))
}

module.exports = { connectMongo }