import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatIconModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatIconModule
  ],
  exports:
    [
      MatButtonModule,
      MatCheckboxModule,
      MatToolbarModule,
      MatIconModule
    ],
})
export class CustomMaterialModule { }
