import test from './img/test_low.png';



import './index.css';
import { Tile } from './class/Tile';
import { Canvas } from './component/Canvas/Canvas';
import { App } from './component/App';

import { ImageLoader } from './class/ImageLoader';

window.onload = () => {
  try {
    const app = new App('Mon titre');
    document.body.appendChild(app.tag);

    /** @type {HTMLImageElement} */
    /* const myImg = (await ImageLoader.load([test]))[0];
    if (myImg) {
      const myTile = new Tile(myImg, 6, 6);
      console.log('Tile :: ', myTile);
      const canvas = new Canvas(myTile, {
        lineCap: 'butt',
        lineJoin: 'miter',
        cellSize: 64
      });

      canvas.onclick = (ev) => {
        const info = document.getElementById('infos');
        info.innerHTML = `
          <h2>Cell info</h2>
          ${(!ev) ? `No Cell Selected` : JSON.stringify(ev)}
        `;
      };


      console.log('CanvasService :: ', canvas);

      const canvasContainer = document.getElementById('canvas');
      canvas.attachTo(document.body);
    } */

  } catch (e) {
    console.error(e);
  }
};