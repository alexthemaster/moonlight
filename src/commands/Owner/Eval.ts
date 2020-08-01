import { Command } from '../../lib/structures/Command';
import { MoonlightClient } from '../../lib/Client';
import { BasePool } from '../../lib/structures/Pools/Base/BasePool';
import { Stopwatch } from '../../lib/util';
import { Message } from 'discord.js';

/** @ignore */
export default class extends Command {
    constructor(client: MoonlightClient, pool: BasePool<string, Command>) {
        super(client, pool, {
            ownerOnly: true,
            usage: '<toEval:string>',
            description: "Evaluates JavaScript. You can use the --async flag to be able to use await inside the command (be sure to have a return statement!)"
        });

        this.customizeResponse('toEval', 'Please provide a string to eval!');
    }

    public async run(message: Message, args: EvalCommandArgs) {
        const stopwatch = new Stopwatch();

        let evaled: string | null = null;
        if (this.flags.has('async')) evaled = await eval(`(async () => {${args.toEval}})()`);
        else evaled = eval(args.toEval);

        stopwatch.stop();

        if (!evaled) return message.channel.send(`The eval didn't return any value!\nTook: ${stopwatch.getElapsedHuman}`);
        return message.channel.send(`\`\`\`js\n${evaled}\`\`\`\nTook: ${stopwatch.getElapsedHuman}`)
    }
}

interface EvalCommandArgs {
    toEval: string;
}