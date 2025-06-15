import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { connectDB } from "./config/mongodb.js";
import { connectMySQL } from "./config/sql.js";

import cityRoute from "./routes/city.js";
import userRoute from "./routes/user.js";
import { userTable } from "./model/user.sql.js";

const app = express();
dotenv.config();
connectDB();
await connectMySQL()
 await userTable()
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
app.use('/api/city', cityRoute);
app.use('/api/user', userRoute);

app.listen(process.env.PORT, () => {
    connectDB();
    console.log(`Listening at ${process.env.PORT || 5000}`);
});
