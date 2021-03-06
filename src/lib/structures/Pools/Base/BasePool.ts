import klaw, { Item } from 'klaw';
import fs from 'fs-extra';
import path from 'path';
import os from 'os';
import { MoonlightClient, Command } from '../../../..';
import { Stopwatch } from '../../../util';

export abstract class BasePool<K, V> extends Map<K, V> {
    public readonly client: MoonlightClient;
    /** The name of the pool */
    public readonly name: string;
    /** The class type the pool holds */
    public readonly type: unknown;

    constructor(client: MoonlightClient, name: string, type: unknown) {
        super();

        this.client = client;
        this.name = name;
        this.type = type;
    }

    /** Initialize the pool */
    public async init(): Promise<boolean> {
        // We define the array that will hold the files returned by walk 
        let files: Item[];

        // Try walking over the core and user directories, and if it somehow fails then call init again 
        try {
            files = await this._walk()
        } catch (err) {
            return this.init()
        }

        // Try to load all the files into the pool
        try {
            const stopwatch = new Stopwatch();
            await Promise.all(files.map(async file => await this.load(file.path)));
            stopwatch.stop();

            console.info(`Loaded ${this.size} ${this.name} in ${stopwatch.getElapsedHuman}!`);
            return true;
        } catch (err) {

            // If something went wrong then emit an error event and throw the error
            this.client.emit('error', err);
            return false;
        }
    }

    /**
     * Loads a class into the pool
     * @param filePath The path to the file 
     */
    public async load(filePath: string): Promise<boolean> {
        try {
            // If the file is cached then delete that cache
            if (require.cache[filePath]) delete require.cache[filePath];

            // Require the file and use the default export, if there is one
            let req = require(filePath);
            if (req.default) req = req.default;

            if (typeof req !== 'function') throw `The file at ${filePath} is not a class / function.`;


            // Initialize the class and check if it's an instance of the base type provided in the constructor
            const init = new req(this.client, this);
            if ((init instanceof (this.type as Function)) == false) throw `The file at ${filePath} doesn't appear to be an instance of ${(this.type as Function).name}`;

            // If the user provided a name in the options then use that, otherwise use the name of the file
            const name = init.name?.toLowerCase() ?? path.parse(filePath).name.toLowerCase();


            // Replace the name of the piece
            init.name = name;

            // If the class is an instance of Command then do some extra stuff
            if (init instanceof Command) {
                if (init.aliases && Array.isArray(init.aliases)) {
                    init.aliases.forEach(alias => this.client.aliases.set(alias.toLowerCase(), name))
                }

                const category = (os.platform() === 'win32') ? path.parse(filePath).dir.split('commands\\')[1] : path.parse(filePath).dir.split('commands/')[1];
                init.category = category ?? 'Uncategorized';
            }

            // Dynamically instert the reload function into the class
            init.reload = function () {
                return this.pool.load(filePath);
            }

            // Finally set the class into the system
            super.set(name, init);
            return true;
        } catch (err) {

            // If something went wrong then emit an error event and throw the error
            this.client.emit('error', err);
            return false;
        }
    }

    /** Returns an array of all the core and user files */
    private _walk(): Promise<Item[]> {
        return new Promise(async (resolve, reject) => {
            const items: Item[] = new Array();
            if (await fs.pathExists(path.join(this.client.coreDir, this.name))) {
                klaw(path.join(this.client.coreDir, this.name))
                    .on('data', item => items.push(item))
                    .on('end', () => {
                        klaw(path.join(this.client.mainDir, this.name))
                            .on('data', item => items.push(item))
                            .on('end', () => {
                                const filtered = items.filter(item => item.path.endsWith('.js'));
                                return resolve(filtered);
                            })
                            .on('error', () => {
                                fs.ensureDir(path.join(this.client.mainDir, this.name))
                                    .then(() => reject())
                                    .catch(err => new Error(err))
                            });
                    });
            } else {
                klaw(path.join(this.client.mainDir, this.name))
                    .on('data', item => items.push(item))
                    .on('end', () => {
                        const filtered = items.filter(item => item.path.endsWith('.js'));
                        return resolve(filtered);
                    })
                    .on('error', () => {
                        fs.ensureDir(path.join(this.client.mainDir, this.name))
                            .then(() => reject())
                            .catch(err => new Error(err))
                    });
            }
        });
    }
}