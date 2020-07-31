import { Command } from '../lib/structures/Command';
import { MoonlightClient } from '../lib/Client';
import { Stopwatch } from '../lib/util';
import { BasePool } from '../lib/structures/Pools/Base/BasePool';
import { Message } from 'discord.js';

/** @ignore */
export default class extends Command {
    constructor(client: MoonlightClient, pool: BasePool<string, Command>) {
        super(client, pool, { ownerOnly: true, usage: '[everything] [piece:string]' });
    }

    public async run(message: Message, args: ReloadCommandArgs) {
        if (!args.everything && !args.piece) return message.channel.send('Please provide the name of a piece you want to reload or provide "everything" as an argument to reload everything.');

        if (args.everything) {
            const stopwatch = new Stopwatch();
            await Promise.all(Array.from(this.client.pools).map(async ([_, poolPiece]) => await poolPiece.reload()));
            stopwatch.stop();

            return message.channel.send(`Done! Reloaded everything in: ${stopwatch.getElapsedHuman}`);
        }

        if (!args.piece) return message.channel.send('Please provide a piece name to reload!');

        if (!this.client.pools.has(args.piece)) return message.channel.send(`No such piece named \`${args.piece}\``);

        const pieces = Array.from(this.client.pools).filter(([name]) => name === args.piece).map(([_, piece]) => piece);

        const stopwatch = new Stopwatch();
        await Promise.all(pieces.map(async piece => await piece.reload()));
        stopwatch.stop();

        if (pieces.length === 1) return message.channel.send(`Done! Reloaded ${args.piece} in: ${stopwatch.getElapsedHuman}`);
        else return message.channel.send(`Done! Reloaded every piece with the name of ${args.piece} in: ${stopwatch.getElapsedHuman}`);
    }
}

interface ReloadCommandArgs {
    everything?: string;
    piece?: string;
}