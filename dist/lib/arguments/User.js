"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRegex = exports.user = void 0;
async function user(input, client) {
    let user = exports.userRegex.test(input) ? await client.users.fetch(exports.userRegex.exec(input)[1]).catch(err => null) : null;
    if (user)
        return user;
    throw "Please mention a user or provide a valid user ID!";
}
exports.user = user;
// https://github.com/dirigeants/klasa/blob/master/src/lib/util/constants.ts#L132
// MIT License
exports.userRegex = /^(?:<@!?)?(\d{17,19})>?$/;
//# sourceMappingURL=User.js.map