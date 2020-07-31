import { MoonlightClient } from '../Client';
import { Message } from 'discord.js';
export declare class ArgumentParser {
    /** The arguments used for parsing the text */
    args: string[];
    /** The text to be parsed */
    text: string[];
    /** The delimiter that specifies how to separate the text for checking */
    delimiter: string | undefined;
    private _client;
    private _message;
    private _requiredRegex;
    private _optionalRegex;
    /**
     * @param args The arguments to use when parsing the text
     * @param text The text to parse
     * @param delimiter The delimiter that specifies how to separate the text for checking
     */
    constructor(args: string, text: string, delimiter: string | undefined, client: MoonlightClient, message: Message);
    parse(): Promise<any>;
    private _parseArguments;
    private _processArgument;
}
//# sourceMappingURL=ArgumentParser.d.ts.map