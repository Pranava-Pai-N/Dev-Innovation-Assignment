import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database connected successfully !");
        
    } catch (error) {
        console.log("Error connecting to DB : ", error);
    }
}

export default connectDB;