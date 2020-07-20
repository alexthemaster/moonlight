import { Event } from '../lib/structures/Event';
import { MoonlightClient } from '../lib/Client';
import { Message } from 'discord.js';
import { BasePool } from '../lib/structures/Pools/Base/BasePool';
import { Command } from '../lib/structures/Command';

export default class extends Event {
    constructor(client: MoonlightClient, pool: BasePool<string, Event>) {
        super(client, pool, {
            name: 'coreMessage',
            event: 'message'
        })
    }

    public run(message: Message) {
        // Run the monitors
        this.client.monitors.forEach(monitor => {
            if (monitor.ignoreOthers && message.author !== this.client.user) return;
            if (monitor.ignoreSelf && message.author === this.client.user) return;
            if (monitor.ignoreBots && message.author.bot) return;

            monitor.run(message);
        });

        // If the message doesn't start with ANY prefix then return
        if (!this.client.prefixes.some(prefix => message.content.startsWith(prefix))) return;

        // Extract the prefix and the other arguments
        const prefix: string = this.client.prefixes.filter(prefix => message.content.startsWith(prefix))[0];
        const args: string[] = message.content.substring(prefix.length).trim().split(/ +/g)
        if (!args[0]) return;

        const command = args.shift()?.toLowerCase();
        if (!command) return;

        const cmd: Command | null = this.client.commands.get(command) || this.client.commands.get((this.client.aliases.get(command) as string)) || null;
        if (!cmd) return;

        if (cmd.disabled) return message.channel.send(`This command was globally disabled by the bot owner.`);

        cmd.run(message);
    }
}