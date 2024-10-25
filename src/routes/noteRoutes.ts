import express from 'express'
import { createNote, getNotes, health, updateNote, deleteNote} from '../controllers/note.controllers'
import protect from '../middleware/auth.middleware'

const router = express.Router()

router.get('/', health)
router.post('/', createNote);   // Create a note
router.get('/notes', protect, getNotes);       // Get all notes
router.get('/:id', protect, getNotes);     // Get a specific note
router.put('/:id', protect, updateNote);  // Update a note
router.delete('/:id', protect, deleteNote);

export default router