import { Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'

dotenv.config()

class EnsureAuthenticated {
	verify(req: Request, res: Response, next: NextFunction) {
		const { authorization } = req.headers

		if (!authorization || authorization !== process.env.API_KEY) {
			console.log('passei aqui')
			return res.status(401).end()
		}

		return next()
	}
}

export default new EnsureAuthenticated()
