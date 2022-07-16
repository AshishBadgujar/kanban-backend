import express from 'express'
import Column from "../models/Column.js"
const router = express.Router();

router.post("/new", async (req, res) => {
    const { name } = req.body
    try {
        let column = await new Column({
            name
        }).save()
        res.send({ column })
    } catch (error) {
        res.status(error.code || 500).json({
            message: error.message,
            error: error,
        });
    }
});

router.post("/update", async (req, res) => {
    const { columnId, updateColumn } = req.body
    try {
        let column = await Column.findByIdAndUpdate(columnId, updateColumn)
        res.send({ column })
    } catch (error) {
        res.status(error.code || 500).json({
            message: error.message,
            error: error,
        });
    }
});
router.patch("/update", async (req, res) => {
    const { columns } = req.body
    try {
        for (let key in columns) {
            await Column.findByIdAndUpdate(key, {
                $set: { cardIds: columns[key].cardIds }
            })
        }
        res.send({ msg: "updated" })
    } catch (error) {
        res.status(error.code || 500).json({
            message: error.message,
            error: error,
        });
    }
});

router.delete("/delete", async (req, res) => {
    const { columnId } = req.body
    try {
        await Column.findByIdAndDelete(columnId)
        res.send({ columnId })
    } catch (error) {
        res.status(error.code || 500).json({
            message: error.message,
            error: error,
        });
    }
});



export default router;