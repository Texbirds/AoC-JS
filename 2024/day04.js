function part1(input) {
    const lines = input.trim().split('\n');
    const rows = lines.length;
    const cols = lines[0].length;
    const word = "XMAS";
    let count = 0;

    // 2D array with directions
    const directions= [
        [1, 0],   // right
        [-1, 0],  // left
        [0, 1],   // down
        [0, -1],  // up
        [1, 1],   // down right
        [-1, 1],  // down left
        [-1, -1], // up right
        [1, -1]   // up left
    ]

    // at every x,y check every direction
    for(let row = 0; row < rows; row++) {
        for(let col = 0; col < cols; col++) {
            for(let [dRow, dCol] of directions) {
                let matched = true;

                for(let i = 0; i < word.length; i++) {
                    const nextRow = row + dRow * i;
                    const nextCol = col + dCol * i;

                    // check for out of bounds
                    if(nextRow < 0 || nextRow >= rows || nextCol < 0 || nextCol >= cols) {
                        matched = false;
                        break;
                    }

                    // check each letter
                    if(lines[nextRow][nextCol] !== word[i]) {
                        matched = false;
                        break;
                    }
                }
                if (matched) {
                    count++;
                }
            }
        }
    }

    return count;
}

function part2(input) {
    return null;
}

module.exports = { part1, part2 };