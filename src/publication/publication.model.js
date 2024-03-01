import mongoose, {Schema, model} from 'mongoose'

const publicationSchema = mongoose.Schema({
    tittle:{
        type: String,
        required: true
    },
    category:{
        type: Schema.ObjectId,
        ref: 'category',
        required: true
    },
    mainText:{
        type: String,
        required: true
    }

})

export default model('publication', publicationSchema)