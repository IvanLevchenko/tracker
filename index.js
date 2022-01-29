require('dotenv').config()

const Routes = require('./routes/routes')

const { connectMongo } = require('./db')
const express = require('express')
const app = express()

app.use(express.json())
app.use(express.static('./build'))

app.listen(process.env.PORT || 3000, () => console.log('started'))

app.use('/api/v1', Routes)

connectMongo()
