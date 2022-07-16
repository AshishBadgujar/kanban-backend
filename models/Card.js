import mongoose from 'mongoose'
import normalize from 'normalize-mongoose'

const CardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'hight']
    },
    completed: {
        type: Boolean,
        default: false
    }
})

CardSchema.plugin(normalize)
const Card = mongoose.model('Card', CardSchema)
export default Card;