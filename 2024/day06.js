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
    const grid = input.trim().split('\n').map(line => line.split(''));
    let visited = 0; // not a Set anymore but just an integer, need to track "already marked" locations too
    let loopsFound = 0;

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

    let startLocation = null;
    let currentLocation = null;
    let direction = 'up'; // always starts facing up

    // find current location
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
            const cell = grid[row][col];
            if (cell === '^') {
                startLocation = [row, col];
                currentLocation = [row, col];
                break;
            }
        }
    }

    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
            // temporarily put obstacle at location
            let cell = grid[row][col];
            if (cell === '#' || cell === '^') {
                continue;
            } else {
                grid[row][col] = '#'
            }
            // go through loop like normal
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
                    visited++;
                }

                // if the guard has visited a lot more than he normally would, we can assume he's in a loop
                if(visited > 6000) {
                    loopsFound++;
                    break;
                }
            }
            // reset variables to starting positions and whatnot
            currentLocation = startLocation;
            direction = 'up'
            visited = 0;
            grid[row][col] = '.'
        }
    }
      
    return loopsFound;
}

module.exports = { part1, part2 };