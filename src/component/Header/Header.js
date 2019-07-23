import { Component } from "../../class/Component";

export class Header extends Component {
  constructor(...args) {
    super(...args);

  }

  onInit(title){
    this.setStyle(`
    h1 {
      width: 100%;
      height: 40px;
      text-align: center;
      display: block;
      border-bottom: 1px solid black;
      margin: 0;
      padding: 10px 0 10px 0;
    }`);

    const h1 = document.createElement('h1');
    h1.appendChild(document.createTextNode(title));
    this.addChildNode(h1);
  }

  onRender() {

  }

}

customElements.define('app-header', Header);