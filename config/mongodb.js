//folder is usually used to configure and connect your app to MongoDB.
//In most Node.js or Express projects, developers create a separate config file so the database connection logic is organized and reusable.
// In this case, the mongodb.js file establishes a connection to the MongoDB database using Mongoose. 
// It listens for the "connected" event to confirm a successful connection and exports the connectDB function, 
// which can be called from other parts of the application (like server.js) to initialize the database connection when the server starts.
import mongoose from "mongoose";

const connectDB = async () => {
    mongoose.connection.on("connected", () => {
        console.log("MongoDB connected successfully");
    });
}

await mongoose.connect(`${process.env.MONGODB_URI}login`)

export default connectDB;   