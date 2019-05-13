/**
 * @typedef {'water'|'rock'|'concrete'|'grass'} Terrain Possible type of terrain
 */

/**
 * @typedef {{N: boolean, E: boolean, S: boolean, W: boolean}} Wall Define if their is wall blocking the way in around the cell
 */

export const Cell = {
  /** @type {Terrain} */
  terrainType: 'concrete',
  walkable: true,
  /** @type {Wall} */
  wall: {
    N: false,
    E: false,
    S: false,
    W: false,
  },
  level: 0
}
