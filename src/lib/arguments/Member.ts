import { MoonlightClient } from '../Client';
import { userRegex } from './User';
import { Message } from 'discord.js';

export async function member(input: string, client: MoonlightClient, message: Message) {
    let member = userRegex.test(input) ? await message.guild?.members.fetch(userRegex.exec(input)![1]).catch(err => null) : null;
    if (member) return member;
    throw "Please mention a member or provide a valid member ID!"
}