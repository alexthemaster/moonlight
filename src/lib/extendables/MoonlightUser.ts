import { Command } from '../structures/Command';
import { Structures } from 'discord.js';

const User = Structures.get('User');

class MoonlightUser extends User {
    /** The Map that stores command cooldowns */
    public readonly cooldowns: Map<Command, Date> = new Map();
}

Structures.extend('User', () => MoonlightUser);

export { MoonlightUser };