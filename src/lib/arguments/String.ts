export function string(input: string) {
    if (typeof input !== 'string') throw 'This argument should be of type string';
    else return input;
}