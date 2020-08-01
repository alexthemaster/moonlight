"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const BasePiece_1 = require("./BasePiece");
const util_1 = require("../util");
const cron_1 = require("cron");
/**
 * [[include:creatingTasks.md]]
 * @abstract
 */
class Task extends BasePiece_1.BasePiece {
    constructor(client, pool, options) {
        super(client, pool, options);
        this._job = null;
        this.time = options.time;
        if (this.disabled)
            return;
        this._createJob();
    }
    ;
    enable() {
        if (!this.disabled)
            return;
        this.disabled = false;
        this._createJob();
    }
    disable() {
        if (this.disabled)
            return;
        this.disabled = true;
        this._job = null;
    }
    _createJob() {
        var _a;
        // @ts-expect-error
        const time = (this.time instanceof Date) ? this.time : (_a = util_1.CronNonStandardToStandard[this.time]) !== null && _a !== void 0 ? _a : this.time;
        this._job = new cron_1.CronJob(time, () => {
            this.run();
        });
        this._job.start();
    }
}
exports.Task = Task;
//# sourceMappingURL=Task.js.map