"use strict";
exports.__esModule = true;
exports.pool = void 0;
var dotenv_1 = require("dotenv");
var pg_1 = require("pg");
(0, dotenv_1.config)({ path: __dirname + '/../.env' });
var _a = process.env, USER_DB = _a.USER_DB, HOST_DB = _a.HOST_DB, DATABASE = _a.DATABASE, PASSWORD = _a.PASSWORD, PORT_DB = _a.PORT_DB;
var pool = new pg_1.Pool({
    user: USER_DB,
    host: HOST_DB,
    database: DATABASE,
    password: PASSWORD,
    port: PORT_DB
});
exports.pool = pool;
//# sourceMappingURL=database.js.map