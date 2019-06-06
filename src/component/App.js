import { Component } from '../class/Component';
import { Header } from './Header/Header';
import { Left } from './Left/Left';
import { Middle } from './Middle/Middle';
import { Right } from './Right/Right';
export class MyApp extends Component {
  constructor(){
    super();
  }

  onInit() {
    this.setStyle(`
    :host {
      display: flex;
      flex-direction: column;
      width: 1000px;
      height: 600px;
      border: 1px solid black;
    }
    main {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;
      height: 400px;
      border-bottom: 1px solid black;
    }
    `);

    this.addComponent(new Header('Mon titre'));
    const main = document.createElement('main');
    this.appLeft = this.addComponent(new Left(), main);
    /** @type {Middle} */
    this.appMiddle = this.addComponent(new Middle(), main);
    this.appRight = this.addComponent(new Right(), main);

    this.appLeft.addEventListener('addImage', (e) => {
      console.log('img in '+this.tagName.toLowerCase(), e.detail);
      this.appMiddle.createCanvas(e.detail);
    });


    this.addChildNode(main);
  }
}

customElements.define('my-app', MyApp);
