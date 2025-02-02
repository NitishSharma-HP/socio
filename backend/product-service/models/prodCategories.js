import mongoose from 'mongoose';

const prodCategorySchema = mongoose.Schema({
    name: {type:String, required:true},
    description: {type:String, required:true},
    parentCategoryId: {type:Object},
    image: {type:String},
    productsCount: {type:Number},
    isActive: {type:Boolean},
    createdAt: {type:Date, default: Date.now},
    updatedAt: {type:Date, default: Date.now}
});

const prodCategories = mongoose.model('Prod-Categories',prodCategorySchema);
export {prodCategories};