// Функция, возвращающая случайное целое число из переданного диапазона включительно.
// взято с https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return (min >= 0 || min < max) ? Math.floor(Math.random() * (max - min + 1)) + min : -1;
}

// Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.
// взято с https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// и
// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed

function getRandomFloat(min, max, fValue) {
  min;
  max;
  fValue;

  return (min >= 0 || min < max) ? ((Math.random() * (max - min + 1)) + min).toFixed(fValue) : -1;
}

const getRandomArrayElement = (elements) => {
  elements[getRandomInt(0, elements.length - 1)];
};

function getTwoDigitNumber(photoNumber) {
  photoNumber = getRandomInt(1, 10);

  return (photoNumber < 10) ? `0${  photoNumber}` : photoNumber;
}

export {getRandomInt, getRandomFloat, getRandomArrayElement, getTwoDigitNumber};
