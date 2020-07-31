"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandPool = void 0;
const BasePool_1 = require("./Base/BasePool");
const Command_1 = require("../Command");
class CommandPool extends BasePool_1.BasePool {
    constructor(client) {
        super(client, 'commands', Command_1.Command);
    }
}
exports.CommandPool = CommandPool;
//# sourceMappingURL=CommandPool.js.map