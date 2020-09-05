"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.guild = void 0;
async function guild(input, client) {
    let guild = await client.guilds.fetch(input).catch(err => null) || null;
    if (guild)
        return guild;
    throw "Please provide a valid guild ID!";
}
exports.guild = guild;
exports.server = guild;
//# sourceMappingURL=Guild.js.map