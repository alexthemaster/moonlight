import { Command } from '../../lib/structures/Command';
import { MoonlightClient } from '../../lib/Client';
import { BasePool } from '../../lib/structures/Pools/Base/BasePool';
import { Stopwatch } from '../../lib/util';
import { inspect } from 'util';
import { Message } from 'discord.js';

/** @ignore */
export default class extends Command {
    constructor(client: MoonlightClient, pool: BasePool<string, Command>) {
        super(client, pool, {
            ownerOnly: true,
            description: "Evaluates JavaScript. You can use the --async flag to be able to use await inside the command (be sure to have a return statement!) or the --inspect=number (number being the depth of the inspection) flag to display more things inside an object!",
            usage: '<toEval:string>'
        });

        this.customizeResponse('toEval', 'Please provide a string to eval!');
    }

    public async run(message: Message, args: EvalCommandArgs) {
        const stopwatch = new Stopwatch();

        let evaled: string;
        if (this.flags.has('async')) evaled = await eval(`(async () => {${args.toEval}})()`);
        else evaled = eval(args.toEval);

        stopwatch.stop();

        if (this.flags.has('inspect')) evaled = inspect(evaled, undefined, Number(this.flags.get('inspect')) || undefined);

        evaled = String(evaled);
        if (!evaled.length) return message.channel.send(`The eval didn't return any value!\nTook: ${stopwatch.getElapsedHuman}`);
        if (evaled.length >= 1940) return message.channel.send(`Output too long... attached the output in a file!\nTook: ${stopwatch.getElapsedHuman}`, { files: [{ name: 'output.txt', attachment: Buffer.from(evaled) }] });
        return message.channel.send(`\`\`\`js\n${evaled}\`\`\`\nTook: ${stopwatch.getElapsedHuman}`)
    }
}

interface EvalCommandArgs {
    toEval: string;
}