import mongoose from "mongoose";

let cachedClient: typeof mongoose | null = null;

export const connectMongoDB = async () => {
  try {
    if (cachedClient && cachedClient.connection.readyState === 1) {
      console.log("Using cached MongoDB client");
      return cachedClient;
    } else {
      console.log("Creating a new MongoDB client...");
      cachedClient = await mongoose.connect(process.env.MONGODB_URI as string);
    }

    if (cachedClient.connection.readyState === 1) {
      return Promise.resolve(true);
    } else {
      return Promise.reject(new Error("Failed to connect to MongoDB"));
    }
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

export const getMongoClient = () => cachedClient;
