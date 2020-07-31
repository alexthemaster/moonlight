"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonitorPool = void 0;
const BasePool_1 = require("./Base/BasePool");
const Monitor_1 = require("../Monitor");
class MonitorPool extends BasePool_1.BasePool {
    constructor(client) {
        super(client, 'monitors', Monitor_1.Monitor);
    }
}
exports.MonitorPool = MonitorPool;
//# sourceMappingURL=MonitorPool.js.map