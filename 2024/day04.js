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
    const lines = input.trim().split('\n');
    const rows = lines.length;
    const cols = lines[0].length;
    let count = 0;

    for(let row = 0; row < rows; row++) {
        for(let col = 0; col < cols; col++) {
            if(lines[row][col] == "A") {
                if(row-1 < 0 || row+1 >= rows || col-1 < 0 || col+1 >= cols) {
                    continue;
                }

                // diagonal checks for MAS or SAM
                const d1 = lines[row - 1][col - 1] + lines[row][col] + lines[row + 1][col + 1];
                const d2 = lines[row - 1][col + 1] + lines[row][col] + lines[row + 1][col - 1];
                const isValid = (s) => s === "MAS" || s === "SAM";

                if (isValid(d1) && isValid(d2)) {
                    count++;
                }
            }
        }
    }
    
    return count;
}

module.exports = { part1, part2 };