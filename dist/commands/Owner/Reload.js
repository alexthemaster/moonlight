"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../../lib/structures/Command");
const util_1 = require("../../lib/util");
/** @ignore */
class default_1 extends Command_1.Command {
    constructor(client, pool) {
        super(client, pool, { ownerOnly: true, usage: '[everything] [piece:string]' });
    }
    async run(message, args) {
        if (!args.everything && !args.piece)
            return message.channel.send('Please provide the name of a piece you want to reload or provide "everything" as an argument to reload everything.');
        if (args.everything) {
            const stopwatch = new util_1.Stopwatch();
            await Promise.all(Array.from(this.client.pools).map(async ([_, poolPiece]) => await poolPiece.reload()));
            stopwatch.stop();
            return message.channel.send(`Done! Reloaded everything in: ${stopwatch.getElapsedHuman}`);
        }
        if (!args.piece)
            return message.channel.send('Please provide a piece name to reload!');
        if (!this.client.pools.has(args.piece))
            return message.channel.send(`No such piece named \`${args.piece}\``);
        const pieces = Array.from(this.client.pools).filter(([name]) => name === args.piece).map(([_, piece]) => piece);
        const stopwatch = new util_1.Stopwatch();
        await Promise.all(pieces.map(async (piece) => await piece.reload()));
        stopwatch.stop();
        if (pieces.length === 1)
            return message.channel.send(`Done! Reloaded ${args.piece} in: ${stopwatch.getElapsedHuman}`);
        else
            return message.channel.send(`Done! Reloaded every piece with the name of ${args.piece} in: ${stopwatch.getElapsedHuman}`);
    }
}
exports.default = default_1;
//# sourceMappingURL=Reload.js.map