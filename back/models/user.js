import {mongoose} from 'mongoose';
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minlength: [6, 'Password must be at least 6 characters long']
    },
    created_at:{
        type:Date,
        default:Date.now
    }
})
const User = mongoose.model('User', userSchema)
export default User;