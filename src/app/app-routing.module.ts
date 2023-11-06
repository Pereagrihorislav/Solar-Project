import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';




const routes : Routes = [
  {
    path: '',
    redirectTo: '/main',
    pathMatch: 'full'
  },
  {
    path: 'main',
    title: 'Главная',
    loadChildren: () =>
      import('./pages/main-page/main-page.module').then((m) => m.MainPageModule),
  },
  {
    path: 'edit',
    title: 'Редактировать',
    loadChildren: () =>
      import('./pages/edit-page/edit-page.module').then((m) => m.EditPageModule),
  },
  {
    path: 'product/:id',
    
    loadChildren: () =>
      import('./pages/product-page/product-page.module').then((m) => m.ProductPageModule),
  },
  {
    path: 'settings',
    title: 'Настройки',
    loadChildren: () =>
      import('./pages/settings-page/settings-page.module').then((m) => m.SettingsPageModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth-page/auth-page.module').then((m) => m.AuthPageModule),
  },
  {
    path: 'not-found',
    title: '404',
    loadChildren: () =>
      import('./pages/not-found-page/not-found-page.module').then((m) => m.NotFoundPageModule),
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
