import express from "express";
const app = express();
import cors from "cors";
import dotenv from "dotenv"
import userRoutes from "./routes/user.routes.js"
import taskRoutes from "./routes/task.route.js"
dotenv.config();



app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Allow cookies and HTTP auth
}));

app.use(express.json())
app.options('*', cors());



app.use("/api/user", userRoutes)
app.use("/api/task", taskRoutes)

app.listen(5500,()=>{
    console.log("Server Running on Port 5500")
})