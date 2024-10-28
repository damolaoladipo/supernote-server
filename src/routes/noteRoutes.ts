import express from 'express'
import { createNote, getNotes, health, updateNote, deleteNote, getNoteById} from '../controllers/note.controllers'
import protect from '../middleware/auth.middleware'


const router = express.Router()

router.get('/', health)

router.post('/note', createNote);   
router.get('/notes', getNotes);   
router.get('/note/:id', getNoteById); 
router.put('/note/:id', updateNote); 
router.delete('/note/:id', deleteNote);


export default router