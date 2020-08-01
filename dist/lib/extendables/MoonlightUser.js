"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoonlightUser = void 0;
const discord_js_1 = require("discord.js");
const User = discord_js_1.Structures.get('User');
class MoonlightUser extends User {
    constructor() {
        super(...arguments);
        /** The Map that stores command cooldowns */
        this.cooldowns = new Map();
    }
}
exports.MoonlightUser = MoonlightUser;
discord_js_1.Structures.extend('User', () => MoonlightUser);
//# sourceMappingURL=MoonlightUser.js.map