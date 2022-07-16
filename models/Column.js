import mongoose from 'mongoose'
import normalize from 'normalize-mongoose'

const ColumnSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    cardIds: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Card"
        }
    ]
})
ColumnSchema.plugin(normalize)
const Column = mongoose.model('Column', ColumnSchema)
export default Column;