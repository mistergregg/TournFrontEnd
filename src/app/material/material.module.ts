import { NgModule } from '@angular/core';
import {MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatToolbarModule, MatProgressSpinnerModule } from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';

const MaterialComponents = [
  MatButtonModule,
  MatToolbarModule,
  MatMenuModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  ReactiveFormsModule,
  MatProgressSpinnerModule
];

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
