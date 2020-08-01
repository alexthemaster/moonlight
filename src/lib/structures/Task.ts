import { MoonlightClient } from "../..";
import { BasePool } from './Pools/Base/BasePool';
import { BasePiece, BasePieceOptions } from './BasePiece';

/**
 * [[include:creatingTasks.md]]
 * @abstract
 */
export class Task extends BasePiece<Task> {
    public cron: string;

    constructor(client: MoonlightClient, pool: BasePool<string, Task>, options: TaskOptions) {
        super(client, pool, options);
        this.cron = options.cron;
    }
}

interface TaskOptions extends BasePieceOptions {
    cron: string;
}