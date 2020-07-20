import { MoonlightClient } from "../..";
import { BasePool } from './Pools/Base/BasePool';
import { BasePiece, BasePieceOptions } from './BasePiece';
import { Message } from "discord.js";

/**
 * @class
 * @abstract
 */
export class Command extends BasePiece<Command> {
    /** An array of aliases */
    public readonly aliases: string[];

    public run(message: Message, ...arg: any[]): void {
        throw new Error(`Run function not defined in ${__filename}`);
    }

    constructor(client: MoonlightClient, pool: BasePool<string, Command>, options?: CommandOptions) {
        super(client, pool, options)
        this.aliases = options?.aliases || new Array();
    }
}

interface CommandOptions extends BasePieceOptions {
    aliases?: string[];
}