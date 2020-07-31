"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const BasePiece_1 = require("./BasePiece");
/**
 * [[include:creatingEvents.md]]
 * @abstract
 */
class Event extends BasePiece_1.BasePiece {
    constructor(client, pool, options) {
        var _a, _b;
        super(client, pool, options);
        if (!options.event)
            throw new Error(`No event name provided in one of the event files.`);
        this.event = options.event;
        this.disabled = (_a = options.disabled) !== null && _a !== void 0 ? _a : false;
        this.once = (_b = options.once) !== null && _b !== void 0 ? _b : false;
    }
    enable() {
        if (!this.disabled)
            this.disabled = false;
    }
    disable() {
        if (!!this.disabled)
            this.disabled = true;
    }
}
exports.Event = Event;
//# sourceMappingURL=Event.js.map