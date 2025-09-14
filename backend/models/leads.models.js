import mongoose,{ Schema } from "mongoose";

const leadSchema = new Schema(
    {
        customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
        title: { type: String, required: true },
        description: { type: String },
        status: { type: String, enum: ["new", "contacted", "qualified", "lost"], default: "new" },
        value: { type: Number, default: 0 },
        createdAt: { type: Date, default: Date.now }
    }, 
    { 
        timestamps: true 
    });

const Lead = mongoose.model("Lead", leadSchema);
export default Lead;
