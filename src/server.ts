import 'reflect-metadata';
import express from 'express';
import './database';

const app = express();

app.listen(8061, () => console.log('server is running...'));