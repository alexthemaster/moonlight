"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = require("../lib/structures/Event");
const util_1 = require("../lib/util");
const discord_js_1 = require("discord.js");
const moment_1 = __importDefault(require("moment"));
class default_1 extends Event_1.Event {
    constructor(client, pool) {
        super(client, pool, {
            name: 'coreMessage',
            event: 'message'
        });
    }
    async run(message) {
        var _a, _b, _c, _d, _e;
        // Run the monitors
        this.client.monitors.forEach(monitor => {
            if (monitor.ignoreOthers && message.author !== this.client.user)
                return;
            if (monitor.ignoreSelf && message.author === this.client.user)
                return;
            if (monitor.ignoreBots && message.author.bot)
                return;
            monitor.run(message);
        });
        // Return if the author of a message is a bot
        if (message.author.bot)
            return;
        let guildOrMentionPrefix = message.guild ? (this.client.options.fetchGuildPrefix ? (await this.client.options.fetchGuildPrefix(message.guild) || undefined) : undefined) : undefined;
        // If the guild has a specific prefix and the message doesn't start with it
        if (guildOrMentionPrefix && !message.content.startsWith(guildOrMentionPrefix)) {
            // If the message starts with a mention of the bot and has some characters after it too, then set the prefix to the mention
            if (message.content.startsWith(`<@!${this.client.user.id}>`) && message.content.length > `<@!${this.client.user.id}>`.length && this.client.options.useMentionPrefix)
                guildOrMentionPrefix = `<@!${this.client.user.id}>`;
            // If the message is just a mention of the bot then mention the guild's prefix else return
            else if (message.content === `<@!${this.client.user.id}>`)
                return message.channel.send(`The guild's current prefix is: ${discord_js_1.Util.removeMentions(guildOrMentionPrefix)}`);
            else
                return;
        }
        // If there's no guild specific prefix and the message doesn't start with ANY other prefix then return
        if (!guildOrMentionPrefix && !this.client.prefixes.some(prefix => message.content.startsWith(prefix)))
            return;
        // Extract the prefix and the other arguments
        const prefix = guildOrMentionPrefix !== null && guildOrMentionPrefix !== void 0 ? guildOrMentionPrefix : this.client.prefixes.filter(prefix => message.content.startsWith(prefix))[0];
        const args = message.content.substring(prefix.length).trim().split(/ +/g);
        const command = (_a = args.shift()) === null || _a === void 0 ? void 0 : _a.toLowerCase();
        if (!command)
            return;
        const cmd = (_c = (_b = this.client.commands.get(command.toLowerCase())) !== null && _b !== void 0 ? _b : this.client.commands.get(this.client.aliases.get(command.toLowerCase()))) !== null && _c !== void 0 ? _c : null;
        if (!cmd)
            return;
        if (!this.client.owners.some(owner => owner === message.author.id) && message.author.cooldowns.has(cmd)) {
            // Shout-out to this amazing Stack Overflow answer for this solution https://stackoverflow.com/a/53829705
            const cooldownEnd = moment_1.default(message.author.cooldowns.get(cmd));
            const now = moment_1.default();
            moment_1.default.relativeTimeThreshold('ss', 60);
            moment_1.default.updateLocale('en', {
                relativeTime: {
                    s: function (number) {
                        return number + ' seconds';
                    }
                }
            });
            const duration = moment_1.default.duration(cooldownEnd.diff(now)).humanize();
            return message.channel.send(`You have already used this command recently. Please try again ${duration}.`);
        }
        ;
        const cooldownEnd = moment_1.default(new Date()).add(cmd.cooldown, 'seconds').toDate();
        message.author.cooldowns.set(cmd, cooldownEnd);
        setTimeout(() => {
            message.author.cooldowns.delete(cmd);
        }, cmd.cooldown * 1000);
        if (cmd.ownerOnly && !this.client.owners.includes(message.author.id))
            return message.channel.send('This command can only be used by the bot owner(s)!');
        if (cmd.disabled)
            return message.channel.send('This command was globally disabled by the bot owner.');
        if (!cmd.canRunInDM && message.channel.type === 'dm')
            return;
        if (cmd.nsfw && message.channel.type !== 'dm' && !message.channel.nsfw)
            return message.channel.send('This command can only be used in NSFW channels.');
        if (message.guild) {
            const missingPerms = (_d = message.member) === null || _d === void 0 ? void 0 : _d.permissionsIn(message.channel).missing(cmd.requiredPermissions);
            const missingBotPerms = (_e = message.guild.me) === null || _e === void 0 ? void 0 : _e.permissionsIn(message.channel).missing(cmd.requiredBotPermissions);
            if (missingBotPerms === null || missingBotPerms === void 0 ? void 0 : missingBotPerms.length)
                return message.channel.send(`Insufficient bot permissions, missing: \`${missingBotPerms.map(perm => FriendlyPermission[perm]).join(', ')}\``);
            if (missingPerms === null || missingPerms === void 0 ? void 0 : missingPerms.length)
                return message.channel.send(`Insufficient user permissions, missing: \`${missingPerms.map(perm => FriendlyPermission[perm]).join(', ')}\``);
        }
        // We parse the flags
        while (args.some(arg => arg.startsWith('--'))) {
            const find = args.find(arg => arg.startsWith('--'));
            args.splice(args.indexOf(find), 1);
            const arg = find.substring(2).split('=');
            const flag = arg[0];
            const flagValue = arg[1];
            cmd.flags.set(flag, flagValue);
        }
        cmd.rawArgs = args;
        // We parse the arguments
        let parsedArgs;
        try {
            parsedArgs = await new util_1.ArgumentParser(cmd.usage, args.join(' '), cmd.usageDelim, this.client, message).parse();
        }
        catch (res) {
            if (cmd.customizedResponses.has(res.arg))
                return message.channel.send(cmd.customizedResponses.get(res.arg));
            return message.channel.send(res.message);
        }
        try {
            await cmd.run(message, parsedArgs);
        }
        catch (err) {
            message.channel.send(`Something went wrong: \`\`\`${err}\`\`\``);
        }
    }
}
exports.default = default_1;
var FriendlyPermission;
(function (FriendlyPermission) {
    FriendlyPermission["CREATE_INSTANT_INVITE"] = "Create Invite";
    FriendlyPermission["KICK_MEMBERS"] = "Kick Members";
    FriendlyPermission["BAN_MEMBERS"] = "Ban Members";
    FriendlyPermission["ADMINISTRATOR"] = "Administrator";
    FriendlyPermission["MANAGE_CHANNELS"] = "Manage Channels";
    FriendlyPermission["MANAGE_GUILD"] = "Manage Server";
    FriendlyPermission["ADD_REACTIONS"] = "Add Reactions";
    FriendlyPermission["VIEW_AUDIT_LOG"] = "View Audit Log";
    FriendlyPermission["PRIORITY_SPEAKER"] = "Priority Speaker";
    FriendlyPermission["STREAM"] = "Video";
    FriendlyPermission["VIEW_CHANNEL"] = "Read Messages";
    FriendlyPermission["SEND_MESSAGES"] = "Send Messages";
    FriendlyPermission["SEND_TTS_MESSAGES"] = "Send TTS Messages";
    FriendlyPermission["MANAGE_MESSAGES"] = "Manage Messages";
    FriendlyPermission["EMBED_LINKS"] = "Embed Links";
    FriendlyPermission["ATTACH_FILES"] = "Attach Files";
    FriendlyPermission["READ_MESSAGE_HISTORY"] = "Read Message History";
    FriendlyPermission["MENTION_EVERYONE"] = "Mention @everyone, @here, and All Roles";
    FriendlyPermission["USE_EXTERNAL_EMOJIS"] = "Use External Emojis";
    FriendlyPermission["VIEW_GUILD_INSIGHTS"] = "View Guild Insights";
    FriendlyPermission["CONNECT"] = "Connect";
    FriendlyPermission["SPEAK"] = "Speak";
    FriendlyPermission["MUTE_MEMBERS"] = "Mute Members";
    FriendlyPermission["DEAFEN_MEMBERS"] = "Deafen Members";
    FriendlyPermission["MOVE_MEMBERS"] = "Move Members";
    FriendlyPermission["USE_VAD"] = "Use Voice Activity";
    FriendlyPermission["CHANGE_NICKNAME"] = "Change Nickname";
    FriendlyPermission["MANAGE_NICKNAMES"] = "Manage Nicknames";
    FriendlyPermission["MANAGE_ROLES"] = "Manage Roles";
    FriendlyPermission["MANAGE_WEBHOOKS"] = "Manage Webhooks";
    FriendlyPermission["MANAGE_EMOJIS"] = "Manage Emojis";
})(FriendlyPermission || (FriendlyPermission = {}));
//# sourceMappingURL=Message.js.map