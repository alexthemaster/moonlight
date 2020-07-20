import { Event } from '../lib/structures/Event';
import { BasePool } from '../lib/structures/Pools/Base/BasePool';
import { MoonlightClient } from '../lib/Client';

export default class extends Event {
    constructor(client: MoonlightClient, pool: BasePool<string, Event>) {
        super(client, pool, {
            name: 'coreOnceReady',
            event: 'ready',
            once: true
        })
    }

    public run() {
        if (this.client.options.readyMessage && typeof this.client.options.readyMessage == 'function') {
            console.log(this.client.options.readyMessage(this.client))
        }

        this.client.prefixes.push(`${this.client.user!.username}, `, `<@!${this.client.user!.id}>`);

        this.client.pools.forEach(pool => pool.init());
    }
}