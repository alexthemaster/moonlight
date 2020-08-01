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
    public time: string | Date;
    private _job: CronJob | null = null;;

    constructor(client: MoonlightClient, pool: BasePool<string, Task>, options: TaskOptions) {
        super(client, pool, options);
        this.time = options.time;

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
        const time = (this.time instanceof Date) ? this.time : CronNonStandardToStandard[this.time] ?? this.time;

        this._job = new CronJob(time, () => {
            this.run();
        });

        this._job.start();
    }
}

interface TaskOptions extends BasePieceOptions {
    time: string | Date;
}