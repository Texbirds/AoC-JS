function part1(input) {
    const lines = input.trim().split('\n');
    let totalSafeReports = 0;

    // over entire input
    for (let i = 0; i < lines.length; i++){
        // puts all numbers in this line inside an array, eliminates spaces
        const numbers = lines[i].trim().split(/\s+/).map(Number);

        if (isSafeReport(numbers)) {
            totalSafeReports++;
            continue;
        }
    }

    return totalSafeReports;
}

function part2(input) {
    const lines = input.trim().split('\n');
    let totalSafeReports = 0;

    for (let line of lines) {
        const numbers = line.trim().split(/\s+/).map(Number);

        if (isSafeReport(numbers)) {
            totalSafeReports++;
            continue;
        }

        let safeAfterRemoval = false;

        // try removing one element at a time
        for (let i = 0; i < numbers.length; i++) {
            const copy = [...numbers];
            copy.splice(i, 1);

            if (isSafeReport(copy)) {
                safeAfterRemoval = true;
                break;
            }
        }

        if (safeAfterRemoval) {
            totalSafeReports++;
        }
    }

    return totalSafeReports;
}

function isSafeReport(numbers) {
    let direction = null;

    for (let i = 0; i < numbers.length - 1; i++) {
        const diff = numbers[i + 1] - numbers[i];

        if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
            return false;
        }

        if (direction === null) {
            direction = diff > 0 ? "increasing" : "decreasing";
        } else if (
            (direction === "increasing" && diff < 0) ||
            (direction === "decreasing" && diff > 0)
        ) {
            return false;
        }
    }

    return true;
}

module.exports = { part1, part2 };