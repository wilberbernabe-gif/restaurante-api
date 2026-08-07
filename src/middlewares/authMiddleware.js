const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config/jwt");


const verificarToken = (req, res, next) => {

    try {

        const authHeader = req.headers.authorization;


        if (!authHeader) {

            return res.status(401).json({
                mensaje: "Token requerido"
            });

        }


        const token = authHeader.split(" ")[1];


        if (!token) {

            return res.status(401).json({
                mensaje: "Token inválido"
            });

        }


        const usuario = jwt.verify(
            token,
            SECRET_KEY
        );


        req.usuario = usuario;


        next();


    } catch(error) {

        return res.status(401).json({
            mensaje:"Token inválido o expirado"
        });

    }

};


module.exports = verificarToken;