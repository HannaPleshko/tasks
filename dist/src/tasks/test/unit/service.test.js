"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var tasks_service_1 = require("../../tasks.service");
var repository = __importStar(require("../../repository"));
describe('function getAllTasks()', function () {
    afterEach(function () {
        jest.clearAllMocks();
    });
    var getAllTasksMock = jest.spyOn(repository, 'getAllTasksDB');
    it('should return all tasks', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockTasks, expetedTasks;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockTasks = [
                        { id: 1, title: '1', description: '1' },
                        { id: 2, title: '2', description: '2' },
                    ];
                    getAllTasksMock.mockImplementation(function () { return Promise.resolve(mockTasks); });
                    return [4, (0, tasks_service_1.getAllTasks)()];
                case 1:
                    expetedTasks = _a.sent();
                    expect(getAllTasksMock).toHaveBeenCalled();
                    expect(expetedTasks).toEqual(mockTasks);
                    return [2];
            }
        });
    }); });
    it('should return an error message after an error occur', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockError;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockError = null;
                    getAllTasksMock.mockImplementation(function () { return Promise.reject(mockError); });
                    return [4, (0, tasks_service_1.getAllTasks)()["catch"](function (err) { return expect(err).toBe(mockError); })];
                case 1:
                    _a.sent();
                    return [2];
            }
        });
    }); });
});
describe('function getTask()', function () {
    afterEach(function () {
        jest.clearAllMocks();
    });
    var getTaskMock = jest.spyOn(repository, 'getTaskById');
    it('should return a task', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockTasks, expetedTask;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockTasks = { id: 1, title: '1', description: '1' };
                    getTaskMock.mockImplementation(function () { return Promise.resolve(mockTasks); });
                    return [4, (0, tasks_service_1.getTask)(1)];
                case 1:
                    expetedTask = _a.sent();
                    expect(getTaskMock).toHaveBeenCalled();
                    expect(expetedTask).toEqual(mockTasks);
                    return [2];
            }
        });
    }); });
    it('should return an error message after an error occur', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockError;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockError = null;
                    getTaskMock.mockImplementation(function () { return Promise.reject(mockError); });
                    return [4, (0, tasks_service_1.getAllTasks)()["catch"](function (err) { return expect(err).toBe(mockError); })];
                case 1:
                    _a.sent();
                    return [2];
            }
        });
    }); });
});
describe('function createTask()', function () {
    afterEach(function () {
        jest.clearAllMocks();
    });
    var createNewTaskMock = jest.spyOn(repository, 'createNewTask');
    it('should return a new task', function () { return __awaiter(void 0, void 0, void 0, function () {
        var newTask, expetedNewTask;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    newTask = { id: 1, title: '1', description: '1' };
                    createNewTaskMock.mockImplementation(function () { return Promise.resolve(newTask); });
                    return [4, (0, tasks_service_1.createTask)('1', '1')];
                case 1:
                    expetedNewTask = _a.sent();
                    expect(createNewTaskMock).toHaveBeenCalled();
                    expect(expetedNewTask).toEqual(newTask);
                    return [2];
            }
        });
    }); });
    it('should return an error message after an error occur', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockError;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockError = null;
                    createNewTaskMock.mockImplementation(function () { return Promise.reject(mockError); });
                    return [4, (0, tasks_service_1.getAllTasks)()["catch"](function (err) { return expect(err).toBe(mockError); })];
                case 1:
                    _a.sent();
                    return [2];
            }
        });
    }); });
});
describe('function updateTask()', function () {
    afterEach(function () {
        jest.clearAllMocks();
    });
    var updateTaskMock = jest.spyOn(repository, 'updateTaskById');
    it('should return an update task', function () { return __awaiter(void 0, void 0, void 0, function () {
        var updTask, expetedNewTask;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    updTask = { id: 1, title: '1', description: '1' };
                    updateTaskMock.mockImplementation(function () { return Promise.resolve(updTask); });
                    return [4, (0, tasks_service_1.updateTask)(1, '1', '1')];
                case 1:
                    expetedNewTask = _a.sent();
                    expect(updateTaskMock).toHaveBeenCalled();
                    expect(expetedNewTask).toEqual(updTask);
                    return [2];
            }
        });
    }); });
    it('should return an error message after an error occur', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockError;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockError = null;
                    updateTaskMock.mockImplementation(function () { return Promise.reject(mockError); });
                    return [4, (0, tasks_service_1.getAllTasks)()["catch"](function (err) { return expect(err).toBe(mockError); })];
                case 1:
                    _a.sent();
                    return [2];
            }
        });
    }); });
});
describe('function deleteTask()', function () {
    afterEach(function () {
        jest.clearAllMocks();
    });
    var deleteTaskMock = jest.spyOn(repository, 'deleteTaskById');
    it('should return a delete Task', function () { return __awaiter(void 0, void 0, void 0, function () {
        var delTask, expetedDelTask;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    delTask = { id: 1, title: '1', description: '1' };
                    deleteTaskMock.mockImplementation(function () { return Promise.resolve(delTask); });
                    return [4, (0, tasks_service_1.deleteTask)(1)];
                case 1:
                    expetedDelTask = _a.sent();
                    expect(deleteTaskMock).toHaveBeenCalled();
                    expect(expetedDelTask).toEqual(delTask);
                    return [2];
            }
        });
    }); });
    it('should return an error message after an error occur', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockError;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockError = null;
                    deleteTaskMock.mockImplementation(function () { return Promise.reject(mockError); });
                    return [4, (0, tasks_service_1.getAllTasks)()["catch"](function (err) { return expect(err).toBe(mockError); })];
                case 1:
                    _a.sent();
                    return [2];
            }
        });
    }); });
});
//# sourceMappingURL=service.test.js.map