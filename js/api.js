
const GET_DATA_URL = 'https://23.javascript.pages.academy/keksobooking/data';
const SEND_DATA_URL = 'https://23.javascript.pages.academy/keksobooking';

const getData = ( onSuccess, onFail ) => {
  fetch(GET_DATA_URL)
    .then( (response) => response.json())
    .then( ( ads ) => {
      // throw new Error( 'no Data');
      onSuccess( ads );
    })
    .catch( (error) => {
      onFail( error );
    });
};

const sendData = ( onSuccess, onFail, body ) => {
  fetch(
    SEND_DATA_URL,
    {
      method: 'POST',
      // mode: 'no-cors',
      // credentials: 'same-origin',
      // headers: {
      //   'Content-Type': 'multipart/form-data',
      // },
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
