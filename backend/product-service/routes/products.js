import express from 'express';
import {addProduct, addProdCategory, addBrand} from '../controllers/admin/productController.js';
import {getProducts, getProductCategories, getBrands, getProductsByCategory} from '../controllers/user/productController.js';
import upload from '../utils/FileUpload.js';

const router = express.Router();

router.post('/add-category', upload.single('image'),addProdCategory);
router.get('/get-category/:id?', getProductCategories);
router.post('/add-product', upload.single('image'), addProduct);
router.get('/get-product/:id?', getProducts);
router.get('/get-product-by-category/:id?', getProductsByCategory);
router.post('/add-brand', upload.single('image'), addBrand);
router.get('/get-brand/:id?', getBrands);

export default router;