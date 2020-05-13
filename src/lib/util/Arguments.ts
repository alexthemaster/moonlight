export class Arguments {
    public args: string[];
    public text: string;
    private _requiredRegex: RegExp = /\<(.*?)\>/g;
    private _optionalRegex: RegExp = /\[(.*?)\]/g;

    constructor(args: string[], text: string) {
        this.args = args;
        this.text = text;

        console.log(this._parseText())
    }

    private _parseText() {

    }
}