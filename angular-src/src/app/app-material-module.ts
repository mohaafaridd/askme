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
  MatPaginatorModule
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
    MatPaginatorModule
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
    MatPaginatorModule
  ],
})
export class CustomMaterialModule { }
