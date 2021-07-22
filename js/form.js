import { TOKYO_LAT, TOKYO_LNG, setMarkerToCoordinates } from './map.js';
import { isEscEvent } from './util.js';
import { sendData } from './api.js';
import { getPreview } from './avatar.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 1000000;
const FLAT_PRICE = 1000;
const HOTEL_PRICE = 3000;
const HOUSE_PRICE = 5000;
const PALACE_PRICE = 10000;

const adForm = document.querySelector( '.ad-form' );
const mapFiltersForm = document.querySelector( '.map__filters');
const buttonReset = adForm.querySelector('.ad-form__reset');
const successTemplate = document.querySelector('#success').content;
const errorTemplate = document.querySelector('#error').content;


//Аватарка пользователя
const avatarChooser = document.querySelector('#avatar');
const avatatPreviewBlock = document.querySelector('.ad-form-header__preview');
const avatarPreview = avatatPreviewBlock.querySelector('img');

//Фотография жилья
const adPhotoChooser = document.querySelector('#images');
const adPreviewBlock = document.querySelector('.ad-form__photo');
const adPreview = adPreviewBlock.querySelector('img');

//Отображение превьюшек
getPreview(avatarChooser, avatarPreview);
getPreview(adPhotoChooser, adPreview);

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

const setFormsEnabledState = () => {

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
const onOfferTypeChange = ( event ) => {
  const value = event.target.value;
  switch( value ) {
    case 'bungalow':
      adPrice.placeholder = '0';
      adPrice.min = '0';
      break;
    case 'flat':
      adPrice.placeholder = FLAT_PRICE;
      adPrice.min = FLAT_PRICE;
      break;
    case 'hotel':
      adPrice.placeholder = HOTEL_PRICE;
      adPrice.min = HOTEL_PRICE;
      break;
    case 'house':
      adPrice.placeholder = HOUSE_PRICE;
      adPrice.min = HOUSE_PRICE;
      break;
    case 'palace':
      adPrice.placeholder = PALACE_PRICE;
      adPrice.min = PALACE_PRICE;
      break;
    default:
  }
};
const offerTypeContainer = adForm.querySelector('#type');
offerTypeContainer.addEventListener('change', onOfferTypeChange );

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

    formData.append( 'address', addressValue );

    sendData (
      () => {
        createModalSuccess();
        resetForm();
      },
      () => {
        createModalError();
      },
      formData,
    );
  },
);


export{
  setDisabledState,
  setFormsEnabledState,
  setAddressInputCoordinates,
  createModalSuccess,
  createModalError
};
