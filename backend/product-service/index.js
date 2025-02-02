import dotenv from 'dotenv'
dotenv.config() //load env file, always load it at the top of starting point of application
import connectDb from './config/db.js';
import express from 'express';
import cors from 'cors';
// import bodyParser from 'body-parser';
import ApiResponse from './middlewares/ApiResponse.js';
const app = express();
connectDb()

//middleware
app.use(cors())
app.use(express.json()); //json body parser
app.use(express.urlencoded({ extended: true }));  //parse form-body data
app.use(ApiResponse)

//import routes
import healthRoute from './routes/health.js';
import productRoutes from './routes/products.js';

//use routes
app.get('/health', healthRoute);
app.use('/product', productRoutes)


export default app;