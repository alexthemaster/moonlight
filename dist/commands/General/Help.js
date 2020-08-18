"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../../lib/structures/Command");
const discord_js_1 = require("discord.js");
const util_1 = require("../../lib/util");
/** @ignore */
class default_1 extends Command_1.Command {
    constructor(client, pool) {
        super(client, pool, {
            cooldown: 5,
            description: 'A list of all the available commands and their descriptions! (can also specify a command name when using the help command to get more information about it!)',
            aliases: ['commands', 'cmds'],
            usage: '[cmd:string]',
            requiredBotPermissions: ['EMBED_LINKS']
        });
    }
    async run(message, args) {
        var _a, _b;
        if (args.cmd) {
            const cmd = (_b = (_a = this.client.commands.get(args.cmd.toLowerCase())) !== null && _a !== void 0 ? _a : this.client.commands.get(this.client.aliases.get(args.cmd.toLowerCase()))) !== null && _b !== void 0 ? _b : null;
            if (!cmd)
                return await this._listAllCommands(message);
            const embed = new discord_js_1.MessageEmbed().setTitle(cmd.name).setDescription(`**Description**: ${cmd.description || 'None'}\n**Disabled**: ${cmd.disabled ? 'Yes' : 'No'}\n**Aliases**: ${cmd.aliases.join(', ') || 'None'}\n**NSFW only**: ${cmd.nsfw ? 'Yes' : 'No'}\n**Cooldown**: ${cmd.cooldown}\n${cmd.usage ? `**Usage**: ${cmd.usage} (arguments in <> are required and arguments in [] are optional, the string after the colon refresents what type of argument it should be)\n` : ''}${cmd.usageDelim ? `**Usage delimitator**: ${cmd.usageDelim}\n` : ''}${cmd.requiredPermissions.length ? `**Required user permissions**: ${cmd.requiredPermissions.join(', ')}\n` : ''}${cmd.requiredBotPermissions.length ? `**Required bot permissions**: ${cmd.requiredBotPermissions.join(', ')}` : ''}`);
            return await message.channel.send(embed);
        }
        else
            return await this._listAllCommands(message);
    }
    async _listAllCommands(message) {
        const categories = {};
        // We create an array of commands for every available category there is
        Array.from(this.client.commands).map(([_, cmd]) => {
            if (!categories[cmd.category])
                categories[cmd.category] = [];
            categories[cmd.category].push(cmd);
        });
        const paginator = new util_1.Paginator(message);
        for (const category in categories) {
            categories[category] = categories[category].sort();
            while (categories[category].length) {
                // We get the first 10 commands in this array
                const cmds = categories[category].splice(0, 10);
                paginator.add(embed => embed.setTitle(`${category} commands`).setDescription(`${cmds.map(cmd => { var _a; return `• **${cmd.name}**: ${(_a = cmd.description) !== null && _a !== void 0 ? _a : 'N/A'}`; }).join('\n')}`));
            }
        }
        ;
        await paginator.start();
    }
}
exports.default = default_1;
//# sourceMappingURL=Help.js.map