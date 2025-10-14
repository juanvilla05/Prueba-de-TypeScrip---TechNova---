import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || "";

export const dbConnect = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      return;
    }

    await mongoose.connect(MONGODB_URI);
    console.log("Conectado");
  } catch (error) {
    console.error("Error al conectar:", error);
  }
};