import test from './img/test_low.png';

import './index.css'; 
import { Tile } from './class/Tile';

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
  /* //affichage des images en dessous
  img1.src = test1;
  img2.src = test2;

  const images = document.getElementById('images');

  images.appendChild(img1);
  images.appendChild(img2);

  img1.onclick = (e) => {
    draw(img1);
  };

  img2.onclick = (e) => {
    draw(img2);
  }


  img1.onload = (e) => {
    draw(img1);
  } */

  const img1 = new Image();

  img1.onload = e => {
    console.log('image loaded !');
    const myTile = new Tile(img1);
    console.log('Tile :: ', myTile);

    document.body.appendChild(myTile.image);
  };

  img1.src = test;
}