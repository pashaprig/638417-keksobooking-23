import { setDisabledState, setEnabledState, setAddressInputCoordinates } from './form.js';

import { createAdCard } from './createAdCard.js';

setDisabledState();

const TOKYO_LAT = 35.63693;
const TOKYO_LNG = 139.78849;

setAddressInputCoordinates( `${ TOKYO_LAT }, ${ TOKYO_LNG }` );

const map = L.map('map-canvas')
  .on('load', () => {
    setEnabledState();
  })
  .setView({
    lat: TOKYO_LAT,
    lng: TOKYO_LNG,
  }, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

// pins
const MAIN_PIN_WHIDTH_HEIGHT = 52;
const PIN_WHIDTH_HEIGHT = 40;

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [MAIN_PIN_WHIDTH_HEIGHT, MAIN_PIN_WHIDTH_HEIGHT],
  iconAnchor: [Math.floor(MAIN_PIN_WHIDTH_HEIGHT/2), MAIN_PIN_WHIDTH_HEIGHT],
});

const marker = L.marker(
  {
    lat: TOKYO_LAT,
    lng: TOKYO_LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
marker.addTo(map);

//снимает координаты с метки
const DECIMAL_PLACES = 5;

marker.on('moveend', ( event ) => {
  const coordinatesObj = event.target.getLatLng();
  const newCordinates = `${ coordinatesObj.lat.toFixed( DECIMAL_PLACES ) }, ${ coordinatesObj.lng.toFixed( DECIMAL_PLACES ) }`;
  setAddressInputCoordinates( newCordinates );
});

const setMarkerToCoordinates = ( lat, lng ) => {
  const newLatLng = new L.LatLng( lat, lng );
  marker.setLatLng( newLatLng );
};

const createAdMarkersOnMap = ( array ) => {
  // console.log( 'createAdMarkersOnMap', array );
  array.forEach( ( advertisement ) => {
    const adPinIcon = L.icon( {
      iconUrl: '../img/pin.svg',
      iconSize: [PIN_WHIDTH_HEIGHT, PIN_WHIDTH_HEIGHT],
      iconAnchor: [Math.floor(PIN_WHIDTH_HEIGHT/2), PIN_WHIDTH_HEIGHT],
    } );

    const adsMarker = L.marker(
      {
        lat: advertisement.location.lat,
        lng: advertisement.location.lng,
      },
      {
        icon: adPinIcon,
      },
    );
    adsMarker
      .addTo(map)
      .bindPopup(
        createAdCard ( advertisement ),
        {
          keepInView: true,
        },
      );
  } );

};

export{
  createAdMarkersOnMap,
  setMarkerToCoordinates,
  TOKYO_LAT,
  TOKYO_LNG
};
