import { BasePool } from './Base/BasePool';
import { MoonlightClient } from '../../..';
import { Command } from '../Command';

export class CommandPool<K, V> extends BasePool<K, V> {
    constructor(client: MoonlightClient) {
        super(client, 'commands', Command);
    }
}