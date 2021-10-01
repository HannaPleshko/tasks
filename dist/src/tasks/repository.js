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
exports.deleteTaskById = exports.updateTaskById = exports.getTaskById = exports.getAllTasksDB = exports.createNewTask = void 0;
var database_1 = require("../database");
var createNewTask = function (title, description) { return __awaiter(void 0, void 0, void 0, function () {
    var client, sql, arrOfVal, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, database_1.pool.connect()];
            case 1:
                client = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 6, 8, 9]);
                return [4, client.query('BEGIN')];
            case 3:
                _a.sent();
                sql = 'INSERT INTO tasks (title, description) VALUES($1, $2) RETURNING tasks.*';
                return [4, client.query(sql, [title, description])];
            case 4:
                arrOfVal = (_a.sent()).rows;
                console.log(arrOfVal);
                return [4, client.query('COMMIT')];
            case 5:
                _a.sent();
                if (arrOfVal.length > 0)
                    return [2, arrOfVal];
                return [2, null];
            case 6:
                err_1 = _a.sent();
                console.log("Exception in createNewTask: " + err_1);
                return [4, client.query('ROLLBACK')];
            case 7:
                _a.sent();
                return [2, null];
            case 8:
                client.release();
                return [7];
            case 9: return [2];
        }
    });
}); };
exports.createNewTask = createNewTask;
var getAllTasksDB = function () { return __awaiter(void 0, void 0, void 0, function () {
    var arrOfVal, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4, database_1.pool.query("SELECT * FROM tasks")];
            case 1:
                arrOfVal = (_a.sent()).rows;
                if (arrOfVal.length > 0)
                    return [2, arrOfVal];
                return [2, null];
            case 2:
                err_2 = _a.sent();
                console.log("Exception in getTaskById: " + err_2);
                return [2, null];
            case 3: return [2];
        }
    });
}); };
exports.getAllTasksDB = getAllTasksDB;
var getTaskById = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, arrOfVal, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                sql = 'SELECT * FROM tasks WHERE id = $1';
                return [4, database_1.pool.query(sql, [id])];
            case 1:
                arrOfVal = (_a.sent()).rows;
                if (arrOfVal.length > 0)
                    return [2, arrOfVal];
                return [2, null];
            case 2:
                err_3 = _a.sent();
                console.log("Exception in getTaskById: " + err_3);
                return [2, null];
            case 3: return [2];
        }
    });
}); };
exports.getTaskById = getTaskById;
var updateTaskById = function (id, title, description) { return __awaiter(void 0, void 0, void 0, function () {
    var client, sql, arrOfVal, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, database_1.pool.connect()];
            case 1:
                client = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 6, 8, 9]);
                return [4, client.query('BEGIN')];
            case 3:
                _a.sent();
                sql = 'UPDATE tasks SET title = $1, description = $2 WHERE id = $3 RETURNING tasks.*';
                return [4, client.query(sql, [title, description, id])];
            case 4:
                arrOfVal = (_a.sent()).rows;
                return [4, client.query('COMMIT')];
            case 5:
                _a.sent();
                if (arrOfVal.length > 0)
                    return [2, arrOfVal];
                return [2, null];
            case 6:
                err_4 = _a.sent();
                console.log("Exception in updateTaskById: " + err_4);
                return [4, client.query('ROLLBACK')];
            case 7:
                _a.sent();
                return [2, null];
            case 8:
                client.release();
                return [7];
            case 9: return [2];
        }
    });
}); };
exports.updateTaskById = updateTaskById;
var deleteTaskById = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var client, sql, arrOfVal, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, database_1.pool.connect()];
            case 1:
                client = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 6, 8, 9]);
                return [4, client.query('BEGIN')];
            case 3:
                _a.sent();
                sql = 'DELETE FROM tasks WHERE id = $1 RETURNING tasks.*';
                return [4, client.query(sql, [id])];
            case 4:
                arrOfVal = (_a.sent()).rows;
                return [4, client.query('COMMIT')];
            case 5:
                _a.sent();
                if (arrOfVal.length > 0)
                    return [2, arrOfVal];
                return [2, null];
            case 6:
                err_5 = _a.sent();
                console.log("Exception in updateTaskById: " + err_5);
                return [4, client.query('ROLLBACK')];
            case 7:
                _a.sent();
                return [2, null];
            case 8:
                client.release();
                return [7];
            case 9: return [2];
        }
    });
}); };
exports.deleteTaskById = deleteTaskById;
//# sourceMappingURL=repository.js.map