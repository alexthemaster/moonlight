import BaseManager from './Base/BaseManager';
import { MoonlightClient } from '../../..';
import Event from '../Event';

/**
 * @extends MoonlightBaseManager
 * @property {Event} type The class type the manager holds
 */
export default class EventManager<K, V> extends BaseManager<K, V> {
    constructor(client: MoonlightClient) {
        super(client, 'events', Event);
    }
}