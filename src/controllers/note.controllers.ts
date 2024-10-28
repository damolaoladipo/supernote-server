import { Request, Response, NextFunction } from 'express';
import NoteModel from '../models/note.model';

export const health = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json({
            name: "Welcome to SuperNote App",
            Version: "1.0.0",
            message: "Supernote api v1.0.0 health is OK",
            status: 200,
            Author: "Damola Oladipo"
        });
    } catch (error) {
        next(error);
    }
};

export const createNote = async (req: Request, res: Response, next: NextFunction):Promise<any> => {
    const { title, content, userId } = req.body;

    try {
        const note = new NoteModel({ title, content, userId });
        await note.save();
        res.status(201).json({ error: false, data: note });
    } catch (error: any) {
        next(error);
    }
};

export const getNotes = async (req: Request, res: Response, next: NextFunction) :Promise<any> => {
    const userId = req.body.userId || req.query.userId;;
    console.log("UserID:", userId);

    const notes = await NoteModel.find();

    try {
        const notes = await NoteModel.find({ userId });
        res.status(200).json({ error: false, data: notes });
        console.log("Notes retrieved:", notes);
    } catch (error: any) {
        next(error);
    }
};

export const getNoteById = async (req: Request, res: Response, next: NextFunction) :Promise<any> => {
    const { id } = req.params;

    try {
        const note = await NoteModel.findById(id);
        if (!note) {
            return res.status(404).json({ error: true, message: 'Note not found' });
        }
        res.status(200).json({ error: false, data: note });
    } catch (error: any) {
        next(error);
    }
};

export const updateNote = async (req: Request, res: Response, next: NextFunction) :Promise<any> => {
    const { id } = req.params;
    const { title, content } = req.body;

    try {
        const updatedNote = await NoteModel.findByIdAndUpdate(id, { title, content }, { new: true });
        if (!updatedNote) {
            return res.status(404).json({ error: true, message: 'Note not found' });
        }
        res.status(200).json({ error: false, data: updatedNote });
    } catch (error: any) {
        next(error);
    }
};

export const deleteNote = async (req: Request, res: Response, next: NextFunction) :Promise<any> => {
    const { id } = req.params;

    try {
        const deletedNote = await NoteModel.findByIdAndDelete(id);
        if (!deletedNote) {
            return res.status(404).json({ error: true, message: 'Note not found' });
        }
        res.status(200).json({ error: false, message: 'Note deleted successfully' });
    } catch (error: any) {
        next(error);
    }
};

