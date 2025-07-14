import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

/** @routes */
import index from './routes/index.js';
import apod from './routes/apod.js';
import archive from './routes/archive.js';

export const app = express();

app.use(cors());
app.use(express.json());

app.use('/', index);
app.use('/apod', apod);
app.use('/archive', archive);