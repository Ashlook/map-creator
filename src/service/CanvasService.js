/**
 * @typedef {{lineWidth: number, strokeStyle: string | CanvasGradient | CanvasPattern, lineCap: CanvasLineCap}} contextOptions Context Options.
 */

/**
 * Permet de gerer le canvas, sa mise à jour etc
 */
export class canvasService {
  
  /**
   * 
   * @param {HTMLCanvasElement} canvas 
   * @param {contextOptions} options 
   */
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.options = options;
  }
}