import { Client, ClientOptions } from 'discord.js';
import path from 'path';
import { Command } from './structures/Command';
import { CommandManager } from './structures/Managers/CommandManager';
import { Event } from './structures/Event';
import { EventManager } from './structures/Managers/EventManager';
import { Monitor } from './structures/Monitor';
import { MonitorManager } from "./structures/Managers/MonitorManagers";
import { Stopwatch } from './util';


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
 * The Moonlight Client
 * @license MIT
 * @extends external:Client
 */
export class MoonlightClient extends Client {

    // Directories
    /** The user's directory */
    public mainDir: string = path.dirname(require.main!.filename);
    /** The core directory, where the Moonlight files are located */
    public readonly coreDir: string = path.join(__dirname, '../')

    // Managers
    /** The command manager that stores all command */
    public readonly commands: CommandManager<string, Command> = new CommandManager(this);
    /** A map which stores all command aliases */
    public readonly aliases: Map<string, string> = new Map();
    /** The event manager that stores all */
    public readonly events: EventManager<string, Event> = new EventManager(this);
    /** The monitor manager that stores all monitors */
    public readonly monitors: MonitorManager<string, Monitor> = new MonitorManager(this);

    // Additional options
    /** An array containing all the prefixes */
    public readonly prefixes: string[] = new Array();
    public options!: MoonlightClientOptions;

    /** @param options The Moonlight Client Options */
    constructor(options?: MoonlightClientOptions) {
        super(options);

        if (options?.prefix) {
            if (Array.isArray(options.prefix)) this.prefixes.push(...(options.prefix as string[]));
            else this.prefixes.push((options.prefix as string));
        }

        if (options?.displayErrors || !options?.displayErrors) {
            this.on('error', error => console.error(`[Error] ${error}`));
        }
    }


    /** Returns a Map containing every Moonlight manager */
    get managers() {
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

        // Initialize all the managers
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
    /** Whether or not to display error messages send as the error event */
    displayErrors?: boolean;
    /** Set the ready message to display when thgge bot is ready -> should return a string */
    readyMessage?(client: MoonlightClient): string;
};