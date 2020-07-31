export declare class Stopwatch {
    private _startTime;
    private _stopTime;
    private _digits;
    private _stopped;
    /**
     * Starts the Stopwatch
     * @param digits The number of digits to appear after the decimal point when returning the a human readable format
     */
    constructor(digits?: number);
    /** Reset the stopwatch  */
    reset(): this;
    /** Start the stopwatch */
    private _start;
    /** Stop the stopwatch */
    stop(): this;
    /** Returns the elapsed time in nanoseconds */
    get getElapsed(): bigint;
    /** Returns the elased time in a human readable format */
    get getElapsedHuman(): string;
}
//# sourceMappingURL=Stopwatch.d.ts.map