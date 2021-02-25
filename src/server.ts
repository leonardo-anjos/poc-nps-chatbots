import 'reflect-metadata';
import express from 'express';
import './database';
import { router } from './routes';

const app = express();

// work with json format
app.use(express.json());

// middleware
app.use(router);

app.listen(8061, () => console.log('server is running...'));