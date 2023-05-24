// Import
import express from 'express'
import flowerRouter from './routes/flowers.js'

// Konfigurera server
const port = 1567
const app = express()

// Middleware

// Routes
app.use('/api/flowers', flowerRouter)

// starta
app.listen(port, () => {
	console.log(`Server is listening on port ${port}...`)
})
