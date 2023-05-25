import { Injectable } from '@angular/core';
import { IAlert } from 'src/app/shared/alert.interface';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  alerts: IAlert[] = [];

  constructor() {}

  addAlert(alert: IAlert) {
    this.alerts.push(alert);
  }

  removeAlert(alertId: number) {
    this.alerts = this.alerts.filter((alert) => alert.id !== alertId);
  }
}
