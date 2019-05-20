import test from './img/test_low.png';



import './index.css';
import { Tile } from './class/Tile';
import { CanvasService } from './service/CanvasService';

import { ImageLoader } from './class/ImageLoader';

window.onload = async () => {
  try {
    /** @type {HTMLImageElement} */
    const myImg = (await ImageLoader.load([test]))[0];
    console.log('image loaded !');
    if (myImg) {
      const myTile = new Tile(myImg, 6, 6);
      console.log('Tile :: ', myTile);
      const canvasService = new CanvasService(myTile, {
        lineCap: 'butt',
        lineJoin: 'miter',
        cellSize: 64
      });

      canvasService.onupdate = (ev) => {
        const info = document.getElementById('infos');
        info.innerHTML = `
      <h2>Cell info</h2>
      ${(!ev) ? `No Cell Selected` : JSON.stringify(ev)}
    `;
      };


      console.log('CanvasService :: ', canvasService);

      const canvasContainer = document.getElementById('canvas');
      canvasService.attachTo(canvasContainer);
    }

  } catch (e) {
    console.error(e);
  }
};