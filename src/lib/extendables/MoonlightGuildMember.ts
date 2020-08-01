import { Command } from '../structures/Command';
import { Structures } from 'discord.js';

const GuildMember = Structures.get('GuildMember');

class MoonlightGuildMember extends GuildMember {
    /** The Map that stores command cooldowns */
    public readonly cooldowns: Map<Command, Date> = new Map();
}

Structures.extend('GuildMember', () => MoonlightGuildMember);

export { MoonlightGuildMember };