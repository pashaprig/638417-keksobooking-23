import { createAdMarkersOnMap } from './map.js';

fetch('https://23.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then((ads) => {
    createAdMarkersOnMap(ads);
  });
