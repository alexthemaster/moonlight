import { MoonlightClient } from '../Client';

export async function channel(input: string, client: MoonlightClient) {
    let channel = channelRegex.test(input) ? await client.channels.fetch(channelRegex.exec(input)![1]).catch(err => null) : null;
    if (channel) return channel;
    throw "Please mention a channel or provide a valid channel ID!"
}

// https://github.com/dirigeants/klasa/blob/master/src/lib/util/constants.ts#L133
// MIT License
export const channelRegex = /^(?:<#)?(\d{17,19})>?$/;