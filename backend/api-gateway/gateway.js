import express from 'express';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import cors from 'cors'
import multer from 'multer'
import FormData from 'form-data';

const app = express();
const PORT = 4004;
app.use(cors());
const JWT_SECRET = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
const upload = multer();

const SERVICES = {
    user: 'http://localhost:4001/api/user',
    product: 'http://localhost:4002/product',
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

    } else {
        console.log('No files uploaded.');
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
app.get('/product/get-product/:id?', verifyToken, checkRole([1,2]), (req, res) => {
    axios.get(`${SERVICES.product}/get-product/${req.params.id || ''}`)
        .then(response => res.status(200).json(response.data))
        .catch(error => handleError(error, res));
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
        return res.status(error.response.status).json({
            message: error.response.data.message || 'Service error occurred',
        });
    } else if (error.request) {
        return res.status(500).json({
            message: 'No response from service, try again later',
        });
    } else {
        return res.status(500).json({
            message: error.message,
        });
    }
}


app.listen(PORT, ()=>{
    console.log(`Gateway running on port ${PORT}`);
})