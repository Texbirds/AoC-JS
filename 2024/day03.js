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
    // finds all matches, captures the first and second digit and all instances of do() and don't()
    const matches = input.matchAll(/mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\)/g);

    let total = 0;
    let enabledFlag = true;

    // multiplies all instances, also saves last state
    for (const match of matches) {
        if(match[0] == "do()") {
            enabledFlag = true;
            continue;
        } else if (match[0] == "don't()") {
            enabledFlag = false;
            continue;
        }

        if(enabledFlag) {
            const first = parseInt(match[1]);
            const second = parseInt(match[2]);
            total += first * second;
        }
    }

    return total;
}

module.exports = { part1, part2 };