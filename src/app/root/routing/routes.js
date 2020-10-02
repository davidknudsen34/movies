import { RootRoute } from 'app_root/routing/RootRoute';

import {
  HomePage,
  NotFoundPage
} from 'app_components/pages';

import {
  UsersContainer
} from 'app_containers';

const routes = [
  {
    path: '/',
    component: RootRoute,
    routes: [
      {
        path: '/',
        exact: true,
        component: HomePage
      },

      {
        path: '/users',
        component: UsersContainer
      },

      {
        path: '*',
        component: NotFoundPage,
        status: 404
      }
    ]
  }
];

export default routes;