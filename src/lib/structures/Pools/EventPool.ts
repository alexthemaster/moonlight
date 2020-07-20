import { BasePool } from './Base/BasePool';
import { MoonlightClient } from '../../..';
import { Event } from '../Event';

export class EventPool<K, V> extends BasePool<K, V> {
    constructor(client: MoonlightClient) {
        super(client, 'events', Event);
    }
}