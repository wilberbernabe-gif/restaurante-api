const swaggerJsdoc = require("swagger-jsdoc");


const swaggerOptions = {

    definition: {

        openapi: "3.0.0",

        info: {

            title: "API Restaurante",

            version: "1.0.0",

            description:
            "API REST para gestión de usuarios, mesas y reservaciones de restaurante"

        },


        servers: [

            {
                url: "http://localhost:3000",
                description: "Servidor local"
            },
            {
                url:
                "https://restaurante-api-production-bb91.up.railway.app",
                description: "Servidor en Railway"
            }

        ],


        components: {

            securitySchemes: {

                bearerAuth: {

                    type: "http",

                    scheme: "bearer",

                    bearerFormat: "JWT"

                }

            }

        }

    },


    apis: [

        "./src/routes/*.js"

    ]

};



const swaggerSpec = swaggerJsdoc(swaggerOptions);


module.exports = swaggerSpec;