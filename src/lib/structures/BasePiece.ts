import { MoonlightClient } from '../Client';
import { BasePool } from './Pools/Base/BasePool';

/**
 * @class
 * @abstract
 */
export class BasePiece<T> {
    /** The name of the piece */
    public name: string | undefined;
    public readonly client: MoonlightClient;
    /** Whether or not this piece is disabled */
    public disabled: boolean;
    /** The description of the piece */
    public readonly description?: string;
    /** The pool this piece is part of */
    public readonly pool: BasePool<string, T>;
    public options: BasePieceOptions | undefined;

    public run(...arg: any[]): void {
        throw new Error(`Run function not defined in ${__filename}`);
    }

    /** A function that runs at the bot startup once */
    public init(): void {

    }

    /** A function that reloads the file */
    public reload() { }

    public enable(): void {
        this.disabled = false;
    }

    public disable(): void {
        this.disabled = true;
    }

    constructor(client: MoonlightClient, pool: BasePool<string, T>, options?: BasePieceOptions) {
        this.client = client;
        this.options = options;
        this.name = options?.name ?? undefined;
        this.description = options?.description;
        this.disabled = options?.disabled ?? false;
        this.pool = pool;
    }
}

export interface BasePieceOptions {
    name?: string;
    /** Whether or not this piece should be disabled */
    disabled?: boolean;
    /** The description of the piece */
    description?: string;
}