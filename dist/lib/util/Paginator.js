"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Paginator = void 0;
const discord_js_1 = require("discord.js");
class Paginator {
    /**
     * @param message The message sent by the user
     * @param templateEmbed The embed template
     * @param navigation The navigation object containing the emojis, if you want it to be different from the default
     */
    constructor(message, templateEmbed, navigation) {
        /** The current page */
        this.currentPage = 1;
        this.pages = [];
        /** The emojis used for navigation */
        this._navigation = {
            first_page: '⏮️',
            backward: '◀️',
            forward: '▶️',
            last_page: '⏭️',
            stop: '⏹️',
            page: '🔢'
        };
        this._message = message;
        if (templateEmbed)
            this.templateEmbed = templateEmbed;
        if (navigation)
            this._navigation = navigation;
    }
    /** Start the paginator */
    async start() {
        // Send a message with the default page embed
        const message = await this._message.channel.send(this.pages[this.currentPage - 1].setFooter(this.footer));
        this._collector = message.createReactionCollector((_reaction, user) => user === this._message.author);
        // Use the collector created above to "listen" for new reactions
        this._collector.on('collect', async (reaction) => {
            const action = getKeyByValue(this._navigation, reaction.emoji.name);
            if (!action)
                return;
            // @ts-expect-error
            await this[action]();
            if (action === 'stop')
                return;
            await this._updatePage(message);
            await this._removeReactions(message);
        });
        // React to the sent message with all the navigation emojis
        await Promise.all(Object.values(this._navigation).map(async (value) => await message.react(value)));
    }
    /** Add a page to the embed */
    add(embedFunction) {
        this.pages.push(embedFunction(new discord_js_1.MessageEmbed(this.templateEmbed)));
        return this;
    }
    /** Set a custom footer to use with the default embed template */
    setCustomFooter(footer) {
        this._customFooter = footer;
    }
    async _updatePage(message) {
        await message.edit(this.pages[this.currentPage - 1].setFooter(this.footer));
        return this;
    }
    async _askPage() {
        var _a;
        const tmp = await this._message.channel.send(`What page would you like to jump to?`);
        const tmpPage = await this._message.channel.awaitMessages((message) => message.author === this._message.author && !isNaN(Number(message.content)), { max: 1 });
        await tmp.delete();
        return Number((_a = tmpPage.first()) === null || _a === void 0 ? void 0 : _a.content);
    }
    async _removeReactions(message) {
        // We get the IDs of all users from the cache and create a Set, then convert it back to an array to remove duplicates
        const users = [...new Set(message.reactions.cache.map(reaction => reaction.users.cache.filter(user => user !== message.author).map(user => user.id)).flat(undefined))];
        await Promise.all(users.map(user => message.reactions.cache.map(reaction => reaction.users.remove(user))));
    }
    /** Jump to a page */
    async page() {
        const page = await this._askPage();
        if (page > this.pages.length) {
            const tmp = await this._message.channel.send(`This page number is too large, please try again. (max page number: ${this.pages.length})`);
            setTimeout(async () => {
                if (!tmp.deleted)
                    await tmp.delete();
            }, 10000);
            return this;
        }
        this.currentPage = page;
        return this;
    }
    /** Go to the next page */
    async forward() {
        if (this.currentPage < this.pages.length)
            this.currentPage += 1;
        return this;
    }
    /** Go to the previous page */
    async backward() {
        if (this.currentPage >= 2)
            this.currentPage -= 1;
        return this;
    }
    /** Jump to the first page */
    async first_page() {
        this.currentPage = 1;
        return this;
    }
    /** Jump to the last page */
    async last_page() {
        this.currentPage = this.pages.length;
        return this;
    }
    /** Stop the paginator */
    async stop() {
        var _a, _b;
        await ((_a = this._collector) === null || _a === void 0 ? void 0 : _a.message.reactions.removeAll());
        (_b = this._collector) === null || _b === void 0 ? void 0 : _b.stop();
    }
    get footer() {
        return this._customFooter ? `${this._customFooter} | ${this.currentPage}/${this.pages.length}` : `${this.currentPage}/${this.pages.length}`;
    }
}
exports.Paginator = Paginator;
// Big up to this StackOverflow answer for this solution
// https://stackoverflow.com/a/28191966
function getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value);
}
//# sourceMappingURL=Paginator.js.map