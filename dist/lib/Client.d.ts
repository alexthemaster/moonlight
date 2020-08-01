import { Client, ClientOptions } from 'discord.js';
import { Command } from './structures/Command';
import { CommandPool } from './structures/Pools/CommandPool';
import { Event } from './structures/Event';
import { EventPool } from './structures/Pools/EventPool';
import { Monitor } from './structures/Monitor';
import { MonitorPool } from './structures/Pools/MonitorPool';
import { Task } from "./structures/Task";
import { TaskPool } from './structures/Pools/TaskPool';
import './extendables/MoonlightGuildMember';
/**
 * @external ClientOptions
 * @see {@link https://discord.js.org/#/docs/main/stable/typedef/ClientOptions}
 */
/**
 * @external Client
 * @see {@link https://discord.js.org/#/docs/main/stable/class/Client}
 */
/**
 * @typedef Map
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map}
 */
/**
 * [[include:gettingStarted.md]]
 * @license MIT
 * @extends external:Client
 */
export declare class MoonlightClient extends Client {
    /** The user's directory */
    mainDir: string;
    /** The core directory, where the Moonlight files are located */
    readonly coreDir: string;
    /** The command pool that stores all commands */
    readonly commands: CommandPool<string, Command>;
    /** A map which stores all command aliases */
    readonly aliases: Map<string, string>;
    /** The event pool that stores all events */
    readonly events: EventPool<string, Event>;
    /** The monitor pool that stores all monitors */
    readonly monitors: MonitorPool<string, Monitor>;
    /** The task pool that stores all tasks */
    readonly tasks: TaskPool<string, Task>;
    /** An array of owners */
    owners: string[];
    /** An array containing all the prefixes */
    readonly prefixes: string[];
    options: MoonlightClientOptions;
    /** @param options The Moonlight Client Options */
    constructor(options?: MoonlightClientOptions);
    /** Returns a Map containing every Moonlight pool */
    get pools(): Map<string, Command | Event | Monitor>;
    /**
     * The function that initiates the bot and then logs the client in, establishing a websocket connection to Discord.
     * @param token Token of the bot account to log in with
     * @returns Token
     * @example(client.login('token'))
     */
    login(token?: string | undefined): Promise<string>;
}
/** @example { ..., prefix: ['p.', 'p!'], displayErrors: false, readyMessage: (client) => `Logged in as ${client.user.tag}` } */
export interface MoonlightClientOptions extends ClientOptions {
    /** The prefix or an array of prefixes the bot will use */
    prefix?: string | string[];
    /** Whether or not to display error messages sent by the error event */
    displayErrors?: boolean;
    /** An array that contains the ID's of the owners */
    owners?: string[];
    /** Whether or not to use mention prefix */
    useMentionPrefix?: boolean;
    /** Whether or not to use username prefix - e.g. if the bot is called "Penfold" then the username prefix will be "Penfold, " */
    useUsernamePrefix?: boolean;
    /**
     * Set the ready message to display when the bot is ready -> should return a string
     * @example readyMessage: (client) => `Logged in and serving in ${client.guilds.size}!`
     */
    readyMessage?(client: MoonlightClient): string;
}
declare module 'discord.js' {
    interface ClientEvents {
        moonlightReady: [];
    }
}
//# sourceMappingURL=Client.d.ts.map