import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connecté au DB");
  } catch (error) {
    console.error("Erreur lors de la connection au DB", error);
    process.exit(1);
  }
};

export default connectDB;
