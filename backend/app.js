const express = require('express');
require('dotenv').config()
const Cors = require('cors')
const courseRoute = require('./routes/courseRouter')
const authRoute = require('./routes/authRoute')
const mongoose = require('mongoose')
const App = express()
App.use(express.json())
App.use(Cors({ origin: true, credentials: true }))
App.use('/course', courseRoute)
App.use('/auth', authRoute)
mongoose.connect(process.env.MONGOS_URL)
    .then(res => {
        App.listen(process.env.PORT, () => {
            console.log(`Database is Connected and Server Start http://localhost:${process.env.PORT}`)
        })
    })
    .catch(err => {
        console.log(err)
    })


    