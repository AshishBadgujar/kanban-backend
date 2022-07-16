import mongoose from 'mongoose'
import normalize from 'normalize-mongoose'

const ColumnOrderSchema = new mongoose.Schema({
    orderId: {
        type: Number,
        default: 1
    },
    columnOrder: [String]
})
ColumnOrderSchema.plugin(normalize)
const ColumnOrder = mongoose.model('ColumnOrder', ColumnOrderSchema)
export default ColumnOrder;