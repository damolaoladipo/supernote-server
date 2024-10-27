import express from 'express'
import { createNote, getNotes, health, updateNote, deleteNote, getNoteById} from '../controllers/note.controllers'
import protect from '../middleware/auth.middleware'

const router = express.Router()

router.get('/', health)

router.post('/', createNote);   
router.get('/notes', protect, getNotes);   
router.get('/notes/:id', protect, getNoteById); 
router.put('/notes/:id', protect, updateNote); 
router.delete('/notes/:id', protect, deleteNote);


export default router