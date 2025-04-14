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
    return null;
 }

 module.exports = { part1, part2 };