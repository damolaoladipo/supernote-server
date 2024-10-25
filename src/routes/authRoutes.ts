import express from 'express'
import {  login, register } from '../controllers/auth.controllers'

const router = express.Router()


router.post('/register', register)
router.post('/login', login)
router.post('logout', logout)
router.get('/profile', profile)


export default router