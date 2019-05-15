/**
 * @typedef {'water'|'rock'|'concrete'|'grass'|'detail'|'other'} Terrain Possible type of terrain
 */

/**
 * @typedef {{N: boolean, E: boolean, S: boolean, W: boolean}} Wall Define if their is wall blocking the way in around the cell
 */

/**
 * @typedef {{terrainType: Terrain, walkable: boolean, wall: Wall, level: number}} ICell Cell Interface
 */

export class Cell {
  constructor() {
    /** @type {Terrain} */
    this.terrainType = 'water';
    this.walkable = true;
    /** @type {Wall} */
    this.wall = {
      N: false,
      E: false,
      S: false,
      W: false,
    };
    this.level = 0;
  }

}
