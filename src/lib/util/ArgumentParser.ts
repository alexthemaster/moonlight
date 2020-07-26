import * as Arguments from '../arguments';
import { MoonlightClient } from '../Client';
import { Message } from 'discord.js';

export class ArgumentParser {
    /** The arguments used for parsing the text */
    public args: string[];
    /** The text to be parsed */
    public text: string[];
    /** The delimiter that specifies how to separate the text for checking */
    public delimiter: string | undefined;
    private _client: MoonlightClient;
    private _message: Message;
    private _requiredRegex: RegExp = /\<(.*?)\>/g;
    private _optionalRegex: RegExp = /\[(.*?)\]/g;

    /**
     * @param args The arguments to use when parsing the text
     * @param text The text to parse
     * @param delimiter The delimiter that specifies how to separate the text for checking
     */
    constructor(args: string, text: string, delimiter: string | undefined = undefined, client: MoonlightClient, message: Message) {
        this.args = args.split(/ +/g);
        this.delimiter = delimiter;
        // @ts-expect-error
        this.text = text.split(this.delimiter);
        this._client = client;
        this._message = message;
    }

    public async parse() {
        const parsed: any = {};

        const parsedArgs: ArgsObject = this._parseArguments();

        for (const arg in parsedArgs) {
            const argumentObject = parsedArgs[arg];

            // If there isn't any more text to process and the argument is optional then return, else throw a message
            if (!this.text.length && argumentObject.type === 'optional') return;
            else if (!this.text.length) throw { arg, message: `${arg} is a required argument!` };

            let toParse: string | undefined;

            if (argumentObject.processEverything) {
                const temp = this.text.join(this.delimiter);
                this.text = new Array();
                this.text[0] = temp;
                toParse = temp;
            } else toParse = this.text[0];

            if (!toParse.length) throw { arg, message: `${arg} is a required argument!` };

            // If there isn't an argument type specified then we check for a direct string match, and if the argument is not optional also throw a message 
            if (!argumentObject.argumentType) {
                if (arg !== toParse) {
                    if (argumentObject.type !== 'optional') throw { arg, message: `The argument is supposed to be equal to \`${arg}\`!` };
                    else continue;
                }

                this.text.shift();
                parsed[arg] = arg;
                continue;
            }

            // If the argument type is not something present in the parsers, then thow a message
            if (!Object.keys(Arguments).includes(argumentObject.argumentType)) throw { arg, message: `${argumentObject.argumentType} is not a valid argument type!` };

            else {
                try {
                    // @ts-expect-error
                    parsed[arg] = await Arguments[argumentObject.argumentType](toParse, this._client, this._message)
                } catch (err) {
                    if (argumentObject.type === 'optional') return;
                    throw { arg, message: err };
                }
            }
        }

        return parsed;
    }

    private _parseArguments(): ArgsObject {
        const args: ArgsObject = {};

        // We find each valid argument and parse it, discarding the unvalid (other than required and optional) arguments
        this.args.forEach(argument => {
            if (this._requiredRegex.test(argument)) this._processArgument(argument, args, this._requiredRegex, 'required');
            else if (this._optionalRegex.test(argument)) this._processArgument(argument, args, this._optionalRegex, 'optional');
        });

        return args;
    };

    private _processArgument(argument: string, argumentObject: ArgsObject, regex: RegExp, type: ArgumentType): void {
        // We match the argument with the given array and remove the first and last characters of it
        const match: string = argument.match(regex)!.map(string => string.slice(1, string.length).slice(0, -1))[0];

        // We split the argument in two, where it's the case
        const split = match.split(':');

        let arg: string = split[0];

        // Whether or not to process the rest of the text with this argument
        let processEverything: boolean = false;
        // The asterisks is the character that tells us to process the rest of the text with just this one argument
        if (arg.startsWith('*')) {
            arg = arg.slice(1, arg.length);
            processEverything = true;
        };

        const argType: string = split[1];
        argumentObject[arg] = { type, argumentType: argType ?? null, processEverything };
    }
}

interface Argument {
    type: ArgumentType;
    argumentType: any;
    processEverything: boolean;
}

type ArgsObject = { [key: string]: Argument };

type ArgumentType = 'required' | 'optional';