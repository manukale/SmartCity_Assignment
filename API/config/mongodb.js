import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = () => {
    try {
        mongoose.connect(process.env.URI)
        console.log("Connecting MongoDB...");
    } catch (error) {
        console.log("Error....");
        console.log(error);
    }
};

mongoose.connection.on("connected", () => {
    console.log("MongoDB Connection Successful...");
})
mongoose.connection.on("disconnected", () => {
    console.log("MongoDB Connection Failed...");
})
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    process.exit(0)
})
mongoose.set("strictQuery", true);
