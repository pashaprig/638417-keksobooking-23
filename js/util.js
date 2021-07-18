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

const getRandomArrayElement = (elements) => elements[getRandomInt(0, elements.length - 1)];


function getTwoDigitNumber(photoNumber) {
  photoNumber = getRandomInt(1, 10);

  return (photoNumber < 10) ? `0${  photoNumber}` : photoNumber;
}

const ALERT_SHOW_TIME = 5000;

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

export {getRandomInt, getRandomFloat, getRandomArrayElement, getTwoDigitNumber, showAlert, isEscEvent};
