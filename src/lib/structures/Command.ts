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
    /** Whether or not this command can only be run in a nsfw channel */
    public readonly nsfw: boolean;
    /** Whether or not this command can be called by a user when DM-ing the bot */
    public readonly canRunInDM: boolean;
    /** The amount of time in seconds of the command's cooldown */
    public readonly cooldown: number;

    public run(_message: Message, ..._arg: any[]): void {
        throw new Error(`Run function not defined in ${__filename}`);
    }

    constructor(client: MoonlightClient, pool: BasePool<string, Command>, options?: CommandOptions) {
        super(client, pool, options)
        this.aliases = options?.aliases ?? new Array();
        this.nsfw = options?.nsfw ?? false;
        this.canRunInDM = options?.canRunInDM ?? true;
        this.cooldown = options?.cooldown ?? 0;
    }
}

interface CommandOptions extends BasePieceOptions {
    /** An array of aliases */
    aliases?: string[];
    /** Whether or not this command should only be run in a nsfw channel */
    nsfw?: boolean;
    /** Whether or not this command can be called by a user when DM-ing the bot */
    canRunInDM?: boolean;
    /** The amount of time in seconds of a command's cooldown */
    cooldown: number;
}