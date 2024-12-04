import dotenv from 'dotenv'
dotenv.config() //load env file, always load it at the top of starting point of application
import connectDb from './config/db.js';
import express from 'express'
const app = express();

connectDb()


export default app;