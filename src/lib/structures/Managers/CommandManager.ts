import { MoonlightBaseManager as BaseManager} from './Base/BaseManager';
import { MoonlightClient } from '../../..';
import { Command } from '../Command';

export class CommandManager<K, V> extends BaseManager<K, V> {
    constructor(client: MoonlightClient) {
        super(client, 'commands', Command);
    }
}