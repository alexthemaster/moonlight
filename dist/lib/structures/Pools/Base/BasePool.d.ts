import { MoonlightClient } from '../../../..';
/** @abstract */
export declare class BasePool<K, V> extends Map<K, V> {
    readonly client: MoonlightClient;
    /** The name of the pool */
    readonly name: string;
    /** The class type the pool holds */
    readonly type: unknown;
    constructor(client: MoonlightClient, name: string, type: unknown);
    /** Initialize the pool */
    init(): Promise<boolean>;
    /**
     * Loads a class into the pool
     * @param filePath The path to the file
     */
    load(filePath: string): Promise<boolean>;
    /** Returns an array of all the core and user files */
    private _walk;
}
//# sourceMappingURL=BasePool.d.ts.map