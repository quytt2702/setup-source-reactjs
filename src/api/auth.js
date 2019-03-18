import reduxApi, {transformers} from 'redux-api';
import customFetch from 'api/axios';
import CONFIG from 'src/constants/config';

const auth = reduxApi({
  signin: {
    url: `/login`,
    options: (url, params, getState) => {
      return {
        method: 'POST',
        data: params
      };
    }
  },
  signout: {
    url: `/logout`,
    options: (url, params, getState) => {
      return {
        method: 'POST',
      };
    }
  }
})
.use('fetch', customFetch)
.use("rootUrl", CONFIG.API_URL);

export default auth;