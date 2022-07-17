import mongoose from 'mongoose'

export default async () => {
    try {

        const mongoURI = "mongodb://localhost:27017"
        // const mongoURI = "mongodb+srv://Ashish:ashish@foodweb.cwoie.mongodb.net/?retryWrites=true&w=majority"
        const db = "kanban"
        const conn = await mongoose.connect(`${mongoURI}/${db}`)
        console.log(`MongoDB connect ${conn.connection.host}`)

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

