import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes.js";
import customerRoutes from "./routes/customer.routes.js";
import leadRoutes from "./routes/leads.routes.js";
import connectDB from './config/db.js';

const PORT = 3000;

dotenv.config();


const app = express();

const corsOptions = {
  origin: [ "http://localhost:5173"],
  credentials: true,
  methods: ["GET", "PUT", "PATCH", "POST", "DELETE"],
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended : true}))

app.get("/", (req, res) => {
  res.json("Hello from JS Backend !");
});

// All Backend Routes

app.use("/api/auth", authRoutes);

app.use("/api/customers", customerRoutes);

app.use("/api/leads", leadRoutes);

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Connection to Database Failed: ", err);
    process.exit(1);
  });