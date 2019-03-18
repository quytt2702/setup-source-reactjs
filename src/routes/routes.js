import App from 'src/app';
import {HomePage, Login} from "components/pages";


const routes = [
  {
    component: App,
    routes: [
      { path: '/', exact: true, component: HomePage },
      { path: '/login', exact: true, component: Login }
    ]
  }
];

export default routes;
