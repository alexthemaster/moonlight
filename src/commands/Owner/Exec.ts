import { Command } from '../../lib/structures/Command';
import { MoonlightClient } from '../../lib/Client';
import { BasePool } from '../../lib/structures/Pools/Base/BasePool';
import { Stopwatch } from '../../lib/util';
import { Message } from 'discord.js';
import { exec } from 'child_process';
import { promisify } from 'util';

const promiseExec = promisify(exec);

/** @ignore */
export default class extends Command {
    constructor(client: MoonlightClient, pool: BasePool<string, Command>) {
        super(client, pool, { ownerOnly: true, usage: '<toExec:string>' });
        this.customizeResponse('toExec', 'Please provide a string to execute!');
    }

    public async run(message: Message, args: ExecCommandArgs) {
        const stopwatch = new Stopwatch();
        const result = await promiseExec(args.toExec, { timeout: 60 });
        stopwatch.stop();

        return message.channel.send(`
stdout: \`\`\`${result.stdout}\`\`\`
${result.stderr && result.stderr.length ? `stderr: \`\`\`${result.stderr}\`\`\`` : ''}
Took: ${stopwatch.getElapsedHuman}
        `)
    }
}

interface ExecCommandArgs {
    toExec: string;
}