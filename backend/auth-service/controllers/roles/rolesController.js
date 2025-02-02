
import Roles from '../../models/roles.js'
import logger from '../../logger.js'

const getRoles = async (req, res) =>{
    try{
        const { id } = req.params;
        const response = id ? await Roles.findOne({_id: id}) : await Roles.find();
        if(response) return res.sendSuccess(response, 'Success');
    }catch(e){
        logger.error(e.message)
        return res.sendError('Exception', 'Exception', 404);
    }
}

const saveRoles = async (req, res) =>{
    try{
        const {id, role, permissions} = req.body;
        const saveRole = await Roles.create({
            id,
            role,
            permissions
        })
        if (!saveRole) return res.sendError('Role not saved..');

        return res.sendSuccess(null, 'Role Saved Successfully');
    }catch(e){
        logger.error(e.message)
        return res.sendError('Exception', 'Exception', 404);
    }
}

export {getRoles, saveRoles}