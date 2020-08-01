"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../../lib/structures/Command");
const util_1 = require("../../lib/util");
const child_process_1 = require("child_process");
const util_2 = require("util");
const promiseExec = util_2.promisify(child_process_1.exec);
/** @ignore */
class default_1 extends Command_1.Command {
    constructor(client, pool) {
        super(client, pool, { ownerOnly: true, usage: '<toExec:string>' });
        this.customizeResponse('toExec', 'Please provide a string to execute!');
    }
    async run(message, args) {
        const stopwatch = new util_1.Stopwatch();
        const result = await promiseExec(args.toExec, { timeout: 60 });
        stopwatch.stop();
        return message.channel.send(`
stdout: \`\`\`${result.stdout}\`\`\`
${result.stderr && result.stderr.length ? `stderr: \`\`\`${result.stderr}\`\`\`` : ''}
Took: ${stopwatch.getElapsedHuman}
        `);
    }
}
exports.default = default_1;
//# sourceMappingURL=Exec.js.map