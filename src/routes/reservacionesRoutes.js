const express = require("express");

const router = express.Router();


const {
    crearReservacion,
    misReservaciones,
    listarReservaciones,
    cambiarEstado,
    cancelarReservacion
} = require("../controllers/reservacionesController");


const verificarToken = require("../middlewares/authMiddleware");

const verificarRol = require("../middlewares/roleMiddleware");


/**
 * @swagger
 * /api/reservaciones:
 *   post:
 *     summary: Crear una reservación
 *     tags:
 *       - Reservaciones
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mesa_id:
 *                 type: integer
 *                 example: 1
 *               fecha:
 *                 type: string
 *                 example: 2026-08-10
 *               hora:
 *                 type: string
 *                 example: 19:00
 *               comensales:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Reservación creada correctamente
 */
router.post(
    "/",
    verificarToken,
    verificarRol("cliente"),
    crearReservacion
);


/**
 * @swagger
 * /api/reservaciones/mis:
 *   get:
 *     summary: Obtener las reservaciones del usuario autenticado
 *     tags:
 *       - Reservaciones
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de reservaciones del usuario
 */
router.get(
    "/mis",
    verificarToken,
    verificarRol("cliente"),
    misReservaciones
);


/**
 * @swagger
 * /api/reservaciones:
 *   get:
 *     summary: Listar todas las reservaciones
 *     tags:
 *       - Reservaciones
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista completa de reservaciones
 */
router.get(
    "/",
    verificarToken,
    verificarRol("admin"),
    listarReservaciones
);


/**
 * @swagger
 * /api/reservaciones/{id}/estado:
 *   put:
 *     summary: Cambiar estado de una reservación
 *     tags:
 *       - Reservaciones
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               estado:
 *                 type: string
 *                 example: confirmada
 *     responses:
 *       200:
 *         description: Estado actualizado correctamente
 */
router.put(
    "/:id/estado",
    verificarToken,
    verificarRol("admin"),
    cambiarEstado
);



/**
 * @swagger
 * /api/reservaciones/{id}:
 *   delete:
 *     summary: Cancelar una reservación propia
 *     tags:
 *       - Reservaciones
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Reservación cancelada correctamente
 */
router.delete(
    "/:id",
    verificarToken,
    verificarRol("cliente"),
    cancelarReservacion
);



module.exports = router;