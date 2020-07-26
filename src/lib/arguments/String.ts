export function string(input: string) {
    if (typeof input !== 'string') throw 'The provided argument should be a string!';
    else return input;
}