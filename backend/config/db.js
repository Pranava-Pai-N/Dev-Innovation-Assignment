import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Database connected successfully !");
        
    } catch (error) {
        console.log("Error connecting to DB : ", error);
    }
}

export default connectDB;