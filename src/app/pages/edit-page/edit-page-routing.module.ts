import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditFormComponent } from './components/edit-form/edit-form.component';

const routes: Routes = [
  {
    path: 'product',
    component: EditFormComponent,
  },
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditPageRoutingModule { }