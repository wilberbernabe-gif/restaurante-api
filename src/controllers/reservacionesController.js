const pool = require("../config/database");

const crearReservacion = async (req, res) => {

    try {

        const usuario_id = req.usuario.id;

        const {
            mesa_id,
            fecha,
            hora,
            comensales
        } = req.body;



        if (!mesa_id || !fecha || !hora || !comensales) {

            return res.status(400).json({
                mensaje: "Todos los campos son obligatorios"
            });

        }

        const mesa = await pool.query(
            `
            SELECT id, capacidad, estado
            FROM mesas
            WHERE id = $1
            `,
            [mesa_id]
        );


        if (mesa.rows.length === 0) {

            return res.status(404).json({
                mensaje: "Mesa no encontrada"
            });

        }



        if (!mesa.rows[0].estado) {

            return res.status(400).json({
                mensaje: "La mesa no está disponible"
            });

        }

        if (comensales > mesa.rows[0].capacidad) {

            return res.status(400).json({
                mensaje: "La cantidad de personas supera la capacidad de la mesa"
            });

        }



        const reservaExistente = await pool.query(
            `
            SELECT id
            FROM reservaciones
            WHERE mesa_id = $1
            AND fecha = $2
            AND hora = $3
            AND estado != 'cancelada'
            `,
            [
                mesa_id,
                fecha,
                hora
            ]
        );



        if (reservaExistente.rows.length > 0) {

            return res.status(409).json({
                mensaje: "La mesa ya está reservada para esa fecha y hora"
            });

        }

        const nuevaReserva = await pool.query(
            `
            INSERT INTO reservaciones
            (
                usuario_id,
                mesa_id,
                fecha,
                hora,
                comensales
            )
            VALUES
            ($1,$2,$3,$4,$5)
            RETURNING *
            `,
            [
                usuario_id,
                mesa_id,
                fecha,
                hora,
                comensales
            ]
        );



        res.status(201).json({

            mensaje: "Reservación creada correctamente",

            reservacion: nuevaReserva.rows[0]

        });



    } catch(error) {

        console.error(error);

        res.status(500).json({
            mensaje:"Error al crear reservación"
        });

    }

};


const misReservaciones = async (req,res)=>{


    try {


        const usuario_id = req.usuario.id;



        const resultado = await pool.query(
            `
            SELECT
                r.id,
                m.numero AS mesa,
                r.fecha,
                r.hora,
                r.comensales,
                r.estado

            FROM reservaciones r

            INNER JOIN mesas m
            ON r.mesa_id = m.id

            WHERE r.usuario_id = $1

            ORDER BY r.fecha, r.hora
            `,
            [
                usuario_id
            ]
        );



        res.json({

            reservaciones: resultado.rows

        });



    } catch(error){

        console.error(error);

        res.status(500).json({
            mensaje:"Error al obtener reservaciones"
        });

    }


};


const listarReservaciones = async(req,res)=>{


    try{


        const resultado = await pool.query(
            `
            SELECT

                r.id,
                u.nombre AS cliente,
                u.email,
                m.numero AS mesa,
                r.fecha,
                r.hora,
                r.comensales,
                r.estado


            FROM reservaciones r


            INNER JOIN usuarios u
            ON r.usuario_id = u.id


            INNER JOIN mesas m
            ON r.mesa_id = m.id


            ORDER BY r.fecha,r.hora

            `
        );



        res.json({

            reservaciones: resultado.rows

        });

    }catch(error){

        console.error(error);


        res.status(500).json({

            mensaje:"Error al listar reservaciones"

        });


    }


};


const cambiarEstado = async(req,res)=>{


    try{


        const {id}=req.params;

        const {estado}=req.body;



        const estadosPermitidos=[
            "pendiente",
            "confirmada",
            "cancelada"
        ];



        if(!estadosPermitidos.includes(estado)){


            return res.status(400).json({

                mensaje:"Estado no válido"

            });


        }


        const resultado = await pool.query(
            `
            UPDATE reservaciones

            SET estado=$1

            WHERE id=$2

            RETURNING *

            `,
            [
                estado,
                id
            ]

        );

        if(resultado.rows.length===0){


            return res.status(404).json({

                mensaje:"Reservación no encontrada"

            });


        }

        res.json({

            mensaje:"Estado actualizado correctamente",

            reservacion:resultado.rows[0]

        });



    }catch(error){


        console.error(error);


        res.status(500).json({

            mensaje:"Error al cambiar estado"

        });


    }


};


const cancelarReservacion = async(req,res)=>{


    try{


        const {id}=req.params;

        const usuario_id=req.usuario.id;

        const resultado=await pool.query(

            `
            UPDATE reservaciones

            SET estado='cancelada'

            WHERE id=$1
            AND usuario_id=$2

            RETURNING *

            `,

            [
                id,
                usuario_id
            ]

        );



        if(resultado.rows.length===0){


            return res.status(404).json({

                mensaje:"Reservación no encontrada o no pertenece al usuario"

            });


        }



        res.json({

            mensaje:"Reservación cancelada correctamente",

            reservacion:resultado.rows[0]

        });



    }catch(error){


        console.error(error);


        res.status(500).json({

            mensaje:"Error al cancelar reservación"

        });


    }


};

module.exports={

    crearReservacion,
    misReservaciones,
    listarReservaciones,
    cambiarEstado,
    cancelarReservacion

}