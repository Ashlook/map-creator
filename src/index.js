import test from './img/test2_low.png';



import './index.css';
import { Tile } from './class/Tile';
import { CanvasService } from './service/CanvasService';

import { ImageLoader } from './class/ImageLoader';

//import { ImageLoader } from './class/ImageLoader';

/**
 * Sie of the cell in pixel
 */
/* const CELL_SIZE = 32;

const img1 = new Image(), img2 = new Image();

function draw(img) {
    const gridXSize = img.width / CELL_SIZE;
    const gridYSize = img.height / CELL_SIZE;

    const board = new Grid(CELL_SIZE, gridXSize, gridYSize);
    board.context.drawImage(img, 0, 0);

    board.init();
} */

window.onload = async () => {
  try {
    /** @type {Array<HTMLImageElement>} */
    const myImg = (await ImageLoader.load([test]))[0];
    console.log('image loaded !');
    const myTile = new Tile(myImg);
    console.log('Tile :: ', myTile);
    const canvasService = new CanvasService(myTile, {
      lineWidth: 2,
      lineCap: 'butt',
      lineJoin: 'miter',
      strokeStyle: 'red'
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
  } catch (e) {
    console.error(e);
  }
};