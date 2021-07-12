import { createAd } from './createAd.js';

import './map.js';
import { createAdMarkersOnMap } from './map.js';

const SIMILAR_AD_COUNT = 5;

const simalarAds = new Array( SIMILAR_AD_COUNT ).fill(null).map(() => createAd());
createAdMarkersOnMap(simalarAds);
