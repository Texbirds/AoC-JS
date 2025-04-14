 function part1(input) {
    // parse input, put in seperate lists
    const lines = input.trim().split('\n');
    const leftList = lines.map(line => +line.split(/\s+/)[0]).sort((a, b) => a - b);
    const rightList = lines.map(line => +line.split(/\s+/)[1]).sort((a, b) => a - b);
    
    let totalDifference = 0; // let instead of const; value will change in for-loop

    for (let i = 0; i < leftList.length; i++) {
        totalDifference += Math.abs(leftList[i] - rightList[i])
    }

    return totalDifference;
 }

 function part2(input) {
    const lines = input.trim().split('\n');
    const leftList = lines.map(line => +line.split(/\s+/)[0]).sort((a, b) => a - b);
    const rightList = lines.map(line => +line.split(/\s+/)[1]).sort((a, b) => a - b);

    // create frequencymap. Avoids nested loops, in which case we would have an O(n²) time complexity
    const frequencyMap = new Map()
    for (let i = 0; i < rightList.length; i++) {
        const value = rightList[i];
        const count = frequencyMap.get(value) || 0;
        frequencyMap.set(value, count + 1);
    }

    // calculate the final answer
    let totalSimilarity = 0;
    for (let i = 0; i < leftList.length; i++) {
        const currentValue = leftList[i];
        const currentValueCount = frequencyMap.get(currentValue) || 0;
        totalSimilarity += (currentValue * currentValueCount)
    }

    return totalSimilarity;
 }

 module.exports = { part1, part2 };