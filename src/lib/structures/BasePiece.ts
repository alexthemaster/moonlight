import MoonlightClient from '../Client';
import BaseManager from './Managers/Base/BaseManager';

/**
 * @typedef BasePieceOptions
 * @property {string} [name]
 * @property {boolean} [disabled=false]
 */

/**
 * @class
 * @property {MoonlightClient} client
 * @property {string} name The name of the piece
 * @property {boolean} disabled Whether or not this piece is disabled
 * @property {BaseManager} manager The manager this piece is part of
 * @property {BasePieceOptions} options
 * @abstract
 */
export default class BasePiece<T> {
    public client: MoonlightClient;
    public disabled: boolean;
    public manager: BaseManager<string, T>;
    public options: BasePieceOptions | undefined;

    /** */
    public run(...arg: any[]): void {
        throw new Error(`Run function not defined in ${__filename}`);
    }

    /**
     * A function that runs at the bot startup once
     */
    public init(): void {

    }

    /**
     * A function that reloads the file
     */
    public reload() { }

    public enable(): void {
        if (!this.disabled) this.disabled = false;
    }

    public disable(): void {
        if (!!this.disabled) this.disabled = true;
    }

    constructor(client: MoonlightClient, manager: BaseManager<string, T>, options?: BasePieceOptions) {
        this.client = client;
        this.options = options;
        this.disabled = options?.disabled || false;
        this.manager = manager;
    }
}

export interface BasePieceOptions {
    name?: string;
    disabled?: boolean;
}