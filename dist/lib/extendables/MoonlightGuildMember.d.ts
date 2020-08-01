/// <reference path="../Client.d.ts" />
/// <reference types="discord.js" />
import { Command } from '../structures/Command';
declare const GuildMember: typeof import("discord.js").GuildMember;
declare class MoonlightGuildMember extends GuildMember {
    /** The Map that stores command cooldowns */
    readonly cooldowns: Map<Command, Date>;
}
export { MoonlightGuildMember };
//# sourceMappingURL=MoonlightGuildMember.d.ts.map