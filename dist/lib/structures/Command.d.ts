import { MoonlightClient } from "../..";
import { BasePool } from './Pools/Base/BasePool';
import { BasePiece, BasePieceOptions } from './BasePiece';
import { Message, PermissionString } from "discord.js";
/**
 * @class
 * @abstract
 */
export declare class Command extends BasePiece<Command> {
    /** An array of aliases */
    readonly aliases: string[];
    /** Whether or not this command can only be run in a nsfw channel */
    readonly nsfw: boolean;
    /** Whether or not this command can be called by a user when DM-ing the bot */
    readonly canRunInDM: boolean;
    /** The amount of time in seconds of the command's cooldown */
    readonly cooldown: number;
    /** Whether or not this command can only be run by a bot owner */
    readonly ownerOnly: boolean;
    /** The usage string for the command */
    readonly usage: string;
    /** The usage delimiter */
    readonly usageDelim: string | undefined;
    /** The permissions the user is required to have to run the command */
    readonly requiredPermissions: PermissionString[];
    /** The permissions the bot requires to run the command */
    readonly requiredBotPermissions: PermissionString[];
    /** The map containing the customized responses */
    readonly customizedResponses: Map<string, string>;
    /** The flags provided by the user when running the command */
    readonly flags: Map<string, string>;
    /** The category this command is part of */
    category: string;
    run(_message: Message, ..._arg: any[]): void;
    /** Customize the message thrown when an argument fails to parse */
    customizeResponse(argument: string, response: string): void;
    constructor(client: MoonlightClient, pool: BasePool<string, Command>, options?: CommandOptions);
}
interface CommandOptions extends BasePieceOptions {
    /** An array of aliases */
    aliases?: string[];
    /** Whether or not this command should only be run in a nsfw channel */
    nsfw?: boolean;
    /** Whether or not this command can be called by a user when DM-ing the bot */
    canRunInDM?: boolean;
    /** The amount of time in seconds of a command's cooldown */
    cooldown?: number;
    /** Whether or not this command can only be run by a bot owner */
    ownerOnly?: boolean;
    /** The usage string for the command */
    usage?: string;
    /** The usage delimiter */
    usageDelim?: string | undefined;
    /** The permissions the user is required to have to run the command */
    requiredPermissions?: PermissionString[];
    /** The permissions the bot requires to run the command */
    requiredBotPermissions?: PermissionString[];
}
export {};
//# sourceMappingURL=Command.d.ts.map