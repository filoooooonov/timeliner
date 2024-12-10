import mongoose from "mongoose";

let client: typeof mongoose | null = null;

export const connectMongoDB = async () => {
  try {
    if (!client) {
      client = await mongoose.connect(process.env.MONGODB_URI as string);
    }
    if (client.connection.readyState === 1) {
      return Promise.resolve(true);
    }
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

export const getMongoClient = () => client;
