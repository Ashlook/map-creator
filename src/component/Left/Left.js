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
    const buttonADD = document.createElement('button');
    buttonADD.innerHTML = 'Click me !';
    buttonADD.onclick = async (e) => {
      const img = (await ImageLoader.load([src]))[0];
      this.dispatchEvent(new CustomEvent('addImage', {detail: img}));
    };
    this.addChildNode(buttonADD);

    const buttonDel = document.createElement('button');
    buttonDel.innerHTML = 'Del canvas';
    buttonDel.onclick = (e) => this.dispatchEvent(new CustomEvent('delImage'));
    this.addChildNode(buttonDel);
  }

  onRender() {

  }
}

customElements.define('app-left', Left);