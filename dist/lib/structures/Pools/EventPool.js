"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventPool = void 0;
const BasePool_1 = require("./Base/BasePool");
const Event_1 = require("../Event");
class EventPool extends BasePool_1.BasePool {
    constructor(client) {
        super(client, 'events', Event_1.Event);
    }
}
exports.EventPool = EventPool;
//# sourceMappingURL=EventPool.js.map