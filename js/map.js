import { setDisabledState, setEnabledState, setAddressInputCoordinates } from './form.js';

import { getNewAd } from './newAd.js';

setDisabledState();

const TOKYO_LAT = 35.41371;
const TOKYO_LNG = 139.41502;

setAddressInputCoordinates( `${ TOKYO_LAT }, ${ TOKYO_LNG }` );

const map = L.map('map-canvas')
  .on('load', () => {
    setEnabledState();
  })
  .setView({
    lat: TOKYO_LAT,
    lng: TOKYO_LNG,
  }, 8);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

// pins
const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
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

//снимает координаті с метки
marker.on('moveend', (evt) => {
  const coordinatesObj = evt.target.getLatLng();
  setAddressInputCoordinates( `${ coordinatesObj.lat.toFixed( 5 ) }, ${ coordinatesObj.lng.toFixed( 5 ) }` );
});


const createAdMarkersOnMap = ( array ) => {
  array.forEach( ( advertisement ) => {
    const adPinIcon = L.icon( {
      iconUrl: '../img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    } );

    const adsMarker = L.marker(
      {
        lat: advertisement.location.randomLat,
        lng: advertisement.location.randomLng,
      },
      {
        icon: adPinIcon,
      },
    );
    adsMarker
      .addTo(map)
      .bindPopup(
        getNewAd( advertisement ),
        {
          keepInView: true,
        },
      );
  } );

};

export{
  createAdMarkersOnMap
};
