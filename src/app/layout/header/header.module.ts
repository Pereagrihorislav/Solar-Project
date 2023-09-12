import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { SearchPanelComponent } from './components/search-panel/search-panel.component';
import { UserMenuComponent } from './components/user-menu/user-menu.component';



@NgModule({
  declarations: [
    CategoriesListComponent,
    SearchPanelComponent,
    UserMenuComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HeaderModule { }
