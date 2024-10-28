import { Request, Response, NextFunction } from 'express';
import { Document, ObjectId } from "mongoose";
import { UserRole } from './enums.util';


export interface IUser {
    _id: ObjectId;
    id: ObjectId;
    avatar: string,
    firstName: string
    lastName: string
    username:  string,
    email: string,
    password: string
    createdAt: Date;
    updatedAt: Date;
    slug: string;
    role?: UserRole
}

export interface IUserDoc extends IUser {
  getAll(): Array<IUser>;
  findById(id: any): IUser | null;
  matchPassword(password: string): Promise<boolean>;
  getAuthToken(): Promise<string>;
  getNotes(): Promise<INote[]>;
}

export interface AuthenticatedRequest extends Request {
    user?: IUser & { _id: ObjectId };
    userId?: ObjectId
  }

export interface INote {
    id: string;  
    title: string;
    content: string;
    userId: ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface INoteDoc extends Document {
  title: string;
  content: string;
  author: string;
  tags: string[];
  userId: ObjectId; 
}

