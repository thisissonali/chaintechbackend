import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

const DB = process.env.MONGO_URI;
export const connectDb = () => {
    mongoose.connect(DB, {
        dbName:"chaintechbackend"
    }).then(() => {
        console.log("Database connected");
    }).catch((err) => {
        console.log(err);
    })
}