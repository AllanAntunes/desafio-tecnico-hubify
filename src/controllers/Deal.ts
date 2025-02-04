import { Request, Response } from 'express'
import AppError from '../errors/AppError'
import moment from 'moment-timezone'

class Deal {
	async index(req: Request, res: Response) {
		try {
			const deals = await req.db('deal')
				.select(
					'id',
					'title',
					'status',
					'contact_id',
					'funnel_id',
					'created_at',
					'updated_at'
				)
				.whereNull('deleted_at')

			if (!deals || !deals.length) {
				return res.status(404).end()
			}

			return res.json([...deals])
		} catch (e) {
			return e.status(400).json({ error: true, message: e.message })
		}
	}

	async show(req: Request, res: Response) {
		const { id } = req.params

		if (!id) throw new AppError('Deal code cannot be empty')

		try {
			const contact = await req.db('deal')
				.select(
					'id',
					'title',
					'status',
					'contact_id',
					'funnel_id',
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
		const { title, contact_id } = req.body

		if (!title) throw new AppError('Title cannot be empty')
		if (!contact_id) throw new AppError('Contact code cannot be empty')

		try {
			const created_at = moment
				.tz(new Date(), 'America/Sao_Paulo')
				.format()
				.replace('Z', '')
				.replace('T', ' ')
				.split('-03:00')[0]

			const [ id ] = await req.db('deal')
				.insert({
					title,
					status: 1,
					contact_id,
					funnel_id: 1,
					created_at
				})

			return res.status(200).json({ success: true, id })
		} catch (e) {
			return res.status(400).json({ error: true, message: e.message })
		}
	}

	async update(req: Request, res: Response) {
		const { id } = req.params

		if (!id) throw new AppError('Deal code cannot be empty')

		const {
			title,
			contact_id,
			funnel_id
		} = req.body

		const fields: Record<string, any> = {}

		if (title) fields.title = title
		if (contact_id) fields.contact_id = contact_id
		if (funnel_id) fields.funnel_id = funnel_id

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

			if (funnel_id) {
				const funnel = await req.db('funnel')
					.select('name')
					.where('id', '=', funnel_id)
					.first()

				if (!funnel) {
					throw new AppError('Deal code cannot be empty')
				}

				fields.status = 1

				if (funnel.name) {
					if (funnel.name === 'Ganhas') {
						fields.status = 2
					} else if (funnel.name === 'Perdidas') {
						fields.status = 3
					}
				}
			}

			await req.db('deal').update({ ...fields, updated_at })

			const deal = await req.db('deal')
				.select(
					'id',
					'title',
					'status',
					'contact_id',
					'funnel_id',
					'created_at',
					'updated_at'
				)
				.where('id', '=', id)
				.whereNull('deleted_at')
				.first()

			if (!deal) {
				throw new AppError('Deal code not found')
			}

			return res.status(200).json(deal)
		} catch (e) {
			return res.status(400).json({ error: true, message: e.message })
		}
	}

	async delete(req: Request, res: Response) {
		const { id } = req.params

		if (!id) throw new AppError('Deal code cannot be empty')

		try {
			const deleted_at = moment
				.tz(new Date(), 'America/Sao_Paulo')
				.format()
				.replace('Z', '')
				.replace('T', ' ')
				.split('-03:00')[0]

			await req.db('deal')
				.update({ deleted_at })
				.where('id', '=', id)
		
			return res.status(200).json({ success: true })
		} catch (e) {
			return res.status(400).json({ error: true, message: e.message })
		}
	}
}

export default new Deal()
