"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasePool = void 0;
const klaw_1 = __importDefault(require("klaw"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const __1 = require("../../../..");
const util_1 = require("../../../util");
/** @abstract */
class BasePool extends Map {
    constructor(client, name, type) {
        super();
        this.client = client;
        this.name = name;
        this.type = type;
    }
    /** Initialize the pool */
    async init() {
        // We define the array that will hold the files returned by walk 
        let files;
        // Try walking over the core and user directories, and if it somehow fails then call init again 
        try {
            files = await this._walk();
        }
        catch (err) {
            return this.init();
        }
        // Try to load all the files into the pool
        try {
            const stopwatch = new util_1.Stopwatch();
            await Promise.all(files.map(async (file) => await this.load(file.path)));
            stopwatch.stop();
            console.info(`Loaded ${this.size} ${this.name} in ${stopwatch.getElapsedHuman}!`);
            return true;
        }
        catch (err) {
            // If something went wrong then emit an error event and throw the error
            this.client.emit('error', err);
            return false;
        }
    }
    /**
     * Loads a class into the pool
     * @param filePath The path to the file
     */
    async load(filePath) {
        var _a, _b;
        try {
            // If the file is cached then delete that cache
            if (require.cache[filePath])
                delete require.cache[filePath];
            // Require the file and use the default export, if there is one
            let req = require(filePath);
            if (req.default)
                req = req.default;
            if (typeof req !== 'function')
                throw `The file at ${filePath} is not a class / function.`;
            // Initialize the class and check if it's an instance of the base type provided in the constructor
            const init = new req(this.client, this);
            if ((init instanceof this.type) == false)
                throw `The file at ${filePath} doesn't appear to be an instance of ${this.type.name}`;
            // If the user provided a name in the options then use that, otherwise use the name of the file
            const name = (_b = (_a = init.name) === null || _a === void 0 ? void 0 : _a.toLowerCase()) !== null && _b !== void 0 ? _b : path_1.default.parse(filePath).name.toLowerCase();
            // If the class is an instance of Command then do some extra stuff
            if (init instanceof __1.Command) {
                if (init.aliases && Array.isArray(init.aliases)) {
                    init.aliases.forEach(alias => this.client.aliases.set(alias.toLowerCase(), name));
                }
                const category = path_1.default.parse(filePath).dir.split('commands\\')[1];
                init.category = category !== null && category !== void 0 ? category : 'Uncategorized';
            }
            // Dynamically instert the reload function into the class
            init.reload = function () {
                return this.pool.load(filePath);
            };
            // Finally set the class into the system
            super.set(name, init);
            return true;
        }
        catch (err) {
            // If something went wrong then emit an error event and throw the error
            this.client.emit('error', err);
            return false;
        }
    }
    /** Returns an array of all the core and user files */
    _walk() {
        return new Promise((resolve, reject) => {
            const items = new Array();
            klaw_1.default(path_1.default.join(this.client.mainDir, this.name))
                .on('data', item => items.push(item))
                .on('end', async () => {
                if (!await fs_extra_1.default.pathExists(path_1.default.join(this.client.coreDir, this.name))) {
                    const filtered = items.filter(item => item.path.endsWith('.js'));
                    return resolve(filtered);
                }
                ;
                klaw_1.default(path_1.default.join(this.client.coreDir, this.name))
                    .on('data', item => items.push(item))
                    .on('end', () => {
                    const filtered = items.filter(item => item.path.endsWith('.js'));
                    resolve(filtered);
                });
            })
                .on('error', () => {
                fs_extra_1.default.ensureDir(path_1.default.join(this.client.mainDir, this.name))
                    .then(() => reject())
                    .catch(err => new Error(err));
            });
        });
    }
}
exports.BasePool = BasePool;
//# sourceMappingURL=BasePool.js.map