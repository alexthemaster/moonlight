import { Event } from '../lib/structures/Event';
import { MoonlightBaseManager as BaseManager} from '../lib/structures/Managers/Base/BaseManager';
import { MoonlightClient, MoonlightClientOptions } from '../lib/Client';

export default class extends Event {
    constructor(client: MoonlightClient, manager: BaseManager<string, Event>) {
        super(client, manager, {
            name: 'coreOnceReady',
            event: 'ready',
            once: true
        })
    }

    public run() {
        const options = (this.client.options as MoonlightClientOptions);
        if (options.readyMessage && typeof options.readyMessage == 'function') {
            console.log(options.readyMessage(this.client))
        }

        this.client.prefixes.push(`${this.client.user!.username}, `, `<@!${this.client.user!.id}>`);

        this.client.managers.forEach(file => file.init());
    }
}