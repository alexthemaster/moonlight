"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Monitor = void 0;
const BasePiece_1 = require("./BasePiece");
/**
 * @abstract
 */
class Monitor extends BasePiece_1.BasePiece {
    constructor(client, pool, options) {
        var _a, _b, _c;
        super(client, pool, options);
        this.ignoreSelf = (_a = options.ignoreSelf) !== null && _a !== void 0 ? _a : false;
        this.ignoreBots = (_b = options.ignoreBots) !== null && _b !== void 0 ? _b : false;
        this.ignoreOthers = (_c = options.ignoreOthers) !== null && _c !== void 0 ? _c : false;
    }
    run(message) {
        throw new Error(`Run function not defined in ${__filename}`);
    }
}
exports.Monitor = Monitor;
//# sourceMappingURL=Monitor.js.map