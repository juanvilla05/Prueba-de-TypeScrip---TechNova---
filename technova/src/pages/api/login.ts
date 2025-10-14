import type { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/lib/db";
import User from "@/models/Users";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === "POST") {
    try {
      const { email, password } = req.body;
      if (!email || !password) return res.status(400).json({ error: "Faltan credenciales" });

      const user = await User.findOne({ email, password }).select("-password");
      if (!user) return res.status(401).json({ error: "Credenciales inválidas" });

      return res.status(200).json(user);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Error en login" });
    }
  }

  return res.status(405).json({ message: "Método no permitido" });
}
