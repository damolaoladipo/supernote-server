import { config } from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import cors from 'cors'
import noteRoutes from '../routes/noteRoutes';
import authRoutes from '../routes/authRoutes';
import userRoutes from '../routes/userRoutes';
import errorHandler from "../middleware/error.mdw";



config()

const app = express()

app.use(express.json({ limit: "50mb" }));
app.use(cors({ origin: true, credentials: true }));


app.use("/api", authRoutes);
app.use("/api", noteRoutes);
app.use("/api", userRoutes)

app.use(errorHandler);

export default app