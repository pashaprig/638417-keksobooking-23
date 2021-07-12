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

export const getNewAd = ( advertisement ) => {
  const ad = cardTemplate.cloneNode(true);
  const featureList = ad.querySelector('.popup__features');
  const photos = ad.querySelector('.popup__photos');

  advertisement.offer.title ? ad.querySelector('.popup__title').textContent = advertisement.offer.title : ad.querySelector('.popup__title').remove();
  advertisement.offer.address.randomLat && advertisement.offer.address.randomLng ? ad.querySelector('.popup__text--address').textContent = `${advertisement.offer.address.randomLat}' Tōkyō-to, Chiyoda-ku, Ichibanchō, '${advertisement.offer.address.randomLng}` : ad.querySelector('.popup__text--address').remove();
  advertisement.offer.price ? ad.querySelector('.popup__text--price').textContent = `${advertisement.offer.price}₽/ночь` : ad.querySelector('.popup__text--price').remove();
  advertisement.offer.type ? ad.querySelector('.popup__type').textContent = getOfferType(advertisement.offer.type) : ad.querySelector('.popup__type').remove();
  advertisement.offer.rooms && advertisement.offer.guests ? ad.querySelector('.popup__text--capacity').textContent = `${advertisement.offer.rooms} комнаты для ${advertisement.offer.guests} гостей` : ad.querySelector('.popup__text--capacity').remove();
  advertisement.offer.checkin && advertisement.offer.checkout ? ad.querySelector('.popup__text--time').textContent = `Заезд после ${  advertisement.offer.checkin  }, выезд до ${  advertisement.offer.checkout}` : ad.querySelector('.popup__text--time').remove();

  //Удаление фич и их последующее добавление
  while(featureList.childElementCount > 0) {
    featureList.lastElementChild.remove();
  }
  advertisement.offer.features.forEach((featureTitle) => {
    const li = document.createElement('li');
    li.classList.add('popup__featute', `popup__featute--${featureTitle}`);
    featureList.appendChild(li);
  });

  advertisement.offer.description ? ad.querySelector('.popup__description').textContent = advertisement.offer.description : ad.querySelector('.popup__description').remove();

  //Удаление фото и их последующее добавлени
  while(photos.childElementCount > 0) {
    photos.lastElementChild.remove();
  }
  advertisement.offer.photos.forEach((photo) => {
    const img = document.createElement('img');
    img.classList.add('popup__photo');
    img.src = photo;
    img.width = 45;
    img.height = 40;
    img.alt = 'Фотография жилья';
    photos.appendChild(img);
  });

  advertisement.author.avatar ? ad.querySelector('.popup__avatar').src = advertisement.author.avatar : ad.querySelector('.popup__avatar').src = 'img/avatars/userDefault.png';

  return ad;
};
