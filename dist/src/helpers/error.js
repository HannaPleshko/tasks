"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.handleError = exports.ErrorHandler = void 0;
var ErrorHandler = (function (_super) {
    __extends(ErrorHandler, _super);
    function ErrorHandler(statusCode, message) {
        var _this = _super.call(this, message) || this;
        Object.setPrototypeOf(_this, ErrorHandler.prototype);
        _this.statusCode = statusCode;
        return _this;
    }
    return ErrorHandler;
}(Error));
exports.ErrorHandler = ErrorHandler;
var handleError = function (err, res) {
    var statusCode = err.statusCode, message = err.message;
    res.status(statusCode);
    res.json({
        status: 'error',
        statusCode: statusCode,
        message: message
    });
};
exports.handleError = handleError;
//# sourceMappingURL=error.js.map