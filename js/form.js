const adForm = document.querySelector('.ad-form');
const mapFiltersForm = document.querySelector( '.map__filters');
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

  // const mapFiltersInputs = Array.from( mapFiltersForm.children );
  const mapFiltersInputs = mapFiltersForm.querySelectorAll( 'select, fieldset ');
  mapFiltersInputs.forEach( ( input ) => {
    input.setAttribute( 'disabled', '');
  });
};
setDisabledState();

const setEnabledState = () => {
  adForm.classList.remove( 'ad-form--disabled');

  const fieldsets = adForm.querySelectorAll( 'fieldset');
  fieldsets.forEach( ( fieldset )=> {
    fieldset.removeAttribute( 'disabled' );
  });

  mapFiltersForm.classList.remove( 'map__filters--disabled');

  const mapFiltersInputs = mapFiltersForm.querySelectorAll( 'select, fieldset ');
  mapFiltersInputs.forEach( ( input ) => {
    input.removeAttribute( 'disabled');
  });
};
setEnabledState();


//Валидация заголовка обьявления
const adTitle = adForm.querySelector('input[name="title"]');
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

adTitle.addEventListener('input', () => {
  const valueLength = adTitle.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    adTitle.setCustomValidity(`Ещё ${  MIN_TITLE_LENGTH - valueLength } симв.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    adTitle.setCustomValidity(`Удалите лишние ${  valueLength - MAX_TITLE_LENGTH } симв.`);
  } else {
    adTitle.setCustomValidity('');
  }

  adTitle.reportValidity();
});

//Валидация цены в обьявлении
const adPrice = adForm.querySelector('input[name="price"]');
const MAX_PRICE = 1000000;

adPrice.addEventListener('input', () => {
  const value = adPrice.value;
  const minPrice = adPrice.min;

  if (value < minPrice) {
    adPrice.setCustomValidity(`Ещё ${ minPrice - value } руб. до минимальной цены`); //работает только для '1'((((
  } else if (value > MAX_PRICE) {
    adPrice.setCustomValidity(`Вы привысили максимальную суму на ${ value - MAX_PRICE } руб.`);
  } else {
    adPrice.setCustomValidity('');
  }

  adPrice.reportValidity();
});

//Смена минимальной цены в зависимости от типа жилья

const getMinPriceFromType = function () {
  const offerTypeContainer = adForm.querySelector('#type');
  offerTypeContainer.addEventListener('change', function() {
    if (this.value === 'bungalow') {
      adPrice.placeholder = '0';
      adPrice.min = '0';
    } if (this.value === 'flat') {
      adPrice.placeholder = '1000';
      adPrice.min = '1000';
    } if (this.value === 'hotel') {
      adPrice.placeholder = '3000';
      adPrice.min = '3000';
    } if (this.value === 'house') {
      adPrice.placeholder = '5000';
      adPrice.min = '5000';
    } if (this.value === 'palace') {
      adPrice.placeholder = '10000';
      adPrice.min = '10000';
    }
  });
};

getMinPriceFromType();

//Смена кличества гостей от числа комнат
const capacity = adForm.querySelector('#capacity');
const numberOfTenant = capacity.querySelectorAll('option');

const getNumberOfTenant = function () {
  const roomNumber = adForm.querySelector('#room_number');
  roomNumber.addEventListener('change', function() {
    if (this.value === '1') {
      for (let i = 0; i < numberOfTenant.length; i++) {
        numberOfTenant[i].value > 1 || numberOfTenant[i].value < 1 ? numberOfTenant[i].remove() : console.log(numberOfTenant.value);
      }
    }

    if (this.value === '2') {
      for (let i = 0; i < numberOfTenant.length; i++) {
        numberOfTenant[i].value > 2 || numberOfTenant[i].value === 0 ? numberOfTenant[i].remove() : console.log(numberOfTenant.value);
      }
    }

    if (this.value === '3') {
      for (let i = 0; i < numberOfTenant.length; i++) {
        numberOfTenant[i].value > 3 || numberOfTenant[i].value === 0 ? numberOfTenant[i].remove() : console.log(numberOfTenant.value);
      }
    }

    if (this.value === '100') {
      for (let i = 0; i < numberOfTenant.length; i++) {
        numberOfTenant[i].value > 0 ? numberOfTenant[i].remove() : console.log(numberOfTenant.value);
      }
    }
  });
};

getNumberOfTenant();