import express from 'express';
import cors from 'cors';
//import 'dotenv/config';
import jobsRouter from './routes/jobsRouter.js';

const app = express();

app.listen(3000, console.log('Server running on http://localhost:3000✅'));

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use('/api', jobsRouter);