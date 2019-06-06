import { Component } from "../../../class/Component";

export class NoImg extends Component {
  constructor() {
    super();
  }

  onInit() {
    this.setStyle(`
    :host {
      color: #CCCCCC;
    }`);
    this.addChildNode(document.createTextNode('No image selected !'));
  }
}

customElements.define('app-no-img', NoImg);