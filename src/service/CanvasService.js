import { ImageLoader } from './../class/ImageLoader';

//Assets
import waterIcon from './../img/cell_water32.png';
import grassIcon from './../img/cell_grass32.png';

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
    this.onupdate;
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
      div.innerHTML = 'row : ' + this.mouseRow + ' ' + (ev.clientX - Math.floor(rect.left) - 1) + ' | col : ' + this.mouseCol + ' ' + (ev.clientY - Math.floor(rect.top) - 1);
    };

    //EventHandler onclick
    this.canvas.onclick = () => {
      //Si la cellule sur laquelle on click est la même que la précédente on la "declick"
      //Sinon on change la cell
      this.currentClickedCell = !(this.currentClickedCell === this.hoveredCell)
        ? this.currentClickedCell = this.hoveredCell
        : this.currentClickedCell = null;
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
    if (this.mouseCol >= 0 && this.mouseRow >= 0) {
      return this.tile.cellGrid.grid[this.mouseCol][this.mouseRow];
    } else {
      return null;
    }
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
    try {
      //Load images if needed 
      if (!this.assets) {
        this.assets = await ImageLoader.load({waterIcon, grassIcon});
      }
      //Clean the canvas
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      //Draw the image
      this.context.drawImage(this.tile.image, 0, 0);
      //Draw the grid and the detail for each cell
      this.drawGrid();

      if (this.onupdate) {
        this.onupdate(this.currentClickedCell);
      }
    } catch (e) {
      console.log(e);
    }


  }

  drawGrid() {
    const sPx = this.tile.CELL_SIZE - this.context.lineWidth;
    this.tile.cellGrid.grid.map((rows, x) => {
      const xPx = x * this.tile.CELL_SIZE + this.context.lineWidth / 2;
      rows.map((cols, y) => {
        const yPx = y * this.tile.CELL_SIZE + this.context.lineWidth / 2;
        //Test ajout terrain
        this._drawTerrain(x, y);
        this.context.strokeRect(xPx, yPx, sPx, sPx);

        //A faire en dernier (derniere couche)
        //Si clicked
        if (this.currentClickedCell === this.tile.cellGrid.grid[x][y]) {
          this.context.fillStyle = 'rgba(0, 255, 0, 0.2)';
          this.context.fillRect(xPx, yPx, sPx, sPx);
        }
        //Si hovered
        if (this.currentHoveredCell === this.tile.cellGrid.grid[x][y]) {
          this.context.fillStyle = 'rgba(0, 0, 0, 0.2)';
          this.context.fillRect(xPx, yPx, sPx, sPx);
        }

      });
    });
  }

  /* async _loadIcon() {
    try {
      this.images = ImageLoader.load([waterIcon, grassIcon]);
    } catch (e) {
      console.error(e);
    }
  } */

  _drawTerrain(x, y) {
    this.context.save();
    switch (this.tile.cellGrid.grid[x][y].terrainType) {
      case 'other':
        this.context.textAlign = 'center';
        this.context.textBaseline = 'middle';
        this.context.fillStyle = 'white';
        this.context.font = '12px arial';
        this.context.fillText('?', x * this.tile.CELL_SIZE + this.tile.CELL_SIZE / 2, y * this.tile.CELL_SIZE + this.tile.CELL_SIZE / 2);
        break;
      case 'water':
        this.context.globalAlpha = 0.8;
        this.context.drawImage(this.assets[1], x * this.tile.CELL_SIZE, y * this.tile.CELL_SIZE);
        break;
    }
    this.context.restore();
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