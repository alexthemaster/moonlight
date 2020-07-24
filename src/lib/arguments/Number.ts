function number(input: number) {
    if (isNaN(input)) throw 'The provided argument should be a number!';
    else return Number(input);
}

export { number, number as int }