import {mongoose} from 'mongoose';
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:email,
        required:true,
        unique:true,
        validate:{
            validator: ()=> this.email.match(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/),
        }
    },
    password:{
        type:String,
        required:true,
        minlength: [6, 'Password must be at least 6 characters long']
    }
})
const User = mongoose.model('User', userSchema)
export default User;