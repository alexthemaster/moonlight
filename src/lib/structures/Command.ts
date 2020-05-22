import { MoonlightClient } from "../..";
import { MoonlightBaseManager as BaseManager} from './Managers/Base/BaseManager';
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

    constructor(client: MoonlightClient, manager: BaseManager<string, Command>, options?: CommandOptions) {
        super(client, manager, options)
        this.aliases = options?.aliases || new Array();
    }
}

interface CommandOptions extends BasePieceOptions {
    aliases?: string[];
}