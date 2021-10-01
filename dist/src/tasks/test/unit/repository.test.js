"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var pg_1 = require("pg");
var repository_1 = require("../../repository");
var mockClient = {
    release: jest.fn(),
    query: jest.fn()
};
jest.mock('pg', function () {
    var mPool = {
        connect: jest.fn(function () { return mockClient; }),
        query: jest.fn()
    };
    return { Pool: jest.fn(function () { return mPool; }) };
});
describe('TestsForRepository', function () {
    var pool;
    beforeEach(function () {
        pool = new pg_1.Pool();
    });
    afterEach(function () {
        jest.clearAllMocks();
    });
    describe('function getAllTasksDB()', function () {
        it('should success', function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockTasks, expected;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockTasks = [
                            { id: 1, title: '1', description: '1' },
                            { id: 2, title: '2', description: '2' },
                        ];
                        pool.query.mockResolvedValue({ rows: mockTasks });
                        return [4, (0, repository_1.getAllTasksDB)()];
                    case 1:
                        expected = _a.sent();
                        expect(pool.query).toBeCalledWith("SELECT * FROM tasks");
                        expect(expected).toEqual(mockTasks);
                        return [2];
                }
            });
        }); });
        it('should failure', function () { return __awaiter(void 0, void 0, void 0, function () {
            var expected;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pool.query.mockResolvedValue(new Error('Error'));
                        return [4, (0, repository_1.getAllTasksDB)()["catch"]()];
                    case 1:
                        expected = _a.sent();
                        expect(expected).toBe(null);
                        return [2];
                }
            });
        }); });
    });
    describe('function getTaskById()', function () {
        it('should success', function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockTasks, expected;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockTasks = [{ id: 1, title: '1', description: '1' }];
                        pool.query.mockResolvedValue({ rows: mockTasks });
                        return [4, (0, repository_1.getTaskById)(1)];
                    case 1:
                        expected = _a.sent();
                        expect(pool.query).toBeCalledWith("SELECT * FROM tasks WHERE id = $1", [1]);
                        expect(expected).toEqual(mockTasks);
                        return [2];
                }
            });
        }); });
        it('should failure', function () { return __awaiter(void 0, void 0, void 0, function () {
            var expected;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pool.query.mockResolvedValue(new Error('Error'));
                        return [4, (0, repository_1.getTaskById)(1)["catch"]()];
                    case 1:
                        expected = _a.sent();
                        expect(expected).toBe(null);
                        return [2];
                }
            });
        }); });
    });
    describe('function createNewTask()', function () {
        it('should success', function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockTasks, expected;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockTasks = [{ id: 1, title: '1', description: '1' }];
                        mockClient.query.mockResolvedValue({ rows: mockTasks });
                        return [4, (0, repository_1.createNewTask)('1', '1')];
                    case 1:
                        expected = _a.sent();
                        expect(mockClient.query).toBeCalledWith("BEGIN");
                        expect(mockClient.query).toBeCalledWith("INSERT INTO tasks (title, description) VALUES($1, $2) RETURNING tasks.*", ['1', '1']);
                        expect(mockClient.query).toBeCalledWith("COMMIT");
                        expect(mockClient.release).toHaveBeenCalled();
                        expect(expected).toEqual(mockTasks);
                        return [2];
                }
            });
        }); });
        it('should failure', function () { return __awaiter(void 0, void 0, void 0, function () {
            var expected;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockClient.query.mockRejectedValueOnce(new Error('Error'));
                        return [4, (0, repository_1.createNewTask)('1', '1')["catch"]()];
                    case 1:
                        expected = _a.sent();
                        expect(mockClient.query).toBeCalledWith("BEGIN");
                        expect(mockClient.query).toBeCalledWith("ROLLBACK");
                        expect(mockClient.release).toHaveBeenCalled();
                        expect(expected).toBe(null);
                        return [2];
                }
            });
        }); });
    });
    describe('function updateTaskById()', function () {
        it('should success', function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockTasks, expected;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockTasks = [{ id: 1, title: '1', description: '1' }];
                        mockClient.query.mockResolvedValue({ rows: mockTasks });
                        return [4, (0, repository_1.updateTaskById)(1, '1', '1')];
                    case 1:
                        expected = _a.sent();
                        expect(mockClient.query).toBeCalledWith("BEGIN");
                        expect(mockClient.query).toBeCalledWith("UPDATE tasks SET title = $1, description = $2 WHERE id = $3 RETURNING tasks.*", [
                            '1',
                            '1',
                            1,
                        ]);
                        expect(mockClient.query).toBeCalledWith("COMMIT");
                        expect(mockClient.release).toHaveBeenCalled();
                        expect(expected).toEqual(mockTasks);
                        return [2];
                }
            });
        }); });
        it('should failure', function () { return __awaiter(void 0, void 0, void 0, function () {
            var expected;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockClient.query.mockRejectedValueOnce(new Error('Error'));
                        return [4, (0, repository_1.createNewTask)('1', '1')["catch"]()];
                    case 1:
                        expected = _a.sent();
                        expect(mockClient.query).toBeCalledWith("BEGIN");
                        expect(mockClient.query).toBeCalledWith("ROLLBACK");
                        expect(mockClient.release).toHaveBeenCalled();
                        expect(expected).toBe(null);
                        return [2];
                }
            });
        }); });
    });
    describe('function deleteTaskById()', function () {
        it('should success', function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockTasks, expected;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockTasks = [{ id: 1, title: '1', description: '1' }];
                        mockClient.query.mockResolvedValue({ rows: mockTasks });
                        return [4, (0, repository_1.deleteTaskById)(1)];
                    case 1:
                        expected = _a.sent();
                        expect(mockClient.query).toBeCalledWith("BEGIN");
                        expect(mockClient.query).toBeCalledWith("DELETE FROM tasks WHERE id = $1 RETURNING tasks.*", [1]);
                        expect(mockClient.query).toBeCalledWith("COMMIT");
                        expect(mockClient.release).toHaveBeenCalled();
                        expect(expected).toEqual(mockTasks);
                        return [2];
                }
            });
        }); });
        it('should failure', function () { return __awaiter(void 0, void 0, void 0, function () {
            var expected;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockClient.query.mockRejectedValueOnce(new Error('Error'));
                        return [4, (0, repository_1.createNewTask)('1', '1')["catch"]()];
                    case 1:
                        expected = _a.sent();
                        expect(mockClient.query).toBeCalledWith("BEGIN");
                        expect(mockClient.query).toBeCalledWith("ROLLBACK");
                        expect(mockClient.release).toHaveBeenCalled();
                        expect(expected).toBe(null);
                        return [2];
                }
            });
        }); });
    });
});
//# sourceMappingURL=repository.test.js.map