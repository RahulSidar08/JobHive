import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
console.log("MongoDB URI:", process.env.MONGO_URL); 
const connectDB = async () => {
    try {
       await mongoose.connect(`${process.env.MONGO_URL}`);
        console.log("mongo url is correct")
        console.log('mongodb connected successfully');
    } catch (error) {
        console.log(error);
    }
}
export default connectDB;