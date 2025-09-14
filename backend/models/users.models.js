import mongoose, { mongo, Schema } from "mongoose";


const userSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        passwordHash: { type: String, required: true },
        role: { type: String, enum: ["admin", "user"], default: "user" }
    },
     { 
        timestamps: true 
});

const User = mongoose.model('User',userSchema);
export default User;