const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')

const mongoURL = 'mongodb://localhost:27017/library'
mongoose.connect(mongoURL,{
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to database')
}).catch((err) => {
  console.log('Error connecting to database')
})

app.use(cors())

app.use(bodyParser.json({
  extended: true,
  limit:'20mb'
}))

app.use(bodyParser.urlencoded({
  extended: true,
  limit:'20mb'
}))

//list route
app.use('/user', require('./routes/User'))

app.listen(5000, function() {
  console.log('Server telah dijalankan di port 5000')
})