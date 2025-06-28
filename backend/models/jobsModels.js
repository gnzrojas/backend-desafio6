import { queryObjects } from "v8";
import { pool } from "../database/jobsConnection.js";
import bcrypt from 'bcrypt';

//Funcion para obtener los usuarios
const getUser = async () => {
  const { rows: user } = await pool.query("SELECT id, email, rol, lenguage FROM usuarios");
  
  return user;
};

//Función para agregar un usuario
const addUser = async (email, password, rol, lenguage) => {

    const hasedPassword = await bcrypt.hash(password, 10);

    const querySql = "INSERT INTO usuarios(email, password, rol, lenguage) VALUES ($1,$2,$3,$4) RETURNING *";
    const values = [email, hasedPassword, rol, lenguage];
    const { rows } = await pool.query(querySql, values);
    return rows[0];
};

//Función para login:
const loginUser = async (email, password) => {
    //busca el usuario por email
    const querySql = "SELECT * FROM usuarios WHERE email=$1"
    const { rows } = await pool.query(querySql, [email]);

    if (rows.length === 0) {
        throw {
            code: 404,
            message: "Email no registrado ❌"
        };
    }
    //comparar contraseña ingresada con contraseña hasheada
    const user = rows[0];
    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) {
        throw {
            code: 401,
            message: "Contraseña incorrecta ❌"
        };
    }

    delete user.password;
    return user; 

};


// //Función para verificar credenciales
// const verifyCredentials = async (email, password) => {
//     const querySql = 'SELECT *FROM usuarios WHERE email = $1 AND password = $2';
//     const { rows } = await pool.query(querySql, [email]);
//     if (rows.length === 0) {
//         throw {
//             code: 404,
//             message: 'No se encontró ningún usuario con este email'
//         };
//     }
//     const user = rows[0];
//     const isValid = await bcrypt.compare(password, user.password);
//     if(!isValid) {
//         throw {
//             code: 401,
//             message: 'Contraseña incorrecta'
//         };
//     }

//     return user;
// };

export { getUser, addUser, loginUser };