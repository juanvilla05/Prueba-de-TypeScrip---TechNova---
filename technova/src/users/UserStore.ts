// src/users/UserStore.ts
import { addDefaults } from "./decorators";

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  role?: string;
  createdAt?: number;
}

export class UserStore {
  private users: IUser[] = [];

  constructor() {
    console.log("🧩 UserStore inicializada");
  }

  list(): IUser[] {
    console.log("📡 GET /users (simulado)");
    return this.users;
  }

  findByName(name: string): IUser | undefined {
    console.log(`📡 GET /users?name=${name} (simulado)`);
    return this.users.find((u) => u.name.toLowerCase() === name.toLowerCase());
  }

  @addDefaults
  create(user: IUser): IUser {
    console.log("📡 POST /users (simulado)");
    const newUser = { ...user, id: Date.now() };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, data: Partial<IUser>): IUser | undefined {
    console.log(`📡 PATCH /users/${id} (simulado)`);
    const index = this.users.findIndex((u) => u.id === id);
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...data };
      return this.users[index];
    }
    return undefined;
  }

  remove(id: number): void {
    console.log(`📡 DELETE /users/${id} (simulado)`);
    this.users = this.users.filter((u) => u.id !== id);
  }
}
