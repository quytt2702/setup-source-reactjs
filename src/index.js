import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import {routes} from 'src/routes';
import {store} from 'src/reducers';

import {Root} from 'src/routes';

ReactDOM.render((
  <Root store={store} routes={routes}/>
), document.getElementById('root'));