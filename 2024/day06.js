function part1(input) {
    const grid = input.trim().split('\n').map(line => line.split(''));
    const visited = new Set();

    // map for directions
    const directions = {
        'up': [-1, 0],
        'right': [0, 1],
        'down': [1, 0],
        'left': [0, -1]
    }

    // map for the next turn
    const rightTurn = {
        'up': 'right',
        'right': 'down',
        'down': 'left',
        'left': 'up'
    }

    let currentLocation = null;
    let direction = 'up'; // always starts facing up

    // find current location
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
            const cell = grid[row][col];
            if (cell === '^') {
                currentLocation = [row, col];
                break;
            }
        }
    }


    // entire loop - walks through array until guard leaves, tracks visited
    while(true) {
        const [dRow, dCol] = directions[direction];
        const nextRow = currentLocation[0] + dRow;
        const nextCol = currentLocation[1] + dCol;

        if (
            nextRow < 0 || nextRow >= grid.length ||
            nextCol < 0 || nextCol >= grid[0].length
        ) {
            break;
        } else if (grid[nextRow][nextCol] === '#') {
            direction = rightTurn[direction];
        } else {
            currentLocation = [nextRow, nextCol];
            visited.add(`${currentLocation[0]},${currentLocation[1]}`);
        }
    }
      
    return visited.size;
}

function part2(input) {
    return null;
}

module.exports = { part1, part2 };