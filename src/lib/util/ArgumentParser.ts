import * as Arguments from '../arguments';

export class ArgumentParser {
    public args: string[];
    public text: string[];
    public delimiter: string | undefined;
    public parsed: any;
    private _requiredRegex: RegExp = /\<(.*?)\>/g;
    private _optionalRegex: RegExp = /\[(.*?)\]/g;

    constructor(args: string, text: string, delimiter: string | undefined = undefined) {
        this.args = args.split(/ +/g);
        this.delimiter = delimiter;
        // @ts-expect-error
        this.text = text.split(this.delimiter);
        this.parsed = {};

        const parsedArgs: ArgsObject = this._parseArgumentTypes();

        for (const arg in parsedArgs) {
            const argumentObject = parsedArgs[arg];

            if (!this.text.length && argumentObject.type === 'optional') return;
            else if (!this.text.length) throw `${arg} is a required argument!`

            let toParse: string | undefined;
            if (argumentObject.processEverything) {
                const temp = this.text.join(this.delimiter);
                this.text = new Array();
                this.text[0] = temp;
                toParse = temp;
            } else toParse = this.text.shift();

            if (!argumentObject.argumentType) {
                if (arg !== toParse && argumentObject.type !== 'optional') {
                    throw `${toParse} is supposed to be equal to the ${arg} argument`
                }
                else this.parsed[arg] = arg;
                continue;
            }

            if (!Object.keys(Arguments).includes(argumentObject.argumentType)) throw `${argumentObject.argumentType} is not a valid argument type!`;

            else {
                try {
                    // @ts-expect-error
                    this.parsed[arg] = Arguments[argumentObject.argumentType](toParse)
                } catch (err) {
                    if (argumentObject.type === 'optional') return;
                    throw err;
                }
            }
        }
    }

    private _parseArgumentTypes(): ArgsObject {
        const args: ArgsObject = {};

        this.args.forEach(argument => {
            if (this._requiredRegex.test(argument)) this._processArgument(argument, args, this._requiredRegex, 'required');
            else if (this._optionalRegex.test(argument)) this._processArgument(argument, args, this._optionalRegex, 'optional');
        });

        return args;
    };

    private _processArgument(argument: string, argumentObject: ArgsObject, regex: RegExp, type: ArgumentType): void {
        const match: string = argument.match(regex)!.map(string => string.slice(1, string.length).slice(0, -1))[0];
        const split = match.split(':');
        let arg: string = split[0];
        let processEverything: boolean = false;
        if (arg.startsWith('*')) { arg = arg.slice(1, arg.length); processEverything = true; };
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