import express from 'express'

import { encode, gallery, related, search } from './api'

const router = express.Router()

router.use('/encode', encode)
router.use('/gallery', gallery)
router.use('/related', related)
router.use('/search', search)

export default router
