// src/users/decorators.ts
import { IUser } from "./UserStore";

export function addDefaults(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any  
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = function (user: IUser) {
    const userWithDefaults = {
      role: "user",
      createdAt: Date.now(),
      ...user,
    };
    console.log("🎯 Decorador: agregando propiedades por defecto", userWithDefaults);
    return originalMethod.apply(this, [userWithDefaults]);
  };

  return descriptor;
}
