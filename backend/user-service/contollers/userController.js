import User from '../models/user.js';
import logger from '../logger.js';


const getUser = async (req, res) => {
    try {
        const id = req.params?.id;
        let user = null;
        if (id) {
            user = await User.findOne({ _id:id });
        } else {
            user = await User.find();
        }
        if(user){
            return res.sendSuccess(user)
        }else{
            return res.sendSuccess(null, 'User not found.')
        }
    } catch(err){
        logger.error("Error in getUser "+err.message)
        return res.sendError(err, 'Exception', 404);
    }
}

export {getUser};