"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.member = void 0;
const User_1 = require("./User");
async function member(input, client, message) {
    var _a;
    let member = User_1.userRegex.test(input) ? await ((_a = message.guild) === null || _a === void 0 ? void 0 : _a.members.fetch(User_1.userRegex.exec(input)[1]).catch(err => null)) : null;
    if (member)
        return member;
    throw "Please mention a member or provide a valid member ID!";
}
exports.member = member;
//# sourceMappingURL=Member.js.map