import { Cell } from './Cell';

export class Grid {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;

    /** @type {Array<Array<Cell>} The grid representing the cell and their properties*/
    this.grid = [...Array(this.rows)].map(() => [...Array(this.cols)]);
    this.resetGrid();
  }

  /**
   * 
   * @param {number} x The x position of the cell on the grid
   * @param {number} y The y position of the cell on the grid
   * @param {import('./Cell').ICell} values values to update
   */
  updateCell(x, y, values) {
    values.wall = {...this.grid[x][y].wall, ...values.wall};
    this.grid[x][y] = {...this.grid[x][y], ...values};
  }

  /**
   * Reset the grid with default cells
   */
  resetGrid() {
    this.grid = this.grid.map(e => e.map(() => new Cell()));
  }
}