import { MoonlightClient } from "../..";
import { BasePool } from './Pools/Base/BasePool';
import { BasePiece, BasePieceOptions } from './BasePiece';
import { Message, PermissionString } from "discord.js";

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
    /** Whether or not this command can only be run by a bot owner */
    public readonly ownerOnly: boolean;
    /** The usage string for the command */
    public readonly usage: string;
    /** The usage delimiter */
    public readonly usageDelim: string | undefined;
    /** The permissions the user is required to have to run the command */
    public readonly requiredPermissions: PermissionString[];
    /** The permissions the bot requires to run the command */
    public readonly requiredBotPermissions: PermissionString[];
    /** The map containing the customized responses */
    public readonly customizedResponses: Map<string, string> = new Map<string, string>();
    /** The flags provided by the user when running the command */
    public readonly flags: Map<string, string> = new Map<string, string>();
    /** The category this command is part of */
    public category!: string;

    public run(_message: Message, ..._arg: any[]): void {
        throw new Error(`Run function not defined in ${__filename}`);
    }

    /** Customize the message thrown when an argument fails to parse */
    public customizeResponse(argument: string, response: string): void {
        this.customizedResponses.set(argument, response);
    }

    constructor(client: MoonlightClient, pool: BasePool<string, Command>, options?: CommandOptions) {
        super(client, pool, options)
        this.aliases = options?.aliases ?? new Array();
        this.nsfw = options?.nsfw ?? false;
        this.canRunInDM = options?.canRunInDM ?? true;
        this.cooldown = options?.cooldown ?? 0;
        this.ownerOnly = options?.ownerOnly ?? false;
        this.usage = options?.usage ?? '';
        this.usageDelim = options?.usageDelim ?? undefined;
        this.requiredPermissions = options?.requiredPermissions ?? new Array();
        this.requiredBotPermissions = options?.requiredBotPermissions ?? new Array();
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