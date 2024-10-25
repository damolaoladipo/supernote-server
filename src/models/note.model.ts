import mongoose, { Schema, Document } from 'mongoose';
import { Note } from '../utils/interface.util';

const noteSchema: Schema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

const NoteModel = mongoose.model<Note & Document>('Note', noteSchema);

export default NoteModel;
