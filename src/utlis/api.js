import axios from 'axios';

const MAX_DELAY = 2500;

const get = (url,token) => new Promise((resolve, reject) => {
  setTimeout(() => {
    axios.get(url, {
      headers: {
        'Authorization': 'Bearer' + ' ' + token
      }})
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  }, Math.random() * MAX_DELAY);
});

const getMessages = (token) => get('/api/getusermessages',token);

const getCurrentUser = (token) => get('/getusermessages',token);
export default getMessages;
// export {
// eslint-disable-next-line
 // getPromotions,
// };
