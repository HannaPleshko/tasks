"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var error_1 = require("./helpers/error");
var tasks_controller_1 = require("./tasks/tasks.controller");
var app = (0, express_1["default"])();
exports.app = app;
app.use(express_1["default"].json());
app.get('/', function (req, res) {
    res.send("Success " + res.statusCode + " " + req.originalUrl);
});
app.get('/error', function (req, res) {
    throw new error_1.ErrorHandler(500, "Server error!");
});
app.use('/tasks', tasks_controller_1.router);
app.use(function (err, req, res, next) { return (0, error_1.handleError)(err, res); });
//# sourceMappingURL=app.js.map