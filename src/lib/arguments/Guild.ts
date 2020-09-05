import { MoonlightClient } from '../Client';

async function guild(input: string, client: MoonlightClient) {
    let guild = await client.guilds.fetch(input).catch(err => null) || null;
    if (guild) return guild;
    throw "Please provide a valid guild ID!"
}

export { guild, guild as server }