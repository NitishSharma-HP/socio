import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
    name : {type: String},
    description : {type: String},
    image: {type: String},
    prodCategoryId : {type: String},
    brandId : {type: String},
    isActive : {type: Boolean},
    discount : {type: Number},
    price : {type: String},
    createdAt : {type:Date, default: Date.now},
    updatedAt : {type:Date, default: Date.now}
})

const product = mongoose.model('products', productSchema);

export {product};