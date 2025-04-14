function part1(input) {
    const lines = input.trim().split('\n');
    let totalSafeReports = 0;

    // over entire input
    for (let i = 0; i < lines.length; i++){
        // puts all numbers in this line inside an array, eliminates spaces
        const numbers = lines[i].trim().split(/\s+/).map(Number);
        let direction = null;
        let reportIsSafe = true;

        // checks a single line
        for(let j = 0; j < numbers.length - 1; j++) {
            let difference = numbers[j] - numbers[j+1]

            // check if it's increasing by atleast one or max three
            if(Math.abs(difference) < 1 || Math.abs(difference) > 3) {
                reportIsSafe = false;
                continue;
            }

            // check if it's increasing or decreasing; entire line must follow this behaviour
            if(direction == null) {
                direction = difference > 0 ? "decreasing" : "increasing";
            } else if((direction == "decreasing" && difference < 0) || (direction == "increasing" && difference > 0)) {
                reportIsSafe = false;
                continue;
            }
        }
        // increment safe reports count
        if(reportIsSafe) {
            totalSafeReports++;
        }
    }

    return totalSafeReports;
}

function part2(input) {
    return null;
}

module.exports = { part1, part2 };