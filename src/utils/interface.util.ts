import { Request, Response, NextFunction } from 'express';
import { Document, ObjectId } from "mongoose";



export interface IUser {
    _id: ObjectId;
    id: ObjectId;
    avatar: string,
    username:  string,
    email: string,
    password: string
    createdAt: Date;
    updatedAt: Date;
    slug: string;

}

export interface IUserDoc extends IUser {
    _id: ObjectId;
    id: ObjectId;
    createdAt: Date;
    updatedAt: Date;
    getAll(): Array<IUser>;
    findById(id: any):  IUser | null;
    matchPassword(password: string): Promise<boolean>,
    getAuthToken(): Promise<string>
  }
  
  export interface AuthenticatedRequest extends Request {
    user?: IUser
  }

export interface Note {
    id?: string;  
    title: string;
    content: string;
    userId: string;
    createdAt?: Date;
    updatedAt?: Date;
}
