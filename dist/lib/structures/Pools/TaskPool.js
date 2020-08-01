"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskPool = void 0;
const BasePool_1 = require("./Base/BasePool");
const Task_1 = require("../Task");
class TaskPool extends BasePool_1.BasePool {
    constructor(client) {
        super(client, 'tasks', Task_1.Task);
    }
}
exports.TaskPool = TaskPool;
//# sourceMappingURL=TaskPool.js.map