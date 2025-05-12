import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ShowForumeComponent } from './pages/details/article-detail/show-forume/show-forume.component';
import { MaranDetailComponent } from './pages/details/maran-detail/maran-detail.component';
import { PlaceDetailComponent } from './pages/details/place-detail/place-detail.component';
import { ToureDetailComponent } from './pages/details/toure-detail/toure-detail.component';
import { HotelDetailComponent } from './pages/details/hotel-detail/hotel-detail.component';
import { TransportDetailComponent } from './pages/details/transport-detail/transport-detail.component';
import { ShowAlbomComponent } from './pages/details/albom/show-albom/show-albom.component';
import { ShowHistoryComponent } from './pages/details/history/show-history/show-history.component';
import { AdminGuard } from './services/auth/auth.guard';
import { ContactComponent } from './components/main/contact/contact.component';

export const appRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'toure-detail',
    component: ToureDetailComponent,
  },
  {
    path: 'hotel-detail',
    component: HotelDetailComponent,
  },
  {
    path: 'transport-detail',
    component: TransportDetailComponent
  },
  {
    path: 'transport-details/:id',
    loadComponent: () => import('./pages/details/transport-detail/search-transport/transport-details-view/transport-details-view.component')
      .then(m => m.TransportDetailsViewComponent)
  },
  {
    path: 'maran-detail/:id',
    loadComponent: () => import('./pages/details/maran-detail/show-maran/maran-details-view/maran-detail.component')
      .then(m => m.MaranDetailViewComponent)
  },
  {
    path: 'hotel-detail/:id',
    loadComponent: () => import('./pages/details/hotel-detail/show-hotel/hotel-details-view/hotel-detail.component')
      .then(m => m.HotelDetailComponent)
  },
  {
    path: 'maran-detail',
    component: MaranDetailComponent,
  },
  {
    path: 'show-forume',
    component: ShowForumeComponent
  },
  {
    path: 'albom/show-albom',
    component: ShowAlbomComponent
  },
  {
    path: 'show-history',
    component: ShowHistoryComponent
  },
  {
    path: 'place-detail',
    component: PlaceDetailComponent
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./pages/dashboard/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent),
    canActivate: [AdminGuard]
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
{
  path: 'კონტაქტი',
  loadComponent: () =>
    import('./components/main/contact/contact.component').then(m => m.ContactComponent)
},

];
