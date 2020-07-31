import { Command } from '../lib/structures/Command';
import { MoonlightClient } from '../lib/Client';
import { BasePool } from '../lib/structures/Pools/Base/BasePool';
import { Message } from 'discord.js';

/** @ignore */
export default class extends Command {
    constructor(client: MoonlightClient, pool: BasePool<string, Command>) {
        super(client, pool, { ownerOnly: true, usage: '<piece:string>' });
        this.customizeResponse('piece', 'Please provide a piece name to enable!');
    }

    public async run(message: Message, args: EnableCommandArgs) {
        if (!this.client.pools.has(args.piece)) return message.channel.send(`No such piece named \`${args.piece}\``);

        const piece = this.client.pools.get(args.piece);
        piece!.enable();

        return message.channel.send(`Successfully enabled the \`${args.piece}\` piece!`);
    }
}

interface EnableCommandArgs {
    piece: string;
}