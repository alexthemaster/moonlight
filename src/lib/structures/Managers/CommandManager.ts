import { MoonlightBaseManager as BaseManager} from './Base/BaseManager';
import { MoonlightClient } from '../../..';
import { Command } from '../Command';

/**
 * @extends MoonlightBaseManager
 * @property {Command} type The class type the manager holds
 */
export class CommandManager<K, V> extends BaseManager<K, V> {
    constructor(client: MoonlightClient) {
        super(client, 'commands', Command);
    }
}