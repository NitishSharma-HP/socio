import env from 'dotenv';
env.config();
import express from 'express';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import cors from 'cors'
import multer from 'multer'
import FormData from 'form-data';
import logger from './logger.js';

const app = express();
const PORT = 4004;
app.use(cors());
app.use(express.json())
const JWT_SECRET = process.env.JWT_SECRET || '';
const upload = multer();

const SERVICES = {
    user: process.env.USER_URL || '',
    product: process.env.PRODUCT_URL || '',
}
function verifyToken(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Token is required' });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
      } catch (err) {
        console.log(err.message)
        logger.error("Exception in verifyToken "+ err.message);
        return res.status(401).json({ message: 'Invalid token.' });
      }
}

const checkRole = (roles)=>{
    return (req, res, next) =>{
        if(!roles.includes(req.user.userRole)){
            return res.status(403).json({ message: 'Access denied. You do not have permission.' });
        }
        next();
    }
}

function createFormData(req) {
    const formData = new FormData()
    for (const key in req.body) {
        if (Object.prototype.hasOwnProperty.call(req.body, key)) {  // Safe property check
            formData.append(key, req.body[key]);
        }
    }
    // If there is a file, append it to the form, currently handle only single file
    if (req.files && req.files[0]) {
        const file = req.files[0]; 
        // Append the file to FormData
        formData.append('image', file.buffer, {
            filename: file.originalname,
            contentType: file.mimetype,
            //can also pass file size from here
        });

    }

    return formData;
}

//product routes
app.post('/product/add-category', verifyToken, checkRole([1]), upload.any(), (req, res) => {
    const formData = createFormData(req);
    axios.post(`${SERVICES.product}/add-category`, formData, {
        headers: {
            ...formData.getHeaders(),
            Authorization: req.headers.authorization
        }
    })
    .then(response => res.status(200).json(response.data))
    .catch(error => handleError(error, res));
});
app.get('/product/get-category/:id?', verifyToken, checkRole([1,2]), (req, res) => {
    axios.get(`${SERVICES.product}/get-category/${req.params.id || ''}`)
        .then(response => res.status(200).json(response.data))
        .catch(error => handleError(error, res));
});
app.post('/product/add-product', verifyToken, checkRole([1]), upload.any(), (req, res) => {
    const formData = createFormData(req);
    axios.post(`${SERVICES.product}/add-product`, formData, {
        headers: {
            ...formData.getHeaders(),
            Authorization: req.headers.authorization
        }
    })
    .then(response => res.status(200).json(response.data))
    .catch(error => handleError(error, res));
});
app.get('/product/get-product', verifyToken, checkRole([1,2]), async (req, res) => {
    try {
        let { ids } = req.query;
        if (!ids) return res.status(400).json({ message: "IDs are required" });
        const response = await axios.get(`${SERVICES.product}/get-product`, { params: { ids } });
        res.status(200).json(response.data);
    } catch (error) {
        handleError(error, res);
    }
});
app.get('/product/get-product-by-category/:id?', verifyToken, checkRole([1,2]), (req, res) => {
    axios.get(`${SERVICES.product}/get-product-by-category/${req.params.id || ''}`)
        .then(response => res.status(200).json(response.data))
        .catch(error => handleError(error, res));
});
app.get('/product/get-brand/:id?', verifyToken, checkRole([1,2]), (req, res) => {
    axios.get(`${SERVICES.product}/get-brand/${req.params.id || ''}`)
        .then(response => res.status(200).json(response.data))
        .catch(error => handleError(error, res));
});
app.post('/product/add-brand', verifyToken, checkRole([1]), (req, res) => {
    const formData = createFormData(req);
    axios.post(`${SERVICES.product}/add-brand`, formData, {
        headers: {
            ...formData.getHeaders(),
            Authorization: req.headers.authorization
        }
    })
    .then(response => res.status(200).json(response.data))
    .catch(error => handleError(error, res));
});


//cart-wishlist routes
app.get('/api/user/get-cart/:id', (req, res) => {
    axios.get(`${SERVICES.user}/get-cart/${req.params.id || ''}`, {
        headers: {
            Authorization: req.headers.authorization
        }
    })
    .then(response => res.status(200).json(response.data))
    .catch(error => handleError(error, res));
});

app.get('/api/user/wishlist/:id?', verifyToken, checkRole([1,2]), (req, res) => {
    axios.get(`${SERVICES.user}/wishlist/${req.params.id || ''}`)
        .then(response => res.status(200).json(response.data))
        .catch(error => handleError(error, res));
});

app.post('/api/user/cart/save-to-cart', verifyToken, checkRole([1, 2]), async (req, res) => {
    try {
        const response = await axios.post(`${SERVICES.user}/cart/save-to-cart`, req.body, {
            headers: {
                Authorization: req.headers.authorization,
                'Content-Type': 'application/json'
            }
        });
        return res.status(200).json(response.data);
    } catch (error) {
        handleError(error, res);
    }
});

app.post('/api/user/cart/save-to-wishlist', verifyToken, checkRole([2]), async (req, res) => {
    try {
        const response = await axios.post(`${SERVICES.user}/cart/save-to-cart`, req.body, {
            headers: {
                Authorization: req.headers.authorization,
                'Content-Type': 'application/json'
            }
        });
        return res.status(200).json(response.data);
    } catch (error) {
        handleError(error, res);
    }
});

//*** if i place 'user/:id?' api above get-cart api there will be conflicts
//the endpoint /api/user/:id?' will conflict with this endpoint '/api/user/get-cart'
//express will mistakenly consider 'get-cart' as ':id' of 'user/:id?' api.
//user routes
app.get('/api/user/:id?', verifyToken, checkRole([1,2]), (req, res) => {
    axios.get(`${SERVICES.user}/${req.params.id || ''}`)
        .then(response => res.status(200).json(response.data))
        .catch(error => handleError(error, res));
});

// Error Handling Middleware
function handleError(error, res) {
    console.error('Error occurred:', error.message);
    if (error.response) {
        logger.error(`From handleError in gatway ${error.message}`);
        return res.status(error.response.status).json({
            message: error.response.data.message || 'Service error occurred',
        });
    } else if (error.request) {
        logger.error(`From handleError in gatway ${error.message}`);
        return res.status(500).json({
            message: 'No response from service, try again later',
        });
    } else {
        logger.error(`From handleError in gatway ${error.message}`);
        return res.status(500).json({
            message: error.message,
        });
    }
}


app.listen(PORT, ()=>{
    console.log(`Gateway running on port ${PORT}`);
})