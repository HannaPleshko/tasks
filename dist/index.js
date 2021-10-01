"use strict";
exports.__esModule = true;
var dotenv_1 = require("dotenv");
var app_1 = require("./src/app");
(0, dotenv_1.config)();
var port = process.env.PORT;
app_1.app.listen(port, function () { return console.log("Server is running on port " + port + "..."); });
//# sourceMappingURL=index.js.map