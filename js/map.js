import { setDisabledState, setFormsEnabledState, setAddressInputCoordinates } from './form.js';
import { createAdCard } from './create-ad-card.js';
import { showAlert } from './util.js';
import { getData } from './api.js';
import { debounce } from './utils/debounce.js';

const TOKYO_LAT = 35.63693;
const TOKYO_LNG = 139.78849;
const MAP_ZOOM = 12;
const AD_COUNT = 10;
const adsArray = [];
const formMapFilter = document.querySelector('.map__filters');
const DEBOUNCE_TIME = 500;
const DECIMAL_PLACES = 5;
const PIN_WIDTH_HEIGHT = 40;
const MAIN_PIN_WIDTH_HEIGHT = 52;
const MIN_HOUSING_PRICE = 10000;
const MAX_HOUSING_PRICE = 50000;


setDisabledState();
setAddressInputCoordinates( `${ TOKYO_LAT }, ${ TOKYO_LNG }` );

//снимает координаты с метки

const getFiltersObjectFromForm = () => {
  const filtersObj = {};
  const selectEls = formMapFilter.querySelectorAll( 'select' );
  for (const selectEl of selectEls) {
    const value = selectEl.value;
    const name = selectEl.id;
    filtersObj[ name ] = value;
  }
  const inputEls = formMapFilter.querySelectorAll( 'input' );
  for (const inputEl of inputEls) {
    const value = inputEl.checked;
    const name = inputEl.id;
    filtersObj[ name ] = value;
  }
  return filtersObj;
};

/**
   * @description returns filtered array of ads
   * @param {array} array
   * @returns {array} filtered array
 */
const filterAdsArray = ( array ) => {
  const filtersObj = getFiltersObjectFromForm();

  /**
   * @description price filter check
   * @param {object} ad
   * @returns {boolean} true/false
  */
  const priceCheck = ( ad ) => {
    const price = ad.offer.price;
    switch( filtersObj[ 'housing-price'] ){
      case 'any':
        return true;
        // 10000 - 50000
      case 'middle':
        return price >= MIN_HOUSING_PRICE && price <= MAX_HOUSING_PRICE;

        // до 10000₽
      case 'low':
        return price < MIN_HOUSING_PRICE;

        // от 50000₽
      case 'high':
        return price > MAX_HOUSING_PRICE;
    }
  };

  /**
   * @description room type filter check
   * @param {object} ad
   * @returns {boolean} true/false
  */
  const roomTypeCheck = ( ad ) => {
    const roomType = ad.offer.type;

    return filtersObj[ 'housing-type'] === 'any' ? true : roomType === filtersObj[ 'housing-type'];
  };

  /**
   * @description room number filter check
   * @param {object} ad
   * @returns {boolean} true/false
  */
  const roomNumberCheck = ( ad ) => {
    const rooms = ad.offer.rooms;
    return filtersObj[ 'housing-rooms'] === 'any' ? true : rooms === ( filtersObj[ 'housing-rooms']*1 );
  };

  /**
   * @description guest number filter check
   * @param {object} ad
   * @returns {boolean} true/false
  */
  const guestNumberCheck = ( ad ) => {
    const guestNumber = ad.offer.guests;
    return filtersObj[ 'housing-guests'] === 'any' ? true : guestNumber === ( filtersObj[ 'housing-guests']*1 ) ;
  };

  /**
   * @description features filter check
   * @param {object} ad
   * @returns {boolean} true/false
  */
  const featuresCheck = ( ad ) => {
    const features = ad.offer.features ? [...ad.offer.features] : [];

    const conditionerCheck = !filtersObj[ 'filter-conditioner'] ? true : features.includes( 'conditioner' );
    const dishwasherCheck = !filtersObj[ 'filter-dishwasher'] ? true : features.includes( 'dishwasher' );
    const elevatorCheck = !filtersObj[ 'filter-elevator'] ? true : features.includes( 'elevator' );
    const parkingCheck = !filtersObj[ 'filter-parking'] ? true : features.includes( 'parking' );
    const washerCheck = !filtersObj[ 'filter-washer'] ? true : features.includes( 'washer' );
    const wifiCheck = !filtersObj[ 'filter-wifi'] ? true : features.includes( 'wifi' );

    return conditionerCheck && dishwasherCheck && elevatorCheck && parkingCheck && washerCheck && wifiCheck;
  };

  const arrayFiltered = array.filter( ( item ) => roomTypeCheck(item) && priceCheck( item ) && roomNumberCheck( item ) && guestNumberCheck( item ) && featuresCheck( item ) );
  return arrayFiltered;
};

// CREATE MARKERS GROUP LAYER
const markersGroup = L.layerGroup();
// CREATE MAP
const map = L.map('map-canvas');

// AD MARKERS
const createAdMarkersOnMap = ( array ) => {
  array
    .slice(0, AD_COUNT) // Вывести на карту не более 10 меток. Ограничение по количеству должно происходить сразу после получения данных с сервера.
    .forEach( ( advertisement ) => {
      const adPinIcon = L.icon( {
        iconUrl: '../img/pin.svg',
        iconSize: [PIN_WIDTH_HEIGHT, PIN_WIDTH_HEIGHT],
        iconAnchor: [Math.floor(PIN_WIDTH_HEIGHT/2), PIN_WIDTH_HEIGHT],
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
        .addTo(markersGroup)
        .bindPopup(
          createAdCard ( advertisement ),
          {
            keepInView: true,
          },
        );
    } );

  markersGroup.addTo( map );
};

// LOAD ADS DATA
const onMapLoad = () => {
  getData(
    ( ads ) => {
      adsArray.push( ...ads );
      const adsFiltered = filterAdsArray( adsArray );
      createAdMarkersOnMap( adsFiltered );
      setFormsEnabledState();
    },
    ( error ) => {
      showAlert( error );
    },
  );
};

map
  .on('load', onMapLoad )
  .setView( {
    lat: TOKYO_LAT,
    lng: TOKYO_LNG,
  }, MAP_ZOOM );

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

// MAIN MARKER
const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [MAIN_PIN_WIDTH_HEIGHT, MAIN_PIN_WIDTH_HEIGHT],
  iconAnchor: [Math.floor(MAIN_PIN_WIDTH_HEIGHT/2), MAIN_PIN_WIDTH_HEIGHT],
});
const markerMain = L.marker(
  {
    lat: TOKYO_LAT,
    lng: TOKYO_LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
markerMain.addTo(map);
markerMain.on('moveend', ( event ) => {
  const coordinatesObj = event.target.getLatLng();
  const newCordinates = `${ coordinatesObj.lat.toFixed( DECIMAL_PLACES ) }, ${ coordinatesObj.lng.toFixed( DECIMAL_PLACES ) }`;
  setAddressInputCoordinates( newCordinates );
});

const setMarkerToCoordinates = ( lat, lng ) => {
  const newLatLng = new L.LatLng( lat, lng );
  markerMain.setLatLng( newLatLng );
};

const onFormMapFilterChange = () => {
  const adsFiltered = filterAdsArray( adsArray );
  // delete old markers
  markersGroup.clearLayers();
  // add new filtered markers
  createAdMarkersOnMap( adsFiltered );
};

formMapFilter.addEventListener( 'change',
  debounce(
    onFormMapFilterChange,
    DEBOUNCE_TIME,
  ),
);

export{
  createAdMarkersOnMap,
  setMarkerToCoordinates,
  TOKYO_LAT,
  TOKYO_LNG
};
