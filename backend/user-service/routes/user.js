import express from 'express';
import { getUser } from '../contollers/userController.js';
import { getCart, saveToCart } from '../contollers/cartController.js';
import { getWishlist, saveToWishlist} from '../contollers/wishlistController.js';

const router = express.Router();


//cart and wishlist routes
router.get('/get-cart/:id?', getCart);
router.post('/cart/save-to-cart', saveToCart);
router.get('/wishlist/:id?', getWishlist);
router.post('/wishlist/save-to-wishlist', saveToWishlist);

//get user
router.get('/:id?', getUser);


export default router;