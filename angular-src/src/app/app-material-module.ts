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
  MatDividerModule
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
    MatDividerModule
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
    MatDividerModule
  ],
})
export class CustomMaterialModule { }
