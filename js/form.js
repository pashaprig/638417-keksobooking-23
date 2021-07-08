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

  const mapFiltersInputs = mapFiltersForm.querySelectorAll( 'select, fieldset ');
  mapFiltersInputs.forEach( ( input ) => {
    input.setAttribute( 'disabled', '');
  });
};

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

export{setDisabledState, setEnabledState};
