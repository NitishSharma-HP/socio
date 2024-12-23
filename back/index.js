import dotenv from 'dotenv'
dotenv.config() //load env file, always load it at the top of starting point of application
import connectDb from './config/db.js';
import express from 'express';
const app = express();
connectDb()

//middleware
import ApiResponse from './middlewares/ApiResponse.js';
app.use(ApiResponse)

//import routes
import healthRoute from './routes/health.js';
// import router from './routes/auth.js';
import authRouter from './routes/auth.js';

//use routes
app.get('/health', healthRoute);

app.use('/api/auth', authRouter);


export default app;