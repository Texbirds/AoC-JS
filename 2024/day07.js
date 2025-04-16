function part1(input) {
    const lines = input.trim().split('\n');
    const correctTargets = [];

    // split lines up into easy-to-use targets and numbers
    const equations = lines.map(line => {
        const [left, right] = line.split(':');
        const target = Number(left.trim());
        const numbers = right.trim().split(/\s+/).map(Number);
        return { target, numbers };
    });


    for(const { target, numbers } of equations){
        for(const combo of generateOperatorCombos(numbers.length, ['+', '*'])) {
            const result = calculate(numbers, combo);
            if(result === target) {
                correctTargets.push(result);
                break;
            }
        }
    }

    let total = 0;
    for(const result of correctTargets) {
        total += result;
    }

    return total;
}

// recursively look for each operator combo (nerd emoji)
function generateOperatorCombos(numCount, operators = ['+', '*']) {
    const results = [];

    function backtrack(current) {
        if (current.length === numCount - 1) {
            results.push([...current]);
            return;
        }

        for (const op of operators) {
            current.push(op);
            backtrack(current);
            current.pop();
        }
    }

    backtrack([]);
    return results;
}

// simple calculate method for cleanliness
function calculate(numbers, operators) {
    let result = numbers[0];
    for (let i = 0; i < operators.length; i++) {
        const next = numbers[i + 1];
        const operator = operators[i];

        // changed to accept || as operator
        if(operator === '+') {
            result += next;
        } else if(operator === '*') {
            result *= next;
        } else if(operator === '||') {
            result = Number(`${result}${next}`);
        }
    }
    return result;
}

function part2(input) {
    const lines = input.trim().split('\n');
    const correctTargets = [];

    // split lines up into easy-to-use targets and numbers
    const equations = lines.map(line => {
        const [left, right] = line.split(':');
        const target = Number(left.trim());
        const numbers = right.trim().split(/\s+/).map(Number);
        return { target, numbers };
    });


    for(const { target, numbers } of equations){
        for(const combo of generateOperatorCombos(numbers.length, ['+', '*', '||'])) {
            const result = calculate(numbers, combo);
            if(result === target) {
                correctTargets.push(result);
                break;
            }
        }
    }

    let total = 0;
    for(const result of correctTargets) {
        total += result;
    }

    return total;
}

module.exports = { part1, part2 };