import { addUser, verifyCredentials } from "../models/jobsModels.js";
import jwt from 'jsonwebtoken';

const postNewUser = async (req, res) => {
    try {
        //extraer credenciales del body
        const { email, password, rol, lenguage } = req.body;
        //crear el nuevo usuario
        const newUser = await addUser(email, password, rol, lenguage);

        //crea el token JWT con el email del usuario
        const token = jwt.sign({ email }, 'az_AZ');

        res.status(201).json({
            message: `El usuario ${req.email} ha sido añadido`,
            token
        });


    } catch (error) {
        console.log(error);
          if (error.message.includes('duplicate key')) {
            res.status(400).send("El email ya está registrado");
        } else {
            res.status(500).send("Error al registrar usuario");
        }
    };
};

export { postNewUser };