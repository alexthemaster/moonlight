"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasePiece = void 0;
class BasePiece {
    constructor(client, pool, options) {
        var _a, _b;
        this.client = client;
        this.options = options;
        this.name = (_a = options === null || options === void 0 ? void 0 : options.name) !== null && _a !== void 0 ? _a : undefined;
        this.description = options === null || options === void 0 ? void 0 : options.description;
        this.disabled = (_b = options === null || options === void 0 ? void 0 : options.disabled) !== null && _b !== void 0 ? _b : false;
        this.pool = pool;
    }
    run(...arg) {
        throw new Error(`Run function not defined in ${__filename}`);
    }
    /** A function that runs at the bot startup once */
    init() {
    }
    /** A function that reloads the file */
    reload() { }
    enable() {
        this.disabled = false;
    }
    disable() {
        this.disabled = true;
    }
}
exports.BasePiece = BasePiece;
//# sourceMappingURL=BasePiece.js.map