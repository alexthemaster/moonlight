import { MoonlightClient } from "../..";
import { BasePool } from './Pools/Base/BasePool';
import { BasePiece, BasePieceOptions } from './BasePiece';
/**
 * [[include:creatingEvents.md]]
 * @abstract
 */
export class Event extends BasePiece<Event> {
    /** The event to listen to */
    public readonly event: string;
    /** Whether or not to run this event only once */
    public readonly once: boolean;

    public enable(): void {
        if (!this.disabled) this.disabled = false;
    }

    public disable(): void {
        if (!!this.disabled) this.disabled = true;
    }

    constructor(client: MoonlightClient, pool: BasePool<string, Event>, options: EventOptions) {
        super(client, pool, options);
        if (!options.event) throw new Error(`No event name provided in one of the event files.`)
        this.event = options.event;
        this.disabled = options.disabled || false;
        this.once = options.once || false;
    }
}

interface EventOptions extends BasePieceOptions {
    /** The event to listen to */
    event: string;
    /** Whether or not to run this event only once */
    once?: boolean;
}