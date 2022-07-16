import express from 'express'
import Card from '../models/Card.js';
import Column from '../models/Column.js';
const router = express.Router();

router.post("/new", async (req, res) => {
    const { card, columnId } = req.body
    try {
        let newCard = await new Card(card).save()
        await Column.findByIdAndUpdate(columnId, {
            $push: { cardIds: newCard.id }
        })
        res.send({ newCard })
    } catch (error) {
        res.status(error.code || 500).json({
            message: error.message,
            error: error,
        });
    }
});
router.delete("/delete", async (req, res) => {
    const { cardId, columnId } = req.body
    try {
        await Card.findByIdAndDelete(cardId)
        await Column.findByIdAndUpdate(columnId, {
            $pull: { cardIds: cardId }
        })
        res.send({ msg: "deleted" })
    } catch (error) {
        res.status(error.code || 500).json({
            message: error.message,
            error: error,
        });
    }
});


export default router;