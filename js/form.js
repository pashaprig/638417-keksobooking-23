import { TOKYO_LAT, TOKYO_LNG, setMarkerToCoordinates } from './map.js';
import { isEscEvent } from './util.js';
import { sendData } from './api.js';

const adForm = document.querySelector( '.ad-form' );
const mapFiltersForm = document.querySelector( '.map__filters');
const buttonReset = adForm.querySelector('.ad-form__reset');
const successTemplate = document.querySelector('#success').content;
const errorTemplate = document.querySelector('#error').content;

const setDisabledState = () => {

  // Форма заполнения информации об объявлении .ad-form содержит класс ad-form--disabled;
  adForm.classList.add( 'ad-form--disabled');

  // Все интерактивные элементы формы .ad-form должны быть заблокированы с помощью атрибута disabled, добавленного на них или на их родительские блоки fieldset;
  const fieldsets = adForm.querySelectorAll( 'fieldset');
  fieldsets.forEach( ( fieldset )=> {
    fieldset.setAttribute( 'disabled', '');
  });

  // Форма с фильтрами .map__filters заблокирована так же, как и форма .ad-form — на форму добавлен специальный класс, а на её интерактивные элементы атрибуты disabled;
  mapFiltersForm.classList.add( 'map__filters--disabled');

  const mapFiltersInputs = mapFiltersForm.querySelectorAll( 'select, fieldset ');
  mapFiltersInputs.forEach( ( input ) => {
    input.setAttribute('disabled', '');
  });
};

const setEnabledState = () => {

  adForm.classList.remove('ad-form--disabled');

  const fieldsets = adForm.querySelectorAll('fieldset');
  fieldsets.forEach( ( fieldset )=> {
    fieldset.removeAttribute('disabled');
  });

  mapFiltersForm.classList.remove('map__filters--disabled');

  const mapFiltersInputs = mapFiltersForm.querySelectorAll('select, fieldset');
  mapFiltersInputs.forEach( ( input ) => {
    input.removeAttribute('disabled');
  });
};

//Валидация заголовка обьявления
const adTitle = adForm.querySelector('#title');
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

adTitle.addEventListener('input', (event) => {
  const input = event.target;
  const valueLength = input.value.length;

  if (valueLength < MIN_TITLE_LENGTH || valueLength > MAX_TITLE_LENGTH ) {
    const message = valueLength < MIN_TITLE_LENGTH ? `Ещё ${ MIN_TITLE_LENGTH - valueLength } симв.` : `Удалите лишние ${ valueLength - MAX_TITLE_LENGTH } симв.`;
    input.setCustomValidity(message);
  } else {
    input.setCustomValidity('');
  }

  adTitle.reportValidity();
});

//Валидация цены в обьявлении
const adPrice = adForm.querySelector('#price');
const MAX_PRICE = 1000000;

adPrice.addEventListener('input', (event) => {
  const value = event.target.value;
  const minPrice = adPrice.min;

  if (value < minPrice) {
    adPrice.setCustomValidity(`Ещё ${ minPrice - value } руб. до минимальной цены`);
  } else if (value > MAX_PRICE) {
    adPrice.setCustomValidity(`Вы привысили максимальную суму на ${ value - MAX_PRICE } руб.`);
  } else {
    adPrice.setCustomValidity('');
  }

  adPrice.reportValidity();
});

//Смена минимальной цены в зависимости от типа жилья
const setMinPriceFromType = ( event ) => {
  const value = event.target.value;
  switch( value ) {
    case 'bungalow':
      adPrice.placeholder = '0';
      adPrice.min = '0';
      break;
    case 'flat':
      adPrice.placeholder = '1000';
      adPrice.min = '1000';
      break;
    case 'hotel':
      adPrice.placeholder = '3000';
      adPrice.min = '3000';
      break;
    case 'house':
      adPrice.placeholder = '5000';
      adPrice.min = '5000';
      break;
    case 'palace':
      adPrice.placeholder = '10000';
      adPrice.min = '10000';
      break;
    default:
  }
};
const offerTypeContainer = adForm.querySelector('#type');
offerTypeContainer.addEventListener('change', setMinPriceFromType );

//Смена количества гостей от числа комнат
const selectRoomNumber = adForm.querySelector('#room_number');
const selectCapacity= adForm.querySelector('#capacity');

