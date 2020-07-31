"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoonlightClient = void 0;
const discord_js_1 = require("discord.js");
const CommandPool_1 = require("./structures/Pools/CommandPool");
const EventPool_1 = require("./structures/Pools/EventPool");
const MonitorPool_1 = require("./structures/Pools/MonitorPool");
const util_1 = require("./util");
const path_1 = __importDefault(require("path"));
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
class MoonlightClient extends discord_js_1.Client {
    /** @param options The Moonlight Client Options */
    constructor(options = {}) {
        var _a, _b, _c;
        super(options);
        // Directories
        /** The user's directory */
        this.mainDir = path_1.default.dirname(require.main.filename);
        /** The core directory, where the Moonlight files are located */
        this.coreDir = path_1.default.join(__dirname, '../');
        // Pool
        /** The command pool that stores all commands */
        this.commands = new CommandPool_1.CommandPool(this);
        /** A map which stores all command aliases */
        this.aliases = new Map();
        /** The event pool that stores all */
        this.events = new EventPool_1.EventPool(this);
        /** The monitor pool that stores all monitors */
        this.monitors = new MonitorPool_1.MonitorPool(this);
        /** The Map that stores command cooldowns */
        this.cooldowns = new Map();
        /** An array of owners */
        this.owners = new Array();
        // Additional options
        /** An array containing all the prefixes */
        this.prefixes = new Array();
        this.options.displayErrors = (_a = options.displayErrors) !== null && _a !== void 0 ? _a : true;
        this.options.useMentionPrefix = (_b = options.useMentionPrefix) !== null && _b !== void 0 ? _b : true;
        this.options.useUsernamePrefix = (_c = options.useUsernamePrefix) !== null && _c !== void 0 ? _c : true;
        if (options === null || options === void 0 ? void 0 : options.prefix) {
            if (Array.isArray(options.prefix))
                this.prefixes.push(...options.prefix);
            else
                this.prefixes.push(options.prefix);
        }
        this.on('error', error => {
            if (this.options.displayErrors)
                console.error(`[Error] ${error}`);
        });
        if (options === null || options === void 0 ? void 0 : options.owners)
            this.owners.push(...options.owners);
    }
    /** Returns a Map containing every Moonlight pool */
    get pools() {
        return new Map([...this.commands, ...this.events, ...this.monitors]);
    }
    /**
     * The function that initiates the bot and then logs the client in, establishing a websocket connection to Discord.
     * @param token Token of the bot account to log in with
     * @returns Token
     * @example(client.login('token'))
     */
    async login(token) {
        const stopwatch = new util_1.Stopwatch();
        // Initialize all the pools
        await Promise.all([
            this.events.init(),
            this.commands.init(),
            this.monitors.init()
        ]);
        stopwatch.stop();
        console.info(`Loaded everything in: ${stopwatch.getElapsedHuman}`);
        this.events.forEach(event => {
            if (event.disabled)
                return;
            if (event.once)
                return this.once(event.event, (...arg) => event.run(...arg));
            this.on(event.event, (...arg) => event.run(...arg));
        });
        // Finally login
        return super.login(token);
    }
}
exports.MoonlightClient = MoonlightClient;
;
//# sourceMappingURL=Client.js.map