import {mongoose} from 'mongoose';
const rolesSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    permissions:{
        type:Object
    },
    createdOn:{
        type:Date,
        default:Date.now
    }
})
const Roles = mongoose.model('Role', rolesSchema)
export default Roles;