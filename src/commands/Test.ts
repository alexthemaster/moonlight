import Command from '../lib/structures/Command';
import MoonlightClient from '../lib/Client';
import BaseManager from '../lib/structures/Managers/Base/BaseManager';
import { Message } from 'discord.js';

export default class extends Command {
    constructor(client: MoonlightClient, manager: BaseManager<string, Command>) {
        super(client, manager);
    }

    public async run(message: Message) {

    }
}