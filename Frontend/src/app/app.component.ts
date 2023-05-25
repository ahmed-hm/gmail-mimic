import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from './core/services/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Frontend';

  constructor(private router: Router, private alertService: AlertService) {}

  ngOnInit() {
    // listen to localStorage changes
    window.addEventListener('storage', (event) => {
      console.log(event);
      if ((event.key === 'token' || !event.key) && !event.newValue) this.router.navigate(['/login']);
    });
  }

  onAlertClosed(alertId: number) {
    this.alertService.removeAlert(alertId);
  }

  get alerts() {
    return this.alertService.alerts;
  }
}
