import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/contact-list/contact-list.component').then(m => m.ContactListComponent),
  },
  {
    path: 'contact/:id',
    loadComponent: () => import('./components/contact-details/contact-details.component').then(m => m.ContactDetailsComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
