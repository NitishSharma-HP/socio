import { Mongoose } from "mongoose"
const mstProdCategorySchema = new Mongoose.Schema({
    prodCategory: {
        type:String, 
        required:true
    },
    createdOn:{
        type:Date,
        default:Date.now
    }
});

const mstProducts = Mongoose.model('MstProductCategory',mstProdCategorySchema);
export default mstProducts;