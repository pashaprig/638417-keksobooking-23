const cardTemplate = document.querySelector('#card').content;

function getOfferType(offerType) {
  switch(offerType) {
    case 'flat':
      return 'Квартира';

    case 'bungalow':
      return 'Бунгало';

    case 'house':
      return 'Дом';

    case 'palace':
      return 'Дворец';

    case 'hotel':
      return 'Отель';
  }
}

export const getNewAd = (advertisement) => {
  const ad = cardTemplate.cloneNode(true);
  const featureList = ad.querySelector('.popup__features');
  const photos = ad.querySelector('.popup__photos');

  ad.querySelector('.popup__title').textContent = advertisement.offer.title;
  ad.querySelector('.popup__text--address').textContent = advertisement.offer.address;
  ad.querySelector('.popup__text--price').textContent = `${advertisement.offer.price}₽/ночь`;
  ad.querySelector('.popup__type').textContent = getOfferType(advertisement.offer.type);
  ad.querySelector('.popup__text--capacity').textContent = `${advertisement.offer.rooms} комнаты для ${advertisement.offer.guests} гостей`;
  ad.querySelector('.popup__text--time').textContent = `Заезд после ${  advertisement.offer.checkin  }, выезд до ${  advertisement.offer.checkout}`;
  //Удаление фич и их последующее добавление
  while(featureList.childElementCount > 0) {
    featureList.lastElementChild.remove();
  }
  ad.offer.features.forEach(featureTitle => {
    const li = document.createElement('li');
    li.classList.add('popup__featute', `popup__featute--${featureTitle}`);
    featureList.appendChild(li);
  });

  ad.querySelector('.popup__description').textContent = advertisement.offer.description;

  //Добавление фото
  ad.offer.photos.forEach(photo => {
    const img = document.createElement('img');
    img.classList.add('popup__photo');
    img.src = photo;
    img.width = 45;
    img.height = 40;
    img.alt = 'Фотография жилья';
    photos.appendChild(img);
  });

  ad.querySelector('.popup__avatar').src = advertisement.author.avatar;

  // Предусмотрите ситуацию, когда данных для заполнения не хватает.
  // Например, отсутствует описание. В этом случае соответствующий блок в карточке скрывается.

  return ad;
};
