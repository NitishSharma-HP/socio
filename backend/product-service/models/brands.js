import mongoose from 'mongoose';

const brandSchema = mongoose.Schema({
    name: {type:String, required:true},
    prodCategoryId: {type:Object},
    image: {type:String},
    productsCount: {type:Number},
    isActive: {type:Boolean},
    createdAt: {type:Date, default: Date.now},
    updatedAt: {type:Date, default: Date.now}
});

const brand = mongoose.model('brands',brandSchema);
export {brand};