// Required libraries and files
const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')

const routes = require('./routes')
const middlware = require('./middleware')

const app = express()
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}))
app.use(cors())

// Set API routes and middleware log
routes._SET(app)
middlware._SET(app)

// Start listening for requests
module.exports.start = () => {
    app.listen(process.env.SERVER_PORT, () => {
        console.log('Listening on', process.env.SERVER_PORT)
    })
}