import { MoonlightClient } from "../..";
import BaseManager from './Managers/Base/BaseManager';
import BasePiece, { BasePieceOptions } from './BasePiece';
import { Message } from "discord.js";

/**
 * @typedef {BasePieceOptions} CommandOptions
 * @property {string[]} [aliases] An array of aliases
 */

/**
 * @class
 * @extends BasePiece
 * @abstract
 * @property {string[]} aliases
 */
export default class Command extends BasePiece<Command> {
    public aliases: string[];

    public run(message: Message, ...arg: any[]): void {
        throw new Error(`Run function not defined in ${__filename}`);
    }

    constructor(client: MoonlightClient, manager: BaseManager<string, Command>, options?: CommandOptions) {
        super(client, manager, options)
        this.aliases = options?.aliases || new Array();
    }
}

interface CommandOptions extends BasePieceOptions {
    aliases?: string[];
}