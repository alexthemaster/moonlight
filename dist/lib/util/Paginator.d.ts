import { MessageEmbed, Message } from "discord.js";
export declare class Paginator {
    /** The embed all pages will be based on */
    templateEmbed: MessageEmbed | undefined;
    /** The current page */
    currentPage: number;
    pages: MessageEmbed[];
    private _collector;
    private _message;
    private _customFooter;
    /** The emojis used for navigation */
    private _navigation;
    /**
     * @param message The message sent by the user
     * @param templateEmbed The embed template
     * @param navigation The navigation object containing the emojis, if you want it to be different from the default
     */
    constructor(message: Message, templateEmbed?: MessageEmbed, navigation?: Navigation);
    /** Start the paginator */
    start(): Promise<void>;
    /** Add a page to the embed */
    add(embedFunction: (embed: MessageEmbed) => MessageEmbed): this;
    /** Set a custom footer to use with the default embed template */
    setCustomFooter(footer: string): void;
    private _updatePage;
    private _askPage;
    private _removeReactions;
    /** Jump to a page */
    page(): Promise<this>;
    /** Go to the next page */
    forward(): Promise<this>;
    /** Go to the previous page */
    backward(): Promise<this>;
    /** Jump to the first page */
    first_page(): Promise<this>;
    /** Jump to the last page */
    last_page(): Promise<this>;
    /** Stop the paginator */
    stop(): Promise<void>;
    get footer(): string;
}
declare type Navigation = {
    /** The emoji used for jumping to the first page */
    'first_page': string;
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
};
export {};
//# sourceMappingURL=Paginator.d.ts.map