import {Routes} from '@angular/router';
import {notAuthenticatedGuard} from '@auth/guard/not-authenticated-guard';
import {isAdminGuard} from '@auth/guard/is-admin-guard';

export const routes: Routes = [

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes'),
    canMatch: [notAuthenticatedGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin-dashboard/admin-dashboard.routes'),
    canMatch:[isAdminGuard]
  },
  {
    path: '',
    loadChildren: () => import('./store-front/store-front.routes')
  },
];
