"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../../lib/structures/Command");
const util_1 = require("../../lib/util");
const util_2 = require("util");
/** @ignore */
class default_1 extends Command_1.Command {
    constructor(client, pool) {
        super(client, pool, {
            ownerOnly: true,
            description: "Evaluates JavaScript. You can use the --async flag to be able to use await inside the command (make sure you have a return statement!) or the --inspect=number (number being the depth of the inspection) flag to display more things inside an object!",
            usage: '<toEval:string>'
        });
        this.customizeResponse('toEval', 'Please provide a string to eval!');
    }
    async run(message, args) {
        const stopwatch = new util_1.Stopwatch();
        let evaled;
        if (this.flags.has('async'))
            evaled = await eval(`(async () => {${args.toEval}})()`);
        else
            evaled = eval(args.toEval);
        stopwatch.stop();
        if (this.flags.has('inspect'))
            evaled = util_2.inspect(evaled, undefined, Number(this.flags.get('inspect')) || undefined);
        evaled = String(evaled);
        if (!evaled.length)
            return message.channel.send(`The eval didn't return any value!\nTook: ${stopwatch.getElapsedHuman}`);
        if (evaled.length >= 1940)
            return message.channel.send(`Output too long... attached the output in a file!\nTook: ${stopwatch.getElapsedHuman}`, { files: [{ name: 'output.txt', attachment: Buffer.from(evaled) }] });
        return message.channel.send(`\`\`\`js\n${evaled}\`\`\`\nTook: ${stopwatch.getElapsedHuman}`);
    }
}
exports.default = default_1;
//# sourceMappingURL=Eval.js.map