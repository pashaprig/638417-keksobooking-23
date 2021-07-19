

import { getData } from './api.js';
import { createAdMarkersOnMap } from './map.js';
import { showAlert } from './util.js';

getData(
  ( ads ) => {
    createAdMarkersOnMap( ads );
  },
  ( error ) => {
    showAlert( error );
  },
);
