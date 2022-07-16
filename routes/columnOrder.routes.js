import express from 'express'
import ColumnOrder from '../models/ColumnOrder.js';
const router = express.Router();

router.post("/new", async (req, res) => {
    const { newColumnOrder } = req.body
    console.log(newColumnOrder)
    try {
        let order = await ColumnOrder.updateOne({ orderId: 1 }, { columnOrder: newColumnOrder }, { upsert: true })
        res.send({ order })
    } catch (error) {
        res.status(error.code || 500).json({
            message: error.message,
            error: error,
        });
    }
});

export default router;