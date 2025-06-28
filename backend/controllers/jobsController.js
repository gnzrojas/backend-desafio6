import { addUser, getUser, loginUser } from "../models/jobsModels.js";
import jwt from 'jsonwebtoken';

//Función para obtener los usuarios
const getAllUsers = async (req, res) => {
    try {
        const user = await getUser();
        res.json(user);
        
    } catch (error) {
        res.status(error.code || 500).send(error);
    };
};

//Función para agregar un nuevo usuario
const postNewUser = async (req, res) => {
    try {
        //extraer credenciales del body
        const { email, password, rol, lenguage } = req.body;
        //crear el nuevo usuario
        const newUser = await addUser(email, password, rol, lenguage);

        //crea el token JWT con el email del usuario
        const token = jwt.sign({ email }, 'az_AZ');

        res.status(201).json({
            message: `El usuario ${email} ha sido añadido`,
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

//Función para login
const postLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await loginUser(email, password);

        //generar jsonwebtoken
        const token = jwt.sign({
            id: user.id,
            email: user.email
        }, 'az_AZ');

        res.status(201).json({
            message: `Bienvenido ${user.email}`,
            token,
            user: {
                email: user.email,
                rol: user.rol,
                lenguage: user.lenguage
            }
        });
    } catch (error) {
        console.error("Error en iniciar sesión:", error);
        res.status(error.code || 500).json({
            message: error.message
        });

    }
};


export { getAllUsers, postNewUser, postLogin };