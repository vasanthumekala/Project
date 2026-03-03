import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URL_LOCAL || process.env.MONGODB_URL;
    if (!mongoUri) {
      throw new Error(
        "Missing MongoDB connection string. Set MONGODB_URL_LOCAL or MONGODB_URL in .env",
      );
    }

    const dbName = process.env.MONGODB_DB_NAME || "Auto_Care_Service";

    const connectionInstance = await mongoose.connect(mongoUri, { dbName });
    console.log(
      `MongoDB connected !! DB Host : ${connectionInstance.connection.host}`,
    );
  } catch (error) {
    console.error("MongoDB connection Error :", error);
    process.exit(1);
  }
};

export default connectDB;
