import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(public authService: AuthService) {}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  /*   getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  } */

  ngOnInit(): void {
    // this.loginForm.statusChanges.subscribe(value => {
    //   console.log(value);
    //   console.log(this.loginForm.get('email'));
    // });
  }

  onLogin() {
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.loginForm.get('email').value, this.loginForm.get('password').value);
    // check if credentials match jwt response
    // if not, route to register view
  }
}
