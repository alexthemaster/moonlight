import { Command } from '../../lib/structures/Command';
import { MoonlightClient } from '../../lib/Client';
import { BasePool } from '../../lib/structures/Pools/Base/BasePool';
import { Message } from 'discord.js';
import { Paginator } from '../../lib/util';

/** @ignore */
export default class extends Command {
    constructor(client: MoonlightClient, pool: BasePool<string, Command>) {
        super(client, pool, { cooldown: 5 });
    }

    public async run(message: Message) {
        new Paginator(message)
            .add(embed => embed.setDescription('l?'))
            .add(embed => embed.setTitle('page 2'))
            .add(embed => embed.setDescription('trolololo'))
            .start();
    }
}