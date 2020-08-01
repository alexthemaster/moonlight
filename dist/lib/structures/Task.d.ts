import { MoonlightClient } from '../..';
import { BasePool } from './Pools/Base/BasePool';
import { BasePiece, BasePieceOptions } from './BasePiece';
/**
 * [[include:creatingTasks.md]]
 * @abstract
 */
export declare class Task extends BasePiece<Task> {
    time: string | Date;
    private _job;
    constructor(client: MoonlightClient, pool: BasePool<string, Task>, options: TaskOptions);
    enable(): void;
    disable(): void;
    private _createJob;
}
interface TaskOptions extends BasePieceOptions {
    time: string | Date;
}
export {};
//# sourceMappingURL=Task.d.ts.map