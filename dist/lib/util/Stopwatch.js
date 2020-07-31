"use strict";
// Inspired by Dirigeants's Stopwatch https://github.com/dirigeants/stopwatch
// MIT License
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stopwatch = void 0;
class Stopwatch {
    /**
     * Starts the Stopwatch
     * @param digits The number of digits to appear after the decimal point when returning the a human readable format
     */
    constructor(digits = 2) {
        this._digits = digits;
        this._stopped = false;
        this._stopTime = null;
        this._start();
    }
    ;
    /** Reset the stopwatch  */
    reset() {
        this._stopped = false;
        this._start();
        return this;
    }
    /** Start the stopwatch */
    _start() {
        this._startTime = process.hrtime.bigint();
    }
    /** Stop the stopwatch */
    stop() {
        this._stopped = true;
        this._stopTime = process.hrtime.bigint();
        return this;
    }
    /** Returns the elapsed time in nanoseconds */
    get getElapsed() {
        return (this._stopped && this._stopTime) ? this._stopTime - this._startTime : process.hrtime.bigint() - this._startTime;
    }
    /** Returns the elased time in a human readable format */
    get getElapsedHuman() {
        const time = Number(this.getElapsed);
        if (time >= 60000000000 /* MINUTES */)
            return `${(time / 60000000000 /* MINUTES */).toFixed(this._digits)}m`;
        if (time >= 1000000000 /* SECONDS */)
            return `${(time / 1000000000 /* SECONDS */).toFixed(this._digits)}s`;
        if (time >= 1000000 /* MILLISECONDS */)
            return `${(time / 1000000 /* MILLISECONDS */).toFixed(this._digits)}ms`;
        if (time >= 1000 /* MICROSECONDS */)
            return `${(time / 1000 /* MICROSECONDS */).toFixed(this._digits)}µs`;
        return `${time}ns`;
    }
}
exports.Stopwatch = Stopwatch;
//# sourceMappingURL=Stopwatch.js.map