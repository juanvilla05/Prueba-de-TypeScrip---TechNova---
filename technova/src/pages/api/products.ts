import type { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/lib/db";
import { Product } from "@/models/Product";
import { IProduct } from "@/interfaces/product";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  switch (req.method) {
    case "GET":
      try {
        const products: IProduct[] = await Product.find();
        return res.status(200).json(products);
      } catch (error) {
        return res.status(500).json({ error: "Error al obtener productos" });
      }

    case "POST":
      try {
        const existing = await Product.findOne({ sku: req.body.sku });
        if (existing) return res.status(400).json({ error: "SKU duplicado" });

        const newProduct = await Product.create(req.body);
        return res.status(201).json(newProduct);
      } catch (error) {
        return res.status(400).json({ error: "Error al crear producto" });
      }

    case "PUT":
      try {
        const updatedProduct = await Product.findByIdAndUpdate(req.body._id, req.body, { new: true });
        return res.status(200).json(updatedProduct);
      } catch (error) {
        return res.status(400).json({ error: "Error al actualizar producto" });
      }

    case "DELETE":
      try {
        const { id } = req.query;
        await Product.findByIdAndDelete(id);
        return res.status(200).json({ message: "Producto eliminado" });
      } catch (error) {
        return res.status(400).json({ error: "Error al eliminar producto" });
      }

    default:
      return res.status(405).json({ message: "Método no permitido" });
  }
}