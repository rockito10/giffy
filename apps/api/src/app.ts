import cors from 'cors'
import express, { json } from 'express'
import { giffyApiRouter } from './routes/app-routes'
import './config/cloudinary'

// APP
const app = express()

// PRE-MIDDLEWARES
app.use(
	cors({
		origin: [process.env.ORIGIN, 'http://localhost:5173'] as string[],
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
		allowedHeaders: ['Content-Type', 'Authorization'],
		exposedHeaders: ['Authorization'],
		credentials: true,
	}),
)

app.use(json()) // JSON es un middleware que parsea el body de las peticiones a JSON

// ROUTES
app.use('/api', giffyApiRouter)

export default app
