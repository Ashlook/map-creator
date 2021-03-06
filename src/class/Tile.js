import { Grid } from './Grid';

/**
 * Permet de gérer une tuile, on peut générer une nouvelle tuile avec un image,
 * ou générer une tuile déjà existante depuis je sais pas encore quoi.
 */
export class Tile {
  /**
   * Generate a new default Tile from the image, for now image height and width must be a multiple of 32px
   * @param {HTMLImageElement} image the image
   * @param {number} rows nunber of rows in the tile
   * @param {number} cols number of cols in the tile
   */
  constructor(image, rows, cols) {
    this.image = image;
    this.CELL_SIZE = this.image.width / cols;
    if(this.CELL_SIZE != (this.image.height / rows)) {
      throw new Error('Cells must be square.');
    }
    this.width = this.image.width;
    this.height = this.image.height;
    this.rows = this.width / this.CELL_SIZE;
    this.cols = this.height / this.CELL_SIZE;
    if(!Number.isInteger(this.rows)) {
      throw new Error('Width must be a mutiple of 32px.');
    }
    if(!Number.isInteger(this.cols)) {
      throw new Error('Height must be a mutiple of 32px.');
    }
    this.cellGrid = new Grid(this.rows, this.cols);
  }
}