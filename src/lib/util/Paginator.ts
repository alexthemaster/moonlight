import { MessageEmbed, ReactionCollector, Message, User } from "discord.js";

export class Paginator {
    /** The embed all pages will be based upon */
    public templateEmbed: MessageEmbed | undefined;
    /** The current page */
    public currentPage: number = 1;
    public pages: MessageEmbed[] = [];
    private _collector: ReactionCollector | undefined;
    private _message: Message;
    private _customFooter: string | undefined;
    /** The emojis used for navigation */
    private _navigation: Navigation = {
        initial_page: '⏮️',
        backward: '◀️',
        forward: '▶️',
        last_page: '⏭️',
        stop: '⏹️',
        page: '🔢'
    }

    /**
     * @param message The message sent by the user
     * @param templateEmbed The embed template
     * @param navigation The navigation object containing the emojis, if you want to have it different from the defaults
     */
    constructor(message: Message, templateEmbed?: MessageEmbed, navigation?: Navigation) {
        this._message = message;
        if (templateEmbed) this.templateEmbed = templateEmbed;
        if (navigation) this._navigation = navigation;
    }

    /** Add a page to the embed */
    public add(embedFunction: (embed: MessageEmbed) => MessageEmbed): this {
        this.pages.push(embedFunction(new MessageEmbed(this.templateEmbed)));
        return this;
    }

    /** Start the paginator */
    public async start() {
        // Send a message with the default page embed
        const message = await this._message.channel.send(this.pages[this.currentPage - 1].setFooter(this.footer));
        // React to the sent message with all the navigation emojis
        await Promise.all(Object.values(this._navigation).map(async value => await message.react(value)));
        this._collector = message.createReactionCollector((_reaction, user: User) => user === this._message.author);
        // Use the collector created above to "listen" for new reactions
        this._collector.on('collect', async (reaction) => {
            const action = getKeyByValue(this._navigation, reaction.emoji.name);
            if (!action) return;
            // @ts-expect-error
            await this[action]();
            if (action === 'stop') return;
            await this._updatePage(message);
            await this._removeReactions(message);
        })
    }

    private async _updatePage(message: Message) {
        await message.edit(this.pages[this.currentPage - 1].setFooter(this.footer));
        return this;
    }

    private async _removeReactions(message: Message) {
        // We get the IDs of all users from the cache and create a Set then convert it back to an array to remove duplicates
        const users = [...new Set(message.reactions.cache.map(reaction => reaction.users.cache.filter(user => user !== message.author).map(user => user.id)).flat(undefined))];
        await Promise.all(users.map(user => message.reactions.cache.map(reaction => reaction.users.remove(user as unknown as User))));
    }

    public get footer(): string {
        return this._customFooter ? `${this._customFooter} | ${this.currentPage}/${this.pages.length}` : `${this.currentPage}/${this.pages.length}`;
    }

    /** Set a custom footer to use with the default embed template */
    public setCustomFooter(footer: string) {
        this._customFooter = footer;
    }

    private async _askPage() {
        const tmp = await this._message.channel.send(`What page would you like to jump to?`);
        const tmpPage = await this._message.channel.awaitMessages((message: Message) => message.author === this._message.author && !isNaN(Number(message.content)), { max: 1 });
        await tmp.delete();
        return Number(tmpPage.first()?.content)
    }

    /** Set the page  paginator is on */
    public async page() {
        const page = await this._askPage();
        if (page > this.pages.length) return await this._message.channel.send(`This page number is too big, please retry. (max page number: ${this.pages.length})`);

        this.currentPage = page;
        return this;
    }

    /** Go to the next page */
    public async forward() {
        if (this.currentPage < this.pages.length) this.currentPage += 1;
        return this;
    }

    /** Go to the previous page */
    public async backward() {
        if (this.currentPage >= this.pages.length) this.currentPage -= 1;
        return this;
    }

    /** Jump to the first page */
    public async initial_page() {
        this.currentPage = 1;
        return this;
    }

    /** Jump to the last page */
    public async last_page() {
        this.currentPage = this.pages.length;
        return this;
    }

    /** Stop the paginator */
    public async stop() {
        await this._collector?.message.reactions.removeAll();
        this._collector?.stop();
    }
}

// Big up to this StackOverflow answer for this solution
// https://stackoverflow.com/a/28191966
function getKeyByValue(object: { [x: string]: string; }, value: string) {
    return Object.keys(object).find((key: string) => object[key] === value);
}

type Navigation = {
    /** The emoji used for jumping to the first page */
    'initial_page': string;
    /** The emoji used for going to the previous page */
    'backward': string;
    /** The emoji used for going to the next page */
    'forward': string;
    /** The emoji used for jumping to the last page */
    'last_page': string;
    /** The emoji used to stop the paginator */
    'stop': string;
    /** The emoji used for selecting pages */
    'page': string;
}