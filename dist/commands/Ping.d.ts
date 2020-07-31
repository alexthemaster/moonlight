import { Command } from '../lib/structures/Command';
import { MoonlightClient } from '../lib/Client';
import { BasePool } from '../lib/structures/Pools/Base/BasePool';
import { Message } from 'discord.js';
/** @ignore */
export default class extends Command {
    constructor(client: MoonlightClient, pool: BasePool<string, Command>);
    run(message: Message): Promise<Message>;
}
//# sourceMappingURL=Ping.d.ts.map