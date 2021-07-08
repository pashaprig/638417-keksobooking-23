import {createAd} from './createAd.js';
import {getNewAd} from './newAd.js';
import {setDisabledState, setEnabledState, adForm, mapFiltersForm} from './form.js';

const SIMILAR_AD_COUNT = 10;

const simalarAds = new Array(SIMILAR_AD_COUNT).fill(null).map(() => createAd());

const canvas = document.querySelector('#map-canvas');
canvas.appendChild(getNewAd(simalarAds[0]));

setDisabledState(adForm, mapFiltersForm);
setEnabledState(adForm, mapFiltersForm);
