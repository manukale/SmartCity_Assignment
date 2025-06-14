import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mysql from "mysql2/promise"

dotenv.config();

const app = express();
dotenv.config();

const port = process.env.PORT || 3000;
app.use(
    cors({
        credentials: true,
        origin: true,
        methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    })
);

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res, next) => {
    res.send('<h1>API MASTER</h1>')
})

const connectDB = () => {
    try {
        mongoose.connect(process.env.URI)
        console.log("Connecting Database...");
    } catch (error) {
        console.log("Error....");
        console.log(error);
    }
};

mongoose.connection.on("connected", () => {
    console.log("Database Connection Successful...");
})
mongoose.connection.on("disconnected", () => {
    console.log("Database Connection Failed...");
})
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    process.exit(0)
})
mongoose.set("strictQuery", true);
app.listen(port, () => {
    connectDB();
    console.log(`Listening at ${port}`);
});

const db = await mysql.createConnection({
    host: "localhost",
    user: "",
    password: "",
    database:""

})