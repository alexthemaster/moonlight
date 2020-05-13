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
 * @typedef {external:ClientOptions} MoonlightClientOptions
 * @property {string|string[]} [prefix] The prefix or an array of prefixes the bot will use
 * @property {boolean} [displayErrors=true] Whether or not to display error messages send as the error event
 * @property {function} [readyMessage] Set the ready message to display when thgge bot is ready -> should return a string
 * @example { ..., prefix: ['p.', 'p!'], displayErrors: false, readyMessage: (client) => `Logged in as ${client.user.tag}` }
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
 * @property {string} mainDir The user's directory
 * @property {string} coreDir The core directory, where the Moonlight files are located
 * @property {CommandManager} commands The command manager that stores all command
 * @property {Map} aliases A map which stores all command aliases
 * @property {MonitorManager} monitors The monitor manager that stores all monitors
 * @property {EventManager} events The event manager that stores all events
 * @property {string[]} prefixes An array containing all the prefixes
 */
export class MoonlightClient extends Client {

    // Directories
    public mainDir: string = path.dirname(require.main!.filename);
    public coreDir: string = path.join(__dirname, '../')

    // Managers
    public commands: CommandManager<string, Command> = new CommandManager(this);
    public aliases: Map<string, string> = new Map();
    public events: EventManager<string, Event> = new EventManager(this);
    public monitors: MonitorManager<string, Monitor> = new MonitorManager(this);

    // Additional options
    public prefixes: string[] = new Array();
    public options!: MoonlightClientOptions;

    /**
     * @param {MoonlightClientOptions} options The Moonlight Client Options
     * @example { prefix: ['p.', 'p!'], displayErrors: false, readyMessage: (client) => `Logged in as ${client.user.tag}` }
     */
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


    /**
     * Returns a Map containing every Moonlight manager
     * @returns {Map}
     */
    get managers() {
        return new Map<string, Command | Event | Monitor>([...this.commands, ...this.events, ...this.monitors]);
    }

    /**
     * The function that initiates the bot and then logs the client in, establishing a websocket connection to Discord.
     * @param {string} token Token of the bot account to log in with
     * @returns {Promise<string>} Token
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

export interface MoonlightClientOptions extends ClientOptions {
    prefix?: string | string[];
    displayErrors?: boolean;
    readyMessage?(client: MoonlightClient): string;
};