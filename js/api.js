const GET_DATA_URL = 'https://23.javascript.pages.academy/keksobooking/data';
const SEND_DATA_URL = 'https://23.javascript.pages.academy/keksobooking';

const getData = ( onSuccess, onFail ) => {
  fetch(GET_DATA_URL)
    .then( (response) => {
      if(!response.ok){
        throw new Error ('Ошибка загрузки данных с сервера.');
      }
      return response.json();
    })
    .then( ( ads ) => {
      onSuccess( ads );
    })
    .catch( ( error ) => {
      onFail( error );
    });
};

const sendData = ( onSuccess, onFail, body ) => {
  fetch(
    SEND_DATA_URL,
    {
      method: 'POST',
      body: body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });

};

export {getData, sendData};
