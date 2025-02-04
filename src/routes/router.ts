import express from 'express'

import EnsureAuthenticated from '../middlewares/EnsureAuthenticated'

import Contact from '../controllers/Contact'
import Deal from '../controllers/Deal'

const router = express.Router()

router.use(EnsureAuthenticated.verify)

router.get('/contact', Contact.index)
router.get('/contact/:id', Contact.show)
router.post('/contact', Contact.create)
router.put('/contact/:id', Contact.update)
router.delete('/contact/:id', Contact.delete)

router.get('/deal', Deal.index)
router.get('/deal/:id', Deal.show)
router.post('/deal', Deal.create)
router.put('/deal/:id', Deal.update)
router.delete('/deal/:id', Deal.delete)

export default router
