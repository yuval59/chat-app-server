"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const drizzle_kit_1 = require("drizzle-kit");
const env_1 = require("./src/env");
const host = env_1.env.DB_HOST;
const port = env_1.env.DB_PORT;
const user = env_1.env.DB_USER;
const password = env_1.env.DB_PASS;
const database = env_1.env.DB_DATABASE;
exports.default = (0, drizzle_kit_1.defineConfig)({
    out: './drizzle',
    schema: ['./src/db/schemas'],
    dialect: 'mysql',
    dbCredentials: {
        host,
        port,
        user,
        password,
        database,
    },
});
