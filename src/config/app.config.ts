import { config } from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import cors from 'cors'



config()

const app = express()

app.use(express.json({ limit: "50mb" }));
app.use(cors({ origin: true, credentials: true }));


// app.use("/api", authRoutes);
// app.use("/api", noteRoutes);

// app.use(errorHandler);

export default app