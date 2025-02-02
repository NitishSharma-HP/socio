import logger from '../../logger.js';
import {prodCategories} from '../../models/prodCategories.js';
import {product} from '../../models/product.js';
import { brand } from '../../models/brands.js';

//get product categories
const getProductCategories = async(req, res)=>{
    try{
        const { id } = req.params;
        let categories;
        
        if (id) {
            categories = await prodCategories.findOne({ _id: id });
        } else {
            categories = await prodCategories.find();
        }

        res.sendSuccess(categories);    
    }catch(e){
        logger.error("Error occur in getProductCategories.. "+e)
        res.sendError(null, 'Failed to get data.');
    }
}

//get products
const getProducts = async(req, res)=>{
    try{
        const { id } = req.params;
        let products;
        
        if (id) {
            products = await product.findOne({ _id: id });
        } else {
            products = await product.find();
        }

        res.sendSuccess(products);     
    }catch(e){
        logger.error("Error occur in getProducts.. "+e)
        res.sendError(null, 'Failed to get data.');
    }
}

//get products by category
const getProductsByCategory = async(req, res)=>{
    try{
        const { id } = req.params;
        let products;
        
        if (id) {
            products = await product.find({ prodCategoryId: id });
        } else {
            products = await product.find();
        }

        res.sendSuccess(products);     
    }catch(e){
        logger.error("Error occur in getProductsByCategory.. "+e)
        res.sendError(null, 'Failed to get data.');
    }
}

//get brands
const getBrands = async(req, res)=>{
    try{
        const { id } = req.params;
        let brands;
        
        if (id) {
            brands = await  brand.findOne({ _id: id });
        } else {
            brands = await brand.find();
        }

        res.sendSuccess(brands);    
    }catch(e){
        logger.error("Error occur in getProductCategories.. "+e)
        res.sendError(null, 'Failed to get data.');
    }
}

export {getProductCategories, getProducts, getBrands, getProductsByCategory};