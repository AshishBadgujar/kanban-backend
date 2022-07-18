import express from 'express'
import db from './db/connect.js'
import Card from "./models/Card.js"
import Column from "./models/Column.js"
import ColumnOrder from './models/ColumnOrder.js'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()
db();

const app = express()
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});
app.use(express.json())

app.get('/api/kanban/board', async (req, res) => {
    try {
        let board = {
            cards: [],
            columns: [],
            columnOrder: []
        }
        board.cards = await Card.find()
        board.columns = await Column.find()
        let data = await ColumnOrder.find()
        board.columnOrder = data[0]?.columnOrder || []
        res.send({ board })
    } catch (error) {
        res.status(error.code || 500).json({
            message: error.message,
            error: error,
        });
    }
})

//card --------------------------------------------------------------
app.post('/api/kanban/cards/new', async (req, res) => {
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

//colmns -------------------------------------------------------------------
app.post("/api/kanban/columns/new", async (req, res) => {
    const { name } = req.body
    try {
        let column = await new Column({
            name
        }).save()
        await ColumnOrder.updateOne({ orderId: 1 }, { $push: { columnOrder: column.id } }, { upsert: true })
        res.send({ column })
    } catch (error) {
        res.status(error.code || 500).json({
            message: error.message,
            error: error,
        });
    }
});

app.post("/api/kanban/columns/update", async (req, res) => {
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
app.patch("/api/kanban/columns/update", async (req, res) => {
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

app.delete("/api/kanban/columns/delete", async (req, res) => {
    const { columnId } = req.body
    try {
        let column = await Column.findByIdAndDelete(columnId)
        await ColumnOrder.updateOne({ orderId: 1 }, {
            $pull: { columnOrder: columnId }
        })
        column.cardIds.map(async (cardId) => {
            await Card.findByIdAndDelete(cardId)
        })
        res.send({ columnId })
    } catch (error) {
        res.status(error.code || 500).json({
            message: error.message,
            error: error,
        });
    }
});

// ColumnOrder----------------------------------------------------------
app.post("/api/kanban/columnOrder/new", async (req, res) => {
    const { newColumnOrder } = req.body
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

// app.use('/api/kanban/cards', cardRouter)
// app.use('/api/kanban/columns', columnRouter)
// app.use('/api/kanban/columnOrder', columnOrderRouter)

app.use((error, req, res, next) => {
    console.log(error);

    res.status(error.code || 500).json({
        message: error.message,
        error: error,
    });

});

app.listen(process.env.PORT || 5000, () => {
    console.log("listening on 5000")
})