import { Command } from '../../lib/structures/Command';
import { MoonlightClient } from '../../lib/Client';
import { BasePool } from '../../lib/structures/Pools/Base/BasePool';
import { Message, MessageEmbed } from 'discord.js';
import { Paginator } from '../../lib/util';

/** @ignore */
export default class extends Command {
    constructor(client: MoonlightClient, pool: BasePool<string, Command>) {
        super(client, pool, {
            cooldown: 5,
            description: 'A list of all the available commands and their descriptions! (can also specify a command name when using the help command to get more information about it!)',
            aliases: ['commands', 'cmds'],
            usage: '[cmd:string]',
            requiredBotPermissions: ['EMBED_LINKS']
        });
    }

    public async run(message: Message, args: HelpCommandArgs) {
        if (args.cmd) {
            const cmd = this.client.commands.get(args.cmd.toLowerCase()) ?? this.client.commands.get((this.client.aliases.get(args.cmd.toLowerCase()) as string)) ?? null;
            if (!cmd) return await this._listAllCommands(message);

            const embed = new MessageEmbed().setTitle(cmd.name).setDescription(`**Description**: ${cmd.description || 'None'}\n**Disabled**: ${cmd.disabled ? 'Yes' : 'No'}\n**Aliases**: ${cmd.aliases.join(', ') || 'None'}\n**NSFW only**: ${cmd.nsfw ? 'Yes' : 'No'}\n**Cooldown**: ${cmd.cooldown}\n${cmd.usage ? `**Usage**: ${cmd.usage} (arguments in <> are required and arguments in [] are optional, the string after the colon refresents what type of argument it should be)\n` : ''}${cmd.usageDelim ? `**Usage delimitator**: ${cmd.usageDelim}\n` : ''}${cmd.requiredPermissions.length ? `**Required user permissions**: ${cmd.requiredPermissions.join(', ')}\n` : ''}${cmd.requiredBotPermissions.length ? `**Required bot permissions**: ${cmd.requiredBotPermissions.join(', ')}` : ''}`);
            return await message.channel.send(embed);
        }

        else return await this._listAllCommands(message);
    }

    private async _listAllCommands(message: Message) {
        const categories: { [x: string]: Command[] } = {};

        // We create an array of commands for every available category there is
        Array.from(this.client.commands).map(([_, cmd]) => {
            if (!categories[cmd.category]) categories[cmd.category] = [];
            categories[cmd.category].push(cmd);
        })

        const paginator = new Paginator(message);

        for (const category in categories) {
            categories[category] = categories[category].sort();
            if (category.toLowerCase() === 'owner' && !this.client.owners.includes(message.author.id)) continue;

            while (categories[category].length) {
                // We get the first 10 commands in this array
                const cmds = categories[category].splice(0, 10);
                paginator.add(embed => embed.setTitle(`${category} commands`).setDescription(`${cmds.map(cmd => `• **${cmd.name}**: ${cmd.description ?? 'N/A'}`).join('\n')}`));
            }
        };

        await paginator.start();
    }
}

interface HelpCommandArgs {
    cmd?: string;
}