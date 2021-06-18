import {getRandomInt, getRandomFloat, getRandomArrayElement, getTwoDigitNumber} from './util.js';

const TITLE = [
  'Уютная квартирка в центре Токио',
  'Вариант для молодой семейной пары',
  'Светлая студия рядом с метро',
  'Апартаменты в спальном районе',
  'Квартира с панорамными окнами',
];

const TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const CHECKIN = [
  '12:00',
  '13:00',
  '14:00',
];

const CHECHOUT = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const DESCRIPTION = [
  'Квартира с новым ремонтом и мебелью, для некурящих',
  'Рядом метро и барбершоп',
  'Метро в 15 минутах одьбы',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const MIN_LAT = 35.65;
const MAX_LAT = 35.7;
const MIN_LNG = 139.7;
const MAX_LNG = 139.8;

function createAd () {
  const randomLat = getRandomFloat(MIN_LAT, MAX_LAT, 5);
  const randomLng = getRandomFloat(MIN_LNG, MAX_LNG, 5);

  return {
    author: {
      avatar: `img/avatars/user(${  getTwoDigitNumber()  }).png`,
    },
    offer: {
      title: getRandomArrayElement(TITLE),
      address: {
        randomLat,
        randomLng,
      },
      price: getRandomInt(0, 10000),
      type: getRandomArrayElement(TYPE),
      rooms: getRandomInt(0, 5),
      guests: getRandomInt(0, 10),
      checkin: getRandomArrayElement(CHECKIN),
      checkout: getRandomArrayElement(CHECHOUT),
      features: getRandomArrayElement(FEATURES),
      description: getRandomArrayElement(DESCRIPTION),
      photos: getRandomArrayElement(PHOTOS),
    },
    location: {
      randomLat,
      randomLng,
    },
  };
}

export {createAd};
