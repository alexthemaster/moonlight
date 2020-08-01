"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoonlightGuildMember = void 0;
const discord_js_1 = require("discord.js");
const GuildMember = discord_js_1.Structures.get('GuildMember');
class MoonlightGuildMember extends GuildMember {
    constructor() {
        super(...arguments);
        /** The Map that stores command cooldowns */
        this.cooldowns = new Map();
    }
}
exports.MoonlightGuildMember = MoonlightGuildMember;
discord_js_1.Structures.extend('GuildMember', () => MoonlightGuildMember);
//# sourceMappingURL=MoonlightGuildMember.js.map