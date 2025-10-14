import { useEffect, useState } from "react";
import { Product } from "@/interfaces/product";
import { useAuth } from "@/context/AuthProvider";
import { useRouter } from "next/router";
import { MiButton } from "@/components/Button";
import { deleteProduct, getProducts } from "@/services/products";
import { Card } from "@/components/Card";
import { updateProduct } from "@/services/products";


type FormState = {
  name: string;
  brand: string;
  category: string;
  price: number | "";
  quantity: number | "";
  isActive: boolean;
  imageUrl: string;
};

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<FormState>({
    name: "",
    brand: "",
    category: "",
    price: "",
    quantity: "",
    isActive: true,
    imageUrl: "",
  });
  const [creating, setCreating] = useState(false);
  // 👉 Agrega estos estados junto a los que ya tienes
const [editingId, setEditingId] = useState<string | null>(null);
const [updating, setUpdating] = useState(false);


  // 🔒 Proteger ruta
  useEffect(() => {
    if (!loading && !user) router.push("/");
  }, [user, loading, router]);

  // 📦 Obtener productos
  const fetchData = async () => {
    const response = await getProducts();
    if (response.data) {
      setProducts(response.data);
    } else {
      console.error("Error al obtener productos:", response.error);
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🧾 Actualizar inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? value === ""
            ? ""
            : Number(value)
          : value,
    }));
  };

  // 🚀 Crear producto
  const handleCreate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault(); // evita recargar el formulario
    try {
      if (!form.name || !form.brand || !form.category) {
        alert("Nombre, Marca y Categoría son obligatorios");
        return;
      }
      if (form.price === "" || form.quantity === "") {
        alert("Precio y Cantidad son obligatorios");
        return;
      }

      setCreating(true);
      console.log("🧾 Enviando producto:", form);

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          brand: form.brand,
          category: form.category,
          price: Number(form.price),
          quantity: Number(form.quantity),
          isActive: form.isActive,
          imageUrl: form.imageUrl,
        }),
      });

      const json = (await res.json()) as {
        ok: boolean;
        data?: Product[];
        error?: string;
      };

      console.log("📦 Respuesta del servidor:", json);

      if (!res.ok || !json.ok || !json.data?.[0]) {
        throw new Error(json.error || "No se pudo crear el producto");
      }

      const created = json.data[0];
      setProducts((prev) => [...prev, created]);

      // limpiar form
      setForm({
        name: "",
        brand: "",
        category: "",
        price: "",
        quantity: "",
        isActive: true,
        imageUrl: "",
      });
    } catch (error) {
      console.error("❌ Error creando producto:", error);
      alert("Error creando producto. Revisa la consola.");
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    const response = await deleteProduct(id);
    if (!response.error) {
      setProducts((prev) => prev.filter((b) => b._id !== id));
      console.log('Se elimina')
    } else {
      console.log('no diio')
    }
  };

  // 👉 Función para cargar los datos del producto al formulario
const handleEditProduct = (product: Product) => {
  setForm({
    name: product.name,
    brand: product.brand,
    category: product.category,
    price: product.price,
    quantity: product.quantity,
    isActive: product.isActive,
    imageUrl: `${product.imageUrl}`,
  });
  setEditingId(`${product._id}`);
};
// 👉 Función para actualizar el producto usando el servicio de PUT

