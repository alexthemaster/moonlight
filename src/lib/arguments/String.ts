export function string(input: string) {
    if (!input.length) throw 'Please provide an argument of the string type!';
    if (typeof input !== 'string') throw 'This argument should be of type string!';
    else return input;
}