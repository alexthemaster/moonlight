"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = require("../lib/structures/Event");
class default_1 extends Event_1.Event {
    constructor(client, pool) {
        super(client, pool, {
            name: 'coreOnceReady',
            event: 'ready',
            once: true
        });
    }
    async run() {
        if (this.client.options.readyMessage && typeof this.client.options.readyMessage == 'function') {
            console.log(this.client.options.readyMessage(this.client));
        }
        const applicationDetails = await this.client.fetchApplication();
        if (applicationDetails.owner.members) {
            this.client.owners.push(...applicationDetails.owner.members.map(member => member.user.id));
        }
        else {
            this.client.owners.push(applicationDetails.owner.id);
        }
        ;
        // This will remove the duplicates
        this.client.owners = [...new Set(this.client.owners)];
        if (this.client.options.useUsernamePrefix)
            this.client.prefixes.push(`${this.client.user.username}, `);
        if (this.client.options.useMentionPrefix)
            this.client.prefixes.push(`<@!${this.client.user.id}>`);
        // Run the init function for every file in every pool
        await Promise.all(Array.from(this.client.pools).map(async ([_, pool]) => await pool.init()));
        this.client.emit('moonlightReady');
    }
}
exports.default = default_1;
//# sourceMappingURL=OnceReady.js.map