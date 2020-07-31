"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.int = exports.number = void 0;
function number(input) {
    if (isNaN(input))
        throw 'The provided argument should be a number!';
    else
        return Number(input);
}
exports.number = number;
exports.int = number;
//# sourceMappingURL=Number.js.map