import mongoose from 'mongoose'

export default async () => {
    try {

        const mongoURI = process.env.MONGO_URI;
        const db = "kanban"
        const conn = await mongoose.connect(`${mongoURI}/${db}`)
        console.log(`MongoDB connect ${conn.connection.host}`)

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

