import { Event } from '../lib/structures/Event';
import { BasePool } from '../lib/structures/Pools/Base/BasePool';
import { MoonlightClient } from '../lib/Client';
export default class extends Event {
    constructor(client: MoonlightClient, pool: BasePool<string, Event>);
    run(): Promise<void>;
}
//# sourceMappingURL=OnceReady.d.ts.map