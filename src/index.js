import test from './img/test_low.png';



import './index.css';
import { Tile } from './class/Tile';
import { CanvasService } from './service/CanvasService';

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

window.onload = () => {
  const img1 = new Image();

  img1.onload = () => {
    console.log('image loaded !');
    const myTile = new Tile(img1);
    console.log('Tile :: ', myTile);
    const canvasService = new CanvasService(myTile, {
      lineWidth: 1,
      lineCap: 'butt',
      lineJoin: 'miter',
      strokeStyle: 'red'
    });

    canvasService.onupdate = (ev) => {
      const info = document.getElementById('infos');
      info.innerHTML = `
      <h2>Cell info</h2>
      ${(!ev)? `No Cell Selected`: JSON.stringify(ev)}
    `;
    };


    console.log('CanvasService :: ', canvasService);

    const canvasContainer = document.getElementById('canvas');
    canvasService.attachTo(canvasContainer);
  };

  img1.src = test;
};