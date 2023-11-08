import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditPageRoutingModule } from './edit-page-routing.module';
import { EditFormComponent } from './components/edit-form/edit-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EditFormComponent,
  ],
  imports: [
    CommonModule,
    EditPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class EditPageModule { }
