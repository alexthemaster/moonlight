import { Event } from '../lib/structures/Event';
import { MoonlightClient } from '../lib/Client';
import { BasePool } from '../lib/structures/Pools/Base/BasePool';
import { Message } from 'discord.js';
export default class extends Event {
    constructor(client: MoonlightClient, pool: BasePool<string, Event>);
    run(message: Message): Promise<Message | undefined>;
}
//# sourceMappingURL=Message.d.ts.map