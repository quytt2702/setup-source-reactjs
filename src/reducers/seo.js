const initialState = {
  title: 'DanangTrade',
  description: '',
  image: ''
};


function SEO(state = initialState, action) {
  switch (action.type) {
    case 'SEO_INFO':
      return action.data;

    default:
      return state;
  }
}

export {SEO};
