import express, {Request, Response} from 'express'
import NoteModel from '../models/note.model'
import { Note } from '../utils/interface.util';

export const health = async (req: Request, res: Response)=>{
    res.status(200).json({message:'Welcome to Todo app'})
}

 
 export const createNote = async (req: Request, res: Response)=>{
    const {title, content} = req.body
    const userId = (req as any).user.id

    const note: Note = new NoteModel({ title, content, userId });
   try {
    const note = await new Note({
        title, content, user: userId
    })
    await note.save()
    res.status(201).json({error: false, data: note})
   } catch (error:any) {
    res.status(500).json({error: true, data: error.message})
   }
}


export const getNote = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    try {
        const note = await NoteModel.findById(id);
        if (!note) {
            return res.status(404).json({ error: true, message: 'Note not found' });
        }
        return res.status(200).json({ error: false, data: note });
    } catch (error: any) {
        return res.status(500).json({ error: true, message: error.message });
    }
};

export const getNotes = async (req: Request, res: Response): Promise<Response> => {
    const userId = req.user.id;

    try {
        const notes = await NoteModel.find({ userId });
        return res.status(200).json({ error: false, data: notes });
    } catch (error: any) {
        return res.status(500).json({ error: true, message: error.message });
    }
};

export const updateNote = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { title, content } = req.body;

    try {
        const updatedNote = await NoteModel.findByIdAndUpdate(id, { title, content }, { new: true });
        if (!updatedNote) {
            return res.status(404).json({ error: true, message: 'Note not found' });
        }
        return res.status(200).json({ error: false, data: updatedNote });
    } catch (error: any) {
        return res.status(500).json({ error: true, message: error.message });
    }
};

export const deleteNote = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    try {
        const deletedNote = await NoteModel.findByIdAndDelete(id);
        if (!deletedNote) {
            return res.status(404).json({ error: true, message: 'Note not found' });
        }
        return res.status(200).json({ error: false, message: 'Note deleted successfully' });
    } catch (error: any) {
        return res.status(500).json({ error: true, message: error.message });
    }
};