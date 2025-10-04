// src/config/index.js
import "dotenv/config";

export default {
  port: process.env.PORT || 3000,
  db: {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "448400121qazxsw2Lucas",
    name: process.env.DB_NAME || "spotify",
  },
};
