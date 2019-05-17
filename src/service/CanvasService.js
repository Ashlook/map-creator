import { ImageLoader } from './../class/ImageLoader';

//Assets
import waterIcon from './../img/cell_water32.png';
import grassIcon from './../img/cell_grass32.png';
import rockIcon from './../img/cell_rock32.png';
const icons = [
  waterIcon,
  grassIcon,
  rockIcon
];

/**
 * @typedef {{lineWidth: number, strokeStyle: string | CanvasGradient | CanvasPattern, lineCap: CanvasLineCap, lineJoin: CanvasLineJoin}} ContextOptions Context Options.
 */

/**
 * Creer un canvas, et lie à une Tile + option
 */
export class CanvasService {

  /**
   * 
   * @param {import('./../class/Tile').Tile} tile The tile user for the render of the canvas
   * @param {ContextOptions} options 
   */
  constructor(tile, options = {}) {
    this.mouseCol = 0;
    this.mouseRow = 0;
    /** @type {import('./../class/Cell').Cell} */
    this.currentHoveredCell = null;
    /** @type {import('./../class/Cell').Cell} */
    this.currentClickedCell = null;
    this.tile = tile;
    /** @type {HTMLCanvasElement} */
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.tile.width;
    this.canvas.height = this.tile.height;
    this.context = this.canvas.getContext('2d');
    this._setOptions(options);
    /**
     * Fires when the canvas update.
     * @param ev The current clicked cell.
     * @type {((this: GlobalEventHandlers, ev: Event) => any) | null}
     */
    this.onupdate = null;
    /** @type  */
    this.assets;

    //EventHandler onmouseover
    this.canvas.onmousemove = (ev) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouseCol = Math.floor((ev.clientX - Math.floor(rect.left) - 1) / this.tile.CELL_SIZE);
      this.mouseRow = Math.floor((ev.clientY - Math.floor(rect.top) - 1) / this.tile.CELL_SIZE);

      //Si la cellule sur laquelle on se trouve est la même que la précédente on fait rien
      //Sinon on change la cell et on update le canvas
      if (!(this.currentHoveredCell === this.hoveredCell)) {
        this.currentHoveredCell = this.hoveredCell;
        this.update();
      }

      //Test
      const div = document.getElementById('images');
      div.innerHTML = 'row : ' + this.mouseRow + ' ' + (ev.clientX - Math.floor(rect.left)) + ' | col : ' + this.mouseCol + ' ' + (ev.clientY - Math.floor(rect.top));
    };

    //EventHandler onclick
    this.canvas.onclick = () => {
      //Si la cellule sur laquelle on click est la même que la précédente on la "declick"
      //Sinon on change la cell
      this.currentClickedCell = !(this.currentClickedCell === this.hoveredCell)
        ? this.hoveredCell
        : null;
      this.update();
      //Test
      const div = document.getElementById('images');
      div.innerHTML = 'Clicked at cell : { row: ' + this.mouseRow + ', col: ' + this.mouseCol + ' }';
    };

