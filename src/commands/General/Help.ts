import { Command } from '../../lib/structures/Command';
import { MoonlightClient } from '../../lib/Client';
import { BasePool } from '../../lib/structures/Pools/Base/BasePool';
import { Message } from 'discord.js';

/** @ignore */
export default class extends Command {
    constructor(client: MoonlightClient, pool: BasePool<string, Command>) {
        super(client, pool, {
            cooldown: 5,
            description: 'A list of all the available commands and their descriptions! (can also specify a command name when using the help command to get more information about it!)',
            aliases: ['commands', 'cmds'],
            requiredBotPermissions: ['EMBED_LINKS']
        });
    }

    public async run(message: Message) {

    }
}