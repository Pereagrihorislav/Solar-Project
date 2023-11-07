import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsFormComponent } from './components/settings-form/settings-form.component';
import { SettingsPageRoutingModule } from './settings-page-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    SettingsFormComponent,
  ],
  imports: [
    CommonModule,
    SettingsPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class SettingsPageModule { }
