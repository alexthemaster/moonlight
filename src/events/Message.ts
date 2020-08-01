import { Event } from '../lib/structures/Event';
import { MoonlightClient } from '../lib/Client';
import { MoonlightGuildMember } from '../lib/extendables/MoonlightGuildMember';
import { BasePool } from '../lib/structures/Pools/Base/BasePool';
import { Command } from '../lib/structures/Command';
import { ArgumentParser } from '../lib/util';
import { Message } from 'discord.js';
import moment from 'moment';

export default class extends Event {
    constructor(client: MoonlightClient, pool: BasePool<string, Event>) {
        super(client, pool, {
            name: 'coreMessage',
            event: 'message'
        })
    }

    public async run(message: Message) {
        // Run the monitors
        this.client.monitors.forEach(monitor => {
            if (monitor.ignoreOthers && message.author !== this.client.user) return;
            if (monitor.ignoreSelf && message.author === this.client.user) return;
            if (monitor.ignoreBots && message.author.bot) return;

            monitor.run(message);
        });

        // Return if the author of a message is a bot
        if (message.author.bot) return;

        // If the message doesn't start with ANY prefix then return
        if (!this.client.prefixes.some(prefix => message.content.startsWith(prefix))) return;

        // Extract the prefix and the other arguments
        const prefix: string = this.client.prefixes.filter(prefix => message.content.startsWith(prefix))[0];
        const args: string[] = message.content.substring(prefix.length).trim().split(/ +/g)
        if (!args[0]) return;

        const command = args.shift()?.toLowerCase();
        if (!command) return;

        const cmd: Command | null = this.client.commands.get(command.toLowerCase()) ?? this.client.commands.get((this.client.aliases.get(command.toLowerCase()) as string)) ?? null;
        if (!cmd) return;

        if (message.guild) {
            if (!this.client.owners.some(owner => owner === message.author.id) && (message.member as MoonlightGuildMember).cooldowns.has(cmd)) {
                // Shout-out to this amazing Stack Overflow answer for this solution https://stackoverflow.com/a/53829705
                const cooldownEnd = moment((message.member as MoonlightGuildMember).cooldowns.get(cmd));
                const now = moment();
                moment.relativeTimeThreshold('ss', 60);
                moment.updateLocale('en', {
                    relativeTime: {
                        s: function (number) {
                            return number + ' seconds';
                        }
                    }
                });

                const duration = moment.duration(cooldownEnd.diff(now)).humanize();

                return message.channel.send(`You have already used this command recently. Please try again ${duration}.`);
            };

            const cooldownEnd = moment(new Date()).add(cmd.cooldown, 'seconds').toDate();

            (message.member as MoonlightGuildMember).cooldowns.set(cmd, cooldownEnd);

            setTimeout(() => {
                (message.member as MoonlightGuildMember).cooldowns.delete(cmd);
            }, cmd.cooldown * 1000);
        }

        if (cmd.ownerOnly && !this.client.owners.includes(message.author.id)) return message.channel.send('This command can only be used by the bot owner(s)!');

        if (cmd.disabled) return message.channel.send('This command was globally disabled by the bot owner.');

        if (!cmd.canRunInDM && message.channel.type === 'dm') return;

        if (cmd.nsfw && message.channel.type !== 'dm' && !message.channel.nsfw) return message.channel.send('This command can only be used in NSFW chnanels.');

        if (message.guild) {
            const missingPerms = message.member?.permissionsIn(message.channel).missing(cmd.requiredPermissions);
            const missingBotPerms = message.guild.me?.permissionsIn(message.channel).missing(cmd.requiredBotPermissions);

            if (missingBotPerms?.length) return message.channel.send(`Insufficient bot permissions, missing: \`${missingBotPerms.map(perm => FriendlyPermission[perm]).join(', ')}\``);
            if (missingPerms?.length) return message.channel.send(`Insufficient user permissions, missing: \`${missingPerms.map(perm => FriendlyPermission[perm]).join(', ')}\``);
        }

        // We parse the flags
        while (args.some(arg => arg.startsWith('--'))) {
            const find = args.find(arg => arg.startsWith('--'));
            args.splice(args.indexOf(find!), 1);
            const arg = find!.substring(2).split('=');
            const flag = arg[0];
            const flagValue = arg[1];

            cmd.flags.set(flag, flagValue);
        }

        // We parse the arguments
        let parsedArgs: object;
        try {
            parsedArgs = await new ArgumentParser(cmd.usage, args.join(' '), cmd.usageDelim, this.client, message).parse();
        } catch (res) {
            if (cmd.customizedResponses.has(res.arg)) return message.channel.send(cmd.customizedResponses.get(res.arg));
            return message.channel.send(res.message);
        }

        try {
            await cmd.run(message, parsedArgs);
        } catch (err) {
            message.channel.send(`Something went wrong: \`\`\`${err}\`\`\``);
        }
    }
}

enum FriendlyPermission {
    CREATE_INSTANT_INVITE = "Create Invite",
    KICK_MEMBERS = "Kick Members",
    BAN_MEMBERS = "Ban Members",
    ADMINISTRATOR = "Administrator",
    MANAGE_CHANNELS = "Manage Channels",
    MANAGE_GUILD = "Manage Server",
    ADD_REACTIONS = "Add Reactions",
    VIEW_AUDIT_LOG = "View Audit Log",
    PRIORITY_SPEAKER = "Priority Speaker",
    STREAM = "Video",
    VIEW_CHANNEL = "Read Messages",
    SEND_MESSAGES = "Send Messages",
    SEND_TTS_MESSAGES = "Send TTS Messages",
    MANAGE_MESSAGES = "Manage Messages",
    EMBED_LINKS = "Embed Links",
    ATTACH_FILES = "Attach Files",
    READ_MESSAGE_HISTORY = "Read Message History",
    MENTION_EVERYONE = "Mention @everyone, @here, and All Roles",
    USE_EXTERNAL_EMOJIS = "Use External Emojis",
    VIEW_GUILD_INSIGHTS = "View Guild Insights",
    CONNECT = "Connect",
    SPEAK = "Speak",
    MUTE_MEMBERS = "Mute Members",
    DEAFEN_MEMBERS = "Deafen Members",
    MOVE_MEMBERS = "Move Members",
    USE_VAD = "Use Voice Activity",
    CHANGE_NICKNAME = "Change Nickname",
    MANAGE_NICKNAMES = "Manage Nicknames",
    MANAGE_ROLES = "Manage Roles",
    MANAGE_WEBHOOKS = "Manage Webhooks",
    MANAGE_EMOJIS = "Manage Emojis"
}