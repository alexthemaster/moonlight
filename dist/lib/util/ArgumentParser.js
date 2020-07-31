"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArgumentParser = void 0;
const Arguments = __importStar(require("../arguments"));
class ArgumentParser {
    /**
     * @param args The arguments to use when parsing the text
     * @param text The text to parse
     * @param delimiter The delimiter that specifies how to separate the text for checking
     */
    constructor(args, text, delimiter, client, message) {
        this._requiredRegex = /\<(.*?)\>/g;
        this._optionalRegex = /\[(.*?)\]/g;
        this.args = args.split(/ +/g);
        this.delimiter = delimiter;
        // @ts-expect-error
        this.text = text.split(this.delimiter);
        this._client = client;
        this._message = message;
    }
    async parse() {
        const parsed = {};
        const parsedArgs = this._parseArguments();
        for (const arg in parsedArgs) {
            const argumentObject = parsedArgs[arg];
            // If there isn't any more text to process and the argument is optional then continue, else throw a message
            if (!this.text.length && argumentObject.type === 'optional')
                continue;
            else if (!this.text.length)
                throw { arg, message: `${arg} is a required argument!` };
            let toParse;
            if (argumentObject.processEverything) {
                const temp = this.text.join(this.delimiter);
                this.text = new Array();
                this.text[0] = temp;
                toParse = temp;
            }
            else
                toParse = this.text[0];
            // If there isn't anything to parse and the argument is optional then continue, else throw a message
            if (!toParse.length && argumentObject.type === 'optional')
                continue;
            if (!toParse.length)
                throw { arg, message: `${arg} is a required argument!` };
            // If there isn't an argument type specified then we check for a direct string match, and if the argument is not optional also throw a message 
            if (!argumentObject.argumentType) {
                if (arg !== toParse) {
                    if (argumentObject.type !== 'optional')
                        throw { arg, message: `The argument is supposed to be equal to \`${arg}\`!` };
                    else
                        continue;
                }
                else {
                    this.text.shift();
                    parsed[arg] = arg;
                    continue;
                }
            }
            // If the argument type is not something present in the parsers, then thow a message
            if (!Object.keys(Arguments).includes(argumentObject.argumentType))
                throw { arg, message: `${argumentObject.argumentType} is not a valid argument type!` };
            else {
                try {
                    // @ts-expect-error
                    parsed[arg] = await Arguments[argumentObject.argumentType](toParse, this._client, this._message);
                    this.text.shift();
                }
                catch (err) {
                    if (argumentObject.type === 'optional')
                        return;
                    throw { arg, message: err };
                }
            }
        }
        return parsed;
    }
    _parseArguments() {
        const args = {};
        // We find each valid argument and parse it, discarding the unvalid (other than required and optional) arguments
        this.args.forEach(argument => {
            if (this._requiredRegex.test(argument))
                this._processArgument(argument, args, this._requiredRegex, 'required');
            else if (this._optionalRegex.test(argument))
                this._processArgument(argument, args, this._optionalRegex, 'optional');
        });
        return args;
    }
    ;
    _processArgument(argument, argumentObject, regex, type) {
        // We match the argument with the given array and remove the first and last characters of it
        const match = argument.match(regex).map(string => string.slice(1, string.length).slice(0, -1))[0];
        // We split the argument in two, where it's the case
        const split = match.split(':');
        let arg = split[0];
        // Whether or not to process the rest of the text with this argument
        let processEverything = false;
        // The asterisks is the character that tells us to process the rest of the text with just this one argument
        if (arg.startsWith('*')) {
            arg = arg.slice(1, arg.length);
            processEverything = true;
        }
        ;
        const argType = split[1];
        argumentObject[arg] = { type, argumentType: argType !== null && argType !== void 0 ? argType : null, processEverything };
    }
}
exports.ArgumentParser = ArgumentParser;
//# sourceMappingURL=ArgumentParser.js.map