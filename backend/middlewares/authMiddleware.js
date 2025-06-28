import jwt from "jsonwebtoken";

const verifyToken = async(req, res, next) => {
    try {
        //obtener el header de autorización
        const Authorization = req.header('Authorization');
        //verifica que exista el header
        if(!Authorization) {
            return res.status(401).json({message: "Token requerido"})
        };
        //extrae el token
        const token = Authorization.split('Bearer ')[1];
        //verifica que exista el token
        if(!token){
            return res.status(401).json({message: "Token inválido"})
        }
        //verifica que sea valido
        jwt.verify(token, 'az_AZ');

        //decodifica el token para obtener email
        const { email } = jwt.decode(token);
        //guarda email en req para usarlo en controlador
        req.email = email; 

        next()
    } catch (error) {
        res.status(401).json({message: "Token no válido"})
    }
}

export { verifyToken }