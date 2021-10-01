"use strict";
exports.__esModule = true;
var error_1 = require("../../error");
describe('test error.ts', function () {
    describe('class ErrorHandler:', function () {
        it('should success', function () {
            var mockErrorHandler = new error_1.ErrorHandler(404, 'Error');
            expect(mockErrorHandler.statusCode).toBe(404);
            expect(mockErrorHandler.message).toBe('Error');
        });
    });
    describe('function handleError()', function () {
        it('should success', function () {
            var err = {
                statusCode: 500,
                message: 'Error'
            };
            var response = {
                json: jest.fn(),
                status: jest.fn()
            };
            var mJson = {
                status: 'error',
                statusCode: err.statusCode,
                message: err.message
            };
            (0, error_1.handleError)(err, response);
            console.log(err.message);
            expect(response.json).toHaveBeenCalled();
            expect(response.status).toHaveBeenCalled();
            expect(response.json).toHaveBeenCalledWith(mJson);
            expect(response.status).toHaveBeenCalledWith(err.statusCode);
        });
    });
});
//# sourceMappingURL=error.test.js.map