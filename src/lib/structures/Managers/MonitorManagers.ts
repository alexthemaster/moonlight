import { MoonlightBaseManager as BaseManager } from './Base/BaseManager';
import { MoonlightClient } from '../../..';
import { Monitor } from '../Monitor';

export class MonitorManager<K, V> extends BaseManager<K, V> {
    constructor(client: MoonlightClient) {
        super(client, 'monitors', Monitor);
    }
}