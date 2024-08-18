import express from 'express'
import path from 'path'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

import routes from './routes/routes'

// load .env file
dotenv.config()

const app = express()

app.use(express.json())

// load CORS
app.use(cors())

// server static files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

// load routes
app.use('/', routes)

// setup the server
const PORT = process.env.PORT ? +process.env.PORT : 4000
const URI = `mongodb+srv://${process.env.USER}:${process.env.PASS}@new-cluster.syllbdh.mongodb.net/blog-data`

mongoose.connect(URI).then(() => {
    app.listen(PORT)
    console.log(`Connected to Mongo DB cloud and Server has started on Port ${PORT}`)
}).catch((err) => {
    console.log(`Error: ${err}`)
})