import express from 'express'
import {  login, register, logout, profile } from '../controllers/auth.controllers'
import protect from '../middleware/auth.middleware'

const router = express.Router({ mergeParams: true })


router.post('/register', register)
router.post('/login', login)
router.post('logout', logout)
router.get('/profile', profile)


export default router