"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../lib/structures/Command");
/** @ignore */
class default_1 extends Command_1.Command {
    constructor(client, pool) {
        super(client, pool, { ownerOnly: true, usage: '<piece:string>' });
        this.customizeResponse('piece', 'Please provide a piece name to enable!');
    }
    async run(message, args) {
        if (!this.client.pools.has(args.piece))
            return message.channel.send(`No such piece named \`${args.piece}\``);
        const piece = this.client.pools.get(args.piece);
        if (piece === null || piece === void 0 ? void 0 : piece.disabled)
            return message.channel.send(`This piece is already disabled!`);
        piece.disable();
        return message.channel.send(`Successfully disabled the \`${args.piece}\` piece!`);
    }
}
exports.default = default_1;
//# sourceMappingURL=Disable.js.map