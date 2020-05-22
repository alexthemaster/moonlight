import { MoonlightClient } from '../Client';
import { MoonlightBaseManager as BaseManager } from './Managers/Base/BaseManager';

/**
 * @class
 * @abstract
 */
export class BasePiece<T> {
    public readonly client: MoonlightClient;
    /** Whether or not this piece is disabled */
    public disabled: boolean;
    /** The manager this piece is part of */
    public readonly manager: BaseManager<string, T>;
    public options: BasePieceOptions | undefined;

    /** */
    public run(...arg: any[]): void {
        throw new Error(`Run function not defined in ${__filename}`);
    }

    /** A function that runs at the bot startup once */
    public init(): void {

    }

    /** A function that reloads the file */
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
    /** Whether or not this piece should be disabled */
    disabled?: boolean;
}