    //EventHandler onmouseleave
    this.canvas.onmouseleave = () => {
      this.currentHoveredCell = null;
      this.update();
    };

  }

  /**
   * @returns The cell hovered by the mouse cursor
   */
  get hoveredCell() {
    if (this.mouseCol >= 0 && this.mouseRow >= 0 && this.mouseCol < this.tile.cellGrid.grid.length && this.mouseRow < this.tile.cellGrid.grid.length) {
      return this.getCell(this.mouseCol, this.mouseRow);
    } else {
      return null;
    }
  }

  /**
   * 
   * @param {number} x Position of the cell
   * @param {number} y Position of the cell
   * @return {import('./../class/Cell').Cell} The cell
   */
  getCell(x, y) {
    return this.tile.cellGrid.grid[x][y];
  }

  /**
   * Attach the canvas to the parent element, removing it first, then updating it.
   * @param {HTMLElement} container 
   */
  attachTo(container) {
    this.canvas.remove();
    container.appendChild(this.canvas);
    this.update();
  }

  /**
   * Update the canvas
   */
  async update() {
    //const tmp = performance.now();
    try {
      //Load images if needed 
      if (!this.assets) {
        this.assets = await ImageLoader.load(icons);
      }
      //Clean the canvas
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      //Draw the image
      this.context.drawImage(this.tile.image, 0, 0, this.tile.width, this.tile.height);
      //Draw the grid and the detail for each cell
      this.drawGrid();

      if (this.onupdate) {
        this.onupdate(this.currentClickedCell);
      }
    } catch (e) {
      console.log(e);
    }
    //console.log('Finished updating.', performance.now() - tmp + 'ms');


  }

  drawGrid() {
    const sPx = this.tile.CELL_SIZE;
    this.tile.cellGrid.grid.map((rows, x) => {
      const xPx = x * this.tile.CELL_SIZE;
      rows.map((cols, y) => {
        const yPx = y * this.tile.CELL_SIZE;
        //ajout terrain
        this._drawTerrain(x, y);
        //ajout "murs"
        this._drawWalls(x, y);


        //Si clicked
        if (this.currentClickedCell === this.getCell(x, y)) {
          this.context.fillStyle = 'rgba(0, 255, 0, 0.2)';
          this.context.fillRect(xPx, yPx, sPx, sPx);
        }
        //Si hovered
        if (this.currentHoveredCell === this.getCell(x, y)) {
          this.context.fillStyle = 'rgba(0, 0, 0, 0.2)';
          this.context.fillRect(xPx, yPx, sPx, sPx);
        }

      });
    });
  }

  /**
   * Draw the terrain icon on the cell
   * @param {number} x Cell position
   * @param {number} y Cell position
   */
  _drawTerrain(x, y) {
    this.context.save();

    this.context.textAlign = 'center';
    this.context.textBaseline = 'middle';
    this.context.fillStyle = 'lightgray';
    this.context.font = '12px arial';
    this.context.translate((x + 0.5) * this.tile.CELL_SIZE, (y + 0.5) * this.tile.CELL_SIZE);
    switch (this.getCell(x, y).terrainType) {
      case 'unknow':
        this.context.fillText('?', 0, 0);
        break;
      case 'water':
        this.context.fillText('W', 0, 0);
        /* this.context.globalAlpha = 0.9;
        this.context.drawImage(this.assets.find((img) => img.src.includes(waterIcon)), x * this.tile.CELL_SIZE, y * this.tile.CELL_SIZE);
         */break;
      case 'grass':
        this.context.fillText('G', 0, 0);
        /* this.context.globalAlpha = 0.40;
        this.context.drawImage(this.assets.find((img) => img.src.includes(grassIcon)), x * this.tile.CELL_SIZE, y * this.tile.CELL_SIZE);
        */ break;
      case 'rock':
        this.context.fillText('R', 0, 0);
        /* this.context.globalAlpha = 0.5;
        this.context.drawImage(this.assets.find((img) => img.src.includes(rockIcon)), x * this.tile.CELL_SIZE, y * this.tile.CELL_SIZE);
         */break;
    }
    this.context.restore();
  }

  /**
   * Draw the walls on the cell
   * @param {number} x Cell position
   * @param {number} y Cell position
   */
  _drawWalls(x, y) {
    this.context.save();
    const wall = this.getCell(x, y).wall;
    //NORTH
    this.context.translate(x * this.tile.CELL_SIZE, y * this.tile.CELL_SIZE);
    this._drawWall(wall.N);
    //EAST 
    this.context.translate(this.tile.CELL_SIZE, 0);
    this.context.rotate(Math.PI / 2);
    this._drawWall(wall.E);
    //SOUTH
    this.context.translate(this.tile.CELL_SIZE, 0);
    this.context.rotate(Math.PI / 2);
    this._drawWall(wall.S);
    //WEST
    this.context.translate(this.tile.CELL_SIZE, 0);
    this.context.rotate(Math.PI / 2);
    this._drawWall(wall.W);


    this.context.restore();
  }

  _drawWall(wall) {
    this.context.beginPath();
    if (wall) {
      this.context.fillStyle = 'red';
      this.context.fillRect(0.5 * this.tile.CELL_SIZE - 8, 1, 16, 2);
    } else {
      this.context.fillStyle = 'green';
      this.context.moveTo(0.5 * this.tile.CELL_SIZE, 1);
      this.context.lineTo(0.5 * this.tile.CELL_SIZE + 4, 4);
      this.context.lineTo(0.5 * this.tile.CELL_SIZE - 4, 4);
      this.context.fill();
    }
    this.context.closePath();
  }

  /**
   * Set some style options for the context
   * @param {ContextOptions} options 
   */
  _setOptions(options) {
    this.context.lineWidth = options.lineWidth || 1;
    this.context.strokeStyle = options.strokeStyle || 'black';
    this.context.lineCap = options.lineCap || 'butt';
    this.context.lineJoin = options.lineJoin || 'miter';
  }
}