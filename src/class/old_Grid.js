/**
 * @typedef {('NO'|'NE'|'SO'|'SE'|'N'|'E'|'S'|'O')} CornerPosition - A position
 */

export class Grid {
  constructor(cs, gx, gy) {
    this.cellSize = cs;
    this.gridX = gx;
    this.gridY = gy;
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'tutorial';
    this.canvas.width = this.cellSize * this.gridX;
    this.canvas.height = this.cellSize * this.gridY;
    this.context = this.canvas.getContext('2d');
    this.context.lineWidth = 0.5;
    this.context.strokeStyle = 'red';
    this.context.lineCap = 'butt';
    this.context.lineJoin = 'miter';
  }

  init() {
    const divCanvas = document.getElementById('canvas');
    divCanvas.removeChild(document.getElementById('tutorial'));
    divCanvas.appendChild(this.canvas);

    for (let x = 0; x < this.gridX; x++) {
      for (let y = 0; y < this.gridY; y++) {
        this.addFourSide(x, y);
      }
    }
  }

  addFourSide(x, y) {
    const realX = x * this.cellSize + this.context.lineWidth / 2;
    const realY = y * this.cellSize + this.context.lineWidth / 2;
    const realS = this.cellSize - this.context.lineWidth;
    this.context.strokeRect(realX, realY, realS, realS);
  }

  addNoSide(x, y) {
    this.__addCorner(x, y, 'NE');
    this.__addCorner(x, y, 'NO');
    this.__addCorner(x, y, 'SE');
    this.__addCorner(x, y, 'SO');
  }

  addTopSide(x, y) {
    this.__addSide(x, y, 'N');
    this.__addCorner(x, y, 'SE');
    this.__addCorner(x, y, 'SO');
  }

  addTopBotSide(x, y) {
    this.__addSide(x, y, 'N');
    this.__addSide(x, y, 'S');
  }

  /* addRightSide(x, y) {

  } */

  clearOneCell(x, y) {
    this.context.clearRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
  }

  /**
   * Add a rectangle reprensenting a corner of a cell
   * @param {number} x Horizontal position of the cell on the grid
   * @param {number} y Vertical position of the cell on the grid
   * @param {CornerPosition} pos Position of the corner in the cell
   */
  __addCorner(x, y, pos) {
    switch (pos) {
      case 'NE':
        this.context.fillRect(
          x * this.cellSize + this.cellSize - this.context.lineWidth,
          y * this.cellSize,
          this.context.lineWidth, this.context.lineWidth);
        break;
      case 'NO':
        this.context.fillRect(
          x * this.cellSize,
          y * this.cellSize,
          this.context.lineWidth, this.context.lineWidth);
        break;
      case 'SE':
        this.context.fillRect(
          x * this.cellSize + this.cellSize - this.context.lineWidth,
          y * this.cellSize + this.cellSize - this.context.lineWidth,
          this.context.lineWidth, this.context.lineWidth);
        break;
      case 'SO':
        this.context.fillRect(
          x * this.cellSize,
          y * this.cellSize + this.cellSize - this.context.lineWidth,
          this.context.lineWidth, this.context.lineWidth);
        break;
      default:

    }
  }

  /**
   * Add a line reprenting the side of the cell
   * @param {number} x Horizontal position of the cell on the grid
   * @param {number} y Vertical position of the cell on the grid
   * @param {CornerPosition} pos Position of the corner in the cell
   */
  __addSide(x, y, pos) {
    switch (pos) {
      case 'N':
        this.context.beginPath();
        this.context.moveTo(x * this.cellSize, y * this.cellSize + this.context.lineWidth / 2);
        this.context.lineTo((x + 1) * this.cellSize, y * this.cellSize + this.context.lineWidth / 2);
        this.context.closePath();
        this.context.stroke();
        break;
      case 'E':
        this.context.beginPath();
        this.context.moveTo((x + 1) * this.cellSize - this.context.lineWidth / 2, y * this.cellSize);
        this.context.lineTo((x + 1) * this.cellSize - this.context.lineWidth / 2, (y + 1) * this.cellSize);
        this.context.closePath();
        this.context.stroke();
        break;
      case 'S':
        this.context.beginPath();
        this.context.moveTo(x * this.cellSize, (y + 1) * this.cellSize - this.context.lineWidth / 2);
        this.context.lineTo((x + 1) * this.cellSize, (y + 1) * this.cellSize - this.context.lineWidth / 2);
        this.context.closePath();
        this.context.stroke();
        break;
      case 'O':

        break;
    }
  }
}