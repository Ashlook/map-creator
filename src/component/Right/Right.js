import { Component } from "../../class/Component";


export class Right extends Component {
  constructor() {
    super();
  }

  onInit() {
    this.setStyle(`
      :host {
        height: 100%;
        width: 300px;
        border-left: 1px solid black;
      }
    `);
  }
}

customElements.define('app-right', Right);