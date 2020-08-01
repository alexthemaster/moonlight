export const enum CronNonStandardToStandard {
    "@yearly" = "0 0 1 1 *",
    "@annually" = "0 0 1 1 *",
    "@monthly" = "0 0 1 * *",
    "@weekly" = "0 0 * * 1",
    "@daily" = "0 0 * * *",
    "@hourly" = "0 * * * *"
}