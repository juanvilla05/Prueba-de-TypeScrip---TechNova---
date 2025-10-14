// src/services/users/UserStore.ts
import axios from "axios";
import { User } from "@/interfaces/user";

export class UserStore {
  private baseUrl = "/api/users";

  async list(): Promise<User[]> {
    console.log("GET /users → solicitando lista de usuarios desde el backend");
    const res = await axios.get(this.baseUrl);
    return res.data.data;
  }

  async findById(id: string): Promise<User | null> {
    console.log(`GET /users?id=${id} → obteniendo usuario por ID`);
    const res = await axios.get(`${this.baseUrl}?id=${id}`);
    return res.data.data?.[0] || null;
  }

  async create(user: Omit<User, "_id">): Promise<User> {
    console.log("POST /users → creando usuario");
    const res = await axios.post(this.baseUrl, user);
    return res.data.data[0];
  }

  async update(id: string, data: Partial<User>): Promise<User | null> {
    console.log(`PUT /users?id=${id} → actualizando usuario`);
    const res = await axios.put(`${this.baseUrl}?id=${id}`, data);
    return res.data.data?.[0] || null;
  }

  async remove(id: string): Promise<boolean> {
    console.log(`DELETE /users?id=${id} → eliminando usuario`);
    await axios.delete(`${this.baseUrl}?id=${id}`);
    return true;
  }

  async findByName(username: string): Promise<User | null> {
    console.log(`GET /users → buscando por nombre: ${username}`);
    const users = await this.list();
    return users.find(u => u.name === username) || null;
  }
}