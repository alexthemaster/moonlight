import { Command } from '../lib/structures/Command';
import { MoonlightClient } from '../lib/Client';
import { MoonlightBaseManager as BaseManager } from '../lib/structures/Managers/Base/BaseManager';
import { Message } from 'discord.js';

export default class extends Command {
    constructor(client: MoonlightClient, manager: BaseManager<string, Command>) {
        super(client, manager);
    }

    public async run(message: Message) {
        const msg = await message.channel.send('Ping?');
        return await msg.edit(`Pong! [Roundtrip: ${msg.createdTimestamp - message.createdTimestamp}ms | Heartbeat: ${this.client.ws.ping}ms]`)
    }
}