"use strict";
exports.__esModule = true;
var response_1 = require("../../response");
describe('function buildResponse()', function () {
    it('should success', function () {
        var mResponse = {
            status: jest.fn(),
            json: jest.fn()
        };
        var message = [{ id: 1, title: '1', description: '1' }];
        (0, response_1.buildResponse)(mResponse, 200, message);
        expect(mResponse.json).toHaveBeenCalled();
        expect(mResponse.status).toHaveBeenCalled();
        expect(mResponse.status).toHaveBeenCalledWith(200);
        expect(mResponse.json).toHaveBeenCalledWith(message);
    });
});
//# sourceMappingURL=response.test.js.map