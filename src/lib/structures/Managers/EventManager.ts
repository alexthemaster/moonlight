import { MoonlightBaseManager as BaseManager } from './Base/BaseManager';
import { MoonlightClient } from '../../..';
import { Event } from '../Event';

export class EventManager<K, V> extends BaseManager<K, V> {
    constructor(client: MoonlightClient) {
        super(client, 'events', Event);
    }
}