import { MoonlightClient } from "../..";
import BaseManager from './Managers/Base/BaseManager';
import BasePiece, { BasePieceOptions } from './BasePiece';
import { Message } from "discord.js";

/**
 * @typedef {BasePieceOptions}
 * @property {boolean} [ignoreSelf = false] Whether or not to ignore the bot user
 * @property {boolean} [ignoreBots = false] Whether or not to ignore bots
 * @property {boolean} [ignoreOthers = false] Whether or not to ignore anyone other than the bot user
 */

/**
 * @class
 * @extends BasePiece
 * @abstract
 */
export default class Monitor extends BasePiece<Monitor> {
    public ignoreSelf: boolean;
    public ignoreBots: boolean;
    public ignoreOthers: boolean;

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
    ignoreSelf?: boolean;
    ignoreBots?: boolean;
    ignoreOthers?: boolean;
}