import { MoonlightClient } from "../..";
import { BasePool } from './Pools/Base/BasePool';
import { BasePiece, BasePieceOptions } from './BasePiece';

/**
 * @abstract
 */
export class Task extends BasePiece<Task> {
    constructor(client: MoonlightClient, pool: BasePool<string, Task>, options: TaskOptions) {
        super(client, pool, options);
    }
}

interface TaskOptions extends BasePieceOptions {

}