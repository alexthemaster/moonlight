// Inspired by Klasa's Stopwatch https://github.com/dirigeants/klasa/blob/master/src/lib/util/Stopwatch.js
// MIT License

export class Stopwatch {
    private _startTime!: bigint;
    private _stopTime: bigint | null;

    private _digits: number;

    private _stopped: boolean;

    /** 
     * Starts the Stopwatch
     * @param digits The number of digits to appear after the decimal point when returning the a human readable format
     */
    constructor(digits: number = 2) {
        this._digits = digits;

        this._stopped = false;
        this._stopTime = null;

        this._start();
    };

    /** Reset the stopwatch  */
    public reset(): this {
        this._stopped = false;
        this._start();

        return this;
    }

    /** Start the stopwatch */
    private _start(): void {
        this._startTime = process.hrtime.bigint();
    }

    /** Stop the stopwatch */
    public stop(): this {
        this._stopped = true;
        this._stopTime = process.hrtime.bigint();

        return this;
    }

    /** Returns the elapsed time in nanoseconds */
    public get getElapsed(): bigint {
        return (this._stopped && this._stopTime) ? this._stopTime - this._startTime : process.hrtime.bigint() - this._startTime;
    }

    /** Returns the elased time in a human readable format */
    public get getElapsedHuman(): string {
        const time: number = Number(this.getElapsed);

        if (time >= Measurements.MINUTES) return `${(time / Measurements.MINUTES).toFixed(this._digits)}m`;
        if (time >= Measurements.SECONDS) return `${(time / Measurements.SECONDS).toFixed(this._digits)}s`;
        if (time >= Measurements.MILLISECONDS) return `${(time / Measurements.MILLISECONDS).toFixed(this._digits)}ms`;
        if (time >= Measurements.MICROSECONDS) return `${(time / Measurements.MICROSECONDS).toFixed(this._digits)}µs`;
        return `${time}ns`;
    }
}

const enum Measurements {
    MICROSECONDS = 1000,
    MILLISECONDS = 1000000,
    SECONDS = Measurements.MILLISECONDS * 1000,
    MINUTES = Measurements.SECONDS * 60
}