import bcrypt from 'bcrypt';
import User from '../../models/user.js';
import logger from '../../logger.js'

const registerController = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.sendError('Please provide all the fields.');
        }

        // Check if user already exists
        const isUserExist = await User.findOne({email:email});
        if (isUserExist) {
            return res.sendError(null,"User already exists");
        }

        // Hash the password
        const crypPass = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: crypPass,
            role
        });
        // Check if user is created
        if (!user) return res.sendError('User Registeration Failed');

        return res.sendSuccess(null, 'User Registered Successfully');
    } catch (err) {
        logger.error(`From register controller ${err.message}`);
        return res.sendError(err.message);
    }

}

export default registerController;