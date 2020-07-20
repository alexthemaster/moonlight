import { BasePool } from './Base/BasePool';
import { MoonlightClient } from '../../..';
import { Monitor } from '../Monitor';

export class MonitorPool<K, V> extends BasePool<K, V> {
    constructor(client: MoonlightClient) {
        super(client, 'monitors', Monitor);
    }
}