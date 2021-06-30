const CARDTEMPLATE = document.querySelector('#card').content;
const featureList = CARDTEMPLATE.querySelector('.popup__features');

// Сопоставление подписей для строки 16
function offerType() {
  if (offer.type = 'flat') {
    return 'Квартира';
  };
}

const getNewAd = (offer, author) => {
  const AD = CARDTEMPLATE.cloneNode(true);
  AD.querySelector('.popup__title').textContent = offer.title;
  AD.querySelector('.popup__text--address').textContent = offer.address;
  AD.querySelector('.popup__text--price').textContent = `${offer.price}₽/ночь`;
  AD.querySelector('.popup__type').textContent = offerType;
  // В блок .popup__type выведите тип жилья offer.type, сопоставив с подписями:
  // Квартира для flat
  // Бунгало для bungalow
  // Дом для house
  // Дворец для palace
  // Отель для hotel
  AD.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  AD.querySelector('.popup__text--time').textContent = `Заезд после ${  offer.checkin  }, выезд до ${  offer.checkout}`;
  // В список .popup__features выведите все доступные удобства в объявлении.
  AD.querySelector('.popup__description').textContent = offer.description;
  // В блок .popup__photos выведите все фотографии из списка offer.photos.
  // Каждая из строк массива photos должна записываться как атрибут src соответствующего изображения.
  AD.querySelector('.popup__avatar').src = author.avatar;
  // Предусмотрите ситуацию, когда данных для заполнения не хватает.
  // Например, отсутствует описание. В этом случае соответствующий блок в карточке скрывается.
};

getNewAd();
