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
      }
    `);
    this.appNoImg = this.addChildNode(new NoImg());
    this.appCanvas = null;
  }

  onRender() {
    if(this.appCanvas) {
      this.addChildNode(this.appCanvas);
    } else {
      this.addChildNode(this.appNoImg);
    }
  }

  /**
   * 
   * @param {HTMLImageElement} img The image to load into canvas
   */
  createCanvas(img) {
    const tile = new Tile(img, 6, 6);
    this.appCanvas = new Canvas(tile);
    this.render();
  }

}

customElements.define('app-middle', Middle);