const disableAllOptions = () => {
  const selectCapacityOptions = selectCapacity.querySelectorAll('option');
  selectCapacityOptions.forEach( (option) => {
    option.setAttribute('disabled', '');
  } );
};
disableAllOptions();

selectCapacity.querySelector('option[value="1"]').removeAttribute('disabled');
const onSelectRoomNumberChange = ( event ) => {
  const roomCount = event.target.value;
  disableAllOptions();
  switch ( roomCount ){
    case '1':
      selectCapacity.querySelector( 'option[value="1"]' ).removeAttribute('disabled');
      selectCapacity.value = '1';
      break;
    case '2':
      selectCapacity.querySelector( 'option[value="1"]' ).removeAttribute('disabled');
      selectCapacity.querySelector( 'option[value="2"]' ).removeAttribute('disabled');
      selectCapacity.value = '2';
      break;
    case '3':
      selectCapacity.querySelector( 'option[value="1"]' ).removeAttribute('disabled');
      selectCapacity.querySelector( 'option[value="2"]' ).removeAttribute('disabled');
      selectCapacity.querySelector( 'option[value="3"]' ).removeAttribute('disabled');
      selectCapacity.value = '3';
      break;
    case '100':
      selectCapacity.querySelector( 'option[value="0"]' ).removeAttribute('disabled');
      selectCapacity.value = '0';
      break;

    default:
  }
};

selectRoomNumber.addEventListener( 'change', onSelectRoomNumberChange );

//«Время заезда», «Время выезда» — выбор опции одного поля автоматически изменят значение другого.
const selectTimeIn = adForm.querySelector('#timein');
const selectTimeOut= adForm.querySelector('#timeout');

const syncTimeInOut = ( event, element ) => {
  const value = event.target.value;
  element.value = value;
};

selectTimeIn.addEventListener( 'change', ( event ) => { syncTimeInOut ( event, selectTimeOut ); } );
selectTimeOut.addEventListener( 'change', ( event ) => { syncTimeInOut ( event, selectTimeIn ); } );

const setAddressInputCoordinates = ( value ) => {
  const addressInput = adForm.querySelector( '#address' );
  addressInput.value = value;
};

const resetForm = () => {
  adForm.reset();
  mapFiltersForm.reset();
  const newCoordinates = `${ TOKYO_LAT }, ${ TOKYO_LNG }`;
  setAddressInputCoordinates( newCoordinates );
  setMarkerToCoordinates( TOKYO_LAT,TOKYO_LNG );
};

const onModalClick = ( event ) => {
  event.target.removeEventListener( 'click', onModalClick );
  event.target.remove();
};

const onModalSuccessKeyDown = ( event ) => {
  if ( isEscEvent( event ) ){
    document.querySelector( '.success' ).remove();
    document.removeEventListener( 'keypress', onModalSuccessKeyDown );
  }
};

const onModalErrorKeyDown = ( event ) => {
  if ( isEscEvent( event ) ){
    document.querySelector( '.error' ).remove();
    document.removeEventListener( 'keypress', onModalErrorKeyDown );
  }
};

const onButtonErrorClick = ( event ) => {
  event.target.parentNode.remove();
};

const createModalSuccess = () => {
  const template = successTemplate.querySelector('.success');
  const modal = template.cloneNode( true );
  document.body.appendChild(modal);

  modal.addEventListener( 'click', onModalClick );
  document.addEventListener( 'keydown', onModalSuccessKeyDown );
};

const createModalError = () => {
  const template = errorTemplate.querySelector('.error');
  const modal = template.cloneNode( true );
  document.body.appendChild(modal);

  const buttonError = document.querySelector( '.error__button');
  modal.addEventListener( 'click', onModalClick );
  buttonError.addEventListener( 'click', onButtonErrorClick );
  document.addEventListener( 'keydown', onModalErrorKeyDown );
};


buttonReset.addEventListener('click', ( event )=> {
  event.preventDefault();
  resetForm();
} );

adForm.addEventListener(
  'submit',
  ( event ) => {
    event.preventDefault();

    const formData = new FormData( event.target );

    const addressValue = adForm.querySelector( '#address').value;
    const capacityValue = adForm.querySelector( '#capacity').value;

    formData.append( 'address', addressValue );

    sendData (
      () => {
        createModalSuccess();
        resetForm();
      },
      ( error ) => {
        createModalError();
      },
      formData,
    );
  },
);


export{
  setDisabledState,
  setEnabledState,
  setAddressInputCoordinates,
  createModalSuccess,
  createModalError
};