const handleUpdateProduct = async (e?: React.FormEvent) => {
  if (e) e.preventDefault();
  if (!editingId) return;

  try {
    setUpdating(true);

    const updatedProduct: Product = {
      _id: editingId,
      name: form.name,
      brand: form.brand,
      category: form.category,
      price: Number(form.price),
      quantity: Number(form.quantity),
      isActive: form.isActive,
      imageUrl: form.imageUrl,
    };

    const response = await updateProduct(updatedProduct, editingId);

    if (response.error || !response.data) {
      throw new Error(response.error || "No se pudo actualizar el producto");
    }

    const updated = response.data;
    setProducts((prev) =>
      prev.map((p) => (p._id === editingId ? updated : p))
    );

    // limpiar
    setEditingId(null);
    setForm({
      name: "",
      brand: "",
      category: "",
      price: "",
      quantity: "",
      isActive: true,
      imageUrl: "",
    });

    console.log("✅ Producto actualizado correctamente");
  } catch (err) {
    console.error("❌ Error actualizando producto:", err);
  } finally {
    setUpdating(false);
  }
};



  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* 🧾 Formulario */}
      <form
        onSubmit={handleCreate}
        className="bg-white rounded-xl shadow p-6 border text-black"
      >
        <h2 className="text-2xl font-semibold mb-5">🛒 Crear nuevo producto</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium mb-1">Nombre *</label>
            <input
              type="text"
              name="name"
              placeholder="Ej. MacBook Air"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-black bg-white placeholder-gray-400 focus:ring-2 focus:ring-gray-700 outline-none"
            />
          </div>

          {/* Marca */}
          <div>
            <label className="block text-sm font-medium mb-1">Marca *</label>
            <input
              type="text"
              name="brand"
              placeholder="Ej. Apple"
              value={form.brand}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-black bg-white placeholder-gray-400 focus:ring-2 focus:ring-gray-700 outline-none"
            />
          </div>

          {/* Categoría */}
          <div>
            <label className="block text-sm font-medium mb-1">Categoría *</label>
            <input
              type="text"
              name="category"
              placeholder="Ej. Laptops"
              value={form.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-black bg-white placeholder-gray-400 focus:ring-2 focus:ring-gray-700 outline-none"
            />
          </div>

          {/* Precio */}
          <div>
            <label className="block text-sm font-medium mb-1">Precio *</label>
            <input
              type="number"
              name="price"
              placeholder="Ej. 2500"
              value={form.price}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-black bg-white placeholder-gray-400 focus:ring-2 focus:ring-gray-700 outline-none"
            />
          </div>

          {/* Cantidad */}
          <div>
            <label className="block text-sm font-medium mb-1">Cantidad *</label>
            <input
              type="number"
              name="quantity"
              placeholder="Ej. 5"
              value={form.quantity}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-black bg-white placeholder-gray-400 focus:ring-2 focus:ring-gray-700 outline-none"
            />
          </div>

          {/* Imagen */}
          <div>
            <label className="block text-sm font-medium mb-1">Imagen (URL)</label>
            <input
              type="url"
              name="imageUrl"
              placeholder="https://source.unsplash.com/1024x768/?laptop"
              value={form.imageUrl}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-black bg-white placeholder-gray-400 focus:ring-2 focus:ring-gray-700 outline-none"
            />
          </div>

          {/* Estado */}
          <div className="flex items-center gap-2 mt-4">
            <input
              type="checkbox"
              name="isActive"
              checked={form.isActive}
              onChange={handleChange}
              className="h-5 w-5 text-black border-gray-400 focus:ring-gray-700"
            />
            <label className="text-sm font-medium text-black">Activo</label>
          </div>
        </div>

        {/* Botón crear */}
        <div className="mt-6">
          <MiButton
            textButton={creating ? "Creando..." : "Crear producto"}
            click={handleCreate} // ✅ se ejecuta correctamente
            variant="primary"
            size="md"
          />
        </div>

        {/* Botón editar */}
        <div className="mt-6">
          <MiButton
            textButton={updating ? "Actualizando..." : "Actualizar producto"}
            click={handleUpdateProduct} // ✅ se ejecuta correctamente
            variant="primary"
            size="md"
          />
        </div>
      </form>

      {/* 🧾 Lista de productos */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.length === 0 ? (
          <p className="text-gray-500 col-span-full text-center">
            No se encontraron productos
          </p>
        ) : (
          products.map((p) => (
            <Card
              key={p._id}
              titulo={p.name}
              imagenUrl={p.imageUrl}
              type="white"
              label={p.isActive ? "Activo" : "Inactivo"}
              status="succes"
              brand={p.brand}
              category={p.category}
              quantity={p.quantity}
              price={p.price}
              isActive={p.isActive}
              funcion2={()=>handleDeleteProduct(`${p._id}`)}
              funcion1={()=>handleEditProduct(p)}
            />
          ))
        )}
      </section>
    </div>
  );
}
