import './App.css';
import { Canvas } from './Canvas/Canvas';
import { Tile } from '../class/Tile';
import { ImageLoader } from '../class/ImageLoader';

//Image de test
import imageTest from '../img/test_low.png';

export class App {
  constructor(t = 'Mon application !') {
    this.title = t;

    //Composants de l'appli
    /** @type {Canvas} */
    this.canvasComp = null;
    this.noImgComp = null;

    /** @type {HTMLImageElement} */
    this.img = new Image();
    /** @type {Tile} */
    this.tile = null;

    this.render();

    //test
    this.initCanvas([imageTest]);
  }

  render() {
    console.log('render');
    this.tag = document.createElement('app');

    const title = document.createElement('h1');
    title.innerText = this.title;
    const main = document.createElement('main');
    const left = document.createElement('div');
    left.id = 'left';
    const canvas = document.createElement('div');
    canvas.id = 'canvas';
    const right = document.createElement('div');
    right.id = 'right';

    //Menu gauche
    main.appendChild(left);

    //canvas
    main.appendChild(canvas);
    console.log('canvasComp :: ', this.canvasComp);
    if(this.canvasComp) {
      canvas.appendChild(this.canvasComp.HTMLElement);
      console.log('if');
    } else {
      canvas.appendChild(document.createTextNode('BLABLA'));
    }

    //Menu droite
    main.appendChild(right);

    this.tag.appendChild(title);
    this.tag.appendChild(main);
  }

  async initCanvas(imgSource) {
    try {
      this.img = (await ImageLoader.load(imgSource))[0];
      this.tile = new Tile(this.img, 6, 6);
      this.canvasComp = new Canvas(this.tile);
      this.render();
    } catch(e) {
      console.error(e);
    }
  }
}
