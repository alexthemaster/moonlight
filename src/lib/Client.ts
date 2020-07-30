import { Client, ClientOptions } from 'discord.js';
import { Command } from './structures/Command';
import { CommandPool } from './structures/Pools/CommandPool';
import { Event } from './structures/Event';
import { EventPool } from './structures/Pools/EventPool';
import { Monitor } from './structures/Monitor';
import { MonitorPool } from "./structures/Pools/MonitorPool";
import { Stopwatch } from './util';
import path from 'path';

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
export class MoonlightClient extends Client {

    // Directories
    /** The user's directory */
    public mainDir: string = path.dirname(require.main!.filename);
    /** The core directory, where the Moonlight files are located */
    public readonly coreDir: string = path.join(__dirname, '../')

    // Pool
    /** The command pool that stores all commands */
    public readonly commands: CommandPool<string, Command> = new CommandPool(this);
    /** A map which stores all command aliases */
    public readonly aliases: Map<string, string> = new Map();
    /** The event pool that stores all */
    public readonly events: EventPool<string, Event> = new EventPool(this);
    /** The monitor pool that stores all monitors */
    public readonly monitors: MonitorPool<string, Monitor> = new MonitorPool(this);

    /** The Map that stores command cooldowns */
    public readonly cooldowns: Map<Command, Date> = new Map();

    /** An array of owners */
    public owners: string[] = new Array();

    // Additional options
    /** An array containing all the prefixes */
    public readonly prefixes: string[] = new Array();
    public options!: MoonlightClientOptions;

    /** @param options The Moonlight Client Options */
    constructor(options: MoonlightClientOptions = {}) {
        super(options);

        options.displayErrors = options.displayErrors ?? true;
        options.useMentionPrefix = options.useMentionPrefix ?? true;
        options.useUsernamePrefix = options.useUsernamePrefix ?? true;

        if (options?.prefix) {
            if (Array.isArray(options.prefix)) this.prefixes.push(...(options.prefix as string[]));
            else this.prefixes.push((options.prefix as string));
        }

        this.on('error', error => {
            if (options.displayErrors) console.error(`[Error] ${error}`);
        });


        if (options?.owners) this.owners.push(...options.owners);
    }


    /** Returns a Map containing every Moonlight pool */
    get pools() {
        return new Map<string, Command | Event | Monitor>([...this.commands, ...this.events, ...this.monitors]);
    }

    /**
     * The function that initiates the bot and then logs the client in, establishing a websocket connection to Discord.
     * @param token Token of the bot account to log in with
     * @returns Token
     * @example(client.login('token'))
     */
    public async login(token?: string | undefined): Promise<string> {
        const stopwatch: Stopwatch = new Stopwatch();

        // Initialize all the pools
        await Promise.all([
            this.events.init(),
            this.commands.init(),
            this.monitors.init()
        ])

        stopwatch.stop();

        console.info(`Loaded everything in: ${stopwatch.getElapsedHuman}`);

        this.events.forEach(event => {
            if (event.disabled) return;

            if (event.once) return this.once((event.event as any), (...arg: any[]) => event.run(...arg));

            this.on((event.event as any), (...arg: any[]) => event.run(...arg));
        });

        // Finally login
        return super.login(token);
    }
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
};

declare module 'discord.js' {
    interface ClientEvents {
        moonlightReady: [];
    }
}