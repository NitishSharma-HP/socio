
import mongoose from 'mongoose';

const wishlistSchema = mongoose.Schema({
    userId : {
        type: String
    },
    productId : {
        type: Array
    },
    createdOn : {
        type: Date,
        default: Date.now
    },
});

export default cart = mongoose.model('wishlist', wishlistSchema); 