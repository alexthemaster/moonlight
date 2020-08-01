import { BasePool } from './Base/BasePool';
import { MoonlightClient } from '../../..';
import { Task } from '../Task';

export class TaskPool<K, V> extends BasePool<K, V> {
    constructor(client: MoonlightClient) {
        super(client, 'events', Task);
    }
}