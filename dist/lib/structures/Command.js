"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
const BasePiece_1 = require("./BasePiece");
/**
 * [[include:creatingCommands.md]]
 * @abstract
 */
class Command extends BasePiece_1.BasePiece {
    constructor(client, pool, options) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        super(client, pool, options);
        /** The map containing the customized responses */
        this.customizedResponses = new Map();
        /** The flags provided by the user when running the command */
        this.flags = new Map();
        this.aliases = (_a = options === null || options === void 0 ? void 0 : options.aliases) !== null && _a !== void 0 ? _a : new Array();
        this.nsfw = (_b = options === null || options === void 0 ? void 0 : options.nsfw) !== null && _b !== void 0 ? _b : false;
        this.canRunInDM = (_c = options === null || options === void 0 ? void 0 : options.canRunInDM) !== null && _c !== void 0 ? _c : true;
        this.cooldown = (_d = options === null || options === void 0 ? void 0 : options.cooldown) !== null && _d !== void 0 ? _d : 0;
        this.ownerOnly = (_e = options === null || options === void 0 ? void 0 : options.ownerOnly) !== null && _e !== void 0 ? _e : false;
        this.usage = (_f = options === null || options === void 0 ? void 0 : options.usage) !== null && _f !== void 0 ? _f : '';
        this.usageDelim = (_g = options === null || options === void 0 ? void 0 : options.usageDelim) !== null && _g !== void 0 ? _g : undefined;
        this.requiredPermissions = (_h = options === null || options === void 0 ? void 0 : options.requiredPermissions) !== null && _h !== void 0 ? _h : new Array();
        this.requiredBotPermissions = (_j = options === null || options === void 0 ? void 0 : options.requiredBotPermissions) !== null && _j !== void 0 ? _j : new Array();
    }
    run(_message, ..._arg) {
        throw new Error(`Run function not defined in ${__filename}`);
    }
    /** Customize the message thrown when an argument fails to parse */
    customizeResponse(argument, response) {
        this.customizedResponses.set(argument, response);
    }
}
exports.Command = Command;
//# sourceMappingURL=Command.js.map