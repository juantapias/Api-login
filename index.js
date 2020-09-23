const express = require('express')
const bodyParser = require('body-parser')
const path = require('path');
const apiRouter = require('./routes/api')
const cors = require('cors')

const app = express()
const corsOptions = {
  origin: '*'
}

require('./config/db')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const port = process.env.PORT || 8080

// app.use('/', (req, res) => {
//   res.sendFile(path.join(__dirname+'/pages/index.html'))
// })

app.use('/api', cors(corsOptions), apiRouter)

app.listen(port, () => {
  console.log("Server is on")
})