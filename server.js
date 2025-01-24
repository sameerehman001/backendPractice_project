const express = require('express')
const dbConnection = require('./database/index')
const { PORT } = require('./config/index');

const app = express()


dbConnection()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})