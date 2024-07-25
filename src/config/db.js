import mongoose from "mongoose";
mongoose.set("strictQuery", false);


const DB_STR = process.env.MONGO_URI;

export const con = async (DB_STR) => {
    try {
        const con = await mongoose.connect(DB_STR)

        console.log(`Mongo DB connected :${con.connection.host}`)
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}
