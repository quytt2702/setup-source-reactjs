import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function customFetch(url, options) {
  // return a promise of axios
  let accessToken = cookies.get('accessToken');
  if (accessToken) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  }

  return new Promise((resolve, reject) => {
    axios(url, options).then(response => {
      resolve(response);
    }).catch(error => {
      reject(error);
    });
  });
}
