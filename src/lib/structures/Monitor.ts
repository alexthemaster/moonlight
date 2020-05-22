import { MoonlightClient } from "../..";
import { MoonlightBaseManager as BaseManager } from './Managers/Base/BaseManager';
import { BasePiece, BasePieceOptions } from './BasePiece';
import { Message } from "discord.js";

/**
 * @abstract
 */
export class Monitor extends BasePiece<Monitor> {
    /** Whether or not to ignore the bot user */
    public readonly ignoreSelf: boolean;
    /** Whether or not to ignore bots */
    public readonly ignoreBots: boolean;
    /** Whether or not to ignore anyone other than the bot user */
    public readonly ignoreOthers: boolean;

    public run(message: Message): void {
        throw new Error(`Run function not defined in ${__filename}`);
    }

    constructor(client: MoonlightClient, manager: BaseManager<string, Monitor>, options: MonitorOptions) {
        super(client, manager, options)
        this.ignoreSelf = options.ignoreSelf || false;
        this.ignoreBots = options.ignoreBots || false;
        this.ignoreOthers = options.ignoreOthers || false;
    }
}

interface MonitorOptions extends BasePieceOptions {
    /** Whether or not to ignore the bot user */
    ignoreSelf?: boolean;
    /** Whether or not to ignore bots */
    ignoreBots?: boolean;
    /** Whether or not to ignore anyone other than the bot user */
    ignoreOthers?: boolean;
}