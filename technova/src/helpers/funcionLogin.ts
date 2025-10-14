import { UserStore } from "@/services/users";


const userStore = new UserStore();

export async function findUser(name: string, password: string) {
  const user = await userStore.findByName(name);
  if (!user) {
    console.log("❌ Usuario no encontrado");
    return null;
  }

  if (user.password !== password) {
    console.log("❌ Contraseña incorrecta");
    return null;
  }

  console.log("✅ Login exitoso:", user.name);
  return user;
}