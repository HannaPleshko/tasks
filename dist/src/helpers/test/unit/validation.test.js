"use strict";
exports.__esModule = true;
var validation_1 = require("../../validation");
var error_1 = require("../../error");
describe('function validData()', function () {
    var mRequest = { body: {} };
    var mNextFunction = jest.fn();
    it('should success', function () {
        var _a = ['title', 'description'], title = _a[0], description = _a[1];
        mRequest.body.title = title;
        mRequest.body.description = description;
        (0, validation_1.validData)(mRequest, mNextFunction);
        expect(mNextFunction).toHaveBeenCalled();
    });
    it('should failure', function () {
        var _a = [' ', ' '], title = _a[0], description = _a[1];
        mRequest.body.title = title;
        mRequest.body.description = description;
        var exception;
        try {
            (0, validation_1.validData)(mRequest, mNextFunction);
        }
        catch (err) {
            exception = err;
        }
        expect(exception instanceof error_1.ErrorHandler).toBeTruthy();
        expect(exception.statusCode).toBe(500);
        expect(exception.message).toBe("Title or Description are missing");
    });
});
//# sourceMappingURL=validation.test.js.map