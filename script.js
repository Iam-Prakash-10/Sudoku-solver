const sudokuGrid = document.getElementById('sudoku-grid');
const solveButton = document.getElementById('solve-button');
const clearButton = document.getElementById('clear-button');

// Generate Sudoku grid
for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
        const cell = document.createElement('div');
        cell.className = 'sudoku-cell';
        cell.contentEditable = 'true';
        cell.textContent = '';
        sudokuGrid.appendChild(cell);
    }
}

// Add event listener to solve button
solveButton.addEventListener('click', solveSudoku);

// Add event listener to clear button
clearButton.addEventListener('click', clearGrid);




function solveSudoku() {
    const grid = [];
    for (let i = 0; i < 9; i++) {
        grid[i] = [];
        for (let j = 0; j < 9; j++) {
            const cell = sudokuGrid.children[i * 9 + j];
            grid[i][j] = parseInt(cell.textContent) || 0;
        }
    }

    function isValid(grid, row, col, num) {
        for (let i = 0; i < 9; i++) {
            if (grid[row][i] === num) return false;
            if (grid[i][col] === num) return false;
        }
        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (grid[startRow + i][startCol + j] === num) return false;
            }
        }
        return true;
    }

    function solve(grid) {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (grid[i][j] === 0) {
                    for (let num = 1; num <= 9; num++) {
                        if (isValid(grid, i, j, num)) {
                            grid[i][j] = num;
                            if (solve(grid)) return true;
                            grid[i][j] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    if (solve(grid)) {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                sudokuGrid.children[i * 9 + j].textContent = grid[i][j];
            }
        }
    } else {
        alert('No solution found!');
    }
}

function clearGrid() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            sudokuGrid.children[i * 9 + j].textContent = '';
        }
    }
}
