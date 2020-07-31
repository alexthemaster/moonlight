import { MoonlightClient } from "../..";
import { BasePool } from './Pools/Base/BasePool';
import { BasePiece, BasePieceOptions } from './BasePiece';
import { Message } from "discord.js";
/**
 * @abstract
 */
export declare class Monitor extends BasePiece<Monitor> {
    /** Whether or not to ignore the bot user */
    readonly ignoreSelf: boolean;
    /** Whether or not to ignore bots */
    readonly ignoreBots: boolean;
    /** Whether or not to ignore anyone other than the bot user */
    readonly ignoreOthers: boolean;
    run(message: Message): void;
    constructor(client: MoonlightClient, pool: BasePool<string, Monitor>, options: MonitorOptions);
}
interface MonitorOptions extends BasePieceOptions {
    /** Whether or not to ignore the bot user */
    ignoreSelf?: boolean;
    /** Whether or not to ignore bots */
    ignoreBots?: boolean;
    /** Whether or not to ignore anyone other than the bot user */
    ignoreOthers?: boolean;
}
export {};
//# sourceMappingURL=Monitor.d.ts.map