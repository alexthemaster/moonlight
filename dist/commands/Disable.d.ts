import { Command } from '../lib/structures/Command';
import { MoonlightClient } from '../lib/Client';
import { BasePool } from '../lib/structures/Pools/Base/BasePool';
import { Message } from 'discord.js';
/** @ignore */
export default class extends Command {
    constructor(client: MoonlightClient, pool: BasePool<string, Command>);
    run(message: Message, args: DisableCommandArgs): Promise<Message>;
}
interface DisableCommandArgs {
    piece: string;
}
export {};
//# sourceMappingURL=Disable.d.ts.map