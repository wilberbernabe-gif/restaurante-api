const jwt = require("jsonwebtoken");


const SECRET_KEY = "restaurante_secreto_123";


const generarToken = (usuario) => {

    return jwt.sign(
        {
            id: usuario.id,
            email: usuario.email,
            rol: usuario.rol
        },
        SECRET_KEY,
        {
            expiresIn: "2h"
        }
    );

};


module.exports = {
    generarToken,
    SECRET_KEY
};