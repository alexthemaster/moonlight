import { MoonlightClient } from '../Client';
import { BasePool } from './Pools/Base/BasePool';
export declare abstract class BasePiece<T> {
    /** The name of the piece */
    name: string | undefined;
    readonly client: MoonlightClient;
    /** Whether or not this piece is disabled */
    disabled: boolean;
    /** The description of the piece */
    readonly description?: string;
    /** The pool this piece is part of */
    readonly pool: BasePool<string, T>;
    options: BasePieceOptions | undefined;
    run(...arg: any[]): void;
    /** A function that runs at the bot startup once */
    init(): void;
    /** A function that reloads the file */
    reload(): void;
    enable(): void;
    disable(): void;
    constructor(client: MoonlightClient, pool: BasePool<string, T>, options?: BasePieceOptions);
}
export interface BasePieceOptions {
    name?: string;
    /** Whether or not this piece should be disabled */
    disabled?: boolean;
    /** The description of the piece */
    description?: string;
}
//# sourceMappingURL=BasePiece.d.ts.map