import { useEffect, useState } from "react";
import axios from "axios";
import { IProduct } from "@/interfaces/product";
import Button from "@/components/Button";
import Badge from "@/components/Badge";
import Card from "@/components/Card";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";

export default function Dashboard() {
    const { user, logout } = useAuth();
    const router = useRouter(); 


  const [products, setProducts] = useState<IProduct[]>([]);
  const [form, setForm] = useState<IProduct>({
    sku: "",
    name: "",
    brand: "",
    category: "",
    price: 0,
    quantity: 0,
    isActive: true,
    imageUrl: "",
  });

  // ✅ Cargar productos al iniciar
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("/api/products");
      setProducts(res.data);
    } catch (error) {
      console.error("Error al cargar productos", error);
    }
  };

  // ✅ Crear producto
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.sku || !form.name || !form.price) {
      alert("Todos los campos obligatorios deben completarse");
      return;
    }

    try {
      await axios.post("/api/products", form);
      alert("Producto creado con éxito");
      setForm({
        sku: "",
        name: "",
        brand: "",
        category: "",
        price: 0,
        quantity: 0,
        isActive: true,
        imageUrl: "",
      });
      fetchProducts();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      alert(error.response?.data?.error || "Error al crear producto");
    }
  };

  // ✅ Eliminar producto
  const handleDelete = async (id: string) => {
    if (!confirm("¿Seguro que quieres eliminar este producto?")) return;
    await axios.delete(`/api/products?id=${id}`);
    fetchProducts();
  };
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">📦 Dashboard de Productos</h1>

      <form onSubmit={handleSubmit} className="dashboard-form">
        <input
          type="text"
          placeholder="SKU"
          value={form.sku}
          onChange={(e) => setForm({ ...form, sku: e.target.value })}
        />
        <input
          type="text"
          placeholder="Nombre"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Marca"
          value={form.brand}
          onChange={(e) => setForm({ ...form, brand: e.target.value })}
        />
        <input
          type="text"
          placeholder="Categoría"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
        <input
          type="number"
          placeholder="Precio"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
        />
        <input
          type="number"
          placeholder="Cantidad"
          value={form.quantity}
          onChange={(e) =>
            setForm({ ...form, quantity: Number(e.target.value) })
          }
        />
        <Button label="Agregar producto" type="submit" variant="primary" />
      </form>

      <div className="dashboard-grid">
        {products.map((p) => (
          <Card key={p._id} product={p} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}