import { Component } from "../../class/Component";
import { ImageLoader } from "../../class/ImageLoader";

import src from '../../img/test_low.png';

export class Left extends Component {
  constructor() {
    super();
  }

  onInit() {
    this.setStyle(`
    :host {
      border-right: 1px solid black;
      height: 100%;
      width: 300px;
    }`);
    const button = document.createElement('button');
    button.innerHTML = 'Click me !';
    button.onclick = async (e) => {
      console.log('button clicked in '+ this.tagName.toLowerCase());
      const img = (await ImageLoader.load([src]))[0];
      console.log('image loaded :: ', img);

      this.dispatchEvent(new CustomEvent('addImage', {detail: img}));
    };
    this.addChildNode(button);
  }
}

customElements.define('app-left', Left);