"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.channelRegex = exports.channel = void 0;
async function channel(input, client) {
    let channel = exports.channelRegex.test(input) ? await client.channels.fetch(exports.channelRegex.exec(input)[1]).catch(err => null) : null;
    if (channel)
        return channel;
    throw "Please mention a channel or provide a valid channel ID!";
}
exports.channel = channel;
// https://github.com/dirigeants/klasa/blob/master/src/lib/util/constants.ts#L133
// MIT License
exports.channelRegex = /^(?:<#)?(\d{17,19})>?$/;
//# sourceMappingURL=Channel.js.map