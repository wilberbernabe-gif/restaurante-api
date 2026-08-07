const bcrypt = require("bcrypt");
const pool = require("../config/database");
const { generarToken } = require("../config/jwt");


// REGISTRO DE USUARIO
const register = async (req, res) => {

    try {

        const { nombre, email, password } = req.body;


        if (!nombre || !email || !password) {

            return res.status(400).json({
                mensaje: "Todos los campos son obligatorios"
            });

        }


        const usuarioExistente = await pool.query(
            "SELECT * FROM usuarios WHERE email = $1",
            [email]
        );


        if (usuarioExistente.rows.length > 0) {

            return res.status(400).json({
                mensaje: "El correo ya está registrado"
            });

        }


        const passwordEncriptada = await bcrypt.hash(password, 10);


        const nuevoUsuario = await pool.query(
            `
            INSERT INTO usuarios(nombre,email,password)
            VALUES($1,$2,$3)
            RETURNING id,nombre,email,rol
            `,
            [
                nombre,
                email,
                passwordEncriptada
            ]
        );


        res.status(201).json({
            mensaje: "Usuario creado correctamente",
            usuario: nuevoUsuario.rows[0]
        });


    } catch(error) {

        console.error(error);

        res.status(500).json({
            mensaje:"Error del servidor"
        });

    }

};




// LOGIN
const login = async (req, res) => {

    try {

        const { email, password } = req.body;


        if (!email || !password) {

            return res.status(400).json({
                mensaje:"Email y contraseña son obligatorios"
            });

        }


        const resultado = await pool.query(
            "SELECT * FROM usuarios WHERE email = $1",
            [email]
        );


        if (resultado.rows.length === 0) {

            return res.status(404).json({
                mensaje:"Usuario no encontrado"
            });

        }


        const usuario = resultado.rows[0];


        const passwordCorrecta = await bcrypt.compare(
            password,
            usuario.password
        );


        if (!passwordCorrecta) {

            return res.status(401).json({
                mensaje:"Contraseña incorrecta"
            });

        }


        const token = generarToken(usuario);


        res.json({

            mensaje:"Login exitoso",

            token: token

        });


    } catch(error) {

        console.error(error);

        res.status(500).json({
            mensaje:"Error del servidor"
        });

    }

};




// PERFIL DEL USUARIO AUTENTICADO
const perfil = async (req, res) => {

    try {

        const resultado = await pool.query(
            `
            SELECT id,nombre,email,rol
            FROM usuarios
            WHERE id = $1
            `,
            [
                req.usuario.id
            ]
        );


        res.json({

            usuario: resultado.rows[0]

        });


    } catch(error) {

        console.error(error);

        res.status(500).json({
            mensaje:"Error del servidor"
        });

    }

};



module.exports = {
    register,
    login,
    perfil
};