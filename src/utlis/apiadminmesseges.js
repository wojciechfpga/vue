import axios from 'axios';

const MAX_DELAY = 2500;

const get = (url) => new Promise((resolve, reject) => {
  setTimeout(() => {
    axios.get(url)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  }, Math.random() * MAX_DELAY);
});

const getMessages = () => get('/api/messagesfromadmin');
export default getMessages;
// export {
// eslint-disable-next-line
 // getPromotions,
// };
