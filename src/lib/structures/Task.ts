import { MoonlightClient } from '../..';
import { BasePool } from './Pools/Base/BasePool';
import { BasePiece, BasePieceOptions } from './BasePiece';
import { CronNonStandardToStandard } from '../util'
import { CronJob } from 'cron';

/**
 * [[include:creatingTasks.md]]
 * @abstract
 */
export class Task extends BasePiece<Task> {
    public cron: string;
    private _job: CronJob | null = null;;

    constructor(client: MoonlightClient, pool: BasePool<string, Task>, options: TaskOptions) {
        super(client, pool, options);
        this.cron = options.cron;
        if (this.disabled) return;
        this._createJob();
    }

    public enable(): void {
        if (!this.disabled) return;
        this.disabled = false;
        this._createJob();
    }

    public disable(): void {
        if (this.disabled) return;
        this.disabled = true;
        this._job = null;
    }

    private _createJob(): void {
        // @ts-expect-error
        const time = CronNonStandardToStandard[this.cron] ?? this.cron;
        this._job = new CronJob(time, () => {
            this.run();
        });
        this._job.start();
    }
}

interface TaskOptions extends BasePieceOptions {
    cron: string;
}