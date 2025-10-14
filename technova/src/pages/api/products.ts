// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Product } from "@/interfaces/product";
import dbConnection from "@/lib/db";
import Products from "@/models/Product";
import type { NextApiRequest, NextApiResponse } from "next";

export type ProductResponse =
  | { ok: true; data: Product[] }
  | { ok: false; error: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProductResponse>
) {
  try {
    await dbConnection();

    if (req.method === "GET") {
      try {
        const { id } = req.query;

        // Si hay id, busca solo ese producto
        if (id) {
          const product = await Products.findById(id as string);
          if (!product) {
            return res
              .status(404)
              .json({ ok: false, error: "Producto no encontrado" });
          }
          return res.status(200).json({ ok: true, data: [product] });
        }

        // Si no hay id, devuelve todos los productos
        const products = await Products.find();
        return res.status(200).json({ ok: true, data: products as Product[] });
      } catch (error) {
        console.error(error);
        return res
          .status(500)
          .json({ ok: false, error: "Error al obtener productos" });
      }
    } else if (req.method === "POST") {
      try {
        const {
          name,
          brand,
          quantity,
          price,
          isActive,
          category,
          imageUrl,
        } = req.body;

        // Crear el nuevo producto
        const newProduct = new Products({
          name,
          brand,
          quantity,
          price,
          isActive,
          category,
          imageUrl,
        });

        // Guardar en la base de datos
        const savedProduct = await newProduct.save();
        const productData: Product = savedProduct.toObject();

        res.status(200).json({ ok: true, data: [productData] });
      } catch (error) {
        console.error("❌ Error en POST /api/products:", error);
        res
          .status(500)
          .json({ ok: false, error: "Error interno del servidor" });
      }
    } else if (req.method === "PUT") {
      const { id } = req.query;
      const {
        name,
        brand,
        quantity,
        price,
        isActive,
        category,
        imageUrl,
      } = req.body;

      const updated = await Products.findByIdAndUpdate(
        id as string,
        { name, brand, quantity, price, isActive, category, imageUrl },
        { new: true }
      );

      if (!updated) {
        res.status(404).json({ ok: false, error: "No encontrado" });
        return;
      }

      res.status(200).json({ ok: true, data: [updated] });
      return;
    } else if (req.method === "DELETE") {
      const { id } = req.query;
      const deleted = await Products.findByIdAndDelete(id as string);

      if (!deleted) {
        res.status(404).json({ ok: false, error: "No encontrado" });
        return;
      }

      res.status(200).json({ ok: true, data: [deleted] });
      return;
    }

    // Si el método no es permitido
    return res.status(405).json({ ok: false, error: "Método no permitido" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ ok: false, error: "Falla en los endpoints de Products" });
  }
}
