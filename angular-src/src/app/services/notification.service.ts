import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    public snackBar: MatSnackBar,
    private zone: NgZone
  ) { }

  public open(message, action, duration) {
    this.zone.run(() => {
      this.snackBar.open(message, action, { duration });
    });
  }

}
