
import mongoose from 'mongoose';

const cartSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
        index: true,  // Improves query performance
        unique: true
    },
    products: [
        {
            productId: { type: String },
            quantity: { type: Number, default: 1 },
        }
    ],
    createdOn : {
        type: Date,
        default: Date.now
    },
});
const cart = mongoose.model('cart', cartSchema);
export default cart; 