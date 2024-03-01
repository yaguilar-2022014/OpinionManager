import mongoose, { Schema, model } from "mongoose"

const commentSchema = mongoose.Schema({
    user:{
        type: Schema.ObjectId,
        required: true
    },
    publication:{
        type: Schema.ObjectId,
        required: true
    },
    content:{
        type: String,
        required: true
    }
})

export default model('comment', commentSchema)