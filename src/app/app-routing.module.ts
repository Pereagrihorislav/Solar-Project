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
    loadChildren: () =>
      import('./modules/main-page/main-page.module').then((m) => m.MainPageModule),
  },
  {
    path: 'edit',
    loadChildren: () =>
      import('./modules/edit-page/edit-page.module').then((m) => m.EditPageModule),
  },
  {
    path: 'product/:id',
    loadChildren: () =>
      import('./modules/product-page/product-page.module').then((m) => m.ProductPageModule),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./modules/settings-page/settings-page.module').then((m) => m.SettingsPageModule),
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
