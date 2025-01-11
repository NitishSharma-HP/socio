import mongoose from "mongoose";

const connectDb = async () => {
    try {
        const host = process.env.HOST
        await mongoose.connect(host)
        console.log('Connected to Database.')
    } catch (e) {
        console.log(`Error connecting to database with error ${e}`)
    }
}
export default connectDb;