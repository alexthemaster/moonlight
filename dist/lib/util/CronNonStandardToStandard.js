"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronNonStandardToStandard = void 0;
var CronNonStandardToStandard;
(function (CronNonStandardToStandard) {
    CronNonStandardToStandard["@yearly"] = "0 0 1 1 *";
    CronNonStandardToStandard["@annually"] = "0 0 1 1 *";
    CronNonStandardToStandard["@monthly"] = "0 0 1 * *";
    CronNonStandardToStandard["@weekly"] = "0 0 * * 1";
    CronNonStandardToStandard["@daily"] = "0 0 * * *";
    CronNonStandardToStandard["@hourly"] = "0 * * * *";
})(CronNonStandardToStandard = exports.CronNonStandardToStandard || (exports.CronNonStandardToStandard = {}));
//# sourceMappingURL=CronNonStandardToStandard.js.map