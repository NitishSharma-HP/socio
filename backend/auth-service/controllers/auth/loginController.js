import User from '../../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import logger from '../../logger.js'

const loginController = async(req, res)=>{
    try{
    const {email, password} = req.body;

    // Check if the user exists
    const user = await User.findOne({email:email});
    if(!user) return res.sendError(null, 'User not found', 404);

    // Check if the password is correct
    const validPassword = await bcrypt.compare(password,user.password);
    if(!validPassword) return res.sendError(null, 'Invalid password', 400);

    // Create and assign a token
    const userDetails = {id:user._id.toString(), email:user.email, name:user.name}
    const token = jwt.sign(userDetails,process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRATION});

    return res.sendSuccess({token, userDetails}, 'User Logged in successfully.')
    }catch(err){
        logger.error(err.message)
        return res.sendError(err, 'Exception', 404);
    }
}

export default loginController;