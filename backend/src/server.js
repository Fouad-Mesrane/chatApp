import express from "express";
import "dotenv/config";
import cors from "cors"
import authRoutes from "./routes/auth.route.js"
import connectDB from "./lib/db.js";



const app = express();



app.use(express.json());
app.use(cors())



app.use("/api/auth", authRoutes)













app.listen(process.env.PORT, () => {
    console.log("Server is running on port " + process.env.PORT);
    connectDB();
});