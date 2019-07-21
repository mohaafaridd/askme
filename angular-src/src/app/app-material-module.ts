import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule,
  MatBadgeModule,
  MatGridListModule,
  MatCardModule,
  MatTabsModule,
  MatPaginatorModule,
  MatDividerModule,
  MatDialogModule,
  MatChipsModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatBadgeModule,
    MatGridListModule,
    MatCardModule,
    MatTabsModule,
    MatPaginatorModule,
    MatDividerModule,
    MatDialogModule,
    MatChipsModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatBadgeModule,
    MatGridListModule,
    MatCardModule,
    MatTabsModule,
    MatPaginatorModule,
    MatDividerModule,
    MatDialogModule,
    MatChipsModule
  ],
})
export class CustomMaterialModule { }
