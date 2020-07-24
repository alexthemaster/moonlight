export function string(input: string) {
    if (!input.length) throw 'Please provide an argument of the string type!';
    if (typeof input !== 'string') throw 'The provided argument should be a string!';
    else return input;
}