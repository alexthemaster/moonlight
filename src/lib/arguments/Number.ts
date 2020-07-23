function number(input: number) {
    if (isNaN(input)) throw 'This argument should be a number!';
    else return Number(input);
}

export { number, number as int }