import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config(); // Make sure to load environment variables

const connectionUri = process.env.CONNECTION || "mongodb://db:27017/todo-app";

if (!connectionUri) {
    console.error("MongoDB connection string is undefined. Please check your .env file.");
    process.exit(1); // Exit the process with an error
}

mongoose.connect(connectionUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (err) => {
    console.error("Connection error:", err);
});

db.on("disconnected", () => {
    console.log("MongoDB disconnected...");
});

db.on('connected', () => {
    console.log("Connected to MongoDB server");
});

export default db;
