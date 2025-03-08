import cart from '../models/cart.js'
import logger from '../logger.js'
import axios from 'axios';

const getCart = async (req, res) => {
    const GATEWAY_URL = process.env.GATEWAY_URL || '';
    try {
        const userId = req.params?.id;
        if (!userId) {
            return res.sendError(null, 'Record not found.');
        }

        const userCart = await cart.findOne({ userId }).select('products').lean();

        if (!userCart || !userCart.products?.length) {
            return res.sendSuccess([], 'Cart is empty.');
        }
        const ids = userCart.products.map(p => p.productId).join(',');

        // Fetch Product Details from ProductService
        const productResponse = await axios.get(`${GATEWAY_URL}/product/get-product`, { 
            params: { ids },
            headers: {
                Authorization: req.headers.authorization
            }
        });
        if (productResponse.status !== 200 || !productResponse.data.success) {
            logger.warn(`Product service failed: ${JSON.stringify(productResponse.data)}`);
            return res.sendError(null, 'Failed to fetch product details.');
        }

        const productDetails = productResponse.data.data;

        // Merge Product Details with Cart Data
        const cartWithDetails = userCart.products.map(cartItem => ({
            ...cartItem,
            product: productDetails.find(p => p._id === cartItem.productId) || null
        }));
        res.sendSuccess(cartWithDetails, 'Cart retrieved successfully.');
    } catch (error) {
        logger.error(`Error in getCart: ${error.message}`);
        res.sendError(null, 'Failed to fetch cart.');
    }
};

const saveToCart = async (req, res) => {
    const { userId } = req.body;
    const { productId, quantity } = req.body.products;

    if (!userId || !productId) {
        return res.sendError(null, 'Invalid data.');
    }

    try {
        const updatedCart = await cart.findOneAndUpdate(
            { userId, "products.productId": productId }, // Find user's cart with the product
            { $inc: { "products.$.quantity": quantity || 1 } }, // Increase quantity if exists
            { new: true }
        );

        if (!updatedCart) {
            // If product is not in cart
            await cart.findOneAndUpdate(
                { userId },
                { $push: { products: { productId, quantity: quantity || 1 } } },
                { upsert: true, new: true } //if user not found upsert will make sure to create a new record.
            );
        }
        res.sendSuccess(null, 'Item added to cart.');
    } catch (e) {
        logger.error("Error in saveToCart: " + e);
        res.sendError(null, 'Failed to save data.');
    }
};

export {getCart, saveToCart};