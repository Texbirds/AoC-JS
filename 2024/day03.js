function part1(input) {
    // finds all matches, captures the first and second digit
    const matches = input.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g);

    let total = 0;

    // multiplies all instances
    for (const match of matches) {
        const first = parseInt(match[1]);
        const second = parseInt(match[2]);
        total += first * second;
    }

    return total;
}

function part2(input) {
    return null;
}

module.exports = { part1, part2 };