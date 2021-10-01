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
exports.createTask = exports.deleteTask = exports.updateTask = exports.getTask = exports.getAllTasks = void 0;
var error_1 = require("../helpers/error");
var repository_1 = require("./repository");
var getAllTasks = function () { return __awaiter(void 0, void 0, void 0, function () {
    var allTasks;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, (0, repository_1.getAllTasksDB)()["catch"](function (err) {
                    throw err;
                })];
            case 1:
                allTasks = _a.sent();
                if (!allTasks)
                    throw new error_1.ErrorHandler(404, "Tasks not found!");
                return [2, allTasks];
        }
    });
}); };
exports.getAllTasks = getAllTasks;
var getTask = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var task;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, (0, repository_1.getTaskById)(id)["catch"](function (err) {
                    throw err;
                })];
            case 1:
                task = _a.sent();
                if (!task)
                    throw new error_1.ErrorHandler(404, "Tasks not found!");
                return [2, task];
        }
    });
}); };
exports.getTask = getTask;
var updateTask = function (id, title, description) { return __awaiter(void 0, void 0, void 0, function () {
    var updTask;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, (0, repository_1.updateTaskById)(id, title, description)["catch"](function (err) {
                    throw err;
                })];
            case 1:
                updTask = _a.sent();
                if (!updTask)
                    throw new error_1.ErrorHandler(404, "Tasks not found!");
                return [2, updTask];
        }
    });
}); };
exports.updateTask = updateTask;
var deleteTask = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var delTask;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, (0, repository_1.deleteTaskById)(id)["catch"](function (err) {
                    throw err;
                })];
            case 1:
                delTask = _a.sent();
                if (!delTask)
                    throw new error_1.ErrorHandler(404, "Tasks not found!");
                return [2, delTask];
        }
    });
}); };
exports.deleteTask = deleteTask;
var createTask = function (title, description) { return __awaiter(void 0, void 0, void 0, function () {
    var newTask;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, (0, repository_1.createNewTask)(title, description)["catch"](function (err) {
                    throw err;
                })];
            case 1:
                newTask = _a.sent();
                if (!newTask)
                    throw new error_1.ErrorHandler(404, "Tasks not found!");
                return [2, newTask];
        }
    });
}); };
exports.createTask = createTask;
//# sourceMappingURL=tasks.service.js.map