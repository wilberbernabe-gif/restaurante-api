const express = require("express");

const router = express.Router();


const {
    listarMesas,
    obtenerMesa,
    crearMesa,
    actualizarMesa,
    desactivarMesa
} = require("../controllers/mesasController");


const verificarToken = require("../middlewares/authMiddleware");

const verificarRol = require("../middlewares/roleMiddleware");

/**
 * @swagger
 * /api/mesas:
 *   get:
 *     summary: Listar todas las mesas disponibles
 *     tags:
 *       - Mesas
 *     responses:
 *       200:
 *         description: Lista de mesas
 */
router.get(
    "/",
    listarMesas
);

/**
 * @swagger
 * /api/mesas/{id}:
 *   get:
 *     summary: Obtener detalle de una mesa
 *     tags:
 *       - Mesas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Información de la mesa
 */
router.get(
    "/:id",
    obtenerMesa
);


/**
 * @swagger
 * /api/mesas:
 *   post:
 *     summary: Crear una nueva mesa
 *     tags:
 *       - Mesas
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               numero:
 *                 type: integer
 *                 example: 6
 *               capacidad:
 *                 type: integer
 *                 example: 4
 *     responses:
 *       201:
 *         description: Mesa creada correctamente
 */
router.post(
    "/",
    verificarToken,
    verificarRol("admin"),
    crearMesa
);

/**
 * @swagger
 * /api/mesas/{id}:
 *   put:
 *     summary: Actualizar datos de una mesa
 *     tags:
 *       - Mesas
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
 *               numero:
 *                 type: integer
 *                 example: 6
 *               capacidad:
 *                 type: integer
 *                 example: 8
 *     responses:
 *       200:
 *         description: Mesa actualizada correctamente
 */
router.put(
    "/:id",
    verificarToken,
    verificarRol("admin"),
    actualizarMesa
);


/**
 * @swagger
 * /api/mesas/{id}:
 *   delete:
 *     summary: Desactivar una mesa (soft delete)
 *     tags:
 *       - Mesas
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
 *         description: Mesa desactivada correctamente
 */
router.delete(
    "/:id",
    verificarToken,
    verificarRol("admin"),
    desactivarMesa
);



module.exports = router;