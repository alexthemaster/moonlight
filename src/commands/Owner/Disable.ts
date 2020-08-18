import { Command } from '../../lib/structures/Command';
import { MoonlightClient } from '../../lib/Client';
import { BasePool } from '../../lib/structures/Pools/Base/BasePool';
import { Message } from 'discord.js';

/** @ignore */
export default class extends Command {
    constructor(client: MoonlightClient, pool: BasePool<string, Command>) {
        super(client, pool, {
            ownerOnly: true,
            description: 'Disable a piece',
            usage: '<piece:string>'
        });

        this.customizeResponse('piece', 'Please provide a piece name to enable!');
    }

    public async run(message: Message, args: DisableCommandArgs) {
        if (!this.client.pools.has(args.piece)) return message.channel.send(`No such piece named \`${args.piece}\``);

        const piece = this.client.pools.get(args.piece);
        if (piece!.disabled) return message.channel.send(`This piece is already disabled!`);
        piece!.disable();

        return message.channel.send(`Successfully disabled the \`${args.piece}\` piece!`);
    }
}

interface DisableCommandArgs {
    piece: string;
}