import 'express-async-errors'
import express, { Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'
import knex from 'knex'
import moment from 'moment'
import http from 'http'
import router from './routes/router'
import AppError from './errors/AppError'

declare global {
	namespace Express {
		interface Request {
			db: any;
		}
	}
}

dotenv.config()

const db = knex({
	client: 'mysql2',
	connection: {
		host: '127.0.0.1',
		port: 3306,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: 'hubify',
		typeCast: (field: any, next: any) => {
			if (field.type === 'DATE') {
				const date = moment(field.string())
				return date.isValid() ? date.format('YYYY-MM-DD') : null
			}

			if (field.type === 'DATETIME') {
				const date = moment(field.string())
				return date.isValid() ? date.format('YYYY-MM-DD HH:mm:ss') : null
			}

			if (field.type === 'JSON') {
				return JSON.parse(field.string('utf8'))
			}

			return next()
		}
	}
})

const port = 3000
const app = express()
const server = http.createServer(app)

app.use((req: Request, _: Response, next: NextFunction) => {
	req.db = db
	next()
})

app.use(express.json())
app.use(router)

app.use((e: Error, req: Request, res: Response, next: NextFunction) => {
	if (e instanceof AppError) {
		return res.status(e.statusCode).json({
			status: 'error',
			statusCode: e.statusCode,
			message: e.message,
		})
	}

	return res.status(500).json({
		status: 'error',
		statusCode: 500,
		message: e.message,
	})
})

server.listen(port)