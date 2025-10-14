import { ApiResponse, Product } from "@/interfaces/product";
import axios from "axios";


const API_URL = "/api/products";

export const getProducts = async (): Promise<ApiResponse<Product[]>> => {
  try {
    const response = await axios.get<ApiResponse<Product[]>>(API_URL);
    return response.data; // asumiendo que tu API ya responde con ApiResponse<Product[]>
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      // si tu API manda { error: string } en body, intenta leerlo
      const apiErr = (error.response?.data as { error?: string })?.error;
      return { error: apiErr ?? "Error en la solicitud" };
    }
    return { error: "Error desconocido" };
  }
};

/* ==========================
   POST - Crear producto
   ========================== */
export const createProduct = async (product: Omit<Product, "_id">): Promise<ApiResponse<Product>> => {
  try {
    const response = await axios.post(API_URL, product);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return { error: "Error al crear producto" };
    }
    return { error: "Error desconocido" };
  }
};

/* ==========================
   PUT - Actualizar producto
   ========================== */
export const updateProduct = async (product: Product, _id: string): Promise<ApiResponse<Product>> => {
  try {
    const response = await axios.put(`${API_URL}?id=${_id}`, product);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return { error: "Error al actualizar prodcuto" };
    }
    return { error: "Error desconocido" };
  }
};

/* ==========================
   DELETE - Eliminar producto
   ========================== */
export const deleteProduct = async (_id: string): Promise<ApiResponse<Product>> => {
  try {
    const response = await axios.delete(`${API_URL}?id=${_id}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return { error: "Error al eliminar producto" };
    }
    return { error: "Error desconocido" };
  }
};