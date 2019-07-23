import { Component } from "../../class/Component";
import { NoImg } from "./noImg/NoImg";
import { Tile } from "../../class/Tile";
import { Canvas } from "./Canvas/Canvas";

export class Middle extends Component {
  constructor() {
    super();
  }

  onInit() {
    this.setStyle(`
      :host {
        display: flex;
        width: 400px;
        height: 100%;
        align-items: center;
        justify-content: center;
        background-color: #303030;
        z-index: 1000;
      }
    `);
    this.appNoImg = this.addComponent(new NoImg());
    this.appCanvas = null;

    this.showCanvas = false;
  }

  onRender() {
    if(this.showCanvas) {
      this.appNoImg.style.display = 'none';
      this.appCanvas.style.display = 'block';
    } else {
      if(this.appCanvas) {
        this.appCanvas.style.display = 'none';
      }
      this.appNoImg.style.display = 'block';
    }
  }

  /**
   * 
   * @param {HTMLImageElement} img The image to load into canvas
   */
  createCanvas(img) {
    //Si on a deja un canvas, on le supprime
    if(this.appCanvas) {
      this.removeComponent(this.appCanvas);
    }
    const tile = new Tile(img, 6, 6);
    this.appCanvas = new Canvas(tile);
    this.addComponent(this.appCanvas);
    this.showCanvas = true;
    this.render();
  }

  toggleCanvas() {
    this.showCanvas = !this.showCanvas;
    this.render();
  }

}

customElements.define('app-middle', Middle);