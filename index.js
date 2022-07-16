import express from 'express'
import db from './db/connect.js'
import Card from "./models/Card.js"
import Column from "./models/Column.js"
import ColumnOrder from './models/ColumnOrder.js'
import dotenv from 'dotenv'
dotenv.config()
db();

const app = express()
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

import cardRouter from "./routes/card.routes.js"
import columnRouter from "./routes/column.routes.js"
import columnOrderRouter from "./routes/columnOrder.routes.js"

app.use('/api/kanban/cards', cardRouter)
app.use('/api/kanban/columns', columnRouter)
app.use('/api/kanban/columnOrder', columnOrderRouter)

app.use((error, req, res, next) => {
    console.log(error);

    res.status(error.code || 500).json({
        message: error.message,
        error: error,
    });

});

app.listen(5000, () => {
    console.log("listening on 5000")
})