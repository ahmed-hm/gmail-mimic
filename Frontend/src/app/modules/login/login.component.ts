import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private router: Router, private httpService: HttpService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', { validators: Validators.required }),
      password: new FormControl('', { validators: Validators.required }),
      remember: new FormControl(false),
    });
  }

  login() {
    if (this.loginForm.invalid) return;

    const { remember, ...loginData } = this.loginForm.value;

    this.httpService.post('users/signin', loginData).subscribe(({ data }) => {
      if (remember) localStorage.setItem('token', data.token);
      else sessionStorage.setItem('token', data.token);

      this.router.navigate(['/emails']);
    });
  }
}
