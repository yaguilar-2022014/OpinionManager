import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    surname:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        minLength: [6, 'Password  must be 6 characters'],
        required: true
    }
})

export default mongoose.model('user', userSchema)