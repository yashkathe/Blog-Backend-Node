import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

// load .env file
dotenv.config()

const app = express()

// load CORS
app.use(cors())

// setup the server
const PORT = process.env.PORT ? +process.env.PORT : 4000

app.listen(PORT, () => {
    console.log(`Server Started on Port: ${PORT}`)
}).on('error', (error) => {
    console.log(`Caught Error ${error}`)
})