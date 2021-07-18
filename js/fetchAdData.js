import { createAdMarkersOnMap } from './map.js';
import { showAlert } from './util.js';

fetch('https://23.javascript.pages.academy/keksobooking/data')
  .then( (response) => {
    if ( response.ok ) {
      return response.json();
    }
    throw new Error(`${response.status} ${response.statusText}`);
  } )
  .then((ads) => {
    createAdMarkersOnMap(ads);
  })
  .catch((error) => {
    showAlert( error );
  });

