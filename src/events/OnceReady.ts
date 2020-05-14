import { Event } from '../lib/structures/Event';
import { MoonlightBaseManager as BaseManager } from '../lib/structures/Managers/Base/BaseManager';
import { MoonlightClient } from '../lib/Client';

export default class extends Event {
    constructor(client: MoonlightClient, manager: BaseManager<string, Event>) {
        super(client, manager, {
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

        this.client.managers.forEach(file => file.init());
    }
}