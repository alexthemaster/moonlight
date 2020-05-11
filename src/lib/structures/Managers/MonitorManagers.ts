import BaseManager from './Base/BaseManager';
import { MoonlightClient } from '../../..';
import Monitor from '../Monitor';

/**
 * @extends MoonlightBaseManager
 * @property {Monitor} type The class type the manager holds
 */
export default class MonitorManager<K, V> extends BaseManager<K, V> {
    constructor(client: MoonlightClient) {
        super(client, 'monitors', Monitor);
    }
}