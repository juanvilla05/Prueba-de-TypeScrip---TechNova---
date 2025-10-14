import { Schema, model, Model } from "mongoose";

const usersSchema = new Schema({
    name: {
        type: String,
        // required: [true, "The name is required"],
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    }

});

// Utiliza un patrón singleton para garantizar que solo se compile una instancia del modelo
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let Users: Model<any>;
try {
    // Intenta compilar el modelo solo una vez
    Users = model("users"); // es el nombre de la entidad donde esta apuntando al base de datos
// eslint-disable-next-line @typescript-eslint/no-unused-vars
} catch (error) {
    // Si el modelo ya está compilado, úsalo
    Users = model("users", usersSchema);
}

export default Users;