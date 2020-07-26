import { MoonlightClient } from '../Client';

export async function user(input: string, client: MoonlightClient) {
    let user = userRegex.test(input) ? await client.users.fetch(userRegex.exec(input)![1]).catch(err => null) : null;
    if (user) return user;
    throw "Please mention a user or provide a valid user ID!"
}

// https://github.com/dirigeants/klasa/blob/master/src/lib/util/constants.ts#L132
// MIT License
export const userRegex = /^(?:<@!?)?(\d{17,19})>?$/;