import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import { connect } from 'mongoose';
import connectDB from './config/mongodb.js';
import userRouter from './route/userRoutes.js';

const app = express();
const PORT = process.env.PORT || 4000;

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/user', userRouter);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});