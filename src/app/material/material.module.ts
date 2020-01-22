import { NgModule } from '@angular/core';
import {MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatToolbarModule, MatProgressSpinnerModule, MatDialogModule, MatTooltipModule, MatSnackBarModule, MatAutocompleteModule } from '@angular/material';
import {ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogBoxComponent } from '../interface_components/account/dialog-box/dialog-box.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const MaterialComponents = [
  MatButtonModule,
  MatToolbarModule,
  MatMenuModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  ReactiveFormsModule,
  MatProgressSpinnerModule,
  FormsModule,
  MatDialogModule,
  BrowserAnimationsModule,
  MatTooltipModule,
  MatSnackBarModule,
  MatAutocompleteModule
];

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
