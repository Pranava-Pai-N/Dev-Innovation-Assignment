import mongoose,{Schema} from "mongoose";

const customerSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String },
        phone: { type: String },
        company: { type: String },
        ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
    }, 
    { 
        timestamps: true 
    });

const Customer = mongoose.model("Customer", customerSchema);
export default Customer;
