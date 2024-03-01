import mongoose from "mongoose"

const categorySchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        uppercase: true
    },
    description:{
        type: String,
        required: true
    }
})

export default mongoose.model('category', categorySchema)