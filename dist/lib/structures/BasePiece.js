"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasePiece = void 0;
/**
 * @class
 * @abstract
 */
class BasePiece {
    constructor(client, pool, options) {
        var _a;
        this.client = client;
        this.options = options;
        this.description = options === null || options === void 0 ? void 0 : options.description;
        this.disabled = (_a = options === null || options === void 0 ? void 0 : options.disabled) !== null && _a !== void 0 ? _a : false;
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
        if (this.disabled)
            this.disabled = false;
    }
    disable() {
        if (!this.disabled)
            this.disabled = true;
    }
}
exports.BasePiece = BasePiece;
//# sourceMappingURL=BasePiece.js.map