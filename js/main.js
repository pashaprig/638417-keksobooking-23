import {createAd} from './createAd.js';

const SIMILAR_AD_COUNT = 10;

const simalarAds = new Array(SIMILAR_AD_COUNT).fill(null).map(() => createAd());

simalarAds();
