import {mongoose} from 'mongoose';
const rolesSchema=new mongoose.Schema({
    id:{
        type:Number,
        required:true
    },
    role:{
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