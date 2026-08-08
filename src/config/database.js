const { Pool } = require("pg");

const pool = new Pool(
    process.env.DATABASE_URL
        ? {
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false
            }
        }
        : {
            host: "localhost",
            user: "postgres",
            password: "12345",
            database: "restaurante",
            port: 5432
        }
);

module.exports = pool;