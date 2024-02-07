import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true // eliminar espacios vacios
    },

    email: {
        type: String,
        unique: true, // evita usuarios con el mismo correo electronico 
        lowercase: true, // convierte todo en minuscula (Los correos)
        Match:[/\S+@\S+\.S+/,"Por favor ingresa un correo valido"],
        required: true,
        trim: true // eliminar espacios vacios
    },

    password: {
        type: String,
        minlength: [6, 'debe contener almenos 6 caracteres'],
        required: true,

    }
},{ timestamps: true // crea automaticamente created_At update_At
})

export default mongoose.model("user", userSchema);