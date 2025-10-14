
import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
  {
    sku: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    isActive: { type: Boolean, default: true },
    imageUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

export const Product = models.Product || model("products", ProductSchema);