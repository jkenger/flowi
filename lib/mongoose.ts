import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if(!process.env.MONGODB_URI) {
    console.log("MONGODB_URI not found");
    return;
  }

  if (isConnected) {
    console.log("using existing database connection");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      dbName:"flowi"
    });

    isConnected = db.connections[0].readyState === 1;
    console.log("new database connection");
  } catch (error) {
    console.log("error connecting to database");
  }
}