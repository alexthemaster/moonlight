import { MoonlightClient } from "../..";
import { MoonlightBaseManager as BaseManager } from './Managers/Base/BaseManager';
import { BasePiece, BasePieceOptions } from './BasePiece';

/**
 * @typedef {BasePieceOptions} EventOptions
 * @property {string} event The event to listen to
 * @property {boolean} [once=false] Whether or not to run this event only once
 */

/**
 * @class
 * @extends BasePiece
 * @param {EventOptions} options 
 * @abstract
 */
export class Event extends BasePiece<Event> {
    public event: string;
    public once: boolean;

    public enable(): void {
        if (!this.disabled) this.disabled = false;
    }

    public disable():void {
        if (!!this.disabled) this.disabled = true;
    }

    constructor(client: MoonlightClient, manager: BaseManager<string, Event>, options: EventOptions) {
        super(client, manager, options);
        if (!options.event) throw new Error(`No event name provided in one of the event files.`)
        this.event = options.event;
        this.disabled = options.disabled || false;
        this.once = options.once || false;
    }
}

interface EventOptions extends BasePieceOptions{
    event: string,
    once?: boolean
}