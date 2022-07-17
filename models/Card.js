import mongoose from 'mongoose'
import normalize from 'normalize-mongoose'

const CardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

CardSchema.plugin(normalize)
const Card = mongoose.model('Card', CardSchema)
export default Card;