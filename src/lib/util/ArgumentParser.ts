export class ArgumentParser {
    public args: string[];
    public text: string;
    private _requiredRegex: RegExp = /\<(.*?)\>/g;
    private _optionalRegex: RegExp = /\[(.*?)\]/g;

    constructor(args: string[], text: string) {
        this.args = args;
        this.text = text;

        console.log(this._parseArgumentTypes())
    }

    private _parseArgumentTypes(): ArgsObject {
        const args: ArgsObject = {};

        this.args.forEach(argument => {
            if (this._requiredRegex.test(argument)) this._processRegex(this._requiredRegex, args, argument, 'required');
            else if (this._optionalRegex.test(argument)) this._processRegex(this._optionalRegex, args, argument, 'optional');
        });

        return args;
    };

    private _processRegex(regex: RegExp, argumentObject: ArgsObject, argument: string, type: ArgumentType): void {
        const match: string = argument.match(regex)!.map(string => string.slice(1, string.length).slice(0, -1))[0];
        const split = match.split(':');
        const arg = split[0];
        const argType: string = split[1];
        argumentObject[arg] = { type, argumentType: argType ?? null };
    }
}

interface Argument {
    type: ArgumentType;
    argumentType: any;
}

type ArgsObject = { [key: string]: Argument };

type ArgumentType = 'required' | 'optional';