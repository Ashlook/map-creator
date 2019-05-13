import { Cell } from './Cell';

export class Grid {
  constructor(x, y) {
    this.gridSizeX = x;
    this.gridSizeY = y;

    /** @type {Array<Array<Cell>} The grid representing the cell and their properties*/
    this.grid = [...Array(this.gridSizeX)].map(e => [...Array(this.gridSizeY)]);
    this.resetGrid();
  }

  /**
   * 
   * @param {number} x The x position of the cell on the grid
   * @param {number} y The y position of the cell on the grid
   * @param {Cell} values values to update
   */
  updateCell(x, y, values) {
    values.wall = {...this.grid[x][y].wall, ...values.wall};
    this.grid[x][y] = {...this.grid[x][y], ...values};
  }

  /**
   * Reset the grid with default cells
   */
  resetGrid() {
    this.grid = this.grid.map(e => e.map(() => Cell));
  }
}