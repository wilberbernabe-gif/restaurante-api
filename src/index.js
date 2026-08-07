const express = require("express");
const pool = require("./config/database");

const authRoutes = require("./routes/authRoutes");
const mesasRoutes = require("./routes/mesasRoutes");
const reservacionesRoutes = require("./routes/reservacionesRoutes");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");


const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

// Ruta principal
app.get("/", (req, res) => {
    res.json({
        mensaje: "API del restaurante funcionando"
    });
});


app.get("/test-db", async (req, res) => {

    try {

        const result = await pool.query("SELECT NOW()");

        res.json({
            mensaje: "PostgreSQL conectado correctamente",
            fecha: result.rows[0].now
        });

    } catch (error) {

        console.error("Error en PostgreSQL:", error);

        res.status(500).json({
            mensaje: "Error al conectar con PostgreSQL"
        });

    }

});

app.use("/api/auth", authRoutes);

app.use("/api/mesas", mesasRoutes);

app.use("/api/reservaciones",reservacionesRoutes);


app.listen(PORT, () => {
    console.log("Servidor ejecutandose en http://localhost:3000");
});