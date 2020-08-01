import { Command } from '../../lib/structures/Command';
import { MoonlightClient } from '../../lib/Client';
import { BasePool } from '../../lib/structures/Pools/Base/BasePool';
import { Message } from 'discord.js';

/** @ignore */
export default class extends Command {
    constructor(client: MoonlightClient, pool: BasePool<string, Command>) {
        super(client, pool, { cooldown: 5 });
    }

    public async run(message: Message) {
        const msg = await message.channel.send('Ping?');
        return await msg.edit(`Pong! [Roundtrip: ${msg.createdTimestamp - message.createdTimestamp}ms | Heartbeat: ${this.client.ws.ping}ms]`)
    }
}