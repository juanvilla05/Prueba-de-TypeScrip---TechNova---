import { Schema, model, models } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    category: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true, // ✅ crea automáticamente createdAt y updatedAt
  }
);

// ✅ Usa el helper de Next.js / Mongoose para evitar recompilar modelos
const Products = models.Products || model("Products", productSchema);

export default Products;
