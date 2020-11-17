import express from 'express'

import { og, gallery, related, search } from './api'

const router = express.Router()

router.use('/og', og)
router.use('/gallery', gallery)
router.use('/related', related)
router.use('/search', search)

export default router
