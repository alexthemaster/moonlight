import { MoonlightClient } from "../..";
import { BasePool } from './Pools/Base/BasePool';
import { BasePiece, BasePieceOptions } from './BasePiece';
import { ClientEvents } from 'discord.js';
/**
 * [[include:creatingEvents.md]]
 * @abstract
 */
export declare class Event extends BasePiece<Event> {
    /** The event to listen to */
    readonly event: keyof ClientEvents;
    /** Whether or not to run this event only once */
    readonly once: boolean;
    enable(): void;
    disable(): void;
    constructor(client: MoonlightClient, pool: BasePool<string, Event>, options: EventOptions);
}
interface EventOptions extends BasePieceOptions {
    /** The event to listen to */
    event: keyof ClientEvents;
    /** Whether or not to run this event only once */
    once?: boolean;
}
export {};
//# sourceMappingURL=Event.d.ts.map