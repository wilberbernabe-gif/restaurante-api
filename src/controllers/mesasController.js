
const pool = require("../config/database");

const listarMesas = async (req, res) => {

    try {

        const { disponible } = req.query;


        let consulta = `
            SELECT id, numero, capacidad, estado
            FROM mesas
        `;


        if (disponible === "true") {

            consulta += `
                WHERE estado = true
            `;

        }


        consulta += `
            ORDER BY numero ASC
        `;


        const resultado = await pool.query(consulta);


        res.json({
            mesas: resultado.rows
        });


    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: "Error al obtener las mesas"
        });

    }

};


const obtenerMesa = async (req, res) => {

    try {

        const { id } = req.params;


        const resultado = await pool.query(
            `
            SELECT id, numero, capacidad, estado
            FROM mesas
            WHERE id = $1
            `,
            [id]
        );


        if (resultado.rows.length === 0) {

            return res.status(404).json({
                mensaje: "Mesa no encontrada"
            });

        }


        res.json({
            mesa: resultado.rows[0]
        });


    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: "Error al obtener la mesa"
        });

    }

};


const crearMesa = async (req, res) => {

    try {

        const { numero, capacidad } = req.body;


        if (!numero || !capacidad) {

            return res.status(400).json({
                mensaje: "Número y capacidad son obligatorios"
            });

        }


        const resultado = await pool.query(
            `
            INSERT INTO mesas(numero, capacidad)
            VALUES($1,$2)
            RETURNING id, numero, capacidad, estado
            `,
            [
                numero,
                capacidad
            ]
        );


        res.status(201).json({
            mensaje: "Mesa creada correctamente",
            mesa: resultado.rows[0]
        });


    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: "Error al crear la mesa"
        });

    }

};

const actualizarMesa = async (req, res) => {

    try {

        const { id } = req.params;

        const { numero, capacidad } = req.body;


        const resultado = await pool.query(
            `
            UPDATE mesas
            SET numero = $1,
                capacidad = $2
            WHERE id = $3
            RETURNING id, numero, capacidad, estado
            `,
            [
                numero,
                capacidad,
                id
            ]
        );


        if (resultado.rows.length === 0) {

            return res.status(404).json({
                mensaje:"Mesa no encontrada"
            });

        }


        res.json({
            mensaje:"Mesa actualizada correctamente",
            mesa: resultado.rows[0]
        });


    } catch(error) {

        console.error(error);

        res.status(500).json({
            mensaje:"Error al actualizar mesa"
        });

    }

};


const desactivarMesa = async (req, res) => {

    try {

        const { id } = req.params;


        const resultado = await pool.query(
            `
            UPDATE mesas
            SET estado = false
            WHERE id = $1
            RETURNING id, numero, capacidad, estado
            `,
            [id]
        );


        if(resultado.rows.length === 0){

            return res.status(404).json({
                mensaje:"Mesa no encontrada"
            });

        }


        res.json({
            mensaje:"Mesa desactivada correctamente",
            mesa:resultado.rows[0]
        });


    } catch(error){

        console.error(error);

        res.status(500).json({
            mensaje:"Error al desactivar mesa"
        });

    }

};



module.exports = {
    listarMesas,
    obtenerMesa,
    crearMesa,
    actualizarMesa,
    desactivarMesa
};