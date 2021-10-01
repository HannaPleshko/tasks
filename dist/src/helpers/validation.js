"use strict";
exports.__esModule = true;
exports.validData = void 0;
var error_1 = require("./error");
var validData = function (req, next) {
    var _a = req.body, title = _a.title, description = _a.description;
    console.log(title);
    console.log(description);
    if (title.trim() && description.trim())
        next();
    else
        throw new error_1.ErrorHandler(500, "Title or Description are missing");
};
exports.validData = validData;
//# sourceMappingURL=validation.js.map