/// <reference path="../Client.d.ts" />
/// <reference types="discord.js" />
import { Command } from '../structures/Command';
declare const User: typeof import("discord.js").User;
declare class MoonlightUser extends User {
    /** The Map that stores command cooldowns */
    readonly cooldowns: Map<Command, Date>;
}
export { MoonlightUser };
//# sourceMappingURL=MoonlightUser.d.ts.map