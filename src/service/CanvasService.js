/**
 * @typedef {{lineWidth: number, strokeStyle: string | CanvasGradient | CanvasPattern, lineCap: CanvasLineCap, lineJoin: CanvasLineJoin}} ContextOptions Context Options.
 */

/**
 * Creer un canvas, et lie à une Tile + option
 */
export class CanvasService {
  
  /**
   * 
   * @param {HTMLCanvasElement} canvas 
   * @param {ContextOptions} options 
   */
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.setOptions(options);
  }

  /**
   * Attach the canvas to the parent element
   * @param {HTMLElement} container 
   */
  init(container) {
    this.canvas.remove();
    container.appendChild(this.canvas);
    this.update();
  }

  update() {

  }

  /**
   * 
   * @param {ContextOptions} options 
   */
  setOptions(options) {
    this.context.lineWidth = options.lineWidth || 1;
    this.context.strokeStyle = options.strokeStyle || 'black';
    this.context.lineCap = options.lineCap || 'butt';
    this.context.lineJoin = options.lineJoin || 'miter';
  }
}