const adForm = document.querySelector('.ad-form');

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
        numberOfTenant[i].value > 2 || numberOfTenant[i].value == 0 ? numberOfTenant[i].remove() : console.log(numberOfTenant.value);
      }
    }

    if (this.value === '3') {
      for (let i = 0; i < numberOfTenant.length; i++) {
        numberOfTenant[i].value > 3 || numberOfTenant[i].value == 0 ? numberOfTenant[i].remove() : console.log(numberOfTenant.value);
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
