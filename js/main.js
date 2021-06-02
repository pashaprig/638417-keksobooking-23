function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return (min >= 0 || min < max) ? Math.floor(Math.random() * (max - min + 1)) + min : -1;
}

getRandomInt();

function getRandomFloat(min, max, fValue) {
  min;
  max;
  fValue;

  return (min >= 0 || min < max) ? ((Math.random() * (max - min + 1)) + min).toFixed(fValue) : -1;
}

getRandomFloat();
