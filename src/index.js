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

window.onload = (e) => {
  const img1 = new Image();
  const canvas = document.createElement('canvas');

  img1.onload = e => {
    console.log('image loaded !');
    const myTile = new Tile(img1);
    console.log('Tile :: ', myTile);
    canvas.width = myTile.width;
    canvas.height = myTile.height;
    const canvasService = new CanvasService(canvas, {
      lineWidth: 0.5,
      lineCap: 'butt',
      lineJoin: 'miter',
      strokeStyle: 'red'
    });

    const canvasContainer = document.getElementById('canvas');
    canvasService.init(canvasContainer);
  };

  img1.src = test;
}