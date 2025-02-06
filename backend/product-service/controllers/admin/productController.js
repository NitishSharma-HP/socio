import logger from '../../logger.js';
import {prodCategories} from '../../models/prodCategories.js';
import {product} from '../../models/product.js';
import {brand} from '../../models/brands.js';

//add product categories
const addProdCategory = async(req, res)=>{
    const {name,description,isActive} = req.body;
    const image = req.file ? req.file.filename : null;
    try{
        await prodCategories.create({name, description, image, isActive});
        res.sendSuccess(null, 'Data saved.')
    }catch(e){
        logger.error("Error occur in addProdCategory.. "+e)
        res.sendError(null, 'Failed to save data.');
    }
}

//add products
const addProduct = async(req, res)=>{
    console.log(34535)
    const {name,prodCategoryId,brandId,description,isActive,price} = req.body;
    const image = req.file ? req.file.filename : null;
    try{
        await product.create({name,image,brandId,description,prodCategoryId,isActive,price});
        res.sendSuccess(null, 'Data saved.')
    }catch(e){
        logger.error("Error occur in addProduct.. "+e)
        res.sendError(null, 'Failed to save data.');
    }
}

//add brand
const addBrand = async(req, res)=>{
    const {name, prodCategoryId,isActive} = req.body;
    const image = req.file ? req.file.filename : null;
    try{
        await brand.create({name, prodCategoryId, image, isActive});
        res.sendSuccess(null, 'Data saved.')
    }catch(e){
        logger.error("Error occur in addBrand.. "+e)
        res.sendError(null, 'Failed to save data.');
    }
}
export {addProdCategory, addProduct, addBrand};