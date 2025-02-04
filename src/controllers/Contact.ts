import { Request, Response } from 'express'
import AppError from '../errors/AppError'
import moment from 'moment-timezone'

class Contact {
	async index(req: Request, res: Response) {
		try {
			const contacts = await req.db('contact')
				.select(
					'id',
					'name',
					'email',
					'phone',
					'created_at',
					'updated_at'
				)
				.whereNull('deleted_at')

			if (!contacts || !contacts.length) {
				return res.status(404).end()
			}

			return res.json([...contacts])
		} catch (e) {
			return e.status(400).json({ error: true, message: e.message })
		}
	}

	async show(req: Request, res: Response) {
		const { id } = req.params

		if (!id) throw new AppError('Contact code cannot be empty')

		try {
			const contact = await req.db('contact')
				.select(
					'id',
					'name',
					'email',
					'phone',
					'created_at',
					'updated_at'
				)
				.where('id', '=', id)
				.whereNull('deleted_at')
				.first()

			if (!contact) {
				return res.status(404).end()
			}

			return res.json(contact)
		} catch (e) {
			return e.status(400).json({ error: true, message: e.message })
		}
	}

	async create(req: Request, res: Response) {
		const {
			name,
			email,
			phone
		} = req.body

		if (!name) {
			throw new AppError('Name cannot be empty')
		}

		if (!email && !phone) {
			throw new AppError('Email or phone cannot be empty')
		}

		try {
			const created_at = moment
				.tz(new Date(), 'America/Sao_Paulo')
				.format()
				.replace('Z', '')
				.replace('T', ' ')
				.split('-03:00')[0]

			const [ id ] = await req.db('contact').insert({
				name,
				email,
				phone,
				created_at
			})

			return res.status(200).json({ success: true, id })
		} catch (e) {
			return res.status(400).json({ error: true, message: e.message })
		}
	}

	async update(req: Request, res: Response) {
		const { id } = req.params

		if (!id) throw new AppError('Contact code cannot be empty')

		const {
			name,
			email,
			phone
		} = req.body

		const fields: Record<string, any> = {}

		if (name) fields.name = name
		if (email) fields.email = email
		if (phone) fields.phone = phone

		if (Object.keys(fields).length === 0) {
			throw new AppError('At least one field must be filled in')
		}

		try {
			const updated_at = moment
				.tz(new Date(), 'America/Sao_Paulo')
				.format()
				.replace('Z', '')
				.replace('T', ' ')
				.split('-03:00')[0]

			await req.db('contact')
				.update({ ...fields, updated_at })
				.whereNull('deleted_at')

			const contact = await req.db('contact')
				.select(
					'id',
					'name',
					'email',
					'phone',
					'created_at',
					'updated_at'
				)
				.where('id', '=', id)
				.whereNull('deleted_at')
				.first()

			if (!contact) {
				throw new AppError('Contact code not found')
			}

			return res.status(200).json(contact)
		} catch (e) {
			return res.status(400).json({ error: true, message: e.message })
		}
	}

	async delete(req: Request, res: Response) {
		const { id } = req.params

		if (!id) throw new AppError('Contact code cannot be empty')

		try {
			const deleted_at = moment
				.tz(new Date(), 'America/Sao_Paulo')
				.format()
				.replace('Z', '')
				.replace('T', ' ')
				.split('-03:00')[0]

			await req.db('contact')
				.update({ deleted_at })
				.where('id', '=', id)

			return res.status(200).json({ success: true })
		} catch (e) {
			return res.status(400).json({ error: true, message: e.message })
		}
	}
}

export default new Contact()
