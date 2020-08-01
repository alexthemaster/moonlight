"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../../lib/structures/Command");
/** @ignore */
class default_1 extends Command_1.Command {
    constructor(client, pool) {
        super(client, pool, { cooldown: 5 });
    }
    async run(message) {
        const msg = await message.channel.send('Ping?');
        return await msg.edit(`Pong! [Roundtrip: ${msg.createdTimestamp - message.createdTimestamp}ms | Heartbeat: ${this.client.ws.ping}ms]`);
    }
}
exports.default = default_1;
//# sourceMappingURL=Ping.js.map